const habitInput = document.getElementById('habit-input');
const addBtn = document.getElementById('add-btn');
const habitList = document.getElementById('habit-list');
const progressBar = document.getElementById('progress-bar');

let habits = JSON.parse(localStorage.getItem('habits')) || [];

function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

function updateProgress() {
    if (habits.length === 0) {
        progressBar.style.width = '0%';
        return;
    }
    const completed = habits.filter(h => h.completed).length;
    const percent = (completed / habits.length) * 100;
    progressBar.style.width = percent + '%';
}

function renderHabits() {
    habitList.innerHTML = '';
    habits.forEach((habit, index) => {
        const li = document.createElement('li');
        li.className = 'habit-item' + (habit.completed ? ' completed' : '');
        li.innerHTML = `
            <span>${habit.name}</span>
            <div>
                <input type="checkbox" ${habit.completed ? 'checked' : ''} onchange="toggleCompleted(${index})">
                <button class="delete-btn" onclick="deleteHabit(${index})">Delete</button>
            </div>
        `;
        habitList.appendChild(li);
    });
    updateProgress();
}

function addHabit() {
    const name = habitInput.value.trim();
    if (name === '') return;
    habits.push({ name, completed: false });
    habitInput.value = '';
    saveHabits();
    renderHabits();
}

function toggleCompleted(index) {
    habits[index].completed = !habits[index].completed;
    saveHabits();
    renderHabits();
}

function deleteHabit(index) {
    habits.splice(index, 1);
    saveHabits();
    renderHabits();
}

addBtn.addEventListener('click', addHabit);
habitInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addHabit();
});

// Initial render
renderHabits();

// Make toggleCompleted and deleteHabit global for inline HTML usage
window.toggleCompleted = toggleCompleted;
window.deleteHabit = deleteHabit;