

function getCurrentUserId() {
    const utilisateurConnecte = JSON.parse(localStorage.getItem('utilisateurConnecte'));
    return utilisateurConnecte ? utilisateurConnecte.userId : null;
}

function chargerQuestionnaire() {
    const userId = getCurrentUserId();
    const questionnaireData1 = JSON.parse(localStorage.getItem(`questionnaireData1_${userId}`));
    const questionnaireData2 = JSON.parse(localStorage.getItem(`questionnaireData2_${userId}`));
    const questionnaireData3 = JSON.parse(localStorage.getItem(`questionnaireData3_${userId}`));
    const questionnaireData4 = JSON.parse(localStorage.getItem(`questionnaireData4_${userId}`));
    const questionnaireData5 = JSON.parse(localStorage.getItem(`questionnaireData5_${userId}`));
    const questionnaireData6 = JSON.parse(localStorage.getItem(`questionnaireData6_${userId}`));
    const questionnaireData7 = JSON.parse(localStorage.getItem(`questionnaireData7_${userId}`));


    
    if (questionnaireData1) {
        Object.keys(questionnaireData1).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'radio') {
                    if (input.value === questionnaireData1[key]) {
                        input.checked = true;
                    }
                } else {
                    input.value = questionnaireData1[key];
                }
            }
        });
    }

    if (questionnaireData2) {
        Object.keys(questionnaireData2).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'radio') {
                    if (input.value === questionnaireData2[key]) {
                        input.checked = true;
                    }
                } else {
                    input.value = questionnaireData2[key];
                }
            }
        });
    }

    if (questionnaireData3) {
        Object.keys(questionnaireData3).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'radio') {
                    if (input.value === questionnaireData3[key]) {
                        input.checked = true;
                    }
                } else {
                    input.value = questionnaireData3[key];
                }
            }
        });
    }
    if (questionnaireData4) {
        Object.keys(questionnaireData4).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'radio') {
                    if (input.value === questionnaireData4[key]) {
                        input.checked = true;
                    }
                } else {
                    input.value = questionnaireData4[key];
                }
            }
        });
    }

    if (questionnaireData5) {
        Object.keys(questionnaireData5).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'radio') {
                    if (input.value === questionnaireData5[key]) {
                        input.checked = true;
                    }
                } else {
                    input.value = questionnaireData5[key];
                }
            }
        });
    }

    if (questionnaireData6) {
        Object.keys(questionnaireData6).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'radio') {
                    if (input.value === questionnaireData6[key]) {
                        input.checked = true;
                    }
                } else {
                    input.value = questionnaireData6[key];
                }
            }
        });
    }

    if (questionnaireData7) {
        Object.keys(questionnaireData7).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'radio') {
                    if (input.value === questionnaireData7[key]) {
                        input.checked = true;
                    }
                } else {
                    input.value = questionnaireData7[key];
                }
            }
        });
    }
}

window.onload = function() {
    verifierConnexion();
    chargerQuestionnaire();
};
