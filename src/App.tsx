// import React , {Component, useState, useEffect}from 'react';
import { Route, Switch } from 'react-router-dom';
// import {Out, Status, Error, Register} from './pages'
import {Register} from './pages';
import './App.css';

export default () => {
  return (
    <Switch>
      <Route path='/register' exact={true} component={Register}/>
    </Switch>
  );
}