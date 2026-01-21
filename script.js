const quizData = [
    {
        question: "Azərbaycanın paytaxtı haradır?",
        options: { a: "Gəncə", b: "Bakı", c: "Sumqayıt", d: "Şəki" },
        correct: "b"
    },
    {
        question: "Nərminə müəllimə hansı fənni tədris edir?",
        options: { a: "Riyaziyyat", b: "Azərbaycan dili", c: "İngilis dili", d: "Tarix" },
        correct: "b"
    }
];

let currentQuiz = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('student-name').innerText = "Şagird: " + currentUser;
    loadQuiz();
});

function loadQuiz() {
    const currentData = quizData[currentQuiz];
    document.querySelector('.question-number').innerText = `Sual ${currentQuiz + 1} / ${quizData.length}`;
    document.getElementById('question-text').innerText = currentData.question;
    
    // Variantları dinamik yükləmək üçün (HTML-dəki radio düymələrini tapırıq)
    const optionsTexts = document.querySelectorAll('.option-text');
    optionsTexts[0].innerText = currentData.options.a;
    optionsTexts[1].innerText = currentData.options.b;
    optionsTexts[2].innerText = currentData.options.c;
    optionsTexts[3].innerText = currentData.options.d;
}

document.querySelector('.next').addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    
    if (selectedOption) {
        if (selectedOption.value === quizData[currentQuiz].correct) {
            score++;
        }
        
        currentQuiz++;
        selectedOption.checked = false;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            alert(`Test bitdi! ${localStorage.getItem('currentUser')}, nəticən: ${score}/${quizData.length}`);
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        }
    } else {
        alert("Zəhmət olmasa bir variant seçin!");
    }
});
