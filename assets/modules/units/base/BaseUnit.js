import store from '../../../utils/store.js';
import {BaseSetting, Status, Ability} from './BaseSetting.js';

const extend = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
}

const BaseUnit = function (info = {}) {
    this.parent = Object.getPrototypeOf(this.constructor.prototype).constructor.name;
    this.id = store.id++;
    this.speed = info.speed || BaseSetting.player.speed;
    this.x = info.x || 0;
    this.y = info.y || 0;
    this.name = info.name || 'no name';
    this.level = info.level || 'no level';
    this.exp = info.exp || 0;
    this.hp = info.hp || BaseSetting.player.hp;
    this.mp = info.mp || BaseSetting.player.mp;
    this.maxHp = info.maxHp || BaseSetting.player.maxHp;
    this.maxMp = info.maxMp || BaseSetting.player.maxMp;
    this.ability = info.ability || new Ability();
    this.status = info.status || new Status();
    this.live = true;
}

/**
 * 
 * @param {string} name
 * @param {int} level
 * @param {int} exp
 * @param {int} hp
 * @param {int} mp
 * @param {object} ability
 * @param {object} status
 * @returns {object} baseUnit의 정보
 */
BaseUnit.createBaseUnit = (name, level, exp, hp, mp, maxHp, maxMp, ability, status) => {
    return {
        name: name,
        level: level,
        exp: exp,
        hp: hp,
        mp: mp,
        maxHp: maxHp,
        maxMp: maxMp,
        ability: new Ability(ability),
        status: new Status(status),
    }
}

export {
    extend,
    BaseUnit,
};