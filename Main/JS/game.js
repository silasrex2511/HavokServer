var c = document.getElementById("theCanvas");
var ctx = c.getContext("2d");
var socket = io();

var players = [];
var playerLocal = new rectMngr(0,0,20,20,"RED");
players[0] = playerLocal;

var speed = 3;

function gameLoop() {
  setInterval(render,1000/60);
}
gameLoop();

function render() {
    ctx.fillStyle = "BLACK";
    ctx.fillRect(0,0,c.width,c.height);
    update();
    // itemsShow(players);

}

function update(){
  // if(playerLocal.up){
  //   player.y -= speed;
  // }
  // if(playerLocal.down){
  //   player.y += speed;
  // }
  // if(playerLocal.right){
  //   player.x += speed;
  // }
  // if(playerLocal.left){
  //   player.x -= speed;
  // }
}

//misc functions
// function keyInput(player){
//   kd.A.down(function(){
//     player.left = true;
//   });
//   kd.A.up(function(){
//     player.left = false;
//   });
//   kd.S.down(function(){
//     player.down = true;
//   });
//   kd.S.up(function(){
//     player.down = false;
//   });
//   kd.D.down(function(){
//     player.right = true;
//   });
//   kd.D.up(function(){
//     player.right = false;
//   });
//   kd.W.down(function(){expression
//     player.up = true;
//   });
//   kd.W.up(function(){
//     player.up = false;
//   });
//   kd.tick();
// }
