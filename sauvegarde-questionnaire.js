document.addEventListener('DOMContentLoaded', function() {
    const formulaire1 = document.getElementById('formulaire1');
    if (formulaire1) {
      formulaire1.addEventListener('submit', function(event) {
        event.preventDefault();
  
        const formData = new FormData(event.target);
        const questionnaireData1 = {};
  
        formData.forEach((value, key) => {
          questionnaireData1[key] = value;
        });
  

        localStorage.setItem('questionnaireData1', JSON.stringify(questionnaireData1));
  

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
  

        localStorage.setItem('questionnaireData2', JSON.stringify(questionnaireData2));
  

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
  

        localStorage.setItem('questionnaireData3', JSON.stringify(questionnaireData3));
  

        window.location.href = 'confirmation.html';
      });
    }
  

  });
  

  function submitQuestionnaireData(combinedData) {
    const database = firebase.database();
    const newPostRef = database.ref('questionnaires').push();
  
    return newPostRef.set(combinedData)
      .then(() => {
        console.log("Data saved successfully with key:", newPostRef.key);
        return true;
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        return false;
      });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const formulaire3 = document.getElementById('formulaire3');
    if (formulaire3) {
      formulaire3.addEventListener('submit', async function(event) {
        event.preventDefault();
  
        const formData = new FormData(event.target);
        const questionnaireData3 = {};
  
        formData.forEach((value, key) => {
          questionnaireData3[key] = value;
        });
  
        const questionnaireData1 = JSON.parse(localStorage.getItem('questionnaireData1')) || {};
        const questionnaireData2 = JSON.parse(localStorage.getItem('questionnaireData2')) || {};
        const combinedData = {
          ...questionnaireData1,
          ...questionnaireData2,
          ...questionnaireData3
        };
  
        try {
          await submitQuestionnaireData(combinedData);
  
          localStorage.removeItem('questionnaireData1');
          localStorage.removeItem('questionnaireData2');
          localStorage.removeItem('questionnaireData3');
  
          window.location.href = 'confirmation.html';
        } catch (error) {
          console.error('Error saving questionnaire data:', error);
        }
      });
    }
  });
  
  function chargerQuestionnaire() {
    const questionnaireData1 = JSON.parse(localStorage.getItem('questionnaireData1'));
    const questionnaireData2 = JSON.parse(localStorage.getItem('questionnaireData2'));
  
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
  }
  
  window.onload = chargerQuestionnaire;
  