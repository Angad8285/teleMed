const socket = io('http://localhost:3000', {
    transports: ["websocket", "polling"]
})

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

// When both doctor and user join a room based on consultationId
// const user = "Tulli"
const user = prompt('Enter name')
const consultationId = prompt('Enter consultation ID')

socket.emit('joinRoom', { consultationId, user }, (error) => {
    if (error) {
        alert(error)
    }
});
appendMessage('You joined')

socket.on('message', ({ sender, content, timestamp}) => {
    appendMessage(`${sender}: ${content}`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('sendMessage', { consultationId, sender: user, content: message })
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
    console.log(message)
}