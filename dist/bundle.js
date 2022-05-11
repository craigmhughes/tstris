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
        // this.type = 'hero';
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
        if ((this.pos.x > 0 && this.pos.x <= this.blockSize) || (this.pos.x < 0 && !this.checkLeftCol(this.pos.x)))
            this.pos.x = 0;
        else if (this.pos.x >= (this.canvas.width - (this.blockSize * 3)) && !this.checkRightCol()) {
            this.pos.x = (this.canvas.width - (this.blockSize * 4));
        }
    };
    Block.prototype.checkLeftCol = function (offset) {
        offset = offset === 0 ? offset : (offset * -1) / this.blockSize;
        var arr = Array.from(this.shape);
        var idxs = [
            arr[0 + offset],
            arr[4 + offset],
            arr[8 + offset],
            arr[12 + offset]
        ];
        return (idxs.every(function (i) { return (i === 0); }));
    };
    Block.prototype.checkRightCol = function () {
        var arr = Array.from(this.shape);
        var idxs = [arr[3], arr[7], arr[11], arr[15]];
        return (idxs.every(function (i) { return (i === 0); }));
    };
    Block.prototype.move = function (direction) {
        if (direction === 'left') {
            if (this.pos.x > 0 ||
                (this.pos.x <= 0 && this.checkLeftCol(this.pos.x)))
                this.pos.x -= this.blockSize;
        }
        else if (direction === 'right') {
            if (this.pos.x < (this.canvas.width - (this.blockSize * 4)) ||
                (this.pos.x < (this.canvas.width - (this.blockSize * 3)) && this.checkRightCol()))
                this.pos.x += this.blockSize;
        }
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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

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
        this.grid = new Array((this.height / this.blockSize) * (this.width / this.blockSize)).fill(0);
        this.activeBlock = null;
        this.isMoving = false;
        console.log(this.grid);
        this.setup();
    }
    Game.prototype.setup = function () {
        var _this = this;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        document.addEventListener('keypress', function (e) {
            if (!_this.activeBlock || _this.activeBlock.placed) {
                return;
            }
            _this.check();
            if (e.key === 'w')
                _this.activeBlock.rotate();
            else if (e.key === 'a')
                _this.activeBlock.move('left');
            else if (e.key === 's')
                _this.activeBlock.move('down');
            else if (e.key === 'd')
                _this.activeBlock.move('right');
            _this.draw();
            if (!_this.activeBlock.placed) {
                _this.activeBlock.draw();
            }
        });
    };
    Game.prototype.reset = function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    };
    Game.prototype.check = function () {
        if (!this.activeBlock)
            return;
        var yBreak = Math.floor((this.width / this.blockSize));
        var hitBlock = false;
        for (var _i = 0, _a = Object.entries(this.activeBlock.shape); _i < _a.length; _i++) {
            var _b = _a[_i], i = _b[0], v = _b[1];
            if (v !== 0) {
                var xToCheck = (this.activeBlock.pos.x / this.blockSize);
                var yToCheck = (this.activeBlock.pos.y / this.blockSize) + 1;
                var yOffset = (Math.floor((parseInt(i)) / 4) * yBreak);
                var startPoint = (yToCheck * yBreak) + xToCheck;
                var spaceToCheck = (startPoint + Math.floor(parseInt(i) % 4) + yOffset);
                if (this.grid[spaceToCheck] !== 0 || spaceToCheck > this.grid.length) {
                    console.log(this.grid[spaceToCheck]);
                    hitBlock = true;
                    break;
                }
            }
        }
        if (!hitBlock)
            return false;
        for (var _c = 0, _d = Object.entries(this.activeBlock.shape); _c < _d.length; _c++) {
            var _e = _d[_c], i = _e[0], v = _e[1];
            if (v !== 0) {
                var xToCheck = (this.activeBlock.pos.x / this.blockSize);
                var yToCheck = (this.activeBlock.pos.y / this.blockSize);
                var yOffset = (Math.floor((parseInt(i)) / 4) * yBreak);
                var startPoint = (yToCheck * yBreak) + xToCheck;
                this.grid[(startPoint + Math.floor(parseInt(i) % 4) + yOffset)] = v;
                var yRow = yToCheck + Math.round(yOffset / this.blockSize);
                var rowStart = (yBreak * yRow);
                var rowEnd = rowStart + yBreak;
                var rowExcerpt = this.grid.slice(rowStart, rowEnd);
                if (!rowExcerpt.includes(0)) {
                    this.grid = __spreadArray(__spreadArray(__spreadArray([], Array.apply(null, new Array(yBreak)), true), this.grid.slice(0, rowStart), true), this.grid.slice(rowEnd, this.grid.length), true);
                }
            }
        }
        this.activeBlock.placed = true;
        return true;
    };
    Game.prototype.draw = function () {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
        var colors = ['black', 'orange', 'blue', 'red', 'green', 'cyan', 'purple', 'yellow'];
        for (var _i = 0, _a = Object.entries(this.grid); _i < _a.length; _i++) {
            var _b = _a[_i], i = _b[0], v = _b[1];
            if (v === 0)
                continue;
            var xOffset = Math.floor((this.height / this.blockSize));
            var yOffset = Math.floor((this.width / this.blockSize));
            this.ctx.fillStyle = colors[v];
            this.ctx.fillRect(Math.floor(parseInt(i) % yOffset) * this.blockSize, Math.floor(parseInt(i) / yOffset) * this.blockSize, this.blockSize, this.blockSize);
        }
    };
    Game.prototype.place = function () {
        if (!this.activeBlock)
            return;
        var yOffset = 0;
        for (var _i = 0, _a = Object.entries(this.activeBlock.shape); _i < _a.length; _i++) {
            var _b = _a[_i], i = _b[0], v = _b[1];
            if (v !== 0)
                yOffset = Math.round(parseInt(i) / 4);
        }
        console.log(yOffset);
        if (this.activeBlock.pos.y + (this.blockSize * yOffset) <= (this.canvas.height - this.blockSize))
            this.activeBlock.pos.y += this.blockSize;
        else
            this.activeBlock.placed = true;
    };
    Game.prototype.main = function () {
        var _a;
        this.draw();
        if (!this.activeBlock || ((_a = this.activeBlock) === null || _a === void 0 ? void 0 : _a.placed))
            this.activeBlock = new _Block_Block__WEBPACK_IMPORTED_MODULE_0__["default"](this.canvas, this.ctx, this.blockSize);
        this.check();
        this.activeBlock.draw();
        this.place();
    };
    Game.prototype.play = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.play(); });
        var now = Date.now();
        var elapsed = now - this.then;
        if (elapsed > this.interval && !this.isMoving) {
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

module.exports = JSON.parse('{"orangeRicky":{"color":"orange","values":[[0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0],[0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0],[0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,0],[0,0,0,0,0,1,1,0,0,0,1,0,0,0,1,0]]},"blueRicky":{"color":"blue","values":[[0,0,0,0,2,0,0,0,2,2,2,0,0,0,0,0],[0,2,2,0,0,2,0,0,0,2,0,0,0,0,0,0],[0,0,0,0,0,2,2,2,0,0,0,2,0,0,0,0],[0,0,0,0,0,0,2,0,0,0,2,0,0,2,2,0]]},"clevelandZ":{"color":"red","values":[[0,0,0,0,3,3,0,0,0,3,3,0,0,0,0,0],[0,0,3,0,0,3,3,0,0,3,0,0,0,0,0,0],[0,0,0,0,0,0,3,3,0,3,3,0,0,0,0,0],[0,0,0,0,0,3,0,0,0,3,3,0,0,0,3,0]]},"rhodeIslandZ":{"color":"green","values":[[0,0,0,0,4,4,0,0,0,4,4,0,0,0,0,0],[0,0,0,0,0,4,0,0,4,4,0,0,4,0,0,0],[4,4,0,0,0,4,4,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,4,0,0,0,4,4,0,0,0,4]]},"hero":{"color":"cyan","values":[[0,0,0,0,0,0,0,0,5,5,5,5,0,0,0,0],[0,0,5,0,0,0,5,0,0,0,5,0,0,0,5,0],[0,0,0,0,5,5,5,5,0,0,0,0,0,0,0,0],[0,5,0,0,0,5,0,0,0,5,0,0,0,5,0,0]]},"teewee":{"color":"purple","values":[[0,0,0,0,0,6,0,0,6,6,6,0,0,0,0,0],[0,6,0,0,0,6,6,0,0,6,0,0,0,0,0,0],[0,0,0,0,0,6,6,6,0,0,6,0,0,0,0,0],[0,0,0,0,0,0,6,0,0,6,6,0,0,0,6,0]]},"smashboy":{"color":"yellow","values":[[0,0,0,0,0,7,7,0,0,7,7,0,0,0,0,0]]}}');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUM7QUFFckMsSUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUNsQixJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDbkIsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBRXRCLElBQU0sSUFBSSxHQUFHLElBQUksd0RBQUksQ0FDakIsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sVUFBVSxDQUNiLENBQUM7QUFFRixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90c3RyaXMvLi9zcmMvY29tcG9uZW50cy9CbG9jay9CbG9jay50cyIsIndlYnBhY2s6Ly90c3RyaXMvLi9zcmMvY29tcG9uZW50cy9HYW1lLnRzIiwid2VicGFjazovL3RzdHJpcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90c3RyaXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RzdHJpcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RzdHJpcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RzdHJpcy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmxvY2tzIGZyb20gJy4vdHlwZXMuanNvbic7XG5cbmNsYXNzIEJsb2NrIHtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBzaGFwZUluZGV4OiBudW1iZXI7XG4gICAgc2hhcGU6IG51bWJlcltdO1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgcGxhY2VkOiBib29sZWFuO1xuICAgIGJsb2NrU2l6ZTogbnVtYmVyO1xuICAgIHBvczoge1xuICAgICAgICB4OiBudW1iZXIsXG4gICAgICAgIHk6IG51bWJlcixcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgICAgICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXG4gICAgICAgIGJsb2NrU2l6ZTogbnVtYmVyLFxuICAgICkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuYmxvY2tTaXplID0gYmxvY2tTaXplO1xuICAgICAgICB0aGlzLnR5cGUgPSBPYmplY3Qua2V5cyhibG9ja3MpW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE9iamVjdC5rZXlzKGJsb2NrcykubGVuZ3RoKV07XG4gICAgICAgIC8vIHRoaXMudHlwZSA9ICdoZXJvJztcbiAgICAgICAgdGhpcy5zaGFwZUluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5zaGFwZSA9IGJsb2Nrc1t0aGlzLnR5cGUgYXMga2V5b2YgdHlwZW9mIGJsb2Nrc10udmFsdWVzW3RoaXMuc2hhcGVJbmRleF0gYXMgbnVtYmVyW107XG4gICAgICAgIHRoaXMuY29sb3IgPSBibG9ja3NbdGhpcy50eXBlIGFzIGtleW9mIHR5cGVvZiBibG9ja3NdLmNvbG9yO1xuICAgICAgICB0aGlzLnBsYWNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBvcyA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMuYmxvY2tTaXplICogNSxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc29sZS5sb2coYEluaXRpYWxpc2VkIEJsb2NrIFR5cGU6ICR7dGhpcy50eXBlfWApO1xuICAgIH1cblxuICAgIGRyYXcoKSB7XG4gICAgICAgIGZvcihjb25zdCBbaWR4LCB2YWxdIG9mIEFycmF5LmZyb20odGhpcy5zaGFwZS5lbnRyaWVzKCkpKSB7XG4gICAgICAgICAgICBpZiAoIXZhbCkgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHlPZmZzZXQgPSBNYXRoLmZsb29yKGlkeCAvIDQpO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgIHRoaXMucG9zLnggKyAodGhpcy5ibG9ja1NpemUgKiAoaWR4IC0gKDQgKiAoeU9mZnNldCA/PyAxKSkpKSxcbiAgICAgICAgICAgICAgICB0aGlzLnBvcy55ICsgKHRoaXMuYmxvY2tTaXplICogKHlPZmZzZXQgPz8gMSkpLFxuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tTaXplLCBcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrU2l6ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJvdGF0ZSgpIHtcbiAgICAgICAgaWYgKGJsb2Nrc1t0aGlzLnR5cGUgYXMga2V5b2YgdHlwZW9mIGJsb2Nrc10udmFsdWVzW3RoaXMuc2hhcGVJbmRleCArIDFdKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlSW5kZXggKz0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNoYXBlSW5kZXggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlSW5kZXggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaGFwZSA9IGJsb2Nrc1t0aGlzLnR5cGUgYXMga2V5b2YgdHlwZW9mIGJsb2Nrc10udmFsdWVzW3RoaXMuc2hhcGVJbmRleF0gYXMgbnVtYmVyW107XG5cbiAgICAgICAgaWYgKCh0aGlzLnBvcy54ID4gMCAmJiB0aGlzLnBvcy54IDw9IHRoaXMuYmxvY2tTaXplKSB8fCAodGhpcy5wb3MueCA8IDAgJiYgIXRoaXMuY2hlY2tMZWZ0Q29sKHRoaXMucG9zLngpKSkgdGhpcy5wb3MueCA9IDA7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucG9zLnggPj0gKHRoaXMuY2FudmFzLndpZHRoIC0gKHRoaXMuYmxvY2tTaXplICogMykpICYmICF0aGlzLmNoZWNrUmlnaHRDb2woKSkge1xuICAgICAgICAgICAgdGhpcy5wb3MueCA9ICh0aGlzLmNhbnZhcy53aWR0aCAtICh0aGlzLmJsb2NrU2l6ZSAqIDQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrTGVmdENvbChvZmZzZXQ6IG51bWJlcikge1xuICAgICAgICBvZmZzZXQgPSBvZmZzZXQgPT09IDAgPyBvZmZzZXQgOiAob2Zmc2V0ICogLTEpIC8gdGhpcy5ibG9ja1NpemU7XG5cbiAgICAgICAgY29uc3QgYXJyID0gQXJyYXkuZnJvbSh0aGlzLnNoYXBlKTtcbiAgICAgICAgY29uc3QgaWR4cyA9IFtcbiAgICAgICAgICAgIGFyclswICsgb2Zmc2V0XSwgXG4gICAgICAgICAgICBhcnJbNCArIG9mZnNldF0sIFxuICAgICAgICAgICAgYXJyWzggKyBvZmZzZXRdLCBcbiAgICAgICAgICAgIGFyclsxMiArIG9mZnNldF1cbiAgICAgICAgXTtcblxuICAgICAgICByZXR1cm4gKGlkeHMuZXZlcnkoKGkpID0+IChpID09PSAwKSkpO1xuICAgIH1cblxuICAgIGNoZWNrUmlnaHRDb2woKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IEFycmF5LmZyb20odGhpcy5zaGFwZSk7XG4gICAgICAgIGNvbnN0IGlkeHMgPSBbYXJyWzNdLCBhcnJbN10sIGFyclsxMV0sIGFyclsxNV1dO1xuXG4gICAgICAgIHJldHVybiAoaWR4cy5ldmVyeSgoaSkgPT4gKGkgPT09IDApKSk7XG4gICAgfVxuXG4gICAgbW92ZShkaXJlY3Rpb246IHN0cmluZykge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLnBvcy54ID4gMCB8fCBcbiAgICAgICAgICAgICAgICAodGhpcy5wb3MueCA8PSAwICYmIHRoaXMuY2hlY2tMZWZ0Q29sKHRoaXMucG9zLngpKVxuICAgICAgICAgICAgKSAgIHRoaXMucG9zLnggLT0gdGhpcy5ibG9ja1NpemU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MueCA8ICh0aGlzLmNhbnZhcy53aWR0aCAtICh0aGlzLmJsb2NrU2l6ZSAqIDQpKSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLnBvcy54IDwgKHRoaXMuY2FudmFzLndpZHRoIC0gKHRoaXMuYmxvY2tTaXplICogMykpICYmIHRoaXMuY2hlY2tSaWdodENvbCgpKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgdGhpcy5wb3MueCArPSB0aGlzLmJsb2NrU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdkb3duJyAmJiB0aGlzLnBvcy55IDwgKHRoaXMuY2FudmFzLmhlaWdodCAtICh0aGlzLmJsb2NrU2l6ZSAqIDMpKSkgdGhpcy5wb3MueSArPSB0aGlzLmJsb2NrU2l6ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJsb2NrOyIsImltcG9ydCBCbG9jayBmcm9tIFwiLi9CbG9jay9CbG9ja1wiO1xuXG5jbGFzcyBHYW1lIHtcbiAgICBibG9ja1NpemU6IG51bWJlcjtcbiAgICBmcHM6IG51bWJlcjtcbiAgICBub3c6IG51bGwgfCBudW1iZXI7XG4gICAgdGhlbjogbnVtYmVyO1xuICAgIGludGVydmFsOiBudW1iZXI7XG4gICAgZGVsdGE6IG51bGwgfCBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIGdyaWQ6IG51bWJlcltdO1xuICAgIGFjdGl2ZUJsb2NrOiBCbG9jayB8IG51bGw7XG4gICAgaXNNb3Zpbmc6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZnBzOiBudW1iZXIsXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXG4gICAgICAgIGhlaWdodDogbnVtYmVyLFxuICAgICAgICBibG9ja1NpemU6IG51bWJlcixcbiAgICApIHtcbiAgICAgICAgdGhpcy5ibG9ja1NpemUgPSBibG9ja1NpemU7XG4gICAgICAgIHRoaXMuZnBzID0gZnBzO1xuICAgICAgICB0aGlzLm5vdyA9IG51bGw7XG4gICAgICAgIHRoaXMudGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSAxMDAwIC8gZnBzO1xuICAgICAgICB0aGlzLmRlbHRhID0gbnVsbDtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NyZWVuJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgICAgIHRoaXMuZ3JpZCA9IG5ldyBBcnJheShcbiAgICAgICAgICAgICh0aGlzLmhlaWdodCAvIHRoaXMuYmxvY2tTaXplKSAqICh0aGlzLndpZHRoIC8gdGhpcy5ibG9ja1NpemUpXG4gICAgICAgICkuZmlsbCgwKTtcbiAgICAgICAgdGhpcy5hY3RpdmVCbG9jayA9IG51bGw7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgPSBmYWxzZTtcblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdyaWQpO1xuXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICB9XG5cbiAgICBzZXR1cCgpIHtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYWN0aXZlQmxvY2sgfHwgdGhpcy5hY3RpdmVCbG9jay5wbGFjZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSAndycpIHRoaXMuYWN0aXZlQmxvY2sucm90YXRlKCk7XG4gICAgICAgICAgICBlbHNlIGlmIChlLmtleSA9PT0gJ2EnKSB0aGlzLmFjdGl2ZUJsb2NrLm1vdmUoJ2xlZnQnKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5ID09PSAncycpIHRoaXMuYWN0aXZlQmxvY2subW92ZSgnZG93bicpO1xuICAgICAgICAgICAgZWxzZSBpZiAoZS5rZXkgPT09ICdkJykgdGhpcy5hY3RpdmVCbG9jay5tb3ZlKCdyaWdodCcpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZUJsb2NrLnBsYWNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlQmxvY2suZHJhdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBjaGVjaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZUJsb2NrKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHlCcmVhayA9IE1hdGguZmxvb3IoKHRoaXMud2lkdGggLyB0aGlzLmJsb2NrU2l6ZSkpO1xuICAgICAgICBsZXQgaGl0QmxvY2sgPSBmYWxzZTtcblxuICAgICAgICBmb3IoY29uc3QgW2ksIHZdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuYWN0aXZlQmxvY2suc2hhcGUpKSB7XG4gICAgICAgICAgICBpZiAodiAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHhUb0NoZWNrID0gKHRoaXMuYWN0aXZlQmxvY2sucG9zLnggLyB0aGlzLmJsb2NrU2l6ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeVRvQ2hlY2sgPSAodGhpcy5hY3RpdmVCbG9jay5wb3MueSAvIHRoaXMuYmxvY2tTaXplKSArIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgeU9mZnNldCA9IChNYXRoLmZsb29yKChwYXJzZUludChpKSkgLyA0KSAqIHlCcmVhayk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRQb2ludCA9ICh5VG9DaGVjayAqIHlCcmVhaykgKyB4VG9DaGVjaztcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYWNlVG9DaGVjayA9IChzdGFydFBvaW50ICsgTWF0aC5mbG9vcihwYXJzZUludChpKSAlIDQpICsgeU9mZnNldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ncmlkW3NwYWNlVG9DaGVja10gIT09IDAgfHwgc3BhY2VUb0NoZWNrID4gdGhpcy5ncmlkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdyaWRbc3BhY2VUb0NoZWNrXSk7XG4gICAgICAgICAgICAgICAgICAgIGhpdEJsb2NrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFoaXRCbG9jaykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGZvcihjb25zdCBbaSwgdl0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5hY3RpdmVCbG9jay5zaGFwZSkpIHtcbiAgICAgICAgICAgIGlmICh2ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeFRvQ2hlY2sgPSAodGhpcy5hY3RpdmVCbG9jay5wb3MueCAvIHRoaXMuYmxvY2tTaXplKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5VG9DaGVjayA9ICh0aGlzLmFjdGl2ZUJsb2NrLnBvcy55IC8gdGhpcy5ibG9ja1NpemUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHlPZmZzZXQgPSAoTWF0aC5mbG9vcigocGFyc2VJbnQoaSkpIC8gNCkgKiB5QnJlYWspO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0UG9pbnQgPSAoeVRvQ2hlY2sgKiB5QnJlYWspICsgeFRvQ2hlY2s7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbKHN0YXJ0UG9pbnQgKyBNYXRoLmZsb29yKHBhcnNlSW50KGkpICUgNCkgKyB5T2Zmc2V0KV0gPSB2O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgeVJvdyA9IHlUb0NoZWNrICsgTWF0aC5yb3VuZCh5T2Zmc2V0IC8gdGhpcy5ibG9ja1NpemUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvd1N0YXJ0ID0gKHlCcmVhayAqIHlSb3cpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvd0VuZCA9IHJvd1N0YXJ0ICsgeUJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgcm93RXhjZXJwdCA9IHRoaXMuZ3JpZC5zbGljZShyb3dTdGFydCwgcm93RW5kKTtcblxuICAgICAgICAgICAgICAgIGlmICghcm93RXhjZXJwdC5pbmNsdWRlcygwKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWQgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4oQXJyYXkuYXBwbHkobnVsbCwgbmV3IEFycmF5KHlCcmVhaykpIGFzIG51bWJlcltdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuZ3JpZC5zbGljZSgwLCByb3dTdGFydCksXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmdyaWQuc2xpY2Uocm93RW5kLCB0aGlzLmdyaWQubGVuZ3RoKSxcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFjdGl2ZUJsb2NrLnBsYWNlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgICBjb25zdCBjb2xvcnMgPSBbJ2JsYWNrJywgJ29yYW5nZScsICdibHVlJywgJ3JlZCcsICdncmVlbicsICdjeWFuJywgJ3B1cnBsZScsICd5ZWxsb3cnXTtcblxuICAgICAgICBmb3IoY29uc3QgW2ksIHZdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuZ3JpZCkpIHtcbiAgICAgICAgICAgIGlmICh2ID09PSAwKSBjb250aW51ZTtcblxuICAgICAgICAgICAgY29uc3QgeE9mZnNldCA9IE1hdGguZmxvb3IoKHRoaXMuaGVpZ2h0IC8gdGhpcy5ibG9ja1NpemUpKTtcbiAgICAgICAgICAgIGNvbnN0IHlPZmZzZXQgPSBNYXRoLmZsb29yKCh0aGlzLndpZHRoIC8gdGhpcy5ibG9ja1NpemUpKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yc1t2XTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IocGFyc2VJbnQoaSkgJSB5T2Zmc2V0KSAqIHRoaXMuYmxvY2tTaXplLCBcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKHBhcnNlSW50KGkpIC8geU9mZnNldCkgKiB0aGlzLmJsb2NrU2l6ZSwgXG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja1NpemUsIFxuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tTaXplXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxhY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5hY3RpdmVCbG9jaykgcmV0dXJuO1xuXG4gICAgICAgIGxldCB5T2Zmc2V0ID0gMDtcblxuICAgICAgICBmb3IgKGNvbnN0IFtpLCB2XSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmFjdGl2ZUJsb2NrLnNoYXBlKSkge1xuICAgICAgICAgICAgaWYgKHYgIT09IDApIHlPZmZzZXQgPSBNYXRoLnJvdW5kKHBhcnNlSW50KGkpIC8gNCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyh5T2Zmc2V0KTtcblxuICAgICAgICBpZiAodGhpcy5hY3RpdmVCbG9jay5wb3MueSArICh0aGlzLmJsb2NrU2l6ZSAqIHlPZmZzZXQpIDw9ICh0aGlzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLmJsb2NrU2l6ZSkpIHRoaXMuYWN0aXZlQmxvY2sucG9zLnkgKz0gdGhpcy5ibG9ja1NpemU7XG4gICAgICAgIGVsc2UgdGhpcy5hY3RpdmVCbG9jay5wbGFjZWQgPSB0cnVlO1xuICAgIH1cbiAgICBcbiAgICBtYWluKCkge1xuICAgICAgICB0aGlzLmRyYXcoKTtcblxuICAgICAgICBpZiAoIXRoaXMuYWN0aXZlQmxvY2sgfHwgdGhpcy5hY3RpdmVCbG9jaz8ucGxhY2VkKSB0aGlzLmFjdGl2ZUJsb2NrID0gbmV3IEJsb2NrKHRoaXMuY2FudmFzLCB0aGlzLmN0eCwgdGhpcy5ibG9ja1NpemUpO1xuICAgICAgICB0aGlzLmNoZWNrKCk7XG4gICAgICAgIHRoaXMuYWN0aXZlQmxvY2suZHJhdygpO1xuICAgICAgICB0aGlzLnBsYWNlKCk7XG4gICAgfVxuICAgIFxuICAgIHBsYXkoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLnBsYXkoKSk7XG5cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IG5vdyAtIHRoaXMudGhlbjtcbiAgICAgICAgXG4gICAgICAgIGlmIChlbGFwc2VkID4gdGhpcy5pbnRlcnZhbCAmJiAhdGhpcy5pc01vdmluZykge1xuICAgICAgICAgICAgdGhpcy50aGVuID0gbm93IC0gKGVsYXBzZWQgJSB0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMubWFpbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tICcuL2NvbXBvbmVudHMvR2FtZSc7XG5cbmNvbnN0IEZSQU1FX1JBVEUgPSAxO1xuY29uc3QgV0lEVEggPSAzMDA7XG5jb25zdCBIRUlHSFQgPSA1MDA7XG5jb25zdCBCTE9DS19TSVpFID0gMjA7XG5cbmNvbnN0IGdhbWUgPSBuZXcgR2FtZShcbiAgICBGUkFNRV9SQVRFLFxuICAgIFdJRFRILFxuICAgIEhFSUdIVCxcbiAgICBCTE9DS19TSVpFLFxuKTtcblxuZ2FtZS5wbGF5KCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9