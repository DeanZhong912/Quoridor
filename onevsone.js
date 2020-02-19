/*对战逻辑*/
function gameLogic(){
    //初始化棋盘
    init_board();
    console.log("棋盘初始化成功");
    console.log("轮到玩家"+ (parseInt(currentplayer)+1)+"行动了");
    EventPieceIsSelect();
    EventNextIsClick();
    EventCancelNext();
    EventMouseOnWalls();
    EventWallIsClick();
}

gameLogic();
