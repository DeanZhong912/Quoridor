//Quoridor 基本函数
/************************************/
//Func:检查墙是否存在 
//Param:wx wy 墙的坐标  z 竖着 1 横着2
//Return:返回 1 存在   0 不存在 
/************************************/
function wallExists(wx,wy,z){
    if(wx<0||wy<0||wx>=8||wy>=8){
        return 0;
    };
    if(walls[wy][wx]==z){
        return 1;
    };
    return 0;
}
/************************************/
/*Func:添加到日志中/
/*Param: pl 玩家信息 nx ny移动坐标 direction 坐标
/*Return: 添加成功返回1*/
/************************************/
function addToLog(pl,nx,ny,direction){
    log.push({
        player:pl,
        x:nx,
        y:ny,
        orientation:direction
    });
    return 1;
}
//测试
//addToLog(players[0],1,1,0);
//console.log(log);

/************************************/
//Func:判断胜负
//Param:pl 玩家信息
//Return:正数  pl赢了 非正则未赢
/************************************/
function isWinner(pl){
    if(pl["color"]==1&&pl["y"]==8){
        //console.log("p1到达了对岸");
        return 1;
    }else{
        if(pl["color"]==2&&pl["y"]==0){
            //console.log("p2到达了对岸");
            return 2;
        };
    };
    return 0;
}
/************************************/
//判断是否有墙
// x1,y1    x2,y2 两个点的坐标 
/************************************/
function thereIsWall(x1,y1,x2,y2){    
    var maxt,mint;
    if(x1==x2){//横坐标相等  上下排列
        maxt = Math["max"](y1,y2);
        mint = Math["min"](y1,y2);
        for(var br = mint;br<maxt;++br){
            if((wallExists(x1,br,2)||(x1>0)&&wallExists(x1-1,br,2))){
                return 1;
            };
        };
    }else{
        if(y1==y2){//纵坐标相等  左右排列
            maxt = Math["max"](x1,x2);
            mint = Math["min"](x1,x2);
            for(var br = mint;br<maxt;++br){
                if((wallExists(br,y1,1)||(x1>0)&&wallExists(br,y1-1,1))){
                    return 1;
                };
            };
        }else{
            //横坐标不等，纵坐标不等            |d
            //目前只考虑两点相邻的情况   b|d   b|  <-这种情况默认有墙
            return 1;
        }
    };
    return 0;
}
/************************************/
//判断是否有效移动
//玩家信息pl 要移动的坐标 x,y
//返回值 0，2 无效   1有效
/************************************/
function isValidMove(pl,x,y){
    if(x<0||y<0||x>8||y>8){
        return 0;//无效 越界
    };
    if((players[0]["x"]==x&&players[0]["y"]==y)||(players[1]["x"]==x&&players[1]["y"]==y)){
        return 2;//要移动的地方有棋子
    };
    pre_x = pl["x"];
    pre_y = pl["y"];
    //计算之前位置和要移动到的位置的绝对值之和判断是否跳动
    var distance = Math["abs"](pre_x-x)+Math["abs"](pre_y-y);
    if(distance==1){//移动1个距离
        //检查是否有墙
        if (thereIsWall(pre_x,pre_y,x,y)){
            return 0;//有墙，不能移动
        };
        return 1;//可移动
    }else{
        if(distance==2&& (pre_x==x || pre_y==y)){//上下左右移动两个距离
            var mid_x = (pre_x+x)/2,mid_y = (pre_y+y)/2;
            //console.log(mid_y);
            if(!((mid_x==players[1]["x"]&&mid_y==players[1]["y"])||(mid_x==players[0]["x"]&&mid_y==players[0]["y"]))){
                return 0;//中间不是对方玩家的棋子
            };
            if(thereIsWall(pre_x,pre_y,x,y)){
                return 0;//中间有墙
            };
            return 1;
        }else{
            if(distance==2){//斜着走
                if(pl["color"]==1){//获取对手的坐标
                    var rivalx = players[1]["x"],
                        rivaly = players[1]["y"];
                }else{
                    var rivalx = players[0]["y"],
                        rivaly = players[0]["x"];
                }
            };
            if((Math["abs"](pre_x-rivalx)+Math["abs"](pre_y-rivaly))!=1){//对手的棋子与自己距离非1
                return 0;
            };
            var tempx = pre_x,tempy=pre_y;
            if(pre_x+1==rivalx){//对手棋子在右边
                tempx = pre_x + 2;
            }else{
                if(pre_x-1==rivalx){//对手棋子在左边
                    tempx = pre_x-2;
                }else{
                    if(pre_y+1==rivaly){//在下面
                        tempy =pre_y+2;
                    }else{
                        if(pre_y-1==rivaly){//上面
                            tempy = pre_y-2;
                        }else{//其他情况非法
                            return 0;
                        }
                    }
                }
            };
            //检查棋盘边界,或者要移动的地方和对手的棋子之间没有墙
            if((tempx<0||tempx>=9||tempy<0||tempy>=9||thereIsWall(rivalx,rivaly,tempx,tempy))&& !thereIsWall(pre_x,pre_y,rivalx,rivaly)&& !thereIsWall(rivalx,rivaly,x,y)){
                return 1;
            };

        }
    };
    return 0;
}
var Next = [];
function addToNext(x,y){
    var postion={
        psx:x,
        psy:y
    };
    Next.push(postion);
}
//使用后记得清空
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
    this.splice(index, 1);
    }
};
/************************************/
/*Func:获取可能的下一步的数组
/*Param:plid 玩家标志 1 玩家一 2 玩家二
/*Return:0
/************************************/
function getValidMove(plid){
    //var Next = [];
    var pler = players[plid-1];
    var plx=pler["x"],ply=pler["y"];
    //距离为1
    if(1==isValidMove(pler,plx+1,ply)){//右
        addToNext(plx+1,ply);
    };
    //console.log(postion);
    if(1==isValidMove(pler,plx-1,ply)){//左
        addToNext(plx-1,ply);
    };
    //console.log(postion);
    if(1==isValidMove(pler,plx,ply+1)){//下
        addToNext(plx,ply+1);
    };
    if(1==isValidMove(pler,plx,ply-1)){//上
        addToNext(plx,ply-1);
    };
    //距离为2
    if(1==isValidMove(pler,plx+2,ply)){//右
        addToNext(plx+2,ply);
    };
    if(1==isValidMove(pler,plx-2,ply)){//左
        addToNext(plx-2,ply);
    };
    if(1==isValidMove(pler,plx,ply+2)){//下
        console.log("testmove");
        addToNext(plx,ply+2);
    };
    if(1==isValidMove(pler,plx,ply-2)){//上
        addToNext(plx,ply-2);
    };
    //对角线方向
    if(1==isValidMove(pler,plx+1,ply+1)){//右下
        addToNext(plx+1,ply+1);
    };
    if(1==isValidMove(pler,plx-1,ply-1)){//左上
        addToNext(plx-1,ply-1);
    };
    if(1==isValidMove(pler,plx+1,ply-1)){//右上
        addToNext(plx+1,ply-1);
    };
    if(1==isValidMove(pler,plx-1,ply+1)){//左下
        addToNext(plx-1,ply+1);
    };
    return 0;
}

/************************************/
//Func:判断是否有效墙 
//Param:墙的坐标xy   c 1为竖 2为横
//Retrun:0 无效  1有效
/************************************/
function isValidWall(wallx,wally,c){
    //检查墙的坐标是否越界
    if(wallx<0||wally<0||wallx>7||wally>7){
        console.log("out of range");
        return 0;
    };
    if(walls[wally][wallx]>0||
        (c==1 && wallExists(wallx,wally-1,1))||
        (c==1 && wallExists(wallx,wally+1,1))||
        (c==2 && wallExists(wallx-1,wally,2))||
        (c==2 && wallExists(wallx+1,wally,2))){
            console.log("wall Exists");
        return 0;
    };
    return 1;
}
/*************************************/
/* Func:尝试到达对面                 */
/* Param:pl 玩家信息  ches 棋盘信息  */
/* Return:0 不能到达 1能到达         */
/************************************/
function tryToReachOpponent(pl,ches){
    //pl获胜
    if(isWinner(pl)==pl["color"]){
        console.log("玩家"+pl["color"]+"可以到达");
        console.log(ches);
        return 1;
    };
    var templayer = {
        color:pl["color"],
        x:pl["x"],
        y:pl["y"],
        walls:pl["walls"]
    }
    var plx = pl["x"],ply=pl["y"];
    //玩家一向下移动+1 玩家二向下移动-1
    var plc = (pl["color"]==1)?(1):(-1);
    ches[ply][plx]=1;
    //检查上下左右能否移动,递归查找路径
    if(isValidMove(pl,plx,ply+plc)==1){//向对面方向可以移动
        templayer["x"]=plx;
        templayer["y"]=ply+plc;//templayer记录路径
        if(!ches[ply+plc][plx]&& tryToReachOpponent(templayer,ches)){//不是棋子所在
            return 1;
        };
    };
    if(isValidMove(pl,plx-1,ply)==1){//向左可以移动
        templayer["x"]=plx-1;
        templayer["y"]=ply;//templayer记录路径
        if(!ches[ply][plx-1]&& tryToReachOpponent(templayer,ches)){//不是棋子所在
            return 1;
        };
    };
    if(isValidMove(pl,plx+1,ply)==1){//向右可以移动
        templayer["x"]=plx+1;
        templayer["y"]=ply;//templayer记录路径
        if(!ches[ply][plx+1]&& tryToReachOpponent(templayer,ches)){//不是棋子所在
            return 1;
        };
    };
    if(isValidMove(pl,plx,ply-plc==1)){//背离对面方向可以移动
        templayer["x"]=plx;
        templayer["y"]=ply-plc;//templayer记录路径
        if(!ches[ply-plc][plx] && tryToReachOpponent(templayer,ches)){//不是棋子所在
            return 1;
        };
    };
    return 0;//其他情况默认不能到达
}

/*************************************/ 
/* Func：添加墙后是否把对方棋子给围起来 */
/* Param：（wx，wy，c）墙 位置 状态    */
/* Return： 0 不可以放  1 可以放       */
/*************************************/
function checkValidBoard(){
    //申请棋盘大小9X9的二维数组
    var Chess = new Array();
    var i,j,tempx,tempy;
    for(i=0;i<size;i++){
        Chess.push(new Array(size));
        for(j=0;j<size;j++){
            Chess[i][j]=0;
        };
    };
    
    //把玩家的棋子先撤下去，看能否走到对岸
    tempx = players[1]["x"];
    tempy = players[1]["y"];
    players[1]["x"]=-1;//先撤下去
    players[1]["y"]=-1;
    //玩家一不能到对面
    if(tryToReachOpponent(players[0],Chess)!=1){
        players[1]["x"]=tempx;
        players[1]["y"]=tempy;
        return 0;
    };
    //重置棋盘
    players[1]["x"]=tempx;
    players[1]["y"]=tempy;

    for(i=0;i<size;i++){
        for(j=0;j<size;j++){
            Chess[i][j]=0;
        };
    };
    tempx = players[0]["x"];
    tempy = players[0]["y"];
    players[0]["x"]=-1;
    players[0]["y"]=-1;
    //玩家二不能到达对面
    if(tryToReachOpponent(players[1],Chess)!=1){
        players[0]["x"]=tempx;
        players[0]["y"]=tempy;
        return 0;
    };
    players[0]["x"]=tempx;
    players[0]["y"]=tempy;
    return 1;
}
/************************************/
//Func:移动棋子,逻辑上的移动
//Param:玩家信息plid 0玩家一 1玩家二，
//      移动到的坐标tx,ty
//Return:1 移动成功 0 失败
/************************************/
function playMove(plid,tx,ty){
    //console.log("playmove Test");
    //console.log(plid);
    if(isValidMove(players[plid],tx,ty)==1){//检查是否能移动
        //console.log("tess1");
        players[plid]["x"]=tx;
        players[plid]["y"]=ty;
        addToLog(players[plid-1],tx,ty,0);
        return 1;
    };
    return 0;
}
/************************************/
//Func:表现上显示
//Param:玩家pl，移动到的坐标x,y
//Return:1 设置成功
/************************************/
function doMove(pl,tx,ty){
    //console.log("doMove Test");
    //console.log(pl["color"]);
    $(".p" + pl["color"]).removeClass("p"+pl["color"]);
    $("#t" + ty +"_"+ tx).addClass("p"+pl["color"]);
    $(".glow")["removeClass"]("glow");
    //console.log("p"+pl["color"]+ " " +tx + " " +ty);
    moving = 1;
    Next = [];
    return 1;
}
/************************************/
//Func:逻辑上放墙
//Param  槽的sx，sy   二维数组先y坐标后x坐标
//       玩家标志 playid 0 玩家一 1 玩家二
//       墙的横竖 c  竖1 横2
//Return: 0 放置失败 1 放置成功
/************************************/
function playWall(sx,sy,playid,c){
    //如果玩家没有板了,或者槽的位置无效
    if(players[playid]["walls"]<=0){
        console.log("there is no wall left.");
        return 0;
    };
    if(isValidWall(sx,sy,c)!=1){
        console.log("wall is not valid.")
        return 0;
    };
    //填入墙的值
    walls[sy][sx]=c;
    //是否完全堵住对手
    if(checkValidBoard()==1){//没堵住
        players[playid]["walls"]--;
        walls_set++;
        return 1;//放置成功
    }else{//堵住了
        walls[sy][sx]=0;
        return 0;
    };
}
/************************************/
//Func:表现上放墙
//Param  槽的sx，sy  
//       玩家信息 pl
//       墙的横竖 c  竖1 横2
//Return: 0 放置失败 1 放置成功
/************************************/
function doPlayWall(sx,sy,pl,c){
    if(c==1){//竖着放的
        $("#sl"+sy+"_"+sx).removeClass("invisible");
        $("#sl"+sy+"_"+sx).addClass("played");
        $("#wv"+sy+"_"+sx).removeClass("invisible");
        $("#wv"+sy+"_"+sx).addClass("played");
        $("#wv"+(sy+1)+"_"+sx).removeClass("invisble");
        $("#wv"+(sy+1)+"_"+sx).addClass("played");
    };
    if(c==2){//横着放的
        $("#sl"+sy+"_"+sx).removeClass("invisible");
        $("#sl"+sy+"_"+sx).addClass("played");
        $("#wh"+sy+"_"+sx).removeClass("invisible");
        $("#wh"+sy+"_"+sx).addClass("played");
        $("#wh"+sy+"_"+(sx+1)).removeClass("invisble");
        $("#wh"+sy+"_"+(sx+1)).addClass("played");
    };
    $("#p" + pl["color"] + "_walls > .count")["text"](pl["walls"]);
    return 1;
}
/***************************/
/* Func：选择玩家  */
/* Param: 坐标 */
/* Return: */
/***************************/
function SelectPlayer(x,y){
    if(players[0]["x"]==x && players[0]["y"]==y){
        return 0;
    };
    if(players[1]["x"]==x && players[1]["y"]==y){
        return 1;
    };
}
