const express = require('express');
const axios = require('axios'); // axios for API requests
const cors = require('cors'); // cors package

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS

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
    res.status(400).json({
        number: "alphabet",
        error: true,
        is_prime: false,
        is_perfect: false,
        properties: [],
        digit_sum: 0,
        fun_fact: "Fun fact not available"
    });
});

app.get('/api/classify-number', async (req, res) => {
    const input = req.query.number;

    // Initialize default values for response fields
    let num = input;
    let is_prime = false;
    let is_perfect = false;
    let properties = [];
    let digit_sum = 0;
    let fun_fact = "Fun fact not available";

    // Check if input is provided
    if (!input) {
        return res.status(400).json({
            number: "",
            error: true,
            is_prime: is_prime,
            is_perfect: is_perfect,
            properties: properties,
            digit_sum: digit_sum,
            fun_fact: fun_fact
        });
    }

    // Parse input to integer
    num = parseInt(input, 10);

    // Check if input is a valid number and handle alphabets and mixed inputs like "432ftere2"
    if (isNaN(num) || /\D/.test(input) || num < 0) {
        return res.status(400).json({
            number: input,
            error: true,
            is_prime: is_prime,
            is_perfect: is_perfect,
            properties: properties,
            digit_sum: digit_sum,
            fun_fact: fun_fact
        });
    }

    // Calculate properties if input is a valid number
    is_prime = isPrime(num);
    is_perfect = isPerfectNumber(num);
    digit_sum = sumOfDigits(num);

    const isEven = num % 2 === 0;
    properties = isEven ? ["even"] : ["odd"];

    if (isArmstrongNumber(num)) {
        properties.unshift("armstrong");
    }

    // Fetch a fun fact from Numbers API
    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
        fun_fact = response.data.text;
    } catch (error) {
        console.error("Error fetching fun fact:", error.message); // just in case the API fails
    }

    // JSON response
    res.json({
        number: num,
        is_prime: is_prime,
        is_perfect: is_perfect,
        properties: properties,
        digit_sum: digit_sum,
        fun_fact: fun_fact
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
