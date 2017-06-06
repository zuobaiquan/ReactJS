/*
 * @authors :Bin Mei
 * @date    :2017-05-22
 * @description：react-redux-chat  -> 仿微信聊天工具
 */

import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classnames from 'classnames';
import actions from "src/actions";
import Scroll from 'src/components/common/Scroll'
// import dia from 'src/utils/dia';

import './Index.scss';




class Messages extends Component{
	constructor(props){
		super(props);

    	this.state = {
    		z:1
    	};
	}
	componentDidMount(){
		//dia(this);
	}
	_goTo(y){
		console.log(y)
	}
	time(date,prevDate){
		// console.log(date,prevDate)
		let Interval  = 2*60*1000;//区间
		let _date = new Date(date);
		let _prevDate = new Date(prevDate);
		let ret =_date.getTime() - _prevDate.getTime();
		if(ret>=Interval){
			return _date.getFullYear()+"-"+(_date.getMonth()+1)+"-"+_date.getDate();
		};
		return "";
	}
	link (str){
		var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/ig
		return str.replace(reg,'<a className="link" target="_bank" href="$1$2">$1$2</a>')
	}
	render(){
		let {_user,_currentChat} = this.props;
		return ( 
			
			<section className="message-w">
				<header className="group-name">
					<h3>{_currentChat.user.name}</h3>
				</header>
			    <div className="message" >
			    	<Scroll allowScroll={false} isToBottom={true} scrollbar="custom" scrollTo={(y)=>this._goTo(y)}>
				        <ul>
				            <li className="first" ><span className="history">查看更多历史消息</span></li>
				            {
			            	_currentChat.messages.map((item,i)=>{
			            		return (
			            			<li key={i}>
			            				{
			            				i!=0&&this.time(item.date,_currentChat.messages[i-1].date)!=''?(
			            					<p className="time">
							                    <span>{this.time(item.date,_currentChat.messages[i-1].date)}</span>
							                </p>
			            				):(
			            				null
			            				)
			            				}
						                
						                <div className={classnames("main",{"self":item.self})}>
						                    <img className="avatar" width="35" height="35"src={item.self ? _user.img:_currentChat.user.img}/>
						                    <div className="text" dangerouslySetInnerHTML={{ __html: this.link(item.content) }} />
						                </div>
						            </li>
			            		);
			            	})
					        }
				        </ul>
				    </Scroll>
			    </div>
			    <div className="dialog">
			        <p className="mask"></p>
			        <div className="dia-cont">
			            <div className="clearfix">
			                <p className="avatar"><img src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg" alt=""/></p>
			                <p className="nickname fl">测试的</p>
			            </div>
			            <p className="remark">
			                <label htmlFor=""> 备注  </label>
			                <input className="input" maxLength="10"  placeholder="点击添加备注" type="text" />
			            </p>
			        </div>
			    </div>
			</section>
		);
	}
};

let mapStateToProps=(state)=>{
	let {sessions,user,currentChat} = state.chatIndex;
	return {
		_sessions:sessions,
		_currentChat:currentChat,
		_user:user
	};
}; 

let mapDispatchToProps=(dispatch)=>{
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default connect(mapStateToProps,mapDispatchToProps)(Messages);

