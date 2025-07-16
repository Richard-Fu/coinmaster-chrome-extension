// DOM Elements
const currentLevelSelect = document.getElementById('currentLevel');
const targetLevelSelect = document.getElementById('targetLevel');
const calculateBtn = document.getElementById('calculateBtn');
const resultsSection = document.getElementById('resultsSection');
const upgradeCost = document.getElementById('upgradeCost');
const levelDifference = document.getElementById('levelDifference');
const nextLevelCost = document.getElementById('nextLevelCost');

// Initialize the extension
document.addEventListener('DOMContentLoaded', function() {
    initializeSelects();
    setupEventListeners();
});

// Populate select options with village levels
function initializeSelects() {
    for (let i = 1; i <= 515; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Village ${i}`;
        currentLevelSelect.appendChild(option);
    }

    for (let i = 2; i <= 516; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Village ${i}`;
        targetLevelSelect.appendChild(option);
    }
}

// Setup event listeners
function setupEventListeners() {
    currentLevelSelect.addEventListener('change', onLevelChange);
    targetLevelSelect.addEventListener('change', onLevelChange);
    calculateBtn.addEventListener('click', calculateUpgrade);
    
    const quickBtns = document.querySelectorAll('.quick-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const levels = parseInt(this.dataset.levels);
            const currentLevel = parseInt(currentLevelSelect.value);
            
            if (currentLevel) {
                const newTarget = Math.min(currentLevel + levels, 516);
                targetLevelSelect.value = newTarget;
                onLevelChange();
            }
        });
    });
}

function onLevelChange() {
    const currentLevel = parseInt(currentLevelSelect.value);
    const targetLevel = parseInt(targetLevelSelect.value);
    
    if (currentLevel) {
        updateTargetLevelOptions(currentLevel);
    }
    
    if (currentLevel && targetLevel && targetLevel > currentLevel) {
        calculateBtn.disabled = false;
    } else {
        calculateBtn.disabled = true;
        hideResults();
    }
}

function updateTargetLevelOptions(currentLevel) {
    const currentTarget = parseInt(targetLevelSelect.value);
    
    targetLevelSelect.innerHTML = '<option value="">Select Level</option>';
    
    for (let i = currentLevel + 1; i <= 516; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Village ${i}`;
        
        if (i === currentTarget && i > currentLevel) {
            option.selected = true;
        }
        
        targetLevelSelect.appendChild(option);
    }
}

function calculateUpgrade() {
    const currentLevel = parseInt(currentLevelSelect.value);
    const targetLevel = parseInt(targetLevelSelect.value);
    
    if (!currentLevel || !targetLevel || targetLevel <= currentLevel) {
        return;
    }
    
    const totalCost = calculateUpgradeCostRange(currentLevel, targetLevel);
    const nextLevel = currentLevel + 1;
    const nextLevelCostValue = getVillageById(nextLevel)?.cost || 0;
    const levels = targetLevel - currentLevel;
    
    upgradeCost.textContent = formatCost(totalCost);
    levelDifference.textContent = levels;
    nextLevelCost.textContent = formatCost(nextLevelCostValue);
    
    showResults();
}

function calculateUpgradeCostRange(fromLevel, toLevel) {
    let totalCost = 0;
    
    for (let i = fromLevel + 1; i <= toLevel; i++) {
        const village = getVillageById(i);
        if (village) {
            totalCost += village.cost;
        }
    }
    
    return totalCost;
}

function showResults() {
    resultsSection.classList.remove('hidden');
}

function hideResults() {
    resultsSection.classList.add('hidden');
}
