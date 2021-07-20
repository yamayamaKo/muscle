import '../styles/index.css';
import React from 'react';
import NextStore from '../lib/redux-store';
import { Provider } from 'react-redux';

function _App(props) {
  const {Component, pageProps, reduxStore} = props

  return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
  )
}

export default NextStore(_App)