document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.querySelector('.add-task-btn');
    const modalOverlay = document.getElementById('add-task-modal');
    const addTaskForm = document.getElementById('add-task-form');
    const cancelBtn = document.getElementById('cancel-btn');
    const taskListDiv = document.getElementById('task-list');
    const taskCounterSpan = document.getElementById('task-counter');

    const timerModal = document.getElementById('timer-modal');
    const timeDisplay = document.getElementById('time-display');
    const progressRing = document.getElementById('progress-ring');
    const cancelTimerBtn = document.getElementById('cancel-timer-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const timerTaskName = document.querySelector('.timer-task-name');

    let tasks = [];
    let timerInterval = null;
    let totalSeconds = 0;
    let remainingSeconds = 0;
    let isPaused = false;

    const toggleModal = () => {
        modalOverlay.classList.toggle('hidden');
    };

    const renderTasks = () => {
        taskListDiv.innerHTML = '';
        if (tasks.length === 0) {
            taskListDiv.innerHTML = `<div class="no-tasks-content"><p>Your quest log is empty. Add a task to begin!</p></div>`;
        } else {
            tasks.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.classList.add('task-item');
                if (task.completed) {
                    taskElement.classList.add('completed');
                }
                taskElement.dataset.id = task.id;

                taskElement.innerHTML = `
                    <div class="task-details">
                        <i class="far ${task.completed ? 'fa-check-square' : 'fa-square'} complete-icon"></i>
                        <div>
                            <strong>${task.name}</strong>
                            <p>${Math.floor(task.time / 60)}h ${task.time % 60}m</p>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="start-btn" data-time="${task.time}" data-name="${task.name}"><i class="fas fa-play-circle"></i></button>
                        <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
                    </div>
                `;
                taskListDiv.appendChild(taskElement);
            });
        }
        updateUI();
    };

    const updateUI = () => {
        const completedTasks = tasks.filter(task => task.completed).length;
        taskCounterSpan.textContent = `${completedTasks}/${tasks.length} completed`;
    };

    const populateDropdowns = () => {
        const hoursSelect = document.getElementById('task-hours');
        const minutesSelect = document.getElementById('task-minutes');

        for (let i = 0; i <= 12; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = `${i} hour${i !== 1 ? 's' : ''}`;
            hoursSelect.appendChild(option);
        }

        for (let i = 0; i < 60; i += 5) {
            const option = document.createElement('option');
            option.value = i;
            option.text = `${i} minutes`;
            minutesSelect.appendChild(option);
        }
    };

    const handleAddTask = (event) => {
        event.preventDefault();
        const taskNameInput = document.getElementById('task-name');
        const taskHoursInput = document.getElementById('task-hours');
        const taskMinutesInput = document.getElementById('task-minutes');

        const hours = parseInt(taskHoursInput.value) || 0;
        const minutes = parseInt(taskMinutesInput.value) || 0;
        const totalMinutes = hours * 60 + minutes;
        if (!taskNameInput.value || totalMinutes <= 0) return;

        const task = {
            id: Date.now(),
            name: taskNameInput.value,
            time: totalMinutes,
            completed: false
        };

        tasks.push(task);
        logTask(task);
        addTaskForm.reset();
        toggleModal();
        renderTasks();
    };

    const handleTaskListClick = (event) => {
        const target = event.target;
        const parentTaskItem = target.closest('.task-item');
        if (!parentTaskItem) return;

        const taskId = Number(parentTaskItem.dataset.id);
        const task = tasks.find(t => t.id === taskId);

        if (target.closest('.delete-btn')) {
            tasks = tasks.filter(t => t.id !== taskId);
        } else if (target.closest('.complete-icon')) {
            if (task) task.completed = !task.completed;
        } else if (target.closest('.start-btn')) {
            if (task) startTimer(task.time, task.name);
        }
        renderTasks();
    };

    const startTimer = (durationInMinutes, taskName) => {
        totalSeconds = durationInMinutes * 60;
        remainingSeconds = totalSeconds;
        isPaused = false;
        timerTaskName.textContent = taskName;
        timerModal.classList.remove('hidden');
        updateTimerDisplay();
        updateProgressRing();

        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (!isPaused) {
                remainingSeconds--;
                if (remainingSeconds <= 0) {
                    clearInterval(timerInterval);
                    timerModal.classList.add('hidden');
                    animateCompletion();
                    alert(`⏳ Quest "${taskName}" Complete!`);
                }
                updateTimerDisplay();
                updateProgressRing();
            }
        }, 1000);
    };

    const updateTimerDisplay = () => {
        const hours = Math.floor(remainingSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((remainingSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (remainingSeconds % 60).toString().padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    };

    const updateProgressRing = () => {
        const percentage = (remainingSeconds / totalSeconds) * 360;
        progressRing.style.background = `conic-gradient(#8e44ad ${percentage}deg, #4a69e2 0deg)`;
    };

    const animateCompletion = () => {
        progressRing.style.transition = 'all 0.5s ease-out';
        progressRing.style.transform = 'scale(1.2)';
        setTimeout(() => {
            progressRing.style.transform = 'scale(1)';
        }, 500);
    };

    pauseBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    });

    cancelTimerBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerModal.classList.add('hidden');
    });

    const logTask = (task) => {
        const logs = JSON.parse(localStorage.getItem('taskLogs') || '[]');
        logs.push({ ...task, timestamp: new Date().toISOString() });
        localStorage.setItem('taskLogs', JSON.stringify(logs));
    };

    addTaskBtn.addEventListener('click', toggleModal);
    cancelBtn.addEventListener('click', toggleModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) toggleModal();
    });
    addTaskForm.addEventListener('submit', handleAddTask);
    taskListDiv.addEventListener('click', handleTaskListClick);

    populateDropdowns();
    renderTasks();
});
