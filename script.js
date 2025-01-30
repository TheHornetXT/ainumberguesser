// Initialize variables
const numbersDisplay = document.getElementById('numbersDisplay');
const trackedNumbers = document.getElementById('trackedNumbers');
const numberInput = document.getElementById('numberInput');
const aiGuessValue = document.getElementById('aiGuessValue');

// Create an array to track the numbers entered
let enteredNumbers = [];
let numberCounts = {};

// Generate numbers 1-100 on the right side
for (let i = 1; i <= 100; i++) {
    const numberItem = document.createElement('div');
    numberItem.textContent = `${i}:`;
    numbersDisplay.appendChild(numberItem);
}

// Function to update the displayed numbers
function updateDisplay() {
    // Clear the current display
    numbersDisplay.innerHTML = '';
    trackedNumbers.innerHTML = '';

    // Update the numbers list
    for (let i = 1; i <= 100; i++) {
        const numberItem = document.createElement('div');
        numberItem.textContent = `${i}: ${numberCounts[i] || ''}`;
        numbersDisplay.appendChild(numberItem);
    }

    // Update the tracked numbers list
    enteredNumbers.forEach((num, index) => {
        const trackedItem = document.createElement('div');
        trackedItem.textContent = `Entry ${index + 1}: ${num}`;
        trackedNumbers.appendChild(trackedItem);
    });
}

// Function to make the AI guess
function makeAIGuess() {
    if (enteredNumbers.length === 0) {
        aiGuessValue.textContent = '-';
        return;
    }

    // Find the most frequently entered number
    let mostFrequentNumber = Object.keys(numberCounts).reduce((a, b) => 
        numberCounts[a] > numberCounts[b] ? a : b
    );

    // Update the AI guess
    aiGuessValue.textContent = mostFrequentNumber;
}

// Event listener for input
numberInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const num = parseInt(event.target.value);

        // Validate the input
        if (num >= 1 && num <= 100) {
            // Add the number to the enteredNumbers array
            enteredNumbers.push(num);

            // Update the count for the entered number
            if (!numberCounts[num]) {
                numberCounts[num] = 1;
            } else {
                numberCounts[num]++;
            }

            // Update the display
            updateDisplay();

            // Make the AI guess
            makeAIGuess(); // Fixed the typo here

            // Clear the input
            event.target.value = '';
        } else {
            alert('Please enter a number between 1 and 100.');
        }
    }
});