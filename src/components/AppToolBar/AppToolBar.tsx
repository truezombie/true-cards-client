import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';

import Menu from '../Menu';
import { Loader } from '../Loader';

import { MenuItemProps } from '../../types/menu';
import ROUTES from '../../constants/router';

import appConstants from '../../constants/app';

import styles from './styles';

interface AppToolBarProps extends WithStyles<typeof styles> {
  userMenuItems: MenuItemProps[];
  meFirstName?: string;
  meLastName?: string;
  meIsLoading: boolean;
}

interface MenuItems {
  text: string;
  icon: JSX.Element;
  link: string;
}

const AppToolBar = ({
  classes,
  userMenuItems,
  meIsLoading,
  meFirstName,
  meLastName,
}: AppToolBarProps) => {
  const [isOpenMenu, setOpenMenu] = React.useState<boolean>(false);

  const onToggleMenu = () => {
    setOpenMenu(!isOpenMenu);
  };

  const menuItems: MenuItems[] = [
    {
      text: 'Settings',
      link: ROUTES.settings,
      icon: <SettingsIcon />,
    },
    {
      text: 'Contacts',
      link: ROUTES.contacts,
      icon: <MailIcon />,
    },
  ];

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
        <div
          className={cx(
            {
              [classes.menuWrapperIsLoading]: meIsLoading,
            },
            classes.menuWrapper
          )}
        >
          {meIsLoading ? (
            <Loader />
          ) : (
            <List>
              <ListItem>
                <ListItemText
                  className={classes.userListItem}
                  primary={`${meFirstName} ${meLastName}`}
                />
              </ListItem>
              <Divider />
              {menuItems.map(({ text, icon, link }) => (
                <ListItem
                  component={Link}
                  to={link}
                  onClick={onToggleMenu}
                  button
                  key={text}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          )}
        </div>
      </Drawer>
    </AppBar>
  );
};

export default AppToolBar;
