// import React , {Component, useState, useEffect}from 'react';
import { Route, Switch } from 'react-router-dom';
import {Main, Login, Out, Status} from './pages';
import './App.css';

export default () => {
  return (
    <Switch>
      <Route path='/' exact={true} component={Main}/>
      <Route path='/login' exact={true} component={Login}/>
      <Route path='/outing' exact={true} component={Out}/>
      <Route path='/status/:roomid' exact={true} component={Status}/>
    </Switch>
  );
}