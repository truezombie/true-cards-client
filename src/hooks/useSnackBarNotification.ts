import { ApolloError } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { ERROR_CODES, hasError } from '../utils/errors';

const useSnackBarNotification = (): [
  (errorCode: ERROR_CODES, gqlError?: ApolloError) => void,
  () => void
] => {
  const { enqueueSnackbar } = useSnackbar();

  const showErrorSnackBar = (
    errorCode: ERROR_CODES,
    gqlError?: ApolloError
  ) => {
    if (gqlError) {
      const checked = hasError(gqlError, errorCode);

      if (checked.hasError) {
        enqueueSnackbar(checked.message, {
          variant: 'error',
        });
      }
    }
  };

  const showSuccessSnackBar = () => {
    // TODO: need to add
  };

  return [showErrorSnackBar, showSuccessSnackBar];
};

export default useSnackBarNotification;
