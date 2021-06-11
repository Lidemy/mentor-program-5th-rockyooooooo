/* eslint-disable */

/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var commentsPlugin;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getComments\": () => (/* binding */ getComments),\n/* harmony export */   \"addComment\": () => (/* binding */ addComment)\n/* harmony export */ });\n/* eslint-disable */\r\n\r\nfunction getComments(apiUrl, siteKey, limit, offset, cb) {\r\n  $.ajax({\r\n    url: `${apiUrl}api_discussions.php?site_key=${siteKey}&limit=${limit}&offset=${offset}`\r\n  }).done((data) => {\r\n    if (!data.ok) return alert(data.message)\r\n    cb(data)\r\n  })\r\n}\r\n\r\nfunction addComment(apiUrl, newCommentData, cb) {\r\n  $.ajax({\r\n    type: 'POST',\r\n    url: `${apiUrl}api_add_discussions.php`,\r\n    data: newCommentData\r\n  }).done((data) => {\r\n    if (!data.ok) return alert(data.message)\r\n    cb()\r\n  })\r\n}\r\n\n\n//# sourceURL=webpack://commentsPlugin/./src/api.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates */ \"./src/templates.js\");\n/* eslint-disable */\r\n\r\n\r\n\r\n\r\n\r\nfunction init(options) {\r\n  const { siteKey, apiUrl, containerSelector } = options\r\n\r\n  $(containerSelector).append(_templates__WEBPACK_IMPORTED_MODULE_2__.commentsTemplate)\r\n\r\n  const commentsDOM = $('.comments')\r\n  const limit = 5\r\n  let offset = 0\r\n  let numberOfComments = 0\r\n\r\n  // get comments from database\r\n  ;(0,_api__WEBPACK_IMPORTED_MODULE_0__.getComments)(apiUrl, siteKey, limit, offset, (data) => {\r\n    const { discussions, count } = data\r\n    numberOfComments = count\r\n    for (const comment of discussions) (0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendCommentToDOM)(commentsDOM, comment)\r\n\r\n    // check offset and total amount of comments to hide the more comments button\r\n    if (offset >= numberOfComments - limit) {\r\n      $('.more-comments-btn').hide()\r\n    }\r\n  })\r\n\r\n  $('.add-comment-form').submit((e) => {\r\n    e.preventDefault()\r\n\r\n    const newCommentData = {\r\n      site_key: siteKey,\r\n      nickname: $('input[name=nickname]').val(),\r\n      content: $('textarea[name=content]').val()\r\n    }\r\n\r\n    // insert new comment to database\r\n    ;(0,_api__WEBPACK_IMPORTED_MODULE_0__.addComment)(apiUrl, newCommentData, () => {\r\n      // append new comment to page\r\n      ;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendCommentToDOM)(commentsDOM, newCommentData, true)\r\n    })\r\n\r\n    // empty the input fields\r\n    $('input[name=nickname]').val('')\r\n    $('textarea[name=content]').val('')\r\n\r\n    // increase offset and numberOfComments\r\n    offset++\r\n    numberOfComments++\r\n  })\r\n\r\n  $('.more-comments-btn').click((e) => {\r\n    offset += limit\r\n    // check offset and total amount of comments to hide the more comments button\r\n    if (offset >= numberOfComments - limit) {\r\n      $(e.target).hide()\r\n    }\r\n\r\n    // get more comments from database\r\n    (0,_api__WEBPACK_IMPORTED_MODULE_0__.getComments)(apiUrl, siteKey, limit, offset, (data) => {\r\n      const { discussions } = data\r\n      for (const comment of discussions) (0,_utils__WEBPACK_IMPORTED_MODULE_1__.appendCommentToDOM)(commentsDOM, comment)\r\n    })\r\n  })\r\n}\r\n\n\n//# sourceURL=webpack://commentsPlugin/./src/index.js?");

/***/ }),

/***/ "./src/templates.js":
/*!**************************!*\
  !*** ./src/templates.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"commentsTemplate\": () => (/* binding */ commentsTemplate)\n/* harmony export */ });\n/* eslint-disable */\r\n\r\nconst commentsTemplate = `\r\n  <div>\r\n    <form class=\"add-comment-form mb-3 p-3 bg-light border rounded\">\r\n      <h1>留言板</h1>\r\n      <div class=\"form-floating mb-3\">\r\n        <input type=\"text\" class=\"form-control\" id=\"floatingInput\" placeholder=\"Put your nickname here\" name=\"nickname\">\r\n        <label for=\"floatingInput\">暱稱</label>\r\n      </div>\r\n      <div class=\"form-floating mb-3\">\r\n        <textarea class=\"form-control\" placeholder=\"Leave a comment here\" id=\"floatingTextarea\" style=\"height: 100px\" name=\"content\"></textarea>\r\n        <label for=\"floatingTextarea\">留言內容</label>\r\n      </div>\r\n      <button type=\"submit\" class=\"btn btn-primary\">送出</button>\r\n    </form>\r\n    <section class=\"comments\"></section>\r\n    <button class=\"more-comments-btn btn btn-outline-primary\">載入更多</button>\r\n  </div>\r\n`\r\n\n\n//# sourceURL=webpack://commentsPlugin/./src/templates.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"escapeHtml\": () => (/* binding */ escapeHtml),\n/* harmony export */   \"appendCommentToDOM\": () => (/* binding */ appendCommentToDOM)\n/* harmony export */ });\nfunction escapeHtml(unsafe) {\r\n  return unsafe\r\n    .replace(/&/g, '&amp;')\r\n    .replace(/</g, '&lt;')\r\n    .replace(/>/g, '&gt;')\r\n    .replace(/\"/g, '&quot;')\r\n    .replace(/'/g, '&#039;')\r\n}\r\n\r\nfunction appendCommentToDOM(container, comment, isPrepend) {\r\n  const commentHtml = `\r\n    <div class=\"card mb-3\">\r\n      <div class=\"card-body\">\r\n        <h5 class=\"card-title\">${escapeHtml(comment.nickname)}</h5>\r\n        <p class=\"card-text\">${escapeHtml(comment.content)}</p>\r\n      </div>\r\n    </div>\r\n  `\r\n  isPrepend ? container.prepend(commentHtml) : container.append(commentHtml)\r\n}\r\n\n\n//# sourceURL=webpack://commentsPlugin/./src/utils.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	commentsPlugin = __webpack_exports__;
/******/ 	
/******/ })()
;