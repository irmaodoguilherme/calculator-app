import {
  getNumber1,
  getNumber2,
  getCurrentOperator,
  getMathResult,
  getShouldNumber2BeUpdated,
  setNumber1,
  setNumber2,
  setCurrentOperator,
  setMathResult,
  setShouldNumber2BeUpdated
} from './math.js'


const divide = (numberOne, numberTwo) => (numberOne / numberTwo)
const multiply = (numberOne, numberTwo) => (numberOne * numberTwo)
const sum = (numberOne, numberTwo) => (numberOne + numberTwo)
const subtract = (numberOne, numberTwo) => (numberOne - numberTwo)
const percentage = (numberOne, numberTwo) => ((numberOne / 100) * numberTwo)

const mathOperations = {
  '÷': divide,
  '×': multiply,
  '+': sum,
  '−': subtract,
  ',': percentage
}

const clearMath = ([, inputMath]) => {
  setNumber1(null)
  setNumber2(null)
  setCurrentOperator(null)
  setMathResult(null)
  inputMath.value = '0'
}

const eraseNumber = ([, inputMath]) => {
  const { value } = inputMath

  if (value.length === 1) {
    inputMath.value = '0'
    return
  }

  inputMath.value = value.slice(0, inputMath.value.length - 1)
}

const showMathResult = (numberOne, numberTwo, inputMath) => {
  setMathResult(mathOperations[getCurrentOperator()](numberOne, numberTwo))
  inputMath.value = getMathResult()
  setShouldNumber2BeUpdated(false)
}

const handleMath = ([value, inputMath]) => {
  const hadFirstMath = getCurrentOperator()

  if (!hadFirstMath) {
    inputMath.value = inputMath.value
    return
  }

  if (!getShouldNumber2BeUpdated()) {
    showMathResult(Number(value), getNumber2(), inputMath)
    return
  }

  if (getShouldNumber2BeUpdated()) {
    setNumber2(Number(inputMath.value))
  }

  showMathResult(getNumber1(), getNumber2(), inputMath)
}

export const handleSign = sign => {
  const inputMath = document.querySelector('[data-js="input-math"]')
  const { value } = inputMath
  const specialOperations = {
    'C': clearMath,
    '←': eraseNumber,
    '=': handleMath
  }
  const mathOperationFound = mathOperations[sign]
  const specialOperation = specialOperations[sign]

  if (mathOperationFound) {
    setNumber1(Number(value))
    setCurrentOperator(sign)
    inputMath.value = '0'
    setShouldNumber2BeUpdated(true)
    return
  }

  specialOperation([value, inputMath])
  return
}

export const handleNumber = number => {
  const inputMath = document.querySelector('[data-js="input-math"]')
  const { value } = inputMath
  if (value === '0') {
    inputMath.value = number
    return
  }

  inputMath.value += number
}