
import {regs,auths,logins,logouts,changes} from '../../api/user';
import * as Types from '../action-types';
import util from '../../common/util';
import {push} from 'react-router-redux';
export const reg = (userInfo) => (dispatch)=>{
  regs(userInfo).then(data=>{
    console.log(data);
    if(data.name=='UserExistsError'&&data.message=='A user with the given username is already registered'){
      dispatch({
        type:Types.SET_ERROR,
        err:'该邮箱已被注册！'
      })
    }else{
      util.set('user',data); //备份数据信息
      dispatch({
        type:Types.SET_USER_INFO,
        userInfo:data,
      });
      dispatch(push('/profile')); //跳转路由
    }
  })
};
// 验证用户是否登录
export const auth = () => (dispatch) =>{
  auths().then(data=>{
     console.log(data);
    if(data.err=='未登录或登录已过期,请重新登录'){
      dispatch({
        type:Types.SET_ERROR,
        err:'未登录'
      })
    }else{
      let val=util.get('user').user;
      console.log(val);
      if(val){
      dispatch({
        type:Types.SET_USER_INFO,
        userInfo:val
      })}else{
        dispatch({
          type:Types.SET_ERROR,
          err:'未登录'
        })
      }
    }
  });
};

export const validate = ()=> (dispatch)=>{
  auths().then(data=>{
    if(data.username){
      util.set('user',data); //存到sessionStorage中
      dispatch({
        type:Types.SET_USER_INFO,
        userInfo:data
      });
      dispatch(push('/profile'));
    }
  });
};
export const login = (userInfo) => (dispatch)=>{
  logins(userInfo).then(data=>{

    if(data.err){
      if(data.err.name=='IncorrectPasswordError'||data.err.name=='IncorrectUsernameError'){
        dispatch({
          type:Types.SET_ERROR,
          err:'您输入的密码或邮箱错误！请重新输入'
        });
      }else if(data.err.name=='TooManyAttemptsError'){
        dispatch({
          type:Types.SET_ERROR,
          err:'多次登录失败，账户被锁定'
        })
      }else if(data.err.name=='AttemptTooSoonError'){
        dispatch({
          type:Types.SET_ERROR,
          err:'账户被锁定，请稍后尝试'
        })}
    } else{
        // console.log(data);
      util.set('user',data);
      dispatch({
        type:Types.SET_USER_INFO,
        userInfo:data
      });
      dispatch(push('/profile'));
    }
  })
};

//退出登录
export const logout = ()=> (dispatch)=>{
  logouts().then(data=>{
    // console.log(data);
    if(data.errno==0){
      dispatch({
        type:Types.SET_ERROR,
        err:'未登录'
      });
    }
  });
};

//修改密码
/*
export const change=(userInfo)=>(dispatch)=>{
  changes().then(data=>{
    console.log(data);
  })
}*/
