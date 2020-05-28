import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface DialogConfirmProps {
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
  msgTitle,
}: DialogConfirmProps) => {
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
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {msgBody}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          {msgClose}
        </Button>
        <Button variant='outlined' onClick={onAgree} color='primary' autoFocus>
          {msgAgree}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirm;
