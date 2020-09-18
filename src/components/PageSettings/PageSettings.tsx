import React, { useState } from 'react';
import { Formik } from 'formik';

import Container from '@material-ui/core/Container';
import { WithStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import styles from './styles';

type PageMessageProps = WithStyles<typeof styles>;

const PageMessage = ({ classes }: PageMessageProps): JSX.Element => {
  const [value, setValue] = useState(0);

  const onTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const TABS = [
    { id: 0, label: 'Forgetting factor' },
    { id: 1, label: 'User profile' },
    { id: 3, label: 'Email' },
    { id: 2, label: 'Password ' },
  ];

  return (
    <Container maxWidth='md' className={classes.container}>
      <Paper variant='outlined' elevation={0} className={classes.tabContainer}>
        <Tabs
          value={value}
          onChange={onTabChange}
          indicatorColor='primary'
          textColor='primary'
          centered
        >
          {TABS.map(({ label, id }) => (
            <Tab key={id} label={label} />
          ))}
        </Tabs>
        <Divider />
        <Container maxWidth='xs' className={classes.formContainer}>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
            }}
            // validationSchema={LoginValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
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
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  size='small'
                  fullWidth
                  id='firstName'
                  label='First name'
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
                  name='lastName'
                  label='Last name'
                  id='lastName'
                  autoComplete='current-password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  error={Boolean(errors.lastName && touched.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </form>
            )}
          </Formik>
        </Container>
      </Paper>
    </Container>
  );
};

export default PageMessage;
