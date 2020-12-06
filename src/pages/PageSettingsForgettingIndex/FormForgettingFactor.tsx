import React from 'react';
import { Formik } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {
  MIN_INDEX_DAYS_FOR_FORGETTING,
  MAX_INDEX_DAYS_FOR_FORGETTING,
} from '../../containers/ContainerSettings/constants';

type FormForgettingFactorProps = {
  forgettingIndex: number;
  onUpdateForgettingIndex: (data: {
    variables: { forgettingIndex: number };
  }) => void;
};

const FormForgettingFactor = ({
  forgettingIndex,
  onUpdateForgettingIndex,
}: FormForgettingFactorProps): JSX.Element => {
  const intl = useIntl();

  const TabForgettingFactorValidationSchema = Yup.object().shape({
    forgettingIndex: Yup.number()
      .integer(
        intl.formatMessage({
          id: 'input.error.is.not.integer',
        })
      )
      .min(
        MIN_INDEX_DAYS_FOR_FORGETTING,
        intl.formatMessage(
          {
            id: 'input.error.min.days',
          },
          { value: MIN_INDEX_DAYS_FOR_FORGETTING }
        )
      )
      .max(
        MAX_INDEX_DAYS_FOR_FORGETTING,
        intl.formatMessage(
          {
            id: 'input.error.max.days',
          },
          { value: MAX_INDEX_DAYS_FOR_FORGETTING }
        )
      )
      .required(
        intl.formatMessage({
          id: 'input.error.required.field',
        })
      ),
  });

  return (
    <>
      <Typography variant='subtitle1' gutterBottom>
        <FormattedMessage id='forgetting.factor.page.title' />
      </Typography>
      <Typography variant='body2'>
        <FormattedMessage id='forgetting.factor.page.title.description' />
      </Typography>
      <Container maxWidth='xs'>
        <Formik
          initialValues={{
            forgettingIndex,
          }}
          validationSchema={TabForgettingFactorValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onUpdateForgettingIndex({
              variables: { forgettingIndex: values.forgettingIndex },
            });
            setSubmitting(false);
          }}
        >
          {({
            errors,
            touched,
            values,
            handleSubmit,
            handleBlur,
            handleChange,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                inputProps={{
                  min: MIN_INDEX_DAYS_FOR_FORGETTING,
                  max: MAX_INDEX_DAYS_FOR_FORGETTING,
                  step: 1,
                }}
                variant='outlined'
                margin='normal'
                size='small'
                fullWidth
                id='forgettingIndex'
                label='Days'
                name='forgettingIndex'
                autoComplete='forgettingIndex'
                type='number'
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.forgettingIndex}
                error={Boolean(
                  touched.forgettingIndex && errors.forgettingIndex
                )}
                helperText={touched.forgettingIndex && errors.forgettingIndex}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                disabled={isSubmitting}
              >
                <FormattedMessage id='btn.save' />
              </Button>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default FormForgettingFactor;
