/**
 * Created by JaminHuang on 2016/11/9.
 */
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
var scrollCountDeg = 0;  //+=nowDeg
var ranArr = []; //用于存放取出来的随机数
var arrPlus = 0; //用于存入随机数组的计数
var arrMin = 0;  //用于取出随机数组的计数
var realDeg = 0;
var realScroll = 0;
var money;
var color = ["#5c9bd4", "#ed7d31", "#a5a5a5", "#ffc000", "#5c9bd4", "#70ad47", "#fe7e38", "#4472c4", "#5c9bd4", "#a5a5a5", "#ed7d31", "#70ad47"];
var info = ["8元", "10元", "20元", "30元", "8元", "12元", "0元", "50元", "8元", "20元", "10元", "12元"];
var centerX = 300;
var centerY = 300;
var data = [8, 10, 10, 4, 9, 10, 7, 3, 9, 10, 10, 10];
var canvas = null;
var ctx;
var startPoint = Math.PI;
var moneyCountNum = 0;

class Circle extends Component {
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
        var step = 0;//
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
        var luckyResult = $("#luckyResult");
        var mask = $(".maskWrapper");
        var moneyCount = $("#moneyCount");
        $("#corver").css({ "display": "none" });
        randomNum = ranArr[arrMin];
        passDeg = nowDeg + passDeg;
        nowDeg = parseInt(randomNum, 10); //最终旋转的角度
        if (arrMin == 0) {
            countDeg = nowDeg + 1800;   //从数组中取出的当前随机数+1800
        }
        else {
            //console.log("parseInt(ranArr[arrMin - 1]",parseInt(ranArr[arrMin - 1]));
            countDeg = nowDeg + 1800 - parseInt(ranArr[arrMin - 1]);   //从数组中取出的当前随机数+1800
        }
        arrMin = arrMin + 1;
        scrollDeg = countDeg + scrollDeg;
        //console.log(scrollDeg);
        $(canvas).css(
            {
                '-webkit-transform': 'rotate(' + scrollDeg + 'deg)',
                '-moz-transform': 'rotate(' + scrollDeg + 'deg)',
                '-o-transform': 'rotate(' + scrollDeg + 'deg)',
                '-ms-transform': 'rotate(' + scrollDeg + 'deg)',
                'transform': 'rotate(' + scrollDeg + 'deg)'
            }
        );
        scrollCountDeg = scrollCountDeg + nowDeg;
        //console.log("nowDeg", nowDeg);
        realDeg = nowDeg + passDeg;
        //console.log("realDeg", realDeg);
        realScroll = realDeg - Math.floor(realDeg / 360) * 360;
        //console.log("realScroll", realScroll);
        if (nowDeg == 18 || nowDeg == 54 || nowDeg == 90 || nowDeg == 119 || nowDeg == 155 || nowDeg == 191 || nowDeg == 205 || nowDeg == 238 || nowDeg == 274 || nowDeg == 299 || nowDeg == 310 || nowDeg == 342) {
            setTimeout(function () {
                luckyResult.append("<li>请重新摇奖</li>");
            }, 15000);
        }
        if ((nowDeg > 342 && nowDeg <= 360) || (nowDeg >= 0 && nowDeg < 18) || (nowDeg > 155 && nowDeg < 191)) {
            setTimeout(function () {
                luckyResult.append("<li>20元</li>");
                moneyCountNum = moneyCountNum + 20;
                moneyCount.html(moneyCountNum);
            }, 15000);
        }
        if ((nowDeg > 54 && nowDeg < 90) || (nowDeg > 238 && nowDeg < 274)) {
            setTimeout(function () {
                luckyResult.append("<li>12元</li>");
                moneyCountNum = moneyCountNum + 12;
                moneyCount.html(moneyCountNum);

            }, 15000);
        }
        if (nowDeg > 299 && nowDeg < 310) {
            setTimeout(function () {
                luckyResult.append("<li>50元暴击！</li>");
                moneyCountNum = moneyCountNum + 50;
                moneyCount.html(moneyCountNum);
            }, 15000);
        }
        if ((nowDeg > 90 && nowDeg < 119) || (nowDeg > 205 && nowDeg < 238) || (nowDeg > 310 && nowDeg < 342)) {
            setTimeout(function () {
                luckyResult.append("<li>8元</li>");
                moneyCountNum = moneyCountNum + 8;
                moneyCount.html(moneyCountNum);
            }, 15000);
        }
        if (nowDeg > 191 && nowDeg < 205) {
            setTimeout(function () {
                luckyResult.append("<li>30元</li>");
                moneyCountNum = moneyCountNum + 30;
                moneyCount.html(moneyCountNum);

            }, 15000);
        }
        if ((nowDeg > 18 && nowDeg < 54) || (nowDeg > 119 && nowDeg < 155)) {
            setTimeout(function () {
                luckyResult.append("<li>10元</li>");
                moneyCountNum = moneyCountNum + 10;
                moneyCount.html(moneyCountNum);
            }, 15000);
        }
        if (nowDeg > 274 && nowDeg < 299) {
            setTimeout(function () {
                luckyResult.append("<li>0元</li>");
                moneyCountNum = moneyCountNum + 0;
                moneyCount.html(moneyCountNum);
                mask.fadeIn();
                $("#corver").css({ "display": "block" }).removeClass("pop-down").addClass("pop-up");
            }, 15000);
        }
        $("#btnStart").attr({ 'disabled': "disabled" });
        setTimeout(function () {
            $("#btnStart").removeAttr("disabled");
        }, 15000)
    }

    componentDidMount() {
        canvas = document.getElementById("piechart1");
        ctx = canvas.getContext("2d");
        this.drawCircle();
        this.createCirText();
        $(".maskWrapper").hide();
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
            clearInterval(
                addNum
            )
        }, 10000);

        //俯卧撑

        var dataV2 = ['5个','10个','0个','15个','20个','再来一次'];
        var timer = null;

        var play = $("#play");
        var stop = $("#stop");
        var closeBtn = $(".close-btn");


        play.click(playFun);
        stop.click(stopFun);
        closeBtn.click(
            function(){
                $("#corver").removeClass("pop-up").addClass("pop-down");
                setTimeout(function(){
                    $(".maskWrapper").fadeOut();
                },300)
            }
        );

        function playFun (){
            var title = $("#title");
            clearInterval(timer);
            timer = setInterval(function(){
                var random = Math.floor(Math.random()*dataV2.length);
                title.html(dataV2[random]);

            },50)
        }

        function stopFun(){
            clearInterval(timer);
        }
    }

    render() {
        return(
            <div>
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
                        <ul id="luckyResult"></ul>
                        <p>总计：<span id="moneyCount">0</span>元</p>
                    </div>
                    <button id="btnStart" onClick={this.handleClick}>Start</button>
                </div>
                <div className="maskWrapper" style={{display:'none'}}>
                    <div className="global-table">
                        <div id="corver">
                            <div className="close-btn"></div>
                            <div style={{fontSize:'20px'}}>请选择做俯卧撑个数</div>
                            <div id="title" className="title">0</div>
                            <div className="btns">
                                <span id="play">开始</span>
                                <span id="stop">停止</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Circle;
