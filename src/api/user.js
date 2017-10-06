import {post ,get} from './index';

let url = 'http://z005.kmtongji.com/api';
//注册接口
export const regs = (userInfo) =>{
  return post(url+'/register',userInfo)
};

//验证用户是否登录
export const auths = () =>{
  return get(url+'/users');
};

//登录接口
export const logins = (userInfo) =>{
  return post(url+'/login',userInfo)
};
//修改密码接口
export const changes=(userInfo)=>{
  return post(url+'/users/setPassword',userInfo)
};

//退出登录接口
export const logouts=()=>{
  return get(url+'/logout');
};