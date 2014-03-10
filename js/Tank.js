$().ready(
		function() {
			var canvas = $("#myCanvas");
			var context = canvas.get(0).getContext("2d");

			var isPlay = false;
            
			var toDrawList = new  Array();
        
         
            /**用于根据元素sequence删除drawList中元素的方法*/
			var deleteDrawItemBySeq = function(seq) {
                console.log(seq);
                for(i in toDrawList) {
                    var item = toDrawList[i];
                    if(item.sequence == seq) {
        				toDrawList.splice(i, 1);
                    }
                }
			};
            
            /**
              * 处理item1与item2碰撞的情况
              */
            var dealWithTwoItemImpact = function(item1, item2) {
                if(item1.type == "bullet") {
                   if(item2.type == "tank") {
                    	if(item1.team == item2.team) {
                    		deleteDrawItemBySeq(item1.sequence);
                    	} else {
                    		deleteDrawItemBySeq(item1.sequence);
                    		deleteDrawItemBySeq(item2.sequence);
                    	}
                    } else if(item2.type == "bullet") {
                        deleteDrawItemBySeq(item1.sequence);
                        deleteDrawItemBySeq(item2.sequence);
                    }   	
                } else if(item1.type == "tank") {
                    if(item2.type == "bullet") {
                    	if(item1.team == item2.team) {
                    		deleteDrawItemBySeq(item2.sequence);
                    	} else {
                    		deleteDrawItemBySeq(item1.sequence);
                    		deleteDrawItemBySeq(item2.sequence);
                    	}
                    }
                }
            	
            };
			
            /**
              * 检测两个物体的碰撞情况
              * item1必须是移动中的物体
              * item2是被碰撞物体
              * 如果撞上了, 则返回true
              */
			var checkTwoItemImpact = function(item1, item2) {
				console.log("checking");
				console.log("item1.posY " + item1.posY);
				console.log("item2.posY " + item2.posY);
				console.log("item1.posX " + item1.posX);
				console.log("item2.posX " + item2.posX);

            	if(item1.posY <= item2.posY + item2.height 
            			&& item1.posY >= item2.posY 
            			&& item1.posX <= item2.posX + item2.width 
            			&& item1.posX >= item2.posX 
						&& item1.sequence != item2.sequence) {
                    	
            			console.log("impact");
            		
                        dealWithTwoItemImpact(item1, item2);
                        return true;
            	}
                
                /*
                if(item1.direction == 'u') {
                	if(item1.posY <= item2.posY + item2.height &&&& item1.posX == item2.posX) {
                        dealWithTwoItemImpact(item1, item2);
                        return true;
                	}
                } else if(item1.direction == 'd') {
                	if(item1.posY  + item1.height == item2.posY && item1.posX == item2.posX) {
                        dealWithTwoItemImpact(item1, item2);
                        return true;
                	}
                } else if(item1.direction == 'l') {
                	if(item1.posX == item2.posX + item2.width && item1.posY == item2.posY) {
                        dealWithTwoItemImpact(item1, item2);
                        return true;
                	}
                } else if(item1.direction == 'r') {
                	if(item1.posX  + item1.width == item2.posX && item1.posY == item2.posY) {
                        dealWithTwoItemImpact(item1, item2);
                        return true;
                	}
                }
                */
                return false;
			};
        
            /**碰撞检测, 
               * 1. 坦克与坦克撞上了, 无法继续移动.
               * 2. 敌方子弹与坦克撞上了, 子弹与坦克都消失.
               * 3. 已方子弹与坦克撞上了, 子弹消失, 坦克没事儿
               * 4. 子弹撞墙上, 子弹消失
               * 5. 坦克撞墙上, 坦克无法继续移动
               */
            var impactCheck = function(item) {
                   //撞墙
            	if(item.dirtection == 'u') {
                    if(item.posY <= 0) {
                    	return false;
                    }
            	} else if(item.dirtection == 'd'){
                    if(item.posY + item.height >= canvas.height()) {
                    	return false;
                    }
            	} else if(item.dirtection == 'l'){
                    if(item.posX <= 0) {
                    	return false;
                    }
            	} else if(item.dirtection == 'r'){
                    if(item.posX + item.width >= canvas.width()) {
                    	return false;
                    }
            	} else {
                	//撞到其他东西
                    for(i in toDrawList) {
                        var iTemp = toDrawList[i];
                         if(checkTwoItemImpact(item, iTemp)) {
                        	 return false;
                         }
                     }
                }
                
            	return true;
            };
		   
			
			
			
            var Shape = {
              createNew : function() {
                var shape = {};
                shape.name = "shape";
                shape.type = "shape";
                shape.posX = 20;
                shape.posY = 20;
                shape.speed = 5;
                shape.direction = 'u';// u d l r--上,下,左,右
                shape.canAutoMove = false;
                shape.move=function() {
                    //如果检测不通过,则无法移动, 子弹的话,则直接消失
                    if(!impactCheck(this)) {
                        if(this.type == "bullet") {
                            console.log("delete");
                        	deleteDrawItemBySeq(this.sequence);
                        }
                    }
                	switch(this.direction) {
                	case 'u':
                        if(this.posY > 0 ) {
                            this.posY -= this.speed;
                        }
                		break;
                	case 'd':
                        if(this.posY < canvas.height() - this.height) {
                            this.posY += this.speed;
                        }
                		break;
                	case 'l':
                        if(this.posX > 0) {
                        	this.posX -= this.speed;
                        }
                		break;
                	case 'r':
                        if(this.posX < canvas.width() - this.width) {
                        	this.posX += this.speed;
                        }
                		break;
                	}
                };
                return shape;
              }
            };
            
            var Rectangle = {
              createNew : function() {
                var square = Shape.createNew();
                square.type = "rectangle";
                square.width = 20;
                square.height = 20;
               return square;
              }
            };
            
            var Bullet = {
            		createNew : function() {
            			var bullet = Rectangle.createNew();
                        bullet.name = "bullet";
                        bullet.type = "bullet";
                        bullet.width =15;
                        bullet.height = 15;
                        bullet.speed = 10;
                        bullet.canAutoMove = true;
                        bullet.img = new Image();
                        bullet.img.src = "../../img/Bullet_up.png";
                        return bullet;
            		}
            };
            
            var Tank = {
            		createNew : function() {
            			var tank = Rectangle.createNew();
                        tank.type = "tank";
                        tank.team = 1;
                        tank.img = new Image();
                        tank.img.src = "../../img/Tank_up.png";
                        tank.fire = function() {
                            var b = Bullet.createNew();
                            b.posX = tank.posX;
                            b.posY = tank.posY;
                            b.direction = tank.direction;
                            b.team = tank.team;
                            switch(tank.direction) {
                            case 'u':
                                b.img.src = "../../img/Bullet_up.png";
                            	break;
                            case 'd':
                                b.img.src = "../../img/Bullet_down.png";
                            	break;
                            case 'l':
                                b.img.src = "../../img/Bullet_left.png";
                            	break;
                            case 'r':
                                b.img.src = "../../img/Bullet_right.png";
                            	break;
                            }
                            toDrawList.push(b);
                        };
                        return tank;
            		}
            };
            
            var tank = Tank.createNew();
             toDrawList.push(tank);
             
             //敌军坦克 
             var enemyTank = Tank.createNew();
             enemyTank.team = 2;
             enemyTank.posX  = 100;
             enemyTank.posY = 100;
             toDrawList.push(enemyTank);
            
			$("body").keydown(function(e) {
				switch(e.keyCode) {
				case 87: //上
                    tank.direction = 'u';
                    tank.img.src="../../img/Tank_up.png";
                    tank.move();
                    break;
				case 83: //下
                    tank.direction = 'd';
                    tank.img.src="../../img/Tank_down.png";
                    tank.move();
					break;
				case 65://左
                    tank.direction = 'l';
                    tank.img.src="../../img/Tank_left.png";
                    tank.move();
					break;
				case 68: //右
                    tank.direction = 'r';
                    tank.img.src="../../img/Tank_right.png";
                    tank.move();
					break;
				case 74: //开炮
                    tank.fire();
				}
			});
            $("#play").click(function() {
                  isPlay = true;
                  animated();
                });
           $("#stop").click(function() {
                  isPlay = false;
             });
           
			var drawPage = function() {
				context.clearRect(0, 0, canvas.width(), canvas.height());
                for(i in toDrawList) {
                    	var item = toDrawList[i];
                        if(item.canAutoMove) {
                                item.move();
                        } 
                        
                        context.drawImage(item.img,item.posX, item.posY, item.width, item.height);
                }
			};
    
			var animated = function(x, y) {
				if (isPlay) {
                    drawPage();
					setTimeout(animated, 3);
				}
			};

		});