import React, { useMemo, useState, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

import CardSet from '../CardSet';
import { Loader } from '../Loader';
import DialogForm from '../DialogForm';
import DialogConfirm from '../DialogConfirm';
import PageMainHeader from '../PageMainHeader';
import FullBlockMessage from '../FullBlockMessage';

import APP from '../../constants/app';
import ROUTES from '../../constants/router';
import { CardSetsType } from '../../types/app';
import styles from './styles';

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

interface CardSetsProps extends WithStyles<typeof styles> {
  data?: CardSetsType;
  isLoading: boolean;
  onCreateCardSet: (data: { variables: { name: string } }) => void;
  onDeleteCardSet: (data: { variables: { cardSetId: string } }) => void;
  onUpdateCardSet: (data: {
    variables: { cardSetId: string; name: string };
  }) => void;
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

const CardSets = ({
  data,
  classes,
  isLoading,
  onUpdateCardSet,
  onCreateCardSet,
  onDeleteCardSet,
}: CardSetsProps) => {
  const intl = useIntl();
  const [deleteCardSet, setDeleteCardSet] = useState<ModalDeleteCardSet>(
    modalInitialStateDeleteCardSet
  );
  const [manageCardSet, setOpenManageCardSet] = useState<ModalManageCardSet>(
    modalInitialStateManageCardSet
  );

  const listCardSets = (data && data.cardSets) || [];

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

  const loader = useMemo(() => {
    return isLoading && !listCardSets.length ? <Loader /> : null;
  }, [isLoading, listCardSets]);

  const noData = useMemo(() => {
    return !listCardSets.length && !isLoading ? (
      <FullBlockMessage message={<FormattedMessage id='no.data' />} />
    ) : null;
  }, [isLoading, listCardSets]);

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
    [listCardSets]
  );

  return (
    <Container className={classes.container} maxWidth='md'>
      <PageMainHeader
        isLoading={isLoading && listCardSets.length !== 0}
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
      {loader}
      {noData}
      {listCardSets.length ? (
        <div className={classes.body}>
          {listCardSets.map((item) => (
            <CardSet
              key={item.id}
              name={item.name}
              cardsMax={item.cardsMax}
              cardsAll={item.cardsAll}
              cardsLearned={item.cardsLearned}
              cardsForgotten={item.cardsForgotten}
              cardsNew={item.cardsNew}
              linkFolder={ROUTES.cards.replace(':id', item.id)}
              linkPlay={ROUTES.startLearning.replace(':id', item.id)}
              dropDownMenuItems={getDropDownMenuItems(item)}
            />
          ))}
        </div>
      ) : null}
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

export default CardSets;
