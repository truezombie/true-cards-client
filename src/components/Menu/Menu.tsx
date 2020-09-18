import React from 'react';

import MUIMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import { WithStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';

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
        {items.map((item) => {
          return (
            <MenuItem
              onClick={() => {
                item.onClick();
                handleClose();
              }}
              key={item.id}
              disabled={item.disabled}
            >
              {item.icon ? (
                <>
                  <ListItemIcon className={classes.icon}>
                    {item.icon}
                  </ListItemIcon>
                  {item.text}
                </>
              ) : (
                <ListItem
                  onClick={() => {
                    item.onClick();
                    handleClose();
                  }}
                >
                  {item.text}
                </ListItem>
              )}
            </MenuItem>
          );
        })}
      </MUIMenu>
    </>
  );
};

export default Menu;
