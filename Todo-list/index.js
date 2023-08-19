// const readline = require("readline");

// let rl = readline.createInterface(process.stdin, process.stdout);

// rl.question("What is your name: ", (name) => {
//   console.log(name);
//   rl.close();
// });

// The above code is tedious to write everytime I need to use callback function so for these ther
// is other alternative is prompt-sync is clean and easy to use

const prompt = require("prompt-sync")();
const fs = require("fs");

const printMenu = () => {
  console.log("Todo List App");
  console.log();
  console.log("Commands:");
  console.log("- add: Add a new task");
  console.log("- list: List all tasks");
  console.log("- complete: Mark a task as completed");
  console.log("- edit: Edit a task");
  console.log("- delete: Delete a task");
  console.log("- exit: Exit the program");
  console.log();
};

printMenu();

const list = () => {
  try {
    const data = fs.readFileSync("todo.json", "utf-8");
    let todos = JSON.parse(data);
    todos.forEach((todo, index) => {
      todo = JSON.parse(todo);
      console.log(index + 1 + " " + todo.title);
      console.log("description: " + todo.description);
      console.log("Due date: " + todo.due);
      console.log("Completed: " + todo.completed);
      console.log();
    });
  } catch (err) {
    console.log(err);
  }
};

const add = () => {
  const title = prompt("Enter the title for todo: ");
  const description = prompt("Enter the description: ");
  const due = prompt("Enter due date or frequecy: ");
  try {
    const todo = JSON.stringify({
      title: title,
      description: description,
      due: due,
      completed: false,
    });
    const data = fs.readFileSync("todo.json", "utf-8");
    const todos = JSON.parse(data);
    todos.push(todo);
    const todoString = JSON.stringify(todos);
    fs.writeFileSync("todo.json", todoString, "utf-8");
  } catch (err) {
    console.log(err);
  }
};

const edit = () => {
  let index = prompt("Which task do you want to edit enter an ID: ");
  index = index - 1;
  try {
    const data = fs.readFileSync("todo.json", "utf-8");
    const todos = JSON.parse(data);
    if (index >= todos.length) {
      console.log("You entered wrong task ID");
      return;
    }
    const title = prompt("Enter new Title: ");
    const description = prompt("Enter new description: ");
    const due = prompt("Enter new due date or frequency: ");
    const editedTodo = JSON.stringify({
      title: title,
      description: description,
      due: due,
      completed: false,
    });
    let updatedTodo = todos.map((todo, idx) => {
      if (index === idx) {
        return editedTodo;
      }
      return todo;
    });
    updatedTodo = JSON.stringify(updatedTodo);
    fs.writeFileSync("todo.json", updatedTodo, "utf-8");
  } catch (err) {
    console.log(err);
  }
};

const comeplete = () => {
  let index = prompt(
    "Which task do you want to mark as a completed  enter an ID: "
  );
  index = index - 1;
  try {
    const data = fs.readFileSync("todo.json", "utf-8");
    const todos = JSON.parse(data);
    if (index >= todos.length) {
      console.log("You entered wrong task ID");
      return;
    }
    let updatedTodo = todos.map((todo, idx) => {
      if (index === idx) {
        todo = JSON.parse(todo);
        todo.completed = true;
        todo = JSON.stringify(todo);
        return todo;
      }
      return todo;
    });
    updatedTodo = JSON.stringify(updatedTodo);
    fs.writeFileSync("todo.json", updatedTodo, "utf-8");
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = () => {
  let index = prompt("Which task do you want to delete enter an ID: ");
  index = index - 1;
  try {
    const data = fs.readFileSync("todo.json", "utf-8");
    const todos = JSON.parse(data);
    if (index >= todos.length) {
      console.log("You entered wrond todo ID");
      return;
    }
    todos.splice(index, 1);
    const newTodos = JSON.stringify(todos);
    fs.writeFileSync("todo.json", newTodos, "utf-8");
  } catch (err) {
    console.log(err);
  }
};

while (true) {
  console.log();
  let command = prompt("Enter the command: ");
  console.log();
  if (command === "exit") {
    break;
  } else if (command === "list") {
    list();
  } else if (command === "add") {
    add();
  } else if (command === "edit") {
    edit();
  } else if (command === "delete") {
    deleteTodo();
  } else if (command === "complete") {
    comeplete();
  } else {
    console.log("Invalid command");
  }
}
