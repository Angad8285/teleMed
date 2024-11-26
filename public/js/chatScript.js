const socket = io('http://localhost:3000', {
    transports: ["websocket", "polling"]
})

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const consultationId = prompt('Enter consultation ID')
console.log("consultation id: " + consultationId)
const token = localStorage.getItem('authToken')
const user = JSON.parse(localStorage.getItem('userDetails')).name
// const token = prompt('Enter token') // only for testing, otherwise use localStorage to save token
// const user = prompt('Enter name') // only for testing, otherwise use localStorage to get username
let role = ''

if (consultationId != null) {
    socket.emit('joinRoom', { token, consultationId, user }, (response) => {
        if (response.error) {
            alert(response.error)
            return
        }

        role = response.role
        console.log(`Connected as: ${role}`)
        appendMessage(`You joined as a ${role}`)
    });

    socket.on('message', ({ sender, content, timestamp }) => {
        appendMessage(`${sender}: ${content}`)
    })

    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const message = messageInput.value
        appendMessage(`You: ${message}`)
        socket.emit('sendMessage', { consultationId, sender: user, content: message })

        //save the message to the room via socket.io
        const BASE_URL = 'http://localhost:3000'

        try {
            await fetch(`${BASE_URL}/chats/${consultationId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sender: role, content: message })
            });
        } catch (error) {
            console.log('Failed to save message to the database:', error);
        }

        messageInput.value = ''
    })
}





function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
    console.log(message)
}