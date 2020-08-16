import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
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
  const [isOpenMenu, setOpenMenu] = React.useState<boolean>(false);

  const onToggleMenu = () => {
    setOpenMenu(!isOpenMenu);
  };

  return (
    <AppBar position='sticky' className={classes.appBar}>
      <Container maxWidth='md'>
        <Toolbar disableGutters>
          <IconButton
            onClick={onToggleMenu}
            edge='start'
            color='inherit'
            aria-label='open drawer'
          >
            <MenuIcon />
          </IconButton>

          <Typography
            className={classes.title}
            variant='button'
            display='block'
            gutterBottom
          >
            <Link className={classes.link} to='/'>
              {appConstants.name}
            </Link>
          </Typography>

          <div className={classes.sectionDesktop}>
            <Menu items={userMenuItems}>
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls='primary-search-account-menu'
                aria-haspopup='true'
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </Menu>
          </div>
        </Toolbar>
      </Container>
      <Drawer anchor='left' open={isOpenMenu} onClose={onToggleMenu}>
        <h1>Menu</h1>
      </Drawer>
    </AppBar>
  );
};

export default AppToolBar;
