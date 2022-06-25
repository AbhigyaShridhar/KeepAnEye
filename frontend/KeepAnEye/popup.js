const btnLogin = document.getElementById("btnLogin");
        const btnRegister = document.getElementById("btnRegister");
        const number = document.getElementById("number");
        
        btnLogin.addEventListener("click", () => {
            fetch("https://hackinghiestauth-uo5lual43q-uc.a.run.app/login", {
		    "method": "POST",
		    "mode": "no-cors",
		    "headers": {"content-type": "application/json"},
		    "body": JSON.stringify({
			    "username": "shibby",
			    "number": "12345"
		    })})
		.then(res => console.log(res.json))
        })
 
        btnRegister.addEventListener("click", async () => {
		var data = {"phone": "%2B" + number};
		var url = new URL("http://127.0.0.1:8000/api/user/otp?")
		for (let k in data) {url.searchParams.append(k, data[k])}

		const result = await fetch(url, {
                    "method": "POST",
                    "mode": "no-cors",
                    "headers": {"content-type": "application/json"},
                    "body": {
            
                    }}) 
            const jResult = await result.json();
                console.log(jResult);
        })
