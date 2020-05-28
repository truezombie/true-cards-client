export enum ERROR_CODES {
  ERROR_TOKEN_AUTH_IS_NOT_VALID = 'ERROR_TOKEN_AUTH_IS_NOT_VALID',
  ERROR_USER_NOT_EXIST = 'ERROR_USER_NOT_EXIST',
  ERROR_USER_EXIST = 'ERROR_USER_EXIST',
}

export type getErrorMessageType = (errorCode: string) => string | null;

export const getErrorMessage: getErrorMessageType = (errorCode) => {
  switch (errorCode) {
    case ERROR_CODES.ERROR_USER_NOT_EXIST:
      return 'user not exit';
    case ERROR_CODES.ERROR_USER_EXIST:
      return 'user exit';
    default:
      return null;
  }
};
