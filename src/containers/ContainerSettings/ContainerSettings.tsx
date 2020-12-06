import React, { useMemo } from 'react';
import { Link, Route, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import { WithStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';

import ROUTES from '../../constants/router';

import {
  PageSettingsForgettingIndex,
  PageSettingsPersonalData,
} from '../../pages';

import styles from './styles';

type PageMessageProps = WithStyles<typeof styles>;

const PageMessage = ({ classes }: PageMessageProps): JSX.Element => {
  const location = useLocation<{ pathname: string }>();

  const PAGES = useMemo(() => {
    return [
      {
        id: 1,
        name: <FormattedMessage id='settings.page.forgetting.index' />,
        link: ROUTES.settings,
        selected: location.pathname === ROUTES.settings,
        component: <PageSettingsForgettingIndex />,
      },
      {
        id: 2,
        name: <FormattedMessage id='settings.page.personal.data' />,
        link: ROUTES.settingsPersonalData,
        selected: location.pathname === ROUTES.settingsPersonalData,
        component: <PageSettingsPersonalData />,
      },
      {
        id: 3,
        name: <FormattedMessage id='settings.page.email' />,
        link: ROUTES.settingsEmail,
        selected: location.pathname === ROUTES.settingsEmail,
        component: <h1>TODO: This page is not existing now</h1>,
      },
      {
        id: 4,
        name: <FormattedMessage id='settings.page.password' />,
        link: ROUTES.settingsPassword,
        selected: location.pathname === ROUTES.settingsPassword,
        component: <h1>TODO: This page is not existing now</h1>,
      },
    ];
  }, [location.pathname]);

  return (
    <Container maxWidth='md' component='main'>
      <Paper elevation={0} variant='outlined' className={classes.formContainer}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <List
              component='nav'
              dense
              subheader={
                <ListSubheader component='div' id='nested-list-subheader'>
                  Settings
                </ListSubheader>
              }
            >
              {PAGES.map(({ id, name, link, selected }) => {
                return (
                  <ListItem
                    key={id}
                    button
                    selected={selected}
                    component={Link}
                    to={link}
                    classes={{
                      root: classes.listITem,
                      selected: classes.listItemSelected,
                    }}
                  >
                    <ListItemText primary={name} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={9}>
            {PAGES.map(({ id, component, link }) => {
              return (
                <Route key={id} exact path={link}>
                  {component}
                </Route>
              );
            })}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PageMessage;
