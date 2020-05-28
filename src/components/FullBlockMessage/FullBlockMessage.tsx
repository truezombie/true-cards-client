import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

type FullBlockMessageProps = {
  message: string | React.ReactNode;
};

const FullBlockMessage = ({ message }: FullBlockMessageProps) => {
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
    </Box>
  );
};

export default FullBlockMessage;
