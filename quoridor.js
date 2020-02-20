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
var selecting = 0;
var acted = 0;
var Tbody=document.getElementById("gametb");
//画棋盘
function drawQuoridor(){
    $("#p" + players[0]["color"] + "_walls > .count")["text"](players[0]["walls"]);
    $("#p" + players[1]["color"] + "_walls > .count")["text"](players[1]["walls"]);
    for(var i=0;i<17;i++){
        var Line = document.createElement("tr");//添加行
        Tbody.appendChild(Line);
        for(var j=0;j<17;j++){
            //创建block对象标签
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
    addToLog("轮到 玩家"+(parseInt(currentplayer)+1)+" 行动了");
    acted=0;
}