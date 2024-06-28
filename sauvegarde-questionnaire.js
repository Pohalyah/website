document.addEventListener('DOMContentLoaded', function() {
    const userId = getCurrentUserId();
    

    function saveToLocalStorage(formId, questionnaireData) {
        localStorage.setItem(`${formId}_${userId}`, JSON.stringify(questionnaireData));
    }

    async function getNextQuestionnaireId() {
        try {
            const snapshot = await firebase.database().ref('lastQuestionnaireId').once('value');
            let lastId = snapshot.val();

            if (lastId === null) {
                lastId = 0;
            }

            const nextId = lastId + 1;
            await firebase.database().ref('lastQuestionnaireId').set(nextId);

            return nextId.toString().padStart(5, '0'); 
        } catch (error) {
            console.error('Error getting next questionnaire ID:', error);
            throw error;
        }
    }

    async function saveToFirebase(combinedData) {
        try {
            const database = firebase.database();
            const questionnaireId = await getNextQuestionnaireId();
    
            if (!questionnaireId) {
                throw new Error('Failed to get a valid questionnaire ID.');
            }
    
            const newPostRef = database.ref(`questionnaires/${questionnaireId}`);
            await newPostRef.set(combinedData);
            console.log("Data saved successfully with key:", questionnaireId);
    
            return true;
        } catch (error) {
            console.error('Error saving data:', error.message);
            return false;
        }
    }

    const formulaire1 = document.getElementById('formulaire1');
    if (formulaire1) {
        formulaire1.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const questionnaireData1 = {};

            formData.forEach((value, key) => {
                questionnaireData1[key] = value;
            });

            localStorage.setItem('lastCompletedPage', 'page1');
            saveToLocalStorage('questionnaireData1', questionnaireData1);
            window.location.href = 'questionnaire2.html';
        });
    }

    const formulaire2 = document.getElementById('formulaire2');
    if (formulaire2) {
        formulaire2.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const questionnaireData2 = {};

            formData.forEach((value, key) => {
                questionnaireData2[key] = value;
            });

            localStorage.setItem('lastCompletedPage', 'page2');
            saveToLocalStorage('questionnaireData2', questionnaireData2);
            window.location.href = 'questionnaire3.html';
        });
    }

    const formulaire3 = document.getElementById('formulaire3');
    if (formulaire3) {
        formulaire3.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const questionnaireData3 = {};

            formData.forEach((value, key) => {
                questionnaireData3[key] = value;
            });

            localStorage.setItem('lastCompletedPage', 'page3');
            saveToLocalStorage('questionnaireData3', questionnaireData3);
            window.location.href = 'questionnaire4.html';
        });
    }

    const formulaire4 = document.getElementById('formulaire4');
    if (formulaire4) {
        formulaire4.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const questionnaireData4 = {};

            formData.forEach((value, key) => {
                questionnaireData4[key] = value;
            });

            localStorage.setItem('lastCompletedPage', 'page4');
            saveToLocalStorage('questionnaireData4', questionnaireData4);
            window.location.href = 'questionnaire5.html';
        });
    }

    const formulaire5 = document.getElementById('formulaire5');
    if (formulaire5) {
        formulaire5.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const questionnaireData5 = {};

            formData.forEach((value, key) => {
                questionnaireData5[key] = value;
            });

            localStorage.setItem('lastCompletedPage', 'page5');
            saveToLocalStorage('questionnaireData5', questionnaireData5);
            window.location.href = 'questionnaire6.html';
        });
    }

    const formulaire6 = document.getElementById('formulaire6');
    if (formulaire6) {
        formulaire6.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const questionnaireData6 = {};

            formData.forEach((value, key) => {
                questionnaireData6[key] = value;
            });

            localStorage.setItem('lastCompletedPage', 'page6');
            saveToLocalStorage('questionnaireData6', questionnaireData6);
            window.location.href = 'questionnaire7.html';
        });
    }

    const formulaire7 = document.getElementById('formulaire7');
    if (formulaire7) {
        formulaire7.addEventListener('submit', async function(event) {
            event.preventDefault();
    
            const formData = new FormData(event.target);
            const questionnaireData7 = {};
    
            formData.forEach((value, key) => {
                questionnaireData7[key] = value;
            });
    
            const questionnaireData1 = JSON.parse(localStorage.getItem(`questionnaireData1_${userId}`)) || {};
            const questionnaireData2 = JSON.parse(localStorage.getItem(`questionnaireData2_${userId}`)) || {};
            const questionnaireData3 = JSON.parse(localStorage.getItem(`questionnaireData3_${userId}`)) || {};
            const questionnaireData4 = JSON.parse(localStorage.getItem(`questionnaireData4_${userId}`)) || {};
            const questionnaireData5 = JSON.parse(localStorage.getItem(`questionnaireData5_${userId}`)) || {};
            const questionnaireData6 = JSON.parse(localStorage.getItem(`questionnaireData6_${userId}`)) || {};
    
            const combinedData = {
                ...questionnaireData1,
                ...questionnaireData2,
                ...questionnaireData3,
                ...questionnaireData4,
                ...questionnaireData5,
                ...questionnaireData6,
                ...questionnaireData7
            };

            console.log(combinedData);


            localStorage.removeItem('lastCompletedPage')
            saveToLocalStorage('questionnaireData7', questionnaireData7);
            await saveToFirebase(combinedData);

            localStorage.removeItem(`questionnaireData1_${userId}`);
            localStorage.removeItem(`questionnaireData2_${userId}`);
            localStorage.removeItem(`questionnaireData3_${userId}`);
            localStorage.removeItem(`questionnaireData4_${userId}`);
            localStorage.removeItem(`questionnaireData5_${userId}`);
            localStorage.removeItem(`questionnaireData6_${userId}`);
            localStorage.removeItem(`questionnaireData7_${userId}`);
    
            window.location.href = 'confirmation.html';
            
        });
    }

    function loadQuestionnaireData() {
        const questionnaireData1 = JSON.parse(localStorage.getItem(`questionnaireData1_${userId}`));
        const questionnaireData2 = JSON.parse(localStorage.getItem(`questionnaireData2_${userId}`));
        const questionnaireData3 = JSON.parse(localStorage.getItem(`questionnaireData3_${userId}`));
        const questionnaireData4 = JSON.parse(localStorage.getItem(`questionnaireData4_${userId}`));
        const questionnaireData5 = JSON.parse(localStorage.getItem(`questionnaireData5_${userId}`));
        const questionnaireData6 = JSON.parse(localStorage.getItem(`questionnaireData6_${userId}`));
  
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
    }
  
    loadQuestionnaireData();
    
});
