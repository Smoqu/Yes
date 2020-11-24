const socket = io();
const messagesDiv = document.getElementById("messages");

socket.on("connectionState", (msg) => {
  const welcome = document.createElement("p");
  welcome.innerText = `A user ${msg}`;
  messagesDiv.appendChild(welcome);
});

const user = prompt("Username:");

socket.emit("user", user);
