// 1️⃣ Function to add two numbers
function add(a, b) {
  return a + b;
}

/* 2️⃣ Using the function
let num1 = 10;
let num2 = 20;
let result = add(num1, num2);

// 3️⃣ Display result in console
console.log("The sum of", num1, "and", num2, "is:", result);*/

// 4️⃣ You can also take user input (optional)
let x = parseInt(prompt("Enter first number:"));
let y = parseInt(prompt("Enter second number:"));
console.log("The sum of your numbers is:", add(x, y));
