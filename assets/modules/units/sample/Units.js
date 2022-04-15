import { Structure } from "../base/BaseOption.js";
import { BaseSetting } from "../base/BaseSetting.js";
import {
    Farmer
} from "../player/BasePlayer.js";
import {
    BaseUnit,
    Human
} from "../Units.js";
import * as Sample from "./Items.js";
import * as Status from "./Status.js";

const baseUnitInfo = BaseUnit.createBaseUnit({
    name: 'Tomson',
    sizeX: BaseSetting.player.default.sizeX,
    sizeY: BaseSetting.player.default.sizeY,
    x: BaseSetting.player.default.x,
    y: BaseSetting.player.default.y,
    level: BaseSetting.player.default.level,
    exp: BaseSetting.player.default.exp,
    hp: BaseSetting.player.default.hp,
    mp: BaseSetting.player.default.mp,
    maxHp: BaseSetting.player.default.maxHp,
    maxMp: BaseSetting.player.default.maxMp,
    ability: Status.ability,
    status: Status.status,
});

const humanInfo = Human.createHuman({
    ...baseUnitInfo,
    equips: Sample.equipments,
    inventory: [],
    money: BaseSetting.player.default.money,
    select: true,
});

const human = new Human(humanInfo);

const farmerInfo = Farmer.createFarmer({
    ...humanInfo,
    skill: null,
});

const farmer = new Farmer(farmerInfo);

const cloudInfo = Structure.createStructure({
    name: 'cloud',
    category: 'subject',
    x: 5,
    y: 30,
    width: 50,
    height: 50,
    speed: 1,
});

const cloud = new Structure(cloudInfo);

const cactusInfo = Structure.createStructure({
    name: 'cactus',
    category: 'subject',
    x: 5,
    y: 30,
    width: 30,
    height: 70,
    speed: 0,
});

const cactus = new Structure(cactusInfo);

const groundInfo = Structure.createStructure({
    name: 'ground',
    category: 'subject',
    x: 0,
    y: 30,
    width: 280,
    height: 70,
    speed: 1,
});

const ground = new Structure(groundInfo);

export {
    baseUnitInfo,
    humanInfo,
    human,
    farmer,
    cloudInfo,
    cloud,
    cactusInfo,
    cactus,
    groundInfo,
    ground,
};