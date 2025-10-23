let currentCtScore = 0;
let currentTScore = 0;
let currentCtTeam = 'TEAM 1';
let currentTTeam = 'TEAM 2';
let isInitialLoad = true;

function updateScoreDisplay(team, score) {
    const element = document.getElementById(team === 'ct' ? 'ctScore' : 'tScore');
    element.textContent = score;
    
    if (!isInitialLoad) {
        element.classList.remove('update');
        void element.offsetWidth;
        element.classList.add('update');
    }
}

function updateTeamName(team, name) {
    const element = document.getElementById(team === 'ct' ? 'ctTeamName' : 'tTeamName');
    element.textContent = name;
}

const scoresRef = database.ref('scores');

scoresRef.on('value', (snapshot) => {
    const data = snapshot.val();
    
    if (data) {
        const newCtScore = data.ct || 0;
        const newTScore = data.t || 0;
        const newCtTeam = data.ctTeam || 'TEAM 1';
        const newTTeam = data.tTeam || 'TEAM 2';
        
        if (newCtScore !== currentCtScore) {
            currentCtScore = newCtScore;
            updateScoreDisplay('ct', newCtScore);
        }
        
        if (newTScore !== currentTScore) {
            currentTScore = newTScore;
            updateScoreDisplay('t', newTScore);
        }
        
        if (newCtTeam !== currentCtTeam) {
            currentCtTeam = newCtTeam;
            updateTeamName('ct', newCtTeam);
        }
        
        if (newTTeam !== currentTTeam) {
            currentTTeam = newTTeam;
            updateTeamName('t', newTTeam);
        }
        
        if (isInitialLoad) {
            isInitialLoad = false;
        }
    }
});