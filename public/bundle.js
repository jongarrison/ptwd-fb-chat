(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function () {
	var tag = this;
	var db = firebase.database();
	this.messages = [];
	this.login = false;

	this.on('before-mount', function () {
		db.ref('/chat').on('child_added', function (data) {
			tag.messages.push({
				key: data.key,
				val: data.val()
			});
			tag.update();
		});
	});

	this.send_message = function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
			var el, val, el2;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							e.preventDefault();
							el = document.getElementById('send-message');
							val = el.value;
							_context.prev = 3;
							_context.next = 6;
							return db.ref('/chat').push(val);

						case 6:
							_context.next = 14;
							break;

						case 8:
							_context.prev = 8;
							_context.t0 = _context['catch'](3);

							alert(_context.t0);
							tag.login = true;
							tag.messages.pop();
							tag.update();

						case 14:
							el2 = document.querySelector('.messages-window');

							el2.scrollTop = el2.scrollHeight;

							return _context.abrupt('return', el.value = '');

						case 17:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this, [[3, 8]]);
		}));

		return function (_x) {
			return _ref.apply(this, arguments);
		};
	}();

	this.login_anonymous = function () {
		try {
			firebase.auth().signInAnonymously();
		} catch (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log('error is ', error);
			// ...
		} finally {
			tag.login = false;
		}
	};

	this.login_email = function (e) {
		e.preventDefault();
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;

		try {
			firebase.auth().createUserWithEmailAndPassword(email, password);
		} catch (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log('error is ', error);
			// ...
		} finally {
			tag.login = false;
		}
	};
};
},{}],2:[function(require,module,exports){
'use strict';

riot.tag2('main', '<div class="wrapper"> <div class="messages-window"> <div class="message" each="{messages}"> <span>{key}</span>: {val} </div> </div> <div class="text-window"> <form onsubmit="{send_message}"> <input autocomplete="off" id="send-message" placeholder="Say something.." type="text"> </form> </div> <div class="login-modal" if="{login}"> <div class="modal-body"> <h3>Please login</h3> <div> <button onclick="{login_anonymous}">Anonymous</button> </div> <div> <form onsubmit="{login_email}"> <input placeholder="Enter email" id="email" type="email"> <input type="password" placeholder="Enter password" id="password"> <div> <button type="submit">Email/Password</button> </div> </form> </div> </div> </div> </div>', 'main .modal-body,[data-is="main"] .modal-body{ background-color: white; box-shadow: 2px 2px 9px rgba(0,0,0,.6); padding: 1rem; } main .modal-body div,[data-is="main"] .modal-body div{ display: flex; flex-wrap: wrap; justify-content: center; padding: .5rem; } main .modal-body div form,[data-is="main"] .modal-body div form{ flex-basis: 100%; } main .modal-body div form div,[data-is="main"] .modal-body div form div{ padding: .5rem; } main .modal-body button,[data-is="main"] .modal-body button{ background-color: #21ba45; cursor: pointer; color: white; font-family: sans-serif; font-size: 1rem; padding: .8rem 1.2rem; } main h3,[data-is="main"] h3{ text-align: center; } main .login-modal,[data-is="main"] .login-modal{ background-color: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; position: fixed; top: 0; left: 0; bottom: 0; right: 0; } main .wrapper,[data-is="main"] .wrapper{ display: flex; flex-flow: column; height: 100vh; overflow: hidden; width: 100vw; } main .messages-window,[data-is="main"] .messages-window{ background-color: #0060DF; flex-grow: 1; overflow-y: auto; padding: 1rem; } main .messages-window div,[data-is="main"] .messages-window div{ color: white; font-family: sans-serif; } main .message,[data-is="main"] .message{ display: flex; align-items: center; } main .message span,[data-is="main"] .message span{ color: yellow; display: inline-block; overflow-x: hidden; text-overflow: ellipsis; white-space: pre-wrap; width: 200px; } main .text-window,[data-is="main"] .text-window{ background-color: white; } main form input,[data-is="main"] form input{ box-sizing: border-box; font-size: 1.2rem; padding: 1rem; width: 100%; }', '', function (opts) {

    var main = require('./main.tag.js');
    main.call(this, this.opts);
});
},{"./main.tag.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0YWdzL21haW4udGFnLmpzIiwidGFncy90YWdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7IHZhciBnZW4gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyBmdW5jdGlvbiBzdGVwKGtleSwgYXJnKSB7IHRyeSB7IHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTsgdmFyIHZhbHVlID0gaW5mby52YWx1ZTsgfSBjYXRjaCAoZXJyb3IpIHsgcmVqZWN0KGVycm9yKTsgcmV0dXJuOyB9IGlmIChpbmZvLmRvbmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0gZWxzZSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSwgZnVuY3Rpb24gKGVycikgeyBzdGVwKFwidGhyb3dcIiwgZXJyKTsgfSk7IH0gfSByZXR1cm4gc3RlcChcIm5leHRcIik7IH0pOyB9OyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgdGFnID0gdGhpcztcblx0dmFyIGRiID0gZmlyZWJhc2UuZGF0YWJhc2UoKTtcblx0dGhpcy5tZXNzYWdlcyA9IFtdO1xuXHR0aGlzLmxvZ2luID0gZmFsc2U7XG5cblx0dGhpcy5vbignYmVmb3JlLW1vdW50JywgZnVuY3Rpb24gKCkge1xuXHRcdGRiLnJlZignL2NoYXQnKS5vbignY2hpbGRfYWRkZWQnLCBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0dGFnLm1lc3NhZ2VzLnB1c2goe1xuXHRcdFx0XHRrZXk6IGRhdGEua2V5LFxuXHRcdFx0XHR2YWw6IGRhdGEudmFsKClcblx0XHRcdH0pO1xuXHRcdFx0dGFnLnVwZGF0ZSgpO1xuXHRcdH0pO1xuXHR9KTtcblxuXHR0aGlzLnNlbmRfbWVzc2FnZSA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX3JlZiA9IF9hc3luY1RvR2VuZXJhdG9yKCAvKiNfX1BVUkVfXyovcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gX2NhbGxlZShlKSB7XG5cdFx0XHR2YXIgZWwsIHZhbCwgZWwyO1xuXHRcdFx0cmV0dXJuIHJlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG5cdFx0XHRcdHdoaWxlICgxKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuXHRcdFx0XHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbmQtbWVzc2FnZScpO1xuXHRcdFx0XHRcdFx0XHR2YWwgPSBlbC52YWx1ZTtcblx0XHRcdFx0XHRcdFx0X2NvbnRleHQucHJldiA9IDM7XG5cdFx0XHRcdFx0XHRcdF9jb250ZXh0Lm5leHQgPSA2O1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZGIucmVmKCcvY2hhdCcpLnB1c2godmFsKTtcblxuXHRcdFx0XHRcdFx0Y2FzZSA2OlxuXHRcdFx0XHRcdFx0XHRfY29udGV4dC5uZXh0ID0gMTQ7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHRjYXNlIDg6XG5cdFx0XHRcdFx0XHRcdF9jb250ZXh0LnByZXYgPSA4O1xuXHRcdFx0XHRcdFx0XHRfY29udGV4dC50MCA9IF9jb250ZXh0WydjYXRjaCddKDMpO1xuXG5cdFx0XHRcdFx0XHRcdGFsZXJ0KF9jb250ZXh0LnQwKTtcblx0XHRcdFx0XHRcdFx0dGFnLmxvZ2luID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0dGFnLm1lc3NhZ2VzLnBvcCgpO1xuXHRcdFx0XHRcdFx0XHR0YWcudXBkYXRlKCk7XG5cblx0XHRcdFx0XHRcdGNhc2UgMTQ6XG5cdFx0XHRcdFx0XHRcdGVsMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcy13aW5kb3cnKTtcblxuXHRcdFx0XHRcdFx0XHRlbDIuc2Nyb2xsVG9wID0gZWwyLnNjcm9sbEhlaWdodDtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gX2NvbnRleHQuYWJydXB0KCdyZXR1cm4nLCBlbC52YWx1ZSA9ICcnKTtcblxuXHRcdFx0XHRcdFx0Y2FzZSAxNzpcblx0XHRcdFx0XHRcdGNhc2UgJ2VuZCc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBfY29udGV4dC5zdG9wKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LCBfY2FsbGVlLCB0aGlzLCBbWzMsIDhdXSk7XG5cdFx0fSkpO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChfeCkge1xuXHRcdFx0cmV0dXJuIF9yZWYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9O1xuXHR9KCk7XG5cblx0dGhpcy5sb2dpbl9hbm9ueW1vdXMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGZpcmViYXNlLmF1dGgoKS5zaWduSW5Bbm9ueW1vdXNseSgpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHQvLyBIYW5kbGUgRXJyb3JzIGhlcmUuXG5cdFx0XHR2YXIgZXJyb3JDb2RlID0gZXJyb3IuY29kZTtcblx0XHRcdHZhciBlcnJvck1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuXHRcdFx0Y29uc29sZS5sb2coJ2Vycm9yIGlzICcsIGVycm9yKTtcblx0XHRcdC8vIC4uLlxuXHRcdH0gZmluYWxseSB7XG5cdFx0XHR0YWcubG9naW4gPSBmYWxzZTtcblx0XHR9XG5cdH07XG5cblx0dGhpcy5sb2dpbl9lbWFpbCA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbWFpbCcpLnZhbHVlO1xuXHRcdHZhciBwYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXNzd29yZCcpLnZhbHVlO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGZpcmViYXNlLmF1dGgoKS5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3N3b3JkKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Ly8gSGFuZGxlIEVycm9ycyBoZXJlLlxuXHRcdFx0dmFyIGVycm9yQ29kZSA9IGVycm9yLmNvZGU7XG5cdFx0XHR2YXIgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcblx0XHRcdGNvbnNvbGUubG9nKCdlcnJvciBpcyAnLCBlcnJvcik7XG5cdFx0XHQvLyAuLi5cblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0dGFnLmxvZ2luID0gZmFsc2U7XG5cdFx0fVxuXHR9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnJpb3QudGFnMignbWFpbicsICc8ZGl2IGNsYXNzPVwid3JhcHBlclwiPiA8ZGl2IGNsYXNzPVwibWVzc2FnZXMtd2luZG93XCI+IDxkaXYgY2xhc3M9XCJtZXNzYWdlXCIgZWFjaD1cInttZXNzYWdlc31cIj4gPHNwYW4+e2tleX08L3NwYW4+OiB7dmFsfSA8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJ0ZXh0LXdpbmRvd1wiPiA8Zm9ybSBvbnN1Ym1pdD1cIntzZW5kX21lc3NhZ2V9XCI+IDxpbnB1dCBhdXRvY29tcGxldGU9XCJvZmZcIiBpZD1cInNlbmQtbWVzc2FnZVwiIHBsYWNlaG9sZGVyPVwiU2F5IHNvbWV0aGluZy4uXCIgdHlwZT1cInRleHRcIj4gPC9mb3JtPiA8L2Rpdj4gPGRpdiBjbGFzcz1cImxvZ2luLW1vZGFsXCIgaWY9XCJ7bG9naW59XCI+IDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+IDxoMz5QbGVhc2UgbG9naW48L2gzPiA8ZGl2PiA8YnV0dG9uIG9uY2xpY2s9XCJ7bG9naW5fYW5vbnltb3VzfVwiPkFub255bW91czwvYnV0dG9uPiA8L2Rpdj4gPGRpdj4gPGZvcm0gb25zdWJtaXQ9XCJ7bG9naW5fZW1haWx9XCI+IDxpbnB1dCBwbGFjZWhvbGRlcj1cIkVudGVyIGVtYWlsXCIgaWQ9XCJlbWFpbFwiIHR5cGU9XCJlbWFpbFwiPiA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBwYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIj4gPGRpdj4gPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+RW1haWwvUGFzc3dvcmQ8L2J1dHRvbj4gPC9kaXY+IDwvZm9ybT4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+JywgJ21haW4gLm1vZGFsLWJvZHksW2RhdGEtaXM9XCJtYWluXCJdIC5tb2RhbC1ib2R5eyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgYm94LXNoYWRvdzogMnB4IDJweCA5cHggcmdiYSgwLDAsMCwuNik7IHBhZGRpbmc6IDFyZW07IH0gbWFpbiAubW9kYWwtYm9keSBkaXYsW2RhdGEtaXM9XCJtYWluXCJdIC5tb2RhbC1ib2R5IGRpdnsgZGlzcGxheTogZmxleDsgZmxleC13cmFwOiB3cmFwOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgcGFkZGluZzogLjVyZW07IH0gbWFpbiAubW9kYWwtYm9keSBkaXYgZm9ybSxbZGF0YS1pcz1cIm1haW5cIl0gLm1vZGFsLWJvZHkgZGl2IGZvcm17IGZsZXgtYmFzaXM6IDEwMCU7IH0gbWFpbiAubW9kYWwtYm9keSBkaXYgZm9ybSBkaXYsW2RhdGEtaXM9XCJtYWluXCJdIC5tb2RhbC1ib2R5IGRpdiBmb3JtIGRpdnsgcGFkZGluZzogLjVyZW07IH0gbWFpbiAubW9kYWwtYm9keSBidXR0b24sW2RhdGEtaXM9XCJtYWluXCJdIC5tb2RhbC1ib2R5IGJ1dHRvbnsgYmFja2dyb3VuZC1jb2xvcjogIzIxYmE0NTsgY3Vyc29yOiBwb2ludGVyOyBjb2xvcjogd2hpdGU7IGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyBmb250LXNpemU6IDFyZW07IHBhZGRpbmc6IC44cmVtIDEuMnJlbTsgfSBtYWluIGgzLFtkYXRhLWlzPVwibWFpblwiXSBoM3sgdGV4dC1hbGlnbjogY2VudGVyOyB9IG1haW4gLmxvZ2luLW1vZGFsLFtkYXRhLWlzPVwibWFpblwiXSAubG9naW4tbW9kYWx7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsLjUpOyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgcG9zaXRpb246IGZpeGVkOyB0b3A6IDA7IGxlZnQ6IDA7IGJvdHRvbTogMDsgcmlnaHQ6IDA7IH0gbWFpbiAud3JhcHBlcixbZGF0YS1pcz1cIm1haW5cIl0gLndyYXBwZXJ7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZmxvdzogY29sdW1uOyBoZWlnaHQ6IDEwMHZoOyBvdmVyZmxvdzogaGlkZGVuOyB3aWR0aDogMTAwdnc7IH0gbWFpbiAubWVzc2FnZXMtd2luZG93LFtkYXRhLWlzPVwibWFpblwiXSAubWVzc2FnZXMtd2luZG93eyBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2MERGOyBmbGV4LWdyb3c6IDE7IG92ZXJmbG93LXk6IGF1dG87IHBhZGRpbmc6IDFyZW07IH0gbWFpbiAubWVzc2FnZXMtd2luZG93IGRpdixbZGF0YS1pcz1cIm1haW5cIl0gLm1lc3NhZ2VzLXdpbmRvdyBkaXZ7IGNvbG9yOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7IH0gbWFpbiAubWVzc2FnZSxbZGF0YS1pcz1cIm1haW5cIl0gLm1lc3NhZ2V7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IH0gbWFpbiAubWVzc2FnZSBzcGFuLFtkYXRhLWlzPVwibWFpblwiXSAubWVzc2FnZSBzcGFueyBjb2xvcjogeWVsbG93OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IG92ZXJmbG93LXg6IGhpZGRlbjsgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7IHdoaXRlLXNwYWNlOiBwcmUtd3JhcDsgd2lkdGg6IDIwMHB4OyB9IG1haW4gLnRleHQtd2luZG93LFtkYXRhLWlzPVwibWFpblwiXSAudGV4dC13aW5kb3d7IGJhY2tncm91bmQtY29sb3I6IHdoaXRlOyB9IG1haW4gZm9ybSBpbnB1dCxbZGF0YS1pcz1cIm1haW5cIl0gZm9ybSBpbnB1dHsgYm94LXNpemluZzogYm9yZGVyLWJveDsgZm9udC1zaXplOiAxLjJyZW07IHBhZGRpbmc6IDFyZW07IHdpZHRoOiAxMDAlOyB9JywgJycsIGZ1bmN0aW9uIChvcHRzKSB7XG5cbiAgICB2YXIgbWFpbiA9IHJlcXVpcmUoJy4vbWFpbi50YWcuanMnKTtcbiAgICBtYWluLmNhbGwodGhpcywgdGhpcy5vcHRzKTtcbn0pOyJdfQ==
