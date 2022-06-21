const createCustomElement = (element, attributes, classes) => {
    const newElement = document.createElement(element)
    if (attributes) {
        for (const attr of attributes) {
            newElement.setAttribute(attr.key, attr.value)
        }
    }
    if (classes) {
        for (const cls of classes) {
            newElement.classList.add(cls)
        }
    }
    return newElement
}

class Input {

    isCheckbox
    currentValue = {}

    constructor(isCheckbox) {
        this.isCheckbox = isCheckbox
    }

    prevValue = null

    changeCallback = null
    isOpen = false


    onChange(callback) {
        this.changeCallback = callback
    }

    create(element, datalist) {
        const inputIcon = createCustomElement('div', null, ['input-icon'])
        const inputImg = createCustomElement('img', [{ key: 'src', value: 'assets/images/add_input.svg' }], ['input-img'])
        element.innerHTML = ''
        element.appendChild(inputIcon)
        inputIcon.appendChild(inputImg)
        const input = createCustomElement('input', [{ key: 'type', value: 'text' }, { key: 'disabled', value: 'true' }], ['select-input', 'form-input'])
        const list = createCustomElement('ul', null, ['select-list', `${this.isOpen ? 'visible' : 'closed'}`])
        const div = createCustomElement('div', null, ['input-relative'])
        const placeholder = createCustomElement('span', null, ['input-txt'])
        placeholder.innerHTML = 'Дополнительные услуги'
        div.appendChild(placeholder)
        div.appendChild(input)

        for (const data of datalist) {
            const item = createCustomElement('li', null, ['select-items', `${data.selected ? 'selected' : 'not-selected'}`])
            const firstDiv = createCustomElement('div', null, ['select-first'])
            const imgDiv = createCustomElement('div', null, ['paid-img'])
            const selectedDiv = createCustomElement('div', null, ['selected-img'])
            if (data.paid) {
                const icon = createCustomElement('img', [{ key: 'src', value: 'assets/images/paid-icon.svg' }], ['paid-icon'])
                imgDiv.appendChild(icon)
            }
            if (data.selected) {
                const selectedIcon = createCustomElement('img', [{ key: 'src', value: 'assets/images/selected.svg' }], ['selected-icon'])
                selectedDiv.appendChild(selectedIcon)
                input.value += !input.value ? data.name : `, ${data.name}`
            }
            const text = createCustomElement('span', null, ['select-item-txt', `${data.selected ? 'selected-txt' : 'not-selected'}`])
            text.innerHTML = data.name
            firstDiv.appendChild(imgDiv)
            firstDiv.appendChild(text)
            item.appendChild(firstDiv)
            item.appendChild(selectedDiv)
            list.appendChild(item)
            item.addEventListener('click', () => {
                data.selected = !data.selected
                this.create(element, datalist)
            })
        }

        element.appendChild(div)
        element.appendChild(list)
        div.addEventListener('click', () => {
            this.isOpen = !this.isOpen
            this.create(element, datalist)
        })
    }
}