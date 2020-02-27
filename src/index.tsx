import React from 'react';
import ReactDOM from 'react-dom';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const test = (name: string): string => {
  return name;
};

test(1);

const App = () => (
  <IconButton aria-label='delete'>
    <DeleteIcon fontSize='small' />
  </IconButton>
);

ReactDOM.render(<App />, document.getElementById('root'));
