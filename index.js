const express = require('express');
const axios = require('axios'); // axios for API requests
const cors = require('cors'); // cors for cross-origin requests

const app = express();
const PORT = 3000;

app.use(cors()); // enable CORS for all requests

// function for Armstrong number
function isArmstrongNumber(num) {
    const digits = num.toString().split('');
    const numDigits = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit, 10), numDigits), 0);
    return sum === num;
}

// Function to check if number is a prime
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// function to check perfect number 
function isPerfectNumber(num) {
    let sum = 1;
    for (let i = 2; i <= num / 2; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num && num !== 1;
}

// sum of digits
function sumOfDigits(num) {
    return num.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
}

// Base /api endpoint
app.get('/api', (req, res) => {
    res.status(400).json({ error: "Please provide a number in the query, e.g., /api/classify-number?number=371" });
});

app.get('/api/classify-number', async (req, res) => {
    if (!req.query.number) {
        return res.status(400).json({ number : "alphabet" , error: "true" });
    }

    const num = parseInt(req.query.number, 10);

    // To check if input is a valid number and handle alphabets and negative numbers
    if (isNaN(num)) {
        return res.status(400).json({ number: "alphabet", error: "true" });
    }
    if (num < 0) {
        return res.status(400).json({ error: "Invalid input: negative numbers are not allowed" });
    }

    // Determine properties
    const isEven = num % 2 === 0;
    const properties = isEven ? ["even"] : ["odd"];

    if (isArmstrongNumber(num)) properties.unshift("armstrong");

    // To Fetch a fun fact from Numbers API
    let funFact = "Fun fact not available";
    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
        funFact = response.data.text;
    } catch (error) {
        console.error("Error fetching fun fact:", error.message); // just in case the API fails
    }

    // JSON response
    res.json({
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfectNumber(num),
        properties: properties,
        digit_sum: sumOfDigits(num),
        fun_fact: funFact
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
