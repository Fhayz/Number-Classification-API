**NUMBER PROPERTIES API**

📍**Overview**

The Number Properties API allows users to fetch various mathematical properties of any given integer, including:

      . Prime Check (is_prime)
      
      . Perfect Number Check (is_perfect)
      
      . Armstrong Number Check (if applicable)
      
      . Odd/Even Classification
      
      . Sum of its Digits
      
      . Fun Fact from the Numbers API (http://numbersapi.com/)


✈️ **Features**

       . Accepts any valid integer as input.
      
       . Provides a structured JSON response with useful number properties.
      
       . Fetches fun facts using the Numbers API.
      
       . Handles errors gracefully.
      
       . Returns appropriate HTTP status codes.


⛏️ **Tech Stack**

        . Node.js (Zruntime)
        . Express.js (Framework)
        . Axios (For external API calls)


📩 **Installation **

1. Clone Repository
```
git clone https://github.com/Fhayz/Number-Classification-API/tree/master
```
2. Install Dependencies
```sh
npm install
```
3. Run the Server
``` nodes
node index.js
```
_or if you have nodemon installed:_
``` nodes
nodemon index.js
```

The server should now be running on HTTP://localhost:3000


**API USAGE**

**GET/number/:num**

Retrieve properties of a given number.

**Request Example:**
``` sh
GET HTTP://localhost:3000/number/589
```


**Response Example:**
``` Json
{
  "number": 589,
  "is_prime": false,
  "is_perfect": false,
  "properties": [
    "odd"
  ],
  "digit_sum": 22,
  "fun_fact": "589 is a centered tetrahedral number."
}
```


**Properties Explained**

    number → The input number.
    
    is_prime → true if the number is prime, else false.
    
    is_perfect → true if the number is a perfect number, else false.
    
    properties → Array of applicable properties (armstrong, odd, even).
    
    digit_sum → The sum of the digits of the number.
    
    fun_fact → A fun fact fetched from the Numbers API.


👨‍💻**Contributing**

Want to improve this API? Follow these steps:

1. Fork the repository.

2. Create a new branch (feature/improvement-name).

3. Commit and push changes.

4. Submit a pull request.

    
     
     
    
