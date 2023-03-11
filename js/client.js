const socket = io("http://localhost:8000", { transports: ["websocket"] });

const form = document.getElementById("send-form");
const inp_msg = document.getElementById("inp-msg");
const msgContainer = document.querySelector(".container");
var audio = new Audio("sound.mp3");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("msg");
  messageElement.classList.add(position);
  msgContainer.append(messageElement);
  if (position === "left") {
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = inp_msg.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  inp_msg.value = "";
});

const uname = prompt("Enter your name to join Chatty");
socket.emit("new-user-joined", uname);

socket.on("user-joined", (name) => {
  append(`${name} joined`, "right");
});

socket.on("received", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

socket.on("left", (name) => {
  append(`${name} left the chat`, "right");
});
