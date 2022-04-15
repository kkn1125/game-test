import {
    Ability,
    Equipment,
    Item,
    Status
} from "../base/BaseOption.js";
import {
    BaseSetting
} from "../base/BaseSetting.js";

const head = Item.createItem('head gear', 0, Ability.createAbility(BaseSetting.item.default.ability), Status.createStatus(BaseSetting.item.default.status));
const body = Item.createItem('shirts', 0, Ability.createAbility(BaseSetting.item.default.ability), Status.createStatus(BaseSetting.item.default.status));
const hand = Item.createItem('glob', 0, Ability.createAbility(BaseSetting.item.default.ability), Status.createStatus(BaseSetting.item.default.status));
const pants = Item.createItem('jean', 0, Ability.createAbility(BaseSetting.item.default.ability), Status.createStatus(BaseSetting.item.default.status));
const foot = Item.createItem('sandle', 0, Ability.createAbility(BaseSetting.item.default.ability), Status.createStatus(BaseSetting.item.default.status));
const toolL = Item.createItem('hand', 0, Ability.createAbility(BaseSetting.item.default.ability), Status.createStatus(BaseSetting.item.default.status));
const toolR = Item.createItem('hand', 0, Ability.createAbility(BaseSetting.item.default.ability), Status.createStatus(BaseSetting.item.default.status));

const equipments = Equipment.createEquipment({
    head,
    body,
    hand,
    pants,
    foot,
    toolL,
    toolR
});

export {
    head,
    body,
    hand,
    pants,
    foot,
    toolL,
    toolR,
    equipments
};