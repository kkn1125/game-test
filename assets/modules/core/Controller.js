import store from '../../utils/store.js';

export const Controller = function () {
    this.init = function (model) {
        store.models = model;

        this.renderGame();
    }

    this.renderGame = function () {
        store.models.renderGame();
    }
}