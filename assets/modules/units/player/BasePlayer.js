import {
    BaseUnit
} from "../base/BaseUnit.js";

const Human = function (humans = {}) {
    BaseUnit.call(this, humans);
    this.equips = humans.equips || {};
    this.inventory = humans.inventory || [];
    this.money = humans.money || 0;
    this.select = false;
    this.levelUp = function () {
        this.level++;
        console.debug(`레벨업 했다! [Lv.${this.level}]`);
    };
}

Human.extend(BaseUnit);

/**
 * @param {object} humans 휴먼 정보
 * @param {Equipment} humans.equips 장비
 * @param {HeadItem} humans.equips.head 장비-머리
 * @param {BodyItem} humans.equips.body 장비-상의
 * @param {PantsItem} humans.equips.pants 장비-하의
 * @param {HandItem} humans.equips.hand 장비-손
 * @param {FootItem} humans.equips.foot 장비-발
 * @param {ToolLItem} humans.equips.foot 장비-왼손
 * @param {ToolRItem} humans.equips.foot 장비-오른손
 * @param {string[]} humans.inventory 인벤토리 배열
 * @param {int} humans.money 돈
 * @param {boolean} humans.select 캐릭 선택
 * @returns {object} Human 정보 반환
 */
Human.createHuman = (humans={}) => {
    return {
        // base
        ...BaseUnit.createBaseUnit(humans),
        // humans
        equips: humans.equips,
        inventory: humans.inventory,
        money: humans.money,
        select: humans.select,
    }
}

const Farmer = function (farmers = {}) {
    Human.call(this, farmers);
    this.skill = farmers.skill || {};
}

Farmer.extend(Human);
Farmer.createFarmer = (farmer={}) => {
    return {
        ...Human.createHuman(farmer),
        skill: farmer.skill,
    }
}

export {
    Human,
    Farmer
}