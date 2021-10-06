import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import {Main, Login, Out, Status, Manager} from './pages';
import axios from 'axios';
import { removeCookie } from './components/cookie';
import './App.css';

export default () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    axios.post('/api/isLogin')
    .then(() => {
      setIsLogin(true);
    })
    .catch((err) => {
      if(err.response.data.delCookie) {
        removeCookie('token');
      }
    })
  }, []);
  return (
    <Switch>
      <Route path='/' exact={true} component={Main}/>
      <Route path='/status/:roomid' exact={true} component={Status}/>
      {
        isLogin ? (
          <Switch>
            <Route path='/login' exact={true} component={Main}/>
            <Route path='/outing' exact={true} component={Out}/>
            <Route path='/manager' exact={true} component={Manager}/>
          </Switch>
        ) : (
          <Switch>
            <Route path='/login' exact={true} component={Login}/>
            <Route path='/outing' exact={true} component={Login}/>
            <Route path='/manager' exact={true} component={Login}/>
          </Switch>
        )
      }
    </Switch>
  );
}