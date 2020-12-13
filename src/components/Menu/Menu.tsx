import React from 'react';
import { Link } from 'react-router-dom';

import MUIMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { WithStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { MenuItemProps } from '../../types/menu';
import styles from './styles';

interface MenuProps extends WithStyles<typeof styles> {
  children: JSX.Element;
  items: MenuItemProps[];
}

const Menu = ({ children, items, classes }: MenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {React.cloneElement(children, { onClick: handleClick })}
      <MUIMenu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((menuItem) => {
          if (!menuItem.link && !menuItem.onClick) {
            return (
              <MenuItem key={menuItem.id} disabled={menuItem.disabled}>
                <ListItemText primary={menuItem.text} />
              </MenuItem>
            );
          }

          if (menuItem.onClick && !menuItem.link) {
            return (
              <MenuItem
                onClick={() => {
                  if (menuItem.onClick) {
                    menuItem.onClick();
                  }
                  handleClose();
                }}
                key={menuItem.id}
                disabled={menuItem.disabled}
              >
                {menuItem.icon ? (
                  <ListItemIcon className={classes.icon}>
                    {menuItem.icon}
                  </ListItemIcon>
                ) : null}
                <ListItemText primary={menuItem.text} />
              </MenuItem>
            );
          }

          if (!menuItem.onClick && menuItem.link) {
            return (
              <MenuItem
                onClick={() => handleClose()}
                key={menuItem.id}
                disabled={menuItem.disabled}
                component={Link}
                to={menuItem.link}
              >
                {menuItem.icon ? (
                  <ListItemIcon className={classes.icon}>
                    {menuItem.icon}
                  </ListItemIcon>
                ) : null}
                <ListItemText primary={menuItem.text} />
              </MenuItem>
            );
          }

          return 'Item not found';
        })}
      </MUIMenu>
    </>
  );
};

export default Menu;
