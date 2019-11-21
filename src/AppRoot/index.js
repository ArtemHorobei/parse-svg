import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

const AppRoot = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default AppRoot;
