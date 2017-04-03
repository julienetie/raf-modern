/**
 * request-frame-modern - Optimal requestAnimationFrame & cancelAnimationFrame polyfill for modern development
 * @version v2.0.0
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
 * Native clearTimeout function for IE-9 cancelAnimationFrame
 * @return {Function}
 */
var clearTimeoutWithId = function clearTimeoutWithId(id) {
    window.clearTimeout(id);
    id = null;
};

/**
 * IE-9 Polyfill for requestAnimationFrame
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
 * Set the requestAnimationFrame & cancelAnimationFrame window functions.
 */
var setNativeFn = function setNativeFn(requestFn, cancelFn, winObj) {
    winObj.requestAnimationFrame = requestFn;
    winObj.cancelAnimationFrame = cancelFn;
};

/**
 * Default function to set the timing.
 * @param  {String} type - request | cancel | native | ''.
 * @return {Function} Timing function.
 */
var requestFrameModern = function requestFrameModern(type) {
    var errorMessage = 'RequestFrame parameter is not a type.';
    var native = 'native';
    var timingType = {};

    timingType.request = requestFrameFn;
    timingType.cancel = cancelFrameFn;
    timingType[''] = timingType.request;

    if (type === native) {
        return setNativeFn(requestFrameFn, cancelFrameFn, window);
    }

    if (!timingType.hasOwnProperty(type)) {
        throw new Error(errorMessage);
    }

    return timingType[type];
};

return requestFrameModern;

})));
