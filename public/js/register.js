form.addEventListener("submit", () => {
    const register = {
        nickname: nickname.value,
        namesurname: namesurname.value,
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
        tel: tel.value,
        referenceCode: referenceCode.value,
        checkbox: checkbox.value
    }
    fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(register),
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
                    window.location = '/login'; 
                },1000)
            }
        })
});