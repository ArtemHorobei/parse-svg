import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import CountryPage from '../../containers/CountryPage';
import StatePage from '../../containers/StatePage';
import CountyPage from '../../containers/CountyPage';
import ContestPage from '../../containers/ContestPage';

export const PATHS_ROUTER = {
  COUNTRY: '/country', // for V2 necessary replace this route on '/' for pick state
  STATE: '/', // for V2 necessary replace this route on '/state/stateId'
  COUNTY: '/county/:countyId',
  TOWNSHIP: '/county/:countyId/township/:townshipId',
  PRECINCT: '/county/:countyId/township/:townshipId/precinct/:precinctId',
  CONTEST: '/county/:countyId/contest/:contestId',
};

export default function Routes() {
  return (
    <Switch>
      <Route path={PATHS_ROUTER.COUNTRY} component={CountryPage} />
      <Route
        render={() => (
          <Switch>
            <Route exact path={PATHS_ROUTER.STATE} component={StatePage} />
            <Route
              exact
              path={[
                PATHS_ROUTER.PRECINCT,
                PATHS_ROUTER.TOWNSHIP,
                PATHS_ROUTER.COUNTY,
              ]}
              component={CountyPage}
            />
            <Route
              exact
              path={PATHS_ROUTER.CONTEST}
              component={ContestPage}
            />
            <Redirect to={PATHS_ROUTER.STATE} />
          </Switch>
        )}
      />
    </Switch>
  );
}
