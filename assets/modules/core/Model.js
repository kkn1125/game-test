import store from '../../utils/store.js';
import { Ability, Status } from '../units/base/BaseSetting.js';
import * as Units from '../units/Units.js';

export const Model = function () {
    
    this.init = function (view) {
        store.views = view;
        const status = Status.createStatus(5, 5, 5, 5);
        const ability = Ability.createAbility(5, 0, 1);
        console.log(Units.BaseUnit.createBaseUnit('kimson', 1, 0, 300, 50, 300, 50, ability, status));
    }

    this.renderGame = function () {
    
    }
}