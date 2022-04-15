import store from '../../utils/store.js';
import { Structure } from '../units/base/BaseOption.js';
import { BaseSetting } from '../units/base/BaseSetting.js';
import { farmer } from '../units/sample/__Units.js';
import * as Units from '../units/Units.js';

export const View = function () {
    let jumped = 5;
    let initGravity = 0;
    let frame = 0;
    let clouds = [];
    let cactuses = [];
    let grounds = [];
    const unit_farmer = store.unit = farmer;

    this.init = function (option) {
        store.options = option;
        store.canvas = document.querySelector('#app');
        store.canvas.width = 900;
        store.canvas.height = 700;

        store.ctx = store.canvas.getContext('2d');

        for(let i = 0; i < 5; i++) {
            grounds.push(this.createGround(i));
        }
        
        requestAnimationFrame(this.renderGame.bind(this));
    }

    this.createGround = function (idx) {
        const GROUND_WIDTH = BaseSetting.ground.default.width;
        const GROUND_HEIGHT = BaseSetting.ground.default.height;
        
        const newGroundInfo = Structure.createStructure({
            name: 'ground',
            category: 'subject',
            x: GROUND_WIDTH*idx,
            y: store.canvas.height - GROUND_HEIGHT,
            width: GROUND_WIDTH,
            height: GROUND_HEIGHT,
            speed: BaseSetting.ground.SPEED,
        });

        store.ground = new Structure(newGroundInfo);
        store.ground.img = new Image();
        store.ground.img.src = `./assets/images/ground.png`;

        return {
            img: store.ground.img,
            ground: store.ground,
        };
    }

    this.createCactus = function () {
        const RANDOM = Math.random();
        const WIDTH = 60;
        const HEIGHT = 70;
        const HEIGHT_INCREASE_VALUE = parseInt(RANDOM*50);
        const newCactusInfo = Structure.createStructure({
            name: 'cactus',
            category: 'subject',
            x: store.canvas.width,
            y: store.canvas.height - (HEIGHT + HEIGHT_INCREASE_VALUE) - BaseSetting.ground.default.height*BaseSetting.cactus.GROUND_RATIO,
            width: WIDTH,
            height: (HEIGHT+HEIGHT_INCREASE_VALUE),
            speed: RANDOM*BaseSetting.cactus.SPEED,
        });

        store.cactus = new Structure(newCactusInfo);
        store.cactus.img = new Image();
        store.cactus.img.src = `./assets/images/cactus.png`;
        
        return {
            img: store.cactus.img,
            cactus: store.cactus,
        };
    }

    this.createCloud = function () {
        const RANDOM_SIZE_RATIO = Math.random()*1;
        const newCloudInfo = Structure.createStructure({
            name: 'cloud',
            category: 'subject',
            x: store.canvas.width,
            y: 5+(75*Math.random()),
            width: BaseSetting.cloud.default.width*RANDOM_SIZE_RATIO,
            height: BaseSetting.cloud.default.height*RANDOM_SIZE_RATIO,
            speed: Math.random()*BaseSetting.cloud.SPEED,
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

        if(frame%BaseSetting.cloud.LIMIT_AMOUNT==0) {
            clouds.push(this.createCloud());
        }
        if(frame%BaseSetting.cactus.LIMIT_AMOUNT==0) {
            cactuses.push(this.createCactus());
        }
        
        if(frame%BaseSetting.player.default.AUTO_EARN_TIME==0) {
            unit_farmer.money += BaseSetting.player.default.EARN_VALUE;
        }
        
        // cloud
        clouds.forEach(({img, cloud}, idx)=>{
            store.ctx.drawImage(img, cloud.x, cloud.y, cloud.width, cloud.height);
            cloud.move(-BaseSetting.cloud.SPEED);
            if(cloud.x+cloud.width<=0) {
                clouds = [].concat(clouds.slice(0, idx),clouds.slice(idx+1));
            }
        });

        // cactus
        cactuses.forEach(({img, cactus}, idx)=>{
            store.ctx.drawImage(img, cactus.x, cactus.y, cactus.width, cactus.height);
            cactus.move(-BaseSetting.cactus.SPEED);
            if(cactus.x+cactus.width<=0) {
                cactuses = [].concat(cactuses.slice(0, idx),cactuses.slice(idx+1));
            }
        });
        
        // player
        const LIMIT_LEVEL = store.canvas.height - unit_farmer.sizeY - BaseSetting.ground.default.height*BaseSetting.player.default.GROUND_RATIO;
        if(unit_farmer.y + initGravity >= LIMIT_LEVEL) {
            unit_farmer.y = LIMIT_LEVEL;
            unit_farmer.gravity = initGravity+=3;
            if(jumped>0) {
                unit_farmer.jump();
                jumped--;
            } else {
                // 유닛 중력 초기화
                unit_farmer.gravity = initGravity = 0;
            }
        } else {
            unit_farmer.y += BaseSetting.commons.default.gravity + unit_farmer.gravity++;
        }

        store.ctx.fillStyle = `#3c9fff`;
        const player = new Image();
        if(!store.unit.attacked) {
            player.src = `./assets/images/unit.png`;
        } else {
            player.src = `./assets/images/unit-attack.png`;
        }
        store.ctx.drawImage(player, unit_farmer.x, unit_farmer.y, unit_farmer.sizeX+(store.unit.attacked?30:0), unit_farmer.sizeY);
        this.userInfo(unit_farmer);

        // cloud
        grounds.forEach(({img, ground}, idx)=>{
            store.ctx.drawImage(img, ground.x, ground.y, ground.width, ground.height);
            ground.move(-BaseSetting.ground.SPEED-1);
            if(ground.x + ground.width <= 0) {
                ground.x = store.canvas.width;
            }
        });

        requestAnimationFrame(this.renderGame.bind(this));
    }
}