import store from '../../utils/store.js';
import {
    Ability,
    Status
} from '../units/base/BaseOption.js';
import * as Sample from '../units/sample/__Items.js';
import { farmer, human } from '../units/sample/__Units.js';
import {
    Human,
    BaseUnit
} from '../units/Units.js';

export const Model = function () {

    this.init = function (view) {
        store.views = view;

        console.log(farmer)
    }

    this.renderGame = function () {

    }
}