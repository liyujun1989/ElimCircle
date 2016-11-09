/**
 * 创建时间：2016年11月2日 13:52:16
 * 创建人：JaminHuang
 * 描述：主页面文件
 * 算法描述：15点钟方向为90°，所以以90为起点开始算起；则第一个数字8，占比例为8%，则在360°中占的数值为360*0.08=28.8（取28） 所以期对应的值为：90-119
 */
'use strict';
import React, { Component } from 'react';

var randomNum;  //随机出来1-360的随机数 string
var nowDeg = 0;   //随机出来1-360的随机数 int
var passDeg = 0;//上一轮随机数来1-360的随机数 int
var countDeg; //随机出来1-360的随机数 + 1800
var scrollDeg = 0; // + =countDeg
var ranArr = []; //用于存放取出来的随机数
var arrPlus = 0; //用于存入随机数组的计数
var arrMin = 0;  //用于取出随机数组的计数
var color = ["#5c9bd4", "#ed7d31", "#a5a5a5", "#ffc000", "#5c9bd4", "#70ad47", "#fe7e38", "#4472c4", "#5c9bd4", "#a5a5a5", "#ed7d31", "#a5a5a5", "#ffc000", "#5c9bd4", "#70ad47", "#fe7e38", "#4472c4", "#5c9bd4", "#a5a5a5", "#ed7d31", "#a5a5a5", "#ffc000"];
var info = ["不知道", "诸葛衍昆", "温佳佳", "郑增坤", "黄雪婷", "廖蒙福", "陈志伟", "俞凯磊", "陈洪恩", "徐旭", "林启武", "林慧敏", "张晓洁", "莫海鹏", "庄毓勋", "胡事乐", "陈莉莉", "吴玲玲", "杨维", "姚启慧", "杨胜钰", "陈晓蔚"];
var centerX = 300;
var centerY = 300;
var data = [6, 4, 3, 5, 6, 4, 6, 4, 2, 5, 4, 6, 4, 5, 3, 4, 5, 6, 4, 5, 4, 5];
var canvas = null;
var ctx;
var startPoint = Math.PI;

class WeChatCircle extends Component {
    constructor(props) {
        super(props);
    }

    //绘制扇形
    drawCircle() {
        for (var i = 0; i < data.length; i++) {
            ctx.fillStyle = color[i];
            ctx.strokeStyle = color[i];
            ctx.beginPath();
            ctx.moveTo(300, 300);  //x,y,r
            ctx.arc(300, 300, 300, startPoint, startPoint - Math.PI * 2 * (data[i] / 100), true);
            ctx.fill();
            ctx.strokeStyle = "#ffffff";
            ctx.stroke();
            startPoint -= Math.PI * 2 * (data[i] / 100);
        }
    }
    //设置文字内容
    createCirText() {
        ctx.font = "Bold 20px Arial"; // 设置字体
        ctx.textAlign = 'start';//文本水平对齐方式
        ctx.textBaseline = 'middle';//文本垂直方向，基线位置
        ctx.fillStyle = "#fff";// 设置填充颜色
        var step = 0;
        for (var i = 0; i < data.length; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(centerX, centerY);//平移到圆心
            var aa = Math.PI * 1 - Math.PI * 2 * (step / 100) - Math.PI * (data[i] / 100) / 1;
            ctx.rotate(aa); //从时钟15点处开始旋转弧度i*step+step/2
            step = step + data[i];
            ctx.fillText(info[i], 125, 0);
            ctx.restore();
        }
    }

    componentWillMount() {

    }

    handleClick() {
        randomNum = ranArr[arrMin];
        passDeg = nowDeg + passDeg;
        nowDeg = parseInt(randomNum, 10);
        if (arrMin == 0) { countDeg = nowDeg + 1800; }
        else { countDeg = nowDeg + 1800 - parseInt(ranArr[arrMin - 1]); }
        arrMin = arrMin + 1;
        scrollDeg = countDeg + scrollDeg;
        $(canvas).css(
            {
                '-webkit-transform': 'rotate(' + scrollDeg + 'deg)',
                '-moz-transform': 'rotate(' + scrollDeg + 'deg)',
                '-o-transform': 'rotate(' + scrollDeg + 'deg)',
                '-ms-transform': 'rotate(' + scrollDeg + 'deg)',
                'transform': 'rotate(' + scrollDeg + 'deg)'
            }
        );
        $("#btnStart").attr({ 'disabled': "disabled" });
        setTimeout(function() { $("#btnStart").removeAttr("disabled"); }, 15000);
    }

    componentDidMount() {
        canvas = document.getElementById("piechart1");
        ctx = canvas.getContext("2d");
        this.drawCircle();
        this.createCirText();
        var addNum = setInterval(function () {
            $.ajax({
                url: 'https://www.random.org/integers/?num=1&min=0&max=360&col=1&base=10&format=plain&rnd=new',
                type: 'get',
                async: true//使用同步的方式,true为异步方式
            }).success(function (data) {
                ranArr[arrPlus] = parseInt(data, 10);
                arrPlus = arrPlus + 1;
            });
        }, 50);
        setTimeout(function () {
            clearInterval(addNum);
        }, 10000);

    }

    render() {
        return(
            <div className="wrapper">
                <div className="arrow">
                    <div className="twinkling-circle"></div>
                    <div className="twinkling-innerCircle"></div>
                </div>
                <div id="section1">
                    <div className="piechart">
                        <div id="circleWrapper"></div>
                        <canvas id="piechart1" width={600} height={600}></canvas>
                    </div>
                </div>
                <button id="btnStart" onClick={this.handleClick}>Start</button>
            </div>
        );
    }
}

export default WeChatCircle;
