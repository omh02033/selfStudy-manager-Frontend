import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import {Main, Login, Status, Manager, Error} from './pages';
import api from './api/api';
import { removeCookie } from './components/cookie';
import './App.css';

export default () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    api.post('/api/isLogin')
    .then((res: any) => {
      setIsLogin(res.data.isLogin);
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
      <Route path='/login' exact={true} component={isLogin ? Main : Login}/>
      <Route path='/manager' exact={true} component={isLogin ? Manager : Login}/>
      <Route component={Error} />
    </Switch>
  );
}