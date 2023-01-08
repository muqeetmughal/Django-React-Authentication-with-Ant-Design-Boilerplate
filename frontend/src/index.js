import React from 'react';
import ReactDOM from 'react-dom/client'

import { Provider } from "react-redux";
import { store } from './redux/store';
import App from './App';
import { Routes, Route } from 'react-router-dom';
import setupInterceptors from './common/setupInterceptors';

import CustomRouter from './components/CustomRouter';
import customHistory from './common/custom_history';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  // <React.StrictMode>
    <Provider store={store}>


      <CustomRouter history={customHistory}>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </CustomRouter>

    </Provider>

  // </React.StrictMode>
)

setupInterceptors(store);