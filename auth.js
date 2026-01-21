// Şagird məlumat bazası
const students = [
    { name: "Ali", surname: "Aliyev", password: "123" },
    { name: "Aysel", surname: "Memmedova", password: "456" },
    { name: "Nermin", surname: "Emirbeyova", password: "admin" }
];

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name').value.trim();
            const surnameInput = document.getElementById('surname').value.trim();
            const passInput = document.getElementById('password').value;

            const user = students.find(s => 
                s.name.toLowerCase() === nameInput.toLowerCase() && 
                s.surname.toLowerCase() === surnameInput.toLowerCase() && 
                s.password === passInput
            );

            if (user) {
                localStorage.setItem('currentUser', `${nameInput} ${surnameInput}`);
                window.location.href = 'quiz.html';
            } else {
                alert('Məlumatlar yanlışdır! Yenidən yoxlayın.');
            }
        });
    }
});
