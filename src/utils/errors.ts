import { ApolloError } from '@apollo/client';

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
  ERROR_CARD_SET_NOT_FOUND = 'ERROR_CARD_SET_NOT_FOUND',
  // LEARNING ERRORS
  ERROR_LEARNING_SESSION_IS_NOT_EXIST = 'ERROR_LEARNING_SESSION_IS_NOT_EXIST',
  ERROR_LEARNING_SESSION_ALREADY_EXIST = 'ERROR_LEARNING_SESSION_ALREADY_EXIST',
  ERROR_OUT_OF_CARDS = 'ERROR_OUT_OF_CARDS',
  ERROR_CARD_IS_NOT_EXIST = 'CARD_IS_NOT_EXIST',
  // RESET PASSWORD
  ERROR_CONFIRMATION_KEY_IS_NOT_CORRECT = 'ERROR_CONFIRMATION_KEY_IS_NOT_CORRECT',
  // REGISTRATION
  ERROR_PRE_REGISTERED_DATA_NOT_FOUND = 'ERROR_PRE_REGISTERED_DATA_NOT_FOUND',
  // SUBSCRIPTION
  ERROR_SUBSCRIPTION_ALREADY_EXISTS = 'ERROR_SUBSCRIPTION_ALREADY_EXISTS',
}

export type getErrorMessageType = (errorCode: string) => string | null;

// TODO: translations
export const getErrorMessage: getErrorMessageType = (errorCode) => {
  switch (errorCode) {
    case ERROR_CODES.ERROR_USER_NOT_EXIST:
      return 'This user is not found.';
    case ERROR_CODES.ERROR_USER_EXIST:
      return 'This user is already exists.';
    case ERROR_CODES.ERROR_CARD_SET_EXIST:
      return 'Such a set of cards already exists.';
    case ERROR_CODES.ERROR_EXCEEDED_LIMIT_CARDS_SETS:
      return 'You cannot add more cards sets.';
    case ERROR_CODES.ERROR_EXCEEDED_LIMIT_CARDS_IN_CARD_SET:
      return 'You cannot add more cards to this cards set.';
    case ERROR_CODES.ERROR_LEARNING_SESSION_IS_NOT_EXIST:
      return 'Learning session is not exist. You were redirected to the main page.';
    case ERROR_CODES.ERROR_LEARNING_SESSION_ALREADY_EXIST:
      return 'Learning session is is already exist.';
    case ERROR_CODES.ERROR_CONFIRMATION_KEY_IS_NOT_CORRECT:
      return 'Confirmation key is not correct refresh current page and try again.';
    case ERROR_CODES.ERROR_PRE_REGISTERED_DATA_NOT_FOUND:
      return 'Wrong link';
    case ERROR_CODES.ERROR_SUBSCRIPTION_ALREADY_EXISTS:
      return 'Subscription already exists';
    default:
      return null;
  }
};

export type HasError = (
  gqlErrors: ApolloError | undefined,
  errorCode: string
) => HasErrorObject;

export const hasError: HasError = (error, errorCode) => {
  const currentError = error?.graphQLErrors
    ? error?.graphQLErrors.find((e) => e.message === errorCode)
    : null;
  const currentErrorMessage = currentError ? getErrorMessage(errorCode) : null;

  return {
    message: currentErrorMessage,
    hasError: !!currentError,
  };
};
