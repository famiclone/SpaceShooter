parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"BrLT":[function(require,module,exports) {
module.exports={width:255,height:240,title:"SpaceShooter"};
},{}],"iMXC":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.checkBoundsCollide=void 0;var o=e(require("../config.json")),t={size:{x:o.default.width,y:o.default.height}};function s(e,o){return void 0===o&&(o=t),e.pos.x>=0&&e.pos.x<=o.size.x&&e.pos.y>=0&&e.pos.y<=o.size.y}exports.checkBoundsCollide=s;
},{"../config.json":"BrLT"}],"D1BR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Vec2=void 0;var t=function(){function t(t,e){this.x=t,this.y=e}return t.prototype.set=function(t,e){this.x=t,this.y=e},t}();exports.Vec2=t;
},{}],"pOIN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../helpers"),s=require("./Vec2"),e=function(){function e(t,e,i){void 0===e&&(e=1),this.pos=t,this.speed=e,this.size=i,this.active=!0,this.vel=new s.Vec2(0,1),this.color="rgba(255, 255, 255, "+this.speed/2+")"}return e.prototype.draw=function(t){t.fillStyle=this.color;var s=new Path2D;s.arc(this.pos.x,this.pos.y,this.size.x,0,2*Math.PI),t.fill(s)},e.prototype.update=function(){this.pos.y+=this.vel.y*this.speed,this.active=this.active&&t.checkBoundsCollide(this)},e}(),i=function(){function t(){this.color="black",this.stars=[]}return t.prototype.drawStars=function(t){var i=Math.floor(Math.random()*Math.floor(10)),o=new s.Vec2(2/i,5/i),r=new s.Vec2(Math.floor(Math.random()*t.canvas.width),0);1===Math.round(5*Math.random())&&this.stars.push(new e(r,i,o))},t.prototype.draw=function(t){t.fillStyle=this.color,t.fillRect(0,0,t.canvas.width,t.canvas.height),this.drawStars(t),this.stars.map(function(s){s.draw(t)})},t.prototype.update=function(){this.stars.map(function(t){t.update()}),this.stars=this.stars.filter(function(t){return t.active})},t}();exports.default=i;
},{"../helpers":"iMXC","./Vec2":"D1BR"}],"GuKz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Vec2"),s=function(){function s(s,i,e,o){void 0===o&&(o=new t.Vec2(16,16)),this.ctx=s,this.pos=i,this.sprite=e,this.size=o,this.canvas=s.canvas,this.image=new Image,this.pos=new t.Vec2(i.x,i.y),this.active=!0}return s.prototype.isBounds=function(){return this.pos.x>=0&&this.pos.x<=this.canvas.width&&this.pos.y>=0&&this.pos.y<=this.canvas.height},s.prototype.draw=function(t){t.drawImage(this.sprite,this.pos.x,this.pos.y)},s.prototype.explode=function(){this.active=!1},s.prototype.update=function(){this.pos.x+=this.vel.x,this.pos.y+=this.vel.y/2},s}();exports.default=s;
},{"./Vec2":"D1BR"}],"IBRi":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Vec2"),t=function(){function t(t,i){this.active=!0,this.pos=new e.Vec2(t,i),this.size=new e.Vec2(1,3),this.vel=new e.Vec2(0,-5)}return t.prototype.draw=function(e){e.fillStyle="orange",e.fillRect(this.pos.x,this.pos.y,this.size.x,this.size.y+3)},t.prototype.update=function(){this.pos.x+=this.vel.x,this.pos.y+=this.vel.y},t}();exports.default=t;
},{"./Vec2":"D1BR"}],"GA4g":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(e,o)};return function(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var o=e(require("./GameObject")),r=e(require("./Bullet")),n=require("./Vec2"),i=function(e){function o(t,o,r){void 0===o&&(o=new n.Vec2(0,0));var i=e.call(this,t,o,r,new n.Vec2(16,16))||this;return i.ctx=t,i.pos=o,i.sprite=r,i.active=!0,i.playerBullets=[],i.vel=new n.Vec2(0,0),i}return t(o,e),o.prototype.moveToMidpoint=function(){return{x:this.pos.x+this.size.x/2,y:this.pos.y}},o.prototype.shoot=function(){var t=this.moveToMidpoint();this.playerBullets.push(new r.default(t.x,t.y))},o.prototype.explode=function(){this.active=!1},o.prototype.update=function(){this.pos.x+=this.vel.x,this.pos.y+=this.vel.y},o}(o.default);exports.default=i;
},{"./GameObject":"GuKz","./Bullet":"IBRi","./Vec2":"D1BR"}],"qr0O":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Vec2"),e=function(){function e(e){void 0===e&&(e=new t.Vec2(255,240)),this.size=e,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=this.size.x,this.canvas.height=this.size.y}return e.prototype.clear=function(){this.ctx.clearRect(0,0,this.size.x,this.size.y)},e.prototype.mount=function(){var t=document.createElement("div");t.setAttribute("id","screen"),t.append(this.canvas),document.body.append(t)},e}();exports.default=e;
},{"./Vec2":"D1BR"}],"ad3c":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(e,o)};return function(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var o=e(require("./GameObject")),n=require("./Vec2"),r=function(e){function o(t,o,r){var i=e.call(this,t,o,r,new n.Vec2(16,16))||this;return i.age=Math.floor(128*Math.random()),i.pos.x=Math.round(t.canvas.width/4+Math.random()*t.canvas.width/2),i.vel=new n.Vec2(0,3),i}return t(o,e),o.prototype.explode=function(){this.active=!1},o.prototype.update=function(){this.pos.x+=this.vel.x,this.pos.y+=this.vel.y/2,this.vel.x=3*Math.sin(this.age*Math.PI/64),this.age++,this.active=this.active&&this.isBounds()},o}(o.default);exports.default=r;
},{"./GameObject":"GuKz","./Vec2":"D1BR"}],"gZaN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Vec2"),t=function(){function t(t,i,o,n){void 0===o&&(o=new e.Vec2(0,0)),void 0===n&&(n=new e.Vec2(8,8)),this.font=t,this.fontsheet=i,this.position=o,this.size=n}return t.prototype.getPosition=function(t){var i=this.fontsheet[t]||[0,0];return new e.Vec2(i[0],i[1])},t.prototype.drawText=function(t,i,o){var n=this;void 0===o&&(o=new e.Vec2(0,0));var s=0;i.split("").forEach(function(e){var i=n.getPosition(e);t.drawImage(n.font,i.x,i.y,n.size.x,n.size.y,o.x+n.position.x+s,o.y+n.position.y,n.size.x,n.size.y),s+=n.size.x})},t}();exports.default=t;
},{"./Vec2":"D1BR"}],"sATq":[function(require,module,exports) {
module.exports="/SpaceShooter/font.00062f9a.png";
},{}],"th19":[function(require,module,exports) {
module.exports={A:[8,0],B:[16,0],C:[24,0],D:[32,0],E:[40,0],F:[48,0],G:[56,0],H:[64,0],I:[72,0],J:[80,0],K:[88,0],L:[96,0],M:[104,0],N:[112,0],O:[120,0],P:[0,8],Q:[8,8],R:[16,8],S:[24,8],T:[32,8],U:[40,8],V:[48,8],W:[56,8],X:[80,8],Y:[80,8],Z:[80,8],0:[0,16],1:[8,16],2:[16,16],3:[24,16],4:[32,16],5:[40,16],6:[48,16],7:[56,16],8:[64,16],9:[72,16]};
},{}],"pozp":[function(require,module,exports) {
module.exports="/SpaceShooter/spritesheet.d76c0993.png";
},{}],"beW8":[function(require,module,exports) {
module.exports={player:[0,0],enemy:[16,0]};
},{}],"K5hL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Sprite=void 0;var t=require("./Vec2"),e=function(){function e(e,i,s,h){void 0===h&&(h=new t.Vec2(16,16)),this.image=e,this.name=i,this.spritesheet=s,this.size=h,this.canvas=document.createElement("canvas"),this.canvas.width=this.size.x,this.canvas.height=this.size.y,this.ctx=this.canvas.getContext("2d");var n=this.getPosition();this.ctx.drawImage(this.image,n.x,n.y,this.size.x,this.size.y,0,0,this.size.x,this.size.y),this.sprite=this.canvas}return e.prototype.getPosition=function(){var e=this.spritesheet[this.name]||[0,0];return new t.Vec2(e[0],e[1])},e}();exports.Sprite=e;
},{"./Vec2":"D1BR"}],"q5HY":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./Background")),i=e(require("./Player")),s=e(require("./Screen")),r=e(require("./Enemy")),n=e(require("./FontRenderer")),o=require("../helpers"),a=e(require("../images/font.png")),l=e(require("../images/font.json")),p=e(require("../images/spritesheet.png")),u=e(require("../images/spritesheet.json")),c=require("./Vec2"),h=require("./Sprite"),y={},d=function(e){return setInterval(e,1e3)},f=0,x=function(){function e(e){var r=this;this.config=e,this.level=y,this.ui=document.createElement("div"),this.screen=new s.default(new c.Vec2(this.config.width,this.config.height)),this.ui.className="ui",this.initKeyboardController(),this.enemies=[],this.score=0,this.bg=new t.default,this.sprite=new Image,this.sprite.src=p.default,this.font=new Image,this.font.src=a.default,this.loaded=0,this.player=null,this.fontRenderer=null,this.sprite.onload=function(){r.loaded++,r.font.onload=function(){r.loaded++,r.fontRenderer=new n.default(r.font,l.default,new c.Vec2(8,8))},r.player=new i.default(r.screen.ctx,new c.Vec2(r.screen.size.x/2,r.screen.size.y-48),new h.Sprite(r.sprite,"player",u.default,new c.Vec2(16,16)).sprite)},console.log(this)}return e.prototype.initKeyboardController=function(){var e=this;document.addEventListener("keydown",function(t){switch(t.code){case"KeyW":case"ArrowUp":e.player.pos.y-=8;break;case"KeyA":case"ArrowLeft":e.player.pos.x-=8;break;case"KeyS":case"ArrowDown":e.player.pos.y+=8;break;case"KeyD":case"ArrowRight":e.player.pos.x+=8;break;case"Space":e.player.shoot()}})},e.prototype.init=function(){this.initKeyboardController(),this.screen.mount(),this.run()},e.prototype.isCollide=function(e,t){return e.pos.x<t.pos.x+t.size.x&&e.pos.x+e.size.x>t.pos.x&&e.pos.y<t.pos.y+t.size.y&&e.pos.y+e.size.y>t.pos.y},e.prototype.handleCollision=function(){var e=this;this.player.playerBullets.map(function(t){e.enemies.map(function(i){e.isCollide(t,i)&&(i.explode(),e.score+=100,t.active=!1)})}),this.enemies.map(function(t){e.isCollide(t,e.player)&&(t.explode(),e.player.explode())})},e.prototype.draw=function(e){e.clear(),this.bg.draw(e.ctx),this.player.draw(e.ctx),this.enemies.map(function(t){t.draw(e.ctx)}),this.player.playerBullets.map(function(t){t.draw(e.ctx)}),this.fontRenderer.drawText(e.ctx,"SCORE "+this.score.toString(),new c.Vec2(8,8))},e.prototype.update=function(){this.player.pos.x+this.player.size.x>this.screen.size.x&&(this.player.pos.x=this.screen.size.x-this.player.size.x),this.player.pos.x<0&&(this.player.pos.x=0),this.player.pos.y+this.player.size.y>this.screen.size.y&&(this.player.pos.y=this.screen.size.x-this.player.size.y),this.player.pos.y<0&&(this.player.pos.y=0),this.ui.textContent=this.score.toString(),this.handleCollision(),this.player.playerBullets.map(function(e){o.checkBoundsCollide(e)?e.update():e.active=!1}),this.enemies.map(function(e){return e.update()}),this.bg.update(),this.enemies=this.enemies.filter(function(e){return e.active}),this.player.playerBullets=this.player.playerBullets.filter(function(e){return e.active}),1==Math.round(90*Math.random())&&this.enemies.push(new r.default(this.screen.ctx,{x:0,y:0},new h.Sprite(this.sprite,"enemy",u.default,new c.Vec2(16,16)).sprite))},e.prototype.run=function(){var e=this;2===this.loaded&&(this.draw(this.screen),this.update()),requestAnimationFrame(function(){return e.run()})},e}();exports.default=x;
},{"./Background":"pOIN","./Player":"GA4g","./Screen":"qr0O","./Enemy":"ad3c","./FontRenderer":"gZaN","../helpers":"iMXC","../images/font.png":"sATq","../images/font.json":"th19","../images/spritesheet.png":"pozp","../images/spritesheet.json":"beW8","./Vec2":"D1BR","./Sprite":"K5hL"}],"QCba":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./modules/Game")),r=e(require("./config.json")),u=new t.default(r.default);u.init();
},{"./modules/Game":"q5HY","./config.json":"BrLT"}]},{},["QCba"], null)
//# sourceMappingURL=/SpaceShooter/src.ba3dcd50.js.map