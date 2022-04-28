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
            if (e.key === 'w')
                _this.activeBlock.rotate();
            else if (e.key === 'a')
                _this.activeBlock.move('left');
            else if (e.key === 's')
                _this.activeBlock.move('down');
            else if (e.key === 'd')
                _this.activeBlock.move('right');
            _this.check();
            _this.draw();
            _this.activeBlock.draw();
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
    Game.prototype.main = function () {
        var _a;
        this.draw();
        if (!this.activeBlock || ((_a = this.activeBlock) === null || _a === void 0 ? void 0 : _a.placed))
            this.activeBlock = new _Block_Block__WEBPACK_IMPORTED_MODULE_0__["default"](this.canvas, this.ctx, this.blockSize);
        this.check();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFrQztBQUVsQztJQWNJLGVBQ0ksTUFBeUIsRUFDekIsR0FBNkIsRUFDN0IsU0FBaUI7UUFFakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0NBQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0NBQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyx3Q0FBTSxDQUFDLElBQUksQ0FBQyxJQUEyQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQWEsQ0FBQztRQUMxRixJQUFJLENBQUMsS0FBSyxHQUFHLHdDQUFNLENBQUMsSUFBSSxDQUFDLElBQTJCLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDNUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsR0FBRztZQUNQLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUM7WUFDckIsQ0FBQyxFQUFFLENBQUM7U0FDUCxDQUFDO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBMkIsSUFBSSxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELG9CQUFJLEdBQUo7UUFDSSxLQUF3QixVQUFnQyxFQUFoQyxVQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBaEMsY0FBZ0MsRUFBaEMsSUFBZ0MsRUFBRTtZQUFoRCxlQUFVLEVBQVQsR0FBRyxVQUFFLEdBQUc7WUFDZixJQUFJLENBQUMsR0FBRztnQkFBRSxTQUFTO1lBRW5CLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLENBQUMsQ0FBQyxDQUFDLEVBQzlDLElBQUksQ0FBQyxTQUFTLEVBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FDakIsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELHNCQUFNLEdBQU47UUFDSSxJQUFJLHdDQUFNLENBQUMsSUFBSSxDQUFDLElBQTJCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUN0RSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQztTQUN4QjthQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7U0FDdkI7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLHdDQUFNLENBQUMsSUFBSSxDQUFDLElBQTJCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBYSxDQUFDO0lBQzlGLENBQUM7SUFFRCxvQkFBSSxHQUFKLFVBQUssU0FBaUI7UUFDbEIsSUFBSSxTQUFTLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ3BFLElBQUksU0FBUyxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDbkgsSUFBSSxTQUFTLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUM1SCxDQUFDO0lBQ0wsWUFBQztBQUFELENBQUM7QUFFRCxpRUFBZSxLQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRWE7QUFFbEM7SUFlSSxjQUNJLEdBQVcsRUFDWCxLQUFhLEVBQ2IsTUFBYyxFQUNkLFNBQWlCO1FBRWpCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQXNCLENBQUM7UUFDckUsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQTZCLENBQUM7UUFDcEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEtBQUssQ0FDakIsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUNqRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNWLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXRCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsb0JBQUssR0FBTDtRQUFBLGlCQWtCQztRQWpCRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFakMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLElBQUksS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7Z0JBQzlDLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHO2dCQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ3hDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHO2dCQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNqRCxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRztnQkFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDakQsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUc7Z0JBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFdkQsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxvQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsb0JBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFDOUIsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXJCLEtBQW9CLFVBQXNDLEVBQXRDLFdBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBdEMsY0FBc0MsRUFBdEMsSUFBc0MsRUFBRTtZQUFsRCxlQUFNLEVBQUwsQ0FBQyxVQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ1QsSUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMvRCxJQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztnQkFDekQsSUFBTSxVQUFVLEdBQUcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDO2dCQUVsRCxJQUFNLFlBQVksR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztnQkFFMUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNoQixNQUFNO2lCQUNUO2FBQ0o7U0FDSjtRQUVELElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFNUIsS0FBb0IsVUFBc0MsRUFBdEMsV0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUF0QyxjQUFzQyxFQUF0QyxJQUFzQyxFQUFFO1lBQWxELGVBQU0sRUFBTCxDQUFDLFVBQUUsQ0FBQztZQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDVCxJQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzNELElBQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDM0QsSUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7Z0JBQ3pELElBQU0sVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQztnQkFFbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2RTtTQUNKO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxtQkFBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFakQsSUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFdkYsS0FBb0IsVUFBeUIsRUFBekIsV0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQXpCLGNBQXlCLEVBQXpCLElBQXlCLEVBQUU7WUFBckMsZUFBTSxFQUFMLENBQUMsVUFBRSxDQUFDO1lBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFBRSxTQUFTO1lBRXRCLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzNELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDYixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUNsRCxJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxTQUFTLENBQ2pCLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxtQkFBSSxHQUFKOztRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFJLFVBQUksQ0FBQyxXQUFXLDBDQUFFLE1BQU07WUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksb0RBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZILElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDOztZQUMvSCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDeEMsQ0FBQztJQUVELG1CQUFJLEdBQUo7UUFBQSxpQkFXQztRQVZHLHFCQUFxQixDQUFDLGNBQU0sWUFBSSxDQUFDLElBQUksRUFBRSxFQUFYLENBQVcsQ0FBQyxDQUFDO1FBRXpDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFNLE9BQU8sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUVoQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMzQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUM7QUFFRCxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDekpwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnFDO0FBRXJDLElBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQztBQUNyQixJQUFNLEtBQUssR0FBRyxHQUFHLENBQUM7QUFDbEIsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQ25CLElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUV0QixJQUFNLElBQUksR0FBRyxJQUFJLHdEQUFJLENBQ2pCLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFVBQVUsQ0FDYixDQUFDO0FBRUYsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHN0cmlzLy4vc3JjL2NvbXBvbmVudHMvQmxvY2svQmxvY2sudHMiLCJ3ZWJwYWNrOi8vdHN0cmlzLy4vc3JjL2NvbXBvbmVudHMvR2FtZS50cyIsIndlYnBhY2s6Ly90c3RyaXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHN0cmlzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90c3RyaXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90c3RyaXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90c3RyaXMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJsb2NrcyBmcm9tICcuL3R5cGVzLmpzb24nO1xuXG5jbGFzcyBCbG9jayB7XG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgc2hhcGVJbmRleDogbnVtYmVyO1xuICAgIHNoYXBlOiBudW1iZXJbXTtcbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIHBsYWNlZDogYm9vbGVhbjtcbiAgICBibG9ja1NpemU6IG51bWJlcjtcbiAgICBwb3M6IHtcbiAgICAgICAgeDogbnVtYmVyLFxuICAgICAgICB5OiBudW1iZXIsXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXG4gICAgICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuICAgICAgICBibG9ja1NpemU6IG51bWJlcixcbiAgICApIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmJsb2NrU2l6ZSA9IGJsb2NrU2l6ZTtcbiAgICAgICAgdGhpcy50eXBlID0gT2JqZWN0LmtleXMoYmxvY2tzKVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBPYmplY3Qua2V5cyhibG9ja3MpLmxlbmd0aCldO1xuICAgICAgICB0aGlzLnNoYXBlSW5kZXggPSAwO1xuICAgICAgICB0aGlzLnNoYXBlID0gYmxvY2tzW3RoaXMudHlwZSBhcyBrZXlvZiB0eXBlb2YgYmxvY2tzXS52YWx1ZXNbdGhpcy5zaGFwZUluZGV4XSBhcyBudW1iZXJbXTtcbiAgICAgICAgdGhpcy5jb2xvciA9IGJsb2Nrc1t0aGlzLnR5cGUgYXMga2V5b2YgdHlwZW9mIGJsb2Nrc10uY29sb3I7XG4gICAgICAgIHRoaXMucGxhY2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucG9zID0ge1xuICAgICAgICAgICAgeDogdGhpcy5ibG9ja1NpemUgKiA1LFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zb2xlLmxvZyhgSW5pdGlhbGlzZWQgQmxvY2sgVHlwZTogJHt0aGlzLnR5cGV9YCk7XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgZm9yKGNvbnN0IFtpZHgsIHZhbF0gb2YgQXJyYXkuZnJvbSh0aGlzLnNoYXBlLmVudHJpZXMoKSkpIHtcbiAgICAgICAgICAgIGlmICghdmFsKSBjb250aW51ZTtcblxuICAgICAgICAgICAgY29uc3QgeU9mZnNldCA9IE1hdGguZmxvb3IoaWR4IC8gNCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MueCArICh0aGlzLmJsb2NrU2l6ZSAqIChpZHggLSAoNCAqICh5T2Zmc2V0ID8/IDEpKSkpLFxuICAgICAgICAgICAgICAgIHRoaXMucG9zLnkgKyAodGhpcy5ibG9ja1NpemUgKiAoeU9mZnNldCA/PyAxKSksXG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja1NpemUsIFxuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tTaXplXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcm90YXRlKCkge1xuICAgICAgICBpZiAoYmxvY2tzW3RoaXMudHlwZSBhcyBrZXlvZiB0eXBlb2YgYmxvY2tzXS52YWx1ZXNbdGhpcy5zaGFwZUluZGV4ICsgMV0pIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGVJbmRleCArPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hhcGVJbmRleCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGVJbmRleCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNoYXBlID0gYmxvY2tzW3RoaXMudHlwZSBhcyBrZXlvZiB0eXBlb2YgYmxvY2tzXS52YWx1ZXNbdGhpcy5zaGFwZUluZGV4XSBhcyBudW1iZXJbXTtcbiAgICB9XG5cbiAgICBtb3ZlKGRpcmVjdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0JyAmJiB0aGlzLnBvcy54ID4gMCkgdGhpcy5wb3MueCAtPSB0aGlzLmJsb2NrU2l6ZTtcbiAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnICYmIHRoaXMucG9zLnggPCAodGhpcy5jYW52YXMud2lkdGggLSAodGhpcy5ibG9ja1NpemUgKiAzKSkpIHRoaXMucG9zLnggKz0gdGhpcy5ibG9ja1NpemU7XG4gICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rvd24nICYmIHRoaXMucG9zLnkgPCAodGhpcy5jYW52YXMuaGVpZ2h0IC0gKHRoaXMuYmxvY2tTaXplICogMykpKSB0aGlzLnBvcy55ICs9IHRoaXMuYmxvY2tTaXplO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmxvY2s7IiwiaW1wb3J0IEJsb2NrIGZyb20gXCIuL0Jsb2NrL0Jsb2NrXCI7XG5cbmNsYXNzIEdhbWUge1xuICAgIGJsb2NrU2l6ZTogbnVtYmVyO1xuICAgIGZwczogbnVtYmVyO1xuICAgIG5vdzogbnVsbCB8IG51bWJlcjtcbiAgICB0aGVuOiBudW1iZXI7XG4gICAgaW50ZXJ2YWw6IG51bWJlcjtcbiAgICBkZWx0YTogbnVsbCB8IG51bWJlcjtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgZ3JpZDogbnVtYmVyW107XG4gICAgYWN0aXZlQmxvY2s6IEJsb2NrIHwgbnVsbDtcbiAgICBpc01vdmluZzogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBmcHM6IG51bWJlcixcbiAgICAgICAgd2lkdGg6IG51bWJlcixcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgICAgIGJsb2NrU2l6ZTogbnVtYmVyLFxuICAgICkge1xuICAgICAgICB0aGlzLmJsb2NrU2l6ZSA9IGJsb2NrU2l6ZTtcbiAgICAgICAgdGhpcy5mcHMgPSBmcHM7XG4gICAgICAgIHRoaXMubm93ID0gbnVsbDtcbiAgICAgICAgdGhpcy50aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IDEwMDAgLyBmcHM7XG4gICAgICAgIHRoaXMuZGVsdGEgPSBudWxsO1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY3JlZW4nKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICAgICAgdGhpcy5ncmlkID0gbmV3IEFycmF5KFxuICAgICAgICAgICAgKHRoaXMuaGVpZ2h0IC8gdGhpcy5ibG9ja1NpemUpICogKHRoaXMud2lkdGggLyB0aGlzLmJsb2NrU2l6ZSlcbiAgICAgICAgKS5maWxsKDApO1xuICAgICAgICB0aGlzLmFjdGl2ZUJsb2NrID0gbnVsbDtcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JpZCk7XG5cbiAgICAgICAgdGhpcy5zZXR1cCgpO1xuICAgIH1cblxuICAgIHNldHVwKCkge1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5hY3RpdmVCbG9jayB8fCB0aGlzLmFjdGl2ZUJsb2NrLnBsYWNlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSAndycpIHRoaXMuYWN0aXZlQmxvY2sucm90YXRlKCk7XG4gICAgICAgICAgICBlbHNlIGlmIChlLmtleSA9PT0gJ2EnKSB0aGlzLmFjdGl2ZUJsb2NrLm1vdmUoJ2xlZnQnKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5ID09PSAncycpIHRoaXMuYWN0aXZlQmxvY2subW92ZSgnZG93bicpO1xuICAgICAgICAgICAgZWxzZSBpZiAoZS5rZXkgPT09ICdkJykgdGhpcy5hY3RpdmVCbG9jay5tb3ZlKCdyaWdodCcpO1xuXG4gICAgICAgICAgICB0aGlzLmNoZWNrKCk7XG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQmxvY2suZHJhdygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBjaGVjaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZUJsb2NrKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHlCcmVhayA9IE1hdGguZmxvb3IoKHRoaXMud2lkdGggLyB0aGlzLmJsb2NrU2l6ZSkpO1xuICAgICAgICBsZXQgaGl0QmxvY2sgPSBmYWxzZTtcblxuICAgICAgICBmb3IoY29uc3QgW2ksIHZdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuYWN0aXZlQmxvY2suc2hhcGUpKSB7XG4gICAgICAgICAgICBpZiAodiAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHhUb0NoZWNrID0gKHRoaXMuYWN0aXZlQmxvY2sucG9zLnggLyB0aGlzLmJsb2NrU2l6ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeVRvQ2hlY2sgPSAodGhpcy5hY3RpdmVCbG9jay5wb3MueSAvIHRoaXMuYmxvY2tTaXplKSArIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgeU9mZnNldCA9IChNYXRoLmZsb29yKChwYXJzZUludChpKSkgLyA0KSAqIHlCcmVhayk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRQb2ludCA9ICh5VG9DaGVjayAqIHlCcmVhaykgKyB4VG9DaGVjaztcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYWNlVG9DaGVjayA9IChzdGFydFBvaW50ICsgTWF0aC5mbG9vcihwYXJzZUludChpKSAlIDQpICsgeU9mZnNldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ncmlkW3NwYWNlVG9DaGVja10gIT09IDAgfHwgc3BhY2VUb0NoZWNrID4gdGhpcy5ncmlkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdyaWRbc3BhY2VUb0NoZWNrXSk7XG4gICAgICAgICAgICAgICAgICAgIGhpdEJsb2NrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFoaXRCbG9jaykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGZvcihjb25zdCBbaSwgdl0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5hY3RpdmVCbG9jay5zaGFwZSkpIHtcbiAgICAgICAgICAgIGlmICh2ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeFRvQ2hlY2sgPSAodGhpcy5hY3RpdmVCbG9jay5wb3MueCAvIHRoaXMuYmxvY2tTaXplKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5VG9DaGVjayA9ICh0aGlzLmFjdGl2ZUJsb2NrLnBvcy55IC8gdGhpcy5ibG9ja1NpemUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHlPZmZzZXQgPSAoTWF0aC5mbG9vcigocGFyc2VJbnQoaSkpIC8gNCkgKiB5QnJlYWspO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0UG9pbnQgPSAoeVRvQ2hlY2sgKiB5QnJlYWspICsgeFRvQ2hlY2s7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbKHN0YXJ0UG9pbnQgKyBNYXRoLmZsb29yKHBhcnNlSW50KGkpICUgNCkgKyB5T2Zmc2V0KV0gPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hY3RpdmVCbG9jay5wbGFjZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgY29uc3QgY29sb3JzID0gWydibGFjaycsICdvcmFuZ2UnLCAnYmx1ZScsICdyZWQnLCAnZ3JlZW4nLCAnY3lhbicsICdwdXJwbGUnLCAneWVsbG93J107XG5cbiAgICAgICAgZm9yKGNvbnN0IFtpLCB2XSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmdyaWQpKSB7XG4gICAgICAgICAgICBpZiAodiA9PT0gMCkgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHhPZmZzZXQgPSBNYXRoLmZsb29yKCh0aGlzLmhlaWdodCAvIHRoaXMuYmxvY2tTaXplKSk7XG4gICAgICAgICAgICBjb25zdCB5T2Zmc2V0ID0gTWF0aC5mbG9vcigodGhpcy53aWR0aCAvIHRoaXMuYmxvY2tTaXplKSk7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvcnNbdl07XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKHBhcnNlSW50KGkpICUgeU9mZnNldCkgKiB0aGlzLmJsb2NrU2l6ZSwgXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihwYXJzZUludChpKSAvIHlPZmZzZXQpICogdGhpcy5ibG9ja1NpemUsIFxuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tTaXplLCBcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrU2l6ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBtYWluKCkge1xuICAgICAgICB0aGlzLmRyYXcoKTtcblxuICAgICAgICBpZiAoIXRoaXMuYWN0aXZlQmxvY2sgfHwgdGhpcy5hY3RpdmVCbG9jaz8ucGxhY2VkKSB0aGlzLmFjdGl2ZUJsb2NrID0gbmV3IEJsb2NrKHRoaXMuY2FudmFzLCB0aGlzLmN0eCwgdGhpcy5ibG9ja1NpemUpO1xuICAgICAgICB0aGlzLmNoZWNrKCk7XG4gICAgICAgIHRoaXMuYWN0aXZlQmxvY2suZHJhdygpO1xuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUJsb2NrLnBvcy55ICsgKHRoaXMuYmxvY2tTaXplICogMikgPCAodGhpcy5jYW52YXMuaGVpZ2h0IC0gdGhpcy5ibG9ja1NpemUpKSB0aGlzLmFjdGl2ZUJsb2NrLnBvcy55ICs9IHRoaXMuYmxvY2tTaXplO1xuICAgICAgICBlbHNlIHRoaXMuYWN0aXZlQmxvY2sucGxhY2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgcGxheSgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMucGxheSgpKTtcblxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBlbGFwc2VkID0gbm93IC0gdGhpcy50aGVuO1xuICAgICAgICBcbiAgICAgICAgaWYgKGVsYXBzZWQgPiB0aGlzLmludGVydmFsICYmICF0aGlzLmlzTW92aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4gPSBub3cgLSAoZWxhcHNlZCAlIHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5tYWluKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHYW1lIGZyb20gJy4vY29tcG9uZW50cy9HYW1lJztcblxuY29uc3QgRlJBTUVfUkFURSA9IDE7XG5jb25zdCBXSURUSCA9IDMwMDtcbmNvbnN0IEhFSUdIVCA9IDUwMDtcbmNvbnN0IEJMT0NLX1NJWkUgPSAyMDtcblxuY29uc3QgZ2FtZSA9IG5ldyBHYW1lKFxuICAgIEZSQU1FX1JBVEUsXG4gICAgV0lEVEgsXG4gICAgSEVJR0hULFxuICAgIEJMT0NLX1NJWkUsXG4pO1xuXG5nYW1lLnBsYXkoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=