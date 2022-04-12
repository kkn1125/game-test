import {store} from '../store.js';
import { createUnitInfo, Human, Monster } from './core/Units.js';

export const View = function () {
    

    this.init = function (option) {
        store.options = option;
        store.canvas = document.querySelector('#app');

        store.ctx = store.canvas.getContext('2d');

        requestAnimationFrame(this.renderGame.bind(this));
    }

    this.drawUser = function (user) {
        store.ctx.fillStyle = "rgb(0,200,0)";
        store.ctx.fillRect(user.x, user.y, user.size, user.size);

        store.ctx.font = '16px mono';
        store.ctx.fillText(`[ Lv. ${user.level} ] ${user.name}`, user.x, user.y-50);
        store.ctx.fillText(`hp:${user.hp}`, user.x, user.y-30);
        store.ctx.fillText(`mp:${user.mp}`, user.x, user.y-10);
    }

    this.drawMob = function (mob) {
        store.ctx.fillStyle = "rgb(200,0,0)";
        store.ctx.fillRect(mob.x, mob.y, mob.size, mob.size);

        store.ctx.font = '16px mono';
        store.ctx.fillText(`[ Lv. ${mob.level} ] ${mob.name}`, mob.x, mob.y-50);
        store.ctx.fillText(`hp:${mob.hp}`, mob.x, mob.y-30);
        store.ctx.fillText(`mp:${mob.mp}`, mob.x, mob.y-10);
    }

    this.renderGame = function () {
        store.ctx.clearRect(0, 0, store.canvas.width, store.canvas.height);

        store.userData.forEach(this.drawUser);
        store.mobData.forEach(this.drawMob);

        requestAnimationFrame(this.renderGame.bind(this));
    }
}