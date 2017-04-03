# requestFrameModern

## Optimal requestAnimationFrame & cancelAnimationFrame polyfill for modern development.

### A polyfill based on [request-frame](https://github.com/julienetie/request-frame)

- Supports ES6, CJS & UMD
- Provides a clean polyfill for requestAnimationFrame & cancelAnimationFrame.
- Tested & working on: IE 9+, FF 25+, Opera 36+, Safari 6.1+, Chrome 30+, iOS 7+, Android 4.4+, Android Chrome 30+.  
- Doesn't modify native functions unless specified.

If you need to support legacy browsers see [requestFrame](https://github.com/julienetie/request-frame) for full support from IE5.5+.


#### Install options

`npm i request-frame-modern --save`

`yarn add request-frame-modern`


```javascript
import requestFrameModern from 'request-frame-modern';  // ES6
```

```javascript
<script src="request-frame-modern.js"></script> // AMD, IIFE
```

```javascript
const requestFrameModern = require('request-frame-modern');  // CJS
```


### The API:
#### Assign the timing functions:
*requestFrameModern( request | cancel | native )*  request is default. 
```javascript
var request = requestFrameModern('request'); // window.requestAnimationFrame | setTimeout
var cancel = requestFrameModern('cancel'); // window.cancelAnimationFrame | cancelTimeout
```
#### Or re/ assign native functions:
```javascript
requestFrameModern('native'); // re/ declares requestAnimationFrame & cancelAnimationFrame
```
Below is just an example of the requestAnimationFrame API, see links: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame), [MSDN](https://msdn.microsoft.com/en-us/library/windows/apps/hh453388.aspx) & [W3](http://www.w3.org/TR/2011/WD-html5-20110525/timers.html). 

#### Loop something:
```javascript
var requestId;

function something( useTimeStamp ){
    
    // Do something here
    
    requestId = requestFrameModern(something); 
}

requestId = requestFrameModern(something); // Assigns Id & calls "something"
```

#### Cancel something:

```javascript
cancel(requestId);  // Cancels frame request 
```

### The ideology
request-frame-modern aims to provide an optimal development consistency with the use of animation timing functions across the large number of browsers and devices. This lib is ideal for those who may want to avoid re-assigning native functions, or avoid interfering with other libs that do. requestFrameModern() is purposely not a constructor. The intention is for requestAnimationFrame to be used once or few times during execution since multiple task are expected to be more efficient via a single requestAnimationFrame loop compared to several instances.
    

### Contribute
Just do it!

#### Test 
`npm run test` 
To launch port 9999 

- ./test/
- ./test/compatibility-assignation-amd.html   
- ./test/compatibility-assignation.html 
- ./test/compatibility-native-amd.html 
- ./test/compatibility-native.html 

_Browser based testing for RAF is imperative_

--- 

[MIT License](https://github.com/julienetie/request-frame-modern/blob/master/LICENSE) 

&#169; 2016 Julien Etienne 
