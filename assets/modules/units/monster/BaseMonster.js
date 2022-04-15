import {
    BaseUnit
} from "../base/BaseUnit.js";

/* istanbul ignore next */
const Monster = function (monsters = {}) {
    BaseUnit.call(this, monsters);
    this.dropItem = monsters.dropItem || [];
    this.money = monsters.money || 50;
}

Monster.extend(BaseUnit);
Monster.createMonster = function (baseInfo, monsters={}) {
    return {
        ...baseInfo,
        dropItem: monsters.dropItem,
        money: monsters.money,
    }
}

const Spider = function (spiders = {}) {
    Monster.call(this, spiders);
    this.category = spiders.category || 'bugs';
}

Spider.extend(Monster);
Spider.createSpider = function (monsters, spiders={}) {
    return {
        ...monsters,
        category: spiders.category,
    }
}

export {
    Monster,
    Spider,
};