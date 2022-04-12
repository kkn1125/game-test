import * as Units from './core/Units.js';
import {store} from '../store.js';

export const Model = function () {
    
    this.init = function (view) {
        store.views = view;

        store.commonData.speed = 1;
        store.commonData.slidding = 15;

        store.userData = [];
        store.mobData = [];

        this.createUser();
        this.createMob();

        let check = setInterval(() => {
            if(store.mobData.length==0) this.createMob();
        }, 1000);

        setInterval(() => {
            let user = store.userData[0];
            store.mobData.forEach(mob => {
                if(mob.x>user.x+(user.size/2)) {
                    this.move(-1, mob);
                    if(parseInt(Math.random()*100)%5==0) {
                        if(!mob.jumping) {
                            mob.jumping = true;
                            this.jump(mob);
                        }
                    }
                } else if (mob.x<user.x+user.size) {
                    this.move(1, mob);
                    if(parseInt(Math.random()*100)%5==0) {
                        if(!mob.jumping) {
                            mob.jumping = true;
                            this.jump(mob);
                        }
                    }
                }
            })
        }, 100);
    }

    this.showBag = function (e) {
        store.userData[0].showBag();
    }

    this.createUser = function () {
        const userBaseInfo = Units.createUnitInfo({
            name: 'soldier',
            hp: 500,
            mp: 50,
            x: 300,
            y: 350,
            size: 50,
            damage: 80,
            exp: 0,
        });
        store.userData.push(new Units.Human(userBaseInfo, 'sword'));
    }

    this.createMob = function () {
        const mobBaseInfo = Units.createUnitInfo({
            name: 'spider',
            hp: 30,
            mp: 5,
            x: 400,
            y: 350,
            size: 50,
            damage: 2,
            exp: 50,
        });
        const mob = new Units.Monster(mobBaseInfo, ['150won', 'long sword']);
        mob.setLevel(10);
        store.mobData.push(mob);
    }

    this.collisionDetection = function () {
        store.userData.forEach((user, ui) => {
            store.mobData.forEach((mob, mi) => {
                const uX = user.x;
                const uY = user.y;
                const uSize = user.size;
                const mX = mob.x;
                const mY = mob.y;
                const mSize = mob.size;
                const leftCollision = uX+uSize>=mX && mX+(mSize/2)>=uX;
                const rightCollision = uX<=mX+mSize && mX<=(uX+uSize/2);

                if(leftCollision) {
                    for(let i=0; i<5; i++) this.move(-1);
                    user.attack(mob);
                    mob.attack(user);
                } else if(rightCollision) {
                    for(let i=0; i<5; i++) this.move(1);
                    user.attack(mob);
                    mob.attack(user);
                }
            });
        });
        store.userData = store.userData.filter(x=>x.live);
        store.mobData = store.mobData.filter(x=>x.live);
    }

    this.move = function (direction, target=store.userData[0]) {
        let slide = store.commonData.slidding;
        let loop = setInterval(() => {
            switch(direction) {
                case 1: target.x += store.commonData.speed; break;
                case -1: target.x -= store.commonData.speed; break;
            }
            slide--;

            // 맵 제한
            // if(target.x<=0) {
            //     target.x = 0;
            //     clearInterval(loop);
            // } else if(target.x+target.size>=store.canvas.width) {
            //     target.x = store.canvas.width-target.size;
            //     clearInterval(loop);
            // }

            if(target.x+target.size<=0) {
                target.x = store.canvas.width-target.size;
                clearInterval(loop);
            } else if(target.x>=store.canvas.width) {
                target.x = 0;
                clearInterval(loop);
            }
            if(slide <= 0){
                clearInterval(loop);
            }
        }, 1);
        setTimeout(() => {
            this.collisionDetection();
        }, 50);
    }

    this.jump = function (target=store.userData[0]) {
        let increase = 7;
        let moveAmount = 0;
        let loop = setInterval(() => {
            target.y -= increase-=0.3;
            moveAmount++;
            if(moveAmount%2==0) {
                setTimeout(() => {
                    this.move(store.before);
                }, 10);
            }
            if(target.y >= 350) {
                target.y = 350;
                if(target.type!='human') target.jumping = false;
                store.users.jumping = false;
                clearInterval(loop);
            }
        }, 10);
    }

    this.handleUnitMove = function (e) {
        const key = e.key.toLowerCase();
        if(key == 'arrowleft') {
            this.move(-1);
            store.before = -1;
        }
        if(key == 'arrowright') {
            this.move(1);
            store.before = 1;
        }
        setTimeout(() => {
            store.before = 0;
        }, 300);
        if(key == 'arrowup' && !store.users.jumping) {
            store.users.jumping = true;
            this.jump();
        }
    }

    this.renderGame = function () {
        store.views.renderGame();
    }
}