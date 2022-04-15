import store from "../../../utils/store.js";
import {
    BaseSetting
} from "./BaseSetting.js";

Object.prototype.extend = function (parent) {
    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
}

const Root = function (option) {
    this.parent = Object.getPrototypeOf(this.constructor.prototype).constructor.name;
    this.id = store.id++;
    this.name = option.name;
    this.live = true;
    this.die = function () {
        console.debug(`죽었다!`);
        this.live = false;
    };
}

const Item = function (items) {
    Root.call(this, items);
    this.ability = items.ability;
    this.status = items.status;
    this.grage = items.grade || 0;
    this.durability = items.durability || 1;
}

Item.extend(Root);
Item.createItem = ({
    name,
    grade,
    ability,
    status,
    itemType
}) => {
    return {
        name: name || BaseSetting.commons.default.name,
        grade: grade || 0,
        ability: new Ability(ability),
        status: new Status(status),
        itemType: itemType,
    }
};

const HeadItem = function (option = {}) {
    Item.call(this, option);
    this.itemType = option.itemType || 'head';
}
HeadItem.extend(Item);

const BodyItem = function (item = {}) {
    Item.call(this, item);
    this.itemType = item.itemType || 'body';
}
BodyItem.extend(Item);

const PantsItem = function (item = {}) {
    Item.call(this, item);
    this.itemType = item.itemType || 'pants';
}
PantsItem.extend(Item);

const HandItem = function (item = {}) {
    Item.call(this, item);
    this.itemType = item.itemType || 'hand';
}
HandItem.extend(Item);

const FootItem = function (item = {}) {
    Item.call(this, item);
    this.itemType = item.itemType || 'foot';
}
FootItem.extend(Item);

const ToolLItem = function (item = {}) {
    Item.call(this, item);
    this.itemType = item.itemType || 'tooll';
}
ToolLItem.extend(Item);

const ToolRItem = function (item = {}) {
    Item.call(this, item);
    this.itemType = item.itemType || 'toolr';
}
ToolRItem.extend(Item);

/* istanbul ignore next */
const Equipment = function (equip = {}) {
    this.head = equip.head || null;
    this.body = equip.body || null;
    this.pants = equip.pants || null;
    this.hand = equip.hand || null;
    this.foot = equip.foot || null;
    this.toolL = equip.toolL || null;
    this.toolR = equip.toolR || null;
};
/**
 * 
 * @param {Item} head 
 * @param {Item} body 
 * @param {Item} pants 
 * @param {Item} hand 
 * @param {Item} foot 
 * @param {Item} toolL 
 * @param {Item} toolR 
 * @returns {Equipment} 장비
 */
Equipment.createEquipment = (item = {}) => {
    return {
        head: new HeadItem(item.head),
        body: new BodyItem(item.body),
        pants: new PantsItem(item.pants),
        hand: new HandItem(item.hand),
        foot: new FootItem(item.foot),
        toolL: new ToolLItem(item.toolL),
        toolR: new ToolRItem(item.toolR),
    }
}

const Ability = function (ability = {}) {
    this.damage = ability.damage || BaseSetting.player.default.ability.damage;
    this.critical = ability.critical || BaseSetting.player.default.ability.critical;
    this.farmSpeed = ability.farmSpeed || BaseSetting.player.default.ability.farmSpeed;
    this.show = function () {
        console.log(`
    ========== Ability ==========
        damage: ${this.damage}
        critical: ${this.critical}
        farmSpeed: ${this.farmSpeed}
    ========== Ability ==========
        `)
    }
};
Ability.createAbility = (ability = {}) => {
    return {
        damage: ability.damage,
        critical: ability.critical,
        farmSpeed: ability.farmSpeed,
    }
};

const Status = function (status = {}) {
    this.power = status.power || BaseSetting.player.default.status.power;
    this.dex = status.dex || BaseSetting.player.default.status.dex;
    this.int = status.int || BaseSetting.player.default.status.int;
    this.luck = status.luck || BaseSetting.player.default.status.luck;
    this.show = function () {
        console.log(`
    ========== Status ==========
        power: ${this.power}
        dex: ${this.dex}
        int: ${this.int}
        luck: ${this.luck}
    ========== Status ==========
        `)
    }
};
Status.createStatus = (status = {}) => {
    return {
        power: status.power,
        dex: status.dex,
        int: status.int,
        luck: status.luck,
    }
};

function Structure (info={}) {
    Root.call(this, info);
    this.category = info.category||BaseSetting.structure.default.category.subject;
    this.x = info.x||BaseSetting.structure.default.locate.x;
    this.y = info.y||BaseSetting.structure.default.locate.y;
    this.width = info.width||BaseSetting.structure.default.size.width;
    this.height = info.height||BaseSetting.structure.default.size.height;
    this.speed = info.speed||BaseSetting.structure.default.speed;
    this.move = function (x) {
        this.x += x + this.speed;
    }
}

Structure.extend(Root);

/**
 * 
 * @param {object} structure 구조물 정보
 * @param {string} structure.name 구조물 정보 - 이름
 * @param {string} structure.category 구조물 정보 - 분류
 * @param {string} structure.x 구조물 정보 - 좌표 X
 * @param {string} structure.y 구조물 정보 - 좌표 X
 * @param {string} structure.width 구조물 정보 - 너비
 * @param {string} structure.height 구조물 정보 - 높이
 * @param {string} structure.speed 구조물 정보 - 속도
 * @returns {object} 구조물 정보
 */
Structure.createStructure = (structure={}) => {
    return {
        name: structure.name,
        category: structure.category,
        x: structure.x,
        y: structure.y,
        width: structure.width,
        height: structure.height,
        speed: structure.speed,
    }
}

export {
    Root,
    Item,
    Equipment,
    Ability,
    Status,
    Structure
};