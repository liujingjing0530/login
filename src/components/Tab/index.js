import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import './index.less';
export default class Tab extends Component{
  render(){
    return(
      <nav className="footer">
        <NavLink exact to={'/'} activeClassName="selected">
          <i className="iconfont icon-shouye"></i>
          <span>首页</span>
        </NavLink>
        <NavLink to={'/profile'} activeClassName="selected">
          <i className="iconfont icon-shenfenzheng"></i>
          <span>个人中心</span>
        </NavLink>
      </nav>
    )
  }
}
