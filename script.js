let score = 0;
let clickValue = 1; // Points per click
let autoClickerRate = 0; // Points per second from auto-clicker
let scoreMultiplier = 1; // Multiplier for all score gains

let autoClickerCost = 50;
let improvedFingersCost = 100;
let scoreMultiplierCost = 200;
let superClickCost = 500;

const scoreElement = document.getElementById('Score');
const clickButton = document.getElementById('clickButton');
const shopIcon = document.getElementById('shopIcon');
const shopContainer = document.getElementById('shop');

const autoClickerItem = document.getElementById('autoClicker');
const improvedFingersItem = document.getElementById('improvedFingers');
const scoreMultiplierItem = document.getElementById('scoreMultiplier');

let lastClickTime = 0;
const clickThreshold = 100; // Minimum time in milliseconds between clicks

// Update score display
function updateScoreDisplay() {
    scoreElement.textContent = Math.floor(score);
}



// Load game state on startup
const savedState = loadGame();
if (savedState) {
    score = savedState.score;
    clickValue = savedState.clickValue;
    autoClickerRate = savedState.autoClickerRate;
    scoreMultiplier = savedState.scoreMultiplier;
    autoClickerCost = savedState.autoClickerCost || 50; // Load cost or use default
    improvedFingersCost = savedState.improvedFingersCost || 100; // Load cost or use default
    scoreMultiplierCost = savedState.scoreMultiplierCost || 200; // Load cost or use default
    superClickCost = savedState.superClickCost || 500; // Load cost or use default
    updateScoreDisplay();
    // Update shop item costs display
    autoClickerItem.querySelector('.cost').textContent = autoClickerCost;
    improvedFingersItem.querySelector('.cost').textContent = improvedFingersCost;
    scoreMultiplierItem.querySelector('.cost').textContent = scoreMultiplierCost;
    // TODO: Update superClick cost display if needed
}

// Handle manual clicks
clickButton.addEventListener('click', () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime > clickThreshold) {
        score += clickValue * scoreMultiplier;
        updateScoreDisplay();
        lastClickTime = currentTime;
    }
});

// Toggle shop visibility
shopIcon.addEventListener('click', () => {
    if (shopContainer.style.display === 'none') {
        shopContainer.style.display = 'block';
    } else {
        shopContainer.style.display = 'none';
    }
});

// Handle shop item purchases
autoClickerItem.querySelector('.buy-button').addEventListener('click', () => {
    const costElement = autoClickerItem.querySelector('.cost');
    let cost = autoClickerCost; // Use the variable
    if (score >= cost) {
        score -= cost;
        autoClickerRate += 1; // Increase auto-click rate
        autoClickerCost = Math.floor(cost * 1.5); // Update the variable
        costElement.textContent = autoClickerCost; // Update display
        updateScoreDisplay();
        saveGame(score, clickValue, autoClickerRate, scoreMultiplier, autoClickerCost, improvedFingersCost, scoreMultiplierCost, superClickCost); // Save all state
    } else {
        alert('Недостаточно очков!');
    }
});

improvedFingersItem.querySelector('.buy-button').addEventListener('click', () => {
    const costElement = improvedFingersItem.querySelector('.cost');
    let cost = improvedFingersCost; // Use the variable
    if (score >= cost) {
        score -= cost;
        clickValue += 1; // Increase click value
        improvedFingersCost = Math.floor(cost * 1.8); // Update the variable
        costElement.textContent = improvedFingersCost; // Update display
        updateScoreDisplay();
        saveGame(score, clickValue, autoClickerRate, scoreMultiplier, autoClickerCost, improvedFingersCost, scoreMultiplierCost, superClickCost); // Save all state
    } else {
        alert('Недостаточно очков!');
    }
});

scoreMultiplierItem.querySelector('.buy-button').addEventListener('click', () => {
    const costElement = scoreMultiplierItem.querySelector('.cost');
    let cost = scoreMultiplierCost; // Use the variable
    if (score >= cost) {
        score -= cost;
        scoreMultiplier *= 2; // Double the score multiplier
        scoreMultiplierCost = Math.floor(cost * 3); // Update the variable
        costElement.textContent = scoreMultiplierCost; // Update display
        updateScoreDisplay();
        saveGame(score, clickValue, autoClickerRate, scoreMultiplier, autoClickerCost, improvedFingersCost, scoreMultiplierCost, superClickCost); // Save all state
    } else {
        alert('Недостаточно очков!');
    }
});

// Auto-clicker interval
setInterval(() => {
    score += autoClickerRate * scoreMultiplier;
    updateScoreDisplay();
}, 1000); // Add points every 1000ms (1 second)

// Save game periodically
setInterval(() => {
    saveGame(score, clickValue, autoClickerRate, scoreMultiplier, autoClickerCost, improvedFingersCost, scoreMultiplierCost, superClickCost); // Save all state
}, 10000); // Save every 10 seconds
