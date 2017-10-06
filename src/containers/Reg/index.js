import React,{Component} from 'react';
import './index.less';
import MHeader from '../../components/MHeader/index';
import profile from '../../common/images/profile.png';
import {connect} from 'react-redux';
import * as action from '../../redux/actions/user';
class Reg extends Component{
  constructor (){
    super();
    this.state={
      isValid:true,//代表邮箱格式正确
      isCompleted:true//代表信息填写完整
    }
  }
  validateEmail=(e)=>{
    let reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!reg.test(e.target.value)){
      this.setState({isValid:false})
    }else{
      this.setState({isValid:true})
    }
  };
  reg=()=>{
    if(this.username.value&&this.nick.value&&this.password.value){
      if (this.state.isValid){
        this.props.reg({username:this.username.value,nick:this.nick.value,password:this.password.value});
        this.setState({isValid:true,isCompleted:true});
      }
    }else{
      this.setState({isCompleted:false});
    }
  };
  render(){
    return(
      <div className="login">
          <MHeader title="注册"/>
        <img src={profile} alt="" width={'60px'}/>
        <ul>
          <li><input type="text" placeholder="请输入邮箱" onBlur={this.validateEmail} ref={(element)=>{this.username=element}}/></li>
          {this.state.isValid?null:<li><span className="email">请输入正确的邮箱地址</span></li>}
          <li>{this.props.user.err=='该邮箱已被注册!'?<span className="used">{this.props.user.err}</span>:null}</li>
          <li><input type="text" placeholder="请输入昵称" ref={(element)=>{this.nick=element}}/></li>
          <li><input type="text" placeholder="请输入密码" ref={(element)=>{this.password=element}}/></li>
          <li><a className="login_btn" onClick={this.reg}>注册</a></li>
          <li>{this.state.isCompleted?null:<span className="fullInfo">请将信息填写完整!</span>}</li>
          <li>{this.props.user.userInfo.username?<span className="success">恭喜您，注册成功</span>:null}</li>
        </ul>
      </div>
    )
  }
}
export default connect(state=>({...state}),action)(Reg)