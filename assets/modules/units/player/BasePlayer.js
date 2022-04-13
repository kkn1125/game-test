import {
    extend,
    BaseUnit
} from "../base/BaseUnit.js";

const Human = function (info, humans={}) {
    BaseUnit.call(this, info);
    this.equips = humans.equips || {};
    this.inventory = humans.inventory || [];
    this.money = humans.money || 0;
    this.select = false;
}


extend(Human, BaseUnit);

/**
 * 
 * @param {object} equips 장비
 * @param {object} equips.head 장비-머리
 * @param {object} equips.body 장비-상의
 * @param {object} equips.pants 장비-하의
 * @param {object} equips.hand 장비-손
 * @param {object} equips.foot 장비-발
 * @param {string[]} inventory 
 * @param {int} money 
 * @param {boolean} select 
 * @returns {object} Human 정보 반환
 */
Human.createHuman = (equips, inventory, money, select) => {
    return {
        equips: equips,
        inventory: inventory,
        money: money,
        select: select,
    }
}

const Farmer = function (info, humans, farmers = {}) {
    Human.call(this, info, humans);
    this.skill = farmers.skill || {};
}

extend(Farmer, Human);

const f1 = new Farmer();

export {
    Human,
    Farmer
}