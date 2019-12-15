import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routers from './pages/routers';

import './App.css';

const App: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loding...</div>}>
      <Switch>
        {routers.map(router => (
          <Route
            key={router.path}
            path={router.path}
            component={router.components}
          />
        ))}
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default App;
