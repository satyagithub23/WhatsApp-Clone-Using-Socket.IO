const socket = io('http://127.0.0.1:8000')

const form = document.getElementById("send-container")

const messageInput = document.getElementById("msg-inp")

const messageContainer = document.querySelector(".container")

const name = prompt("Enter your name to join")

const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); //stops reloading the page
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message)
    messageInput.value = ""
})

socket.emit("new-user-joined", name)

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name => {
    append(`${name} left the chat`, 'left')
})

