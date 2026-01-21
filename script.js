// 1. İstifadəçilər (Müəllimə və Şagirdlər)
const users = [
    { name: "Nərminə", surname: "Əmirbəyova", pass: "nermin2026", role: "admin" },
    { name: "Ali", surname: "Aliyev", pass: "123", role: "student" }
];

// 2. Testləri və Vaxtı Yaddaşdan Götürək (Müəllimə əlavə edibsə)
let questions = JSON.parse(localStorage.getItem('quizDB')) || [
    { q: "Nümunə Sual: Azərbaycan harada yerləşir?", a: "Avropa", b: "Asiya", c: "Qafqaz", d: "Afrika", correct: "c" }
];
let quizTime = parseInt(localStorage.getItem('quizTimer')) || 10; // Default 10 dəqiqə

// --- GİRİŞ SİSTEMİ ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const pass = document.getElementById('password').value;

        const user = users.find(u => u.name === name && u.surname === surname && u.pass === pass);
        
        if (user) {
            localStorage.setItem('loggedUser', name + " " + surname);
            if (user.role === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "quiz.html";
            }
        } else {
            alert("Ad, Soyad və ya Parol yanlışdır!");
        }
    });
}

// --- TEST MƏNTİQİ VƏ TAYMER ---
let currentQIndex = 0;
let score = 0;
let timeLeft = quizTime * 60;

if (document.body.classList.contains('quiz-page')) {
    document.getElementById('user-name').innerText = localStorage.getItem('loggedUser');
    startTimer();
    loadQuestion();
}

function startTimer() {
    const timerElement = document.getElementById('time');
    const countdown = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("Vaxt bitdi! Test avtomatik sonlandırılır.");
            finishQuiz();
        }
        timeLeft--;
    }, 1000);
}

function loadQuestion() {
    const qData = questions[currentQIndex];
    document.getElementById('q-number').innerText = `Sual ${currentQIndex + 1} / ${questions.length}`;
    document.getElementById('q-text').innerText = qData.q;
    const container = document.getElementById('options-container');
    container.innerHTML = "";

    ['a', 'b', 'c', 'd'].forEach(key => {
        const btn = document.createElement('div');
        btn.className = 'option';
        btn.innerText = qData[key];
        btn.onclick = () => {
            document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            btn.classList.add('selected');
            btn.dataset.value = key;
        };
        container.appendChild(btn);
    });
}

function finishQuiz() {
    alert(`Test bitdi! Nəticəniz: ${score} / ${questions.length}`);
    localStorage.removeItem('loggedUser');
    window.location.href = "index.html";
}

// Növbəti düyməsi və xal hesablama bura əlavə olunacaq...
