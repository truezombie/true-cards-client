import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Menu from '../Menu';

import { MenuItemProps } from '../../types/menu';
import { isLoggedInVar } from '../../cache';
import ROUTES from '../../constants/router';

import appConstants from '../../constants/app';

import styles from './styles';

interface AppToolBarProps extends WithStyles<typeof styles> {
  meFirstName?: string;
  meLastName?: string;
  meIsLoading: boolean;
}

const AppToolBar = ({
  classes,
  meIsLoading,
  meFirstName,
  meLastName,
}: AppToolBarProps): JSX.Element => {
  const onLogOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');

    isLoggedInVar(false);
  };

  const menuItems: MenuItemProps[] = [
    {
      id: 1,
      text: `${meFirstName} ${meLastName}`,
      disabled: true,
    },
    {
      id: 2,
      text: 'Settings',
      link: ROUTES.settings,
      icon: <SettingsIcon />,
    },
    {
      id: 3,
      text: 'Help',
      link: ROUTES.contacts,
      icon: <HelpIcon />,
    },
    {
      id: 5,
      text: <FormattedMessage id='btn.log.out' />,
      icon: <ExitToAppIcon />,
      onClick: onLogOut,
    },
  ];

  return (
    <AppBar position='static' className={classes.appBar}>
      <Container maxWidth='md'>
        <Toolbar disableGutters>
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
            <Menu items={menuItems}>
              <IconButton
                disabled={meIsLoading}
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
    </AppBar>
  );
};

AppToolBar.defaultProps = {
  meFirstName: '',
  meLastName: '',
};

export default AppToolBar;
