form.addEventListener("submit", () => {
    const basic = {
        accountNumber: accountNumber.value,
    }
    fetch("/api/basic", {
        method: "POST",
        body: JSON.stringify(basic),
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
                error.style.display = "none"
                success.style.display = "block"
                success.innerText = data.success
                setTimeout(() => {
                    window.location = './'; 
                },2000)
            }
        })
})