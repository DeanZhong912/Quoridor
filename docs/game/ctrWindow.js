/*控制框*/
var winlen = 0;
function logToWindow(){
    if(winlen!=log.length){
        var print = log.slice(-1);
    };
    var win=document.getElementById("winctr");
    //win.innerHTML += (JSON && JSON.stringify ? JSON.stringify(print) : print) + '<br />'
    win.innerHTML += print + '<br />';
    win.scrollTop = win.scrollHeight;
}
function Restart(){
    history.go(0);
}

var regArr={
    "tx":-1,
    "ty":-1,
    "sx":-1,
    "sy":-1,
    "sc":-1
}

function Regret(){
    if(selecting==1){
        return;
    };
    if(done==0){
        return;
    };
    done=0;
    regret=1;
    changePlayer();
    addToLog("玩家"+players[currentplayer]["color"]+"悔棋");
    backToPre();
    addToLog("轮到 玩家"+(parseInt(currentplayer)+1)+" 行动了");
    regret=0;
    moved=0;
    walled=0;
}
function backToPre(){
    console.log("返回上一步");
    if(walled==1){
        console.log("上一步放了墙");
        players[currentplayer]["walls"] = players[currentplayer]["walls"]+1;
        console.log(players[currentplayer]["walls"]);
        walls[regArr["sy"]][regArr["sx"]]=0;
        doPlayWall(regArr["sx"],regArr["sy"],players[currentplayer],regArr["sc"]+2);
    };
    if(moved==1){
        console.log("上一步移动了");
        console.log(regArr["tx"]);
        console.log(regArr["ty"]);
        players[currentplayer]["x"]=regArr["tx"];
        players[currentplayer]["y"]=regArr["ty"];
        doMove(players[currentplayer],regArr["tx"],regArr["ty"]);
    };
    regArr["sx"]=-1;
    regArr["sy"]=-1;
    regArr["sc"]=-1;
    regArr["tx"]=-1;
    regArr["ty"]=-1;
}