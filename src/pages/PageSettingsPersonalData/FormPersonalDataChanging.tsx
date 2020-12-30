import React from 'react';
import { Formik } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

type FormForgettingFactorProps = {
  firstName: string;
  lastName: string;
  onUpdatePersonalData: (data: {
    variables: { firstName: string; lastName: string };
  }) => void;
};

const FormPersonalDataChanging = ({
  firstName,
  lastName,
  onUpdatePersonalData,
}: FormForgettingFactorProps): JSX.Element => {
  const intl = useIntl();

  const TabForgettingFactorValidationSchema = Yup.object().shape({
    firstName: Yup.string().required(
      intl.formatMessage({
        id: 'input.error.required.field',
      })
    ),
    lastName: Yup.string().required(
      intl.formatMessage({
        id: 'input.error.required.field',
      })
    ),
  });

  return (
    <Formik
      initialValues={{
        firstName,
        lastName,
      }}
      validationSchema={TabForgettingFactorValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onUpdatePersonalData({
          variables: {
            firstName: values.firstName,
            lastName: values.lastName,
          },
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
            variant='outlined'
            margin='normal'
            size='small'
            fullWidth
            id='firstName'
            label={<FormattedMessage id='input.first.name' />}
            name='firstName'
            autoComplete='firstName'
            autoFocus
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            error={Boolean(touched.firstName && errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />
          <TextField
            variant='outlined'
            margin='normal'
            size='small'
            fullWidth
            id='lastName'
            label={<FormattedMessage id='input.last.name' />}
            name='lastName'
            autoComplete='lastName'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            error={Boolean(touched.lastName && errors.lastName)}
            helperText={touched.lastName && errors.lastName}
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
  );
};

export default FormPersonalDataChanging;
