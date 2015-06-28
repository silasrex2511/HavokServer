/*
	Author Silas Rex
	didnt keep track of versions :P
*/
function drawString(string,font,x,y,color){
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(string,x,y);
}
function rectMngr(x,y,width,height,color,id){
    this.type = "rect";
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.visible = true;
    this.left = false;
    this.down = false;
    this.right = false;
    this.up = false;
}
function imageData(x,y,width,height,src,id){
    this.type = "image";
    this.id = id;
    this.src = src;
    this.sprite = new Image();
    this.sprite.src = this.src;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.visible = true;
    this.left = false;
    this.down = false;
    this.right = false;
    this.up = false;
}
function animationData(x,y,width,height,IW,IH,src,id){
    this.type = "animation";
    this.id = id;
    this.src = src;
    this.sprite = new Image();
    this.sprite.src = this.src;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.clipStartX = 0;
    this.clipStartY = 0;
    this.clipToX = IW;
    this.clipToY = IH;
    this.visible = true;
    this.left = false;
    this.down = false;
    this.right = false;
    this.up = false;
}
function imageShow(data){
    if(data.visible){
        if(data.type === "image"){
            ctx.drawImage(data.sprite,
                data.x,
                data.y,
                data.width,
                data.height);
        }
        else if(data.type === "animation"){
            ctx.drawImage(data.sprite,
                data.clipStartX,
                data.clipStartY,
                data.clipToX,
                data.clipToY,
                data.x,
                data.y,
                data.width,
                data.height);
        }
        else if(data.type === "rect"){
            ctx.fillStyle = data.color;
            ctx.fillRect(data.x,data.y,data.width,data.height);
        }
    }
}
function itemsShow(items){
    for (var i = 0; i < items.length; i++) {
    	imageShow(items[i]);
    };
}
function collisionCheck(r1, r2){
    if(r1.x + r1.width >= r2.x && r1.x <= r2.x + r2.width &&
        r1.y <= r2.y + r2.height && r1.y + r1.height >= r2.y){
        return true;
    }
    else{
        return false;
    }
}
function collisionUp(r1, r2){
    if(collisionCheck(r1,r2)){
        if(r1.y <= r2.y + r2.height && r1.y > r2.y + r2.height / 4 * 3){
            return true;
        }else{
            return false;
        }
    }
}
function collisionDown(r1, r2){
    if(collisionCheck(r1,r2)){
        if(r1.y + r1.height >= r2.y && r1.y + r1.height <= r2.y + r2.height / 4){
            return true;
        }else{
            return false;
        }
    }
}
function collisionLeft(r1, r2){
    if (collisionCheck(r1,r2)){
        if(r1.x <= r2.x + r2.width && r1.x >= r2.x + r2.height / 4 * 3){
            return true;
        }else{
            return false;
        }
    }
}
function collisionRight(r1, r2){
    if(collisionCheck(r1,r2)){
        if(r1.x + r1.width >= r2.x && r1.x + r1.width <= r2.x + r2.width / 4){
            return true;
        }else{
            false;
        }
    }
}
function worldCol(rect,type){
    if(type === "loop"){
        if(rect.x + rect.width <= 0){
            rect.x = c.width - 1;
        }
        if(rect.x >= c.width){
            rect.x = 0 - rect.width;
        }
        if(rect.y + rect.height <= 0){
            rect.y = c.height - 1;
        }
        if(rect.y >= c.height){
            rect.y = 0 - rect.height;
        }
    }
    if(type === "wall"){
        if(rect.x <= 0){
            rect.x = 0;
        }
        if(rect.y <= 0){
            rect.y = 0;
        }
        if(rect.y + rect.height >= c.height){
            rect.y = c.height - rect.height;
        }
        if(rect.x + rect.width >= c.width){
            rect.x = c.width - rect.width;
        }
    }
}
function game(player,map,objects,lvl){
    this.player = player;
    this.map = map;
    this.objects = objects;
    this.lvl = lvl;
}
function map(textures,indexArray,mW,mH,tW,tH){
    this.mapWidth = mW;
    this.mapHeight = mH;
    this.tileWidth = tW;
    this.tileHeight = tH;
    this.map = [];
    for (var i = 0; i < indexArray.length / this.mapWidth; i++) {
        var y = i % this.mapHeight;
        for (var j = 0; j < this.mapWidth; j++) {
            var index = j + i * this.mapWidth;
            this.map[index] = new imageData(j * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight, textures[indexArray[index]],indexArray[index]);
        }
    }
}
function mapShow(map,lvl){
    var arrayL = map.mapWidth * map.mapHeight;
    for (var i = arrayL * (lvl - 1); i < arrayL * lvl; i++) {
        imageShow(map.map[i]);
    }
}
function mapScroller(game,lS,dS,rS,uS){
    var arrayL = game.map.mapWidth * game.map.mapHeight;
    if(game.player.up){
        game.player.y -= uS;
    }
    if(game.player.left){
        game.player.x -=  lS;
    }
    if(game.player.down){
        game.player.y += dS;
    }
    if(game.player.right){
        game.player.x += rS;
    }
    if (game.player.x >= c.width/4*3) {
        if(game.player.right){
            game.player.x -= rS;
        }
        if (game.player.right){
            if(game.map.map[arrayL * game.lvl - 1].x + game.map.map[arrayL * game.lvl - 1].width > c.width){
                for (var i = arrayL * (game.lvl - 1); i < arrayL * game.lvl; i++) {
                    game.map.map[i].x -= rS;
                }
                for (var i = 0; i < game.objects.length; i++) {
                    game.objects[i].x -= rS;
                };
            }else{
            game.player.x += rS;
            }
        }
    }
    if (game.player.x <= c.width/4) {
        if(game.player.left){
            game.player.x +=  lS;
        }
        if (game.player.left){
            if(game.map.map[arrayL * (game.lvl - 1)].x < 0){
                for (var i = arrayL * (game.lvl - 1); i < arrayL * game.lvl; i++) {
                    game.map.map[i].x -= -lS;
                }
                for (var i = 0; i < game.objects.length; i++) {
                    game.objects[i].x -= -lS;
                };
            }else{
                game.player.x -=  lS;
            }
        }
    }
    if (game.player.y <= c.height / 4) {
        if(game.player.up){
            game.player.y += uS;
        }
        if (game.player.up){
            if(game.map.map[arrayL * (game.lvl - 1)].y < 0){
                for (var i = arrayL * (game.lvl - 1); i < arrayL * game.lvl; i++) {
                    game.map.map[i].y -= -uS;
                }
                for (var i = 0; i < game.objects.length; i++) {
                    game.objects[i].y -= -uS;
                };
            }else{
            game.player.y -= uS;
            }
        }
    }
    if (game.player.y >= c.height / 4 * 3) {
        if(game.player.down){
            game.player.y -= dS;
        }
        if (game.player.down){
            if(game.map.map[arrayL * game.lvl - 1].y + game.map.map[arrayL * game.lvl - 1].height > c.height){
                for (var i = arrayL * (game.lvl - 1); i < arrayL * game.lvl; i++) {
                    game.map.map[i].y -= dS;
                }
                for (var i = 0; i < game.objects.length; i++) {
                    game.objects[i].y -= dS;
                };
            }else{
                game.player.y += dS;
            }
        }
    }
}
function autoRunner(game,xScrollSpeed,yScrollSpeed){
    var arrayL = game.map.mapWidth * game.map.mapHeight;
    itemMoveV = false;
    if(xScrollSpeed > 0){
        if(game.map.map[arrayL * game.lvl - 1].x + game.map.map[arrayL * game.lvl - 1].width - xScrollSpeed > c.width){
            for (var i = arrayL * (game.lvl - 1); i < arrayL * game.lvl; i++) {
                game.map.map[i].x -= xScrollSpeed;
            }
            for (var i = 0; i < game.objects.length; i++) {
                    game.objects[i].x -= xScrollSpeed;
            }
        }
    }
    if(xScrollSpeed < 0){
        if(game.map.map[arrayL * (game.lvl - 1)].x - xScrollSpeed < 0){
            for (var i = arrayL * (game.lvl - 1); i < arrayL * game.lvl; i++) {
                game.map.map[i].x -= xScrollSpeed;
            }
            for (var i = 0; i < game.objects.length; i++) {
                game.objects[i].x -= xScrollSpeed;
            }
        }
    }
    if(yScrollSpeed < 0){
        if(game.map.map[arrayL * (game.lvl - 1)].y - yScrollSpeed < 0){
            for (var i = arrayL * (game.lvl - 1); i < arrayL * game.lvl; i++) {
                game.map.map[i].y -= yScrollSpeed;
            }
            for (var i = 0; i < game.objects.length; i++) {
                game.objects[i].y -= yScrollSpeed;
            }
        }
    }
    if(yScrollSpeed > 0){
        if(game.map.map[arrayL * game.lvl - 1].y + game.map.map[arrayL * game.lvl - 1].height - yScrollSpeed > c.height){
            for (var i = arrayL * (game.lvl - 1); i < arrayL * game.lvl; i++) {
                game.map.map[i].y -= yScrollSpeed;
            }
            for (var i = 0; i < game.objects.length; i++) {
                game.objects[i].y -= yScrollSpeed;
            }
        }
    }
}
