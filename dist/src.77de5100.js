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
})({"config.json":[function(require,module,exports) {
module.exports = {
  "width": 255,
  "height": 240,
  "title": "SpaceShooter"
};
},{}],"helpers/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkBoundsCollide = void 0;

var config_json_1 = __importDefault(require("../config.json"));

var screen = {
  size: {
    x: config_json_1.default.width,
    y: config_json_1.default.height
  }
};

function checkBoundsCollide(obj, boundBox) {
  if (boundBox === void 0) {
    boundBox = screen;
  }

  return obj.pos.x >= 0 && obj.pos.x <= boundBox.size.x && obj.pos.y >= 0 && obj.pos.y <= boundBox.size.y;
}

exports.checkBoundsCollide = checkBoundsCollide;
},{"../config.json":"config.json"}],"modules/Vec2.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vec2 = void 0;

var Vec2 =
/** @class */
function () {
  function Vec2(x, y) {
    this.x = x;
    this.y = y;
  }

  Vec2.prototype.set = function (x, y) {
    this.x = x;
    this.y = y;
  };

  return Vec2;
}();

exports.Vec2 = Vec2;
},{}],"modules/Background.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var helpers_1 = require("../helpers");

var Vec2_1 = require("./Vec2");

var Star =
/** @class */
function () {
  function Star(pos, speed, size) {
    if (speed === void 0) {
      speed = 1;
    }

    this.pos = pos;
    this.speed = speed;
    this.size = size;
    this.active = true;
    this.vel = new Vec2_1.Vec2(0, 1);
    this.color = "rgba(255, 255, 255, " + this.speed / 2 + ")";
  }

  Star.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    var circle = new Path2D();
    circle.arc(this.pos.x, this.pos.y, this.size.x, 0, 2 * Math.PI);
    ctx.fill(circle);
  };

  Star.prototype.update = function () {
    this.pos.y += this.vel.y * this.speed;
    this.active = this.active && helpers_1.checkBoundsCollide(this);
  };

  return Star;
}();

var Background =
/** @class */
function () {
  function Background() {
    this.color = 'black';
    this.stars = [];
  }

  Background.prototype.drawStars = function (ctx) {
    var random = Math.floor(Math.random() * Math.floor(10));
    var speed = random;
    var size = new Vec2_1.Vec2(2 / speed, 5 / speed);
    var position = new Vec2_1.Vec2(Math.floor(Math.random() * ctx.canvas.width), 0);

    if (Math.round(Math.random() * 5) === 1) {
      this.stars.push(new Star(position, speed, size));
    }
  };

  Background.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.drawStars(ctx);
    this.stars.map(function (star) {
      star.draw(ctx);
    });
  };

  Background.prototype.update = function () {
    this.stars.map(function (star) {
      star.update();
    });
    this.stars = this.stars.filter(function (star) {
      return star.active;
    });
  };

  return Background;
}();

exports.default = Background;
},{"../helpers":"helpers/index.ts","./Vec2":"modules/Vec2.ts"}],"modules/GameObject.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Vec2_1 = require("./Vec2");

var GameObject =
/** @class */
function () {
  function GameObject(ctx, pos, sprite, size) {
    if (size === void 0) {
      size = new Vec2_1.Vec2(16, 16);
    }

    this.ctx = ctx;
    this.pos = pos;
    this.sprite = sprite;
    this.size = size;
    this.canvas = ctx.canvas;
    this.image = new Image();
    this.pos = new Vec2_1.Vec2(pos.x, pos.y);
    this.active = true;
  }

  GameObject.prototype.isBounds = function () {
    return this.pos.x >= 0 && this.pos.x <= this.canvas.width && this.pos.y >= 0 && this.pos.y <= this.canvas.height;
  };

  GameObject.prototype.draw = function (ctx) {
    ctx.drawImage(this.sprite, this.pos.x, this.pos.y);
  };

  GameObject.prototype.explode = function () {
    this.active = false;
  };

  GameObject.prototype.update = function () {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y / 2;
  };

  return GameObject;
}();

exports.default = GameObject;
},{"./Vec2":"modules/Vec2.ts"}],"modules/Bullet.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Vec2_1 = require("./Vec2");

var Bullet =
/** @class */
function () {
  function Bullet(x, y) {
    this.active = true;
    this.pos = new Vec2_1.Vec2(x, y);
    this.size = new Vec2_1.Vec2(1, 3);
    this.vel = new Vec2_1.Vec2(0, -5);
  }

  Bullet.prototype.draw = function (ctx) {
    ctx.fillStyle = 'orange';
    ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y + 3);
  };

  Bullet.prototype.update = function () {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  };

  return Bullet;
}();

exports.default = Bullet;
},{"./Vec2":"modules/Vec2.ts"}],"modules/Player.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameObject_1 = __importDefault(require("./GameObject"));

var Bullet_1 = __importDefault(require("./Bullet"));

var Vec2_1 = require("./Vec2");

var Player =
/** @class */
function (_super) {
  __extends(Player, _super);

  function Player(ctx, pos, sprite) {
    if (pos === void 0) {
      pos = new Vec2_1.Vec2(0, 0);
    }

    var _this = _super.call(this, ctx, pos, sprite, new Vec2_1.Vec2(16, 16)) || this;

    _this.ctx = ctx;
    _this.pos = pos;
    _this.sprite = sprite;
    _this.active = true;
    _this.playerBullets = [];
    _this.vel = new Vec2_1.Vec2(0, 0);
    return _this;
  } // Bullet starts in the center of the player


  Player.prototype.moveToMidpoint = function () {
    return {
      x: this.pos.x + this.size.x / 2,
      y: this.pos.y
    };
  };

  Player.prototype.shoot = function () {
    var bulletPosition = this.moveToMidpoint();
    this.playerBullets.push(new Bullet_1.default(bulletPosition.x, bulletPosition.y));
  };

  Player.prototype.explode = function () {
    this.active = false;
  };

  Player.prototype.update = function () {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  };

  return Player;
}(GameObject_1.default);

exports.default = Player;
},{"./GameObject":"modules/GameObject.ts","./Bullet":"modules/Bullet.ts","./Vec2":"modules/Vec2.ts"}],"modules/Screen.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Vec2_1 = require("./Vec2");

var Screen =
/** @class */
function () {
  function Screen(size) {
    if (size === void 0) {
      size = new Vec2_1.Vec2(255, 240);
    }

    this.size = size;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.size.x;
    this.canvas.height = this.size.y;
  }

  Screen.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
  };

  Screen.prototype.mount = function () {
    var container = document.createElement('div');
    container.setAttribute('id', 'screen');
    container.append(this.canvas);
    document.body.append(container);
  };

  return Screen;
}();

exports.default = Screen;
},{"./Vec2":"modules/Vec2.ts"}],"modules/Enemy.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameObject_1 = __importDefault(require("./GameObject"));

var Vec2_1 = require("./Vec2");

var Enemy =
/** @class */
function (_super) {
  __extends(Enemy, _super);

  function Enemy(ctx, pos, sprite) {
    var _this = _super.call(this, ctx, pos, sprite, new Vec2_1.Vec2(16, 16)) || this;

    _this.age = Math.floor(Math.random() * 128);
    _this.pos.x = Math.round(ctx.canvas.width / 4 + Math.random() * ctx.canvas.width / 2);
    _this.vel = new Vec2_1.Vec2(0, 3);
    return _this;
  }

  Enemy.prototype.explode = function () {
    this.active = false;
  };

  Enemy.prototype.update = function () {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y / 2;
    this.vel.x = 3 * Math.sin(this.age * Math.PI / 64);
    this.age++;
    this.active = this.active && this.isBounds();
  };

  return Enemy;
}(GameObject_1.default);

exports.default = Enemy;
},{"./GameObject":"modules/GameObject.ts","./Vec2":"modules/Vec2.ts"}],"modules/Sprite.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sprite = void 0;

var Vec2_1 = require("./Vec2");

var Sprite =
/** @class */
function () {
  function Sprite(image, name, spritesheet, size) {
    if (size === void 0) {
      size = new Vec2_1.Vec2(8, 8);
    }

    this.image = image;
    this.name = name;
    this.spritesheet = spritesheet;
    this.size = size;
    this.canvas = document.createElement('canvas'); // Set canvas size

    this.canvas.width = this.size.x;
    this.canvas.height = this.size.y; // Get context

    this.ctx = this.canvas.getContext('2d');
    var pos = this.getPosition(); // Draw image on the canvas

    this.ctx.drawImage(this.image, pos.x, pos.y, this.size.x, this.size.y, 0, 0, this.size.x, this.size.y);
    this.sprite = new Image();
    this.sprite.src = this.canvas.toDataURL();
  }

  Sprite.prototype.getPosition = function () {
    var el = this.spritesheet[this.name] || [0, 0];
    return new Vec2_1.Vec2(el[0], el[1]);
  };

  return Sprite;
}();

exports.Sprite = Sprite;
},{"./Vec2":"modules/Vec2.ts"}],"modules/FontRenderer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Sprite_1 = require("./Sprite");

var Vec2_1 = require("./Vec2");

var FontRenderer =
/** @class */
function () {
  function FontRenderer(font, fontsheet, size) {
    if (size === void 0) {
      size = new Vec2_1.Vec2(8, 8);
    }

    this.font = font;
    this.fontsheet = fontsheet;
    this.size = size;
  }

  FontRenderer.prototype.drawText = function (ctx, message, pos) {
    var _this = this;

    if (pos === void 0) {
      pos = new Vec2_1.Vec2(0, 0);
    }

    var xOffset = 0;
    var yOffset = 0;
    message.split('').forEach(function (char) {
      var sprite = new Sprite_1.Sprite(_this.font, char, _this.fontsheet, new Vec2_1.Vec2(8, 8));
      ctx.drawImage(sprite.sprite, pos.x + xOffset, pos.y);
      xOffset += _this.size.x;
    });
  };

  return FontRenderer;
}();

exports.default = FontRenderer;
},{"./Sprite":"modules/Sprite.ts","./Vec2":"modules/Vec2.ts"}],"images/font.png":[function(require,module,exports) {
module.exports = "/font.6c31cbe7.png";
},{}],"images/font.json":[function(require,module,exports) {
module.exports = {
  "A": [8, 0],
  "B": [16, 0],
  "C": [24, 0],
  "D": [32, 0],
  "E": [40, 0],
  "F": [48, 0],
  "G": [56, 0],
  "H": [64, 0],
  "I": [72, 0],
  "J": [80, 0],
  "K": [88, 0],
  "L": [96, 0],
  "M": [104, 0],
  "N": [112, 0],
  "O": [120, 0],
  "P": [0, 8],
  "Q": [8, 8],
  "R": [16, 8],
  "S": [24, 8],
  "T": [32, 8],
  "U": [40, 0],
  "V": [48, 0],
  "W": [56, 0],
  "X": [80, 0],
  "Y": [80, 0],
  "Z": [80, 0],
  "0": [0, 16],
  "1": [8, 16],
  "2": [16, 16],
  "3": [24, 16],
  "4": [32, 16],
  "5": [40, 16],
  "6": [48, 16],
  "7": [56, 16],
  "8": [64, 16],
  "9": [72, 16]
};
},{}],"images/spritesheet.png":[function(require,module,exports) {
module.exports = "/spritesheet.ed2d5e51.png";
},{}],"images/spritesheet.json":[function(require,module,exports) {
module.exports = {
  "player": [0, 0],
  "enemy": [16, 0]
};
},{}],"modules/Game.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Background_1 = __importDefault(require("./Background"));

var Player_1 = __importDefault(require("./Player"));

var Screen_1 = __importDefault(require("./Screen"));

var Enemy_1 = __importDefault(require("./Enemy"));

var FontRenderer_1 = __importDefault(require("./FontRenderer"));

var helpers_1 = require("../helpers");

var font_png_1 = __importDefault(require("../images/font.png"));

var font_json_1 = __importDefault(require("../images/font.json"));

var spritesheet_png_1 = __importDefault(require("../images/spritesheet.png"));

var spritesheet_json_1 = __importDefault(require("../images/spritesheet.json"));

var Vec2_1 = require("./Vec2");

var Sprite_1 = require("./Sprite");

var level = {};

var Game =
/** @class */
function () {
  function Game(config) {
    var _this = this;

    this.config = config;
    this.level = level;
    this.ui = document.createElement('div');
    this.screen = new Screen_1.default(new Vec2_1.Vec2(this.config.width, this.config.height));
    this.ui.className = 'ui';
    this.initKeyboardController();
    this.enemies = [];
    this.score = 0;
    this.bg = new Background_1.default();
    this.sprite = new Image();
    this.sprite.src = spritesheet_png_1.default;
    this.font = new Image();
    this.font.src = font_png_1.default;
    this.loaded = 0;
    this.player = null;
    this.fontRenderer = null;

    this.sprite.onload = function () {
      // Sprite loaded
      _this.loaded++;

      _this.font.onload = function () {
        // Font loaded
        _this.loaded++;
        _this.fontRenderer = new FontRenderer_1.default(_this.font, font_json_1.default, new Vec2_1.Vec2(8, 8));
      };

      _this.player = new Player_1.default(_this.screen.ctx, new Vec2_1.Vec2(_this.screen.size.x / 2, _this.screen.size.y - 48), new Sprite_1.Sprite(_this.sprite, 'player', spritesheet_json_1.default, new Vec2_1.Vec2(16, 16)).sprite);
    };

    console.log(this);
  }

  Game.prototype.initKeyboardController = function () {
    var _this = this;

    document.addEventListener('keydown', function (event) {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          _this.player.pos.y -= 8;
          break;

        case 'KeyA':
        case 'ArrowLeft':
          _this.player.pos.x -= 8;
          break;

        case 'KeyS':
        case 'ArrowDown':
          _this.player.pos.y += 8;
          break;

        case 'KeyD':
        case 'ArrowRight':
          _this.player.pos.x += 8;
          break;

        case 'Space':
          _this.player.shoot();

          break;
      }
    });
  };

  Game.prototype.init = function () {
    this.initKeyboardController();
    this.screen.mount();
    this.run();
  };

  Game.prototype.isCollide = function (a, b) {
    return a.pos.x < b.pos.x + b.size.x && a.pos.x + a.size.x > b.pos.x && a.pos.y < b.pos.y + b.size.y && a.pos.y + a.size.y > b.pos.y;
  };

  Game.prototype.handleCollision = function () {
    var _this = this;

    this.player.playerBullets.map(function (bullet) {
      _this.enemies.map(function (enemy) {
        if (_this.isCollide(bullet, enemy)) {
          enemy.explode();
          _this.score += 100;
          bullet.active = false;
        }
      });
    });
    this.enemies.map(function (enemy) {
      if (_this.isCollide(enemy, _this.player)) {
        enemy.explode();

        _this.player.explode();
      }
    });
  };

  Game.prototype.draw = function (screen) {
    screen.clear(); // this.fontRenderer.drawText(screen.ctx, 'A')

    this.bg.draw(screen.ctx);
    this.player.draw(screen.ctx);
    this.enemies.map(function (enemy) {
      enemy.draw(screen.ctx);
    });
    this.player.playerBullets.map(function (bullet) {
      bullet.draw(screen.ctx);
    }); // this.fontRenderer.drawText(
    //   screen.ctx,
    //   `SCORE ${this.score.toString()}`,
    //   new Vec2(32, 32)
    // )
  };

  Game.prototype.update = function () {
    // Screen collision
    if (this.player.pos.x + this.player.size.x > this.screen.size.x) {
      this.player.pos.x = this.screen.size.x - this.player.size.x;
    }

    if (this.player.pos.x < 0) {
      this.player.pos.x = 0;
    }

    if (this.player.pos.y + this.player.size.y > this.screen.size.y) {
      this.player.pos.y = this.screen.size.x - this.player.size.y;
    }

    if (this.player.pos.y < 0) {
      this.player.pos.y = 0;
    }

    this.ui.textContent = this.score.toString();
    this.handleCollision();
    this.player.playerBullets.map(function (bullet) {
      if (!helpers_1.checkBoundsCollide(bullet)) {
        bullet.active = false;
      } else {
        bullet.update();
      }
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
      this.enemies.push(new Enemy_1.default(this.screen.ctx, {
        x: 0,
        y: 0
      }, new Sprite_1.Sprite(this.sprite, 'enemy', spritesheet_json_1.default, new Vec2_1.Vec2(16, 16)).sprite));
    }
  };

  Game.prototype.run = function () {
    var _this = this;

    if (this.loaded === 2) {
      this.draw(this.screen);
      this.update();
    }

    requestAnimationFrame(function () {
      return _this.run();
    });
  };

  return Game;
}();

exports.default = Game;
},{"./Background":"modules/Background.ts","./Player":"modules/Player.ts","./Screen":"modules/Screen.ts","./Enemy":"modules/Enemy.ts","./FontRenderer":"modules/FontRenderer.ts","../helpers":"helpers/index.ts","../images/font.png":"images/font.png","../images/font.json":"images/font.json","../images/spritesheet.png":"images/spritesheet.png","../images/spritesheet.json":"images/spritesheet.json","./Vec2":"modules/Vec2.ts","./Sprite":"modules/Sprite.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Game_1 = __importDefault(require("./modules/Game"));

var config_json_1 = __importDefault(require("./config.json"));

var game = new Game_1.default(config_json_1.default);
game.init();
},{"./modules/Game":"modules/Game.ts","./config.json":"config.json"}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61832" + '/');

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
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map