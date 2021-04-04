import React, { useState, useEffect, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { CellProps } from 'react-table';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import FolderIcon from '@material-ui/icons/Folder';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { CardSet } from '../../types/app';
import ROUTES from '../../constants/router';
import { Table, DialogConfirm, PageMainHeader } from '../../components';
import {
  pageSharedCardSetsSearchVar,
  pageSharedCardSetsRowsPerPageVar,
  pageSharedCardSetsPageNumberVar,
} from '../../cache';
import { useSnackBarNotification } from '../../hooks';
import { ERROR_CODES } from '../../utils/errors';
import {
  SUBSCRIBE_QUERY,
  UNSUBSCRIBE_QUERY,
  SEARCH_SHARED_CARD_SET_QUERY,
  LIST_SHARED_CARD_SETS_QUERY,
} from './queries';
import { tabCardSetsSharedStyles } from './styles';

type TabCardSetsSharedProps = WithStyles<typeof tabCardSetsSharedStyles>;

export type ModalSubscription = {
  id: string;
  name: string;
  show: boolean;
};

const modalInitialStateStopSharingCardSet: ModalSubscription = {
  show: false,
  id: '',
  name: '',
};

export type SharedCardSetsType = {
  sharedCardSets: {
    cardSets: CardSet[];
    count: number;
    subscriptions: string[];
  };
};

const TabCardSetsShared = ({ classes }: TabCardSetsSharedProps) => {
  const intl = useIntl();
  const [showErrorSnackBar] = useSnackBarNotification();

  const [modalSubscribe, setModalSubscribe] = useState<ModalSubscription>(
    modalInitialStateStopSharingCardSet
  );
  const [modalUnSubscribe, setModalUnSubscribe] = useState<ModalSubscription>(
    modalInitialStateStopSharingCardSet
  );

  const {
    data: {
      pageSharedCardSetsSearch,
      pageSharedCardSetsPageNumber,
      pageSharedCardSetsRowsPerPage,
    },
  } = useQuery(SEARCH_SHARED_CARD_SET_QUERY);

  const {
    loading: isLoading,
    refetch: onRefetchSharedCardSets,
    data: {
      sharedCardSets: { cardSets, count, subscriptions } = {
        cardSets: [],
        count: 0,
        subscriptions: [],
      },
    } = {},
  } = useQuery<SharedCardSetsType>(LIST_SHARED_CARD_SETS_QUERY, {
    variables: {
      search: pageSharedCardSetsSearch,
      page: pageSharedCardSetsPageNumber,
      rowsPerPage: pageSharedCardSetsRowsPerPage,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  const [onSubscribe, { error: subscriptionError }] = useMutation(
    SUBSCRIBE_QUERY,
    {
      onCompleted: () => onRefetchSharedCardSets(),
    }
  );

  const [onUnSubscribe] = useMutation(UNSUBSCRIBE_QUERY, {
    onCompleted: () => onRefetchSharedCardSets(),
  });

  const onSearch = useCallback(
    (search: string): void => {
      pageSharedCardSetsPageNumberVar(0);
      pageSharedCardSetsSearchVar(search);
    },
    [pageSharedCardSetsPageNumberVar, pageSharedCardSetsSearchVar]
  );

  const onPageChange = useCallback(
    (page: number): void => {
      pageSharedCardSetsPageNumberVar(page);
    },
    [pageSharedCardSetsPageNumberVar]
  );

  const onRowsPerPageChange = useCallback(
    (rows: number): void => {
      pageSharedCardSetsPageNumberVar(0);
      pageSharedCardSetsRowsPerPageVar(rows);
    },
    [pageSharedCardSetsPageNumberVar, pageSharedCardSetsRowsPerPageVar]
  );

  const folderIconCell = ({
    cell: {
      row: { original },
    },
  }: CellProps<CardSet>) => {
    return (
      <Tooltip
        disableFocusListener
        title={<FormattedMessage id='tooltip.go.to.cards' />}
      >
        <IconButton
          component={Link}
          to={ROUTES.cards.replace(':id', original.id)}
          aria-label='cards'
        >
          <FolderIcon fontSize='small' color='primary' />
        </IconButton>
      </Tooltip>
    );
  };

  const nameCell = ({
    value,
    cell: {
      row: { original },
    },
  }: CellProps<CardSet>) => {
    return (
      <Link to={ROUTES.cards.replace(':id', original.id)}>
        <Typography component='span' title={value} gutterBottom>
          {value}
        </Typography>
      </Link>
    );
  };

  const startFollowingCell = ({
    cell: {
      row: { original },
    },
  }: CellProps<CardSet>) => {
    return (
      <div className={classes.followingCell}>
        {subscriptions.includes(original.id) ? (
          <Button
            color='primary'
            size='small'
            variant='outlined'
            onClick={() =>
              setModalUnSubscribe({
                show: true,
                id: original.id,
                name: original.name,
              })
            }
          >
            Unsubscribe
          </Button>
        ) : (
          <Button
            color='primary'
            size='small'
            variant='outlined'
            onClick={() =>
              setModalSubscribe({
                show: true,
                id: original.id,
                name: original.name,
              })
            }
          >
            Subscribe
          </Button>
        )}
      </div>
    );
  };

  const columns = React.useMemo(
    () => [
      {
        id: 'iconFolder',
        Header: '',
        accessor: 'name',
        Cell: folderIconCell,
        width: 76,
      },
      {
        id: 'name',
        Header: <FormattedMessage id='table.title.folder.name' />,
        accessor: 'name',
        Cell: nameCell,
      },
      {
        id: 'cardSetAuthor',
        Header: 'Author',
        accessor: 'author',
      },
      {
        id: 'startFollowing',
        Header: '',
        accessor: 'id',
        Cell: startFollowingCell,
        width: 130,
      },
    ],
    [subscriptions]
  );

  useEffect(() => {
    showErrorSnackBar(
      ERROR_CODES.ERROR_SUBSCRIPTION_ALREADY_EXISTS,
      subscriptionError
    );
  }, [subscriptionError]);

  return (
    <>
      <PageMainHeader msgTitle='Shared card sets' />
      <Table
        data={cardSets}
        columns={columns}
        isLoading={isLoading}
        rowsPerPage={pageSharedCardSetsRowsPerPage}
        searchValue={pageSharedCardSetsSearch}
        page={pageSharedCardSetsPageNumber}
        onSearch={onSearch}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        paginationItemsCount={count}
        msgNoData={intl.formatMessage({
          id: 'no.data',
        })}
      />
      <DialogConfirm
        isOpen={modalSubscribe.show}
        handleAgree={() =>
          onSubscribe({
            variables: { cardSetId: modalSubscribe.id },
          })
        }
        handleClose={() =>
          setModalSubscribe({ ...modalSubscribe, show: false })
        }
        msgTitle='Subscription'
        msgClose={<FormattedMessage id='btn.close' />}
        msgAgree={<FormattedMessage id='btn.subscribe' />}
        msgBody={
          <FormattedMessage
            id='modal.subscribe.body'
            values={{ name: modalSubscribe.name }}
          />
        }
      />
      <DialogConfirm
        isOpen={modalUnSubscribe.show}
        handleAgree={() =>
          onUnSubscribe({
            variables: { cardSetId: modalUnSubscribe.id },
          })
        }
        handleClose={() =>
          setModalUnSubscribe({ ...modalUnSubscribe, show: false })
        }
        msgTitle={<FormattedMessage id='modal.unsubscribe.title' />}
        msgClose={<FormattedMessage id='btn.close' />}
        msgAgree={<FormattedMessage id='btn.unsubscription' />}
        msgBody={
          <FormattedMessage
            id='modal.unsubscribe.body'
            values={{ name: modalUnSubscribe.name }}
          />
        }
      />
    </>
  );
};

export default withStyles(tabCardSetsSharedStyles)(TabCardSetsShared);
