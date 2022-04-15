import store from '../../utils/store.js';
import { Structure } from '../units/base/BaseOption.js';
import { BaseSetting } from '../units/base/BaseSetting.js';
import { Spider } from '../units/monster/BaseMonster.js';
import { baseMonsterInfo, farmer, monsterInto, spiderInfo } from '../units/sample/Units.js';

const MONSTERS = [];

const CLOUDS = [];
const CACTUSES = [];
const GROUNDS = [];

const UNIT_FARMER = store.unit = farmer;
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 700;

const MONSER_HEIGHT = BaseSetting.monster.default.sizeY;

const CACTUS_AMOUNT = BaseSetting.cactus.default.amount;
const CACTUS_WIDTH = BaseSetting.cactus.default.width;
const CACTUS_HEIGHT = BaseSetting.cactus.default.height;

const GROUND_AMOUNT = BaseSetting.ground.default.amount;
const GROUND_WIDTH = BaseSetting.ground.default.width;
const GROUND_HEIGHT = BaseSetting.ground.default.height;

const CLOUD_AMOUNT = BaseSetting.cloud.default.amount;
const CLOUD_START_LEVEL = BaseSetting.cloud.START_LEVEL;

const CHARACTER_SPEED = -(BaseSetting.commons.SPEED);

let jumped = 5;
let initGravity = 0;
let frame = 0;

export const View = function () {
    this.init = function (option) {
        store.options = option;
        store.canvas = document.querySelector('#app');
        store.canvas.width = CANVAS_WIDTH;
        store.canvas.height = CANVAS_HEIGHT;

        store.ctx = store.canvas.getContext('2d');

        for(let i = 0; i < 1; i++) {
            MONSTERS.push(this.createMonster(i));
        }

        for(let i = 0; i < GROUND_AMOUNT; i++) {
            GROUNDS.push(this.createGround(i));
        }

        for(let i = 0; i < CACTUS_AMOUNT; i++) {
            CACTUSES.push(this.createCactus(i));
        }

        for(let i = 0; i < CLOUD_AMOUNT; i++) {
            CLOUDS.push(this.createCloud(i));
        }
        
        requestAnimationFrame(this.renderGame.bind(this));
    }

    this.createMonster = function () {
        const newMonsterInfo = Spider.createSpider({
            ...monsterInto,
            y: store.canvas.height - (MONSER_HEIGHT) - BaseSetting.ground.default.height*BaseSetting.monster.GROUND_RATIO,
            dropItem: [],
            money: 500,
            speed: 1,
        });

        store.spider = new Spider(newMonsterInfo);
        
        store.spider.img = new Image();
        store.spider.img.src = `./assets/images/spider.png`;
        
        return {
            img: store.spider.img,
            monster: store.spider,
        };
    }

    this.createGround = function (idx) {
        const newGroundInfo = Structure.createStructure({
            name: 'ground',
            category: 'subject',
            x: GROUND_WIDTH * idx,
            y: store.canvas.height - GROUND_HEIGHT,
            width: GROUND_WIDTH + 10,
            height: GROUND_HEIGHT,
            speed: BaseSetting.ground.SPEED + CHARACTER_SPEED,
        });

        store.ground = new Structure(newGroundInfo);
        store.ground.img = new Image();
        store.ground.img.src = `./assets/images/ground.png`;

        return {
            img: store.ground.img,
            ground: store.ground,
        };
    }

    this.createCactus = function (idx) {
        const CACTUS_HEIGHT_INCREASE_VALUE = parseInt(Math.random()*50);

        const newCactusInfo = Structure.createStructure({
            name: 'cactus',
            category: 'subject',
            x: idx * parseInt(Math.random() * store.canvas.width),
            y: store.canvas.height - (CACTUS_HEIGHT + CACTUS_HEIGHT_INCREASE_VALUE) - BaseSetting.ground.default.height*BaseSetting.cactus.GROUND_RATIO,
            width: CACTUS_WIDTH,
            height: (CACTUS_HEIGHT+CACTUS_HEIGHT_INCREASE_VALUE),
            speed: Math.random()*BaseSetting.cactus.SPEED + CHARACTER_SPEED,
        });

        store.cactus = new Structure(newCactusInfo);
        store.cactus.img = new Image();
        store.cactus.img.src = `./assets/images/cactus.png`;
        
        return {
            img: store.cactus.img,
            cactus: store.cactus,
        };
    }

    this.createCloud = function (idx) {
        const CLOUD_RANDOM_SIZE_RATIO = ((Math.random() * 2) + 1)/3;

        const newCloudInfo = Structure.createStructure({
            name: 'cloud',
            category: 'subject',
            x: idx * parseInt(Math.random() * store.canvas.width),
            y: CLOUD_START_LEVEL+(75*Math.random()),
            width: BaseSetting.cloud.default.width * CLOUD_RANDOM_SIZE_RATIO,
            height: BaseSetting.cloud.default.height * CLOUD_RANDOM_SIZE_RATIO,
            speed: Math.random()*BaseSetting.cloud.SPEED + CHARACTER_SPEED,
        });
        store.cloud = new Structure(newCloudInfo);
        store.cloud.img = new Image();
        store.cloud.img.src = `./assets/images/cloud2.png`;
        
        return {
            img: store.cloud.img,
            cloud: store.cloud,
        };
    }

    this.userInfo = function (unit) {
        store.ctx.font = `16px mono`;
        store.ctx.textAlign = `center`;
        const {x, y, money, level, name, hp, mp, maxHp, maxMp, status, ability} = unit;
        const CENTERED_X = x + unit.sizeX / 2;
        const STEP_Y = idx => y - 20*idx;
        store.ctx.fillStyle = 'black';
        store.ctx.fillText(`💰 : ${money}`, 50, 30);
        store.ctx.fillStyle = 'red';
        store.ctx.fillText(`[ Lv.${level} ] ${name}`, CENTERED_X, STEP_Y(3));
        store.ctx.fillStyle = 'red';
        store.ctx.fillText(`HP [ ${hp} / ${maxHp} ]`, CENTERED_X, STEP_Y(2));
        store.ctx.fillStyle = 'blue';
        store.ctx.fillText(`MP [ ${mp} / ${maxMp} ]`, CENTERED_X, STEP_Y(1));
        store.ctx.fillStyle = 'gray';
        
        // store.ctx.fillText(`stat. power : ${status.power}`, CENTERED_X, STEP_Y(4));
        // store.ctx.fillText(`stat. dex : ${status.dex}`, CENTERED_X, STEP_Y(3));
        // store.ctx.fillText(`stat. int : ${status.int}`, CENTERED_X, STEP_Y(2));
        // store.ctx.fillText(`stat. luck : ${status.luck}`, CENTERED_X, STEP_Y(1));
    }

    this.renderGame = function () {
        store.ctx.clearRect(0,0,store.canvas.width,store.canvas.height);

        frame++;
        if(frame > 10000) frame = 0;

        // if(frame % BaseSetting.monster.default.LIMIT_AMOUNT == 0) {
        //     MONSTERS.push(this.createMonster());
        // }
        // if(frame%BaseSetting.cactus.LIMIT_AMOUNT==0) {
        //     CACTUSES.push(this.createCactus());
        // }
        
        if(frame%BaseSetting.player.default.AUTO_EARN_TIME==0) {
            UNIT_FARMER.money += BaseSetting.player.default.EARN_VALUE;
        }
        
        // cloud
        CLOUDS.forEach(({img, cloud}, idx)=>{
            store.ctx.drawImage(img, cloud.x, cloud.y, cloud.width, cloud.height);
            cloud.move(-BaseSetting.cloud.SPEED);
            if(cloud.x + cloud.width <= 0) {
                cloud.x = store.canvas.width;
            }
        });

        // cactus
        CACTUSES.forEach(({img, cactus}, idx)=>{
            store.ctx.drawImage(img, cactus.x, cactus.y, cactus.width, cactus.height);
            cactus.move(-BaseSetting.cactus.SPEED);
            if(cactus.x + cactus.width <= 0) {
                cactus.x = store.canvas.width;
            }
        });
        

        // monster
        MONSTERS.forEach(({img, monster}, idx)=>{
            store.ctx.drawImage(img, monster.x, monster.y, monster.sizeX, monster.sizeY);
            // store.ctx.fillRect(monster.x,monster.y,monster.sizeX, monster.sizeY);

            monster.move(-BaseSetting.monster.SPEED);
            if(monster.x + monster.sizeX <= 0) {
                monster.x = store.canvas.width;
            }
        });
        
        // player
        const LIMIT_LEVEL = store.canvas.height - UNIT_FARMER.sizeY - BaseSetting.ground.default.height*BaseSetting.player.default.GROUND_RATIO;
        if(UNIT_FARMER.y + initGravity >= LIMIT_LEVEL) {
            UNIT_FARMER.y = LIMIT_LEVEL;
            UNIT_FARMER.gravity = initGravity+=3;
            if(jumped>0) {
                UNIT_FARMER.jump();
                jumped--;
            } else {
                // 유닛 중력 초기화
                UNIT_FARMER.gravity = initGravity = 0;
            }
        } else {
            UNIT_FARMER.y += BaseSetting.commons.default.gravity + UNIT_FARMER.gravity++;
        }

        store.ctx.fillStyle = `#3c9fff`;
        const player = new Image();
        if(!store.unit.attacked) {
            player.src = `./assets/images/unit.png`;
        } else {
            player.src = `./assets/images/unit-attack.png`;
        }
        store.ctx.drawImage(player, UNIT_FARMER.x, UNIT_FARMER.y, UNIT_FARMER.sizeX+(store.unit.attacked?30:0), UNIT_FARMER.sizeY);
        this.userInfo(UNIT_FARMER);

        // ground
        GROUNDS.forEach(({img, ground}, idx)=>{
            store.ctx.drawImage(img, ground.x, ground.y, ground.width, ground.height);
            ground.move(-BaseSetting.ground.SPEED - 1);
            if(ground.x + ground.width <= 0) {
                ground.x = (GROUNDS.length-1) * GROUND_WIDTH;
                
            }
        });

        requestAnimationFrame(this.renderGame.bind(this));
    }
}