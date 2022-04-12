import {store} from '../store.js';

export const Controller = function () {
    this.init = function (model) {
        store.models = model;

        this.renderGame();

        window.addEventListener('keydown', this.handleUnitMove.bind(this));
        window.addEventListener('keydown', this.utilKey);
    }

    this.renderGame = function () {
        store.models.renderGame();
    }

    this.utilKey = function (e) {
        if(e.key == 'i') store.models.showBag(e);
    }

    this.handleUnitMove = function (e) {
        store.models.handleUnitMove(e);
    }
}