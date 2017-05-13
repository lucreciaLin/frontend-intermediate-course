!function() {
	/*
	1. 塞假圖
	2. 呼叫Ajax
	3. 塞真資料
	4. 註冊scroll事件
	*/
	var offset = 0;
	var magicNum = 20;
	var dataOffset = 0;
	var liZone = document.getElementById("row");

	var Placeholder = (function() {
		function doPlaceholder() {
			for (var i = 0; i < magicNum; i++) {
				var colDiv = document.createElement("div");
				colDiv.setAttribute("class", "col");
				liZone.appendChild(colDiv);

				var figure = document.createElement("figure");
				figure.setAttribute("class", "preview");
				colDiv.appendChild(figure);

				var previewImg = document.createElement("img");
				previewImg.setAttribute("id", "previewImg" + (i + dataOffset));
				previewImg.setAttribute("src", "https://static-cdn.jtvnw.net/ttv-static/404_preview-320x180.jpg");
				figure.appendChild(previewImg);

				var introListDiv = document.createElement("div");
				introListDiv.setAttribute("class", "intro");
				colDiv.appendChild(introListDiv);

				var introFigure = document.createElement("figure");
				introListDiv.appendChild(introFigure);

				var introImg = document.createElement("img");
				introImg.setAttribute("id", "introImg" + (i + dataOffset));
				introImg.setAttribute("src", "https://static-cdn.jtvnw.net/ttv-static/404_preview-320x180.jpg");
				introFigure.appendChild(introImg);

				var introNameListDiv = document.createElement("div");
				introNameListDiv.setAttribute("class", "introNameList");
				introListDiv.appendChild(introNameListDiv);

				var h3 = document.createElement("h3");
				h3.setAttribute("id", "channelName" + (i + dataOffset));
				introNameListDiv.appendChild(h3);

				var span = document.createElement("span");
				span.setAttribute("id", "channelHost" + (i + dataOffset));
				introNameListDiv.appendChild(span);
			}
		}
		return {
			"doPlaceholder": doPlaceholder
		}
	})();

	var Ajax = (function() {
		function doAjax() {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						var JSONData = JSON.parse(this.responseText);
						var aryOfJSON = JSONData.streams;
						Append.replaceToRealData(aryOfJSON);
					} else {
						var liZone = document.getElementById("row");
						liZone.innerHTML = "sorry, fail to load data!";
					}
				}
			};
			xhttp.open("GET", "https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=20&offset="+offset, true);
			xhttp.setRequestHeader("Accept", "application/vnd.twitchtv.v5+json");
			xhttp.setRequestHeader("client-id","uivr9vpjkf35a0qdxpwdf5ob2b8es3");
			xhttp.send();
		}
		return {
			"doAjax": doAjax
		}
	})();

	var Append = (function() {
		function replaceToRealData(_ary) {
			var aryLen = _ary.length;
			for (var i = 0; i < aryLen; i++) {
				var eachAryItem = _ary[i];
				var getPreviewImg = document.getElementById("previewImg" + (i + dataOffset));
				var jsonOfPreviewImg = eachAryItem.preview.medium;
				getPreviewImg.setAttribute("src", jsonOfPreviewImg);

				var getIntroImg = document.getElementById("introImg" + (i + dataOffset));
				var jsonOfIntroImg = eachAryItem.channel.logo;
				getIntroImg.setAttribute("src", jsonOfIntroImg);

				var h3Txt = document.createTextNode(eachAryItem.channel.name);
				var getH3 = document.getElementById("channelName" + (i + dataOffset));
				getH3.appendChild(h3Txt);

				var spanTxt = document.createTextNode(eachAryItem.channel.display_name);
				var getSpan = document.getElementById("channelHost" + (i + dataOffset));
				getSpan.appendChild(spanTxt);
			}
		}
		return {
			"replaceToRealData": replaceToRealData
		}
	})();

	var doAfterScroll = (function() {
		document.addEventListener("scroll", subscribeScrollEvt);
		function getScrollXY() {
			var scrOfX = 0, scrOfY = 0;
			if( typeof( window.pageYOffset ) == "number" ) {
				//Netscape compliant
				scrOfY = window.pageYOffset;
				scrOfX = window.pageXOffset;
			} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
				//DOM compliant
				scrOfY = document.body.scrollTop;
				scrOfX = document.body.scrollLeft;
			} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
				//IE6 standards compliant mode
				scrOfY = document.documentElement.scrollTop;
				scrOfX = document.documentElement.scrollLeft;
			}
			return [ scrOfX, scrOfY ];
		}
		function getDocHeight() {
			var doc = document;
			return Math.max(
				doc.body.scrollHeight, doc.documentElement.scrollHeight,
				doc.body.offsetHeight, doc.documentElement.offsetHeight,
				doc.body.clientHeight, doc.documentElement.clientHeight
			);
		}
		function subscribeScrollEvt(event) {
			if ((getDocHeight() - 20) <= (getScrollXY()[1] + window.innerHeight)) {
				offset = offset + magicNum;
				dataOffset = dataOffset + magicNum;
				Placeholder.doPlaceholder();
				Ajax.doAjax();
			}
		}
	})();

	function init() {
		Ajax.doAjax();
	}

	Placeholder.doPlaceholder();

	window.onload = init();

}();