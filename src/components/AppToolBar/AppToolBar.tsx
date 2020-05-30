import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { WithStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import appConstants from '../../constants/app';

import styles from './styles';

interface AppToolBarProps extends WithStyles<typeof styles> {
  onLogOut: () => void;
}

const AppToolBar = ({ classes, onLogOut }: AppToolBarProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    onLogOut();
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  );

  return (
    <AppBar position='static' className={classes.appBar}>
      <Container maxWidth='md'>
        <Toolbar disableGutters>
          <IconButton edge='start' color='inherit' aria-label='open drawer'>
            <MenuIcon />
          </IconButton>

          <Typography
            className={classes.title}
            variant='button'
            display='block'
            gutterBottom
          >
            {appConstants.name}
          </Typography>

          <div className={classes.sectionDesktop}>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </Container>
      {renderMenu}
    </AppBar>
  );
};

export default AppToolBar;
