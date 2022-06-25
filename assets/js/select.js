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
    title
    img

    constructor(isCheckbox, title, img) {
        this.isCheckbox = isCheckbox
        this.title = title
        this.img = img
    }

    prevValue = null

    changeCallback = null
    isOpen = false


    onChange(callback) {
        this.changeCallback = callback
    }

    create(element, datalist) {
        const bg = createCustomElement('div', null, ['bg'])
        const inputIcon = createCustomElement('div', null, ['input-icon'])
        const inputImg = createCustomElement('img', [{ key: 'src', value: this.img }], ['input-img'])
        element.innerHTML = ''
        element.appendChild(inputIcon)
        inputIcon.appendChild(inputImg)
        if (this.isOpen) {
            element.appendChild(bg)
        }
        const input = createCustomElement('input', [{ key: 'type', value: 'text' }, { key: 'disabled', value: 'true' }], ['select-input', 'form-input'])
        const list = createCustomElement('ul', null, ['select-list', `${this.isOpen ? 'visible' : 'closed'}`])
        const div = createCustomElement('div', null, ['input-relative'])
        const placeholder = createCustomElement('span', null, ['input-txt'])
        placeholder.innerHTML = this.title
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
                if (this.isCheckbox) {
                    data.selected = !data.selected
                    if (this.changeCallback) {
                        const data = datalist.filter(val => {
                            return val.selected
                        })
                        this.changeCallback(data)
                    }
                    this.create(element, datalist)
                } else {
                    for (const list of datalist) {
                        if (list.selected) {
                            list.selected = !list.selected
                        }
                    }
                    data.selected = !data.selected
                    if (this.isOpen) {
                        this.isOpen = false
                    }
                    if (this.changeCallback) {
                        let data
                        for (let index = 0; index < datalist.length; index++) {
                            const element = datalist[index];
                            if (element.selected) {
                                data = element
                            }
                        }
                        this.changeCallback(data)
                    }
                    this.create(element, datalist)
                }
            })
        }

        element.appendChild(div)
        element.appendChild(list)
        div.addEventListener('click', () => {
            this.isOpen = !this.isOpen
            this.create(element, datalist)
        })
        bg.addEventListener('click', () => {
            this.isOpen = false
            this.create(element, datalist)
        })
    }
}