let badWordDector = false;
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log(tab.url);
  const res = await fetch(tab.url);
  const data = await res.text();
  const parser = new DOMParser();
  const root = parser.parseFromString(data, "text/html");
  const token = await chrome.storage.sync.get(['accessToken'])
	console.log(token);
 
  walkTheDOM(root, function(node) {
	  if(node.nodeType === 3) {
		  var text = node.data.trim();
		  if(text.length > 0) {
			  if(token) {
			    const bearer = `Bearer ${token.accessToken}`
			    let url = `http://localhost:8000/api/user/check?content=${text}%20`
			    console.log(url);
			    console.log("grabbed the token off the DB: ", token.accessToken);
			    console.log("built bearer token: ", bearer);
			    fetch(url, {
				    "method": "POST",
				    "headers": new Headers({
					    'accept': 'application/json',
					    'Authorization': bearer 
				    }), 
				    body: {
				    }}).then(res => res.json()).then(data => {
					   console.log(data);
					    if(data.explicit === true) {
						   console.log("found bad word")
		const badUrl = `http://127.0.0.1:8000/api/user/notify?url=${tab.url}`
		console.log("notify invoked");
			    fetch(badUrl, {
				    "method": "POST",
				    "headers": new Headers({
					    'accept': 'application/json',
					    'Authorization': bearer 
				    }), 
				    body: {
				    }})

					   }
				    })


			  }
		  }
	  }

  })

}
getCurrentTab();

function walkTheDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walkTheDOM(node, func);
        node = node.nextSibling;
    }
}
/*
			  if(result.accessToken) {
					  const bearer = `Bearer ${result.accessToken}`
					  let url = `http://localhost:8000/api/user/check?content=${text}`
					  console.log("grabbed the token off the DB: ", token.accessToken);
					  console.log("built bearer token: ", bearer);

					  fetch(url, {
					  "method": "POST",
					  "headers": new Headers({
						  'accept': 'application/json',
						  'Authorization': bearer 
					  }), 
			`		  body: {

					  }}).then(res => res.json()).then(data => {
						  console.log(data);
					  })

			  }
*/
