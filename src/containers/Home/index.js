import React,{Component} from 'react';
import './index.less';
import HomeHeader from '../../components/HomeHeader/index';
export default class Home extends Component{
  render(){
    return(
      <div>
        <HomeHeader/>
        <span className="title">欢迎来到首页</span>
      </div>
    )
  }
}