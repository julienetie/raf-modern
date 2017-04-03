// Initial time of the timing lapse.
var previousTime = 0;


/**
 * Native clearTimeout function.
 * @return {Function}
 */
function clearTimeoutWithId(id) {
    window.clearTimeout(id);
    id = null;
}


/**
 * 
 * @callback {Number} Timestamp.
 * @return {Function} setTimeout Function.
 */
function setTimeoutWithTimestamp(callback) {
    const immediateTime = Date.now();
    let lapsedTime = Math.max(previousTime + 16, immediateTime);
    return setTimeout(function() {
            callback(previousTime = lapsedTime);
        },
        lapsedTime - immediateTime);
}

// Request and cancel functions for IE9+ & modern mobile browsers. 
const requestFrameFn = window.requestAnimationFrame || setTimeoutWithTimestamp;
const cancelFrameFn = window.cancelAnimationFrame || clearTimeoutWithId;


/**
 * 
 */
const setNativeFn = (winObj, requestFn, cancelFn) => {
    winObj.requestAnimationFrame = requestFn;
    winObj.cancelAnimationFrame = cancelFn;
}


/**
 * @param  {String} type - request | cancel | native | ''.
 * @return {Function} Timing function.
 */
const requestFrameModern = (type) => {
    const timingType = {};

    timingType.request = requestFrameFn;
    timingType.cancel = cancelFrameFn
    timingType[''] = timingType.request;

    if (type === 'native') {
        return setNativeFn(window, requestFrameFn, cancelFrameFn);
    }

    if (!timingType.hasOwnProperty(type)) {
        throw new Error('RequestFrame parameter is not a type.');
    }

    return timingType[type];
}


/** 
 * Export as default.
 */
export default requestFrameModern;