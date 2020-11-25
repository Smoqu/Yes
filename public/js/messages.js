const messagesForm = document.getElementById("messagesForm");
const sendBtn = document.getElementById("send");

console.log(user);

messagesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let msg = e.target[0];
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const dateMsgSent = `${hours}:${minutes > 9 ? minutes : `0${minutes}`}`;
  const sendMsg = {
    user,
    msg: msg.value,
    date: dateMsgSent,
  };
  socket.emit("message", sendMsg);
  msg.value = "";
});

socket.on("receive", (value) => {
  console.log(value);
  const messageDiv = document.createElement("div");
  messageDiv.id = "messageDiv";
  const author = document.createElement("p");
  const message = document.createElement("p");
  const date = document.createElement("p");
  
  message.id = "msgReceived";

  date.innerText = value.date;
  author.innerText = value.user;
  message.innerText = value.msg;

  messageDiv.appendChild(author);
  messageDiv.appendChild(message);
  messageDiv.appendChild(date);

  messagesDiv.appendChild(messageDiv);
});
