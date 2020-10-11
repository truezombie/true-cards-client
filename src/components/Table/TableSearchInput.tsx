import React from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const TableSearchInput = () => {
  return (
    <Paper elevation={0} variant='outlined'>
      <InputBase
        placeholder='Search'
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type='submit' aria-label='search'>
        <SearchIcon fontSize='small' />
      </IconButton>
    </Paper>
  );
};

export default TableSearchInput;
