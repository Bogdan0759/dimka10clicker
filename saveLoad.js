function saveGame(score, clickValue, autoClickerRate, scoreMultiplier, autoClickerCost, improvedFingersCost, scoreMultiplierCost, superClickCost) {
    const gameState = {
        score: score,
        clickValue: clickValue,
        autoClickerRate: autoClickerRate,
        scoreMultiplier: scoreMultiplier,
        autoClickerCost: autoClickerCost,
        improvedFingersCost: improvedFingersCost,
        scoreMultiplierCost: scoreMultiplierCost,
        superClickCost: superClickCost
    };
    localStorage.setItem('clickerGameState', JSON.stringify(gameState));
    console.log('Game saved!');
}

function loadGame() {
    const savedState = localStorage.getItem('clickerGameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        console.log('Game loaded!', gameState);
        return gameState;
    } else {
        console.log('No saved game found.');
        return null;
    }
}
