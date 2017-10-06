import React,{Component} from 'react';
import './index.less';
import MHeader from '../../components/MHeader/index';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../../redux/actions/user'

class Login extends Component{
 constructor(){
    super();
    this.state = {username:'',password:'',isValid:true}
  }
  componentWillMount(){
    this.props.validate();
  }
  validateEmail=(e)=>{
    let reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!reg.test(e.target.value)){
      this.setState({isValid:false})
    }else{
      this.setState({isValid:true})
    }
  };
  login =()=>{
    if(this.state.isValid&&this.state.password){
      this.props.login({username:this.state.username,password:this.state.password});
    }
  };
  render(){
    return(
      <div className="login">
          <MHeader title="登录"/>
        <ul className="login-input">
          <li><input type="text" placeholder="请输入邮箱" onBlur={this.validateEmail} value={this.state.username} onChange={(e)=>{
            this.setState({username:e.target.value})
          }}/></li>
          {this.state.isValid?null:<li><span className="email">请输入正确的邮箱地址</span></li>}
          <li><input type="text" placeholder="请输入密码" value={this.state.password} onChange={(e)=>{
            this.setState({password:e.target.value})
          }}/></li>
          <li><Link to={'/reg'} className="goReg">前往注册</Link></li>
          <li><a className="login_btn" onClick={this.login}>登录</a></li>
         <li>{this.props.user.err=='未登录'?null:<span className="err">{this.props.user.err}</span>}</li>
        </ul>
      </div>
    )
  }
}
export default connect(state=>({...state}),action)(Login)