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