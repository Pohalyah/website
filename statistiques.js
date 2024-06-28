
const firebaseConfig = {
    apiKey: "AIzaSyASDFQ3PARlE_AUK43jsa5dadcupRFwnrg",
    authDomain: "websitedb-jc.firebaseapp.com",
    databaseURL: "https://websitedb-jc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "websitedb-jc",
    storageBucket: "websitedb-jc.appspot.com",
    messagingSenderId: "284052306058",
    appId: "1:284052306058:web:d1a072d0f0972392355573",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();


async function getArchivedFormData() {
    try {
        const snapshot = await database.ref('archives').once('value');
        return snapshot.val();
    } catch (error) {
        console.error("Error retrieving archived data from Firebase:", error);
        return null;
    }
}

function getYearFromDate(dateString) {
    if (!dateString || typeof dateString !== 'string') return 'N/A';
    const [year, month, day] = dateString.split('-');
    return year;
}


function generateStatistics(data) {
    const statisticsContainer = document.getElementById('statistics-container');
    statisticsContainer.innerHTML = '';

    let totalForms = 0;
    const stats = {};

    Object.values(data).forEach(forms => {
        totalForms += Object.keys(forms).length;
        Object.values(forms).forEach(form => {
            for (let [key, value] of Object.entries(form)) {
               
                if (key === "Bilan" || key === "Appréciation générale" || key === "bilan") {
                    continue;
                }

                if (key === "Notation proposée sur 20") {
                    value = parseInt(value, 10).toString(); 
                }

                if (key === "Nombre de jours d'absence") {
                    value = parseInt(value, 10).toString(); 
                }

                if (!stats[key]) {
                    stats[key] = {};
                }
                if (!stats[key][value]) {
                    stats[key][value] = 0;
                }
                stats[key][value]++;
            }
        });
    });

    const statisticsHtml = `
        <h3 class="stats-little-tilte">Statistiques</h3>
        <p class="stats-text">Nombre total de formulaires: ${totalForms}</p>
        <button id="toggleChartsButton" onclick="toggleAllChartsVisibility()" class="afficher-masquer-tous-button">Afficher/Masquer tous</button>
        <div id="charts-container" class="charts-wrapper"></div>
    `;
    statisticsContainer.innerHTML = statisticsHtml;

    const chartsContainer = document.getElementById('charts-container');

    Object.entries(stats).forEach(([question, answers], index) => {
        const chartContainer = document.createElement('div');
        chartContainer.classList.add('chart-container');
        chartContainer.innerHTML = `
            <h4 class="stats-title-question">${question}</h4>
            <button class="toggle-chart-btn" onclick="toggleChartVisibility(${index})">Afficher/Masquer</button>
            <canvas id="chart${index}" style="display: none;" width="400" height="300"></canvas>
        `;
        chartsContainer.appendChild(chartContainer);

        const canvas = document.getElementById(`chart${index}`);
        canvas.chartData = {
            labels: Object.keys(answers),
            label: question,
            data: Object.values(answers),
            backgroundColor: Object.keys(answers).map(() => getRandomColor()),
        };

        const ctx = canvas.getContext('2d');
        canvas.chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(answers),
                datasets: [{
                    label: question,
                    data: Object.values(answers),
                    backgroundColor: Object.keys(answers).map(() => getRandomColor()),
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                }
            }
        });
    });

    const toggleButton = document.getElementById('toggleChartsButton');
    if (Object.keys(stats).length > 0) {
        toggleButton.style.display = 'block';
    } else {
        toggleButton.style.display = 'none';
    }

    const toggleChartButtons = document.querySelectorAll('.toggle-chart-btn');
    toggleChartButtons.forEach(button => {
        button.style.display = 'block';
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function toggleChartVisibility(index) {
    const chartCanvas = document.getElementById(`chart${index}`);
    const isVisible = chartCanvas.style.display === 'block';

    if (chartCanvas.chartInstance) {
        chartCanvas.chartInstance.destroy();
        chartCanvas.chartInstance = null;
    }

    if (!isVisible) {
        chartCanvas.style.display = 'block';
        const ctx = chartCanvas.getContext('2d');
        chartCanvas.chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartCanvas.chartData.labels,
                datasets: [{
                    label: chartCanvas.chartData.label,
                    data: chartCanvas.chartData.data,
                    backgroundColor: chartCanvas.chartData.backgroundColor,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                }
            }
        });
    } else {
        chartCanvas.style.display = 'none';
    }
}

function toggleAllChartsVisibility() {
    const chartsContainer = document.getElementById('charts-container');
    const chartContainers = chartsContainer.getElementsByClassName('chart-container');

    Array.from(chartContainers).forEach((chartContainer, index) => {
        const chartCanvas = chartContainer.querySelector('canvas');
        const isVisible = chartCanvas.style.display === 'block';

        if (chartCanvas.chartInstance) {
            chartCanvas.chartInstance.destroy();
            chartCanvas.chartInstance = null;
        }

        if (!isVisible) {
            chartCanvas.style.display = 'block';
            const ctx = chartCanvas.getContext('2d');
            chartCanvas.chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartCanvas.chartData.labels,
                    datasets: [{
                        label: chartCanvas.chartData.label,
                        data: chartCanvas.chartData.data,
                        backgroundColor: chartCanvas.chartData.backgroundColor,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    }
                }
            });
        } else {
            chartCanvas.style.display = 'none';
        }
    });
}

async function applyFilters() {
    const yearFilterValue = document.getElementById('yearFilter').value;
    const nameFilterValue = document.getElementById('nameFilter').value.toLowerCase();

    const data = await getArchivedFormData();

    if (!data) {
        alert('Erreur lors de la récupération des données. Veuillez réessayer.');
        return;
    }

    const filteredData = {};
    Object.entries(data).forEach(([year, forms]) => {
        Object.entries(forms).forEach(([key, formData]) => {
            const dateDebutStage = formData["Date de début du stage"];
            const dateFinStage = formData["Date de fin du stage"];
            const nomProfesseur = formData["Nom du professeur"];
            const nomEntreprise = formData["Nom de l'entreprise"];
            const nomTuteur = formData["Nom du tuteur"];

            const yearDebut = getYearFromDate(dateDebutStage);
            const yearFin = getYearFromDate(dateFinStage);

            if ((yearFilterValue === '' || yearFilterValue === yearDebut || yearFilterValue === yearFin) &&
                (nameFilterValue === '' ||
                    formData["Nom de l'élève"].toLowerCase().includes(nameFilterValue) ||
                    nomProfesseur.toLowerCase().includes(nameFilterValue) ||
                    nomEntreprise.toLowerCase().includes(nameFilterValue) ||
                    nomTuteur.toLowerCase().includes(nameFilterValue))) {
                if (!filteredData[year]) {
                    filteredData[year] = {};
                }
                filteredData[year][key] = formData;
            }
        });
    });

    generateStatistics(filteredData);
}

async function populateYearFilterOptions() {
    const data = await getArchivedFormData();
    if (!data) {
        return;
    }

    const yearFilter = document.getElementById('yearFilter');
    const allYears = new Set();

    Object.keys(data).forEach(year => {
        allYears.add(year);
    });

    Array.from(allYears)
        .filter(year => year !== 'N/A')
        .sort()
        .forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        });
}

window.onload = function() {
    populateYearFilterOptions();
};

