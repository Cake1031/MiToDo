"use strict";

/*フォームの内容を取得*/
const form = document.getElementById("form");
const ul = document.getElementById("ul");

/*ローカルストレージから値を取得*/
const todos = JSON.parse(localStorage.getItem("todos"));

/*ローカルストレージに値があったらoutputを実行*/
if (todos) {
    todos.forEach(todo => {
        output(todo);
    })
}

/*フォームを入力したらoutputを実行*/
form.addEventListener("submit", function(event) {
    event.preventDefault();
    output();
});

/*liを追加する関数*/
function output(todo) {
    let todoText = form.todo.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText.length > 0) {
        const li = document.createElement("li");
        li.innerHTML = todoText;
        li.classList.add("list");

        if (todo && todo.completed) {
            li.classList.add("line");
        }
        /*todoの削除*/
        li.addEventListener("contextmenu", function(event) {
            event.preventDefault();
            li.remove();
            saveDate();
        });
        /*完了処理*/
        li.addEventListener("click", function() {
            li.classList.toggle("line")
            saveDate();
        });
        ul.appendChild(li);
        form.todo.value = "";
        saveDate();
    }
}

/*データをストレージに保存*/
function saveDate() {
    const lists = document.querySelectorAll("li");
    let todos = [];
    lists.forEach(list => {
        let todo = {
            text: list.innerHTML,
            completed: list.classList.contains("line")
        };
        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}