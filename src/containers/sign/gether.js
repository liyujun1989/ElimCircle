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
        Request.FetchPost("api/Gather/Sign", {userName: userName, groupName: groupName, gatherType: "0"}).then(json=>{
            if (json.Code == 8200) {
                alert('签到成功');
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
                    <li className="firstcome">第一次</li>
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
                        </ul>
                    </li>
                    <li className="zz">
                        <ul>
                            <li><button>222</button></li>
                            <li><button>222</button></li>
                            <li><button>222</button></li>
                            <li><button>222</button></li>
                            <li><button>222</button></li>
                            <li><button>222</button></li>
                            <li><button>222</button></li>
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
                        </ul>
                    </li>
                    <li className="fc">

                    </li>
                </ul>
                <div className="logo">
                    <img src={require("../../static/images/Logo.png")} />
                </div>
                <p className="foot">©版权所有  Grace & Elim 2016 | 以琳 •网络事工组</p>
            </div>
        );
    }
}

export default Gather;

