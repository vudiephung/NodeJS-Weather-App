const weatherForm = document.querySelector('.search-form')
const searchEle = document.querySelector('.search-input')
const message1 = document.querySelector('.message1')
const message2 = document.querySelector('.message2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = searchEle.value

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message1.textContent = data.error
                message2.textContent = ''
            }
            else{
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })

})


