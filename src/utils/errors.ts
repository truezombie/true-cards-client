import { GraphQLError } from 'graphql';

import { HasErrorObject } from '../types/app';

export enum ERROR_CODES {
  // MAIN ERRORS
  ERROR_TOKEN_AUTH_IS_NOT_VALID = 'ERROR_TOKEN_AUTH_IS_NOT_VALID',
  ERROR_TOKEN_REFRESH_IS_NOT_VALID = 'ERROR_TOKEN_REFRESH_IS_NOT_VALID',
  ERROR_USER_EXIST = 'ERROR_USER_EXIST',
  ERROR_USER_NOT_EXIST = 'ERROR_USER_NOT_EXIST',
  // CARDS ERRORS
  ERROR_CARD_SET_EXIST = 'ERROR_CARD_SET_EXIST',
  // LEARNING ERRORS
  ERROR_OUT_OF_CARDS = 'ERROR_OUT_OF_CARDS',
  ERROR_CARD_IS_NOT_EXIST = 'CARD_IS_NOT_EXIST',
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

export type HasError = (
  gqlErrors: readonly GraphQLError[] | undefined,
  errorCode: string
) => HasErrorObject;

export const hasError: HasError = (gqlErrors, errorCode) => {
  const currentError = gqlErrors
    ? gqlErrors.find((error) => error.message === errorCode)
    : null;
  const currentErrorMessage = currentError ? getErrorMessage(errorCode) : null;

  return {
    message: currentErrorMessage,
    hasError: !!currentError,
  };
};
