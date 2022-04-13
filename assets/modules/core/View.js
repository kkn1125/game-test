import store from '../../utils/store.js';
import * as Units from '../units/Units.js';

export const View = function () {
    

    this.init = function (option) {
        store.options = option;
        store.canvas = document.querySelector('#app');

        store.ctx = store.canvas.getContext('2d');
    }

    this.renderGame = function () {
        
    }
}