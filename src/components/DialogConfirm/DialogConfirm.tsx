import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { WithStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import styles from './styles';

interface DialogConfirmProps extends WithStyles<typeof styles> {
  isOpen: boolean;
  handleClose: () => void;
  handleAgree: () => void;
  msgTitle: string | JSX.Element;
  msgBody: string | JSX.Element;
  msgClose: string | JSX.Element;
  msgAgree: string | JSX.Element;
}

const DialogConfirm = ({
  isOpen,
  handleAgree,
  handleClose,
  msgClose,
  msgAgree,
  msgBody,
  classes,
  msgTitle,
}: DialogConfirmProps): JSX.Element => {
  const onAgree = () => {
    handleAgree();
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{msgTitle}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          className={classes.body}
          id='alert-dialog-description'
        >
          {msgBody}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{msgClose}</Button>
        <Button onClick={onAgree} color='primary' autoFocus>
          {msgAgree}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirm;
