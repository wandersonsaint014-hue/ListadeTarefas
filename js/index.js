const form = document.querySelector('#todo-form');
const taskTitleInput = document.querySelector('#task-title-input');
const todoListUl = document.querySelector('#todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para renderizar uma tarefa no HTML
function renderTaskOnHTML(task, taskIndex) {
    const li = document.createElement('li');
    
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.checked = task.done;
    input.addEventListener('change', (event) => {
        const done = event.target.checked;
        tasks = tasks.map((task, index) => {
            if (index === taskIndex) {
                return {
                    title: task.title,
                    done: done,
                };
            }
            return task;
        });

        saveTasks();
    });

    const span = document.createElement('span');
    span.textContent = task.title;
    if (task.done) {
        span.style.textDecoration = 'line-through';
    }

    const button = document.createElement('button');
    button.textContent = 'Remover';
    // Adicionando evento ao botão de remover
    button.addEventListener('click', () => {
        tasks = tasks.filter((task, index) => index !== taskIndex);

        todoListUl.removeChild(li);
        saveTasks();
    });

    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    
    todoListUl.appendChild(li);
}

// Renderizar as tarefas ao carregar a página
window.onload = () => {
    tasks.forEach(renderTaskOnHTML);
};

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página ao submeter o formulário
    
    const taskTitle = taskTitleInput.value;

    if (taskTitle.length < 3) {
        alert('Sua tarefa precisa ter, pelo menos, 3 caracteres.');
        return;
    }
    
    // Adicionando a nova tarefa no array de tasks
    const newTask = {
        title: taskTitle,
        done: false,
    };
    tasks.push(newTask);
    saveTasks();

    // Adicionando a nova tarefa no HTML
    renderTaskOnHTML(newTask, tasks.length - 1);

    taskTitleInput.value = '';
});
