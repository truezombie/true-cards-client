import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';
import { FormattedMessage, useIntl } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { WithStyles } from '@material-ui/core/styles';

import { Loader, LoaderLinear } from '../Loader';
import CardSet from '../CardSet';
import DialogConfirm from '../DialogConfirm';
import DialogForm from '../DialogForm';
import FullBlockMessage from '../FullBlockMessage';
import styles from './styles';
import APP from '../../constants/app';

const MIN_NAME_CHARACTERS = 1;

interface CardSetsProps extends WithStyles<typeof styles> {
  listCardSets: {
    id: string;
    name: string;
  }[];
  isLoading: boolean;
  onCreateCardSet: (data: { variables: { name: string } }) => void;
  onDeleteCardSet: (data: { variables: { cardSetId: string } }) => void;
  onUpdateCardSet: (data: {
    variables: { cardSetId: string; name: string };
  }) => void;
}

const CardSets = ({
  classes,
  isLoading,
  listCardSets = [],
  onUpdateCardSet,
  onCreateCardSet,
  onDeleteCardSet,
}: CardSetsProps) => {
  const [deleteCardSet, setDeleteCardSet] = useState<{
    show: boolean;
    id: string;
    name: string;
  }>({
    show: false,
    id: '',
    name: '',
  });

  const [manageCardSet, setOpenManageCardSet] = useState<{
    show: boolean;
    edit: boolean;
    create: boolean;
    id: string;
    name: string;
  }>({
    show: false,
    edit: false,
    create: false,
    id: '',
    name: '',
  });

  const intl = useIntl();

  const handleDeleteCardSet = () => {
    if (deleteCardSet.id) {
      onDeleteCardSet({ variables: { cardSetId: deleteCardSet.id } });
    }
  };

  const createNewCardSetValidationSchema = Yup.object().shape({
    name: Yup.string()
      .trim(
        intl.formatMessage({
          id: 'input.error.spaces',
        })
      )
      .strict(true)
      .min(
        MIN_NAME_CHARACTERS,
        intl.formatMessage(
          {
            id: 'input.error.min.length',
          },
          { value: MIN_NAME_CHARACTERS }
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
    if (manageCardSet.edit) {
      return {
        title: <FormattedMessage id='card.set.modal.title.edit' />,
        submit: <FormattedMessage id='btn.save' />,
      };
    }

    if (manageCardSet.create) {
      return {
        title: <FormattedMessage id='card.set.modal.title.add' />,
        submit: <FormattedMessage id='btn.add' />,
      };
    }

    return {
      title: '',
      submit: '',
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

  return (
    <Container maxWidth='md' className={classes.container}>
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          <Typography variant='h5' component='h2'>
            <FormattedMessage id='page.cardSets.title' />
          </Typography>
        </div>
        <div className={classes.headerBtn}>
          <Button
            onClick={() => {
              setOpenManageCardSet({
                show: true,
                edit: false,
                create: true,
                id: '',
                name: '',
              });
            }}
            variant='contained'
            color='secondary'
            startIcon={<AddIcon />}
          >
            New card set
          </Button>
        </div>
      </div>
      <LoaderLinear show={isLoading && listCardSets.length !== 0} />
      {loader}
      {noData}
      {listCardSets.length ? (
        <div className={classes.body}>
          {listCardSets.map((item) => (
            <CardSet
              key={item.id}
              id={item.id}
              name={item.name}
              onEdit={() => {
                setOpenManageCardSet({
                  show: true,
                  edit: true,
                  create: false,
                  id: item.id,
                  name: item.name,
                });
              }}
              onDelete={() => {
                setDeleteCardSet({
                  show: true,
                  id: item.id,
                  name: item.name,
                });
              }}
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
