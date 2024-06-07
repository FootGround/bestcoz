document.addEventListener("DOMContentLoaded", function() {
    const sheetId = '1A_mwroK537YHoLzs4LCqlBHulvN_hjUi-v27MFB2dEA/edit?usp=sharing';
    const apiKey = 'AIzaSyCnvZYPcxgbu4npR21eq2dAUB-_mZEiuus';
    
    // Fetch quiz data from Google Sheets
    async function fetchQuizData() {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/content?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.values;
    }

    // Fetch educational content from Google Sheets
    async function fetchContentData() {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/structure?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.values;
    }

    // Display content and quiz
    async function displayContentAndQuiz() {
        const quizData = await fetchQuizData();
        const contentData = await fetchContentData();

        // Display educational content
        const contentDiv = document.createElement('div');
        contentData.forEach(content => {
            const p = document.createElement('p');
            p.textContent = content[2];
            contentDiv.appendChild(p);
        });
        document.getElementById('content').appendChild(contentDiv);

        // Display quiz
        const quizDiv = document.createElement('div');
        quizData.forEach((question, index) => {
            const qDiv = document.createElement('div');
            qDiv.innerHTML = `
                <p>${index + 1}. ${question[0]}</p>
                <label><input type="radio" name="q${index}" value="A"> ${question[1]}</label><br>
                <label><input type="radio" name="q${index}" value="B"> ${question[2]}</label><br>
                <label><input type="radio" name="q${index}" value="C"> ${question[3]}</label><br>
                <label><input type="radio" name="q${index}" value="D"> ${question[4]}</label>
            `;
            quizDiv.appendChild(qDiv);
        });
        document.getElementById('content').appendChild(quizDiv);
    }

    displayContentAndQuiz();
});
