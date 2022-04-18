/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Block/Block.ts":
/*!***************************************!*\
  !*** ./src/components/Block/Block.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _types_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.json */ "./src/components/Block/types.json");

var BLOCK_SIZE = 20;
var Block = /** @class */ (function () {
    function Block(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.type = Object.keys(_types_json__WEBPACK_IMPORTED_MODULE_0__)[Math.floor(Math.random() * Object.keys(_types_json__WEBPACK_IMPORTED_MODULE_0__).length)];
        this.shape = _types_json__WEBPACK_IMPORTED_MODULE_0__[this.type].value;
        this.color = _types_json__WEBPACK_IMPORTED_MODULE_0__[this.type].color;
        this.placed = false;
        this.pos = {
            x: BLOCK_SIZE * 5,
            y: 0,
        };
        console.log("Initialised Block Type: ".concat(this.type));
    }
    Block.prototype.draw = function () {
        for (var _i = 0, _a = Array.from(this.shape.entries()); _i < _a.length; _i++) {
            var _b = _a[_i], idx = _b[0], val = _b[1];
            if (!val)
                continue;
            var yOffset = Math.floor(idx / 4);
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.pos.x + (BLOCK_SIZE * (idx - (4 * (yOffset !== null && yOffset !== void 0 ? yOffset : 1)))), this.pos.y + (BLOCK_SIZE * (yOffset !== null && yOffset !== void 0 ? yOffset : 1)), BLOCK_SIZE, BLOCK_SIZE);
        }
        if (this.pos.y + (BLOCK_SIZE * 2) < (this.canvas.height - BLOCK_SIZE))
            this.pos.y += BLOCK_SIZE;
        else
            this.placed = true;
    };
    return Block;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);


/***/ }),

/***/ "./src/components/Game.ts":
/*!********************************!*\
  !*** ./src/components/Game.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Block_Block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Block/Block */ "./src/components/Block/Block.ts");

var Game = /** @class */ (function () {
    function Game(fps, width, height) {
        this.fps = fps;
        this.now = null;
        this.then = Date.now();
        this.interval = 1000 / fps;
        this.delta = null;
        this.width = width;
        this.height = height;
        this.canvas = document.getElementById('screen');
        this.ctx = this.canvas.getContext('2d');
        this.activeBlock = null;
        this.setup();
    }
    Game.prototype.setup = function () {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    };
    Game.prototype.reset = function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    };
    Game.prototype.main = function () {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
        if (!this.activeBlock)
            this.activeBlock = new _Block_Block__WEBPACK_IMPORTED_MODULE_0__["default"](this.canvas, this.ctx);
        else
            this.activeBlock.draw();
    };
    Game.prototype.play = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.play(); });
        var now = Date.now();
        var elapsed = now - this.then;
        if (elapsed > this.interval) {
            this.then = now - (elapsed % this.interval);
            this.reset();
            this.main();
        }
    };
    return Game;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);


/***/ }),

/***/ "./src/components/Block/types.json":
/*!*****************************************!*\
  !*** ./src/components/Block/types.json ***!
  \*****************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"orangeRicky":{"color":"orange","value":[0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0]},"blueRicky":{"color":"blue","value":[0,0,0,0,2,0,0,0,2,2,2,0,0,0,0,0]},"clevelandZ":{"color":"yellow","value":[0,0,0,0,3,3,0,0,0,3,3,0,0,0,0,0]},"rhodeIslandZ":{"color":"green","value":[0,0,0,0,0,0,4,4,0,4,4,0,0,0,0,0]},"hero":{"color":"purple","value":[0,0,0,0,0,0,0,0,5,5,5,5,0,0,0,0]},"teewee":{"color":"red","value":[0,0,0,0,0,6,0,0,6,6,6,0,0,0,0,0]},"smashboy":{"color":"magenta","value":[0,0,0,0,0,7,7,0,0,7,7,0,0,0,0,0]}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Game */ "./src/components/Game.ts");

var FRAME_RATE = 10;
var WIDTH = 300;
var HEIGHT = 500;
var game = new _components_Game__WEBPACK_IMPORTED_MODULE_0__["default"](FRAME_RATE, WIDTH, HEIGHT);
game.play();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90c3RyaXMvLi9zcmMvY29tcG9uZW50cy9CbG9jay9CbG9jay50cyIsIndlYnBhY2s6Ly90c3RyaXMvLi9zcmMvY29tcG9uZW50cy9HYW1lLnRzIiwid2VicGFjazovL3RzdHJpcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90c3RyaXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RzdHJpcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RzdHJpcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RzdHJpcy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmxvY2tzIGZyb20gJy4vdHlwZXMuanNvbic7XG5cbmNvbnN0IEJMT0NLX1NJWkUgPSAyMDtcblxuY2xhc3MgQmxvY2sge1xuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHNoYXBlOiBudW1iZXJbXTtcbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIHBsYWNlZDogYm9vbGVhbjtcbiAgICBwb3M6IHtcbiAgICAgICAgeDogbnVtYmVyLFxuICAgICAgICB5OiBudW1iZXIsXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXG4gICAgICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy50eXBlID0gT2JqZWN0LmtleXMoYmxvY2tzKVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBPYmplY3Qua2V5cyhibG9ja3MpLmxlbmd0aCldO1xuICAgICAgICB0aGlzLnNoYXBlID0gYmxvY2tzW3RoaXMudHlwZSBhcyBrZXlvZiB0eXBlb2YgYmxvY2tzXS52YWx1ZTtcbiAgICAgICAgdGhpcy5jb2xvciA9IGJsb2Nrc1t0aGlzLnR5cGUgYXMga2V5b2YgdHlwZW9mIGJsb2Nrc10uY29sb3I7XG4gICAgICAgIHRoaXMucGxhY2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucG9zID0ge1xuICAgICAgICAgICAgeDogQkxPQ0tfU0laRSAqIDUsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBJbml0aWFsaXNlZCBCbG9jayBUeXBlOiAke3RoaXMudHlwZX1gKTtcbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICBmb3IoY29uc3QgW2lkeCwgdmFsXSBvZiBBcnJheS5mcm9tKHRoaXMuc2hhcGUuZW50cmllcygpKSkge1xuICAgICAgICAgICAgaWYgKCF2YWwpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjb25zdCB5T2Zmc2V0ID0gTWF0aC5mbG9vcihpZHggLyA0KTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICB0aGlzLnBvcy54ICsgKEJMT0NLX1NJWkUgKiAoaWR4IC0gKDQgKiAoeU9mZnNldCA/PyAxKSkpKSxcbiAgICAgICAgICAgICAgICB0aGlzLnBvcy55ICsgKEJMT0NLX1NJWkUgKiAoeU9mZnNldCA/PyAxKSksXG4gICAgICAgICAgICAgICAgQkxPQ0tfU0laRSwgXG4gICAgICAgICAgICAgICAgQkxPQ0tfU0laRVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBvcy55ICsgKEJMT0NLX1NJWkUgKiAyKSA8ICh0aGlzLmNhbnZhcy5oZWlnaHQgLSBCTE9DS19TSVpFKSkgdGhpcy5wb3MueSArPSBCTE9DS19TSVpFO1xuICAgICAgICBlbHNlIHRoaXMucGxhY2VkID0gdHJ1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJsb2NrOyIsImltcG9ydCBCbG9jayBmcm9tIFwiLi9CbG9jay9CbG9ja1wiO1xuXG5jbGFzcyBHYW1lIHtcbiAgICBmcHM6IG51bWJlcjtcbiAgICBub3c6IG51bGwgfCBudW1iZXI7XG4gICAgdGhlbjogbnVtYmVyO1xuICAgIGludGVydmFsOiBudW1iZXI7XG4gICAgZGVsdGE6IG51bGwgfCBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIGFjdGl2ZUJsb2NrOiBCbG9jayB8IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZnBzOiBudW1iZXIsXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXG4gICAgICAgIGhlaWdodDogbnVtYmVyLFxuICAgICkge1xuICAgICAgICB0aGlzLmZwcyA9IGZwcztcbiAgICAgICAgdGhpcy5ub3cgPSBudWxsO1xuICAgICAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmludGVydmFsID0gMTAwMCAvIGZwcztcbiAgICAgICAgdGhpcy5kZWx0YSA9IG51bGw7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjcmVlbicpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgICAgICB0aGlzLmFjdGl2ZUJsb2NrID0gbnVsbDtcblxuICAgICAgICB0aGlzLnNldHVwKCk7XG4gICAgfVxuXG4gICAgc2V0dXAoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuICAgIFxuICAgIG1haW4oKSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgICBpZiAoIXRoaXMuYWN0aXZlQmxvY2spIHRoaXMuYWN0aXZlQmxvY2sgPSBuZXcgQmxvY2sodGhpcy5jYW52YXMsIHRoaXMuY3R4KTtcbiAgICAgICAgZWxzZSB0aGlzLmFjdGl2ZUJsb2NrLmRyYXcoKTtcbiAgICB9XG4gICAgXG4gICAgcGxheSgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMucGxheSgpKTtcblxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBlbGFwc2VkID0gbm93IC0gdGhpcy50aGVuO1xuICAgICAgICBcbiAgICAgICAgaWYgKGVsYXBzZWQgPiB0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4gPSBub3cgLSAoZWxhcHNlZCAlIHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5tYWluKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHYW1lIGZyb20gJy4vY29tcG9uZW50cy9HYW1lJztcblxuY29uc3QgRlJBTUVfUkFURSA9IDEwO1xuY29uc3QgV0lEVEggPSAzMDA7XG5jb25zdCBIRUlHSFQgPSA1MDA7XG5cbmNvbnN0IGdhbWUgPSBuZXcgR2FtZShcbiAgICBGUkFNRV9SQVRFLFxuICAgIFdJRFRILFxuICAgIEhFSUdIVCxcbik7XG5cbmdhbWUucGxheSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==