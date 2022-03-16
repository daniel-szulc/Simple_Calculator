class Calculator {

	constructor(previousActionTextElement, currentActionTextElement)
	{
		this.previousActionTextElement=previousActionTextElement
		this.currentActionTextElement=currentActionTextElement
		this.allClear()
	}

	clear()
	{
		this.currentAction = this.currentAction.toString().slice(0, -1)
	}

	allClear()
	{
		this.previousAction=''
		this.currentAction=''
		this.operation= undefined
	}

	selectOperation(operation)
	{
		if(operation==='/') operation='÷'
		else if(operation==='*') operation='×'

		if (this.currentAction === '') return

		if (this.previousAction !== '') {
			this.compute()
		}

		this.operation = operation
		this.previousAction = this.currentAction
		this.currentAction = ''
	}

	insertNumber(number)
	{
		if (number === '.' && this.currentAction.includes('.')) return

		this.currentAction = this.currentAction.toString() + number.toString()
	}

	compute()
	{
		let calculation
		const prev = parseFloat(this.previousAction)
		const current = parseFloat(this.currentAction)

		if (isNaN(prev) || isNaN(current)) return

		switch (this.operation) {
			case '+':
				calculation = prev + current
				break
			case '-':
				calculation = prev - current
				break
			case '×':
				calculation = prev * current
				break
			case '÷':
				calculation = prev / current
				break
			default:
				return
		}
		this.previousAction = this.previousAction + ' ' + this.operation + ' ' + this.currentAction;
		this.currentAction = calculation
		this.operation = undefined
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split(' ')[0])
		const decimalDigits = stringNumber.split('.')[1]
		let integerDisplay

		if (isNaN(integerDigits)) {
			integerDisplay = ''
		} else {
			integerDisplay = Math.trunc(integerDigits);
		}

		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`
		} else {
			return integerDisplay
		}
	}

	updateDisplay() {
		this.currentActionTextElement.innerText =
			this.getDisplayNumber(this.currentAction)

		if (this.operation != null) {
			this.previousActionTextElement.innerText =
				`${this.getDisplayNumber(this.previousAction)} ${this.operation}`
		} else if (this.previousAction != null) {
			this.previousActionTextElement.innerText = this.previousAction
		}
		else
		{
			this.previousActionTextElement.innerText = ''
		}
	}
}

const numberButtons = document.querySelectorAll('[data-number]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const clearButton = document.querySelector('[data-clear]')
const operationButtons = document.querySelectorAll('[data-operation]')
const previousActionTextElement = document.querySelector('[data-previous-action]')
const currentActionTextElement = document.querySelector('[data-current-action]')
const calculator = new Calculator(previousActionTextElement, currentActionTextElement)

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.insertNumber(button.innerText)
		calculator.updateDisplay()
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.selectOperation(button.innerText)
		calculator.updateDisplay()
	})
})

equalsButton.addEventListener('click', () => {
	calculator.compute()
	calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
	calculator.allClear()
	calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
	calculator.clear()
	calculator.updateDisplay()
})

document.addEventListener("keydown", event => {
	console.log(event.key)
	if (event.isComposing) {

	}
	else if(event.key==='Enter' || event.key==='=' )
	{
		calculator.compute()
		calculator.updateDisplay()
	}
	else if(event.key >=0 && event.key <=9)
	{
		calculator.insertNumber(event.key)
		calculator.updateDisplay()
	}
	else if(event.key===',' || event.key==='.')
	{
		calculator.insertNumber('.')
		calculator.updateDisplay()
	}
	else if(event.key==='Backspace')
	{
		calculator.clear()
		calculator.updateDisplay()
	}
	else if(event.key==='/' || event.key==='*' || event.key==='+' || event.key==='-')
	{
		calculator.selectOperation(event.key)
		calculator.updateDisplay()
	}
});