const calculator = document.querySelector('[data-js="calculator"]')

const handleCalculatorClick = async e => {
  const clickedElement = e.target
  const isClickedElementNotAButton = clickedElement.tagName !== 'BUTTON'
  
  if (isClickedElementNotAButton) {
    return
  }

  const isClickedElementASign = isNaN(clickedElement.textContent)
  const { handleNumber } = await import('./calculator.js')
  
  if (isClickedElementASign) {
    const { handleSign } = await import('./calculator.js')
    handleSign(clickedElement.textContent)
    return
  }

  handleNumber(clickedElement.textContent)
}

const handleShortcutKeys = async e => {
  const pressedKey = e.key
  const availableNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  const availableSigns = {
    'Escape': 'C',
    'Backspace': '←',
    'Enter': '=',
    '+': '+',
    '-': '−',
    '*': '×',
    '/': '÷',
    ',': ','
  }
  
  if (!availableSigns[pressedKey] && !availableNumbers.includes(pressedKey)) {
    return
  }

  const { handleNumber } = await import('./calculator.js')
  const { handleSign } = await import('./calculator.js')
  
  if (availableNumbers.includes(pressedKey)) {
    handleNumber(pressedKey)
    return
  }

  handleSign(availableSigns[pressedKey])
}

calculator.addEventListener('click', handleCalculatorClick)
window.addEventListener('keyup', handleShortcutKeys)