/*对战逻辑*/
function gameLogic(){
    //初始化棋盘
    init_board();
    addToLog("棋盘初始化成功");
    addToLog("轮到 玩家"+ (parseInt(currentplayer)+1)+" 行动了");
    EventPieceIsSelect();
    EventNextIsClick();
    EventCancelNext();
    EventMouseOnWalls();
    EventWallIsClick();
}

gameLogic();
