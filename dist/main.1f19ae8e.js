// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/Background.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Star = /*#__PURE__*/function () {
  function Star(ctx, canvas) {
    _classCallCheck(this, Star);

    this.canvas = canvas;
    this.ctx = ctx;
    this.active = true;
    this.x = Math.floor(Math.random() * this.canvas.width);
    this.y = 0;
    this.dest = Math.random();
    this.color = "rgba(255, 255, 255, ".concat(this.dest, ")");
    this.xVelocity = 0;
    this.yVelocity = this.dest > 0.7 ? 20 : this.dest > 0.5 ? 10 : 5;
    this.active = true;

    this.inBounds = function () {
      return this.x >= 0 && this.x <= this.canvas.width && this.y >= 0 && this.y <= this.canvas.height;
    };
  }

  _createClass(Star, [{
    key: "draw",
    value: function draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, 3, 3);
    }
  }, {
    key: "update",
    value: function update() {
      this.y += this.yVelocity / 10;
      this.active = this.active && this.inBounds();
    }
  }]);

  return Star;
}();

var Background = /*#__PURE__*/function () {
  function Background(ctx, canvas) {
    _classCallCheck(this, Background);

    this.canvas = canvas;
    this.ctx = ctx;
    this.color = 'black';
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.stars = [];
  }

  _createClass(Background, [{
    key: "drawStars",
    value: function drawStars() {
      if (Math.round(Math.random() * 20) == 1) {
        this.stars.push(new Star(this.ctx, this.canvas));
      }

      ;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawStars();
      this.stars.map(function (star) {
        star.draw();
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.stars.map(function (star) {
        star.update();
      });
      this.stars = this.stars.filter(function (star) {
        return star.active;
      });
    }
  }]);

  return Background;
}();

exports.default = Background;
;
},{}],"js/Person.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Person = /*#__PURE__*/function () {
  function Person(ctx, x, y, canvas) {
    _classCallCheck(this, Person);

    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.age = Math.floor(Math.random() * 128);
    this.xVelocity = 0;
    this.yVelocity = 1;
    this.width = 32;
    this.height = 32;
    this.active = true;
    this.canvas = canvas;
    this.image = new Image();

    this.inBounds = function () {
      return this.x >= 0 && this.x <= this.canvas.width && this.y >= 0 && this.y <= this.canvas.height;
    };
  }

  _createClass(Person, [{
    key: "draw",
    value: function draw(imgSrc) {
      //this.ctx.fillStyle = this.color;
      //this.ctx.fillRect(this.x, this.y, 32, 32);
      this.image.src = imgSrc;
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }, {
    key: "explode",
    value: function explode() {
      this.active = false;
      ;
    }
  }, {
    key: "update",
    value: function update() {
      this.x += this.xVelocity;
      this.y += this.yVelocity / 2;
      this.xVelocity = 3 * Math.sin(this.age * Math.PI / 64);
      this.age++;
      this.active = this.active && this.inBounds();
    }
  }]);

  return Person;
}();

exports.default = Person;
;
},{}],"js/Bullet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bullet = /*#__PURE__*/function () {
  function Bullet(ctx, x, y, config) {
    _classCallCheck(this, Bullet);

    this.active = true;
    this.config = config;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 3;
    this.height = 3;
    this.xVelocity = 0;
    this.yVelocity = -5;

    this.inBounds = function () {
      return this.x >= 0 && this.x <= this.config.width && this.y >= 0 && this.y <= this.config.height;
    };
  }

  _createClass(Bullet, [{
    key: "draw",
    value: function draw() {
      this.ctx.fillStyle = 'orange';
      this.ctx.fillRect(this.x, this.y, this.width, this.height + 3);
    }
  }, {
    key: "update",
    value: function update() {
      this.y += this.yVelocity;
      this.x += this.xVelocity;
      this.active = this.active && this.inBounds();
    }
  }]);

  return Bullet;
}();

exports.default = Bullet;
},{}],"js/Player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Person2 = _interopRequireDefault(require("./Person.js"));

var _Bullet = _interopRequireDefault(require("./Bullet.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Player = /*#__PURE__*/function (_Person) {
  _inherits(Player, _Person);

  var _super = _createSuper(Player);

  function Player(ctx, x, y, config) {
    var _this;

    _classCallCheck(this, Player);

    _this = _super.call(this, ctx, x, y);
    _this.config = config;
    _this.color = 'blue';
    _this.width = 21;
    _this.height = 21;
    _this.active = true;
    _this.playerBullets = [];

    _this.midpoint = function () {
      return {
        x: this.x + this.width / 2,
        y: this.y
      };
    };

    return _this;
  }

  _createClass(Player, [{
    key: "shoot",
    value: function shoot() {
      var bulletPosition = this.midpoint();
      this.playerBullets.push(new _Bullet.default(this.ctx, bulletPosition.x, bulletPosition.y, this.config));
    }
  }, {
    key: "explode",
    value: function explode() {
      this.active = false;
    }
  }]);

  return Player;
}(_Person2.default);

;
var _default = Player;
exports.default = _default;
},{"./Person.js":"js/Person.js","./Bullet.js":"js/Bullet.js"}],"js/UI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UI = /*#__PURE__*/function () {
  function UI(ctx, config) {
    _classCallCheck(this, UI);

    this.ctx = ctx;
    this.config = config;
  }

  _createClass(UI, [{
    key: "draw",
    value: function draw() {}
  }]);

  return UI;
}();

exports.default = UI;
},{}],"js/Enemy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Person2 = _interopRequireDefault(require("./Person.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Enemy = /*#__PURE__*/function (_Person) {
  _inherits(Enemy, _Person);

  var _super = _createSuper(Enemy);

  function Enemy(ctx, x, y, canvas) {
    var _this;

    _classCallCheck(this, Enemy);

    _this = _super.call(this, ctx, x, y, canvas);
    _this.color = 'red';
    _this.x = Math.round(_this.canvas.width / 4 + Math.random() * _this.canvas.width / 2);
    _this.yVelocity = 3;
    _this.width = 16;
    _this.height = 16;
    return _this;
  }

  _createClass(Enemy, [{
    key: "explode",
    value: function explode() {
      this.active = false;
    }
  }]);

  return Enemy;
}(_Person2.default);

;
var _default = Enemy;
exports.default = _default;
},{"./Person.js":"js/Person.js"}],"js/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Background = _interopRequireDefault(require("./Background.js"));

var _Player = _interopRequireDefault(require("./Player.js"));

var _UI = _interopRequireDefault(require("./UI.js"));

var _Enemy = _interopRequireDefault(require("./Enemy.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var config = {
  width: 320,
  height: 280
};
var level = {};

var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);

    this.config = config;
    this.level = level;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ui = document.createElement('div');
    this.ui.className = 'ui';
    this.keyboardController();
    document.querySelector('#screen').appendChild(this.canvas);
    document.querySelector('#screen').appendChild(this.ui);
    this.canvas.width = this.config.width;
    this.canvas.height = this.config.height;
    this.enemies = [];
    this.score = 0;
    this.bg = new _Background.default(this.ctx, this.config);
    this.player = new _Player.default(this.ctx, this.canvas.width / 2, this.canvas.height - 48, this.config);
  }

  _createClass(Game, [{
    key: "keyboardController",
    value: function keyboardController() {
      var _this = this;

      document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
          case 87:
            // w
            _this.player.y -= 32;
            break;

          case 65:
            // a
            _this.player.x -= 32;
            break;

          case 83:
            // s
            _this.player.y += 32;
            break;

          case 68:
            // d
            _this.player.x += 32;
            break;

          case 32:
            // space
            _this.player.shoot();

            break;
        }
      });
    }
  }, {
    key: "isCollide",
    value: function isCollide(a, b) {
      return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
    }
  }, {
    key: "handleCollision",
    value: function handleCollision() {
      var _this2 = this;

      this.player.playerBullets.map(function (bullet) {
        _this2.enemies.map(function (enemy) {
          if (_this2.isCollide(bullet, enemy)) {
            enemy.explode();
            _this2.score += 100;
            bullet.active = false;
          }
        });
      });
      this.enemies.map(function (enemy) {
        if (_this2.isCollide(enemy, _this2.player)) {
          enemy.explode();

          _this2.player.explode();
        }
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.bg.draw();
      this.player.draw('./images/player.png');
      this.enemies.map(function (enemy) {
        enemy.draw('./images/enemy.png');
      });
      this.player.playerBullets.map(function (bullet) {
        bullet.draw();
      });
    }
  }, {
    key: "update",
    value: function update() {
      // Screen collision
      if (this.player.x + this.player.width > this.canvas.width) {
        this.player.x = this.canvas.width - this.player.width;
      }

      if (this.player.x < 0) {
        this.player.x = 0;
      }

      if (this.player.y + this.player.height > this.canvas.height) {
        this.player.y = this.canvas.height - this.player.height;
      }

      if (this.player.y < 0) {
        this.player.y = 0;
      }

      this.ui.textContent = this.score;
      this.handleCollision();
      this.player.playerBullets.map(function (bullet) {
        return bullet.update();
      });
      this.enemies.map(function (enemy) {
        return enemy.update();
      });
      this.bg.update();
      this.enemies = this.enemies.filter(function (enemy) {
        return enemy.active;
      });
      this.player.playerBullets = this.player.playerBullets.filter(function (bullet) {
        return bullet.active;
      });

      if (Math.round(Math.random() * 90) == 1) {
        this.enemies.push(new _Enemy.default(this.ctx, 0, 0, this.config));
      }

      ;
    }
  }, {
    key: "run",
    value: function run() {
      var _this3 = this;

      this.draw();
      this.update();
      requestAnimationFrame(function () {
        return _this3.run();
      });
    }
  }]);

  return Game;
}();

exports.default = Game;
;
},{"./Background.js":"js/Background.js","./Player.js":"js/Player.js","./UI.js":"js/UI.js","./Enemy.js":"js/Enemy.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _Game = _interopRequireDefault(require("./js/Game.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _Game.default();
game.run();
},{"./js/Game.js":"js/Game.js"}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50566" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map