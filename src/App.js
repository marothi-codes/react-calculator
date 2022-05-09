import { useState } from 'react';
import evaluate from './lib/evaluate';

function App() {
  const [calc, setCalculator] = useState('');

  const operators = ['*', '/', '+', '-', '.'];
  const numberIds = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  const updateCalculation = (value) => {
    if (
      (operators.includes(value) && calc === '') ||
      (operators.includes(value) && operators.includes(calc.slice(-1)))
    )
      return;

    if (calc === '0' && value === '0') {
      return;
    } else if (calc === '0' && value !== '0') setCalculator(value);
    else setCalculator(calc + value);
  };

  /** Populates the calculator with the numerical buttons. */
  const populateNumberButtons = (start, end) => {
    const numbers = [];

    for (let i = 1; i < 10; i++) {
      numbers.push(
        <button key={i} id={numberIds[i - 1]} onClick={() => updateCalculation(i.toString())}>
          {i}
        </button>
      );
    }

    // Adjust the numbers to be layed out with a real life calculator's number layout for intuitive use.
    const numberBtnLayout = numbers.reverse().slice(start, end).reverse();
    return numberBtnLayout;
  };

  /** Triggers the arithmetic operation. */
  const calulate = () => {
    setCalculator(evaluate(calc).toString());
  };

  /** Detetes a character one click at a time. */
  const backspace = () => {
    if (calc === '') return;

    const value = calc.slice(0, -1);
    setCalculator(value);
  };

  return (
    <div className="App">
      {/* THE CALCULATOR */}
      <div className="calculator">
        <div className="display">{calc || '0'}</div>

        {/* OPERATORS */}
        <div className="operators">
          <button id="reset" onClick={() => setCalculator('0')}>
            AC
          </button>

          <button onClick={() => updateCalculation('*')}>×</button>
          <button onClick={() => updateCalculation('/')}>÷</button>
          <button onClick={() => updateCalculation('+')}>+</button>
          <button onClick={() => updateCalculation('-')}>-</button>

          {/* BACKSPACE */}
          <button onClick={() => backspace()}>DEL</button>
        </div>

        {/* DIGITS */}
        <div className="digits">
          {populateNumberButtons(0, 3)}
          {populateNumberButtons(3, 6)}
          {populateNumberButtons(6, 9)}
          <button onClick={() => updateCalculation('0')}>0</button>
          <button onClick={() => updateCalculation('.')}>.</button>

          <button onClick={() => calulate()}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
