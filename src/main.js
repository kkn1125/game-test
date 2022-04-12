import {store} from './store.js';
import * as core from './scripts/core/Core.js';

const MMORPG = (function () {
    return {
        init (option) {
            const view = new core.View();
            const model = new core.Model();
            const controller = new core.Controller();

            view.init(option);
            model.init(view);
            controller.init(model);
        }
    }
})();

MMORPG.init({});