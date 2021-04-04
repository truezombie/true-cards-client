import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';
import { CellProps } from 'react-table';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import {
  Table,
  DialogForm,
  DialogConfirm,
  PageMainHeader,
  Menu,
} from '../../components';
import APP from '../../constants/app';
import ROUTES from '../../constants/router';
import { CardSetsType, CardSet } from '../../types/app';
import { tabCardSetsStyles } from './styles';
import {
  LIST_CARD_SETS_QUERY,
  CREATE_CARD_SET_QUERY,
  UPDATE_CARD_SET_NAME_QUERY,
  UPDATE_CARD_SET_SHARING_QUERY,
  DELETE_CARD_SET_QUERY,
  SEARCH_CARD_SET_QUERY,
  UNSUBSCRIBE_QUERY,
} from './queries';
import { ERROR_CODES } from '../../utils/errors';
import { useSnackBarNotification } from '../../hooks';
import {
  pageCardSetsSearchVar,
  pageCardSetsRowsPerPageVar,
  pageCardSetsPageNumberVar,
} from '../../cache';
import { ModalSubscription } from './TabCardSetsShared';

type ModalDeleteCardSet = {
  show: boolean;
  id: string;
  name: string;
};

type ModalManageCardSet = {
  show: boolean;
  edit: boolean;
  create: boolean;
  id: string;
  name: string;
};

type ModalSharingCardSet = {
  id: string;
  name: string;
  show: boolean;
};

interface TabCardSetsProps extends WithStyles<typeof tabCardSetsStyles> {
  userId?: string | undefined;
}

const modalInitialStateDeleteCardSet: ModalDeleteCardSet = {
  show: false,
  id: '',
  name: '',
};

const modalInitialStateManageCardSet: ModalManageCardSet = {
  show: false,
  edit: false,
  create: false,
  id: '',
  name: '',
};

const modalInitialStateStartSharingCardSet: ModalSharingCardSet = {
  show: false,
  id: '',
  name: '',
};

const modalInitialStateStopSharingCardSet: ModalSharingCardSet = {
  show: false,
  id: '',
  name: '',
};

const TabCardSets = ({ classes, userId }: TabCardSetsProps) => {
  const [modalUnSubscribe, setModalUnSubscribe] = useState<ModalSubscription>(
    modalInitialStateStopSharingCardSet
  );
  const [showErrorSnackBar] = useSnackBarNotification();
  const {
    data: {
      pageCardSetsSearch,
      pageCardSetsPageNumber,
      pageCardSetsRowsPerPage,
    },
  } = useQuery(SEARCH_CARD_SET_QUERY);

  const {
    loading: cardSetsIsLoading,
    refetch: cardSetsRefetch,
    data: { cardSets: { cardSets, count } = { cardSets: [], count: 0 } } = {},
  } = useQuery<CardSetsType>(LIST_CARD_SETS_QUERY, {
    variables: {
      search: pageCardSetsSearch,
      page: pageCardSetsPageNumber,
      rowsPerPage: pageCardSetsRowsPerPage,
    },
    notifyOnNetworkStatusChange: true,
  });

  const [onCreateCardSet, { error: createCardSetError }] = useMutation(
    CREATE_CARD_SET_QUERY,
    {
      onCompleted: () => cardSetsRefetch(),
    }
  );

  const [onUpdateCardSetName] = useMutation(UPDATE_CARD_SET_NAME_QUERY, {
    onCompleted: () => cardSetsRefetch(),
  });

  const [onUpdateCardSetSharing] = useMutation(UPDATE_CARD_SET_SHARING_QUERY, {
    onCompleted: () => cardSetsRefetch(),
  });

  const [onDeleteCardSet] = useMutation(DELETE_CARD_SET_QUERY, {
    onCompleted: () => cardSetsRefetch(),
  });

  const [onUnSubscribe] = useMutation(UNSUBSCRIBE_QUERY, {
    onCompleted: () => cardSetsRefetch(),
  });

  const intl = useIntl();
  const [deleteCardSet, setDeleteCardSet] = useState<ModalDeleteCardSet>(
    modalInitialStateDeleteCardSet
  );
  const [manageCardSet, setOpenManageCardSet] = useState<ModalManageCardSet>(
    modalInitialStateManageCardSet
  );
  const [
    startSharingCardSet,
    setStartSharingCardSet,
  ] = useState<ModalSharingCardSet>(modalInitialStateStartSharingCardSet);
  const [
    stopSharingCardSet,
    setStopSharingCardSet,
  ] = useState<ModalSharingCardSet>(modalInitialStateStopSharingCardSet);

  useEffect(() => {
    showErrorSnackBar(ERROR_CODES.ERROR_CARD_SET_EXIST, createCardSetError);
    showErrorSnackBar(
      ERROR_CODES.ERROR_EXCEEDED_LIMIT_CARDS_SETS,
      createCardSetError
    );
  }, [createCardSetError]);

  useEffect(() => {
    cardSetsRefetch();
  }, [pageCardSetsSearch, pageCardSetsPageNumber, pageCardSetsRowsPerPage]);

  const handleDeleteCardSet = useCallback(() => {
    if (deleteCardSet.id) {
      pageCardSetsPageNumberVar(0);
      onDeleteCardSet({ variables: { cardSetId: deleteCardSet.id } });
    }
  }, [deleteCardSet.id]);

  const createNewCardSetValidationSchema = Yup.object().shape({
    name: Yup.string()
      .strict(true)
      .min(
        APP.minEnteredCharacters,
        intl.formatMessage(
          {
            id: 'input.error.min.length',
          },
          { value: APP.minEnteredCharacters }
        )
      )
      .max(
        APP.maxEnteredCharacters,
        intl.formatMessage(
          {
            id: 'input.error.max.length',
          },
          { value: APP.maxEnteredCharacters }
        )
      )
      .required(
        intl.formatMessage({
          id: 'input.error.required.field',
        })
      ),
  });

  const messagesModalManageCardSet: {
    title: string | JSX.Element;
    submit: string | JSX.Element;
  } = useMemo(() => {
    return manageCardSet.edit
      ? {
          title: <FormattedMessage id='card.set.modal.title.edit' />,
          submit: <FormattedMessage id='btn.save' />,
        }
      : {
          title: <FormattedMessage id='card.set.modal.title.add' />,
          submit: <FormattedMessage id='btn.add' />,
        };
  }, [manageCardSet.edit, manageCardSet.create]);

  const getDropDownMenuItems = useCallback(
    (item: CardSet) => {
      return item.userId === userId
        ? [
            {
              id: 'sharing',
              text: item.isShared ? (
                <FormattedMessage id='btn.stop.sharing' />
              ) : (
                <FormattedMessage id='btn.start.sharing' />
              ),
              icon: item.isShared ? <HighlightOffIcon /> : <ShareIcon />,
              onClick: item.isShared
                ? () =>
                    setStopSharingCardSet({
                      show: true,
                      id: item.id,
                      name: item.name,
                    })
                : () =>
                    setStartSharingCardSet({
                      show: true,
                      id: item.id,
                      name: item.name,
                    }),
            },
            {
              id: 'edit',
              text: <FormattedMessage id='btn.edit' />,
              icon: <EditIcon />,
              onClick: () => {
                setOpenManageCardSet({
                  show: true,
                  edit: true,
                  create: false,
                  id: item.id,
                  name: item.name,
                });
              },
            },
            {
              id: 'delete',
              text: <FormattedMessage id='btn.delete' />,
              icon: <DeleteIcon />,
              onClick: () => {
                setDeleteCardSet({
                  show: true,
                  id: item.id,
                  name: item.name,
                });
              },
            },
          ]
        : [
            {
              id: 'unsubscribe',
              text: 'Unsubscribe',
              icon: <UnsubscribeIcon />,
              onClick: () => {
                setModalUnSubscribe({
                  show: true,
                  id: item.id,
                  name: item.name,
                });
              },
            },
          ];
    },
    [cardSets, userId]
  );

  const startLearningCell = ({
    cell: {
      row: { original },
    },
  }: CellProps<CardSet>) => {
    return (
      <Tooltip
        disableFocusListener
        title={<FormattedMessage id='tooltip.start.to.study.card' />}
      >
        <IconButton
          component={Link}
          to={ROUTES.startLearning.replace(':id', original.id)}
          color='primary'
          aria-label='play'
        >
          <PlayCircleFilledIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    );
  };

  const editAndDeleteCell = ({
    cell: {
      row: { original },
    },
  }: CellProps<CardSet>) => {
    return (
      <Menu items={getDropDownMenuItems(original)}>
        <Tooltip
          disableFocusListener
          title={<FormattedMessage id='tooltip.options' />}
        >
          <IconButton
            aria-label='more'
            aria-controls='simple-menu'
            aria-haspopup='true'
          >
            <MoreVertIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </Menu>
    );
  };

  const nameCell = ({
    value,
    cell: {
      row: { original },
    },
  }: CellProps<CardSet>) => {
    return (
      <Link
        className={classes.cardSetLink}
        to={ROUTES.cards.replace(':id', original.id)}
      >
        <Typography component='span' title={value} gutterBottom>
          {value}
        </Typography>
      </Link>
    );
  };

  const getFolderIcons = (currentUserId: string, isShared: boolean) => {
    if (currentUserId !== userId) {
      return <FolderSpecialIcon fontSize='small' color='primary' />;
    }

    if (isShared && currentUserId === userId) {
      return <FolderSharedIcon fontSize='small' color='primary' />;
    }

    return <FolderIcon fontSize='small' color='primary' />;
  };

  const folderIconCell = ({
    cell: {
      row: { original },
    },
  }: CellProps<CardSet>) => {
    return (
      <Tooltip
        disableFocusListener
        title={<FormattedMessage id='tooltip.go.to.cards' />}
      >
        <IconButton
          component={Link}
          to={ROUTES.cards.replace(':id', original.id)}
          aria-label='cards'
        >
          {getFolderIcons(original.userId, original.isShared)}
        </IconButton>
      </Tooltip>
    );
  };

  const columns = React.useMemo(
    () => [
      {
        id: 'iconFolder',
        Header: '',
        accessor: 'name',
        Cell: folderIconCell,
        width: 76,
      },
      {
        id: 'name',
        Header: <FormattedMessage id='table.title.folder.name' />,
        accessor: 'name',
        Cell: nameCell,
      },
      {
        id: 'startLearn',
        Header: '',
        accessor: 'id',
        Cell: startLearningCell,
        width: 60,
      },
      {
        id: 'deleteAndEdit',
        Header: '',
        accessor: 'id',
        Cell: editAndDeleteCell,
        width: 60,
      },
    ],
    [userId]
  );

  const onSearch = useCallback(
    (search: string): void => {
      pageCardSetsPageNumberVar(0);
      pageCardSetsSearchVar(search);
    },
    [pageCardSetsPageNumberVar, pageCardSetsSearchVar]
  );

  const onPageChange = useCallback(
    (page: number): void => {
      pageCardSetsPageNumberVar(page);
    },
    [pageCardSetsPageNumberVar]
  );

  const onRowsPerPageChange = useCallback(
    (rows: number): void => {
      pageCardSetsPageNumberVar(0);
      pageCardSetsRowsPerPageVar(rows);
    },
    [pageCardSetsPageNumberVar, pageCardSetsRowsPerPageVar]
  );

  const onOpenManageCardSet = useCallback(() => {
    setOpenManageCardSet({
      ...modalInitialStateManageCardSet,
      show: true,
      create: true,
    });
  }, [setOpenManageCardSet]);

  return (
    <>
      <PageMainHeader
        onAdd={onOpenManageCardSet}
        msgAddBtn={intl.formatMessage({
          id: 'btn.new.card.set',
        })}
        msgTitle={intl.formatMessage({
          id: 'page.cardSets.title',
        })}
      />
      <Table
        data={cardSets}
        columns={columns}
        page={pageCardSetsPageNumber}
        isLoading={cardSetsIsLoading}
        rowsPerPage={pageCardSetsRowsPerPage}
        searchValue={pageCardSetsSearch}
        onSearch={onSearch}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        paginationItemsCount={count}
        msgNoData={intl.formatMessage({
          id: 'no.data',
        })}
      />
      <DialogForm
        isOpen={manageCardSet.show}
        validationSchema={createNewCardSetValidationSchema}
        msgTitle={messagesModalManageCardSet.title}
        onClose={() => setOpenManageCardSet({ ...manageCardSet, show: false })}
        onSubmit={(values, { setSubmitting }) => {
          if (manageCardSet.edit) {
            onUpdateCardSetName({
              variables: { cardSetId: manageCardSet.id, name: values.name },
            });
          }

          if (manageCardSet.create) {
            onCreateCardSet({
              variables: { name: values.name },
            });
          }

          setSubmitting(false);
        }}
        msgClose={<FormattedMessage id='btn.close' />}
        msgSubmit={messagesModalManageCardSet.submit}
        initialValues={{
          name: manageCardSet.name,
        }}
      >
        {({ errors, touched, values, handleBlur, handleChange }) => (
          <TextField
            className={classes.inputCreateNewCardSet}
            variant='outlined'
            margin='normal'
            size='small'
            required
            fullWidth
            id='name'
            label={<FormattedMessage id='input.name' />}
            name='name'
            autoComplete='name'
            autoFocus
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
        )}
      </DialogForm>
      <DialogConfirm
        isOpen={deleteCardSet.show}
        handleAgree={handleDeleteCardSet}
        handleClose={() => setDeleteCardSet({ ...deleteCardSet, show: false })}
        msgTitle={<FormattedMessage id='card.set.modal.title.delete' />}
        msgBody={
          <FormattedMessage
            id='card.set.modal.body.delete'
            values={{ value: deleteCardSet.name }}
          />
        }
        msgClose={<FormattedMessage id='btn.close' />}
        msgAgree={<FormattedMessage id='btn.delete' />}
      />
      <DialogConfirm
        isOpen={startSharingCardSet.show}
        handleAgree={() =>
          onUpdateCardSetSharing({
            variables: { cardSetId: startSharingCardSet.id, isShared: true },
          })
        }
        handleClose={() =>
          setStartSharingCardSet({ ...startSharingCardSet, show: false })
        }
        msgTitle={<FormattedMessage id='modal.sharing.start.title' />}
        msgClose={<FormattedMessage id='btn.close' />}
        msgAgree={<FormattedMessage id='btn.start.sharing' />}
        msgBody={
          <FormattedMessage
            id='modal.sharing.start.body'
            values={{ name: startSharingCardSet.name }}
          />
        }
      />
      <DialogConfirm
        isOpen={stopSharingCardSet.show}
        handleAgree={() => {
          onUpdateCardSetSharing({
            variables: { cardSetId: stopSharingCardSet.id, isShared: false },
          });
        }}
        handleClose={() =>
          setStopSharingCardSet({ ...stopSharingCardSet, show: false })
        }
        msgTitle={<FormattedMessage id='modal.sharing.stop.title' />}
        msgClose={<FormattedMessage id='btn.close' />}
        msgAgree={<FormattedMessage id='btn.stop.sharing' />}
        msgBody={
          <FormattedMessage
            id='modal.sharing.stop.body'
            values={{ name: stopSharingCardSet.name }}
          />
        }
      />
      <DialogConfirm
        isOpen={modalUnSubscribe.show}
        handleAgree={() =>
          onUnSubscribe({
            variables: { cardSetId: modalUnSubscribe.id },
          })
        }
        handleClose={() =>
          setModalUnSubscribe({ ...modalUnSubscribe, show: false })
        }
        msgTitle={<FormattedMessage id='modal.unsubscribe.title' />}
        msgClose={<FormattedMessage id='btn.close' />}
        msgAgree={<FormattedMessage id='btn.unsubscription' />}
        msgBody={
          <FormattedMessage
            id='modal.unsubscribe.body'
            values={{ name: modalUnSubscribe.name }}
          />
        }
      />
    </>
  );
};

TabCardSets.defaultProps = {
  userId: undefined,
};

export default withStyles(tabCardSetsStyles)(TabCardSets);
