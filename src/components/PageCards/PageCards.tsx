import React, { useState, useEffect, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { CellProps } from 'react-table';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import { WithStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';

import FullBlockMessage from '../FullBlockMessage';
import PageMainHeader from '../PageMainHeader';
import DialogForm from '../DialogForm';
import CardStatus from '../CardStatus';
import { Loader } from '../Loader';
import Table from '../Table';

import { CardsType, CardType } from '../../types/app';
import DialogConfirm from '../DialogConfirm';
import ROUTES from '../../constants/router';
import APP from '../../constants/app';
import styles from './styles';

type manageCard = {
  show: boolean;
  edit: boolean;
  create: boolean;
  uuid: string;
  front: string;
  frontDescription?: string;
  back?: string;
  backDescription?: string;
  hasBackSide?: boolean;
};

type deleteCard = {
  show: boolean;
  uuid: string;
  front: string;
};

interface PageCardsProps extends WithStyles<typeof styles> {
  data?: CardsType;
  isLoading: boolean;
  calledCardSetWithCards: boolean;
  getCardSetWithCards: (data: { variables: { cardSetId: string } }) => void;
  onCreateCard: (data: {
    variables: {
      cardSetId: string;
      front: string;
      frontDescription?: string;
      back?: string;
      backDescription?: string;
      hasBackSide?: boolean;
    };
  }) => void;
  onUpdateCard: (data: {
    variables: {
      cardSetId: string;
      uuid: string;
      front: string;
      frontDescription?: string;
      back?: string;
      backDescription?: string;
      hasBackSide?: boolean;
    };
  }) => void;
  onDeleteCard: (data: {
    variables: { cardUuid: string; cardSetId: string };
  }) => void;
}

const initialStateDeleteModal: deleteCard = {
  show: false,
  uuid: '',
  front: '',
};

const initialStateManageModal: manageCard = {
  show: false,
  edit: false,
  create: false,
  uuid: '',
  front: '',
  frontDescription: '',
  back: '',
  backDescription: '',
  hasBackSide: false,
};

const PageCards = ({
  classes,
  getCardSetWithCards,
  calledCardSetWithCards,
  data,
  isLoading,
  onCreateCard,
  onDeleteCard,
  onUpdateCard,
}: PageCardsProps): JSX.Element => {
  const intl = useIntl();
  const urlParams = useParams<{ id: string }>();
  const [deleteCardModalData, setDeleteCardModalData] = useState<deleteCard>(
    initialStateDeleteModal
  );
  const [manageCardModalData, setManageCardModalData] = useState<manageCard>(
    initialStateManageModal
  );

  const editCell = ({
    cell: {
      row: { original },
    },
  }: CellProps<CardType>) => {
    return (
      <IconButton
        onClick={() => {
          setManageCardModalData({
            show: true,
            edit: true,
            create: false,
            ...original,
          });
        }}
        aria-label='edit'
      >
        <EditIcon fontSize='small' />
      </IconButton>
    );
  };

  const deleteCell = ({
    value,
    cell: {
      row: { original },
    },
  }: CellProps<CardType>) => {
    return (
      <IconButton
        onClick={() => {
          setDeleteCardModalData({
            show: true,
            uuid: value,
            front: original.front,
          });
        }}
        aria-label='delete'
      >
        <DeleteIcon fontSize='small' />
      </IconButton>
    );
  };

  const statusCell = ({
    cell: {
      row: { original },
    },
  }: CellProps<CardType>) => {
    return <CardStatus card={original} />;
  };

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
        accessor: 'uuid',
        width: 80,
        Cell: statusCell,
      },
      {
        id: 'edit',
        Header: '',
        accessor: 'uuid',
        width: 60,
        Cell: editCell,
      },
      {
        id: 'delete',
        Header: '',
        accessor: 'uuid',
        width: 60,
        Cell: deleteCell,
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

  useEffect(() => {
    if (urlParams.id) {
      getCardSetWithCards({ variables: { cardSetId: urlParams.id } });
    }
  }, []);

  return (
    <>
      {loader}
      {noDataFullPage}
      {data ? (
        <Container maxWidth='md' className={classes.container}>
          <PageMainHeader
            isLoading={isLoading && !!data.cardSetWithCards.cards.length}
            onAdd={() => {
              setManageCardModalData({
                ...initialStateManageModal,
                show: true,
                create: true,
              });
            }}
            currentValue={data.cardSetWithCards.cards.length}
            maxValue={data.cardSetWithCards.cardsMax}
            link={ROUTES.main}
            msgAddBtn={<FormattedMessage id='btn.new.card' />}
            msgTitle={data.cardSetWithCards.name}
          />

          {data.cardSetWithCards.cards.length ? (
            <Table columns={columns} data={data.cardSetWithCards.cards} />
          ) : (
            <FullBlockMessage message={<FormattedMessage id='no.data' />} />
          )}

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
                    uuid: manageCardModalData.uuid,
                    cardSetId: urlParams.id,
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
                  cardUuid: deleteCardModalData.uuid,
                  cardSetId: data.cardSetWithCards.id,
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

PageCards.defaultProps = {
  data: null,
};

export default PageCards;
