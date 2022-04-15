import store from '../../utils/store.js';
import { BaseSetting } from '../units/base/BaseSetting.js';

export const Controller = function () {
    let jumpUse = false;
    this.init = function (model) {
        store.models = model;

        store.unit.attacked = false;

        window.addEventListener('keydown', this.handleJump);

        this.renderGame();
    }

    this.handleJump = function (e) {
        const LIMIT_LEVEL = store.canvas.height - store.unit.sizeY - BaseSetting.ground.default.height*BaseSetting.player.default.GROUND_RATIO;
        if(e.key.toLowerCase() == ' ') {
            if(!store.unit.jumping) {
                store.unit.jumping = true;
                setTimeout(() => {
                    store.unit.jumping = false;
                    store.unit.jump();
                }, 100);
            }
        }
        if(e.key.toLowerCase() == 'x') {
            
            if(!store.unit.attacked) {
                store.unit.attacked = true;
                setTimeout(() => {
                    store.unit.attacked = false;
                    store.unit.attack();
                }, 500);
            }
        }
    }

    this.renderGame = function () {
        store.models.renderGame();
    }
}