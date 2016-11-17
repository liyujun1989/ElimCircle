/**
 * 创建时间：2016年11月14日 14:51:47
 * 创建人：JaminHuang
 * 描述：以琳聚会签到
 */
'use strict';
import React, { Component } from 'react';
import CountUp from 'react-countup';
import { Request } from '../../server';

import * as gatherStyle from '../../static/style/gather.css';

class Gather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preCount : 0,
            count: 0,
        }
    }

    componentWillMount() {
        gatherStyle.use();
    }

    /*签到*/
    signOnClick(userName, groupName) {
        /*判断是否属于其他*/
        if(userName == ""){
            userName = document.getElementById('txtUserName').value;
        }

        Request.FetchPost("api/Gather/Sign", {userName: userName, groupName: groupName, gatherType: "0"}).then(json=>{
            if (json.Code == 8200) {
                alert('签到成功');
                document.getElementById('txtUserName').value = "";
                this.getSignCount("0");
            }
            else {
                alert(json.ErrorMsg);
            }
        })
    }

    /*获取签到人数*/
    getSignCount(gatherType) {
        let that = this;
        Request.FetchPost("api/Gather/GetSignCount", {gatherType: gatherType}).then(json=>{
            if (json.Code == 8200) {
                that.setState({preCount:that.state.count==null?0:that.state.count, count:json.Content});
            }
            else {
                alert(json.ErrorMsg);
            }
        });
    }

    componentDidMount() {
        this.getSignCount("0");

        let selbtn = document.querySelectorAll('.select-btn li');
        let sels = document.querySelectorAll('.select-sel>li');
        let selnums = selbtn.length;

        for (var i=0; i<selnums; i++) {
            selbtn[i].index = i;
            selbtn[i].onclick = function(){
                for(var j=0; j<sels.length; j++){
                    sels[j].style.display = 'none';
                }
                sels[this.index].style.display = 'block';
            }
        }
    }

    render() {
        let { preCount, count } = this.state;
        return(
            <div id="container">
                <h3>今日签到人数 <span><CountUp start={preCount} end={count} duration={5}></CountUp></span></h3>
                <ul className="select-btn">
                    <li className="yinuo">以诺组</li>
                    <li className="zhizi">枝子组</li>
                    <li className="huoshi">活石组</li>
                    <li className="firstcome">其  他</li>
                </ul>
                <ul className="select-sel">
                    <li className="yn show">
                        <ul>
                            <li><button onClick={this.signOnClick.bind(this,'黄雪婷','以诺组')}>黄雪婷</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'许文凯','以诺组')}>许文凯</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'张凯特','以诺组')}>张凯特</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'包莹莹','以诺组')}>包莹莹</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'胡习文','以诺组')}>胡习文</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'孙佳君','以诺组')}>孙佳君</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'邵明凤','以诺组')}>邵明凤</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'庄毓勋','以诺组')}>庄毓勋</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'张欣悦','以诺组')}>张欣悦</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'李  莹','以诺组')}>李  莹</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'朱淑怡','以诺组')}>朱淑怡</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'庄佳佳','以诺组')}>庄佳佳</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'胡事乐','以诺组')}>胡事乐</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'刘乐慧','以诺组')}>刘乐慧</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'黄章明','以诺组')}>黄章明</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'罗  立','以诺组')}>罗  立</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'任佳琛','以诺组')}>任佳琛</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'章奇妙','以诺组')}>章奇妙</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'周  碧','以诺组')}>周  碧</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'陈  高','以诺组')}>玛  丽</button></li>
                        </ul>
                    </li>
                    <li className="zz">
                        <ul>
                            <li><button onClick={this.signOnClick.bind(this,'徐晶晶','枝子组')}>徐晶晶</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'蒋  驰','枝子组')}>蒋  驰</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'许鹭鹭','枝子组')}>许鹭鹭</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'杨胜钰','枝子组')}>杨胜钰</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'李  强','枝子组')}>李  强</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'陈莉莉','枝子组')}>陈莉莉</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'陈志伟','枝子组')}>陈志伟</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'蔡福才','枝子组')}>蔡福才</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'黄佳佳','枝子组')}>黄佳佳</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'彭书凡','枝子组')}>彭书凡</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'张光程','枝子组')}>张光程</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'王佳璇','枝子组')}>王佳璇</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'姜恩威','枝子组')}>姜恩威</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'陈格格','枝子组')}>陈莹莹</button></li>
                            <li><button onClick={this.signOnClick.bind(this,'陈格格','枝子组')}>郑中岳</button></li>
                        </ul>
                    </li>
                    <li className="hs">
                        <ul>
                            <li><button>333</button></li>
                            <li><button>333</button></li>
                            <li><button>333</button></li>
                            <li><button>333</button></li>
                            <li><button>333</button></li>
                            <li><button>333</button></li>
                            <li><button>333</button></li>
                            <li><button>333</button></li>
                            <li><button>333</button></li>
                            <li><button>333</button></li>
                            <li><button>333</button></li>
                            <li><button>333</button></li>
                            <li><button>333</button></li>
                            <li><button>333</button></li>
                            <li><button>333</button></li>
                        </ul>
                    </li>
                    <li className="fc" style={{textAlign:'center'}}>
                        <div className="fc-form"><span>姓名：</span><input type="text" id="txtUserName" placeholder="请输入你的姓名" /></div>
                        <ul>
                            <li><button style={{backgroundColor:"#FF7575"}} onClick={this.signOnClick.bind(this,'','其他')}>签到</button></li>
                        </ul>
                    </li>
                </ul>
                <div className="logo">
                    <img src={require("../../static/images/Logo.png")} />
                </div>
                <p className="foot">©版权所有  Grace & Elim 2016 | 以琳 • 网络事工组</p>
            </div>
        );
    }
}

export default Gather;

