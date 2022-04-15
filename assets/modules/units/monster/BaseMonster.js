import {
    BaseUnit
} from "../base/BaseUnit.js";

/* istanbul ignore next */
const Monster = function (info, monsters = {}) {
    BaseUnit.call(this, info);
    this.dropItem = monsters.dropItem || [];
    this.money = monsters.money || 0;
    this.select = false;
}

Monster.extend(BaseUnit);

export {
    Monster
};