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
        //$(this).toggleClass("invisible");
        //检查是横着的墙
        if (o=="h" && x<8){
            //检查是否有其他障碍
            //console.log("这是横墙");
            if ($("#wh" + y +"_" + (parseInt(x) + 1))["hasClass"]("played") || $("#sl" + y +"_"+ parseInt(x))["hasClass"]("played")) {
                console.log("不能放了");
                return 0;
            };
            //console.log("这里能放");
            //无墙，划过的格子的属性要变成invisible
            $(this).toggleClass("invisible");
            $("#wh" + y +"_" + (parseInt(x) + 1)).toggleClass("invisible");
            $("#sl" + y +"_"+ parseInt(x)).toggleClass("invisible");

        };
        //检查是竖着的墙
        if (o=="v" && y<8){
            //检查是否有障碍
            //console.log("这是竖墙");
            if ($("#wv" + (parseInt(y) + 1)+"_" + x)["hasClass"]("played") || $("#sl" + y +"_"+ parseInt(x))["hasClass"]("played")) {
                console.log("不能放了");
                return 0;
            };
            //console.log("这里能放");
            //没有
            $(this).toggleClass("invisible");
            $("#wv" + (parseInt(y) + 1)+"_" + x).toggleClass("invisible");
            $("#sl" + y +"_"+ x).toggleClass("invisible");
        };
        //处理一下边界
        //o==v,y==8
        if (o=="v" && y==8){
            //console.log("这是竖着的边界");
            if ($("#wv" + (parseInt(y) - 1)+"_" + x)["hasClass"]("played") || $("#sl" + (parseInt(y) - 1) +"_"+ parseInt(x))["hasClass"]("played")) {
                console.log("不能放了");
                return 0;
            };
            $(this).toggleClass("invisible");
            $("#wv" + (parseInt(y) - 1)+"_" + x).toggleClass("invisible");
            $("#sl" + (parseInt(y) - 1) +"_"+ parseInt(x)).toggleClass("invisible");
        };
        //o==h,x==8
        if (o=="h" && x==8){
            //console.log("这是横着的边界");
            if ($("#wh" + y +"_" + (parseInt(x) - 1))["hasClass"]("played") || $("#sl" + y +"_"+ (parseInt(x)-1))["hasClass"]("played")) {
                console.log("不能放了");
                return 0;
            };
            $(this).toggleClass("invisible");
            $("#wh" + y +"_" + (parseInt(x) - 1)).toggleClass("invisible");
            $("#sl" + y +"_" + (parseInt(x) - 1)).toggleClass("invisible");
        };
        //test[0]=id;
        //test[1]=w;
        //test[2]=o;
        //test[3]=y;
        //test[4]=x;
        //console.log(test);
    });
}
function test1(){
    EventMouseOnWalls();
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
        currentplayer = SelectPlayer(x,y);
        //console.log(plid);
        getValidMove(plid+1);
        //console.log(Next);
        //nextstep内的元素所代表的位置高亮
        for(var i=0;i<Next.length;i++){
            $("#t"+Next[i]["psy"]+"_"+Next[i]["psx"]).addClass("glow");
            //delete Next[i];
            //console.log(i);
        };
        //console.log(y);
        //console.log(x);
        ary.stopPropagation();
    });
}
function test2(){
    EventPieceIsSelect();
}
//下一步被点击
function EventNextIsClick(){
    TbDy.on("click",".glow", function(){
        //获取到被点击的坐标
        y = $(this)["data"]("y");
        x = $(this)["data"]("x");
        //获取之前的坐标
        //plid = SelectPlayer(x,y); //0为玩家1
        pl = players[currentplayer];
        console.log(currentplayer);
        prev_y = pl["y"];
        prev_x = pl["x"];
        //判断是否已经赢了
        if(gameState==1){
            return 1;
        };
        //判断能否移动
        if(!playMove(currentplayer,x,y)){
            console.log("tess");
            return 0;
        };
        //执行移动操作，还原高亮的位置
        doMove(pl,pl["x"],pl["y"]);
        console.log("player"+pl["color"]+"移动到了"+y+" "+x);
        //判断是否赢了
        if(isWinner(pl)==1){
            alert("Player"+pl["color"]+"赢了")
            gameState = 1;
        };
        //轮到下一个玩家了

    });
}
function test3(){
    EventPieceIsSelect();
    EventNextIsClick();
    EventCancelNext();
}
//取消选中下一步，点击页面其他部位
function EventCancelNext(){
    $("html")["on"]("click", "body", function() {
        $(".glow")["removeClass"]("glow");
        Next = [];
        moving = 0;
    });
}

//墙槽被点击
function EventWallIsClick(){

}

//test1();
//test2();
test3();