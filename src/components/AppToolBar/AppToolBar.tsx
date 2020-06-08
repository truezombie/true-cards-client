import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Menu from '../Menu';

import { MenuItemProps } from '../../types/menu';

import appConstants from '../../constants/app';

import styles from './styles';

interface AppToolBarProps extends WithStyles<typeof styles> {
  userMenuItems: MenuItemProps[];
}

const AppToolBar = ({ classes, userMenuItems }: AppToolBarProps) => {
  const menuId = 'primary-search-account-menu';

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
            <Menu items={userMenuItems}>
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </Menu>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppToolBar;
