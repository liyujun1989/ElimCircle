/**
 * 创建时间：2016年11月2日 13:52:16
 * 创建人：JaminHuang
 * 描述：以琳·聚会随机抽取
 */
'use strict';
import React, { Component } from 'react';
import moment from 'moment-timezone/moment-timezone';
import { Request, ResponseCode, Encrypt } from '../../server';
import _ from 'lodash';

import * as elimCircle from '../../static/style/elimCircle.css';

let t;
let i;
let nList;

let bs = true;

class ElimCircle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameList : [],
            count : 0
        }
    }

    startClick(count) {
        loop();

        function loop() {
            t = setTimeout(loop, 25);
            let r = Math.random() * count;
            i = parseInt(r);

            if (bs) {
                nList[i].style.backgroundColor = "#CCFF00";
                bs = false;
            } else {
                for (var j = 0; j < count; j++) { nList[j].style.backgroundColor = "#6666CC"; }
                bs = true;
            }
        }
    }

    endClick() {
        clearTimeout(t);
        nList[i].style.backgroundColor = "#CCFF00";
        let chose = document.getElementById("chooseName");
        chose.innerHTML = nList[i].innerHTML;
    }


    componentWillMount() {
        elimCircle.use();
    }

    componentDidMount() {
        let nowDate = moment().locale('en').utcOffset(0);//获取当前时间
        nList = document.getElementsByClassName("boxName");
        let data = {body : Encrypt({gatherType: "0", date: nowDate})};
        Request.FetchPost("api/Gather/GetSignNameList", data).then(json=>{
            if (json.Code == ResponseCode.Success ) {
                this.setState({nameList:json.Content, count: json.Content.length});
            }
            else {
                alert(json.ErrorMsg);
            }
        })
    }

    render() {
        return(
            <div style={{textAlign:"center"}}>
                <div className="title">以琳·聚会随机点名</div>
                <div id="chooseName" className="choose"></div>
                <div className="box">
                    {this.state.nameList.map(n=>{ return <div className="boxName" key={_.uniqueId("nameList")}>{n}</div> })}
                </div>
                <div className="btnDiv">
                    <div id="star"><a onClick={this.startClick.bind(this,this.state.count)}>开 始</a></div>
                    <div id="stop"><a onClick={this.endClick}>结 束</a></div>
                </div>
                <div className="foot">
                    <p>©版权所有  Grace & Elim 2016 | 以琳 • 网络事工组</p>
                </div>
            </div>
        );
    }
}

export default ElimCircle;
