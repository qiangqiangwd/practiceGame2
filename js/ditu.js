/**
 * Created by qiang on 2016/11/7.
 */
var ditu = document.getElementById('ditu');
var cxt1 = ditu.getContext('2d');

    fillBianKuang();



//»­³öµØÍ¼Íø¸ñ
function fillBianKuang(){
    //console.log("in")
    cxt1.save();
    var i;
    var j;
    for(i=0;i<=5;i++){
        for(j=0;j<=10;j++){
            cxt1.strokeStyle='#9cb6d4';
            cxt1.strokeRect(j*62,i*62,62,62);
        }
    }
    cxt1.restore();
}