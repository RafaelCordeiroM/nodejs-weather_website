const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let location = e.target.location.value
    if (!location) return setMessage('enter a value please')
    setMessage('loading...')
    fetch(`https://rafaelcm-weather-app.herokuapp.com/weather?address=${location}`).then(response => {
        response.json().then((data) => {
            if (data.error) setMessage(data.error)
            else {
                document.querySelector("#message").textContent = ""
                document.querySelector("#location").textContent = data.address
                document.querySelector("#temperature").textContent = data.temperature
            }
        })
    })
})

function setMessage(message) {
    document.querySelector("#message").textContent = message
    document.querySelector("#location").textContent = "---------"
    document.querySelector("#temperature").textContent = "---------"
}