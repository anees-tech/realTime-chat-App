var socket = io();
let userName;
let ourTextarea = document.querySelector('#textarea');
let messageBox = document.querySelector(".center-box");
// this do-while loop will only run whenever user enter any name or CharacterData. Otherwise this will be an infinite loop;
do {
    userName = prompt("Please Enter Your Name");
}
while (!userName);


ourTextarea.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value);
    }
})

function sendMessage(message) {
    let msg = {
        user: userName,
        message: message
    };

    passMessage(msg, "sent");
    ourTextarea.value = "";
    scrollToBottom();

    socket.emit("messages", msg)
}


function passMessage(msg, type) {

    let CreateDiv = document.createElement('div');

    let msgType = type;

    CreateDiv.classList.add(msgType, 'messages');

    let centerMarkUp = `
        <p class="userID">${msg.user}</p>
        <p>${msg.message}</p>
    `
    CreateDiv.innerHTML = centerMarkUp;

    messageBox.appendChild(CreateDiv);


}



socket.on("messages", (msg) => {
    passMessage(msg, "recieved");
    scrollToBottom();
})

function scrollToBottom() {
    messageBox.scrollTo = messageBox.scrollHeight;
}