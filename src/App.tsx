// import React , {Component, useState, useEffect}from 'react';
import { Route, Switch } from 'react-router-dom';
import {Main, Register, Out, Status, Uuid} from './pages';
import './App.css';

export default () => {
  return (
    <Switch>
      <Route path='/' exact={true} component={Main}/>
      <Route path='/register' exact={true} component={Register}/>
      <Route path='/outing' exact={true} component={Out}/>
      <Route path='/status/:roomid' exact={true} component={Status}/>
      <Route path='/uuid' exact={true} component={Uuid}/>
    </Switch>
  );
}