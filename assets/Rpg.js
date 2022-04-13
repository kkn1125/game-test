import store from './utils/store.js';
import * as mvc from './modules/Mvc.js';

export default (function () {
    return {
        init (option) {
            const view = new mvc.View();
            const model = new mvc.Model();
            const controller = new mvc.Controller();

            view.init(option);
            model.init(view);
            controller.init(model);
        }
    }
})();