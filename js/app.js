const calculator = document.querySelector('[data-js="calculator"]')
const html = window

const handleCalculatorClick = async e => {
  const clickedElement = e.target
  const isClickedElementNotAButton = clickedElement.tagName !== 'BUTTON'
  const isClickedElementASign = isNaN(clickedElement.textContent)
  const { handleNumber } = await import('./calculator.js')

  if (isClickedElementNotAButton) {
    return
  }

  if (isClickedElementASign) {
    const { handleSign } = await import('./calculator.js')
    handleSign(clickedElement.textContent)
    return
  }

  handleNumber(clickedElement.textContent)
}

const handleShortcutKeys = async e => {
  const { handleNumber } = await import('./calculator.js')
  const { handleSign } = await import('./calculator.js')
  const pressedKey = e.key
  const availableNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  const availableKeys = {
    'Escape': 'C',
    'Backspace': '←',
    'Enter': '=',
    '+': '+',
    '-': '−',
    '*': '×',
    '/': '÷',
    ',': ','
  }

  if (!availableKeys[pressedKey] && !availableNumbers.includes(pressedKey)) {
    return
  }

  if (availableNumbers.includes(pressedKey)) {
    handleNumber(pressedKey)
    return
  }

  handleSign(availableKeys[pressedKey])
}

calculator.addEventListener('click', handleCalculatorClick)
html.addEventListener('keyup', handleShortcutKeys)