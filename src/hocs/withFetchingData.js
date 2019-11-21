import { compose, withProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import loGet from 'lodash/get';

import mockData from '../utils/mockData';

export default function withFetchingData(WrappedComponent) {
  return compose(
    withRouter,

    withProps(({
      match: {
        params: {
          countyId,
          townshipId,
          precinctId,
        },
      }
    }) => {
      const county = countyId
        ? loGet(mockData, 'state[0].counties', []).find(({ id }) => id === +countyId)
        : null;

      const township = townshipId && county
        ? loGet(county, 'townships', []).find(({ id }) => id === +townshipId)
        : null;

      const precinct = precinctId && township
        ? loGet(township, 'precincts', []).find(({ id }) => id === +precinctId)
        : null;

      return {
        county,
        township,
        precinct,
      };
    }),
  )(WrappedComponent);
}
