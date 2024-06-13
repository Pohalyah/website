function verifierConnexion(){
    const utilisateurConnecte = JSON.parse(localStorage.getItem('utilisateurConnecte'));

    if (!utilisateurConnecte){
        window.location.href = 'index.html';
    } else {
        console.log(`Bienvenue, ${utilisateurConnecte.username}`);
    }
}

function chargerQuestionnaire() {
    const questionnaireData = JSON.parse(localStorage.getItem('questionnaireData'));

    if (questionnaireData) {
        Object.keys(questionnaireData).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = questionnaireData[key];
            }
        });
    }
}

window.onload = verifierConnexion;
