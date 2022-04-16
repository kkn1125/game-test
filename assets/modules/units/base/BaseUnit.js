import store from '../../../utils/store.js';
import {
    Ability,
    Root,
    Status
} from './BaseOption.js';
import {
    BaseSetting
} from './BaseSetting.js';

const BaseUnit = function (info = {}) {
    Root.call(this, info);
    this.speed = info.speed || BaseSetting.player.default.speed;
    this.sizeX = info.sizeX || 0;
    this.sizeY = info.sizeY || 0;
    this.x = info.x || 0;
    this.y = info.y || 0;
    this.level = info.level || 'no level';
    this.exp = info.exp || 0;
    this.hp = info.hp || BaseSetting.player.default.hp;
    this.mp = info.mp || BaseSetting.player.default.mp;
    this.maxHp = info.maxHp || BaseSetting.player.default.maxHp;
    this.maxMp = info.maxMp || BaseSetting.player.default.maxMp;
    this.ability = info.ability;
    this.status = info.status;
    this.maxJump = 50;
    this.gravity = BaseSetting.player.default.gravity;
    this.collectingItem = function (monster) {
        this.money += monster.money;
        this.exp += monster.exp;
        this.inventory.push(...monster.dropItem);
    }
    this.showStatus = function () {
        this.status.show();
    };
    this.showAbility = function () {
        this.ability.show();
    };
    this.attack = function (target) {
        const totalDamage = this.ability.damage+this.status.power+this.equips.toolR.status.power+this.equips.toolR.ability.damage;
        target.hp -= totalDamage;
        console.debug(`${target?.name||BaseSetting.commons.default.name}을 공격했다!`);
        console.debug(`${totalDamage} 데미지를 입혔다!`);
    };
    this.move = function (x) {
        this.x += x;
    };
    this.jumping = false;
    this.jump = function (y=BaseSetting.player.default.jump) {
        // console.debug(`점프 했다!`);
        let i=y;
        if(!this.jumping) {
            this.jumping = true;
            let jumping = setInterval(() => {
                this.y-=i--;
                if(i <= 0) {
                    clearInterval(jumping);
                    this.jumping = false;
                    i = y;
                }
            }, 10);
        }
    };
}

BaseUnit.extend(Root);

/**
 * @param {string} baseUnitInfo 유닛 정보
 * @param {string} baseUnitInfo.name 유닛 정보 - 이름
 * @param {int} baseUnitInfo.sizeX 유닛 정보 - X크기
 * @param {int} baseUnitInfo.sizeY 유닛 정보 - Y크기
 * @param {int} baseUnitInfo.x 유닛 정보 - x 좌표
 * @param {int} baseUnitInfo.y 유닛 정보 - y 좌표
 * @param {int} baseUnitInfo.level 유닛 정보 - 레벨
 * @param {int} baseUnitInfo.exp 유닛 정보 - 경험치
 * @param {int} baseUnitInfo.hp 유닛 정보 - 체력
 * @param {int} baseUnitInfo.mp 유닛 정보 - 마나
 * @param {int} baseUnitInfo.maxHp 유닛 정보 - 최대체력
 * @param {int} baseUnitInfo.maxMp 유닛 정보 - 최대마나
 * @param {int} baseUnitInfo.money 유닛 정보 - 돈
 * @param {Ability} baseUnitInfo.ability 유닛 정보 - 능력치
 * @param {Status} baseUnitInfo.status 유닛 정보 - 상태치
 * @returns {object} baseUnit의 정보
 */
BaseUnit.createBaseUnit = (baseUnitInfo = {}) => {
    return {
        name: baseUnitInfo.name,
        sizeX: baseUnitInfo.sizeX,
        sizeY: baseUnitInfo.sizeY,
        x: baseUnitInfo.x,
        y: baseUnitInfo.y,
        level: baseUnitInfo.level,
        exp: baseUnitInfo.exp,
        hp: baseUnitInfo.hp,
        mp: baseUnitInfo.mp,
        maxHp: baseUnitInfo.maxHp,
        maxMp: baseUnitInfo.maxMp,
        money: baseUnitInfo.money,
        ability: new Ability(baseUnitInfo.ability),
        status: new Status(baseUnitInfo.status),
    }
}

export {
    BaseUnit,
};