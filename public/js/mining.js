
const start = document.getElementById("start");
const timecard = document.getElementById("time-card");
const demo = document.getElementById("demo");
const demo2 = document.getElementById("demo2");
const time = document.getElementById("time");
const time2 = document.getElementById("time2");
const timeimg = document.getElementById("timeimg");


start.addEventListener('click', () => {
    const mining = {
        email : email.value
    }
    fetch("/api/mining", {
        method : 'POST',
        body: JSON.stringify(mining),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            if(data.status == "error") {
                success.style.display = "none"
                error.style.display = "block"
                error.innerText = data.error
            }else if(data.status == "start") {
                startTimer(0,0,31)
                waiting = true;
            } else if(data.status == "success") {
                demo.innerHTML = "COMPLETED";
                start.style.display = "none";    
                timecard.style.display = "none";
                success.style.display = "block"
                error.style.display = "none"
                success.innerText = data.success
                setTimeout(() => {
                    window.location = '/user'; 
                },5000)
            }
        })
});

function startTimer(hour,min,second) {
    timeimg.src = "/img/giphy.gif";
    start.style.display = "none";
    timecard.style.display = "none";
    time.style.display = "block";
    
    const interval = setInterval(() => {
        second--;
        if(second < 0) {
            clearInterval(interval);
            timeimg.src = "/img/giphy.png";
            demo.innerHTML = "";
            start.style.display = "";    
            timecard.style.display = "";
            start.innerHTML = "CLICK";
        } else {
            demo.innerHTML = second;
        }
    }, 1000)
}


