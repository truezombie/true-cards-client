import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';
import { CellProps } from 'react-table';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { WithStyles } from '@material-ui/core/styles';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

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
import styles from './styles';
import {
  LIST_CARD_SETS_QUERY,
  CREATE_CARD_SET_QUERY,
  UPDATE_CARD_SET_QUERY,
  DELETE_CARD_SET_QUERY,
  SEARCH_CARD_SET_QUERY,
} from './queries';
import { ERROR_CODES } from '../../utils/errors';
import { useSnackBarNotification } from '../../hooks';
import {
  pageCardSetsSearchVar,
  pageCardSetsRowsPerPageVar,
  pageCardSetsPageNumberVar,
} from '../../cache';

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

type PageCardSetsProps = WithStyles<typeof styles>;

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

const PageCardSets = ({ classes }: PageCardSetsProps): JSX.Element => {
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

  const [onUpdateCardSet] = useMutation(UPDATE_CARD_SET_QUERY, {
    onCompleted: () => cardSetsRefetch(),
  });

  const [onDeleteCardSet] = useMutation(DELETE_CARD_SET_QUERY, {
    onCompleted: () => cardSetsRefetch(),
  });

  const intl = useIntl();
  const [deleteCardSet, setDeleteCardSet] = useState<ModalDeleteCardSet>(
    modalInitialStateDeleteCardSet
  );
  const [manageCardSet, setOpenManageCardSet] = useState<ModalManageCardSet>(
    modalInitialStateManageCardSet
  );

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
      onDeleteCardSet({ variables: { cardSetId: deleteCardSet.id } });
    }
  }, [deleteCardSet.id]);

  const createNewCardSetValidationSchema = Yup.object().shape({
    name: Yup.string()
      .trim(
        intl.formatMessage({
          id: 'input.error.spaces',
        })
      )
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
    (item) => {
      return [
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
      ];
    },
    [cardSets]
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
          <FolderIcon fontSize='small' color='primary' />
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
        Header: 'Folder name',
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
    []
  );

  const onSearch = (search: string): void => {
    pageCardSetsPageNumberVar(0);
    pageCardSetsSearchVar(search);
  };

  const onPageChange = (page: number): void => {
    pageCardSetsPageNumberVar(page);
  };

  const onRowsPerPageChange = (rows: number): void => {
    pageCardSetsRowsPerPageVar(rows);
  };

  return (
    <Container className={classes.container} maxWidth='md'>
      <PageMainHeader
        onAdd={() => {
          setOpenManageCardSet({
            ...modalInitialStateManageCardSet,
            show: true,
            create: true,
          });
        }}
        msgAddBtn={<FormattedMessage id='btn.new.card.set' />}
        msgTitle={<FormattedMessage id='page.cardSets.title' />}
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
        msgNoData={<FormattedMessage id='no.data' />}
      />
      <DialogForm
        isOpen={manageCardSet.show}
        validationSchema={createNewCardSetValidationSchema}
        msgTitle={messagesModalManageCardSet.title}
        onClose={() => setOpenManageCardSet({ ...manageCardSet, show: false })}
        onSubmit={(values, { setSubmitting }) => {
          if (manageCardSet.edit) {
            onUpdateCardSet({
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
    </Container>
  );
};

export default PageCardSets;
