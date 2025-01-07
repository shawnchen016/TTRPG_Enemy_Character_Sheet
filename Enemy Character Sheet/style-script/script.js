let glabrezuHealth = {
    total: 157,
    current: 157
};

// Track the number of times each spell has been cast
let spellCastCount = {
    'Confusion': 0,
    'Fly': 0,
    'Power Word Stun': 0
};

function setTotalHealthGlabrezu() {
    const healthInput = document.getElementById('glabrezu-health-input').value;
    glabrezuHealth.total = parseInt(healthInput);
    glabrezuHealth.current = glabrezuHealth.total;
    document.getElementById('glabrezu-total-health').innerText = glabrezuHealth.total;
    document.getElementById('glabrezu-current-health').innerText = glabrezuHealth.current;
    updateHealthBarGlabrezu();
    logEvent(`Glabrezu total health set to ${glabrezuHealth.total}`);
}

function applyDamageGlabrezu() {
    const damage = parseInt(document.getElementById('glabrezu-damage-input').value);
    glabrezuHealth.current = Math.max(0, glabrezuHealth.current - damage);
    document.getElementById('glabrezu-current-health').innerText = glabrezuHealth.current;
    updateHealthBarGlabrezu();
    logEvent(`Glabrezu received ${damage} damage, current health = ${glabrezuHealth.current}`);
}

function applyHealingGlabrezu() {
    const healing = parseInt(document.getElementById('glabrezu-damage-input').value);
    glabrezuHealth.current = Math.min(glabrezuHealth.total, glabrezuHealth.current + healing);
    document.getElementById('glabrezu-current-health').innerText = glabrezuHealth.current;
    updateHealthBarGlabrezu();
    logEvent(`Glabrezu received ${healing} healing, current health = ${glabrezuHealth.current}`);
}

function updateHealthBarGlabrezu() {
    const healthBar = document.getElementById('glabrezu-health-bar');
    const healthStatus = document.getElementById('glabrezu-health-status');
    const healthPercentage = (glabrezuHealth.current / glabrezuHealth.total) * 100;
    healthBar.style.width = healthPercentage + '%';

    if (glabrezuHealth.current === 0) {
        healthStatus.innerText = "Dead";
    } else {
        healthStatus.innerText = glabrezuHealth.current + " HP";
    }

    if (healthPercentage > 50) {
        healthBar.style.backgroundColor = '#ff9999'; // Light red
        healthBar.style.animation = 'none';
    } else if (healthPercentage > 25) {
        healthBar.style.backgroundColor = '#ff6666'; // Medium red
        healthBar.style.animation = 'none';
    } else if (healthPercentage > 10) {
        healthBar.style.backgroundColor = '#ff3333'; // Deep red
        healthBar.style.animation = 'none';
    } else {
        healthBar.style.backgroundColor = '#ff0000'; // Deep red (strobe)
        healthBar.style.animation = 'strobe 1s infinite';
    }
}

function rollForAttackGlabrezu(attack) {
    const roll = Math.floor(Math.random() * 20) + 1;
    let damage = 0;
    if (attack === 'Pincer') {
        damage = Math.floor(Math.random() * 10 + 1) + Math.floor(Math.random() * 10 + 1) + 5;
    } else if (attack === 'Fist') {
        damage = Math.floor(Math.random() * 4 + 1) + Math.floor(Math.random() * 4 + 1) + 2;
    }
    logEvent(`Glabrezu used ${attack} with a damage of ${damage}`);
}

function rollToHitGlabrezu(spell) {
    const roll = Math.floor(Math.random() * 20) + 1;
    const spellBonus = 16; // Example spellcasting modifier
    const total = roll + spellBonus;
    logEvent(`${spell} roll to hit: ${roll} + ${spellBonus} (${total})`);
}

function glabrezuRandomAttack() {
    const attacks = [
        "Multiattack: The glabrezu makes four attacks: two with its pincers and two with its fists. Alternatively, it makes two attacks with its pincers and casts one spell.",
        "Pincer Attack: The glabrezu makes a pincer attack.",
        "Fist Attack: The glabrezu makes a fist attack.",
        "Cast Spell: The glabrezu casts a spell."
    ];
    const randomIndex = Math.floor(Math.random() * attacks.length);
    const selectedAttack = attacks[randomIndex];
    logEvent(`Glabrezu uses ${selectedAttack} and ends its turn.`);
}

function castSpellGlabrezu(spell) {
    if (spell in spellCastCount) {
        spellCastCount[spell]++;
        logEvent(`Glabrezu cast ${spell} for the ${spellCastCount[spell]}${getOrdinal(spellCastCount[spell])} time`);
    } else {
        logEvent(`Glabrezu cast ${spell}`);
    }
}

function getOrdinal(n) {
    const s=["th","st","nd","rd"],
    v=n%100;
    return (s[(v-20)%10]||s[v]||s[0]);
}

function rollAbilityCheckGlabrezu(modifier) {
    const roll = Math.floor(Math.random() * 20) + 1;
    const modValue = parseInt(modifier.replace('+', ''));
    const total = roll + modValue;
    logEvent(`Ability check rolled: 1d20 + ${modValue} (${total})`);
}

function logEvent(message) {
    const logContainer = document.getElementById('log-container');
    const logEntry = document.createElement('p');
    logEntry.innerText = message;
    logContainer.prepend(logEntry);
    logContainer.scrollTop = 0; // Keep the scroll at the top
}
