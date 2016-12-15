/**
 * Created by qiang on 2016/11/7.
 */

var zombies = document.getElementById('zombies');
var cxt4 = zombies.getContext('2d');

var zombie1 = document.getElementById('zombie1');
//var zombie2 = document.getElementById('zombie2');
var zombie3 = document.getElementById('zombie3');   //·�Ͻ�ʬ
var zombie4 = document.getElementById('zombie4');   //���ܰɣ���ʬ
var zombie4_eat = document.getElementById('zombie4_eat');   //���ܰɣ���ʬ�ڳԶ���
var zombieArr=[];//��ͨ��ʬ����
var zombieArr1=[];//·�Ͻ�ʬ����
var zombieArr2=[];//���ܰɣ���ʬ����

var i=0;
setTimeout(Z,5000);
setTimeout(Z2,20000);
setTimeout(Z3,25000);
var createZTime;
var createZ2Time;
var createZ3Time;

var Zcomming = document.getElementById('Zcomming');
function Z(){
    createZTime = setInterval(createZ,7000);//��ͨ��ʬ
    setTimeout(Comming,3000);
}
function Comming(){
    Zcomming.innerHTML='<audio src="sound/awooga.mp3" controls="controls" autoplay="autoplay" style="display: none"></audio>'
}
function Z2(){
    createZ2Time = setInterval(createZ2,25000);//·�Ͻ�ʬ
}
function Z3(){
    createZ3Time = setInterval(createZ3,45000);//���ܰɣ���ʬ
}




var zombieMoveTime = setInterval(zombieMove,100);//��ʬ�ƶ�


//������ͨ��ʬ
var ZBlood = 15;
function createZ(){
    cxt4.save();
    var zombie = new createZombies(zombie1,0,15,90,129,550,(Math.floor(Math.random()*5))*62,90,129,1,ZBlood);//���һ���ǽ�ʬѪ��
    zombieArr.push(zombie);
    cxt4.restore();
    //console.log(Math.random()*5)
    ZBlood+=5;
    i+=62;
    if(i>=300){
        i=0;
    }
}

//����·�Ͻ�ʬ
var Z2Blood = 25;
function createZ2(){
    cxt4.save();
    var zombie1 = new createZombies(zombie3,0,0,96,143,550,(Math.floor(Math.random()*5))*62-15,96,143,.8,Z2Blood);//���һ���ǽ�ʬѪ��
    zombieArr1.push(zombie1);
    cxt4.restore();
    i+=62;
    Z2Blood+=7.5;
    if(i>=300){
        i=0;
    }
}

//�������ܰɣ���ʬ
var Z3Blood = 45;
function createZ3(){
    cxt4.save();
    var zombie1 = new createZombies(zombie4,0,0,154,160,550,(Math.floor(Math.random()*5))*62-15,154,160,2,Z3Blood);//���һ���ǽ�ʬѪ��
    zombieArr2.push(zombie1);
    cxt4.restore();
    i+=62;
    Z3Blood+=15;
    if(i>=300){
        i=0;
    }
}


var z=0;
var x=0;
var ben=0;
function zombieMove(){
    cxt4.clearRect(0,0,620,500);
    //���ܰɣ���ʬ�ƶ�
    for(var j=0;j<zombieArr2.length;j++){
        zombieArr2[j].sy = ben*160;
        zombieArr2[j].move();
        zombieArr2[j].zombieinit();
    }
    //��ͨ��ʬ�ƶ�
    for(var i=0;i<zombieArr.length;i++){
        zombieArr[i].sy = z*130.18;
        zombieArr[i].move();
        zombieArr[i].zombieinit();
    }
    //·�Ͻ�ʬ�ƶ�
    for(var j=0;j<zombieArr1.length;j++){
        zombieArr1[j].sy = x*143;
        zombieArr1[j].move();
        zombieArr1[j].zombieinit();
    }

    ben++;
    if(ben>=10){
        ben=0;
    }
    x++;
    if(x>=21){
        x=0;
    }
    z++;
    if(z>=28){
        z=0;
    }
}




function createZombies(img,sx,sy,sw,sh,dx,dy,dw,dh,speed,blood){
    this.img=img;  //ͼƬ����
    this.sx = sx;   //��ȡͼ���x��λ��
    this.sy = sy;   //��ȡͼ���y��λ��
    this.sw = sw;   //��ȡͼ������Ŀ�
    this.sh = sh;   //��ȡͼ������ĸ�
    this.dx = dx;   //����ͼ���x��λ��
    this.dy = dy;   //����ͼ���x��λ��
    this.dw = dw;   //����ͼ��Ŀ�
    this.dh = dh;   //����ͼ��ĸ�
    this.speed = speed;  //���˵��ٶ�
    this.blood = blood;   //���˵�Ѫ��


    //------�Ե��˽��г�ʼ��------
    this.zombieinit = function(){
        cxt4.save();
        cxt4.drawImage(this.img,this.sx,this.sy,this.sw,this.sh,this.dx,this.dy,this.dw,this.dh);
        cxt4.restore();
    }
    //��ʬ����
    this.move = function(){
        this.dx -=this.speed;
    }

    //���ó�ʼ����������������װ
    this.zombieinit();
}