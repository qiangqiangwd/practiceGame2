/**
 * Created by qiang on 2016/11/7.
 */


//卡片所在区域
var plantsChoose = document.getElementById('plantsChoose');
var cxt2 = plantsChoose.getContext('2d');

//植物所在区域
var plants = document.getElementById('plants');
var zombies = document.getElementById('zombies');
var sunShine1 = document.getElementById('sunShine1');
var cxt3 = plants.getContext('2d');
var cxt10 = sunShine1.getContext('2d');


//植物子弹所在区域
var plantsBoom = document.getElementById('plantsBoom');
var cxt5 = plantsBoom.getContext('2d');

//----------------------------------图片区域
var peasCard = document.getElementById('peasCard');//豌豆卡片
var Peashooter = document.getElementById('Peashooter');//豌豆图片
var Peashooter_boom = document.getElementById('Peashooter_boom');//豌豆子弹图片
var nutCard = document.getElementById('nutCard');//坚果墙卡片
var wallNut = document.getElementById('wallNut');//坚果墙图片
var sunFlowerCard = document.getElementById('sunFlowerCard');//向日葵卡片
var sunflower = document.getElementById('sunflower');//向日葵图片


//---------------------------------数组区
var plantsArr=[];   //装豌豆植物的数组
var boomArr=[];     //装豌豆植物子弹的数组
var wallNutArr=[];    //装坚果墙的数组
var sunflowerArr=[];    //装向日葵的数组

//生成植物卡片
window.onload=function(){
    setPlants();
}

//生成植物卡片
function setPlants(){
    cxt2.save();
    cxt2.drawImage(peasCard,0,0,100,60,0,0,100,60);
    cxt2.font='italic 16px 微软雅黑';
    cxt2.fillText('100',65,30);
    cxt2.drawImage(nutCard,0,0,100,60,0,60,100,60);
    cxt2.fillText('50',65,90);
    cxt2.drawImage(sunFlowerCard,0,0,100,60,0,120,100,60);
    cxt2.fillText('50',65,150);
    cxt2.restore();
}

//地图网格的分布
var MapTwo = [[1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1]];



//放置植物。。。
plantsChoose.onclick=function(){
    var e = window.event||arguments[0];
    if(((e.clientX-620)>0&&(e.clientX-620)<100)
        &&(e.clientY>0&& e.clientY<60)){
        //console.log('in11');
        sunShine1.onmousedown=function(){
            var e = window.event||arguments[0];
            var i;
            var j;
            for(i=1;i<6;i++){
                for(j=0;j<10;j++){
                    //让植物放在网格中间
                    if(((e.clientY)>i*62&&(e.clientY)<i*62+62)&&((e.clientX)>j*62&&(e.clientX)<j*62+62)&&sunMoney>=100){
                        //豌豆射手
                        var plants = new createPlant(Peashooter,0,0,100,60,j*62,i*62,100,60,10);//最后一个为血量
                        plantsArr.push(plants);
                        sunMoney-=100;
                        //console.log('x轴：'+j*62);
                        //console.log('y轴：'+i*62);
                    }
                }
            }
        }
    }else if(((e.clientX-620)>0&&(e.clientX-620)<100)
        &&(e.clientY>60&& e.clientY<120)){
        sunShine1.onmousedown=function(){
            var e = window.event||arguments[0];
            var i;
            var j;
            for(i=1;i<6;i++){
                for(j=0;j<10;j++){
                    //让植物放在网格中间
                    if(((e.clientY)>i*62&&(e.clientY)<i*62+62)&&((e.clientX)>j*62&&(e.clientX)<j*62+62)&&sunMoney>=50){
                        //坚果墙
                        var plants = new createPlant(wallNut,0,0,61,71,j*62,i*62-10,61,71,100);//最后一个为血量
                        wallNutArr.push(plants);
                        sunMoney-=50;
                        //console.log('x轴：'+j*62);
                        //console.log('y轴：'+i*62);
                    }
                }
            }
        }
    }else if(((e.clientX-620)>0&&(e.clientX-620)<100)
        &&(e.clientY>120&& e.clientY<180)){
        sunShine1.onmousedown=function(){
            var e = window.event||arguments[0];
            var i;
            var j;
            for(i=1;i<6;i++){
                for(j=0;j<10;j++){
                    //让植物放在网格中间
                    if(((e.clientY)>i*62&&(e.clientY)<i*62+62)&&((e.clientX)>j*62&&(e.clientX)<j*62+62)&&sunMoney>=50){
                        //向日葵
                        var plants = new createPlant(sunflower,0,0,61,71,j*62,i*62-10,61,71,500);//最后一个为血量
                        sunflowerArr.push(plants);
                        sunMoney-=50;
                    }
                }
            }
        }
    }
}






var createBoomTime = setInterval(createBoom,4000);//生成子弹
var moveBoomTime = setInterval(moveBoom,50);//移动子弹
var boom_zombiesTime = setInterval(boom_zombies,50)  //子弹碰撞判断
var clearPlantTime = setInterval(clearPlant,100)  //清除死亡的植物
//生成子弹
function createBoom(){
    for(var i=0;i<plantsArr.length;i++){
        plantsArr[i].plantsBoom();  //创建子弹
    }
}
//移动子弹
function moveBoom(){
    cxt5.clearRect(0,0,620,500);
    for(var i=0;i<boomArr.length;i++){
        boomArr[i].boomMove();
        boomArr[i].init();
    }
}

var jisu=0;
//var flag111=false;
var creatSunArr=[];
//让血量为0的植物消失
function clearPlant(){
    cxt3.clearRect(0,0,620,500);
    for(var i=0;i<wallNutArr.length;i++){
        wallNutArr[i].plantInit();
    }
    for(var i=0;i<plantsArr.length;i++){
        plantsArr[i].plantInit();
    }
    for(var i=0;i<sunflowerArr.length;i++){
        sunflowerArr[i].plantInit();
    }
}

    //向日葵生成阳光
var creatSunshineTime = setInterval(creatSunshine,8000);//向日葵生成阳光
function creatSunshine(){
    for(var i=0;i<sunflowerArr.length;i++){
        sunflowerArr[i].createSun1();
        sunflowerArr[i].true1 = true;
        //creatSunArr.push(i);
    }
}


//捡掉落的阳光
var getSun = document.getElementById('getSun');
sunShine1.onmousemove=function(){
    var e = window.event||arguments[0];
    for(var i=0;i<sunArr.length;i++){
        if((e.clientX>=sunArr[i].dx&&e.clientX<=sunArr[i].dx+66)&&(e.clientY>=sunArr[i].dy&&e.clientY<=sunArr[i].dy+65)){
            getSun.innerHTML='<audio src="sound/points.mp3" controls="controls" autoplay="autoplay" style="display: none"></audio>';
            sunArr.splice(i,1);
            sunMoney+=25;
        }
    }
    for(var i=0;i<sunflowerArr.length;i++){
        if((e.clientX>=sunflowerArr[i].dx&&e.clientX<=sunflowerArr[i].dx+62)&&(e.clientY<=sunflowerArr[i].dy+30&&e.clientY>=sunflowerArr[i].dy-30)){
            if(sunflowerArr[i].true1){
                getSun.innerHTML='<audio src="sound/points.mp3" controls="controls" autoplay="autoplay" style="display: none"></audio>';
                sunMoney+=25;
                cxt10.clearRect(sunflowerArr[i].dx,sunflowerArr[i].dy-28,61,62)
                sunflowerArr[i].true1 = false;
                break;
            }
        }
    }
}


var zombie4 = document.getElementById('zombie4');   //奔跑吧，僵尸
var zombie4_eat = document.getElementById('zombie4_eat');   //奔跑吧，僵尸在吃东西
var shootBoom = document.getElementById('shootBoom');   //子弹碰撞的声音
//僵尸和植物之间不得不说的秘密
function boom_zombies(){
    var i;
    var j;

    //---------普通僵尸和子弹的碰撞---------------------------
    for(i=0;i<boomArr.length;i++){
        //清除子弹
        if(boomArr[i].dx>=620){
            //console.log(boomArr[i].dx);
            boomArr.splice(i,1);
            continue;
        }
        for(j=0;j<zombieArr.length;j++){
            //僵尸与子弹的碰撞判断！！
            if((boomArr[i].dx>=zombieArr[j].dx)&&
                (boomArr[i].dy>=zombieArr[j].dy+30&&boomArr[i].dy<=zombieArr[j].dy+62)){
                //console.log(boomArr[i].dy);
                shootBoom.innerHTML='<audio src="sound/splat3.mp3" controls="controls" autoplay="autoplay" style="display: none"></audio>';
                zombieArr[j].blood-=5;
                boomArr.splice(i,1);
                //i--;
                if(zombieArr[j].blood<=0){
                    zombieArr.splice(j,1);
                    totalGrade+=10;
                    //j--;
                }
                break;
            }
        }

    }
    for(i=0;i<wallNutArr.length;i++){
        for(j=0;j<zombieArr.length;j++){
            //僵尸与坚果墙的碰撞判断！！
            if((wallNutArr[i].dx+65>=zombieArr[j].dx)&&
                (wallNutArr[i].dy>=zombieArr[j].dy+30&&wallNutArr[i].dy<=zombieArr[j].dy+62)){
                zombieArr[j].dx = wallNutArr[i].dx+65;
                wallNutArr[i].blood-=1;
                if(wallNutArr[i].blood<=0){
                    wallNutArr.splice(i,1);
                    i--;
                }
                break;
            }
        }
    }
    for(i=0;i<plantsArr.length;i++){
        for(j=0;j<zombieArr.length;j++){
            //僵尸与豌豆射手的碰撞判断！！
            if((plantsArr[i].dx+65>=zombieArr[j].dx)&&
                (plantsArr[i].dy>=zombieArr[j].dy+30&&plantsArr[i].dy<=zombieArr[j].dy+62)){
                zombieArr[j].dx = plantsArr[i].dx+65;
                plantsArr[i].blood-=1;
                if(plantsArr[i].blood<=0){
                    plantsArr.splice(i,1);
                    i--;
                }
            }
            break;
        }
    }
    for(i=0;i<sunflowerArr.length;i++){
        for(j=0;j<zombieArr.length;j++){
            //僵尸与xiangrikui的碰撞判断！！
            if((sunflowerArr[i].dx+65>=zombieArr[j].dx)&&
                (sunflowerArr[i].dy>=zombieArr[j].dy+30&&sunflowerArr[i].dy<=zombieArr[j].dy+62)){
                zombieArr[j].dx = sunflowerArr[i].dx+65;
                sunflowerArr[i].blood-=1;
                if(sunflowerArr[i].blood<=0){
                    sunflowerArr.splice(i,1);
                    i--;
                }
            }
            break;
        }
    }
    //-------------路障僵尸和子弹的碰撞--------------------------
    for(i=0;i<boomArr.length;i++){
        //清除子弹
        if(boomArr[i].dx>=620){
            //console.log(boomArr[i].dx);
            boomArr.splice(i,1);
            continue;
        }
        for(j=0;j<zombieArr1.length;j++){
            //僵尸与子弹的碰撞判断！！
            if((boomArr[i].dx>=zombieArr1[j].dx)&&
                (boomArr[i].dy>=zombieArr1[j].dy+30&&boomArr[i].dy<=zombieArr1[j].dy+100)){
                //console.log(zombieArr1[j].dy);
                shootBoom.innerHTML='<audio src="sound/splat3.mp3" controls="controls" autoplay="autoplay" style="display: none"></audio>';
                zombieArr1[j].blood-=5;
                boomArr.splice(i,1);
                if(zombieArr1[j].blood<=0){
                    zombieArr1.splice(j,1);
                    totalGrade+=20;
                }
                break;
            }
        }

    }
    for(i=0;i<wallNutArr.length;i++){
        for(j=0;j<zombieArr1.length;j++){
            //僵尸与坚果墙的碰撞判断！！
            if((wallNutArr[i].dx+65>=zombieArr1[j].dx)&&
                (wallNutArr[i].dy>=zombieArr1[j].dy+30&&wallNutArr[i].dy<=zombieArr1[j].dy+100)){
                zombieArr1[j].dx = wallNutArr[i].dx+65;
                wallNutArr[i].blood-=1;
                if(wallNutArr[i].blood<=0){
                    wallNutArr.splice(i,1);
                    i--;
                }
            }
            break;
        }
    }
    for(i=0;i<plantsArr.length;i++){
        for(j=0;j<zombieArr1.length;j++){
            //僵尸与豌豆射手的碰撞判断！！
            if((plantsArr[i].dx+65>=zombieArr1[j].dx)&&
                (plantsArr[i].dy>=zombieArr1[j].dy+30&&plantsArr[i].dy<=zombieArr1[j].dy+100)){
                zombieArr1[j].dx = plantsArr[i].dx+65;
                plantsArr[i].blood-=1;
                if(plantsArr[i].blood<=0){
                    plantsArr.splice(i,1);
                    i--;
                }
                break;
            }
        }
    }
    for(i=0;i<sunflowerArr.length;i++){
        for(j=0;j<zombieArr1.length;j++){
            //僵尸与豌豆射手的碰撞判断！！
            if((sunflowerArr[i].dx+65>=zombieArr1[j].dx)&&
                (sunflowerArr[i].dy>=zombieArr1[j].dy+30&&sunflowerArr[i].dy<=zombieArr1[j].dy+62)){
                zombieArr1[j].dx = sunflowerArr[i].dx+65;
                sunflowerArr[i].blood-=1;
                if(sunflowerArr[i].blood<=0){
                    sunflowerArr.splice(i,1);
                    i--;
                }
            }
            break;
        }
    }

    //-------------奔跑吧，僵尸和子弹的碰撞--------------------------
    for(i=0;i<boomArr.length;i++){
        //清除子弹
        if(boomArr[i].dx>=620){
            boomArr.splice(i,1);
            continue;
        }
        for(j=0;j<zombieArr2.length;j++){
            //僵尸与子弹的碰撞判断！！
            if((boomArr[i].dx>=zombieArr2[j].dx)&&
                (boomArr[i].dy>=zombieArr2[j].dy+30&&boomArr[i].dy<=zombieArr2[j].dy+100)){
                shootBoom.innerHTML='<audio src="sound/splat3.mp3" controls="controls" autoplay="autoplay" style="display: none"></audio>';
                zombieArr2[j].blood-=5;
                boomArr.splice(i,1);
                if(zombieArr2[j].blood<=0){
                    zombieArr2.splice(j,1);
                    totalGrade+=30;
                }
                break;
            }
        }

    }
    for(i=0;i<wallNutArr.length;i++){
        for(j=0;j<zombieArr2.length;j++){
            //僵尸与坚果墙的碰撞判断！！
            if((wallNutArr[i].dx+35>=zombieArr2[j].dx)&&
                (wallNutArr[i].dy>=zombieArr2[j].dy+30&&wallNutArr[i].dy<=zombieArr2[j].dy+100)){
                //console.log('in');
                zombieArr2[j].dx = wallNutArr[i].dx+35;
                zombieArr2[j].img = zombie4_eat;
                wallNutArr[i].blood-=1;
                if(wallNutArr[i].blood<=0){
                    zombieArr2[j].img = zombie4;
                    wallNutArr.splice(i,1);
                    i--;
                }
                break;
            }
        }
    }
    for(i=0;i<plantsArr.length;i++){
        for(j=0;j<zombieArr2.length;j++){
            //僵尸与豌豆射手的碰撞判断！！
            if((plantsArr[i].dx+65>=zombieArr2[j].dx)&&
                (plantsArr[i].dy>=zombieArr2[j].dy+30&&plantsArr[i].dy<=zombieArr2[j].dy+100)){
                zombieArr2[j].dx = plantsArr[i].dx+65;
                plantsArr[i].blood-=1;
                if(plantsArr[i].blood<=0){
                    plantsArr.splice(i,1);
                    i--;
                }
                break;
            }
        }
    }
    for(i=0;i<sunflowerArr.length;i++){
        for(j=0;j<zombieArr2.length;j++){
            //僵尸与豌豆射手的碰撞判断！！
            if((sunflowerArr[i].dx+65>=zombieArr2[j].dx)&&
                (sunflowerArr[i].dy>=zombieArr2[j].dy+30&&sunflowerArr[i].dy<=zombieArr2[j].dy+62)){
                zombieArr2[j].dx = sunflowerArr[i].dx+65;
                sunflowerArr[i].blood-=1;
                if(sunflowerArr[i].blood<=0){
                    sunflowerArr.splice(i,1);
                    i--;
                }
            }
            break;
        }
    }
}





//设置植物模板，
function createPlant(img,sx,sy,sw,sh,dx,dy,dw,dh,blood){
    this.img=img;  //图片对象
    this.sx = sx;   //截取图像的x轴位置
    this.sy = sy;   //截取图像的y轴位置
    this.sw = sw;   //截取图像所需的宽
    this.sh = sh;   //截取图像所需的高
    this.dx = dx;   //绘制图像的x轴位置
    this.dy = dy;   //绘制图像的x轴位置
    this.dw = dw;   //绘制图像的宽
    this.dh = dh;   //绘制图像的高
    this.blood = blood;   //植物的血量

//    对植物进行初始化
    this.plantInit=function(){
        cxt3.drawImage(this.img,this.sx,this.sy,this.sw,this.sh,this.dx,this.dy,this.dw,this.dh);
    }
    //让初始化的植物进行组装
    this.plantInit();
    //植物子弹
    this.plantsBoom=function(){
        var boomX = this.dx+65;
        var boomY = this.dy;
        boom = new createPlantBoom(Peashooter_boom,26,0,30,30,boomX,boomY,24,24,5);
        boomArr[boomArr.length]=boom;
    }
    //生成阳光，向日葵专属
    this.createSun1 = function(){
        cxt10.drawImage(sun,10,5,66,65,this.dx,this.dy-30,66,65);
        creatSunArr.push();
       // creatSunArr.push(cxt10,createSun(sun,10,5,66,65,this.dx,this.dy-30,66,65));
    }
}




//设置植物的子弹模板
function createPlantBoom(img,sx,sy,sw,sh,dx,dy,dw,dh,speed){
    this.img=img;  //图片对象
    this.sx = sx;   //截取图像的x轴位置
    this.sy = sy;   //截取图像的y轴位置
    this.sw = sw;   //截取图像所需的宽
    this.sh = sh;   //截取图像所需的高
    this.dx = dx;   //绘制图像的x轴位置
    this.dy = dy;   //绘制图像的x轴位置
    this.dw = dw;   //绘制图像的宽
    this.dh = dh;   //绘制图像的高
    this.speed = speed;   //子弹鱼洞速度

//    子弹的组装
    this.init = function(){
        cxt5.drawImage(this.img,this.sx,this.sy,this.sw,this.sh,this.dx,this.dy,this.dw,this.dh);
    }
    this.boomMove = function(){
        this.dx+=this.speed;
    }
    this.init();
}
