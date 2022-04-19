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

var Block = /** @class */ (function () {
    function Block(canvas, ctx, blockSize) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.blockSize = blockSize;
        this.type = Object.keys(_types_json__WEBPACK_IMPORTED_MODULE_0__)[Math.floor(Math.random() * Object.keys(_types_json__WEBPACK_IMPORTED_MODULE_0__).length)];
        this.shapeIndex = 0;
        this.shape = _types_json__WEBPACK_IMPORTED_MODULE_0__[this.type].values[this.shapeIndex];
        this.color = _types_json__WEBPACK_IMPORTED_MODULE_0__[this.type].color;
        this.placed = false;
        this.pos = {
            x: this.blockSize * 5,
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
            this.ctx.fillRect(this.pos.x + (this.blockSize * (idx - (4 * (yOffset !== null && yOffset !== void 0 ? yOffset : 1)))), this.pos.y + (this.blockSize * (yOffset !== null && yOffset !== void 0 ? yOffset : 1)), this.blockSize, this.blockSize);
        }
    };
    Block.prototype.rotate = function () {
        if (_types_json__WEBPACK_IMPORTED_MODULE_0__[this.type].values[this.shapeIndex + 1]) {
            this.shapeIndex += 1;
        }
        else if (this.shapeIndex > 0) {
            this.shapeIndex = 0;
        }
        this.shape = _types_json__WEBPACK_IMPORTED_MODULE_0__[this.type].values[this.shapeIndex];
    };
    Block.prototype.move = function (direction) {
        if (direction === 'left' && this.pos.x > 0)
            this.pos.x -= this.blockSize;
        else if (direction === 'right' && this.pos.x < (this.canvas.width - (this.blockSize * 3)))
            this.pos.x += this.blockSize;
        else if (direction === 'down' && this.pos.y < (this.canvas.height - (this.blockSize * 3)))
            this.pos.y += this.blockSize;
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
    function Game(fps, width, height, blockSize) {
        this.blockSize = blockSize;
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
        var _this = this;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        document.addEventListener('keypress', function (e) {
            if (!_this.activeBlock)
                return;
            if (e.key === 'w')
                _this.activeBlock.rotate();
            else if (e.key === 'a')
                _this.activeBlock.move('left');
            else if (e.key === 's')
                _this.activeBlock.move('down');
            else if (e.key === 'd')
                _this.activeBlock.move('right');
            _this.reset();
            _this.draw();
            _this.activeBlock.draw();
        });
    };
    Game.prototype.reset = function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    };
    Game.prototype.draw = function () {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
    };
    Game.prototype.main = function () {
        var _a;
        this.draw();
        if (!this.activeBlock || ((_a = this.activeBlock) === null || _a === void 0 ? void 0 : _a.placed))
            this.activeBlock = new _Block_Block__WEBPACK_IMPORTED_MODULE_0__["default"](this.canvas, this.ctx, this.blockSize);
        this.activeBlock.draw();
        if (this.activeBlock.pos.y + (this.blockSize * 2) < (this.canvas.height - this.blockSize))
            this.activeBlock.pos.y += this.blockSize;
        else
            this.activeBlock.placed = true;
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

module.exports = JSON.parse('{"orangeRicky":{"color":"orange","values":[[0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0],[0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0],[0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,0],[0,0,0,0,0,1,1,0,0,0,1,0,0,0,1,0]]},"blueRicky":{"color":"blue","values":[[0,0,0,0,2,0,0,0,2,2,2,0,0,0,0,0],[0,2,2,0,0,2,0,0,0,2,0,0,0,0,0,0],[0,0,0,0,0,2,0,0,0,2,2,2,0,0,0,0],[0,0,0,0,0,2,2,0,0,2,0,0,0,2,0,0]]},"clevelandZ":{"color":"red","values":[[0,0,0,0,3,3,0,0,0,3,3,0,0,0,0,0],[0,0,3,0,0,3,3,0,0,3,0,0,0,0,0,0],[0,0,0,0,0,0,3,3,0,3,3,0,0,0,0,0],[0,0,0,0,0,3,0,0,0,3,3,0,0,0,3,0]]},"rhodeIslandZ":{"color":"green","values":[[0,0,0,0,4,4,0,0,0,4,4,0,0,0,0,0],[0,0,4,0,0,4,4,0,0,4,0,0,0,0,0,0],[0,0,0,0,0,0,4,4,0,4,4,0,0,0,0,0],[0,0,0,0,0,4,0,0,0,4,4,0,0,0,4,0]]},"hero":{"color":"cyan","values":[[0,0,0,0,0,0,0,0,5,5,5,5,0,0,0,0],[0,0,5,0,0,0,5,0,0,0,5,0,0,0,5,0]]},"teewee":{"color":"purple","values":[[0,0,0,0,0,6,0,0,6,6,6,0,0,0,0,0],[0,6,0,0,0,6,6,0,0,6,0,0,0,0,0,0],[0,0,0,0,0,6,6,6,0,0,6,0,0,0,0,0],[0,0,0,0,0,0,6,0,0,6,6,0,0,0,6,0]]},"smashboy":{"color":"yellow","values":[[0,0,0,0,0,7,7,0,0,7,7,0,0,0,0,0]]}}');

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

var FRAME_RATE = 1;
var WIDTH = 300;
var HEIGHT = 500;
var BLOCK_SIZE = 20;
var game = new _components_Game__WEBPACK_IMPORTED_MODULE_0__["default"](FRAME_RATE, WIDTH, HEIGHT, BLOCK_SIZE);
game.play();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7QUFFRixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90c3RyaXMvLi9zcmMvY29tcG9uZW50cy9CbG9jay9CbG9jay50cyIsIndlYnBhY2s6Ly90c3RyaXMvLi9zcmMvY29tcG9uZW50cy9HYW1lLnRzIiwid2VicGFjazovL3RzdHJpcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90c3RyaXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RzdHJpcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RzdHJpcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RzdHJpcy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmxvY2tzIGZyb20gJy4vdHlwZXMuanNvbic7XG5cbmNsYXNzIEJsb2NrIHtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBzaGFwZUluZGV4OiBudW1iZXI7XG4gICAgc2hhcGU6IG51bWJlcltdO1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgcGxhY2VkOiBib29sZWFuO1xuICAgIGJsb2NrU2l6ZTogbnVtYmVyO1xuICAgIHBvczoge1xuICAgICAgICB4OiBudW1iZXIsXG4gICAgICAgIHk6IG51bWJlcixcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgICAgICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXG4gICAgICAgIGJsb2NrU2l6ZTogbnVtYmVyLFxuICAgICkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuYmxvY2tTaXplID0gYmxvY2tTaXplO1xuICAgICAgICB0aGlzLnR5cGUgPSBPYmplY3Qua2V5cyhibG9ja3MpW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE9iamVjdC5rZXlzKGJsb2NrcykubGVuZ3RoKV07XG4gICAgICAgIHRoaXMuc2hhcGVJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBibG9ja3NbdGhpcy50eXBlIGFzIGtleW9mIHR5cGVvZiBibG9ja3NdLnZhbHVlc1t0aGlzLnNoYXBlSW5kZXhdIGFzIG51bWJlcltdO1xuICAgICAgICB0aGlzLmNvbG9yID0gYmxvY2tzW3RoaXMudHlwZSBhcyBrZXlvZiB0eXBlb2YgYmxvY2tzXS5jb2xvcjtcbiAgICAgICAgdGhpcy5wbGFjZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wb3MgPSB7XG4gICAgICAgICAgICB4OiB0aGlzLmJsb2NrU2l6ZSAqIDUsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBJbml0aWFsaXNlZCBCbG9jayBUeXBlOiAke3RoaXMudHlwZX1gKTtcbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICBmb3IoY29uc3QgW2lkeCwgdmFsXSBvZiBBcnJheS5mcm9tKHRoaXMuc2hhcGUuZW50cmllcygpKSkge1xuICAgICAgICAgICAgaWYgKCF2YWwpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjb25zdCB5T2Zmc2V0ID0gTWF0aC5mbG9vcihpZHggLyA0KTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICB0aGlzLnBvcy54ICsgKHRoaXMuYmxvY2tTaXplICogKGlkeCAtICg0ICogKHlPZmZzZXQgPz8gMSkpKSksXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MueSArICh0aGlzLmJsb2NrU2l6ZSAqICh5T2Zmc2V0ID8/IDEpKSxcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrU2l6ZSwgXG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja1NpemVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByb3RhdGUoKSB7XG4gICAgICAgIGlmIChibG9ja3NbdGhpcy50eXBlIGFzIGtleW9mIHR5cGVvZiBibG9ja3NdLnZhbHVlc1t0aGlzLnNoYXBlSW5kZXggKyAxXSkge1xuICAgICAgICAgICAgdGhpcy5zaGFwZUluZGV4ICs9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGFwZUluZGV4ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zaGFwZUluZGV4ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hhcGUgPSBibG9ja3NbdGhpcy50eXBlIGFzIGtleW9mIHR5cGVvZiBibG9ja3NdLnZhbHVlc1t0aGlzLnNoYXBlSW5kZXhdIGFzIG51bWJlcltdO1xuICAgIH1cblxuICAgIG1vdmUoZGlyZWN0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnICYmIHRoaXMucG9zLnggPiAwKSB0aGlzLnBvcy54IC09IHRoaXMuYmxvY2tTaXplO1xuICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcgJiYgdGhpcy5wb3MueCA8ICh0aGlzLmNhbnZhcy53aWR0aCAtICh0aGlzLmJsb2NrU2l6ZSAqIDMpKSkgdGhpcy5wb3MueCArPSB0aGlzLmJsb2NrU2l6ZTtcbiAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZG93bicgJiYgdGhpcy5wb3MueSA8ICh0aGlzLmNhbnZhcy5oZWlnaHQgLSAodGhpcy5ibG9ja1NpemUgKiAzKSkpIHRoaXMucG9zLnkgKz0gdGhpcy5ibG9ja1NpemU7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9jazsiLCJpbXBvcnQgQmxvY2sgZnJvbSBcIi4vQmxvY2svQmxvY2tcIjtcblxuY2xhc3MgR2FtZSB7XG4gICAgYmxvY2tTaXplOiBudW1iZXI7XG4gICAgZnBzOiBudW1iZXI7XG4gICAgbm93OiBudWxsIHwgbnVtYmVyO1xuICAgIHRoZW46IG51bWJlcjtcbiAgICBpbnRlcnZhbDogbnVtYmVyO1xuICAgIGRlbHRhOiBudWxsIHwgbnVtYmVyO1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBhY3RpdmVCbG9jazogQmxvY2sgfCBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGZwczogbnVtYmVyLFxuICAgICAgICB3aWR0aDogbnVtYmVyLFxuICAgICAgICBoZWlnaHQ6IG51bWJlcixcbiAgICAgICAgYmxvY2tTaXplOiBudW1iZXIsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuYmxvY2tTaXplID0gYmxvY2tTaXplO1xuICAgICAgICB0aGlzLmZwcyA9IGZwcztcbiAgICAgICAgdGhpcy5ub3cgPSBudWxsO1xuICAgICAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmludGVydmFsID0gMTAwMCAvIGZwcztcbiAgICAgICAgdGhpcy5kZWx0YSA9IG51bGw7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjcmVlbicpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgICAgICB0aGlzLmFjdGl2ZUJsb2NrID0gbnVsbDtcblxuICAgICAgICB0aGlzLnNldHVwKCk7XG4gICAgfVxuXG4gICAgc2V0dXAoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZUJsb2NrKSByZXR1cm47XG5cbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ3cnKSB0aGlzLmFjdGl2ZUJsb2NrLnJvdGF0ZSgpO1xuICAgICAgICAgICAgZWxzZSBpZiAoZS5rZXkgPT09ICdhJykgdGhpcy5hY3RpdmVCbG9jay5tb3ZlKCdsZWZ0Jyk7XG4gICAgICAgICAgICBlbHNlIGlmIChlLmtleSA9PT0gJ3MnKSB0aGlzLmFjdGl2ZUJsb2NrLm1vdmUoJ2Rvd24nKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5ID09PSAnZCcpIHRoaXMuYWN0aXZlQmxvY2subW92ZSgncmlnaHQnKTtcblxuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUJsb2NrLmRyYXcoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cbiAgICBcbiAgICBtYWluKCkge1xuICAgICAgICB0aGlzLmRyYXcoKTtcblxuICAgICAgICBpZiAoIXRoaXMuYWN0aXZlQmxvY2sgfHwgdGhpcy5hY3RpdmVCbG9jaz8ucGxhY2VkKSB0aGlzLmFjdGl2ZUJsb2NrID0gbmV3IEJsb2NrKHRoaXMuY2FudmFzLCB0aGlzLmN0eCwgdGhpcy5ibG9ja1NpemUpO1xuICAgICAgICB0aGlzLmFjdGl2ZUJsb2NrLmRyYXcoKTtcblxuICAgICAgICBpZiAodGhpcy5hY3RpdmVCbG9jay5wb3MueSArICh0aGlzLmJsb2NrU2l6ZSAqIDIpIDwgKHRoaXMuY2FudmFzLmhlaWdodCAtIHRoaXMuYmxvY2tTaXplKSkgdGhpcy5hY3RpdmVCbG9jay5wb3MueSArPSB0aGlzLmJsb2NrU2l6ZTtcbiAgICAgICAgZWxzZSB0aGlzLmFjdGl2ZUJsb2NrLnBsYWNlZCA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIHBsYXkoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLnBsYXkoKSk7XG5cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IG5vdyAtIHRoaXMudGhlbjtcbiAgICAgICAgXG4gICAgICAgIGlmIChlbGFwc2VkID4gdGhpcy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhpcy50aGVuID0gbm93IC0gKGVsYXBzZWQgJSB0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMubWFpbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tICcuL2NvbXBvbmVudHMvR2FtZSc7XG5cbmNvbnN0IEZSQU1FX1JBVEUgPSAxO1xuY29uc3QgV0lEVEggPSAzMDA7XG5jb25zdCBIRUlHSFQgPSA1MDA7XG5jb25zdCBCTE9DS19TSVpFID0gMjA7XG5cbmNvbnN0IGdhbWUgPSBuZXcgR2FtZShcbiAgICBGUkFNRV9SQVRFLFxuICAgIFdJRFRILFxuICAgIEhFSUdIVCxcbiAgICBCTE9DS19TSVpFLFxuKTtcblxuZ2FtZS5wbGF5KCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9