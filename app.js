
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const error = document.querySelector('.error');


document.addEventListener('DOMContentLoaded', getTodos); //DOMContentLoaded - браузер полностью загрузил HTML, было построено DOM-дерево
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

function addTodo(event) {
    event.preventDefault();
    if (todoInput.value == "") {
        error.classList.remove('hidden');
    } else {
        error.classList.add('hidden');
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);
        saveLocalTodos(todoInput.value);
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    }
    todoInput.value = "";
    todoInput.focus();
}

function deleteCheck(event) {
    const item = event.target;
    // Удаление дела
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement; //parentElement возвращает родителя узла DOM Element, или null если узел не имеет родителя
        //Анимация
        todo.classList.add('fall');
        //Удаление из локального хранилища
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() { // после анимации удаляем элемент
            todo.remove(); // remove() удаляет узел из дерева DOM
        });

    }

    // Выполнение дела и обратный процесс
    if (item.classList[0] === "completed-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        localCompletedTodo(todo);
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes; //childNodes возвращает коллекцию дочерних элементов данного элемента
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                if (todo.nodeName != "#text") { // возвращает имя текущего Nodeв виде строки
                    todo.style.display = 'flex';
                }
                break;
            case "completed":
                if (todo.nodeName != "#text") {
                    if (todo.classList.contains('completed')) { //contains() возращает boolean и проверяет является ли узел потомком данного узла
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                }
                break;
            case "uncompleted":
                if (todo.nodeName != "#text") {
                    if (!todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                }
                break;
        }
    });
}


// Сохранение в локальном хранилище
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); // Метод JSON.parse() разбирает строку JSON, возможно с преобразованием получаемого в процессе разбора значения.
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos)); // Метод JSON.stringify() преобразует значение JavaScript в строку JSON,
}

//Получить список дел из локального хранилища
function getTodos() {
    let todos;
    let completedTodos;
    //есть ли у нас задачи
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //проверьте, есть ли у нас уже завершенные задачи
    if (localStorage.getItem('completedTodos') === null) {
        completedTodos = [];
    } else {
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    }
    todos.forEach(function(todo) {
        //To Do Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Checked button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);
        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
    });
    completedTodos.forEach(function(todo) {
        //добавление div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.classList.add('completed');
        //создание li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Checked button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);
        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
    });
}

//Функция удаление элементов в  локальном хранилище
function removeLocalTodos(todo) {
    let todos;
    let completedTodos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    if (localStorage.getItem('completedTodos') === null) {
        completedTodos = [];
    } else {
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    }
    const todoElement = todo.children[0].innerText;
    console.log(todoElement);
    if (completedTodos.includes(todoElement)) { // Метод includes() определяет, содержит ли массив определённый элемент
        completedTodos.splice(completedTodos.indexOf(todoElement), 1); // Метод splice() изменяет содержимое массива, удаляя существующие элементы и/или добавляя новые.
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    } else {
        todos.splice(todos.indexOf(todoElement), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

}

function localCompletedTodo(todo) {
    let completedTodos, todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    if (localStorage.getItem('completedTodos') === null) {
        completedTodos = [];
    } else {
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    }
    if (!completedTodos.includes(todo.children[0].innerText)) { // Метод includes() определяет, содержит ли массив определённый элемент
        completedTodos.push(todo.children[0].innerText);
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
        const todoElement = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoElement), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    } else {
        const todoElement = todo.children[0].innerText;
        completedTodos.splice(completedTodos.indexOf(todoElement), 1);
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
        saveLocalTodos(todoElement);
    }
}