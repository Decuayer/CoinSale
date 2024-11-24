form.addEventListener("submit", () => {
    const settings = {
        email: email.value,
        pastpassword: pastpassword.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value
    }
    fetch("/api/settings", {
        method: "POST",
        body: JSON.stringify(settings),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            if(data.status == "error") {
                success.style.display = "none"
                error.style.display = "block"
                error.innerText = data.error
            } else {
                error.style.display = "none"
                success.style.display = "block"
                success.innerText = data.success
                setTimeout(() => {
                    window.location = '/profile'; 
                },1000)
            }
        })
})