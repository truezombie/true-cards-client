import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { CellProps } from 'react-table';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import * as Yup from 'yup';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import { WithStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';

import {
  FullBlockMessage,
  PageMainHeader,
  DialogConfirm,
  DialogForm,
  CardStatus,
  Loader,
  Table,
  Menu,
} from '../../components';
import { GET_CARDS_QUERY } from '../../containers/App/queries';
import {
  CREATE_CARD_QUERY,
  UPDATE_CARD_QUERY,
  DELETE_CARD_QUERY,
} from './queries';
import { CardsType, CardType } from '../../types/app';
import { useSnackBarNotification } from '../../hooks';
import { ERROR_CODES } from '../../utils/errors';
import ROUTES from '../../constants/router';
import APP from '../../constants/app';

import styles from './styles';

type manageCard = {
  show: boolean;
  id: string;
  edit: boolean;
  create: boolean;
  front: string;
  frontDescription?: string;
  back?: string;
  backDescription?: string;
  hasBackSide?: boolean;
};

type deleteCard = {
  show: boolean;
  id: string;
  front: string;
};

type PageCardsProps = WithStyles<typeof styles>;

const initialStateDeleteModal: deleteCard = {
  show: false,
  id: '',
  front: '',
};

const initialStateManageModal: manageCard = {
  show: false,
  edit: false,
  create: false,
  id: '',
  front: '',
  frontDescription: '',
  back: '',
  backDescription: '',
  hasBackSide: false,
};

const PageCards = ({ classes }: PageCardsProps): JSX.Element => {
  const intl = useIntl();
  const urlParams = useParams<{ id: string }>();
  const [showErrorSnackBar] = useSnackBarNotification();
  const [deleteCardModalData, setDeleteCardModalData] = useState<deleteCard>(
    initialStateDeleteModal
  );
  const [manageCardModalData, setManageCardModalData] = useState<manageCard>(
    initialStateManageModal
  );
  const [searchParams, setSearchParams] = useState<{
    search: string;
    page: number;
    rowsPerPage: number;
  }>({
    search: '',
    page: 0,
    rowsPerPage: 15,
  });

  const {
    called: calledCardSetWithCards,
    refetch: refetchCardSetWithCards,
    loading: isLoading,
    data = {
      cards: {
        cardSetId: '',
        cardSetName: '',
        cards: [],
        cardsMax: 0,
        count: 0,
      },
    },
  } = useQuery<CardsType>(GET_CARDS_QUERY, {
    variables: {
      cardSetId: urlParams.id,
      ...searchParams,
    },
    notifyOnNetworkStatusChange: true,
  });

  const {
    cards: { cardSetName, cards, count, cardsMax },
  } = data;

  const [onCreateCard, { error: createCardError }] = useMutation(
    CREATE_CARD_QUERY,
    {
      onCompleted: () => refetchCardSetWithCards(),
    }
  );

  const [onUpdateCard] = useMutation(UPDATE_CARD_QUERY, {
    onCompleted: () => refetchCardSetWithCards(),
  });

  const [onDeleteCard] = useMutation(DELETE_CARD_QUERY, {
    onCompleted: () => refetchCardSetWithCards(),
  });

  const statusCell = ({
    cell: {
      row: { original },
    },
  }: CellProps<CardType>) => {
    return <CardStatus card={original} />;
  };

  useEffect(() => {
    showErrorSnackBar(
      ERROR_CODES.ERROR_EXCEEDED_LIMIT_CARDS_IN_CARD_SET,
      createCardError
    );
  }, [createCardError]);

  const getDropDownMenuItems = useCallback((original, value) => {
    return [
      {
        id: 'edit',
        text: <FormattedMessage id='btn.edit' />,
        icon: <EditIcon />,
        onClick: () => {
          setManageCardModalData({
            show: true,
            edit: true,
            create: false,
            ...original,
          });
        },
      },
      {
        id: 'delete',
        text: <FormattedMessage id='btn.delete' />,
        icon: <DeleteIcon />,
        onClick: () => {
          setDeleteCardModalData({
            show: true,
            id: value,
            front: original.front,
          });
        },
      },
    ];
  }, []);

  const editAndDeleteCell = ({
    value,
    cell: {
      row: { original },
    },
  }: CellProps<CardType>) => (
    <Menu items={getDropDownMenuItems(original, value)}>
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

  const columns = React.useMemo(
    () => [
      {
        id: 'front',
        Header: <FormattedMessage id='table.cards.title.front' />,
        accessor: 'front',
      },
      {
        id: 'back',
        Header: <FormattedMessage id='table.cards.title.back' />,
        accessor: 'back',
      },
      {
        id: 'status',
        Header: <FormattedMessage id='table.cards.title.status' />,
        accessor: 'id',
        width: 80,
        Cell: statusCell,
      },
      {
        id: 'actions',
        Header: '',
        accessor: 'id',
        width: 60,
        Cell: editAndDeleteCell,
      },
    ],
    []
  );

  const createCardValidationSchema = Yup.object().shape({
    front: Yup.string()
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

  const loader = useMemo(() => {
    return calledCardSetWithCards && isLoading && !data ? <Loader /> : null;
  }, [calledCardSetWithCards, isLoading, data]);

  const noDataFullPage = useMemo(() => {
    return calledCardSetWithCards && !isLoading && !data ? (
      <FullBlockMessage
        message={<FormattedMessage id='no.data' />}
        link={{
          href: ROUTES.main,
          text: <FormattedMessage id='link.go.to.main.page' />,
        }}
      />
    ) : null;
  }, [calledCardSetWithCards, isLoading, data]);

  const messagesModalManageCard: {
    title: string | JSX.Element;
    submit: string | JSX.Element;
  } = useMemo(() => {
    return manageCardModalData.edit
      ? {
          title: <FormattedMessage id='card.modal.title.edit' />,
          submit: <FormattedMessage id='btn.save' />,
        }
      : {
          title: <FormattedMessage id='card.modal.title.add' />,
          submit: <FormattedMessage id='btn.add' />,
        };
  }, [manageCardModalData.edit, manageCardModalData.create]);

  const onSearch = (search: string): void => {
    setSearchParams({
      ...searchParams,
      page: 0,
      search,
    });
  };

  const onPageChange = (page: number): void => {
    setSearchParams({
      ...searchParams,
      page,
    });
  };

  const onRowsPerPageChange = (rowsPerPage: number): void => {
    setSearchParams({
      ...searchParams,
      rowsPerPage,
    });
  };

  return (
    <>
      {loader}
      {noDataFullPage}
      {data ? (
        <Container maxWidth='md' className={classes.container}>
          <PageMainHeader
            // isLoading={isLoading && !!data.cardSetWithCards.cards.length}
            onAdd={() => {
              setManageCardModalData({
                ...initialStateManageModal,
                show: true,
                create: true,
              });
            }}
            currentValue={cards.length}
            maxValue={cardsMax}
            link={ROUTES.main}
            msgAddBtn={<FormattedMessage id='btn.new.card' />}
            msgTitle={cardSetName}
          />
          <Table
            columns={columns}
            data={cards}
            onSearch={onSearch}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            isLoading={isLoading}
            paginationItemsCount={count}
            page={searchParams.page}
            rowsPerPage={searchParams.rowsPerPage}
            msgNoData={<FormattedMessage id='no.data' />}
            searchValue={searchParams.search}
          />
          <DialogForm
            isOpen={manageCardModalData.show}
            validationSchema={createCardValidationSchema}
            msgTitle={messagesModalManageCard.title}
            onClose={() =>
              setManageCardModalData({ ...manageCardModalData, show: false })
            }
            onSubmit={(values, { setSubmitting }) => {
              if (manageCardModalData.edit) {
                onUpdateCard({
                  variables: {
                    cardId: manageCardModalData.id,
                    front: values.front,
                    frontDescription: values.frontDescription,
                    back: values.back,
                    backDescription: values.backDescription,
                    hasBackSide: values.hasBackSide,
                  },
                });
              }

              if (manageCardModalData.create) {
                onCreateCard({
                  variables: {
                    cardSetId: urlParams.id,
                    front: values.front,
                    frontDescription: values.frontDescription,
                    back: values.back,
                    backDescription: values.backDescription,
                    hasBackSide: values.hasBackSide,
                  },
                });
              }

              setSubmitting(false);
            }}
            msgClose={<FormattedMessage id='btn.close' />}
            msgSubmit={messagesModalManageCard.submit}
            initialValues={{
              back: manageCardModalData.back,
              front: manageCardModalData.front,
              hasBackSide: manageCardModalData.hasBackSide,
              backDescription: manageCardModalData.backDescription,
              frontDescription: manageCardModalData.frontDescription,
            }}
          >
            {({ errors, touched, values, handleBlur, handleChange }) => (
              <>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='button' display='block' gutterBottom>
                      <FormattedMessage id='modal.manage.card.front' />
                    </Typography>
                    <TextField
                      variant='outlined'
                      margin='normal'
                      size='small'
                      fullWidth
                      id='front'
                      label={<FormattedMessage id='modal.manage.input.front' />}
                      name='front'
                      autoComplete='front'
                      autoFocus
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.front}
                      error={Boolean(touched.front && errors.front)}
                      helperText={touched.front && errors.front}
                    />
                    <TextField
                      variant='outlined'
                      margin='normal'
                      size='small'
                      fullWidth
                      id='frontDescription'
                      label={
                        <FormattedMessage id='modal.manage.input.front.description' />
                      }
                      name='frontDescription'
                      autoComplete='frontDescription'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.frontDescription}
                      error={Boolean(
                        touched.frontDescription && errors.frontDescription
                      )}
                      helperText={
                        touched.frontDescription && errors.frontDescription
                      }
                    />
                  </CardContent>
                </Card>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.hasBackSide}
                      onChange={handleChange}
                      name='hasBackSide'
                    />
                  }
                  label={
                    <FormattedMessage id='modal.manage.input.with.back.side' />
                  }
                />
                {values.hasBackSide ? (
                  <Card variant='outlined'>
                    <CardContent>
                      <Typography variant='button' display='block' gutterBottom>
                        <FormattedMessage id='modal.manage.card.back' />
                      </Typography>
                      <TextField
                        variant='outlined'
                        margin='normal'
                        size='small'
                        fullWidth
                        id='back'
                        label={
                          <FormattedMessage id='modal.manage.input.back' />
                        }
                        name='back'
                        autoComplete='back'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.back}
                        error={Boolean(touched.back && errors.back)}
                        helperText={touched.back && errors.back}
                      />
                      <TextField
                        variant='outlined'
                        margin='normal'
                        size='small'
                        fullWidth
                        id='backDescription'
                        label={
                          <FormattedMessage id='modal.manage.input.back.description' />
                        }
                        name='backDescription'
                        autoComplete='name'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.backDescription}
                        error={Boolean(
                          touched.backDescription && errors.backDescription
                        )}
                        helperText={
                          touched.backDescription && errors.backDescription
                        }
                      />
                    </CardContent>
                  </Card>
                ) : null}
              </>
            )}
          </DialogForm>

          <DialogConfirm
            isOpen={deleteCardModalData.show}
            handleAgree={() => {
              onDeleteCard({
                variables: {
                  cardId: deleteCardModalData.id,
                },
              });
            }}
            handleClose={() =>
              setDeleteCardModalData({ ...deleteCardModalData, show: false })
            }
            msgTitle={<FormattedMessage id='card.modal.title.delete' />}
            msgBody={
              <FormattedMessage
                id='card.modal.body.delete'
                values={{ front: deleteCardModalData.front }}
              />
            }
            msgClose={<FormattedMessage id='btn.close' />}
            msgAgree={<FormattedMessage id='btn.delete' />}
          />
        </Container>
      ) : null}
    </>
  );
};

export default PageCards;
