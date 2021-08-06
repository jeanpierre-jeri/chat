const socket = io()

const username = document.getElementById('username')
const write_message = document.getElementById('write_message')
const all_messages = document.getElementById('all_messages')
const new_user = document.getElementById('new_user')
const writing = document.getElementById('writing')
const sendMessage = document.getElementById('sendMessage')

sendMessage.addEventListener('click', (e) => {
    if (e.returnValue) {
        if (username.value != '' && write_message != '') {
            socket.emit('message', {
                username: username.value,
                message: write_message.value
            })
            write_message.value = ''
        } else {
            console.log('Ingrese todos los campos')
        }
    }
})

write_message.addEventListener('keydown', e => {
    if (username.value != '') {
        socket.emit('writing', username.value)
    }
})

socket.on('writing', (username) => {
    writing.innerHTML = username + " está escribiendo"
    setTimeout(() => {
        writing.innerHTML = ''
    }, 3000)
})

socket.on('new_user', (message) => {
    new_user.innerHTML = message
    setTimeout(() => {
        new_user.innerHTML = ''
    }, 3000)
})

socket.on('messages', (messages) => {
    let content = ''
    for (let i = 0; i < messages.length; i++) {
        content +=`
        <div class="bg-gray-800 text-white p-2 mt-3 inline-block ml-auto rounded">
            ${messages[i].username}: 
            ${messages[i].message}
        </div>
        <br>
        `     
    }

    all_messages.innerHTML = content
    all_messages.scrollTop = all_messages.scrollHeight
})