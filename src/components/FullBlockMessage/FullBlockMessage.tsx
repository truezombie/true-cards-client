import React from 'react';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

type FullBlockMessageProps = {
  message: string | React.ReactNode;
  link?: {
    href: string;
    text: string | JSX.Element;
  } | null;
};

const FullBlockMessage = ({
  message,
  link,
}: FullBlockMessageProps): JSX.Element => {
  return (
    <Box
      minHeight={200}
      flexGrow={1}
      flexDirection='column'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Typography variant='overline' display='block' component='span'>
        {message}
      </Typography>
      {link ? (
        <Link href={link.href} variant='body2'>
          {link.text}
        </Link>
      ) : null}
    </Box>
  );
};

FullBlockMessage.defaultProps = {
  link: null,
};

export default FullBlockMessage;
