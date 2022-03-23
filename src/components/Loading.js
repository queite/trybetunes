import React from 'react';
import loadingImg from '../img/loading.gif';

export default class Loading extends React.Component {
  render() {
    return (
      <img src={ loadingImg } alt="loading" id="loading" />
    );
  }
}
