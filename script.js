const display = document.getElementById("display");
const historyList = document.getElementById("historyList");
const maxLength = 20;

function append(char) {
  if (display.value.length >= maxLength) return;

  const operators = ['+', '-', '*', '/', '.'];
  const lastChar = display.value.slice(-1);

  if (operators.includes(char) && operators.includes(lastChar)) return;
  if (char === '.' && lastChar === '.') return;

  display.value += char;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let expression = display.value;

    // Replace visual symbols
    expression = expression.replace(/÷/g, '/');
    expression = expression.replace(/×/g, '*');
    expression = expression.replace(/−/g, '-');

    // Handle percentages: 50+10% => 50+(10/100*50)
    expression = handlePercent(expression);

    const result = eval(expression);
    const rounded = Number(result.toFixed(8));
    display.value = rounded.toString().slice(0, maxLength);

    // Add to history
    addToHistory(expression, rounded);
  } catch {
    display.value = 'Error';
  }
}

function handlePercent(expr) {
  return expr.replace(/(\d+(\.\d+)?)%/g, (match, number) => {
    // Replace 10% with (10/100)
    return `(${number}/100)`;
  });
}

function addToHistory(expression, result) {
  const li = document.createElement("li");
  li.textContent = `${expression} = ${result}`;
  historyList.prepend(li);

  // Limit to 5 entries
  if (historyList.childElementCount > 5) {
    historyList.removeChild(historyList.lastChild);
  }
}
