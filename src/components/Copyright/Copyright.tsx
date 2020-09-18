import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import APP from '../../constants/app';

const Copyright = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href={APP.link}>
        {APP.name}
      </Link>
      {` ${currentYear}`}
    </Typography>
  );
};

export default Copyright;
