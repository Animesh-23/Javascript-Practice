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
const { json } = require("stream/consumers");

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
    const todos = JSON.parse(data);
    todos.forEach((todo, index) => {
      console.log(index + 1 + " " + todo.title);
      console.log("description: " + todo.description);
      console.log("Due date: " + todo.due);
      console.log("Completed: " + todo.comepleted);
      console.log();
    });
  } catch (err) {
    console.log(err);
  }
};

const add = () => {};

const edit = () => {};

const comeplete = () => {};

const deleteTodo = () => {};

while (true) {
  let command = prompt("Enter the command: ");
  console.log();
  if (command === "exit") {
    break;
  } else if (command === "list") {
    list();
  } else if (command === "add") {
    add();
  } else if (command === "edit") {
  } else if (command === "delete") {
  } else if (command === "complete") {
  } else {
    console.log("Invalid command");
  }
}
