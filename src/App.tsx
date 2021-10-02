// import React , {Component, useState, useEffect}from 'react';
import { Route, Switch } from 'react-router-dom';
import {Register, Out} from './pages';
import './App.css';

export default () => {
  return (
    <Switch>
      <Route path='/register' exact={true} component={Register}/>
      <Route path='/outing' exact={true} component={Out}/>
    </Switch>
  );
}