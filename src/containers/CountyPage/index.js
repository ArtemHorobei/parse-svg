import React from 'react';

import withFetchingData from '../../hocs/withFetchingData';

const CountyPage = ({
  history,
  county,
  township,
  precinct,
}) => {
  if (precinct) return (
    <div>
      <h2>precinct info</h2>
      <div>Precinct name is {precinct.name}</div>
    </div>
  );

  if (township) return (
    <div>
      <h2>township info</h2>
      <div>Township name is {township.name}</div>
      <button
        onClick={() => history.push(`/county/2/township/3/precinct/4`)}
      >
        Precinct
      </button>
    </div>
  );

  if (county) return (
    <div>
      <h2>county info</h2>
      <div>County name is {county.name}</div>
      <button
        onClick={() => history.push(`/county/2/township/${county.townships[0].id}`)}
      >
        Township
      </button>
    </div>
  );

  return (
    <div>
      <h2>County page</h2>
      <div>County is empty</div>
    </div>
  );
};

export default withFetchingData(CountyPage);
