/**
 * Created by qiang on 2016/11/7.
 */
var Zcomming = document.getElementById('Zcomming');

var checkZombiesTime = setInterval(checkZombies,100);
var GameOver=document.getElementById('GameOver');


//弹出框
var GameoverT = document.getElementById('GameoverT');
var cxt11 = GameoverT.getContext('2d');
var tankuang = document.getElementById('tankuang');

function checkZombies(){
    var i;
    for( i=0;i<zombieArr.length;i++){
        if(zombieArr[i].dx<=-85){
            Zcomming.innerHTML='<audio src="sound/scream.mp3" controls="controls" autoplay="autoplay" style="display: none"></audio>';
            clearTime();
            cxt10.drawImage(GameOver,0,0,498,439,50,10,498,439);
            setTimeout(tanchu,3000);
            return;
        }
    }
    for( i=0;i<zombieArr1.length;i++){
        if(zombieArr1[i].dx<=-85){
            Zcomming.innerHTML='<audio src="sound/scream.mp3" controls="controls" autoplay="autoplay" style="display: none"></audio>';
            clearTime();
            cxt10.drawImage(GameOver,0,0,498,439,50,10,498,439);
            setTimeout(tanchu,3000);
            return;
        }
    }
    for( i=0;i<zombieArr2.length;i++){
        if(zombieArr2[i].dx<=-85){
            Zcomming.innerHTML='<audio src="sound/scream.mp3" controls="controls" autoplay="autoplay" style="display: none"></audio>';
            clearTime();
            cxt10.drawImage(GameOver,0,0,498,439,50,10,498,439);
            setTimeout(tanchu,3000);
            return;
        }
    }
}



function tanchu(){
    GameoverT.style.display='block';
    cxt11.drawImage(tankuang,0,0,465,554,0,0,465,554);
    cxt11.font='italic 20px 微软雅黑';
    cxt11.fillStyle='#ffffff';
    cxt11.fillText('恭喜你一共获得'+totalGrade *.1+'元代金卷！',80,250);
    cxt11.fillText('消费满'+totalGrade *.2+'可用！',80,290);
    cxt11.fillText('赶紧去疯狂购物吧，双十一快乐哦！',80,330);
}





//游戏结束，清除所有定时器
function clearTime(){
    clearInterval(checkZombiesTime);
    clearInterval(creatSunshineTime);
    clearInterval(clearPlantTime);
    clearInterval(boom_zombiesTime);
    clearInterval(moveBoomTime);
    clearInterval(createBoomTime);
    clearInterval(createZTime);
    clearInterval(createZ2Time);
    clearInterval(createZ3Time);
    clearInterval(zombieMoveTime);
    clearInterval(fallSunshineTime);
    clearInterval(moveSunshineTime);
}


