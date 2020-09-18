import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { Formik, FormikConfig, FormikValues, isFunction } from 'formik';

interface DialogConfirmProps extends FormikConfig<FormikValues> {
  isOpen: boolean;
  onClose: () => void;
  msgTitle: string | JSX.Element;
  msgClose: string | JSX.Element;
  msgSubmit: string | JSX.Element;
}

const DialogForm = ({
  isOpen,
  initialValues,
  validationSchema,
  onClose,
  onSubmit,
  msgClose,
  msgSubmit,
  msgTitle,
  children,
}: DialogConfirmProps): JSX.Element => {
  return (
    <Dialog
      maxWidth='xs'
      fullWidth
      open={isOpen}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{msgTitle}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) => {
          onSubmit(values, formikHelpers);
          onClose();
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <DialogContent dividers>
              {children && isFunction(children) ? children({ ...props }) : null}
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>{msgClose}</Button>
              <Button
                type='submit'
                disabled={props.isSubmitting}
                color='primary'
              >
                {msgSubmit}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default DialogForm;
