import React from 'react';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

type SnackBarProps = SnackbarProps;

const HIDE_DURATION = 6000;

const SnackBar = ({ message }: SnackBarProps): JSX.Element => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const icon = (
    <IconButton
      size='small'
      aria-label='close'
      color='inherit'
      onClick={handleClose}
    >
      <CloseIcon fontSize='small' />
    </IconButton>
  );

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={HIDE_DURATION}
      onClose={handleClose}
      message={message}
      action={icon}
    />
  );
};

export default SnackBar;
