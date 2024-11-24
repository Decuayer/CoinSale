const loader = document.getElementById("loader")

form.addEventListener("submit", () => {
    const withdraw = {
        email: email.value,
        accountNumber: accountNumber.value,
        witdrawInput: witdrawInput.value,
    }
    fetch("/api/withdraw", {
        method: "POST",
        body: JSON.stringify(withdraw),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            if(data.status == "error") {
                success.style.display = "none"
                error.style.display = "block"
                error.innerText = data.error
            } else if(data.status == "success") {
                console.log(loader.classList)
                loader.classList.remove("loader-hidden");
                setTimeout(() => {
                    loader.classList.add("loader-hidden");
                },5000)
                error.style.display = "none"
                success.style.display = "block"
                success.innerText = data.success
                setTimeout(() => {
                    window.location = '/user';
                },5000)
            }
        })
});