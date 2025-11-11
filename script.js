// Get DOM elements
const countElement = document.getElementById('count');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');

// Initialize counter value
let count = 0;

// Update display function
function updateDisplay() {
    countElement.textContent = count;
    
    // Add visual feedback
    countElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        countElement.style.transform = 'scale(1)';
    }, 200);
}

// Increment function
incrementBtn.addEventListener('click', () => {
    count++;
    updateDisplay();
});

// Decrement function
decrementBtn.addEventListener('click', () => {
    count--;
    updateDisplay();
});

// Reset function
resetBtn.addEventListener('click', () => {
    count = 0;
    updateDisplay();
});

// Initialize display
updateDisplay();

