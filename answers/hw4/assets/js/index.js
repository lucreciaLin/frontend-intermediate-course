var Ajax = (function() {
	function doAjax() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
				if (this.status == 200) {
					var JSONData = JSON.parse(this.responseText);
					var aryOfJSON = JSONData.streams;
					Append.createDOM(aryOfJSON);
				} else {
					var liZone = document.getElementById("row");
					liZone.innerHTML = "sorry, fail to load data!";
				}
			}
		};
		xhttp.open("GET", "https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=20", true);
		xhttp.setRequestHeader("Accept", "application/vnd.twitchtv.v5+json");
		xhttp.setRequestHeader('client-id','uivr9vpjkf35a0qdxpwdf5ob2b8es3');
		xhttp.send();
	}
	return {
		"doAjax": doAjax
	}
})();

var Append = (function() {
	function createDOM(_ary) {
		var liZone = document.getElementById("row");
		var aryLen = _ary.length;
		for (var i = 0; i < aryLen; i++) {
			var eachAryItem = _ary[i];
			if (eachAryItem !== undefined) {
				var colDiv = document.createElement("div");
				colDiv.setAttribute("class", "col");
				liZone.appendChild(colDiv);

				var figure = document.createElement("figure");
				figure.setAttribute("class", "preview");
				colDiv.appendChild(figure);

				var previewImg = document.createElement("img");
				var videoData = eachAryItem.preview.medium;
				previewImg.setAttribute("src", videoData);
				figure.appendChild(previewImg);

				var introListDiv = document.createElement("div");
				introListDiv.setAttribute("class", "intro");
				colDiv.appendChild(introListDiv);

				var introFigure = document.createElement("figure");
				introListDiv.appendChild(introFigure);

				var introImg = document.createElement("img");
				introImg.setAttribute("src", eachAryItem.channel.logo);
				introFigure.appendChild(introImg);

				var introNameListDiv = document.createElement("div");
				introNameListDiv.setAttribute("class", "introNameList");
				introListDiv.appendChild(introNameListDiv);

				var h3 = document.createElement("h3");
				var h3Txt = document.createTextNode(eachAryItem.channel.name);
				h3.appendChild(h3Txt);
				introNameListDiv.appendChild(h3);

				var span = document.createElement("span");
				var spanTxt = document.createTextNode(eachAryItem.channel.display_name);
				span.appendChild(spanTxt);
				introNameListDiv.appendChild(span);
			}
		}
		layoutCtrl();
	}
	function layoutCtrl() {
		var liZone = document.getElementById("row");
		var colDiv = document.createElement("div");
		colDiv.setAttribute("class", "col");
		liZone.appendChild(colDiv);
	}
	return {
		"createDOM": createDOM,
		"layoutCtrl": layoutCtrl
	}
})();

function init() {
	Ajax.doAjax();
}

window.onload = init();