export const store = new Proxy({}, {
    /* istanbul ignore next */
    set (thisArg, key, val, proxy) {
        thisArg[key] = val;
        return true;
    },
    /* istanbul ignore next */
    get (thisArg, key, proxy) {
        if(thisArg[key]==undefined) thisArg[key] = {};
        return thisArg[key];
    },
    deleteProperty (target, prop) {
        if(prop in target) {
            delete target[prop];
            console.debug(`"${prop}" 속성 삭제`);
            return true;
        }
    }
    // apply: function(target, thisArg, args) {
    //     Reflect.apply(target, thisArg, args);
    //     return args;
    // }
});