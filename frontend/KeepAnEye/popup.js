        const number = document.getElementById("number");
        const confirmation = document.getElementById("confirmation")
        const btnLogin = document.getElementById("btnLogin");
	const btnRegister = document.getElementById("btnRegister");
        const query = document.getElementById("query");

        btnLogin.addEventListener("click", async () => {
		let url = `http://localhost:8000/api/user/auth?phone=%2B${number.value}&OTP=${confirmation.value}`
		console.log(url);
            const result = await fetch(url, {
		    "method": "POST",
		    "mode": "no-cors",
		    "headers": {"content-type": "application/json"},
		    "body":{
		    }})
            const jResult = await result.json();
                console.log(jResult);
		chrome.storage.sync.set({accessToken: jResult.token}, function() {
			console.log('accessToken is set to ' + jResult.token);
		});
		window.location.href="query.html";
        })
 
        btnRegister.addEventListener("click", async () => {
		console.log(number)


		let url = `http://localhost:8000/api/user/otp?phone=%2B${number.value}` 

		console.log(url);

		const result = await fetch(url, {
                    "method": "POST",
                    "mode": "no-cors",
                    "headers": {"content-type": "application/json"},
                    "body": {
            
                    }}) 
            const jResult = await result.json();
		window.location.href="confirmation.html"
                console.log(jResult);
        })


        query.addEventListener("click", async () => {
		let url = "http://localhost:8000/api/user/check?content=fuck%20you"
		const token = await chrome.storage.sync.get(['accessToken'])
		console.log("grabbed the token off the DB: ", token.accessToken);
		const bearer = `Bearer ${token.accessToken}`
		console.log("built bearer token: ", bearer);
		const result = await fetch(url, {
		    "method": "POST",
		    "mode": "no-cors",
		    headers: {
			    'Authorization': bearer, 
			    'accept': "application/json"
		    }, 
		    body: {
		    }})
		const jResult = await result.json();
		console.log(jResult)
	})

