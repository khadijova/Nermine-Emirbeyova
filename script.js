// 1. Şagird Məlumatları
const students = [
    { name: "Ali", surname: "Aliyev", password: "123" },
    { name: "Aysel", surname: "Memmedova", password: "456" }
];

// 2. Test Sualları
const questions = [
    { q: "Azərbaycanın paytaxtı haradır?", a: "Gəncə", b: "Bakı", c: "Sumqayıt", d: "Şəki", correct: "b" },
    { q: "Nərminə müəllimə hansı fənni keçir?", a: "Riyaziyyat", b: "Fizika", c: "Azərbaycan dili", d: "Tarix", correct: "c" }
];

let currentQIndex = 0;
let score = 0;
let selectedAnswer = null;

// --- GİRİŞ MƏNTİQİ ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const pass = document.getElementById('password').value;

        const user = students.find(s => s.name === name && s.surname === surname && s.password === pass);
        
        if (user) {
            localStorage.setItem('loggedUser', name + " " + surname);
            window.location.href = "quiz.html";
        } else {
            alert("Məlumatlar yanlışdır!");
        }
    });
}

// --- TEST MƏNTİQİ ---
const qText = document.getElementById('q-text');
const optionsContainer = document.getElementById('options-container');

if (qText) {
    document.getElementById('user-name').innerText = localStorage.getItem('loggedUser');
    loadQuestion();
}

function loadQuestion() {
    const qData = questions[currentQIndex];
    document.getElementById('q-number').innerText = `Sual ${currentQIndex + 1} / ${questions.length}`;
    qText.innerText = qData.q;
    optionsContainer.innerHTML = "";
    selectedAnswer = null;

    ['a', 'b', 'c', 'd'].forEach(key => {
        const btn = document.createElement('div');
        btn.className = 'option';
        btn.innerText = qData[key];
        btn.onclick = () => {
            document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            btn.classList.add('selected');
            selectedAnswer = key;
        };
        optionsContainer.appendChild(btn);
    });
}

const nextBtn = document.getElementById('next-btn');
if (nextBtn) {
    nextBtn.onclick = () => {
        if (!selectedAnswer) return alert("Zəhmət olmasa bir variant seçin!");
        
        if (selectedAnswer === questions[currentQIndex].correct) score++;
        
        currentQIndex++;
        if (currentQIndex < questions.length) {
            loadQuestion();
        } else {
            alert(`Test bitdi! Nəticəniz: ${score} / ${questions.length}`);
            localStorage.removeItem('loggedUser');
            window.location.href = "index.html";
        }
    };
}
