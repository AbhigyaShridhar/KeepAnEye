
async function login(){
	fetch("https://hackinghiestauth-uo5lual43q-uc.a.run.app/login", {
                    "method": "POST",
                    "mode": "no-cors",
                    "headers": {"content-type": "application/json"},
                    "body": JSON.stringify({
                            "phone": "+19712975527"
                    })})
                .then(res => console.log(res.json))
}
async function signup() {
 const result = await fetch("http://127.0.0.1:8000/api/user/otp?phone=%2B19712975527'", {
                    "method": "POST",
                    "mode": "no-cors",
                    "headers": {"content-type": "application/json"},
                    "body": {

		    }}) 
            const jResult = await result.json();
                console.log(jResult);
}

signup();
