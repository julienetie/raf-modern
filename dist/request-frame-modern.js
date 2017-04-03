/**
 * request-frame-modern - Optimal requestAnimationFrame & cancelAnimationFrame polyfill for modern development
 * @version v2.0.0
 * @license MIT
 * Copyright Julien Etienne 2015 All Rights Reserved.
 */
/**
 * request-frame-modern - Optimal requestAnimationFrame & cancelAnimationFrame polyfill for modern development
 * @version v0.9.0
 * @license MIT
 * Copyright Julien Etienne 2015 All Rights Reserved.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.requestFrameModern = factory());
}(this, (function () { 'use strict';

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
    var immediateTime = Date.now();
    var lapsedTime = Math.max(previousTime + 16, immediateTime);
    return setTimeout(function () {
        callback(previousTime = lapsedTime);
    }, lapsedTime - immediateTime);
}

// Request and cancel functions for IE9+ & modern mobile browsers. 
var requestFrameFn = window.requestAnimationFrame || setTimeoutWithTimestamp;
var cancelFrameFn = window.cancelAnimationFrame || clearTimeoutWithId;

/**
 * 
 */
var setNativeFn = function setNativeFn(winObj, requestFn, cancelFn) {
    winObj.requestAnimationFrame = requestFn;
    winObj.cancelAnimationFrame = cancelFn;
};

/**
 * @param  {String} type - request | cancel | native | ''.
 * @return {Function} Timing function.
 */
var requestFrameModern = function requestFrameModern(type) {
    var timingType = {};

    timingType.request = requestFrameFn;
    timingType.cancel = cancelFrameFn;
    timingType[''] = timingType.request;

    if (type === 'native') {
        return setNativeFn(window, requestFrameFn, cancelFrameFn);
    }

    if (!timingType.hasOwnProperty(type)) {
        throw new Error('RequestFrame parameter is not a type.');
    }

    return timingType[type];
};

return requestFrameModern;

})));
