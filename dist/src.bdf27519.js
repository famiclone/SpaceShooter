parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"BrLT":[function(require,module,exports) {
module.exports={width:255,height:240,title:"SpaceShooter"};
},{}],"iMXC":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.checkBoundsCollide=void 0;var o=e(require("../config.json")),t={size:{x:o.default.width,y:o.default.height}};function s(e,o){return void 0===o&&(o=t),e.pos.x>=0&&e.pos.x<=o.size.x&&e.pos.y>=0&&e.pos.y<=o.size.y}exports.checkBoundsCollide=s;
},{"../config.json":"BrLT"}],"ElJB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Vec2D=void 0;var t=function(){function t(t,e){this.x=t,this.y=e}return t.prototype.set=function(t,e){this.x=t,this.y=e},t.prototype.get=function(){return{x:this.x,y:this.y}},t}();exports.Vec2D=t;
},{}],"pOIN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../helpers"),s=require("./Vec2D"),e=function(){function e(t,e,i){void 0===e&&(e=1),this.pos=t,this.speed=e,this.size=i,this.active=!0,this.vel=new s.Vec2D(0,0),this.color="rgba(255, 255, 255, "+this.speed/2+")"}return e.prototype.draw=function(t){t.fillStyle=this.color;var s=new Path2D;s.arc(this.pos.x,this.pos.y,this.size.x,0,2*Math.PI),t.fill(s)},e.prototype.update=function(s){this.pos.y+=s.y*this.speed,this.pos.x+=s.x*this.speed,this.active=this.active&&t.checkBoundsCollide(this)},e}(),i=function(){function t(){this.color="black",this.stars=[],this.vel=new s.Vec2D(0,0)}return t.prototype.drawStars=function(t){var i=Math.floor(Math.random()*Math.floor(10)),o=new s.Vec2D(2/i,5/i);if(this.stars.length<50&&1===Math.round(5*Math.random())){var r=new s.Vec2D(0,0);(this.vel.y=-1)&&(r=new s.Vec2D(Math.floor(Math.random()*t.canvas.width),t.canvas.height)),(this.vel.y=1)&&(r=new s.Vec2D(Math.floor(Math.random()*t.canvas.width),0)),this.stars.push(new e(r,i,o))}},t.prototype.stop=function(t){this.vel[t]=0},t.prototype.draw=function(t){this.drawStars(t),this.stars.map(function(s){s.draw(t)})},t.prototype.update=function(){var t=this;this.stars.map(function(s){s.update(t.vel)}),this.stars=this.stars.filter(function(t){return t.active})},t}();exports.default=i;
},{"../helpers":"iMXC","./Vec2D":"ElJB"}],"GuKz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Vec2D"),s=function(){function s(s,i,e,o){void 0===o&&(o=new t.Vec2D(16,16)),this.ctx=s,this.pos=i,this.sprite=e,this.size=o,this.canvas=s.canvas,this.image=new Image,this.pos=new t.Vec2D(i.x,i.y),this.active=!0}return s.prototype.isBounds=function(){return this.pos.x>=0&&this.pos.x<=this.canvas.width&&this.pos.y>=0&&this.pos.y<=this.canvas.height},s.prototype.draw=function(t){t.drawImage(this.sprite,this.pos.x,this.pos.y)},s.prototype.explode=function(){this.active=!1},s.prototype.update=function(){this.pos.x+=this.vel.x,this.pos.y+=this.vel.y/2},s}();exports.default=s;
},{"./Vec2D":"ElJB"}],"IBRi":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Vec2D"),t=function(){function t(t,i){this.active=!0,this.pos=new e.Vec2D(t,i),this.size=new e.Vec2D(1,3),this.vel=new e.Vec2D(0,-5)}return t.prototype.draw=function(e){e.fillStyle="orange",e.fillRect(this.pos.x,this.pos.y,this.size.x,this.size.y+3)},t.prototype.update=function(){this.pos.x+=this.vel.x,this.pos.y+=this.vel.y},t}();exports.default=t;
},{"./Vec2D":"ElJB"}],"GA4g":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(e,o)};return function(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function i(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(i.prototype=o.prototype,new i)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var o=e(require("./GameObject")),i=e(require("./Bullet")),n=require("./Vec2D"),s=function(e){function o(t,o,i,s){void 0===o&&(o=new n.Vec2D(0,0)),void 0===s&&(s=2);var r=e.call(this,t,o,i,new n.Vec2D(16,16))||this;return r.ctx=t,r.pos=o,r.sprite=i,r.speed=s,r.active=!0,r.playerBullets=[],r.vel=new n.Vec2D(0,0),r}return t(o,e),o.prototype.moveToMidpoint=function(){return{x:this.pos.x+2,y:this.pos.y}},o.prototype.moveUp=function(){this.vel.set(this.vel.x,-1)},o.prototype.moveRight=function(){this.vel.set(1,this.vel.y)},o.prototype.moveDown=function(){this.vel.set(this.vel.x,1)},o.prototype.moveLeft=function(){this.vel.set(-1,this.vel.y)},o.prototype.stop=function(t){this.vel[t]=0},o.prototype.shoot=function(){var t=this.moveToMidpoint();this.playerBullets.push(new i.default(t.x,t.y)),this.playerBullets.push(new i.default(t.x+11,t.y))},o.prototype.explode=function(){this.active=!1},o.prototype.update=function(){this.pos.set(this.pos.x+this.vel.x*this.speed,this.pos.y+this.vel.y*this.speed)},o}(o.default);exports.default=s;
},{"./GameObject":"GuKz","./Bullet":"IBRi","./Vec2D":"ElJB"}],"qr0O":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Vec2D"),e=function(){function e(e){void 0===e&&(e=new t.Vec2D(255,240)),this.size=e,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=this.size.x,this.canvas.height=this.size.y}return e.prototype.clear=function(){this.ctx.clearRect(0,0,this.size.x,this.size.y)},e.prototype.mount=function(){var t=document.createElement("div");t.setAttribute("id","screen"),t.append(this.canvas),document.body.append(t)},e}();exports.default=e;
},{"./Vec2D":"ElJB"}],"ad3c":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(e,o)};return function(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.EnemyType=void 0;var o,r=e(require("./GameObject")),n=require("./Vec2D");!function(t){t[t.Zoraxx=0]="Zoraxx",t[t.Mii=1]="Mii"}(o=exports.EnemyType||(exports.EnemyType={}));var i=function(e){function o(t,o,r){var i=e.call(this,t,o,r,new n.Vec2D(16,16))||this;return i.age=Math.floor(128*Math.random()),i.pos.x=Math.round(t.canvas.width/4+Math.random()*t.canvas.width/2),i.vel=new n.Vec2D(0,3),i}return t(o,e),o.prototype.explode=function(){this.active=!1},o.prototype.update=function(){this.pos.x+=this.vel.x,this.pos.y+=this.vel.y/2,this.vel.x=3*Math.sin(this.age*Math.PI/64),this.age++,this.active=this.active&&this.isBounds()},o}(r.default);exports.default=i;
},{"./GameObject":"GuKz","./Vec2D":"ElJB"}],"gZaN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Vec2D"),t=function(){function t(t,i,o,n){void 0===o&&(o=new e.Vec2D(0,0)),void 0===n&&(n=new e.Vec2D(8,8)),this.font=t,this.fontsheet=i,this.position=o,this.size=n}return t.prototype.getPosition=function(t){var i=this.fontsheet[t]||[0,0];return new e.Vec2D(i[0],i[1])},t.prototype.drawText=function(t,i,o){var n=this;void 0===o&&(o=new e.Vec2D(0,0));var s=0;i.split("").forEach(function(e){var i=n.getPosition(e);t.drawImage(n.font,i.x,i.y,n.size.x,n.size.y,o.x+n.position.x+s,o.y+n.position.y,n.size.x,n.size.y),s+=n.size.x})},t}();exports.default=t;
},{"./Vec2D":"ElJB"}],"sATq":[function(require,module,exports) {
module.exports="/SpaceShooter/font.9e4117d8.png";
},{}],"th19":[function(require,module,exports) {
module.exports={A:[8,0],B:[16,0],C:[24,0],D:[32,0],E:[40,0],F:[48,0],G:[56,0],H:[64,0],I:[72,0],J:[80,0],K:[88,0],L:[96,0],M:[104,0],N:[112,0],O:[120,0],P:[0,8],Q:[8,8],R:[16,8],S:[24,8],T:[32,8],U:[40,8],V:[48,8],W:[56,8],X:[80,8],Y:[80,8],Z:[80,8],0:[0,16],1:[8,16],2:[16,16],3:[24,16],4:[32,16],5:[40,16],6:[48,16],7:[56,16],8:[64,16],9:[72,16]};
},{}],"pozp":[function(require,module,exports) {
module.exports="/SpaceShooter/spritesheet.d76c0993.png";
},{}],"beW8":[function(require,module,exports) {
module.exports={player:[0,0],enemy:[16,0]};
},{}],"YWTO":[function(require,module,exports) {
module.exports="/SpaceShooter/tileset.46d26d5c.png";
},{}],"TZ7A":[function(require,module,exports) {
module.exports={0:[0,0],1:[16,0]};
},{}],"K5hL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Sprite=void 0;var t=require("./Vec2D"),e=function(){function e(e,i,s,h){void 0===h&&(h=new t.Vec2D(16,16)),this.image=e,this.name=i,this.spritesheet=s,this.size=h,this.canvas=document.createElement("canvas"),console.log(this.image),this.canvas.width=this.size.x,this.canvas.height=this.size.y,this.ctx=this.canvas.getContext("2d");var n=this.getPosition();this.ctx.drawImage(this.image,n.x,n.y,this.size.x,this.size.y,0,0,this.size.x,this.size.y),this.sprite=this.canvas}return e.prototype.getPosition=function(){var e=this.spritesheet[this.name]||[0,0];return new t.Vec2D(e[0],e[1])},e}();exports.Sprite=e;
},{"./Vec2D":"ElJB"}],"JwV2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Level=void 0;var e=require("./Vec2D"),t=function(){function t(t,i,s){this.levelmap=s.map,this.tilesetJson=i,this.image=t,this.pos=new e.Vec2D(0,0),this.size=new e.Vec2D(16,16),this.vel=new e.Vec2D(0,0),this.width=16*this.size.x,this.height=16*this.size.y,this.speed=5,console.log(s)}return t.prototype.update=function(){this.pos.set(this.pos.x+this.vel.x*this.speed,this.pos.y+this.vel.y*this.speed)},t.prototype.moveUp=function(){this.vel.set(this.vel.x,1)},t.prototype.moveRight=function(){this.vel.set(-1,this.vel.y)},t.prototype.moveDown=function(){this.vel.set(this.vel.x,-1)},t.prototype.moveLeft=function(){this.vel.set(1,this.vel.y)},t.prototype.stop=function(e){this.vel[e]=0},t.prototype.getPosition=function(t){var i=this.tilesetJson[t]||[0,0];return new e.Vec2D(i[0],i[1])},t.prototype.draw=function(e){var t=this;this.levelmap.map(function(i,s){i.map(function(i,o){var p=0===i?"lightgray":"gray",n=t.getPosition(i.toString());e.fillStyle=p,e.fillRect(t.pos.x+t.size.x*o,t.pos.y+t.size.y*s,t.size.x,t.size.y),e.drawImage(t.image,n.x,n.y,t.size.x,t.size.y,t.pos.x+t.size.x*o,t.pos.y+t.size.y*s,t.size.x,t.size.y)})})},t}();exports.Level=t;
},{"./Vec2D":"ElJB"}],"TPVS":[function(require,module,exports) {
"use strict";var t=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))(function(r,a){function i(t){try{l(o.next(t))}catch(e){a(e)}}function s(t){try{l(o.throw(t))}catch(e){a(e)}}function l(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n(function(t){t(e)})).then(i,s)}l((o=o.apply(t,e||[])).next())})},e=this&&this.__generator||function(t,e){var n,o,r,a,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,o&&(r=2&a[0]?o.return:a[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,a[1])).done)return r;switch(o=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,o=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(r=(r=i.trys).length>0&&r[r.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){i.label=a[1];break}if(6===a[0]&&i.label<r[1]){i.label=r[1],r=a;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(a);break}r[2]&&i.ops.pop(),i.trys.pop();continue}a=e.call(t,i)}catch(s){a=[6,s],o=0}finally{n=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.AssetLoader=void 0;var n=function(){function n(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this.toLoad=t,this.loaded=e}return n.prototype.load=function(t){var e=this,n=["png"],o=["json"];return this.toLoad=t.length,new Promise(function(r){t.forEach(function(t){var a=t.split(".").pop();n.includes(a)?e.loadImage(t,r):o.includes(a)&&e.loadJson(t,r)})})},n.prototype.loadHandler=function(t){this.loaded+=1,this.loaded===this.toLoad&&(this.loaded=0,this.toLoad=0,t(this))},n.prototype.loadImage=function(t,e){var n=this,o=new Image;o.src=t,o.addEventListener("load",function(){n.loadHandler(e)},!1),this[t.split(".")[0].replace("/","")]=o},n.prototype.loadJson=function(n,o){return t(this,void 0,void 0,function(){var t;return e(this,function(e){switch(e.label){case 0:return e.trys.push([0,3,,4]),[4,fetch(n)];case 1:return[4,e.sent()];case 2:return t=e.sent(),this.loadHandler(o),this[n.split(".")[0].replace("/","")]=t,[3,4];case 3:return e.sent(),[3,4];case 4:return[2]}})})},n}();exports.AssetLoader=n;
},{}],"q5HY":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./Background")),s=e(require("./Player")),i=e(require("./Screen")),r=e(require("./Enemy")),n=e(require("./FontRenderer")),l=require("../helpers"),o=e(require("../images/font.png")),a=e(require("../images/font.json")),p=e(require("../images/spritesheet.png")),u=e(require("../images/spritesheet.json")),h=e(require("../images/tileset.png")),c=e(require("../images/tileset.json")),y=require("./Vec2D"),d=require("./Sprite"),f=require("./Level"),v=require("./AssetLoader"),x={map:[[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]]},m=function(e){return setInterval(e,1e3)},g=0,w=function(){function e(e){var s=this;this.config=e,this.ui=document.createElement("div"),this.screen=new i.default(new y.Vec2D(this.config.width,this.config.height)),this.ui.className="ui",this.enemies=[],this.score=0,this.bg=new t.default,this.playerSpeed=3,this.assets=null,this.loaded=!1,this.player=null,this.fontRenderer=null,this.level=null,(new v.AssetLoader).load([o.default,h.default,p.default]).then(function(e){return s.setup(e)}),console.log(this)}return e.prototype.setup=function(e){this.assets=e,this.loaded=!0,this.player=new s.default(this.screen.ctx,new y.Vec2D(this.screen.size.x/2,this.screen.size.y-48),new d.Sprite(this.assets.spritesheet,"player",u.default,new y.Vec2D(16,16)).sprite,this.playerSpeed),this.initKeyboardController(),this.level=new f.Level(this.assets.tileset,c.default,x),this.fontRenderer=new n.default(this.assets.font,a.default,new y.Vec2D(8,8))},e.prototype.initKeyboardController=function(){var e=this;window.addEventListener("keydown",function(t){switch(t.code){case"KeyD":e.level.moveRight(),e.bg.vel.set(-1,e.bg.vel.y);break;case"KeyW":e.level.moveUp(),e.bg.vel.set(e.bg.vel.x,1);break;case"KeyS":e.level.moveDown(),e.bg.vel.set(e.bg.vel.x,-1);break;case"KeyA":e.level.moveLeft(),e.bg.vel.set(1,e.bg.vel.y);break;case"Space":e.player.shoot()}}),window.addEventListener("keyup",function(t){switch(t.code){case"KeyD":e.level.stop("x"),e.bg.stop("x");break;case"KeyW":case"KeyS":e.level.stop("y"),e.bg.stop("y");break;case"KeyA":e.level.stop("x"),e.bg.stop("x")}})},e.prototype.init=function(){this.initKeyboardController(),this.screen.mount(),this.run()},e.prototype.isCollide=function(e,t){return e.pos.x<t.pos.x+t.size.x&&e.pos.x+e.size.x>t.pos.x&&e.pos.y<t.pos.y+t.size.y&&e.pos.y+e.size.y>t.pos.y},e.prototype.handleCollision=function(){var e=this;this.player.playerBullets.map(function(t){e.enemies.map(function(s){e.isCollide(t,s)&&(s.explode(),e.score+=100,t.active=!1)})}),this.enemies.map(function(t){e.isCollide(t,e.player)&&(t.explode(),e.player.explode())})},e.prototype.draw=function(e){e.clear(),this.level.draw(e.ctx),this.bg.draw(e.ctx),this.player.draw(e.ctx),this.enemies.map(function(t){t.draw(e.ctx)}),this.player.playerBullets.map(function(t){t.draw(e.ctx)}),this.fontRenderer.drawText(e.ctx,"SCORE "+this.score.toString(),new y.Vec2D(8,8))},e.prototype.update=function(){this.level.update(),this.player.update(),this.player.pos.x+this.player.size.x>this.screen.size.x&&(this.player.pos.x=this.screen.size.x-this.player.size.x),this.player.pos.x<0&&(this.player.pos.x=0),this.player.pos.y+this.player.size.y>this.screen.size.y&&(this.player.pos.y=this.screen.size.x-this.player.size.y),this.player.pos.y<0&&(this.player.pos.y=0),this.ui.textContent=this.score.toString(),this.handleCollision(),this.player.playerBullets.map(function(e){l.checkBoundsCollide(e)?e.update():e.active=!1}),this.enemies.map(function(e){return e.update()}),this.bg.update(),this.enemies=this.enemies.filter(function(e){return e.active}),this.player.playerBullets=this.player.playerBullets.filter(function(e){return e.active}),1==Math.round(90*Math.random())&&this.enemies.push(new r.default(this.screen.ctx,{x:0,y:0},new d.Sprite(this.assets.spritesheet,"enemy",u.default,new y.Vec2D(16,16)).sprite))},e.prototype.run=function(){var e=this;this.loaded&&(this.draw(this.screen),this.update()),requestAnimationFrame(function(){return e.run()})},e}();exports.default=w;
},{"./Background":"pOIN","./Player":"GA4g","./Screen":"qr0O","./Enemy":"ad3c","./FontRenderer":"gZaN","../helpers":"iMXC","../images/font.png":"sATq","../images/font.json":"th19","../images/spritesheet.png":"pozp","../images/spritesheet.json":"beW8","../images/tileset.png":"YWTO","../images/tileset.json":"TZ7A","./Vec2D":"ElJB","./Sprite":"K5hL","./Level":"JwV2","./AssetLoader":"TPVS"}],"QCba":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./modules/Game")),r=e(require("./config.json")),u=new t.default(r.default);u.init();
},{"./modules/Game":"q5HY","./config.json":"BrLT"}]},{},["QCba"], null)
//# sourceMappingURL=/SpaceShooter/src.bdf27519.js.map