import { Ability, Status } from "../base/BaseOption.js";

const status = Status.createStatus({
    power: 5,
    dex: 0,
    int: 0,
    luck: 0,
});
const ability = Ability.createAbility({
    damage: 5,
    critical: 0,
    farmSpeed: 1,
});

export {status, ability};