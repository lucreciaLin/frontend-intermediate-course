/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	(function () {
	  /*
	  1. 塞假圖
	  2. 呼叫Ajax
	  3. 塞真資料
	  4. 註冊scroll事件:for lazy-loading
	  5. 註冊click事件:for i18n
	  */
	  const I18N = {
	    'en': __webpack_require__(1),
	    'zh-tw': __webpack_require__(2)
	  };
	  let mOffset = 0;
	  const MAGICNUM = 20;
	  let mDataOffset = 0;
	  const LIZONE = document.getElementById('row');
	  let mIsLoading = false;
	  let mLang = 'zh-tw';

	  const PLACEHOLDER = (function () {
	    function doPlaceholder () {
	      for (let i = 0; i < MAGICNUM; i++) {
	        const COLDIV = document.createElement('div');
	        COLDIV.setAttribute('class', 'col');
	        LIZONE.appendChild(COLDIV);

	        const FIGURE = document.createElement('figure');
	        FIGURE.setAttribute('class', 'preview');
	        COLDIV.appendChild(FIGURE);

	        const PREVIEWIMG = document.createElement('img');
	        if (PREVIEWIMG !== null) {
	          PREVIEWIMG.setAttribute('id', 'previewImg' + (i + mDataOffset));
	          PREVIEWIMG.setAttribute('src', 'data:image/jpeg;base64,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ah7VvQyeEJc03zeRUaKT1J7+7utQvJb2+uJbm5lbdJLI25mPuagoor2EraI1Ciig0wCiiigAoooNABRRRQAUUUGgAooooAKKKDQAUc0UUAHNHNFFABRzRRQAc0c0UUAFHNFFABzRzRRQAUc0UUAHNHNFFAHafCbxpb+CtUvry5sJrxbqBYgsbhSpDZzzXov/AAvnS/8AoXL7/wACE/wrwaiuOtgKFafPNa+pLhFu7PVvHPxm1HV7D7DoFrLpKSAiaZpA0pHopH3R79fpXlJJJJJJJ5JPeiitqGHp0I8tNWHGKjsFHNFFbDDmjmiigAo5oooAOaOaKKACjmiigA5o5oooAKOaKKADmjmiigAo5oooAOaOaKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigANFB7UelMAooNB7UAAooFFABRQaD2oABRQKKACig0HtQACigUUAFFBoPagAFFAooAKKDQe1AAKKBRQAUUGg9qAAUUCigAooNB7UAAooFFABRQaD2oABRQKKACig0HtQACigUUAFFBoPagD/2Q==');

	          FIGURE.appendChild(PREVIEWIMG);
	        }

	        const INTROLISTDIV = document.createElement('div');
	        INTROLISTDIV.setAttribute('class', 'intro');
	        COLDIV.appendChild(INTROLISTDIV);

	        const INTROFIGURE = document.createElement('figure');
	        INTROLISTDIV.appendChild(INTROFIGURE);

	        const INTROIMG = document.createElement('img');
	        INTROIMG.setAttribute('id', 'introImg' + (i + mDataOffset));
	        INTROIMG.setAttribute('src', 'data:image/jpeg;base64,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ah7VvQyeEJc03zeRUaKT1J7+7utQvJb2+uJbm5lbdJLI25mPuagoor2EraI1Ciig0wCiiigAoooNABRRRQAUUUGgAooooAKKKDQAUc0UUAHNHNFFABRzRRQAc0c0UUAFHNFFABzRzRRQAUc0UUAHNHNFFAHafCbxpb+CtUvry5sJrxbqBYgsbhSpDZzzXov/AAvnS/8AoXL7/wACE/wrwaiuOtgKFafPNa+pLhFu7PVvHPxm1HV7D7DoFrLpKSAiaZpA0pHopH3R79fpXlJJJJJJJ5JPeiitqGHp0I8tNWHGKjsFHNFFbDDmjmiigAo5oooAOaOaKKACjmiigA5o5oooAKOaKKADmjmiigAo5oooAOaOaKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigANFB7UelMAooNB7UAAooFFABRQaD2oABRQKKACig0HtQACigUUAFFBoPagAFFAooAKKDQe1AAKKBRQAUUGg9qAAUUCigAooNB7UAAooFFABRQaD2oABRQKKACig0HtQACigUUAFFBoPagD/2Q==');
	        INTROFIGURE.appendChild(INTROIMG);

	        const INTRONAMELISTDIV = document.createElement('div');
	        INTRONAMELISTDIV.setAttribute('class', 'introNameList');
	        INTROLISTDIV.appendChild(INTRONAMELISTDIV);

	        const H3 = document.createElement('h3');
	        H3.setAttribute('id', 'channelName' + (i + mDataOffset));
	        INTRONAMELISTDIV.appendChild(H3);

	        const SPAN = document.createElement('span');
	        SPAN.setAttribute('id', 'channelHost' + (i + mDataOffset));
	        INTRONAMELISTDIV.appendChild(SPAN);
	      }
	      mIsLoading = false;
	    }
	    return {
	      'doPlaceholder': doPlaceholder
	    };
	  })();

	  const AJAX = (function () {
	    function doAjax () {
	      mIsLoading = true;
	      const XHTTP = new window.XMLHttpRequest();
	      XHTTP.onreadystatechange = function () {
	        if (this.readyState === 4) {
	          if (this.status === 200) {
	            let jsonData = JSON.parse(this.responseText);
	            const {streams} = jsonData;
	            APPEND.replaceToRealData(streams);
	          } else {
	            LIZONE.innerHTML = 'sorry, fail to load data!';
	          }
	        }
	      };
	      XHTTP.open('GET', 'https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=20&offset=' + mOffset + '&language=' + mLang, true);
	      XHTTP.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
	      XHTTP.setRequestHeader('client-id', 'uivr9vpjkf35a0qdxpwdf5ob2b8es3');
	      XHTTP.send();
	    }
	    return {
	      'doAjax': doAjax
	    };
	  })();

	  const APPEND = (function () {
	    function replaceToRealData (_ary) {
	      let aryLen = _ary.length;
	      for (let i = 0; i < aryLen; i++) {
	        let eachAryItem = _ary[i];
	        let getPreviewImg = document.getElementById('previewImg' + (i + mDataOffset));
	        let jsonOfPreviewImg = eachAryItem.preview.medium;
	        getPreviewImg.setAttribute('src', jsonOfPreviewImg);

	        let getIntroImg = document.getElementById('introImg' + (i + mDataOffset));
	        let jsonOfIntroImg = eachAryItem.channel.logo;
	        getIntroImg.setAttribute('src', jsonOfIntroImg);

	        let h3Txt = document.createTextNode(eachAryItem.channel.status);
	        let getH3 = document.getElementById('channelName' + (i + mDataOffset));
	        getH3.textContent = '';
	        getH3.appendChild(h3Txt);

	        let spanTxt = document.createTextNode(eachAryItem.channel.display_name);
	        let getSpan = document.getElementById('channelHost' + (i + mDataOffset));
	        getSpan.textContent = '';
	        getSpan.appendChild(spanTxt);
	      }
	      mIsLoading = false;
	    }
	    return {
	      'replaceToRealData': replaceToRealData
	    };
	  })();

	  (function () {
	    document.addEventListener('scroll', subscribeScrollEvt);

	    function getScrollXY () {
	      let scrOfX = 0;
	      let scrOfY = 0;
	      if (typeof (window.pageYOffset) === 'number') {
	        // Netscape compliant
	        scrOfY = window.pageYOffset;
	        scrOfX = window.pageXOffset;
	      } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
	        // DOM compliant
	        scrOfY = document.body.scrollTop;
	        scrOfX = document.body.scrollLeft;
	      } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
	        // IE6 standards compliant mode
	        scrOfY = document.documentElement.scrollTop;
	        scrOfX = document.documentElement.scrollLeft;
	      }
	      return [ scrOfX, scrOfY ];
	    }

	    function getDocHeight () {
	      const DOC = document;
	      return Math.max(
	        DOC.body.scrollHeight, DOC.documentElement.scrollHeight,
	        DOC.body.offsetHeight, DOC.documentElement.offsetHeight,
	        DOC.body.clientHeight, DOC.documentElement.clientHeight
	      );
	    }

	    function subscribeScrollEvt (event) {
	      if ((getScrollXY()[1] + window.innerHeight) > (getDocHeight() - 200)) {
	        if (!mIsLoading) {
	          mOffset = mOffset + MAGICNUM;
	          mDataOffset = mDataOffset + MAGICNUM;
	          PLACEHOLDER.doPlaceholder();
	          AJAX.doAjax();
	        }
	      }
	    }
	  })();

	  (function () {
	    document.getElementById('enBtn').addEventListener('click', changeLang);
	    document.getElementById('zhTwBtn').addEventListener('click', changeLang);

	    function changeLang (e) {
	      e = e.target;
	      let getAttr = e.getAttribute('data-selectedLang');
	      if (getAttr === 'en' || getAttr === 'zh-tw') {
	        document.getElementById('mainTitle').innerHTML = I18N[getAttr].TITLE;
	        mLang = getAttr;
	        // the following 4 lines: recalculation
	        mOffset = 0;
	        mDataOffset = 0;
	        LIZONE.innerHTML = '';
	        init();
	      }
	    }
	  })();

	  function init () {
	    PLACEHOLDER.doPlaceholder();
	    AJAX.doAjax();
	  }

	  window.onload = init();
	}());


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = {
	  TITLE: 'The Streams in English'
	};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = {
	  TITLE: '用中文直播的頻道'
	};


/***/ })
/******/ ]);