// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4UKJc":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "043affa210fd5d10be6d99797cacc1f4";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
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
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
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
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
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
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"3rfh7":[function(require,module,exports) {
var _modulesGame = require('./modules/Game');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _modulesGameDefault = _parcelHelpers.interopDefault(_modulesGame);
var _configJson = require('./config.json');
var _configJsonDefault = _parcelHelpers.interopDefault(_configJson);
const game = new _modulesGameDefault.default(_configJsonDefault.default);
game.init();

},{"./modules/Game":"6AGdE","./config.json":"3VXKW","@parcel/transformer-js/lib/esmodule-helpers.js":"5hfcV"}],"6AGdE":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _Background = require('./Background');
var _BackgroundDefault = _parcelHelpers.interopDefault(_Background);
var _Player = require('./Player');
var _PlayerDefault = _parcelHelpers.interopDefault(_Player);
var _Screen = require('./Screen');
var _ScreenDefault = _parcelHelpers.interopDefault(_Screen);
var _FontRenderer = require('./FontRenderer');
var _FontRendererDefault = _parcelHelpers.interopDefault(_FontRenderer);
var _helpers = require('../helpers');
var _urlImagesFontPng = require('url:../images/font.png');
var _urlImagesFontPngDefault = _parcelHelpers.interopDefault(_urlImagesFontPng);
var _imagesFontJson = require('../images/font.json');
var _imagesFontJsonDefault = _parcelHelpers.interopDefault(_imagesFontJson);
var _urlImagesSpritesheetPng = require('url:../images/spritesheet.png');
var _urlImagesSpritesheetPngDefault = _parcelHelpers.interopDefault(_urlImagesSpritesheetPng);
var _imagesSpritesheetJson = require('../images/spritesheet.json');
var _imagesSpritesheetJsonDefault = _parcelHelpers.interopDefault(_imagesSpritesheetJson);
var _urlImagesTilesetPng = require('url:../images/tileset.png');
var _urlImagesTilesetPngDefault = _parcelHelpers.interopDefault(_urlImagesTilesetPng);
var _imagesTilesetJson = require('../images/tileset.json');
var _imagesTilesetJsonDefault = _parcelHelpers.interopDefault(_imagesTilesetJson);
var _urlLevelsLevel01Png = require('url:../levels/level01.png');
var _urlLevelsLevel01PngDefault = _parcelHelpers.interopDefault(_urlLevelsLevel01Png);
var _Vec2D = require('./Vec2D');
var _Sprite = require('./Sprite');
var _Level = require('./Level');
var _AssetLoader = require('./AssetLoader');
const interval = cb => setInterval(cb, 1000);
const count = 0;
var COLORS;
(function (COLORS) {
  COLORS[COLORS["#000000"] = 0] = "#000000";
  COLORS[COLORS["#ffffff"] = 1] = "#ffffff";
  COLORS[COLORS["#ff0000"] = 2] = "#ff0000";
})(COLORS || (COLORS = {}));
function parseImageMap(image, callback) {
  const canvas = document.createElement('canvas');
  document.body.append(canvas);
  const dataMap = [];
  const imageWidth = image.width;
  const imageHeight = image.height;
  canvas.width = imageWidth;
  canvas.height = imageHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
  for (let y = 0; y < imageHeight; y++) {
    const arr = [];
    for (let x = 0; x < imageWidth; x++) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      arr.push(COLORS[_helpers.RGBAToHEX(pixel[0], pixel[1], pixel[2])]);
    }
    dataMap.push(arr);
  }
  return dataMap;
}
const scene = {
  levelMap: []
};
class Game {
  constructor(config) {
    this.config = config;
    this.ui = document.createElement('div');
    // this.scene = new SceneLoader();
    this.screen = new _ScreenDefault.default(new _Vec2D.Vec2D(this.config.width, this.config.height));
    this.ui.className = 'ui';
    this.enemies = [];
    this.bg = new _BackgroundDefault.default();
    this.state = {
      score: 0,
      playerSpeed: 3
    };
    this.assets = null;
    this.loaded = false;
    this.player = null;
    this.fontRenderer = null;
    this.level = null;
    new _AssetLoader.AssetLoader().load([_urlImagesFontPngDefault.default, _urlImagesTilesetPngDefault.default, _urlImagesSpritesheetPngDefault.default, _urlLevelsLevel01PngDefault.default]).then(assets => this.setup(assets));
  }
  setup(assets) {
    this.assets = assets;
    this.loaded = true;
    this.player = new _PlayerDefault.default(this.screen.ctx, new _Vec2D.Vec2D(this.screen.size.x / 2, this.screen.size.y - 48), new _Sprite.Sprite(this.assets.spritesheet, 'player', _imagesSpritesheetJsonDefault.default, new _Vec2D.Vec2D(16, 16)).sprite, this.state.playerSpeed);
    this.initKeyboardController();
    const levelMap = parseImageMap(this.assets.level01);
    this.level = new _Level.Level(this.assets.tileset, _imagesTilesetJsonDefault.default, levelMap);
    this.fontRenderer = new _FontRendererDefault.default(this.assets.font, _imagesFontJsonDefault.default, new _Vec2D.Vec2D(8, 8));
  }
  initKeyboardController() {
    const onKeyDown = e => {
      const {code} = e;
      switch (code) {
        case 'KeyD':
          this.level.moveRight();
          this.bg.vel.set(-1, this.bg.vel.y);
          break;
        case 'KeyW':
          this.level.moveUp();
          this.bg.vel.set(this.bg.vel.x, 1);
          break;
        case 'KeyS':
          this.level.moveDown();
          this.bg.vel.set(this.bg.vel.x, -1);
          break;
        case 'KeyA':
          this.level.moveLeft();
          this.bg.vel.set(1, this.bg.vel.y);
          break;
        case 'Space':
          this.player.shoot();
          break;
        default:
      }
    };
    const onKeyUp = e => {
      const {code} = e;
      switch (code) {
        case 'KeyD':
          this.level.stop('x');
          this.bg.stop('x');
          break;
        case 'KeyW':
          this.level.stop('y');
          this.bg.stop('y');
          break;
        case 'KeyS':
          this.level.stop('y');
          this.bg.stop('y');
          break;
        case 'KeyA':
          this.level.stop('x');
          this.bg.stop('x');
          break;
        default:
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  }
  init() {
    this.initKeyboardController();
    this.screen.mount();
    this.run();
  }
  isCollide(a, b) {
    return a.pos.x < b.pos.x + b.size.x && a.pos.x + a.size.x > b.pos.x && a.pos.y < b.pos.y + b.size.y && a.pos.y + a.size.y > b.pos.y;
  }
  handleCollision() {
    this.player.playerBullets.map(bullet => {
      this.enemies.map(enemy => {
        if (this.isCollide(bullet, enemy)) {
          enemy.explode();
          this.state.score += 100;
          bullet.active = false;
        }
      });
    });
    this.enemies.map(enemy => {
      if (this.isCollide(enemy, this.player)) {
        enemy.explode();
        this.player.explode();
      }
    });
  }
  draw(screen) {
    screen.clear();
    // this.fontRenderer.drawText(screen.ctx, 'A')
    this.level.draw(screen.ctx);
    // this.bg.draw(screen.ctx);
    this.player.draw(screen.ctx);
    this.enemies.map(enemy => {
      enemy.draw(screen.ctx);
    });
    this.player.playerBullets.map(bullet => {
      bullet.draw(screen.ctx);
    });
    this.fontRenderer.drawText(screen.ctx, `SCORE ${this.state.score.toString()}`, new _Vec2D.Vec2D(8, 8));
  }
  update() {
    this.level.update();
    this.player.update();
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
    this.ui.textContent = this.state.score.toString();
    this.handleCollision();
    this.player.playerBullets.map(bullet => {
      if (!_helpers.checkBoundsCollide(bullet)) {
        bullet.active = false;
      } else {
        bullet.update();
      }
    });
    this.enemies.map(enemy => enemy.update());
    // this.bg.update();
    this.enemies = this.enemies.filter(enemy => enemy.active);
    this.player.playerBullets = this.player.playerBullets.filter(bullet => bullet.active);
  }
  run() {
    if (this.loaded) {
      this.draw(this.screen);
      this.update();
    }
    requestAnimationFrame(() => this.run());
  }
}
exports.default = Game;

},{"./Background":"1eXLB","./Player":"7aGEO","./Screen":"2XSxh","./FontRenderer":"bowd3","../helpers":"1purJ","url:../images/font.png":"sHz5N","../images/font.json":"A8Jeh","url:../images/spritesheet.png":"5ZBpq","../images/spritesheet.json":"4CEr9","url:../images/tileset.png":"cU7IK","../images/tileset.json":"qCdBM","url:../levels/level01.png":"6eTbW","./Vec2D":"156E3","./Sprite":"5omqr","./Level":"3uyEM","./AssetLoader":"3v6ep","@parcel/transformer-js/lib/esmodule-helpers.js":"5hfcV"}],"1eXLB":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _helpers = require('../helpers');
var _Vec2D = require('./Vec2D');
class Star {
  constructor(pos, speed = 1, size) {
    this.pos = pos;
    this.speed = speed;
    this.size = size;
    this.active = true;
    this.vel = new _Vec2D.Vec2D(0, 0);
    this.color = `rgba(255, 255, 255, ${this.speed / 2})`;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    const circle = new Path2D();
    circle.arc(this.pos.x, this.pos.y, this.size.x, 0, 2 * Math.PI);
    ctx.fill(circle);
  }
  update(vel) {
    this.pos.y += vel.y * this.speed;
    this.pos.x += vel.x * this.speed;
    this.active = this.active && _helpers.checkBoundsCollide(this);
  }
}
class Background {
  constructor() {
    this.color = 'black';
    this.stars = [];
    this.vel = new _Vec2D.Vec2D(0, 0);
  }
  drawStars(ctx) {
    const random = Math.floor(Math.random() * Math.floor(10));
    const speed = random;
    const size = new _Vec2D.Vec2D(2 / speed, 5 / speed);
    if (this.stars.length < 50 && Math.round(Math.random() * 5) === 1) {
      let position = new _Vec2D.Vec2D(0, 0);
      // Camera move down
      if (this.vel.y = -1) {
        position = new _Vec2D.Vec2D(Math.floor(Math.random() * ctx.canvas.width), ctx.canvas.height);
      }
      if (this.vel.y = 1) {
        position = new _Vec2D.Vec2D(Math.floor(Math.random() * ctx.canvas.width), 0);
      }
      this.stars.push(new Star(position, speed, size));
    }
  }
  stop(d) {
    this.vel[d] = 0;
  }
  draw(ctx) {
    // ctx.fillStyle = this.color
    // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    this.drawStars(ctx);
    this.stars.map(star => {
      star.draw(ctx);
    });
  }
  update() {
    this.stars.map(star => {
      star.update(this.vel);
    });
    this.stars = this.stars.filter(star => star.active);
  }
}
exports.default = Background;

},{"../helpers":"1purJ","./Vec2D":"156E3","@parcel/transformer-js/lib/esmodule-helpers.js":"5hfcV"}],"1purJ":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "checkBoundsCollide", function () {
  return checkBoundsCollide;
});
_parcelHelpers.export(exports, "RGBAToHEX", function () {
  return RGBAToHEX;
});
var _configJson = require('../config.json');
var _configJsonDefault = _parcelHelpers.interopDefault(_configJson);
const screen = {
  size: {
    x: _configJsonDefault.default.width,
    y: _configJsonDefault.default.height
  }
};
function checkBoundsCollide(obj, boundBox = screen) {
  return obj.pos.x >= 0 && obj.pos.x <= boundBox.size.x && obj.pos.y >= 0 && obj.pos.y <= boundBox.size.y;
}
function RGBAToHEX(r = 0, g = 0, b = 0, a = 1) {
  let rHex = r.toString(16);
  let gHex = g.toString(16);
  let bHex = b.toString(16);
  if (rHex.length === 1) {
    rHex = `0${r}`;
  }
  if (gHex.length === 1) {
    gHex = `0${g}`;
  }
  if (bHex.length === 1) {
    bHex = `0${b}`;
  }
  return `#${rHex}${gHex}${bHex}`;
}

},{"../config.json":"3VXKW","@parcel/transformer-js/lib/esmodule-helpers.js":"5hfcV"}],"3VXKW":[function(require,module,exports) {
module.exports = JSON.parse("{\"width\":255,\"height\":240,\"title\":\"SpaceShooter\"}");
},{}],"5hfcV":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"156E3":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Vec2D", function () {
  return Vec2D;
});
class Vec2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  set(x, y) {
    this.x = x;
    this.y = y;
  }
  get() {
    return {
      x: this.x,
      y: this.y
    };
  }
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5hfcV"}],"7aGEO":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _GameObject = require('./GameObject');
var _GameObjectDefault = _parcelHelpers.interopDefault(_GameObject);
var _Bullet = require('./Bullet');
var _BulletDefault = _parcelHelpers.interopDefault(_Bullet);
var _Vec2D = require('./Vec2D');
class Player extends _GameObjectDefault.default {
  constructor(ctx, pos = new _Vec2D.Vec2D(0, 0), sprite, speed = 2) {
    super(ctx, pos, sprite, new _Vec2D.Vec2D(16, 16));
    this.ctx = ctx;
    this.pos = pos;
    this.sprite = sprite;
    this.speed = speed;
    this.active = true;
    this.playerBullets = [];
    this.vel = new _Vec2D.Vec2D(0, 0);
  }
  /*Bullet starts in the center of the player*/
  moveToMidpoint() {
    return {
      x: this.pos.x + 2,
      y: this.pos.y
    };
  }
  moveUp() {
    this.vel.set(this.vel.x, -1);
  }
  moveRight() {
    this.vel.set(1, this.vel.y);
  }
  moveDown() {
    this.vel.set(this.vel.x, 1);
  }
  moveLeft() {
    this.vel.set(-1, this.vel.y);
  }
  stop(d) {
    this.vel[d] = 0;
  }
  shoot() {
    let bulletPosition = this.moveToMidpoint();
    this.playerBullets.push(new _BulletDefault.default(bulletPosition.x, bulletPosition.y));
    this.playerBullets.push(new _BulletDefault.default(bulletPosition.x + 11, bulletPosition.y));
  }
  explode() {
    this.active = false;
  }
  update() {
    this.pos.set(this.pos.x + this.vel.x * this.speed, this.pos.y + this.vel.y * this.speed);
  }
}
exports.default = Player;

},{"./GameObject":"b8yEz","./Bullet":"5uxlq","./Vec2D":"156E3","@parcel/transformer-js/lib/esmodule-helpers.js":"5hfcV"}],"b8yEz":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _Vec2D = require('./Vec2D');
class GameObject {
  constructor(ctx, pos, sprite, size = new _Vec2D.Vec2D(16, 16)) {
    this.ctx = ctx;
    this.pos = pos;
    this.sprite = sprite;
    this.size = size;
    this.canvas = ctx.canvas;
    this.image = new Image();
    this.pos = new _Vec2D.Vec2D(pos.x, pos.y);
    this.active = true;
  }
  isBounds() {
    return this.pos.x >= 0 && this.pos.x <= this.canvas.width && this.pos.y >= 0 && this.pos.y <= this.canvas.height;
  }
  draw(ctx) {
    ctx.drawImage(this.sprite, this.pos.x, this.pos.y);
  }
  explode() {
    this.active = false;
  }
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y / 2;
  }
}
exports.default = GameObject;

},{"./Vec2D":"156E3","@parcel/transformer-js/lib/esmodule-helpers.js":"5hfcV"}],"5uxlq":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _Vec2D = require('./Vec2D');
class Bullet {
  constructor(x, y) {
    this.active = true;
    this.pos = new _Vec2D.Vec2D(x, y);
    this.size = new _Vec2D.Vec2D(1, 3);
    this.vel = new _Vec2D.Vec2D(0, -5);
  }
  draw(ctx) {
    ctx.fillStyle = 'orange';
    ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y + 3);
  }
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
}
exports.default = Bullet;

},{"./Vec2D":"156E3","@parcel/transformer-js/lib/esmodule-helpers.js":"5hfcV"}],"2XSxh":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _Vec2D = require('./Vec2D');
class Screen {
  constructor(size = new _Vec2D.Vec2D(255, 240)) {
    this.size = size;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.size.x;
    this.canvas.height = this.size.y;
  }
  clear() {
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
  }
  mount() {
    const container = document.createElement('div');
    container.setAttribute('id', 'screen');
    container.append(this.canvas);
    document.body.append(container);
  }
}
exports.default = Screen;

},{"./Vec2D":"156E3","@parcel/transformer-js/lib/esmodule-helpers.js":"5hfcV"}],"bowd3":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _Vec2D = require('./Vec2D');
class FontRenderer {
  constructor(font, fontsheet, position = new _Vec2D.Vec2D(0, 0), size = new _Vec2D.Vec2D(8, 8)) {
    this.font = font;
    this.fontsheet = fontsheet;
    this.position = position;
    this.size = size;
  }
  getPosition(name) {
    const el = this.fontsheet[name] || [0, 0];
    return new _Vec2D.Vec2D(el[0], el[1]);
  }
  drawText(ctx, message, position = new _Vec2D.Vec2D(0, 0)) {
    let xOffset = 0;
    let yOffset = 0;
    message.split('').forEach(char => {
      const pos = this.getPosition(char);
      ctx.drawImage(this.font, pos.x, pos.y, this.size.x, this.size.y, position.x + this.position.x + xOffset, position.y + this.position.y, this.size.x, this.size.y);
      xOffset += this.size.x;
    });
  }
}
exports.default = FontRenderer;

},{"./Vec2D":"156E3","@parcel/transformer-js/lib/esmodule-helpers.js":"5hfcV"}],"sHz5N":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + "font.125199b8.png"
},{"./bundle-url":"5NV9U"}],"5NV9U":[function(require,module,exports) {
"use strict";

/* globals document:readonly */
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


function getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

  if (!matches) {
    throw new Error('Origin not found');
  }

  return matches[0];
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;
},{}],"A8Jeh":[function(require,module,exports) {
module.exports = JSON.parse("{\"0\":[0,16],\"1\":[8,16],\"2\":[16,16],\"3\":[24,16],\"4\":[32,16],\"5\":[40,16],\"6\":[48,16],\"7\":[56,16],\"8\":[64,16],\"9\":[72,16],\"A\":[8,0],\"B\":[16,0],\"C\":[24,0],\"D\":[32,0],\"E\":[40,0],\"F\":[48,0],\"G\":[56,0],\"H\":[64,0],\"I\":[72,0],\"J\":[80,0],\"K\":[88,0],\"L\":[96,0],\"M\":[104,0],\"N\":[112,0],\"O\":[120,0],\"P\":[0,8],\"Q\":[8,8],\"R\":[16,8],\"S\":[24,8],\"T\":[32,8],\"U\":[40,8],\"V\":[48,8],\"W\":[56,8],\"X\":[80,8],\"Y\":[80,8],\"Z\":[80,8]}");
},{}],"5ZBpq":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + "spritesheet.8b19da9b.png"
},{"./bundle-url":"5NV9U"}],"4CEr9":[function(require,module,exports) {
module.exports = JSON.parse("{\"player\":[0,0],\"enemy\":[16,0]}");
},{}],"cU7IK":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + "tileset.830fffb0.png"
},{"./bundle-url":"5NV9U"}],"qCdBM":[function(require,module,exports) {
module.exports = JSON.parse("[[-16,-16],[0,0],[16,0]]");
},{}],"6eTbW":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + "level01.1ef52ef9.png"
},{"./bundle-url":"5NV9U"}],"5omqr":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Sprite", function () {
  return Sprite;
});
var _Vec2D = require('./Vec2D');
class Sprite {
  // sprite: HTMLImageElement
  constructor(image, name, spritesheet, size = new _Vec2D.Vec2D(16, 16)) {
    this.image = image;
    this.name = name;
    this.spritesheet = spritesheet;
    this.size = size;
    this.canvas = document.createElement('canvas');
    // Set canvas size
    this.canvas.width = this.size.x;
    this.canvas.height = this.size.y;
    // Get context
    this.ctx = this.canvas.getContext('2d');
    const pos = this.getPosition();
    // Draw image on the canvas
    this.ctx.drawImage(this.image, pos.x, pos.y, this.size.x, this.size.y, 0, 0, this.size.x, this.size.y);
    this.sprite = this.canvas;
  }
  getPosition() {
    const el = this.spritesheet[this.name] || [0, 0];
    return new _Vec2D.Vec2D(el[0], el[1]);
  }
}

},{"./Vec2D":"156E3","@parcel/transformer-js/lib/esmodule-helpers.js":"5hfcV"}],"3uyEM":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Level", function () {
  return Level;
});
var _Vec2D = require('./Vec2D');
class Level {
  constructor(tileset, tilesetJson, levelMap) {
    this.levelmap = levelMap;
    this.tilesetJson = tilesetJson;
    this.image = tileset;
    this.pos = new _Vec2D.Vec2D(0, 0);
    this.size = new _Vec2D.Vec2D(16, 16);
    this.vel = new _Vec2D.Vec2D(0, 0);
    this.width = this.size.x * 16;
    this.height = this.size.y * 16;
    this.speed = 5;
  }
  update() {
    this.pos.set(this.pos.x + this.vel.x * this.speed, this.pos.y + this.vel.y * this.speed);
  }
  moveUp() {
    this.vel.set(this.vel.x, 1);
  }
  moveRight() {
    this.vel.set(-1, this.vel.y);
  }
  moveDown() {
    this.vel.set(this.vel.x, -1);
  }
  moveLeft() {
    this.vel.set(1, this.vel.y);
  }
  stop(d) {
    this.vel[d] = 0;
  }
  getPosition(name) {
    const el = this.tilesetJson[name] || [-16, 0];
    return new _Vec2D.Vec2D(el[0], el[1]);
  }
  draw(ctx) {
    this.levelmap.map((x, i) => {
      x.map((y, j) => {
        const tile = y === '#ff0000' ? 'lightgray' : 'gray';
        const pos = this.getPosition(y);
        // ctx.fillStyle = tile;
        // ctx.fillRect(
        // this.pos.x + this.size.x * j,
        // this.pos.y + this.size.y * i,
        // this.size.x,
        // this.size.y,
        // );
        ctx.drawImage(this.image, pos.x, pos.y, this.size.x, this.size.y, this.pos.x + this.size.x * j, this.pos.y + this.size.y * i, this.size.x, this.size.y);
      });
    });
  }
}

},{"./Vec2D":"156E3","@parcel/transformer-js/lib/esmodule-helpers.js":"5hfcV"}],"3v6ep":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "AssetLoader", function () {
  return AssetLoader;
});
class AssetLoader {
  constructor(toLoad = 0, loaded = 0) {
    this.toLoad = toLoad;
    this.loaded = loaded;
  }
  load(assets) {
    const imageExt = ['png'];
    const jsonExt = ['json'];
    this.toLoad = assets.length;
    return new Promise(resolve => {
      assets.forEach(asset => {
        const extension = asset.split('.').pop();
        if (imageExt.includes(extension)) {
          this.loadImage(asset, resolve);
        } else if (jsonExt.includes(extension)) {
          this.loadJson(asset, resolve);
        }
      });
    });
  }
  loadHandler(resolve) {
    this.loaded += 1;
    if (this.loaded === this.toLoad) {
      this.loaded = 0;
      this.toLoad = 0;
      resolve(this);
    }
  }
  loadImage(src, resolve) {
    const image = new Image();
    image.src = src;
    image.addEventListener('load', () => {
      this.loadHandler(resolve);
    }, false);
    const name = src.split('/').pop().split('.')[0];
    this[name] = image;
  }
  async loadJson(src, resolve) {
    try {
      const response = await fetch(src);
      const data = await response;
      this.loadHandler(resolve);
      const name = src.split('/').pop().split('.')[0];
      this[name] = data;
    } catch (error) {}
  }
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5hfcV"}]},["4UKJc","3rfh7"], "3rfh7", "parcelRequire3331")

//# sourceMappingURL=index.7cacc1f4.js.map
