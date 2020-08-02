import { GraphQLError } from 'graphql';

import { HasErrorObject } from '../types/app';

export enum ERROR_CODES {
  // MAIN ERRORS
  ERROR_TOKEN_AUTH_IS_NOT_VALID = 'ERROR_TOKEN_AUTH_IS_NOT_VALID',
  ERROR_TOKEN_REFRESH_IS_NOT_VALID = 'ERROR_TOKEN_REFRESH_IS_NOT_VALID',
  ERROR_USER_EXIST = 'ERROR_USER_EXIST',
  ERROR_USER_NOT_EXIST = 'ERROR_USER_NOT_EXIST',
  // CARDS SETS ERRORS
  ERROR_CARD_SET_EXIST = 'ERROR_CARD_SET_EXIST',
  ERROR_EXCEEDED_LIMIT_CARDS_SETS = 'ERROR_EXCEEDED_LIMIT_CARDS_SETS',
  // CARDS
  ERROR_EXCEEDED_LIMIT_CARDS_IN_CARD_SET = 'ERROR_EXCEEDED_LIMIT_CARDS_IN_CARD_SET',
  // LEARNING ERRORS
  ERROR_OUT_OF_CARDS = 'ERROR_OUT_OF_CARDS',
  ERROR_CARD_IS_NOT_EXIST = 'CARD_IS_NOT_EXIST',
}

export type getErrorMessageType = (errorCode: string) => string | null;

// TODO: translations
export const getErrorMessage: getErrorMessageType = (errorCode) => {
  switch (errorCode) {
    case ERROR_CODES.ERROR_USER_NOT_EXIST:
      return 'This user is not already exist';
    case ERROR_CODES.ERROR_USER_EXIST:
      return 'This user is already exists';
    case ERROR_CODES.ERROR_CARD_SET_EXIST:
      return 'Such a set of cards already exists';
    case ERROR_CODES.ERROR_EXCEEDED_LIMIT_CARDS_SETS:
      return 'You cannot add more cards sets';
    case ERROR_CODES.ERROR_EXCEEDED_LIMIT_CARDS_IN_CARD_SET:
      return 'You cannot add more cards to this cards set';
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
