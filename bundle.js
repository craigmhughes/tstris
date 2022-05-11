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
        if (this.pos.x < 0 && !this.checkLeftCol(this.pos.x))
            this.pos.x = 0;
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
    Block.prototype.move = function (direction) {
        if (direction === 'left') {
            if (this.pos.x > 0 ||
                (this.pos.x <= 0 && this.checkLeftCol(this.pos.x)))
                this.pos.x -= this.blockSize;
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05xQztBQUVyQyxJQUFNLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDckIsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLElBQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUNuQixJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFFdEIsSUFBTSxJQUFJLEdBQUcsSUFBSSx3REFBSSxDQUNqQixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLENBQ2IsQ0FBQztBQUVGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RzdHJpcy8uL3NyYy9jb21wb25lbnRzL0Jsb2NrL0Jsb2NrLnRzIiwid2VicGFjazovL3RzdHJpcy8uL3NyYy9jb21wb25lbnRzL0dhbWUudHMiLCJ3ZWJwYWNrOi8vdHN0cmlzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RzdHJpcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdHN0cmlzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdHN0cmlzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdHN0cmlzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBibG9ja3MgZnJvbSAnLi90eXBlcy5qc29uJztcblxuY2xhc3MgQmxvY2sge1xuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHNoYXBlSW5kZXg6IG51bWJlcjtcbiAgICBzaGFwZTogbnVtYmVyW107XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBwbGFjZWQ6IGJvb2xlYW47XG4gICAgYmxvY2tTaXplOiBudW1iZXI7XG4gICAgcG9zOiB7XG4gICAgICAgIHg6IG51bWJlcixcbiAgICAgICAgeTogbnVtYmVyLFxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICAgICAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgICAgICAgYmxvY2tTaXplOiBudW1iZXIsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5ibG9ja1NpemUgPSBibG9ja1NpemU7XG4gICAgICAgIHRoaXMudHlwZSA9IE9iamVjdC5rZXlzKGJsb2NrcylbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogT2JqZWN0LmtleXMoYmxvY2tzKS5sZW5ndGgpXTtcbiAgICAgICAgLy8gdGhpcy50eXBlID0gJ2hlcm8nO1xuICAgICAgICB0aGlzLnNoYXBlSW5kZXggPSAwO1xuICAgICAgICB0aGlzLnNoYXBlID0gYmxvY2tzW3RoaXMudHlwZSBhcyBrZXlvZiB0eXBlb2YgYmxvY2tzXS52YWx1ZXNbdGhpcy5zaGFwZUluZGV4XSBhcyBudW1iZXJbXTtcbiAgICAgICAgdGhpcy5jb2xvciA9IGJsb2Nrc1t0aGlzLnR5cGUgYXMga2V5b2YgdHlwZW9mIGJsb2Nrc10uY29sb3I7XG4gICAgICAgIHRoaXMucGxhY2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucG9zID0ge1xuICAgICAgICAgICAgeDogdGhpcy5ibG9ja1NpemUgKiA1LFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zb2xlLmxvZyhgSW5pdGlhbGlzZWQgQmxvY2sgVHlwZTogJHt0aGlzLnR5cGV9YCk7XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgZm9yKGNvbnN0IFtpZHgsIHZhbF0gb2YgQXJyYXkuZnJvbSh0aGlzLnNoYXBlLmVudHJpZXMoKSkpIHtcbiAgICAgICAgICAgIGlmICghdmFsKSBjb250aW51ZTtcblxuICAgICAgICAgICAgY29uc3QgeU9mZnNldCA9IE1hdGguZmxvb3IoaWR4IC8gNCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MueCArICh0aGlzLmJsb2NrU2l6ZSAqIChpZHggLSAoNCAqICh5T2Zmc2V0ID8/IDEpKSkpLFxuICAgICAgICAgICAgICAgIHRoaXMucG9zLnkgKyAodGhpcy5ibG9ja1NpemUgKiAoeU9mZnNldCA/PyAxKSksXG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja1NpemUsIFxuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tTaXplXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcm90YXRlKCkge1xuICAgICAgICBpZiAoYmxvY2tzW3RoaXMudHlwZSBhcyBrZXlvZiB0eXBlb2YgYmxvY2tzXS52YWx1ZXNbdGhpcy5zaGFwZUluZGV4ICsgMV0pIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGVJbmRleCArPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hhcGVJbmRleCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGVJbmRleCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNoYXBlID0gYmxvY2tzW3RoaXMudHlwZSBhcyBrZXlvZiB0eXBlb2YgYmxvY2tzXS52YWx1ZXNbdGhpcy5zaGFwZUluZGV4XSBhcyBudW1iZXJbXTtcblxuICAgICAgICBpZiAodGhpcy5wb3MueCA8IDAgJiYgIXRoaXMuY2hlY2tMZWZ0Q29sKHRoaXMucG9zLngpKSB0aGlzLnBvcy54ID0gMDtcbiAgICB9XG5cbiAgICBjaGVja0xlZnRDb2wob2Zmc2V0OiBudW1iZXIpIHtcbiAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0ID09PSAwID8gb2Zmc2V0IDogKG9mZnNldCAqIC0xKSAvIHRoaXMuYmxvY2tTaXplO1xuXG4gICAgICAgIGNvbnN0IGFyciA9IEFycmF5LmZyb20odGhpcy5zaGFwZSk7XG4gICAgICAgIGNvbnN0IGlkeHMgPSBbXG4gICAgICAgICAgICBhcnJbMCArIG9mZnNldF0sIFxuICAgICAgICAgICAgYXJyWzQgKyBvZmZzZXRdLCBcbiAgICAgICAgICAgIGFycls4ICsgb2Zmc2V0XSwgXG4gICAgICAgICAgICBhcnJbMTIgKyBvZmZzZXRdXG4gICAgICAgIF07XG5cbiAgICAgICAgcmV0dXJuIChpZHhzLmV2ZXJ5KChpKSA9PiAoaSA9PT0gMCkpKTtcbiAgICB9XG5cbiAgICBtb3ZlKGRpcmVjdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMucG9zLnggPiAwIHx8IFxuICAgICAgICAgICAgICAgICh0aGlzLnBvcy54IDw9IDAgJiYgdGhpcy5jaGVja0xlZnRDb2wodGhpcy5wb3MueCkpXG4gICAgICAgICAgICApICAgdGhpcy5wb3MueCAtPSB0aGlzLmJsb2NrU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcgJiYgdGhpcy5wb3MueCA8ICh0aGlzLmNhbnZhcy53aWR0aCAtICh0aGlzLmJsb2NrU2l6ZSAqIDMpKSkgdGhpcy5wb3MueCArPSB0aGlzLmJsb2NrU2l6ZTtcbiAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZG93bicgJiYgdGhpcy5wb3MueSA8ICh0aGlzLmNhbnZhcy5oZWlnaHQgLSAodGhpcy5ibG9ja1NpemUgKiAzKSkpIHRoaXMucG9zLnkgKz0gdGhpcy5ibG9ja1NpemU7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9jazsiLCJpbXBvcnQgQmxvY2sgZnJvbSBcIi4vQmxvY2svQmxvY2tcIjtcblxuY2xhc3MgR2FtZSB7XG4gICAgYmxvY2tTaXplOiBudW1iZXI7XG4gICAgZnBzOiBudW1iZXI7XG4gICAgbm93OiBudWxsIHwgbnVtYmVyO1xuICAgIHRoZW46IG51bWJlcjtcbiAgICBpbnRlcnZhbDogbnVtYmVyO1xuICAgIGRlbHRhOiBudWxsIHwgbnVtYmVyO1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBncmlkOiBudW1iZXJbXTtcbiAgICBhY3RpdmVCbG9jazogQmxvY2sgfCBudWxsO1xuICAgIGlzTW92aW5nOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGZwczogbnVtYmVyLFxuICAgICAgICB3aWR0aDogbnVtYmVyLFxuICAgICAgICBoZWlnaHQ6IG51bWJlcixcbiAgICAgICAgYmxvY2tTaXplOiBudW1iZXIsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuYmxvY2tTaXplID0gYmxvY2tTaXplO1xuICAgICAgICB0aGlzLmZwcyA9IGZwcztcbiAgICAgICAgdGhpcy5ub3cgPSBudWxsO1xuICAgICAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmludGVydmFsID0gMTAwMCAvIGZwcztcbiAgICAgICAgdGhpcy5kZWx0YSA9IG51bGw7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjcmVlbicpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgICAgICB0aGlzLmdyaWQgPSBuZXcgQXJyYXkoXG4gICAgICAgICAgICAodGhpcy5oZWlnaHQgLyB0aGlzLmJsb2NrU2l6ZSkgKiAodGhpcy53aWR0aCAvIHRoaXMuYmxvY2tTaXplKVxuICAgICAgICApLmZpbGwoMCk7XG4gICAgICAgIHRoaXMuYWN0aXZlQmxvY2sgPSBudWxsO1xuICAgICAgICB0aGlzLmlzTW92aW5nID0gZmFsc2U7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ncmlkKTtcblxuICAgICAgICB0aGlzLnNldHVwKCk7XG4gICAgfVxuXG4gICAgc2V0dXAoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZUJsb2NrIHx8IHRoaXMuYWN0aXZlQmxvY2sucGxhY2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNoZWNrKCk7XG5cbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ3cnKSB0aGlzLmFjdGl2ZUJsb2NrLnJvdGF0ZSgpO1xuICAgICAgICAgICAgZWxzZSBpZiAoZS5rZXkgPT09ICdhJykgdGhpcy5hY3RpdmVCbG9jay5tb3ZlKCdsZWZ0Jyk7XG4gICAgICAgICAgICBlbHNlIGlmIChlLmtleSA9PT0gJ3MnKSB0aGlzLmFjdGl2ZUJsb2NrLm1vdmUoJ2Rvd24nKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5ID09PSAnZCcpIHRoaXMuYWN0aXZlQmxvY2subW92ZSgncmlnaHQnKTtcblxuICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5hY3RpdmVCbG9jay5wbGFjZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUJsb2NrLmRyYXcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgY2hlY2soKSB7XG4gICAgICAgIGlmICghdGhpcy5hY3RpdmVCbG9jaykgcmV0dXJuO1xuICAgICAgICBjb25zdCB5QnJlYWsgPSBNYXRoLmZsb29yKCh0aGlzLndpZHRoIC8gdGhpcy5ibG9ja1NpemUpKTtcbiAgICAgICAgbGV0IGhpdEJsb2NrID0gZmFsc2U7XG5cbiAgICAgICAgZm9yKGNvbnN0IFtpLCB2XSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmFjdGl2ZUJsb2NrLnNoYXBlKSkge1xuICAgICAgICAgICAgaWYgKHYgIT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB4VG9DaGVjayA9ICh0aGlzLmFjdGl2ZUJsb2NrLnBvcy54IC8gdGhpcy5ibG9ja1NpemUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHlUb0NoZWNrID0gKHRoaXMuYWN0aXZlQmxvY2sucG9zLnkgLyB0aGlzLmJsb2NrU2l6ZSkgKyAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHlPZmZzZXQgPSAoTWF0aC5mbG9vcigocGFyc2VJbnQoaSkpIC8gNCkgKiB5QnJlYWspO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0UG9pbnQgPSAoeVRvQ2hlY2sgKiB5QnJlYWspICsgeFRvQ2hlY2s7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzcGFjZVRvQ2hlY2sgPSAoc3RhcnRQb2ludCArIE1hdGguZmxvb3IocGFyc2VJbnQoaSkgJSA0KSArIHlPZmZzZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JpZFtzcGFjZVRvQ2hlY2tdICE9PSAwIHx8IHNwYWNlVG9DaGVjayA+IHRoaXMuZ3JpZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5ncmlkW3NwYWNlVG9DaGVja10pO1xuICAgICAgICAgICAgICAgICAgICBoaXRCbG9jayA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaGl0QmxvY2spIHJldHVybiBmYWxzZTtcblxuICAgICAgICBmb3IoY29uc3QgW2ksIHZdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuYWN0aXZlQmxvY2suc2hhcGUpKSB7XG4gICAgICAgICAgICBpZiAodiAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHhUb0NoZWNrID0gKHRoaXMuYWN0aXZlQmxvY2sucG9zLnggLyB0aGlzLmJsb2NrU2l6ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeVRvQ2hlY2sgPSAodGhpcy5hY3RpdmVCbG9jay5wb3MueSAvIHRoaXMuYmxvY2tTaXplKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5T2Zmc2V0ID0gKE1hdGguZmxvb3IoKHBhcnNlSW50KGkpKSAvIDQpICogeUJyZWFrKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydFBvaW50ID0gKHlUb0NoZWNrICogeUJyZWFrKSArIHhUb0NoZWNrO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkWyhzdGFydFBvaW50ICsgTWF0aC5mbG9vcihwYXJzZUludChpKSAlIDQpICsgeU9mZnNldCldID0gdjtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHlSb3cgPSB5VG9DaGVjayArIE1hdGgucm91bmQoeU9mZnNldCAvIHRoaXMuYmxvY2tTaXplKTtcbiAgICAgICAgICAgICAgICBjb25zdCByb3dTdGFydCA9ICh5QnJlYWsgKiB5Um93KTtcbiAgICAgICAgICAgICAgICBjb25zdCByb3dFbmQgPSByb3dTdGFydCArIHlCcmVhaztcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJvd0V4Y2VycHQgPSB0aGlzLmdyaWQuc2xpY2Uocm93U3RhcnQsIHJvd0VuZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXJvd0V4Y2VycHQuaW5jbHVkZXMoMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKEFycmF5LmFwcGx5KG51bGwsIG5ldyBBcnJheSh5QnJlYWspKSBhcyBudW1iZXJbXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmdyaWQuc2xpY2UoMCwgcm93U3RhcnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5ncmlkLnNsaWNlKHJvd0VuZCwgdGhpcy5ncmlkLmxlbmd0aCksXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hY3RpdmVCbG9jay5wbGFjZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgY29uc3QgY29sb3JzID0gWydibGFjaycsICdvcmFuZ2UnLCAnYmx1ZScsICdyZWQnLCAnZ3JlZW4nLCAnY3lhbicsICdwdXJwbGUnLCAneWVsbG93J107XG5cbiAgICAgICAgZm9yKGNvbnN0IFtpLCB2XSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmdyaWQpKSB7XG4gICAgICAgICAgICBpZiAodiA9PT0gMCkgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHhPZmZzZXQgPSBNYXRoLmZsb29yKCh0aGlzLmhlaWdodCAvIHRoaXMuYmxvY2tTaXplKSk7XG4gICAgICAgICAgICBjb25zdCB5T2Zmc2V0ID0gTWF0aC5mbG9vcigodGhpcy53aWR0aCAvIHRoaXMuYmxvY2tTaXplKSk7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvcnNbdl07XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKHBhcnNlSW50KGkpICUgeU9mZnNldCkgKiB0aGlzLmJsb2NrU2l6ZSwgXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihwYXJzZUludChpKSAvIHlPZmZzZXQpICogdGhpcy5ibG9ja1NpemUsIFxuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tTaXplLCBcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrU2l6ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBsYWNlKCkge1xuICAgICAgICBpZiAoIXRoaXMuYWN0aXZlQmxvY2spIHJldHVybjtcblxuICAgICAgICBsZXQgeU9mZnNldCA9IDA7XG5cbiAgICAgICAgZm9yIChjb25zdCBbaSwgdl0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5hY3RpdmVCbG9jay5zaGFwZSkpIHtcbiAgICAgICAgICAgIGlmICh2ICE9PSAwKSB5T2Zmc2V0ID0gTWF0aC5yb3VuZChwYXJzZUludChpKSAvIDQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coeU9mZnNldCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlQmxvY2sucG9zLnkgKyAodGhpcy5ibG9ja1NpemUgKiB5T2Zmc2V0KSA8PSAodGhpcy5jYW52YXMuaGVpZ2h0IC0gdGhpcy5ibG9ja1NpemUpKSB0aGlzLmFjdGl2ZUJsb2NrLnBvcy55ICs9IHRoaXMuYmxvY2tTaXplO1xuICAgICAgICBlbHNlIHRoaXMuYWN0aXZlQmxvY2sucGxhY2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgbWFpbigpIHtcbiAgICAgICAgdGhpcy5kcmF3KCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZUJsb2NrIHx8IHRoaXMuYWN0aXZlQmxvY2s/LnBsYWNlZCkgdGhpcy5hY3RpdmVCbG9jayA9IG5ldyBCbG9jayh0aGlzLmNhbnZhcywgdGhpcy5jdHgsIHRoaXMuYmxvY2tTaXplKTtcbiAgICAgICAgdGhpcy5jaGVjaygpO1xuICAgICAgICB0aGlzLmFjdGl2ZUJsb2NrLmRyYXcoKTtcbiAgICAgICAgdGhpcy5wbGFjZSgpO1xuICAgIH1cbiAgICBcbiAgICBwbGF5KCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5wbGF5KCkpO1xuXG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGVsYXBzZWQgPSBub3cgLSB0aGlzLnRoZW47XG4gICAgICAgIFxuICAgICAgICBpZiAoZWxhcHNlZCA+IHRoaXMuaW50ZXJ2YWwgJiYgIXRoaXMuaXNNb3ZpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudGhlbiA9IG5vdyAtIChlbGFwc2VkICUgdGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLm1haW4oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9jb21wb25lbnRzL0dhbWUnO1xuXG5jb25zdCBGUkFNRV9SQVRFID0gMTtcbmNvbnN0IFdJRFRIID0gMzAwO1xuY29uc3QgSEVJR0hUID0gNTAwO1xuY29uc3QgQkxPQ0tfU0laRSA9IDIwO1xuXG5jb25zdCBnYW1lID0gbmV3IEdhbWUoXG4gICAgRlJBTUVfUkFURSxcbiAgICBXSURUSCxcbiAgICBIRUlHSFQsXG4gICAgQkxPQ0tfU0laRSxcbik7XG5cbmdhbWUucGxheSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==