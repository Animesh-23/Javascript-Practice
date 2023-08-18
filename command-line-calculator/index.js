const readLine = require("readline");
let rl = readLine.createInterface(process.stdin, process.stdout);

rl.question("What is your name ", (name) => {
  console.log(name);
});
