import { InMemoryCache, makeVar } from '@apollo/client';
import CONFIG from '../utils/config';

const ROWS_PER_PAGE = CONFIG.paginationRowsPerPage[0];

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem('token'));

export const pageCardSetsSearchVar = makeVar<string>('');

export const pageCardSetsPageNumberVar = makeVar<number>(0);

export const pageCardSetsRowsPerPageVar = makeVar<number>(ROWS_PER_PAGE);

export const pageSharedCardSetsSearchVar = makeVar<string>('');

export const pageSharedCardSetsPageNumberVar = makeVar<number>(0);

export const pageSharedCardSetsRowsPerPageVar = makeVar<number>(ROWS_PER_PAGE);

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar();
        },
        // card sets tab
        pageCardSetsSearch() {
          return pageCardSetsSearchVar();
        },
        pageCardSetsPageNumber() {
          return pageCardSetsPageNumberVar();
        },
        pageCardSetsRowsPerPage() {
          return pageCardSetsRowsPerPageVar();
        },
        // shared card sets tab
        pageSharedCardSetsSearch() {
          return pageSharedCardSetsSearchVar();
        },
        pageSharedCardSetsPageNumber() {
          return pageSharedCardSetsPageNumberVar();
        },
        pageSharedCardSetsRowsPerPage() {
          return pageSharedCardSetsRowsPerPageVar();
        },
      },
    },
  },
});
