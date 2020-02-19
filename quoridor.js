//初始化变量
var ChessArr = [];
var players = [];//玩家数组
var size = 9;
var walls = new Array(size+1);
var walls_set = 0;  //放置了的墙
var log = new Array(); //日志
var gameState = 0;
var moving = 0;
var walling = 0;
var Tbody=document.getElementById("gametb");
//画棋盘
function drawQuoridor(){
    /*var wlc1=document.getElementById("p1_walls");
    var wlc2=document.getElementById("p2_walls");
    wlc1.append(size+1);
    wlc2.append(size+1);
    */
    $("#p" + players[0]["color"] + "_walls > .count")["text"](players[0]["walls"]);
    $("#p" + players[1]["color"] + "_walls > .count")["text"](players[1]["walls"]);
    for(var i=0;i<17;i++){
        var Line = document.createElement("tr");//添加行
        Tbody.appendChild(Line);
        //console.log(i)
        for(var j=0;j<17;j++){
            //创建block对象标签
            //console.log(j)
            var block = document.createElement("td");
            Line.appendChild(block);
            if(i%2!=0){//这是没有空格子的
                if(j%2!=0){
                    //墙槽
                    block.className="walls_s";
                    block.id = "sl"+(i-1)/2+"_"+(j-1)/2;
                    block.className+=" invisible";
                    block.setAttribute("data-y",(i-1)/2);
                    block.setAttribute("data-x",(j-1)/2);
                }else{
                    block.className="walls_h";//横着的空隙
                    block.id="wh"+(i-1)/2+"_"+j/2;
                    block.className+=" invisible";
                    //console.log(i)
                    block.setAttribute("data-y",(i-1)/2);
                    block.setAttribute("data-x",j/2);
                }
            }else{
                if(j%2!=0){
                    block.className="walls_v";//竖着的空隙
                    block.id="wv"+i/2+"_"+(j-1)/2;
                    block.className+=" invisible";
                    block.setAttribute("data-y",i/2);
                    block.setAttribute("data-x",(j-1)/2);
                }else{
                    block.className="tiles";//棋盘格子
                    block.id="t"+i/2+"_"+j/2;
                    block.setAttribute("data-y",i/2);
                    block.setAttribute("data-x",j/2);
                }
            }
            //block.setAttribute("data-x",j);
            //block.setAttribute("data-y",i);
            //block.className+=" invisible";

            //初始化p1,p2的格子
            if(j==8&&i==0)
                block.className+=" p1"
            if(j==8&&i==16)
                block.className+=" p2"
        }
    }
}

//初始化
function init_board(){
    players[0]={
        color:1,
        x:4,
        y:0,
        walls:10
        //id:0
    };
    players[1]={
        color:2,//玩家二
        x:4,
        y:8,
        walls:10//剩余墙的数量
        //id:1
    }
    drawQuoridor();
    //console.log(players)
    //初始化墙
    for(var wl=0;wl<size;wl++){
        walls[wl]=new Array(size);
        for(var wle=0;wle<size;wle++){
            walls[wl][wle]=0;
        }
    }
    currentplayer=0;
}

//默认player为玩家1 开始
var currentplayer = 0;
function changePlayer(){
    currentplayer = (currentplayer+1)%2;
    console.log("轮到玩家"+(parseInt(currentplayer)+1)+"了");
}

//p1 p2 处理逻辑
//紫色p1 优先
function playerTurn(){
    //p1棋子是否被选中
    //被选中
    //EventPieceIsSelect(players[1]);
    //未被选中
    //是否移动棋子
    //EventWallIsClick();
    //是否取消选中

    //未被选中或者取消选中
    //放墙

    //放墙了或者移动了
    //轮到p2
}

//主函数
function main(){

}