adminform.addEventListener("submit", () => {
    const adminlogin = {
        email: adminemail.value,
        password: adminpassword.value,
    }
    fetch("/api/admin", {
        method: "POST",
        body: JSON.stringify(adminlogin),
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
                    window.location = '/admin-page'; 
                },1000)
            }
        })
});