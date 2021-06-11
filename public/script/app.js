
const getData = (city, state, callback) => {
    fetch('/weather?city=' + city + '&' + 'state=' + state).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                callback(data.error, undefined)
            } else {
                callback(undefined, data)
            }
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelectorAll('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const city = search[0].value
    const state = search[1].value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    getData(city, state, (error, data) => {
        if (error) {
            messageOne.textContent = error
        } else {
            messageOne.textContent = data.forecast
            messageTwo.textContent = data.loc
        }
    })
})