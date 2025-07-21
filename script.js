// Add at the beginning of the file
// Quotes Data
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        text: "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    },
    {
        text: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
    },
    {
        text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
        author: "Steve Jobs"
    },
    {
        text: "The difference between ordinary and extraordinary is that little extra.",
        author: "Jimmy Johnson"
    },
    {
        text: "Quality is not an act, it is a habit.",
        author: "Aristotle"
    },
    {
        text: "The harder you work for something, the greater you'll feel when you achieve it.",
        author: "Anonymous"
    }
];

// Quotes Elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote');

// Quote Functions
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayQuote(quote) {
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = quote.author;
}

function rotateQuote() {
    const quote = getRandomQuote();
    displayQuote(quote);
}

// Event Listeners for Quotes
newQuoteBtn.addEventListener('click', rotateQuote);

// Auto rotate quotes every 30 seconds
setInterval(rotateQuote, 30000);

// Display initial quote
rotateQuote();

// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const prioritySelect = document.getElementById('priority-select');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const editInput = document.getElementById('edit-input');
const editPriority = document.getElementById('edit-priority');
const cancelEdit = document.getElementById('cancel-edit');
const closeModal = document.getElementById('close-modal');
const emptyState = document.getElementById('empty-state');

// State
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';
let editingId = null;

// Functions
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    updateStats();
    checkEmptyState();
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    totalTasks.textContent = `Total: ${total}`;
    completedTasks.textContent = `Completed: ${completed}`;
}

function checkEmptyState() {
    if (todos.length === 0) {
        emptyState.style.display = 'block';
        todoList.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        todoList.style.display = 'block';
    }
}

function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text">${todo.text}</span>
        <span class="todo-priority priority-${todo.priority}">${todo.priority}</span>
        <div class="todo-actions">
            <button class="edit-btn" title="Edit">
                <i class="ph ph-pencil"></i>
            </button>
            <button class="delete-btn" title="Delete">
                <i class="ph ph-trash"></i>
            </button>
        </div>
    `;

    // Event Listeners for todo item
    const checkbox = li.querySelector('.todo-checkbox');
    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    checkbox.addEventListener('change', () => toggleTodo(todo.id));
    editBtn.addEventListener('click', () => openEditModal(todo));
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this task?')) {
            deleteTodo(todo.id);
        }
    });

    return li;
}

function renderTodos() {
    todoList.innerHTML = '';
    let filteredTodos = todos;

    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });

    checkEmptyState();
}

// CRUD Operations
function addTodo(text, priority) {
    const todo = {
        id: Date.now(),
        text,
        priority,
        completed: false
    };
    todos.unshift(todo);
    saveTodos();
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
}

function updateTodo(id, newText, newPriority) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, text: newText, priority: newPriority } : todo
    );
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Modal Functions
function openEditModal(todo) {
    editingId = todo.id;
    editInput.value = todo.text;
    editPriority.value = todo.priority;
    editModal.classList.add('active');
    editInput.focus();
}

function closeEditModal() {
    editModal.classList.remove('active');
    editingId = null;
}

// Event Listeners
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    const priority = prioritySelect.value;
    if (text) {
        addTodo(text, priority);
        todoInput.value = '';
        todoInput.focus();
    }
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newText = editInput.value.trim();
    const newPriority = editPriority.value;
    if (newText && editingId) {
        updateTodo(editingId, newText, newPriority);
        closeEditModal();
    }
});

cancelEdit.addEventListener('click', closeEditModal);
closeModal.addEventListener('click', closeEditModal);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// Close modal when clicking outside
editModal.addEventListener('click', (e) => {
    if (e.target === editModal) {
        closeEditModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && editModal.classList.contains('active')) {
        closeEditModal();
    }
});

// Initial render
renderTodos();
updateStats();
checkEmptyState();
rotateQuote(); 
