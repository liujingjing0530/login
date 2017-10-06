import React,{Component} from 'react';
import './index.less';
import profile from '../../common/images/profile.png';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../../redux/actions/user'
class Profile extends Component{
  componentDidMount(){
    this.props.auth();
  }
  logout=()=>{
    this.props.user.userInfo={};
    this.props.logout();
  }
  render(){
    return(
      <div className="profile">
        <div className="profile_bg">
          <img src={profile} width={"60px"}/>
          {this.props.user.err=='未登录'?<Link to={'/login'} className="login_btn">请登录</Link>:<a className="login-nick">{this.props.user.userInfo.nick}</a>}
        </div>
        {this.props.user.userInfo.nick?<div className="btns">
          {/*<Link to={'/change'} className="changePwd">修改密码</Link>*/}
          <a className="quit" onClick={this.logout}>退出登录</a>
        </div>:null}
      </div>
    )
  }
}
export default connect(state=>({...state}),action)(Profile)