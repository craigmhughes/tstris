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
        this.playing = true;
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
        this.background = '#ededed';
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
        else if (this.activeBlock.pos.y <= 10)
            return this.playing = false;
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
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.width, this.height);
        var colors = [this.background, '#ff5b02', '#5d4ffe', '#ff0044', '#00ff8a', '#48bbfe', '#ab54e3', '#ffb200'];
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
        if (elapsed > this.interval && this.playing) {
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

module.exports = JSON.parse('{"orangeRicky":{"color":"#ff5b02","values":[[0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0],[0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0],[0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,0],[0,0,0,0,0,1,1,0,0,0,1,0,0,0,1,0]]},"blueRicky":{"color":"#5d4ffe","values":[[0,0,0,0,2,0,0,0,2,2,2,0,0,0,0,0],[0,2,2,0,0,2,0,0,0,2,0,0,0,0,0,0],[0,0,0,0,0,2,2,2,0,0,0,2,0,0,0,0],[0,0,0,0,0,0,2,0,0,0,2,0,0,2,2,0]]},"clevelandZ":{"color":"#ff0044","values":[[0,0,0,0,3,3,0,0,0,3,3,0,0,0,0,0],[0,0,3,0,0,3,3,0,0,3,0,0,0,0,0,0],[0,0,0,0,0,0,3,3,0,3,3,0,0,0,0,0],[0,0,0,0,0,3,0,0,0,3,3,0,0,0,3,0]]},"rhodeIslandZ":{"color":"#00ff8a","values":[[0,0,0,0,4,4,0,0,0,4,4,0,0,0,0,0],[0,0,0,0,0,4,0,0,4,4,0,0,4,0,0,0],[4,4,0,0,0,4,4,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,4,0,0,0,4,4,0,0,0,4]]},"hero":{"color":"#48bbfe","values":[[0,0,0,0,0,0,0,0,5,5,5,5,0,0,0,0],[0,0,5,0,0,0,5,0,0,0,5,0,0,0,5,0],[0,0,0,0,5,5,5,5,0,0,0,0,0,0,0,0],[0,5,0,0,0,5,0,0,0,5,0,0,0,5,0,0]]},"teewee":{"color":"#ab54e3","values":[[0,0,0,0,0,6,0,0,6,6,6,0,0,0,0,0],[0,6,0,0,0,6,6,0,0,6,0,0,0,0,0,0],[0,0,0,0,0,6,6,6,0,0,6,0,0,0,0,0],[0,0,0,0,0,0,6,0,0,6,6,0,0,0,6,0]]},"smashboy":{"color":"#ffb200","values":[[0,0,0,0,0,7,7,0,0,7,7,0,0,0,0,0]]}}');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFrQztBQUVsQztJQWNJLGVBQ0ksTUFBeUIsRUFDekIsR0FBNkIsRUFDN0IsU0FBaUI7UUFFakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0NBQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0NBQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEYsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsd0NBQU0sQ0FBQyxJQUFJLENBQUMsSUFBMkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFhLENBQUM7UUFDMUYsSUFBSSxDQUFDLEtBQUssR0FBRyx3Q0FBTSxDQUFDLElBQUksQ0FBQyxJQUEyQixDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLEdBQUc7WUFDUCxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDO1lBQ3JCLENBQUMsRUFBRSxDQUFDO1NBQ1AsQ0FBQztRQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQTJCLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxvQkFBSSxHQUFKO1FBQ0ksS0FBd0IsVUFBZ0MsRUFBaEMsVUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQWhDLGNBQWdDLEVBQWhDLElBQWdDLEVBQUU7WUFBaEQsZUFBVSxFQUFULEdBQUcsVUFBRSxHQUFHO1lBQ2YsSUFBSSxDQUFDLEdBQUc7Z0JBQUUsU0FBUztZQUVuQixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxDQUFDLENBQUMsQ0FBQyxFQUM5QyxJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxTQUFTLENBQ2pCLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxzQkFBTSxHQUFOO1FBQ0ksSUFBSSx3Q0FBTSxDQUFDLElBQUksQ0FBQyxJQUEyQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDdEUsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7U0FDeEI7YUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyx3Q0FBTSxDQUFDLElBQUksQ0FBQyxJQUEyQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQWEsQ0FBQztRQUUxRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN0SCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDeEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzRDtJQUNMLENBQUM7SUFFRCw0QkFBWSxHQUFaLFVBQWEsTUFBYztRQUN2QixNQUFNLEdBQUcsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFFaEUsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsSUFBTSxJQUFJLEdBQUc7WUFDVCxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUNmLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBQ2YsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDZixHQUFHLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQztTQUNuQixDQUFDO1FBRUYsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFDLElBQUssUUFBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQVQsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsNkJBQWEsR0FBYjtRQUNJLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLElBQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFaEQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFDLElBQUssUUFBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQVQsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsb0JBQUksR0FBSixVQUFLLFNBQWlCO1FBQ2xCLElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRTtZQUN0QixJQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBQ2QsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3BDO2FBQ0ksSUFBSSxTQUFTLEtBQUssT0FBTyxFQUFFO1lBQzVCLElBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBRXJGLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDaEM7YUFDSSxJQUFJLFNBQVMsS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzVILENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQztBQUVELGlFQUFlLEtBQUssRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNHYTtBQUVsQztJQWlCSSxjQUNJLEdBQVcsRUFDWCxLQUFhLEVBQ2IsTUFBYyxFQUNkLFNBQWlCO1FBRWpCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQXNCLENBQUM7UUFDckUsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQTZCLENBQUM7UUFDcEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEtBQUssQ0FDakIsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUNqRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNWLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBRTVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsb0JBQUssR0FBTDtRQUFBLGlCQXNCQztRQXJCRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFakMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLElBQUksS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7Z0JBQzlDLE9BQU87YUFDVjtZQUVELEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUViLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHO2dCQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ3hDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHO2dCQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNqRCxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRztnQkFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDakQsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUc7Z0JBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFdkQsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRVosSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO2dCQUMxQixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzNCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0JBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELG9CQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPO1FBQzlCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztRQUVyQixLQUFvQixVQUFzQyxFQUF0QyxXQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQXRDLGNBQXNDLEVBQXRDLElBQXNDLEVBQUU7WUFBbEQsZUFBTSxFQUFMLENBQUMsVUFBRSxDQUFDO1lBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNULElBQU0sVUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDM0QsSUFBTSxVQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0QsSUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7Z0JBQ3pELElBQU0sWUFBVSxHQUFHLENBQUMsVUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLFVBQVEsQ0FBQztnQkFFbEQsSUFBTSxZQUFZLEdBQUcsQ0FBQyxZQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7Z0JBRTFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNsRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDckMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDaEIsTUFBTTtpQkFDVDthQUNKO1NBQ0o7UUFFRCx3Q0FBd0M7UUFDeEMsbURBQW1EO1FBQ25ELGtFQUFrRTtRQUNsRSxpRUFBaUU7UUFDakUsa0NBQWtDO1FBQ2xDLHlCQUF5QjtRQUN6QiwrREFBK0Q7UUFDL0QsK0RBQStEO1FBQy9ELDJCQUEyQjtRQUMzQix5QkFBeUI7UUFDekIsU0FBUztRQUNULG9DQUFvQztRQUNwQyx5QkFBeUI7UUFDekIsYUFBYTtRQUNiLCtEQUErRDtRQUMvRCxtRUFBbUU7UUFDbkUsUUFBUTtRQUNSLElBQUk7UUFFSixJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sS0FBSyxDQUFDO2FBQ3ZCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRW5FLElBQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxJQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0QsSUFBTSxVQUFVLEdBQUcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBRWxELEtBQW9CLFVBQXNDLEVBQXRDLFdBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBdEMsY0FBc0MsRUFBdEMsSUFBc0MsRUFBRTtZQUFsRCxlQUFNLEVBQUwsQ0FBQyxVQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ1QsSUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkU7U0FDSjtRQUVELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ2hELElBQU0sUUFBUSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQU0sTUFBTSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUNyQyxJQUFNLE9BQU8scUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFDLENBQUM7WUFFdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxJQUFJLGlEQUNELElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxTQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FDL0MsQ0FBQzthQUVMO1NBQ0o7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDL0IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELG1CQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFakQsSUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTlHLEtBQW9CLFVBQXlCLEVBQXpCLFdBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUF6QixjQUF5QixFQUF6QixJQUF5QixFQUFFO1lBQXJDLGVBQU0sRUFBTCxDQUFDLFVBQUUsQ0FBQztZQUNYLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQUUsU0FBUztZQUV0QixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFDbEQsSUFBSSxDQUFDLFNBQVMsRUFDZCxJQUFJLENBQUMsU0FBUyxDQUNqQixDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsb0JBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFFOUIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRWhCLEtBQXFCLFVBQXNDLEVBQXRDLFdBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBdEMsY0FBc0MsRUFBdEMsSUFBc0MsRUFBRTtZQUFsRCxlQUFNLEVBQUwsQ0FBQyxVQUFFLENBQUM7WUFDWixJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN0RDtRQUVELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQzs7WUFDdEksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxtQkFBSSxHQUFKOztRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFJLFVBQUksQ0FBQyxXQUFXLDBDQUFFLE1BQU07WUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksb0RBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZILElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxtQkFBSSxHQUFKO1FBQUEsaUJBV0M7UUFWRyxxQkFBcUIsQ0FBQyxjQUFNLFlBQUksQ0FBQyxJQUFJLEVBQUUsRUFBWCxDQUFXLENBQUMsQ0FBQztRQUV6QyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBTSxPQUFPLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtJQUNMLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQztBQUVELGlFQUFlLElBQUksRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUM5TXBCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUM7QUFFckMsSUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUNsQixJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDbkIsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBRXRCLElBQU0sSUFBSSxHQUFHLElBQUksd0RBQUksQ0FDakIsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sVUFBVSxDQUNiLENBQUM7QUFFRixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90c3RyaXMvLi9zcmMvY29tcG9uZW50cy9CbG9jay9CbG9jay50cyIsIndlYnBhY2s6Ly90c3RyaXMvLi9zcmMvY29tcG9uZW50cy9HYW1lLnRzIiwid2VicGFjazovL3RzdHJpcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90c3RyaXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RzdHJpcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RzdHJpcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RzdHJpcy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmxvY2tzIGZyb20gJy4vdHlwZXMuanNvbic7XG5cbmNsYXNzIEJsb2NrIHtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBzaGFwZUluZGV4OiBudW1iZXI7XG4gICAgc2hhcGU6IG51bWJlcltdO1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgcGxhY2VkOiBib29sZWFuO1xuICAgIGJsb2NrU2l6ZTogbnVtYmVyO1xuICAgIHBvczoge1xuICAgICAgICB4OiBudW1iZXIsXG4gICAgICAgIHk6IG51bWJlcixcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgICAgICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXG4gICAgICAgIGJsb2NrU2l6ZTogbnVtYmVyLFxuICAgICkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuYmxvY2tTaXplID0gYmxvY2tTaXplO1xuICAgICAgICB0aGlzLnR5cGUgPSBPYmplY3Qua2V5cyhibG9ja3MpW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE9iamVjdC5rZXlzKGJsb2NrcykubGVuZ3RoKV07XG4gICAgICAgIC8vIHRoaXMudHlwZSA9ICdoZXJvJztcbiAgICAgICAgdGhpcy5zaGFwZUluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5zaGFwZSA9IGJsb2Nrc1t0aGlzLnR5cGUgYXMga2V5b2YgdHlwZW9mIGJsb2Nrc10udmFsdWVzW3RoaXMuc2hhcGVJbmRleF0gYXMgbnVtYmVyW107XG4gICAgICAgIHRoaXMuY29sb3IgPSBibG9ja3NbdGhpcy50eXBlIGFzIGtleW9mIHR5cGVvZiBibG9ja3NdLmNvbG9yO1xuICAgICAgICB0aGlzLnBsYWNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBvcyA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMuYmxvY2tTaXplICogNSxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc29sZS5sb2coYEluaXRpYWxpc2VkIEJsb2NrIFR5cGU6ICR7dGhpcy50eXBlfWApO1xuICAgIH1cblxuICAgIGRyYXcoKSB7XG4gICAgICAgIGZvcihjb25zdCBbaWR4LCB2YWxdIG9mIEFycmF5LmZyb20odGhpcy5zaGFwZS5lbnRyaWVzKCkpKSB7XG4gICAgICAgICAgICBpZiAoIXZhbCkgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHlPZmZzZXQgPSBNYXRoLmZsb29yKGlkeCAvIDQpO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgIHRoaXMucG9zLnggKyAodGhpcy5ibG9ja1NpemUgKiAoaWR4IC0gKDQgKiAoeU9mZnNldCA/PyAxKSkpKSxcbiAgICAgICAgICAgICAgICB0aGlzLnBvcy55ICsgKHRoaXMuYmxvY2tTaXplICogKHlPZmZzZXQgPz8gMSkpLFxuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tTaXplLCBcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrU2l6ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJvdGF0ZSgpIHtcbiAgICAgICAgaWYgKGJsb2Nrc1t0aGlzLnR5cGUgYXMga2V5b2YgdHlwZW9mIGJsb2Nrc10udmFsdWVzW3RoaXMuc2hhcGVJbmRleCArIDFdKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlSW5kZXggKz0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNoYXBlSW5kZXggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlSW5kZXggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaGFwZSA9IGJsb2Nrc1t0aGlzLnR5cGUgYXMga2V5b2YgdHlwZW9mIGJsb2Nrc10udmFsdWVzW3RoaXMuc2hhcGVJbmRleF0gYXMgbnVtYmVyW107XG5cbiAgICAgICAgaWYgKCh0aGlzLnBvcy54ID4gMCAmJiB0aGlzLnBvcy54IDw9IHRoaXMuYmxvY2tTaXplKSB8fCAodGhpcy5wb3MueCA8IDAgJiYgIXRoaXMuY2hlY2tMZWZ0Q29sKHRoaXMucG9zLngpKSkgdGhpcy5wb3MueCA9IDA7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucG9zLnggPj0gKHRoaXMuY2FudmFzLndpZHRoIC0gKHRoaXMuYmxvY2tTaXplICogMykpICYmICF0aGlzLmNoZWNrUmlnaHRDb2woKSkge1xuICAgICAgICAgICAgdGhpcy5wb3MueCA9ICh0aGlzLmNhbnZhcy53aWR0aCAtICh0aGlzLmJsb2NrU2l6ZSAqIDQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrTGVmdENvbChvZmZzZXQ6IG51bWJlcikge1xuICAgICAgICBvZmZzZXQgPSBvZmZzZXQgPT09IDAgPyBvZmZzZXQgOiAob2Zmc2V0ICogLTEpIC8gdGhpcy5ibG9ja1NpemU7XG5cbiAgICAgICAgY29uc3QgYXJyID0gQXJyYXkuZnJvbSh0aGlzLnNoYXBlKTtcbiAgICAgICAgY29uc3QgaWR4cyA9IFtcbiAgICAgICAgICAgIGFyclswICsgb2Zmc2V0XSwgXG4gICAgICAgICAgICBhcnJbNCArIG9mZnNldF0sIFxuICAgICAgICAgICAgYXJyWzggKyBvZmZzZXRdLCBcbiAgICAgICAgICAgIGFyclsxMiArIG9mZnNldF1cbiAgICAgICAgXTtcblxuICAgICAgICByZXR1cm4gKGlkeHMuZXZlcnkoKGkpID0+IChpID09PSAwKSkpO1xuICAgIH1cblxuICAgIGNoZWNrUmlnaHRDb2woKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IEFycmF5LmZyb20odGhpcy5zaGFwZSk7XG4gICAgICAgIGNvbnN0IGlkeHMgPSBbYXJyWzNdLCBhcnJbN10sIGFyclsxMV0sIGFyclsxNV1dO1xuXG4gICAgICAgIHJldHVybiAoaWR4cy5ldmVyeSgoaSkgPT4gKGkgPT09IDApKSk7XG4gICAgfVxuXG4gICAgbW92ZShkaXJlY3Rpb246IHN0cmluZykge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLnBvcy54ID4gMCB8fCBcbiAgICAgICAgICAgICAgICAodGhpcy5wb3MueCA8PSAwICYmIHRoaXMuY2hlY2tMZWZ0Q29sKHRoaXMucG9zLngpKVxuICAgICAgICAgICAgKSAgIHRoaXMucG9zLnggLT0gdGhpcy5ibG9ja1NpemU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MueCA8ICh0aGlzLmNhbnZhcy53aWR0aCAtICh0aGlzLmJsb2NrU2l6ZSAqIDQpKSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLnBvcy54IDwgKHRoaXMuY2FudmFzLndpZHRoIC0gKHRoaXMuYmxvY2tTaXplICogMykpICYmIHRoaXMuY2hlY2tSaWdodENvbCgpKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgdGhpcy5wb3MueCArPSB0aGlzLmJsb2NrU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdkb3duJyAmJiB0aGlzLnBvcy55IDwgKHRoaXMuY2FudmFzLmhlaWdodCAtICh0aGlzLmJsb2NrU2l6ZSAqIDMpKSkgdGhpcy5wb3MueSArPSB0aGlzLmJsb2NrU2l6ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJsb2NrOyIsImltcG9ydCBCbG9jayBmcm9tIFwiLi9CbG9jay9CbG9ja1wiO1xuXG5jbGFzcyBHYW1lIHtcbiAgICBwbGF5aW5nOiBib29sZWFuO1xuICAgIGJsb2NrU2l6ZTogbnVtYmVyO1xuICAgIGZwczogbnVtYmVyO1xuICAgIG5vdzogbnVsbCB8IG51bWJlcjtcbiAgICB0aGVuOiBudW1iZXI7XG4gICAgaW50ZXJ2YWw6IG51bWJlcjtcbiAgICBkZWx0YTogbnVsbCB8IG51bWJlcjtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgZ3JpZDogbnVtYmVyW107XG4gICAgYWN0aXZlQmxvY2s6IEJsb2NrIHwgbnVsbDtcbiAgICBpc01vdmluZzogYm9vbGVhbjtcbiAgICBiYWNrZ3JvdW5kOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZnBzOiBudW1iZXIsXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXG4gICAgICAgIGhlaWdodDogbnVtYmVyLFxuICAgICAgICBibG9ja1NpemU6IG51bWJlcixcbiAgICApIHtcbiAgICAgICAgdGhpcy5wbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ibG9ja1NpemUgPSBibG9ja1NpemU7XG4gICAgICAgIHRoaXMuZnBzID0gZnBzO1xuICAgICAgICB0aGlzLm5vdyA9IG51bGw7XG4gICAgICAgIHRoaXMudGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSAxMDAwIC8gZnBzO1xuICAgICAgICB0aGlzLmRlbHRhID0gbnVsbDtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NyZWVuJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgICAgIHRoaXMuZ3JpZCA9IG5ldyBBcnJheShcbiAgICAgICAgICAgICh0aGlzLmhlaWdodCAvIHRoaXMuYmxvY2tTaXplKSAqICh0aGlzLndpZHRoIC8gdGhpcy5ibG9ja1NpemUpXG4gICAgICAgICkuZmlsbCgwKTtcbiAgICAgICAgdGhpcy5hY3RpdmVCbG9jayA9IG51bGw7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gJyNlZGVkZWQnO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JpZCk7XG5cbiAgICAgICAgdGhpcy5zZXR1cCgpO1xuICAgIH1cblxuICAgIHNldHVwKCkge1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5hY3RpdmVCbG9jayB8fCB0aGlzLmFjdGl2ZUJsb2NrLnBsYWNlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jaGVjaygpO1xuXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICd3JykgdGhpcy5hY3RpdmVCbG9jay5yb3RhdGUoKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5ID09PSAnYScpIHRoaXMuYWN0aXZlQmxvY2subW92ZSgnbGVmdCcpO1xuICAgICAgICAgICAgZWxzZSBpZiAoZS5rZXkgPT09ICdzJykgdGhpcy5hY3RpdmVCbG9jay5tb3ZlKCdkb3duJyk7XG4gICAgICAgICAgICBlbHNlIGlmIChlLmtleSA9PT0gJ2QnKSB0aGlzLmFjdGl2ZUJsb2NrLm1vdmUoJ3JpZ2h0Jyk7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuYWN0aXZlQmxvY2sucGxhY2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVCbG9jay5kcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIGNoZWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMuYWN0aXZlQmxvY2spIHJldHVybjtcbiAgICAgICAgY29uc3QgeUJyZWFrID0gTWF0aC5mbG9vcigodGhpcy53aWR0aCAvIHRoaXMuYmxvY2tTaXplKSk7XG4gICAgICAgIGxldCBoaXRCbG9jayA9IGZhbHNlO1xuXG4gICAgICAgIGZvcihjb25zdCBbaSwgdl0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5hY3RpdmVCbG9jay5zaGFwZSkpIHtcbiAgICAgICAgICAgIGlmICh2ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeFRvQ2hlY2sgPSAodGhpcy5hY3RpdmVCbG9jay5wb3MueCAvIHRoaXMuYmxvY2tTaXplKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5VG9DaGVjayA9ICh0aGlzLmFjdGl2ZUJsb2NrLnBvcy55IC8gdGhpcy5ibG9ja1NpemUpICsgMTtcbiAgICAgICAgICAgICAgICBjb25zdCB5T2Zmc2V0ID0gKE1hdGguZmxvb3IoKHBhcnNlSW50KGkpKSAvIDQpICogeUJyZWFrKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydFBvaW50ID0gKHlUb0NoZWNrICogeUJyZWFrKSArIHhUb0NoZWNrO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhY2VUb0NoZWNrID0gKHN0YXJ0UG9pbnQgKyBNYXRoLmZsb29yKHBhcnNlSW50KGkpICUgNCkgKyB5T2Zmc2V0KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyaWRbc3BhY2VUb0NoZWNrXSAhPT0gMCB8fCBzcGFjZVRvQ2hlY2sgPiB0aGlzLmdyaWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JpZFtzcGFjZVRvQ2hlY2tdKTtcbiAgICAgICAgICAgICAgICAgICAgaGl0QmxvY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiBSZW1vdmUgdGVzdCBncmlkIG9uIGNvbXBsZXRpb24hXG4gICAgICAgIC8vIGZvcihjb25zdCBbaSwgdl0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5ncmlkKSkge1xuICAgICAgICAvLyAgICAgY29uc3QgeE9mZnNldCA9IE1hdGguZmxvb3IoKHRoaXMuaGVpZ2h0IC8gdGhpcy5ibG9ja1NpemUpKTtcbiAgICAgICAgLy8gICAgIGNvbnN0IHlPZmZzZXQgPSBNYXRoLmZsb29yKCh0aGlzLndpZHRoIC8gdGhpcy5ibG9ja1NpemUpKTtcbiAgICAgICAgLy8gICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgICAgICAvLyAgICAgdGhpcy5jdHguZmlsbFJlY3QoXG4gICAgICAgIC8vICAgICAgICAgTWF0aC5mbG9vcihwYXJzZUludChpKSAlIHlPZmZzZXQpICogdGhpcy5ibG9ja1NpemUsIFxuICAgICAgICAvLyAgICAgICAgIE1hdGguZmxvb3IocGFyc2VJbnQoaSkgLyB5T2Zmc2V0KSAqIHRoaXMuYmxvY2tTaXplLCBcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmJsb2NrU2l6ZSwgXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5ibG9ja1NpemVcbiAgICAgICAgLy8gICAgICk7XG4gICAgICAgIC8vICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICAvLyAgICAgdGhpcy5jdHguZmlsbFRleHQoXG4gICAgICAgIC8vICAgICAgICAgaSxcbiAgICAgICAgLy8gICAgICAgICBNYXRoLmZsb29yKHBhcnNlSW50KGkpICUgeU9mZnNldCkgKiB0aGlzLmJsb2NrU2l6ZSwgXG4gICAgICAgIC8vICAgICAgICAgTWF0aC5mbG9vcihwYXJzZUludChpKSAvIHlPZmZzZXQpICogdGhpcy5ibG9ja1NpemUgKyAxMCxcbiAgICAgICAgLy8gICAgIClcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlmICghaGl0QmxvY2spIHJldHVybiBmYWxzZTtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5hY3RpdmVCbG9jay5wb3MueSA8PSAxMCkgcmV0dXJuIHRoaXMucGxheWluZyA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IHhUb0NoZWNrID0gKHRoaXMuYWN0aXZlQmxvY2sucG9zLnggLyB0aGlzLmJsb2NrU2l6ZSk7XG4gICAgICAgIGNvbnN0IHlUb0NoZWNrID0gKHRoaXMuYWN0aXZlQmxvY2sucG9zLnkgLyB0aGlzLmJsb2NrU2l6ZSk7XG4gICAgICAgIGNvbnN0IHN0YXJ0UG9pbnQgPSAoeVRvQ2hlY2sgKiB5QnJlYWspICsgeFRvQ2hlY2s7XG5cbiAgICAgICAgZm9yKGNvbnN0IFtpLCB2XSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmFjdGl2ZUJsb2NrLnNoYXBlKSkge1xuICAgICAgICAgICAgaWYgKHYgIT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB5T2Zmc2V0ID0gKE1hdGguZmxvb3IoKHBhcnNlSW50KGkpKSAvIDQpICogeUJyZWFrKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbKHN0YXJ0UG9pbnQgKyBNYXRoLmZsb29yKHBhcnNlSW50KGkpICUgNCkgKyB5T2Zmc2V0KV0gPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8ICh0aGlzLmdyaWQubGVuZ3RoIC8geUJyZWFrKTsgaSsrKXtcbiAgICAgICAgICAgIGNvbnN0IHJvd1N0YXJ0ID0gKHlCcmVhayAqIGkpO1xuICAgICAgICAgICAgY29uc3Qgcm93RW5kID0gKHlCcmVhayAqIGkpICsgeUJyZWFrO1xuICAgICAgICAgICAgY29uc3QgZXhjZXJwdCA9IFsuLi50aGlzLmdyaWQuc2xpY2Uocm93U3RhcnQsIHJvd0VuZCldO1xuXG4gICAgICAgICAgICBpZiAoIWV4Y2VycHQuaW5jbHVkZXMoMCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWQgPSBbXG4gICAgICAgICAgICAgICAgICAgIC4uLihuZXcgQXJyYXkoeUJyZWFrKSBhcyBudW1iZXJbXSkuZmlsbCgwKSxcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5ncmlkLnNsaWNlKDAsIHJvd1N0YXJ0KSxcbiAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5ncmlkLnNsaWNlKHJvd0VuZCwgdGhpcy5ncmlkLmxlbmd0aCksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFjdGl2ZUJsb2NrLnBsYWNlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuYmFja2dyb3VuZDtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIGNvbnN0IGNvbG9ycyA9IFt0aGlzLmJhY2tncm91bmQsICcjZmY1YjAyJywgJyM1ZDRmZmUnLCAnI2ZmMDA0NCcsICcjMDBmZjhhJywgJyM0OGJiZmUnLCAnI2FiNTRlMycsICcjZmZiMjAwJ107XG5cbiAgICAgICAgZm9yKGNvbnN0IFtpLCB2XSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmdyaWQpKSB7XG4gICAgICAgICAgICBpZiAodiA9PT0gMCkgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHlPZmZzZXQgPSBNYXRoLmZsb29yKCh0aGlzLndpZHRoIC8gdGhpcy5ibG9ja1NpemUpKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yc1t2XTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IocGFyc2VJbnQoaSkgJSB5T2Zmc2V0KSAqIHRoaXMuYmxvY2tTaXplLCBcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKHBhcnNlSW50KGkpIC8geU9mZnNldCkgKiB0aGlzLmJsb2NrU2l6ZSwgXG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja1NpemUsIFxuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tTaXplXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxhY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5hY3RpdmVCbG9jaykgcmV0dXJuO1xuXG4gICAgICAgIGxldCB5T2Zmc2V0ID0gMDtcblxuICAgICAgICBmb3IgKGNvbnN0IFtpLCB2XSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmFjdGl2ZUJsb2NrLnNoYXBlKSkge1xuICAgICAgICAgICAgaWYgKHYgIT09IDApIHlPZmZzZXQgPSBNYXRoLnJvdW5kKHBhcnNlSW50KGkpIC8gNCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hY3RpdmVCbG9jay5wb3MueSArICh0aGlzLmJsb2NrU2l6ZSAqIHlPZmZzZXQpIDw9ICh0aGlzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLmJsb2NrU2l6ZSkpIHRoaXMuYWN0aXZlQmxvY2sucG9zLnkgKz0gdGhpcy5ibG9ja1NpemU7XG4gICAgICAgIGVsc2UgdGhpcy5hY3RpdmVCbG9jay5wbGFjZWQgPSB0cnVlO1xuICAgIH1cbiAgICBcbiAgICBtYWluKCkge1xuICAgICAgICB0aGlzLmRyYXcoKTtcblxuICAgICAgICBpZiAoIXRoaXMuYWN0aXZlQmxvY2sgfHwgdGhpcy5hY3RpdmVCbG9jaz8ucGxhY2VkKSB0aGlzLmFjdGl2ZUJsb2NrID0gbmV3IEJsb2NrKHRoaXMuY2FudmFzLCB0aGlzLmN0eCwgdGhpcy5ibG9ja1NpemUpO1xuICAgICAgICB0aGlzLmNoZWNrKCk7XG4gICAgICAgIHRoaXMuYWN0aXZlQmxvY2suZHJhdygpO1xuICAgICAgICB0aGlzLnBsYWNlKCk7XG4gICAgfVxuICAgIFxuICAgIHBsYXkoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLnBsYXkoKSk7XG5cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IG5vdyAtIHRoaXMudGhlbjtcbiAgICAgICAgXG4gICAgICAgIGlmIChlbGFwc2VkID4gdGhpcy5pbnRlcnZhbCAmJiB0aGlzLnBsYXlpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudGhlbiA9IG5vdyAtIChlbGFwc2VkICUgdGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLm1haW4oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9jb21wb25lbnRzL0dhbWUnO1xuXG5jb25zdCBGUkFNRV9SQVRFID0gMTtcbmNvbnN0IFdJRFRIID0gMzAwO1xuY29uc3QgSEVJR0hUID0gNTAwO1xuY29uc3QgQkxPQ0tfU0laRSA9IDIwO1xuXG5jb25zdCBnYW1lID0gbmV3IEdhbWUoXG4gICAgRlJBTUVfUkFURSxcbiAgICBXSURUSCxcbiAgICBIRUlHSFQsXG4gICAgQkxPQ0tfU0laRSxcbik7XG5cbmdhbWUucGxheSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==