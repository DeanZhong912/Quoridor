/************************************/
/*FileName:EventProcess.js
/*Function:Quridor 事件处理
/*Editor:DeanZhong
/*LastEditTime:
/************************************/

/*变量*/
//给css选择器赋值
var TbDy = $('#game_board > tbody');

/************************************/
/*Func:监测是否有鼠标经过墙
/*Ps: 鼠标移动进去，是要找的类就会输出当前标签
/*                 不是的话就会输出上一次符合的标签
/************************************/
function EventMouseOnWalls(){
    var test=new Array(5);
    TbDy.on("hover","td[class^='walls_']",function(){
        id = $(this).attr('id');
        w = id[0];  //w 表示墙
        o = id[1];  //h 表示 横着 v 竖着
        y = $(this)["data"]("y");
        x = $(this)["data"]("x");
        //检查鼠标划过的槽是否放墙
        if ($(this).hasClass("played")){
            //有墙
            return 0;
        };
        //无墙，划过的格子的属性要变成invisible
        //检查是横着的墙
        if (o=="h" && x<8){
            //检查是否有其他障碍
            if ($("#wh" + y +"_" + (parseInt(x) + 1))["hasClass"]("played") || $("#sl" + y +"_"+ parseInt(x))["hasClass"]("played")) {
                return 0;
            };
            //无墙，划过的格子的属性要变成invisible
            $(this).toggleClass("invisible");
            $("#wh" + y +"_" + (parseInt(x) + 1)).toggleClass("invisible");
            $("#sl" + y +"_"+ parseInt(x)).toggleClass("invisible");

        };
        //检查是竖着的墙
        if (o=="v" && y<8){
            //检查是否有障碍
            if ($("#wv" + (parseInt(y) + 1)+"_" + x)["hasClass"]("played") || $("#sl" + y +"_"+ parseInt(x))["hasClass"]("played")) {
                return 0;
            };
            //没有
            $(this).toggleClass("invisible");
            $("#wv" + (parseInt(y) + 1)+"_" + x).toggleClass("invisible");
            $("#sl" + y +"_"+ x).toggleClass("invisible");
        };
        //处理一下边界
        //o==v,y==8
        if (o=="v" && y==8){
            if ($("#wv" + (parseInt(y) - 1)+"_" + x)["hasClass"]("played") || $("#sl" + (parseInt(y) - 1) +"_"+ parseInt(x))["hasClass"]("played")) {
                return 0;
            };
            $(this).toggleClass("invisible");
            $("#wv" + (parseInt(y) - 1)+"_" + x).toggleClass("invisible");
            $("#sl" + (parseInt(y) - 1) +"_"+ parseInt(x)).toggleClass("invisible");
        };
        //o==h,x==8
        if (o=="h" && x==8){
            if ($("#wh" + y +"_" + (parseInt(x) - 1))["hasClass"]("played") || $("#sl" + y +"_"+ (parseInt(x)-1))["hasClass"]("played")) {
                return 0;
            };
            $(this).toggleClass("invisible");
            $("#wh" + y +"_" + (parseInt(x) - 1)).toggleClass("invisible");
            $("#sl" + y +"_" + (parseInt(x) - 1)).toggleClass("invisible");
        };
    });
}
/************************************/
/*Func:监测是否有棋子被选中，用于移动
/************************************/
function EventPieceIsSelect(){
    TbDy.on("click","td[class^='tiles p']",function(ary){
        //获得到了坐标
        y = $(this).attr('data-y');
        x = $(this).attr('data-x');
        //判断周围周围是否可移动，若可移动则高亮
        //周围没有对方棋子
        //获取下一步可能的位置
        plid = SelectPlayer(x,y);
        var templayer = SelectPlayer(x,y);
        if(templayer!=currentplayer){
            return 0;
        };
        currentplayer = SelectPlayer(x,y);
        getValidMove(plid+1);
        //nextstep内的元素所代表的位置高亮
        for(var i=0;i<Next.length;i++){
            $("#t"+Next[i]["psy"]+"_"+Next[i]["psx"]).addClass("glow");
        };
        ary.stopPropagation();
        addToLog("玩家"+ (parseInt(currentplayer)+1)+"选中了棋子");
        selecting=1;
    });
}
//下一步被点击
function EventNextIsClick(){
    TbDy.on("click",".glow", function(){
        //获取到被点击的坐标
        y = $(this)["data"]("y");
        x = $(this)["data"]("x");
        //获取之前的坐标
        pl = players[currentplayer];
        prev_y = pl["y"];
        prev_x = pl["x"];
        //判断是否已经赢了
        if(gameState==1){
            return 1;
        };
        //判断能否移动
        if(!playMove(currentplayer,x,y)){
            return 0;
        };
        //执行移动操作，还原高亮的位置
        doMove(pl,pl["x"],pl["y"]);
        addToLog("玩家"+pl["color"]+" 移动到了 "+x+","+y);
        //判断是否赢了
        if(isWinner(pl)>0){
            alert("玩家"+pl["color"]+" 赢了");
            gameState = 1;
        };
        //轮到下一个玩家了
        changePlayer();
    });
}

//取消选中下一步，点击页面其他部位
function EventCancelNext(){
    $("html")["on"]("click", "body", function() {
        $(".glow")["removeClass"]("glow");
        Next = [];
        if(moving!=1&&walling!=1&&selecting==1){
            addToLog("玩家"+(parseInt(currentplayer)+1)+" 取消了选中");
        };
        moving = 0;
        walling = 0;
        selecting = 0;
        //重新开始
        if(gameState==1){
            var ret = confirm("是否重新开始");
            if(ret==1){
                history.go(0);
            };
            addToLog("游戏重新开始");
        };
    });
}
function putWall(wx,wy,plid,wc){
    if(playWall(wx,wy,plid,wc)==0){
        return 0;
    };
    doPlayWall(wx,wy,players[plid],wc);
    var wstring="竖";
    if(wc==2){
        wstring="横";
    };
    addToLog("玩家"+players[plid]["color"]+"在 "+wx+","+wy+" 放了一堵 "+wstring+" 墙");
    walling=1;
}
//墙槽被点击
function EventWallIsClick(){
    TbDy.on("click","td[class^='walls']",function(){
        id = $(this).attr('id');
        w = id[0];  //w 表示墙
        o = id[1];  //h 表示 横着 v 竖着
        y = $(this)["data"]("y");
        x = $(this)["data"]("x");
        if (gameState==1) {
            return 1;
        };
        //放置板
        if (o=="h" && x<8){
            putWall(x,y,currentplayer,2);
        };
        
        if (o=="h" && x==8){
            putWall(x-1,y,currentplayer,2);
        };
        
        if (o=="v" && y<8){
            putWall(x,y,currentplayer,1);
        };
        if (o=="v" && y==8){
            putWall(x,y-1,currentplayer,1);
        };
        
        $("#p"+(parseInt(currentplayer)+1)+"_walls > .count")["text"](players[currentplayer]["walls"]);
        changePlayer();
    });
}