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
                var xToCheck_1 = (this.activeBlock.pos.x / this.blockSize);
                var yToCheck_1 = (this.activeBlock.pos.y / this.blockSize) + 1;
                var yOffset = (Math.floor((parseInt(i)) / 4) * yBreak);
                var startPoint_1 = (yToCheck_1 * yBreak) + xToCheck_1;
                var spaceToCheck = (startPoint_1 + Math.floor(parseInt(i) % 4) + yOffset);
                if (this.grid[spaceToCheck] !== 0 || spaceToCheck > this.grid.length) {
                    console.log(this.grid[spaceToCheck]);
                    hitBlock = true;
                    break;
                }
            }
        }
        // TODO: Remove test grid on completion!
        // for(const [i, v] of Object.entries(this.grid)) {
        //     const xOffset = Math.floor((this.height / this.blockSize));
        //     const yOffset = Math.floor((this.width / this.blockSize));
        //     this.ctx.fillStyle = 'red';
        //     this.ctx.fillRect(
        //         Math.floor(parseInt(i) % yOffset) * this.blockSize, 
        //         Math.floor(parseInt(i) / yOffset) * this.blockSize, 
        //         this.blockSize, 
        //         this.blockSize
        //     );
        //     this.ctx.fillStyle = 'white';
        //     this.ctx.fillText(
        //         i,
        //         Math.floor(parseInt(i) % yOffset) * this.blockSize, 
        //         Math.floor(parseInt(i) / yOffset) * this.blockSize + 10,
        //     )
        // }
        if (!hitBlock)
            return false;
        var xToCheck = (this.activeBlock.pos.x / this.blockSize);
        var yToCheck = (this.activeBlock.pos.y / this.blockSize);
        var startPoint = (yToCheck * yBreak) + xToCheck;
        for (var _c = 0, _d = Object.entries(this.activeBlock.shape); _c < _d.length; _c++) {
            var _e = _d[_c], i = _e[0], v = _e[1];
            if (v !== 0) {
                var yOffset = (Math.floor((parseInt(i)) / 4) * yBreak);
                this.grid[(startPoint + Math.floor(parseInt(i) % 4) + yOffset)] = v;
            }
        }
        for (var i = 0; i < (this.grid.length / yBreak); i++) {
            var rowStart = (yBreak * i);
            var rowEnd = (yBreak * i) + yBreak;
            var excerpt = __spreadArray([], this.grid.slice(rowStart, rowEnd), true);
            if (!excerpt.includes(0)) {
                this.grid = __spreadArray(__spreadArray(__spreadArray([], new Array(yBreak).fill(0), true), this.grid.slice(0, rowStart), true), this.grid.slice(rowEnd, this.grid.length), true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05xQztBQUVyQyxJQUFNLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDckIsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLElBQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUNuQixJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFFdEIsSUFBTSxJQUFJLEdBQUcsSUFBSSx3REFBSSxDQUNqQixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLENBQ2IsQ0FBQztBQUVGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RzdHJpcy8uL3NyYy9jb21wb25lbnRzL0Jsb2NrL0Jsb2NrLnRzIiwid2VicGFjazovL3RzdHJpcy8uL3NyYy9jb21wb25lbnRzL0dhbWUudHMiLCJ3ZWJwYWNrOi8vdHN0cmlzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RzdHJpcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdHN0cmlzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdHN0cmlzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdHN0cmlzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBibG9ja3MgZnJvbSAnLi90eXBlcy5qc29uJztcblxuY2xhc3MgQmxvY2sge1xuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHNoYXBlSW5kZXg6IG51bWJlcjtcbiAgICBzaGFwZTogbnVtYmVyW107XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBwbGFjZWQ6IGJvb2xlYW47XG4gICAgYmxvY2tTaXplOiBudW1iZXI7XG4gICAgcG9zOiB7XG4gICAgICAgIHg6IG51bWJlcixcbiAgICAgICAgeTogbnVtYmVyLFxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICAgICAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgICAgICAgYmxvY2tTaXplOiBudW1iZXIsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5ibG9ja1NpemUgPSBibG9ja1NpemU7XG4gICAgICAgIHRoaXMudHlwZSA9IE9iamVjdC5rZXlzKGJsb2NrcylbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogT2JqZWN0LmtleXMoYmxvY2tzKS5sZW5ndGgpXTtcbiAgICAgICAgLy8gdGhpcy50eXBlID0gJ2hlcm8nO1xuICAgICAgICB0aGlzLnNoYXBlSW5kZXggPSAwO1xuICAgICAgICB0aGlzLnNoYXBlID0gYmxvY2tzW3RoaXMudHlwZSBhcyBrZXlvZiB0eXBlb2YgYmxvY2tzXS52YWx1ZXNbdGhpcy5zaGFwZUluZGV4XSBhcyBudW1iZXJbXTtcbiAgICAgICAgdGhpcy5jb2xvciA9IGJsb2Nrc1t0aGlzLnR5cGUgYXMga2V5b2YgdHlwZW9mIGJsb2Nrc10uY29sb3I7XG4gICAgICAgIHRoaXMucGxhY2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucG9zID0ge1xuICAgICAgICAgICAgeDogdGhpcy5ibG9ja1NpemUgKiA1LFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zb2xlLmxvZyhgSW5pdGlhbGlzZWQgQmxvY2sgVHlwZTogJHt0aGlzLnR5cGV9YCk7XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgZm9yKGNvbnN0IFtpZHgsIHZhbF0gb2YgQXJyYXkuZnJvbSh0aGlzLnNoYXBlLmVudHJpZXMoKSkpIHtcbiAgICAgICAgICAgIGlmICghdmFsKSBjb250aW51ZTtcblxuICAgICAgICAgICAgY29uc3QgeU9mZnNldCA9IE1hdGguZmxvb3IoaWR4IC8gNCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MueCArICh0aGlzLmJsb2NrU2l6ZSAqIChpZHggLSAoNCAqICh5T2Zmc2V0ID8/IDEpKSkpLFxuICAgICAgICAgICAgICAgIHRoaXMucG9zLnkgKyAodGhpcy5ibG9ja1NpemUgKiAoeU9mZnNldCA/PyAxKSksXG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja1NpemUsIFxuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tTaXplXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcm90YXRlKCkge1xuICAgICAgICBpZiAoYmxvY2tzW3RoaXMudHlwZSBhcyBrZXlvZiB0eXBlb2YgYmxvY2tzXS52YWx1ZXNbdGhpcy5zaGFwZUluZGV4ICsgMV0pIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGVJbmRleCArPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hhcGVJbmRleCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGVJbmRleCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNoYXBlID0gYmxvY2tzW3RoaXMudHlwZSBhcyBrZXlvZiB0eXBlb2YgYmxvY2tzXS52YWx1ZXNbdGhpcy5zaGFwZUluZGV4XSBhcyBudW1iZXJbXTtcblxuICAgICAgICBpZiAoKHRoaXMucG9zLnggPiAwICYmIHRoaXMucG9zLnggPD0gdGhpcy5ibG9ja1NpemUpIHx8ICh0aGlzLnBvcy54IDwgMCAmJiAhdGhpcy5jaGVja0xlZnRDb2wodGhpcy5wb3MueCkpKSB0aGlzLnBvcy54ID0gMDtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wb3MueCA+PSAodGhpcy5jYW52YXMud2lkdGggLSAodGhpcy5ibG9ja1NpemUgKiAzKSkgJiYgIXRoaXMuY2hlY2tSaWdodENvbCgpKSB7XG4gICAgICAgICAgICB0aGlzLnBvcy54ID0gKHRoaXMuY2FudmFzLndpZHRoIC0gKHRoaXMuYmxvY2tTaXplICogNCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tMZWZ0Q29sKG9mZnNldDogbnVtYmVyKSB7XG4gICAgICAgIG9mZnNldCA9IG9mZnNldCA9PT0gMCA/IG9mZnNldCA6IChvZmZzZXQgKiAtMSkgLyB0aGlzLmJsb2NrU2l6ZTtcblxuICAgICAgICBjb25zdCBhcnIgPSBBcnJheS5mcm9tKHRoaXMuc2hhcGUpO1xuICAgICAgICBjb25zdCBpZHhzID0gW1xuICAgICAgICAgICAgYXJyWzAgKyBvZmZzZXRdLCBcbiAgICAgICAgICAgIGFycls0ICsgb2Zmc2V0XSwgXG4gICAgICAgICAgICBhcnJbOCArIG9mZnNldF0sIFxuICAgICAgICAgICAgYXJyWzEyICsgb2Zmc2V0XVxuICAgICAgICBdO1xuXG4gICAgICAgIHJldHVybiAoaWR4cy5ldmVyeSgoaSkgPT4gKGkgPT09IDApKSk7XG4gICAgfVxuXG4gICAgY2hlY2tSaWdodENvbCgpIHtcbiAgICAgICAgY29uc3QgYXJyID0gQXJyYXkuZnJvbSh0aGlzLnNoYXBlKTtcbiAgICAgICAgY29uc3QgaWR4cyA9IFthcnJbM10sIGFycls3XSwgYXJyWzExXSwgYXJyWzE1XV07XG5cbiAgICAgICAgcmV0dXJuIChpZHhzLmV2ZXJ5KChpKSA9PiAoaSA9PT0gMCkpKTtcbiAgICB9XG5cbiAgICBtb3ZlKGRpcmVjdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMucG9zLnggPiAwIHx8IFxuICAgICAgICAgICAgICAgICh0aGlzLnBvcy54IDw9IDAgJiYgdGhpcy5jaGVja0xlZnRDb2wodGhpcy5wb3MueCkpXG4gICAgICAgICAgICApICAgdGhpcy5wb3MueCAtPSB0aGlzLmJsb2NrU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLnBvcy54IDwgKHRoaXMuY2FudmFzLndpZHRoIC0gKHRoaXMuYmxvY2tTaXplICogNCkpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMucG9zLnggPCAodGhpcy5jYW52YXMud2lkdGggLSAodGhpcy5ibG9ja1NpemUgKiAzKSkgJiYgdGhpcy5jaGVja1JpZ2h0Q29sKCkpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB0aGlzLnBvcy54ICs9IHRoaXMuYmxvY2tTaXplO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rvd24nICYmIHRoaXMucG9zLnkgPCAodGhpcy5jYW52YXMuaGVpZ2h0IC0gKHRoaXMuYmxvY2tTaXplICogMykpKSB0aGlzLnBvcy55ICs9IHRoaXMuYmxvY2tTaXplO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmxvY2s7IiwiaW1wb3J0IEJsb2NrIGZyb20gXCIuL0Jsb2NrL0Jsb2NrXCI7XG5cbmNsYXNzIEdhbWUge1xuICAgIGJsb2NrU2l6ZTogbnVtYmVyO1xuICAgIGZwczogbnVtYmVyO1xuICAgIG5vdzogbnVsbCB8IG51bWJlcjtcbiAgICB0aGVuOiBudW1iZXI7XG4gICAgaW50ZXJ2YWw6IG51bWJlcjtcbiAgICBkZWx0YTogbnVsbCB8IG51bWJlcjtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgZ3JpZDogbnVtYmVyW107XG4gICAgYWN0aXZlQmxvY2s6IEJsb2NrIHwgbnVsbDtcbiAgICBpc01vdmluZzogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBmcHM6IG51bWJlcixcbiAgICAgICAgd2lkdGg6IG51bWJlcixcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgICAgIGJsb2NrU2l6ZTogbnVtYmVyLFxuICAgICkge1xuICAgICAgICB0aGlzLmJsb2NrU2l6ZSA9IGJsb2NrU2l6ZTtcbiAgICAgICAgdGhpcy5mcHMgPSBmcHM7XG4gICAgICAgIHRoaXMubm93ID0gbnVsbDtcbiAgICAgICAgdGhpcy50aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IDEwMDAgLyBmcHM7XG4gICAgICAgIHRoaXMuZGVsdGEgPSBudWxsO1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY3JlZW4nKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICAgICAgdGhpcy5ncmlkID0gbmV3IEFycmF5KFxuICAgICAgICAgICAgKHRoaXMuaGVpZ2h0IC8gdGhpcy5ibG9ja1NpemUpICogKHRoaXMud2lkdGggLyB0aGlzLmJsb2NrU2l6ZSlcbiAgICAgICAgKS5maWxsKDApO1xuICAgICAgICB0aGlzLmFjdGl2ZUJsb2NrID0gbnVsbDtcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JpZCk7XG5cbiAgICAgICAgdGhpcy5zZXR1cCgpO1xuICAgIH1cblxuICAgIHNldHVwKCkge1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5hY3RpdmVCbG9jayB8fCB0aGlzLmFjdGl2ZUJsb2NrLnBsYWNlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jaGVjaygpO1xuXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICd3JykgdGhpcy5hY3RpdmVCbG9jay5yb3RhdGUoKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5ID09PSAnYScpIHRoaXMuYWN0aXZlQmxvY2subW92ZSgnbGVmdCcpO1xuICAgICAgICAgICAgZWxzZSBpZiAoZS5rZXkgPT09ICdzJykgdGhpcy5hY3RpdmVCbG9jay5tb3ZlKCdkb3duJyk7XG4gICAgICAgICAgICBlbHNlIGlmIChlLmtleSA9PT0gJ2QnKSB0aGlzLmFjdGl2ZUJsb2NrLm1vdmUoJ3JpZ2h0Jyk7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuYWN0aXZlQmxvY2sucGxhY2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVCbG9jay5kcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIGNoZWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMuYWN0aXZlQmxvY2spIHJldHVybjtcbiAgICAgICAgY29uc3QgeUJyZWFrID0gTWF0aC5mbG9vcigodGhpcy53aWR0aCAvIHRoaXMuYmxvY2tTaXplKSk7XG4gICAgICAgIGxldCBoaXRCbG9jayA9IGZhbHNlO1xuXG4gICAgICAgIGZvcihjb25zdCBbaSwgdl0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5hY3RpdmVCbG9jay5zaGFwZSkpIHtcbiAgICAgICAgICAgIGlmICh2ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeFRvQ2hlY2sgPSAodGhpcy5hY3RpdmVCbG9jay5wb3MueCAvIHRoaXMuYmxvY2tTaXplKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5VG9DaGVjayA9ICh0aGlzLmFjdGl2ZUJsb2NrLnBvcy55IC8gdGhpcy5ibG9ja1NpemUpICsgMTtcbiAgICAgICAgICAgICAgICBjb25zdCB5T2Zmc2V0ID0gKE1hdGguZmxvb3IoKHBhcnNlSW50KGkpKSAvIDQpICogeUJyZWFrKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydFBvaW50ID0gKHlUb0NoZWNrICogeUJyZWFrKSArIHhUb0NoZWNrO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhY2VUb0NoZWNrID0gKHN0YXJ0UG9pbnQgKyBNYXRoLmZsb29yKHBhcnNlSW50KGkpICUgNCkgKyB5T2Zmc2V0KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyaWRbc3BhY2VUb0NoZWNrXSAhPT0gMCB8fCBzcGFjZVRvQ2hlY2sgPiB0aGlzLmdyaWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JpZFtzcGFjZVRvQ2hlY2tdKTtcbiAgICAgICAgICAgICAgICAgICAgaGl0QmxvY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiBSZW1vdmUgdGVzdCBncmlkIG9uIGNvbXBsZXRpb24hXG4gICAgICAgIC8vIGZvcihjb25zdCBbaSwgdl0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5ncmlkKSkge1xuICAgICAgICAvLyAgICAgY29uc3QgeE9mZnNldCA9IE1hdGguZmxvb3IoKHRoaXMuaGVpZ2h0IC8gdGhpcy5ibG9ja1NpemUpKTtcbiAgICAgICAgLy8gICAgIGNvbnN0IHlPZmZzZXQgPSBNYXRoLmZsb29yKCh0aGlzLndpZHRoIC8gdGhpcy5ibG9ja1NpemUpKTtcbiAgICAgICAgLy8gICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgICAgICAvLyAgICAgdGhpcy5jdHguZmlsbFJlY3QoXG4gICAgICAgIC8vICAgICAgICAgTWF0aC5mbG9vcihwYXJzZUludChpKSAlIHlPZmZzZXQpICogdGhpcy5ibG9ja1NpemUsIFxuICAgICAgICAvLyAgICAgICAgIE1hdGguZmxvb3IocGFyc2VJbnQoaSkgLyB5T2Zmc2V0KSAqIHRoaXMuYmxvY2tTaXplLCBcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmJsb2NrU2l6ZSwgXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5ibG9ja1NpemVcbiAgICAgICAgLy8gICAgICk7XG4gICAgICAgIC8vICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICAvLyAgICAgdGhpcy5jdHguZmlsbFRleHQoXG4gICAgICAgIC8vICAgICAgICAgaSxcbiAgICAgICAgLy8gICAgICAgICBNYXRoLmZsb29yKHBhcnNlSW50KGkpICUgeU9mZnNldCkgKiB0aGlzLmJsb2NrU2l6ZSwgXG4gICAgICAgIC8vICAgICAgICAgTWF0aC5mbG9vcihwYXJzZUludChpKSAvIHlPZmZzZXQpICogdGhpcy5ibG9ja1NpemUgKyAxMCxcbiAgICAgICAgLy8gICAgIClcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlmICghaGl0QmxvY2spIHJldHVybiBmYWxzZTtcblxuICAgICAgICBjb25zdCB4VG9DaGVjayA9ICh0aGlzLmFjdGl2ZUJsb2NrLnBvcy54IC8gdGhpcy5ibG9ja1NpemUpO1xuICAgICAgICBjb25zdCB5VG9DaGVjayA9ICh0aGlzLmFjdGl2ZUJsb2NrLnBvcy55IC8gdGhpcy5ibG9ja1NpemUpO1xuICAgICAgICBjb25zdCBzdGFydFBvaW50ID0gKHlUb0NoZWNrICogeUJyZWFrKSArIHhUb0NoZWNrO1xuXG4gICAgICAgIGZvcihjb25zdCBbaSwgdl0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5hY3RpdmVCbG9jay5zaGFwZSkpIHtcbiAgICAgICAgICAgIGlmICh2ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeU9mZnNldCA9IChNYXRoLmZsb29yKChwYXJzZUludChpKSkgLyA0KSAqIHlCcmVhayk7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkWyhzdGFydFBvaW50ICsgTWF0aC5mbG9vcihwYXJzZUludChpKSAlIDQpICsgeU9mZnNldCldID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAodGhpcy5ncmlkLmxlbmd0aCAvIHlCcmVhayk7IGkrKyl7XG4gICAgICAgICAgICBjb25zdCByb3dTdGFydCA9ICh5QnJlYWsgKiBpKTtcbiAgICAgICAgICAgIGNvbnN0IHJvd0VuZCA9ICh5QnJlYWsgKiBpKSArIHlCcmVhaztcbiAgICAgICAgICAgIGNvbnN0IGV4Y2VycHQgPSBbLi4udGhpcy5ncmlkLnNsaWNlKHJvd1N0YXJ0LCByb3dFbmQpXTtcblxuICAgICAgICAgICAgaWYgKCFleGNlcnB0LmluY2x1ZGVzKDApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi4obmV3IEFycmF5KHlCcmVhaykgYXMgbnVtYmVyW10pLmZpbGwoMCksXG4gICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuZ3JpZC5zbGljZSgwLCByb3dTdGFydCksXG4gICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuZ3JpZC5zbGljZShyb3dFbmQsIHRoaXMuZ3JpZC5sZW5ndGgpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hY3RpdmVCbG9jay5wbGFjZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgY29uc3QgY29sb3JzID0gWydibGFjaycsICdvcmFuZ2UnLCAnYmx1ZScsICdyZWQnLCAnZ3JlZW4nLCAnY3lhbicsICdwdXJwbGUnLCAneWVsbG93J107XG5cbiAgICAgICAgZm9yKGNvbnN0IFtpLCB2XSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmdyaWQpKSB7XG4gICAgICAgICAgICBpZiAodiA9PT0gMCkgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHlPZmZzZXQgPSBNYXRoLmZsb29yKCh0aGlzLndpZHRoIC8gdGhpcy5ibG9ja1NpemUpKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yc1t2XTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IocGFyc2VJbnQoaSkgJSB5T2Zmc2V0KSAqIHRoaXMuYmxvY2tTaXplLCBcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKHBhcnNlSW50KGkpIC8geU9mZnNldCkgKiB0aGlzLmJsb2NrU2l6ZSwgXG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja1NpemUsIFxuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tTaXplXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxhY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5hY3RpdmVCbG9jaykgcmV0dXJuO1xuXG4gICAgICAgIGxldCB5T2Zmc2V0ID0gMDtcblxuICAgICAgICBmb3IgKGNvbnN0IFtpLCB2XSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmFjdGl2ZUJsb2NrLnNoYXBlKSkge1xuICAgICAgICAgICAgaWYgKHYgIT09IDApIHlPZmZzZXQgPSBNYXRoLnJvdW5kKHBhcnNlSW50KGkpIC8gNCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hY3RpdmVCbG9jay5wb3MueSArICh0aGlzLmJsb2NrU2l6ZSAqIHlPZmZzZXQpIDw9ICh0aGlzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLmJsb2NrU2l6ZSkpIHRoaXMuYWN0aXZlQmxvY2sucG9zLnkgKz0gdGhpcy5ibG9ja1NpemU7XG4gICAgICAgIGVsc2UgdGhpcy5hY3RpdmVCbG9jay5wbGFjZWQgPSB0cnVlO1xuICAgIH1cbiAgICBcbiAgICBtYWluKCkge1xuICAgICAgICB0aGlzLmRyYXcoKTtcblxuICAgICAgICBpZiAoIXRoaXMuYWN0aXZlQmxvY2sgfHwgdGhpcy5hY3RpdmVCbG9jaz8ucGxhY2VkKSB0aGlzLmFjdGl2ZUJsb2NrID0gbmV3IEJsb2NrKHRoaXMuY2FudmFzLCB0aGlzLmN0eCwgdGhpcy5ibG9ja1NpemUpO1xuICAgICAgICB0aGlzLmNoZWNrKCk7XG4gICAgICAgIHRoaXMuYWN0aXZlQmxvY2suZHJhdygpO1xuICAgICAgICB0aGlzLnBsYWNlKCk7XG4gICAgfVxuICAgIFxuICAgIHBsYXkoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLnBsYXkoKSk7XG5cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IG5vdyAtIHRoaXMudGhlbjtcbiAgICAgICAgXG4gICAgICAgIGlmIChlbGFwc2VkID4gdGhpcy5pbnRlcnZhbCAmJiAhdGhpcy5pc01vdmluZykge1xuICAgICAgICAgICAgdGhpcy50aGVuID0gbm93IC0gKGVsYXBzZWQgJSB0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMubWFpbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tICcuL2NvbXBvbmVudHMvR2FtZSc7XG5cbmNvbnN0IEZSQU1FX1JBVEUgPSAxO1xuY29uc3QgV0lEVEggPSAzMDA7XG5jb25zdCBIRUlHSFQgPSA1MDA7XG5jb25zdCBCTE9DS19TSVpFID0gMjA7XG5cbmNvbnN0IGdhbWUgPSBuZXcgR2FtZShcbiAgICBGUkFNRV9SQVRFLFxuICAgIFdJRFRILFxuICAgIEhFSUdIVCxcbiAgICBCTE9DS19TSVpFLFxuKTtcblxuZ2FtZS5wbGF5KCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9