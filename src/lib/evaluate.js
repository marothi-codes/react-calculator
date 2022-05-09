// Operational Regular Expressions.
const parentheses = /\(([0-9+\-*/^ .]+)\)/; // Regex for identifying parenthetical expressions
const exponents = /(\d+(?:\.\d+)?) ?\^ ?(\d+(?:\.\d+)?)/; // Regex for identifying exponentials (x ^ y)
const multiplication = /(\d+(?:\.\d+)?) ?\* ?(\d+(?:\.\d+)?)/; // Regex for identifying multiplication (x * y)
const division = /(\d+(?:\.\d+)?) ?\/ ?(\d+(?:\.\d+)?)/; // Regex for identifying division (x / y)
const addition = /(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/; // Regex for identifying addition (x + y)
const subtraction = /(\d+(?:\.\d+)?) ?- ?(\d+(?:\.\d+)?)/; // Regex for identifying subtraction (x - y)

/**
 * Evaluates a string based arithmentic expression and returns a number.
 * Follows the standard PEMDAS operator precedence.
 * @param {String} expression Arithmetic expression input.
 * @returns {Number} Result of the calculation.
 */
function evaluate(expression) {
  if (isNaN(Number(expression))) {
    if (parentheses.test(expression)) {
      // Test for parentheses.
      let newExpression = expression.replace(parentheses, (match, subExpression) => {
        return evaluate(subExpression);
      });
      return evaluate(newExpression);
    } else if (exponents.test(expression)) {
      // Test for exponentials.
      let newExpression = expression.replace(exponents, (match, base, power) => {
        return Math.pow(Number(base), Number(power));
      });
      return evaluate(newExpression);
    } else if (multiplication.test(expression)) {
      // Test for multiplication.
      let newExpression = expression.replace(multiplication, (match, x, y) => {
        return Number(x) * Number(y);
      });
      return evaluate(newExpression);
    } else if (division.test(expression)) {
      // Test for division.
      let newExpression = expression.replace(division, (match, x, y) => {
        if (y !== 0) return Number(x) / Number(y);
        else throw new Error('Cannot divide by zero.');
      });
      return evaluate(newExpression);
    } else if (addition.test(expression)) {
      // Test for addition.
      let newExpression = expression.replace(addition, (match, x, y) => {
        return Number(x) + Number(y);
      });
      return evaluate(newExpression);
    } else if (subtraction.test(expression)) {
      // Test for subtraction.
      let newExpression = expression.replace(subtraction, (match, x, y) => {
        return Number(x) - Number(y);
      });
      return evaluate(newExpression);
    }
  } else {
    return expression;
  }
  return Number(expression);
}

export default evaluate;
