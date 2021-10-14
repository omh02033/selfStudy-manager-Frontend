import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import {Main, Login, Status, Manager} from './pages';
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
    .catch(e => {
      console.log(e);
      if(e.response.data.delCookie) {
        removeCookie('token');
      }
    });
  }, []);
  return (
    <Switch>
      <Route path='/' exact={true} component={Main}/>
      <Route path='/status/:roomid' exact={true} component={Status}/>
      {
        isLogin ? (
          <Switch>
            <Route path='/login' exact={true} component={Main}/>
            <Route path='/manager' exact={true} component={Manager}/>
          </Switch>
        ) : (
          <Switch>
            <Route path='/login' exact={true} component={Login}/>
            <Route path='/manager' exact={true} component={Login}/>
          </Switch>
        )
      }
    </Switch>
  );
}