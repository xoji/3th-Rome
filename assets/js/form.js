const addressExample = (text, index, inputValue) => {
    return `<div class="input-bg"><div class="input-icon"><img src="assets/images/location-input.svg" alt="" class="input-img"></div><div class="input-relative"><span class="input-txt">${text}</span><input type="text" class="form-input location" value="${inputValue ? inputValue : ''}" index='${index}'></div></div>`
}

const address = [{
    index: 0,
    address: ''
}]

const form = {
    address: [{
        index: 0,
        address: ''
    }, {
        index: 1,
        address: ''
    }],
    comment: '',
    services: [],
    is_card: false,
    tariff_id: null
}

const onChange = (input, value, index) => {
    switch (input) {
        case 'address':
            for (const address of form.address) {
                if (address.index == index) {
                    address.address = value
                }
            }
            break
    }
}

const changeEvent = (event) => {
    onChange('address', event.target.value, event.target.attributes['index'].value)
}

const addressChange = () => {
    const addressContainer = document.querySelector('.inputs-parrent')
    addressContainer.innerHTML = ''
    for (let i = 0; i < form.address.length; i++) {
        addressContainer.innerHTML += addressExample(form.address[i].index == 0 ? 'Откуда' : i == form.address.length - 1 ? 'Куда?' : 'Остановка', i, form.address[i].address)
    }
    const inputs = document.querySelectorAll('.location')
    for (const input of inputs) {
        input.removeEventListener('input', changeEvent)
        input.addEventListener('input', changeEvent)
    }
}

const addLocation = (event) => {
    event.preventDefault()
    if (form.address.length < 5) {
        const newAddress = []
        for (let i = 0; i < form.address.length; i++) {
            if (form.address.length - 1 == i) {
                newAddress.push({ index: i, address: form.address[i].address })
                newAddress.push({ index: i + 1, address: '' })
            } else {
                newAddress.push(form.address[i])
            }
        }
        form.address = newAddress
        if (newAddress.length >= 5) {
            document.querySelector('.addInput').style.display = 'none'
        }
        addressChange()
        document.querySelector(`[index="${form.address.length - 1}"]`).focus()
        document.querySelector(`[index="${form.address.length - 1}"]`).value = event.target.value
        event.target.value = ''
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.tariff-item')
    for (const elem of elems) {
        elem.addEventListener('click', (event) => {
            form.tariff_id = event.target.attributes['tariffid'].value
            const selected = document.querySelector('.selected-item')
            if (selected) {
                const selectedDiv = document.querySelector('.selected-tariff')
                if (selectedDiv) {
                    selected.classList.remove('selected-item')
                    document.querySelector('.selected-tariff-time').classList.remove('selected-tariff-time')
                    selectedDiv.classList.remove('selected-tariff')
                }
            } else {
                document.querySelector('.hided').classList.remove('hided')
            }
            const hiddens = document.querySelectorAll('.hidden')
            if (hiddens.length) {
                for (const hidden of hiddens) {
                    hidden.classList.remove('hidden')
                }
            }
            event.target.classList.add('selected-item')
            const div = document.querySelector('.selected-item .tariff-card')
            const time = document.querySelector('.selected-item .time')
            div.classList.add('selected-tariff')
            time.classList.add('selected-tariff-time')
        })
    }
    const services = new Input(true)
    services.create(
        document.querySelector('.services'), [
            { paid: true, selected: false, name: 'Детское кресло' },
            { paid: true, selected: false, name: 'Перевозка домашнего питомца' },
            { paid: false, selected: false, name: 'Своя музыка в машине' },
            { paid: false, selected: false, name: 'Зарядка для телефона' }
        ]
    )
    services.onChange((value) => {

    })
    document.querySelector('#add').addEventListener('input', addLocation)
    addressChange()
})