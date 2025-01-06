let totalHealth = 157;
let currentHealth = 157;
const spellSlots = {
    level1: 3,
    level3: 1
};

function setTotalHealth() {
    const healthInput = document.getElementById('health-input').value;
    totalHealth = parseInt(healthInput);
    currentHealth = totalHealth;
    document.getElementById('total-health').innerText = totalHealth;
    document.getElementById('current-health').innerText = currentHealth;
    updateHealthBar();
    logEvent(`Hit point total modified from 0 to ${totalHealth}`);
}

function applyDamage() {
    const damage = parseInt(document.getElementById('damage-input').value);
    const oldHealth = currentHealth;
    currentHealth = Math.max(0, currentHealth - damage);
    document.getElementById('current-health').innerText = currentHealth;
    updateHealthBar();
    logEvent(`${damage} damage received, remaining hitpoints = ${currentHealth}`);
}

function applyHealing() {
    const healing = parseInt(document.getElementById('damage-input').value);
    const oldHealth = currentHealth;
    currentHealth = Math.min(totalHealth, currentHealth + healing);
    document.getElementById('current-health').innerText = currentHealth;
    updateHealthBar();
    logEvent(`${healing} healing received, remaining hitpoints = ${currentHealth}`);
}

function updateHealthBar() {
    const healthBar = document.getElementById('health-bar');
    const healthStatus = document.getElementById('health-status');
    const healthPercentage = (currentHealth / totalHealth) * 100;
    healthBar.style.width = healthPercentage + '%';

    if (currentHealth === 0) {
        healthStatus.innerText = "Dead";
    } else {
        healthStatus.innerText = currentHealth + " HP";
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

function rollForAttack(attack) {
    const roll = Math.floor(Math.random() * 20) + 1;
    let damage = 0;
    if (attack === 'Pincer') {
        damage = Math.floor(Math.random() * 10 + 1) + Math.floor(Math.random() * 10 + 1) + 5;
    } else if (attack === 'Fist') {
        damage = Math.floor(Math.random() * 4 + 1) + Math.floor(Math.random() * 4 + 1) + 2;
    }
    logEvent(`Enemy used ${attack} with a damage of ${damage}`);
}

function rollToHit(attack) {
    const roll = Math.floor(Math.random() * 20) + 1;
    const hitBonus = 9;
    const total = roll + hitBonus;
    logEvent(`Enemy used ${attack} with a roll to hit of ${roll} + ${hitBonus} (${total})`);
}

function randomAttack() {
    const attacks = [
        "Multiattack: The glabrezu makes four attacks: two with its pincers and two with its fists. Alternatively, it makes two attacks with its pincers and casts one spell.",
        "Pincer Attack: The glabrezu makes a pincer attack.",
        "Fist Attack: The glabrezu makes a fist attack.",
        "Cast Spell: The glabrezu casts a spell."
    ];
    const randomIndex = Math.floor(Math.random() * attacks.length);
    const selectedAttack = attacks[randomIndex];
    logEvent(`Monster uses ${selectedAttack} and ends its turn.`);
}

function logEvent(message) {
    const logContainer = document.getElementById('log-container');
    const logEntry = document.createElement('p');
    logEntry.innerText = message;
    logContainer.prepend(logEntry);
    logContainer.scrollTop = 0; // Keep the scroll at the top
}

function rollSpell(spell) {
    const roll = Math.floor(Math.random() * 20) + 1;
    const spellBonus = 8; // Example spellcasting modifier
    const total = roll + spellBonus;
    logEvent(`Spell ${spell} roll to hit: ${roll} + ${spellBonus} (${total})`);
}

function castSpell(spell, level) {
    if (spellSlots[level] > 0) {
        spellSlots[level]--;
        document.getElementById(`${level}-slots`).innerText = spellSlots[level];
        logEvent(`Spell ${spell} cast.`);
    } else {
        logEvent(`No spell slots left for ${spell}.`);
    }
}

function rollAbilityCheck(modifier) {
    const roll = Math.floor(Math.random() * 20) + 1;
    const modValue = parseInt(modifier.replace('+', ''));
    const total = roll + modValue;
    logEvent(`Ability check rolled: 1d20 + ${modValue} (${total})`);
}
