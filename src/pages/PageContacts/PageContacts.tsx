import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { WithStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';

import { ContactListItem } from '../../types/app';

import styles from './styles';
import CONTACTS from '../../constants/contacts';

type PageContactsProps = WithStyles<typeof styles>;

const PageContacts = ({ classes }: PageContactsProps): JSX.Element => {
  const contactsList = useMemo<ContactListItem[]>(() => {
    return [
      {
        id: 1,
        labelName: <FormattedMessage id='contacts.list.label.email' />,
        label: CONTACTS.email,
        link: `mailto:${CONTACTS.email}`,
      },
      {
        id: 2,
        labelName: <FormattedMessage id='contacts.list.label.skype' />,
        label: CONTACTS.skype,
        link: `skype:${CONTACTS.skype}`,
      },
    ];
  }, [CONTACTS.skype, CONTACTS.email]);

  return (
    <Container maxWidth='sm' className={classes.container}>
      <Typography variant='h5' gutterBottom>
        <FormattedMessage id='contacts.page.title' />
      </Typography>
      <Paper elevation={0} variant='outlined'>
        <List>
          {contactsList.map(({ id, link, label, labelName }, index) => {
            return (
              <div key={id}>
                {index >= 1 ? <Divider /> : null}
                <ListItem>
                  <ListItemText
                    primary={<Link href={link}>{label}</Link>}
                    secondary={labelName}
                  />
                </ListItem>
              </div>
            );
          })}
        </List>
      </Paper>
    </Container>
  );
};

export default PageContacts;
