/**
 * Created by qiang on 2016/11/9.
 */
var sunShine = document.getElementById('sunShine');
var ctx9 = sunShine.getContext('2d');

//--------------图片区------------------------
var sunBack = document.getElementById('sunBack'); //阳光统计区
var sun = document.getElementById('sun');//掉落的阳光
var jiFenBan = document.getElementById('jiFenBan');//计分板

//----------------总阳光数-------------------
var sunMoney = 50;
var totalGrade = 0;
var sunArr=[];


allGrage();
fallSunshine();

var fallSunshineTime = setInterval(fallSunshine,5000);//阳光的掉落
var moveSunshineTime = setInterval(moveSunshine,100);//阳光掉落的移动
//阳光的掉落
function fallSunshine(){

    ctx9.save();
    sunMo = new createSun(ctx9,sun,10,5,66,65,(Math.floor(Math.random()*(400-250))+250),50,66,65,3);
    sunArr.push(sunMo);
    ctx9.restore();
}
//阳光掉落的移动
function moveSunshine(){
    //ctx9.clearRect()
    sunShine.height =  sunShine.height;
    for(var i=0;i<sunArr.length;i++){
        sunArr[i].move();
        sunArr[i].sunInit();
    }
    allGrage();
}









//统计阳光数量
function allGrage(){
    ctx9.save();
    ctx9.drawImage(sunBack,0,0,123,34,0,5,123,34);
    ctx9.drawImage(jiFenBan,0,0,113,41,450,5,113,41);
    ctx9.font='italic 20px 微软雅黑';
    ctx9.fillText(sunMoney,50,30);
    ctx9.font='italic 14px 微软雅黑';
    ctx9.fillStyle='#ffffff'
    ctx9.fillText('总分：'+totalGrade,460,33);

    ctx9.restore();
}


function createSun(where,img,sx,sy,sw,sh,dx,dy,dw,dh,speed){
    this.where=where;
    this.img=img;  //图片对象
    this.sx = sx;   //截取图像的x轴位置
    this.sy = sy;   //截取图像的y轴位置
    this.sw = sw;   //截取图像所需的宽
    this.sh = sh;   //截取图像所需的高
    this.dx = dx;   //绘制图像的x轴位置
    this.dy = dy;   //绘制图像的x轴位置
    this.dw = dw;   //绘制图像的宽
    this.dh = dh;   //绘制图像的高
    this.speed = speed;   //绘制图像的高
    this.sunInit = function(){
        (this.where).drawImage(this.img,this.sx,this.sy,this.sw,this.sh,this.dx,this.dy,this.dw,this.dh);
    }
    this.move = function(){
        if(this.dy>=300){
           return;
        }
        this.dy += this.speed;

    }
    this.sunInit();
}