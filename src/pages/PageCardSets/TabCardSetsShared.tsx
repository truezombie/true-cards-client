import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
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

  const onSearch = (search: string): void => {
    pageSharedCardSetsPageNumberVar(0);
    pageSharedCardSetsSearchVar(search);
  };

  const onPageChange = (page: number): void => {
    pageSharedCardSetsPageNumberVar(page);
  };

  const onRowsPerPageChange = (rows: number): void => {
    pageSharedCardSetsPageNumberVar(0);
    pageSharedCardSetsRowsPerPageVar(rows);
  };

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
        Header: 'Folder name',
        accessor: 'name',
        Cell: nameCell,
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
      {/* TODO: need to delete onAdd button */}
      <PageMainHeader
        msgTitle='Shared card sets'
        onAdd={() => {}} // eslint-disable-line
        msgAddBtn={<FormattedMessage id='btn.new.card.set' />}
      />
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
        msgNoData={<FormattedMessage id='no.data' />}
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
        msgAgree='Subscribe'
        msgBody={`After subscription of ${modalSubscribe.name} card set you can find it in your card sets
            and start learning.
          `}
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
        msgTitle='Unsubscription'
        msgClose={<FormattedMessage id='btn.close' />}
        msgAgree='Unsubscribe'
        msgBody={`Are you sure you want to unsubscribe from ${modalUnSubscribe.name}? Your progress on this set of cards will be deleted!`}
      />
    </>
  );
};

export default withStyles(tabCardSetsSharedStyles)(TabCardSetsShared);
