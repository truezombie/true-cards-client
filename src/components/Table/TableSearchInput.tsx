import React, { useState, useCallback, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import { WithStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';

import { tableSearchInputStyles } from './styles';

interface TableSearchInputProps
  extends WithStyles<typeof tableSearchInputStyles> {
  searchValue: string;
  onSearch: (search: string) => void;
}

const TableSearchInput = ({
  onSearch,
  classes,
  searchValue,
}: TableSearchInputProps) => {
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const onClearSearchInput = useCallback(() => {
    setSearchInputValue('');
    onSearch('');
  }, [setSearchInputValue, onSearch]);

  const onSubmitSearch = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    onSearch(searchInputValue);
  };

  useEffect(() => {
    if (searchValue.length) {
      setSearchInputValue(searchValue);
    }
  }, []);

  return (
    <form onSubmit={onSubmitSearch}>
      <Paper elevation={0} variant='outlined' className={classes.searchWrapper}>
        <InputBase
          className={classes.searchInput}
          value={searchInputValue}
          onChange={onChangeSearchInput}
          placeholder='Search'
          inputProps={{ 'aria-label': 'search' }}
        />

        <Tooltip
          disableFocusListener
          title={<FormattedMessage id='tooltip.search' />}
        >
          <div>
            <IconButton
              onClick={() => onSearch(searchInputValue)}
              disabled={searchInputValue.length === 0}
              type='submit'
              aria-label='search'
            >
              <SearchIcon fontSize='small' />
            </IconButton>
          </div>
        </Tooltip>

        <Tooltip
          disableFocusListener
          title={<FormattedMessage id='tooltip.clear' />}
        >
          <div className={classes.btnClear}>
            <IconButton
              onClick={onClearSearchInput}
              disabled={searchValue.length === 0}
              type='submit'
              aria-label='search'
            >
              <ClearIcon fontSize='small' />
            </IconButton>
          </div>
        </Tooltip>
      </Paper>
    </form>
  );
};

export default withStyles(tableSearchInputStyles)(TableSearchInput);
