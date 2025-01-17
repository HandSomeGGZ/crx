(function (window) {

    //extend & promote createjs.Container functions to window
    createjs.extend(Player, createjs.Container);
    window.Player = createjs.promote(Player, "Container");

    //main prototype
	function Player() {
        //prototype functions
        this.init = function(){
            //initiate object variables
            this.Container_constructor(); //inherit container constructor
            this.box12 = window.Game.box12;
            this.scaleX = this.scaleY = this.originalScaleX = this.originalScaleY = window.Game.box16;
            this.shape = new createjs.Shape();
            this.x = this.maxX = window.Game.getWidth()*0.25; //fixed to screen
            this.regX = this.regY = .5; //center point
            this.rotationSpeed = 0.75;
            this.xV = this.xMV = this.box12 * 0.01; //current & max velocity
            this.xA = this.xV * 0.0015; //acceleration
            this.jumpReady = true;
            this.gravity = Object.create(window.gravity);
            this.gravity.set(15,500);
            this.playerState = 0; //0 = alive, 1 = dead, 2 = ready
            this.respawn();
            //this.addChild(this.shape);
        };
        this.tick = function (delta, map) {
            var x = this.xPos+this.x;
            var x1 = x;
            var x2 = x1 + (delta*this.xV); //predicted x
            var y = this.y;
            var y1 = y;
            var y2 = this.gravity.pull(); //predicted y
            if (y2 > window.Game.getHeight()) y2 = window.Game.getHeight(); //prevent over checking
            var calcRate = this.scaleY/16; //distance of next interpolation
            var distance = Math.sqrt(Math.pow(Math.abs(x1-x2),2) + Math.pow(Math.abs(y1-y2),2));
            var loops = Math.ceil(distance / calcRate);
            var checkX = true;
            var checkY = true;
            this.rotate = true;
            this.gapHook = false;

            if (this.playerState == 0){ //alive
                if (this.y >= window.Game.getHeight()) { this.playerState = 1; createjs.Sound.play("impact"); } //kill player if off screen
                else if (window.Game.artboard.x <= -this.x) { this.playerState = 1; createjs.Sound.play("impact"); }
                else {
                    if (this.overrideCollision == false && window.Game.gamePaused == false){
                        for (var i=0; i <= loops; i++){
                            x = x1 + ((i/loops)*(Math.abs(x1-x2)));
                            y = y1 + ((i/loops)*(Math.abs(y1-y2)))*this.gravity.forceDirection();
                            this.setHitBox(x, y, map);
                            this.checkTileAction();

                            if (this.gapHook == true){ //let player jump or fall between tiles
                                this.hitBox[0].isSolid = true;
                                this.hitBox[3].isSolid = true;
                            }

                            if (checkX){ //check horizontal collision
                                if (this.hitBox[1].isSolid){ //check top-right
                                    if (Math.abs(this.hitBox[1].slope) < 1){ //push left
                                        //this.checkTileAction();
                                        x = x1 = x2 = this.snapXtoMap(x, (this.scaleX/2), map);
                                        this.setHitBox(x, y, map); //prevents sticky wall calculation
                                        this.rotation = 0;
                                        this.rotate = checkX = false;
                                        this.xV = 0;
                                    }
                                }
                                if (this.hitBox[2].isSolid){ //check bottom-right
                                    if (Math.abs(this.hitBox[2].slope) < 0.95){ //bottom tile angle is roughly less than 45deg
                                        //this.checkTileAction();
                                        x = x1 = x2 = this.snapXtoMap(x, (this.scaleX/2), map);
                                        this.rotation = 0;
                                        this.rotate = checkX = false;
                                        this.xV = 0;
                                    }
                                }
                            }
                            if (checkY){ //check vertical collision
                                if (this.gravity.isRising()) { //check rising
                                    if (this.hitBox[0].isSolid){ //check top-left
                                        if ((Math.abs(this.hitBox[0].slope) > 0.5 && this.scaleX == this.originalScaleX) || // if normal player size
                                            (Math.abs(this.hitBox[0].slope) > 1.0 && this.scaleX != this.originalScaleX)){  // if tiny player size
                                            this.setHitBox(x, y-(this.scaleY/2), map);
                                            this.checkTileAction();
                                            y = y1 = y2 = this.snapYtoMap(y, -(this.scaleY/2), map);
                                            this.gravity.reset();
                                            this.gravity.push(0.5,y);
                                            this.rotation = 0;
                                            this.rotate = checkY = false;
                                        }
                                    }
                                    if (this.hitBox[1].isSolid){ //check top-right
                                        if (Math.abs(this.hitBox[1].slope) >= 1){
                                            //this.checkTileAction();
                                            y = y1 = y2 = this.snapYtoMap(y, -(this.scaleY/2), map);
                                            this.gravity.reset();
                                            this.gravity.push(0.5,y);
                                            this.rotation = 0;
                                            this.rotate = checkY = false;
                                        }
                                    }
                                    this.checkGap();
                                }
                                else { //check falling
                                    if (this.hitBox[2].isSolid){ //check bottom-right
                                        if (Math.abs(this.hitBox[2].slope) >= 1){
                                            //this.checkTileAction();
                                            y = y1 = y2 = this.snapYtoMap(y, (this.scaleY/2), map);
                                            this.gravity.reset();
                                            this.gravity.push(0.5,y);
                                            this.rotation = 0;
                                            this.rotate = checkY = false;
                                            this.jumpReady = true;
                                        }
                                    }
                                    if (this.hitBox[3].isSolid){ //check bottom-left
                                        if (Math.abs(this.hitBox[3].slope) >= 1){
                                            //this.checkTileAction();
                                            y = y1 = y2 = this.snapYtoMap(y, (this.scaleY/2), map);
                                            this.gravity.reset();
                                            this.gravity.push(0.5,y);
                                            this.rotation = 0;
                                            this.rotate = checkY = false;
                                            this.jumpReady = true;
                                        }
                                    }
                                }
                            }
                            if (checkX == false && checkY == false) { break; }
                        }
                    }

                    //check for high jump
                    if (this.bounce == true) { this.jump(27.5,750); this.bounce = false; }

                    //check for game pause
                    if (this.pauseGame == true){
                        this.pauseGame = false;
                        window.Game.pauseGame();
                        window.Game.particles.addParticles(this.x,this.y,this.scaleX/2,"#0286f2",1,25,true);
                        window.Game.dialog.openDialogWindow("tip");
                        createjs.Sound.play("impact");
                    }

                    //accelerate screen 'x' position
                    if (this.xV < this.xMV) this.xV = (this.xV < this.xMV) ? this.xV + (delta*this.xA) : this.xMV; //accelerate
                    if (checkX == false) { window.Game.artboard.x -= (delta*this.xMV)*0.5; } //if hit wall
                    else { //push player off screen
                        if (window.Game.artboard.x < 0) window.Game.artboard.x += (delta*this.xV)*0.25;
                        else window.Game.artboard.x = 0;
                    }

                    //set the new results
                    if (this.rotate == true) this.rotation += delta*this.rotationSpeed;
                    this.xPos = (x2 - this.x); //update new player X position
                    this.y = y2; //update new player Y position

                    //check if player is finished
                    if (this.onFinishTile && this.gravity.isLanded()){
                        this.xV -= (this.xV > 0) ? delta*this.xA*2 : 0; //decelerate
                        if (this.xV < 0){
                            this.xV = 0;
                            this.completeLevel();
                        }
                    }
                }
            }
            else if (this.playerState == 1){ //dead
                if (this.deathTimer <= 0 || this.deathTimer == null){
                    this.alpha = 0;
                    this.deathTimer = 500;
                    window.Game.particles.addParticles(this.x,this.y,this.scaleX/2,this.color,1,25);
                }
                else{
                    this.deathTimer -= delta;
                    if (this.deathTimer <= 0){
                        this.playerState = 0;
                        this.respawn();
                    }
                }
            }
        };
        this.setXY = function(x, y, overrideCollision) {
            this.x = x != null ? x : this.x;
            this.y = y != null ? y : this.y;
            this.overrideCollision = overrideCollision != null ? overrideCollision : false;
        };
        this.jump = function(amplitude, duration) {
            if (this.jumpReady == true && window.Game.dialog.isClosed()){
                if (amplitude != null && duration != null) this.gravity.set(amplitude, duration);
                else if (this.scaleY < this.originalScaleY) this.gravity.set(17.5, 500); //small scale jump (higher)
                createjs.Sound.play("jump");
                this.jumpReady = false;
                this.onFinishTile = false; //reset finish if hit
                this.gravity.push(0, this.y);
            }
        };
        this.stop = function() { this.gravity.stop(this.y); };
        this.respawn = function(resetNewSpawn) {
            if (resetNewSpawn == true) this.newSpawn = false;
            if (this.newSpawn == true){
                this.xPos = this.spawnX;
                this.y = this.spawnY;
            }
            else { //set to origin
                
                this.xPos = this.spawnX = 0; //relative position to level map
                this.y = this.spawnY = 0;
                this.scaleX = this.originalScaleX; //reset scale;
                this.scaleY = this.originalScaleY; //reset scale;
                window.timer.start();
            }
            this.reskin();
            this.alpha = 1;
            this.deathTimer = 0;
            this.jumpReady = true;
            this.onFinishTile = false;
            this.x = this.maxX;
            this.xV = this.xMV;
            this.gravity.reset();
            this.gravity.push(0.5, this.y);
            window.Game.artboard.x = 0;
        };
        this.setHitBox = function(x, y, map){ this.hitBox = this.checkHitBox(x,y,map); };
        this.checkHitBox = function(x, y, map){
            //topLeft[0], topRight[1], bottomRight[2], bottomLeft[3]
            var hitBox;
            hitBox = [
                new Point(-(this.scaleX/2), -(this.scaleY/2)), //topLeft
                new Point((this.scaleX/2), -(this.scaleY/2)), //topRight
                new Point((this.scaleX/2), (this.scaleY/2)), //bottomRight
                new Point(-(this.scaleX/2), (this.scaleY/2)), //bottomLeft
                new Point((this.scaleX/2), -(map.box)), //extra topRight
                new Point((this.scaleX/2), (map.box)) //extra bottomRight
            ];

            function Point(offsetX, offsetY){
                this.x = (map.getTileCol(x+offsetX)*map.box)+(map.box/2);
                this.y = (map.getTileRow(y+offsetY)*map.box+map.y)+(map.box/2);
                this.tile = map.getTile(x+offsetX, y+offsetY);
                this.type = this.tile != null ? this.tile.type : -1;
                this.isSolid = this.tile != null ? map.getTile(x+offsetX, y+offsetY).isSolid : false;
                this.slope = (this.y - y) / (this.x - x);
            }
            return hitBox;
        };
        this.checkTileAction = function(){
            for (var i=0; i < this.hitBox.length-2; i++){ //no need to check gap checking points
                if (this.hitBox[i].type == 2 && (i == 0 || i == 1) && Math.abs(this.hitBox[i].slope)  > 1){ this.pauseGame = true; }
                else if (this.hitBox[i].type == 3){ 
                    this.spawnX = this.hitBox[i].x - this.x; 
                    this.spawnY = this.hitBox[i].y; this.newSpawn = true; 
                    window.Game.particles.addParticles(this.x,this.y,this.scaleX/2,window.Game.theme.main_color4,1,25,true);
                }
                else if (this.hitBox[i].type == 4 && (i == 3 || i == 2) && this.gravity.isFalling()){ this.playerState = 1; createjs.Sound.play("impact"); }
                else if (this.hitBox[i].type == 5) {}
                else if (this.hitBox[i].type == 6 && (i == 0 || i == 1) && this.gravity.isRising()){ this.playerState = 1; createjs.Sound.play("impact"); }
                else if (this.hitBox[i].type == 7 && (i == 1 || i == 2)){ this.playerState = 1; createjs.Sound.play("impact"); }
                else if (this.hitBox[i].type == 8){ this.scaleX = this.scaleY = window.Game.box16; window.Game.particles.addParticles(this.x,this.y,this.scaleX/2,window.Game.theme.main_color4,1,25,true); }
                else if (this.hitBox[i].type == 9){ this.scaleX = this.scaleY = window.Game.box16 / 2; window.Game.particles.addParticles(this.x,this.y,this.scaleX/2,window.Game.theme.main_color4,1,25,true); }
                else if (this.hitBox[i].type == 10 && (i == 3 || i == 2) && this.gravity.isFalling()){ this.bounce = true; }
                else if (this.hitBox[i].type == 11 && (i == 3 || i == 2)){ this.onFinishTile = true; }
                else if (this.hitBox[2].type != 11 && this.hitBox[3].type != 11){ this.onFinishTile = false; }
            }
        };
        this.checkGap = function(){
            if (!this.hitBox[1].isSolid && !this.hitBox[2].isSolid){ //check vertical crack
                if (this.hitBox[4].isSolid && this.hitBox[5].isSolid){
                    this.gapHook = true;
                }
            }
        };
        this.snapYtoMap = function(y, offset, map){ return (map.y+(map.getTileRow(y+Math.abs(offset))*map.box))-offset; };
        this.snapXtoMap = function(x, offset, map){ return (map.getTileCol(x+Math.abs(offset))*map.box)-offset; };
        this.completeLevel = function(){ 
            window.Game.particles.addParticles(this.x,this.y,this.scaleX/2,window.Game.theme.main_color1,1,25,true);
            createjs.Sound.play("success");
            window.Game.pauseGame();
            window.Game.score = window.timer.toString(); //set global score
            window.Game.dialog.openDialogWindow("complete"); 
            window.Game.interface.updateTimeButton(true);
            ga('send', 'event', 'game', 'completed');
        };
        this.reskin = function(){
            var skin = window.storageManager.getSkin();
            this.color = window.Game.theme.main_color1;
            this.shape = new createjs.Shape();
            this.removeAllChildren();
            this.addChild(this.shape);
            
            //player skin options
            if (skin == 0) { //default
                this.shape.graphics.beginFill(this.color).drawRect(0,0,1,1);
            }
            if (skin == 1) { //triangles
                this.shape.graphics.beginFill(this.color).lineTo(0,1).lineTo(0.25,0.5).lineTo(0.5,1).closePath();
                this.shape.graphics.beginFill(this.color).lineTo(0.25,0.5).lineTo(0.5,0).lineTo(0.75,0.5).closePath();
                this.shape.graphics.beginFill(this.color).lineTo(0.5,1).lineTo(0.75,0.5).lineTo(1,1).closePath();
            }
            else if (skin == 2) { //circle
                this.shape.graphics.beginFill(this.color).drawCircle(0.5,0.5,0.5);
            }
            else if (skin == 3) { //checkered
                for (var row=0; row < 8; row++){
                    for (var col=0; col < 8; col += 2){
                        this.shape.graphics.beginFill(this.color).drawRect(
                            col*(0.125)+((0.125)*(row % 2)),
                            row*(0.125), 0.125, 0.125);
                    }
                }
            }
        };

        //initiate prototype variables
        this.init();
	}
}(window));
