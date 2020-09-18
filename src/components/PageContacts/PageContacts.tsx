import React from 'react';
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

interface PageContactsProps extends WithStyles<typeof styles> {
  contactsList: ContactListItem[];
}

const PageContacts = ({
  classes,
  contactsList,
}: PageContactsProps): JSX.Element => {
  return (
    <Container maxWidth='sm' className={classes.container}>
      <Typography variant='h5' gutterBottom>
        <FormattedMessage id='contacts.page.title' />
      </Typography>
      <Paper elevation={0} variant='outlined'>
        <List>
          {contactsList.map(({ id, link, label, labelName }, index) => {
            return (
              <>
                {index >= 1 ? <Divider /> : null}
                <ListItem key={id}>
                  <ListItemText
                    primary={<Link href={link}>{label}</Link>}
                    secondary={labelName}
                  />
                </ListItem>
              </>
            );
          })}
        </List>
      </Paper>
    </Container>
  );
};

export default PageContacts;
