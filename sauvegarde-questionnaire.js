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

        const newPostRef = database.ref(`questionnaires/${questionnaireId}`);
        await newPostRef.set(combinedData);
        console.log("Data saved successfully with key:", questionnaireId);

        return true;
    } catch (error) {
        console.error('Error saving data:', error);
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

          localStorage.setItem('lastCompletedPage','page1')
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
          localStorage.removeItem('page1');
          saveToLocalStorage('questionnaireData2', questionnaireData2);
          localStorage.setItem('lastCompletedPage', 'page2');
          window.location.href = 'questionnaire3.html';
      });
  }

  const formulaire3 = document.getElementById('formulaire3');
  if (formulaire3) {
      formulaire3.addEventListener('submit', async function(event) {
          event.preventDefault();

          const formData = new FormData(event.target);
          const questionnaireData3 = {};

          formData.forEach((value, key) => {
              questionnaireData3[key] = value;
          });

          const questionnaireData1 = JSON.parse(localStorage.getItem(`questionnaireData1_${userId}`)) || {};
          const questionnaireData2 = JSON.parse(localStorage.getItem(`questionnaireData2_${userId}`)) || {};

          const combinedData = {
              ...questionnaireData1,
              ...questionnaireData2,
              ...questionnaireData3
          };
          localStorage.removeItem('lastCompletedPage')
          saveToLocalStorage('questionnaireData3', questionnaireData3);
          await saveToFirebase(combinedData);

          localStorage.removeItem(`questionnaireData1_${userId}`);
          localStorage.removeItem(`questionnaireData2_${userId}`);
          localStorage.removeItem(`questionnaireData3_${userId}`);

          window.location.href = 'confirmation.html';
      });
  }

  function loadQuestionnaireData() {
      const questionnaireData1 = JSON.parse(localStorage.getItem(`questionnaireData1_${userId}`));
      const questionnaireData2 = JSON.parse(localStorage.getItem(`questionnaireData2_${userId}`));

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

  loadQuestionnaireData();
});
