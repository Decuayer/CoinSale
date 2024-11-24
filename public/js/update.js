form.addEventListener("submit", () => {
    const update = {
        nickname: nickname.value,
        namesurname: namesurname.value,
        tel: tel.value,
        email: email.value,
        vip: vip.value,
        loadedmoney: loadedmoney.value,
        balance: balance.value,
        referenceCode: referenceCode.value,
        useReferenceCode: useReferenceCode.value,
        usercount: usercount.value,
        moneywithdraw: moneywithdraw.value,
        password: password.value
    }
    fetch("/api/update", {
        method: "POST",
        body: JSON.stringify(update),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            if (data.status == "error") {
                success.style.display = "none"
                error.style.display = "block"
                error.innerText = data.error
            } else if(data.status == "success") {
                error.style.display = "none"
                success.style.display = "block"
                success.innerText = data.success
                setTimeout(() => {
                    window.location = '/admin-page/users'; 
                },1000)
            }
        })
})