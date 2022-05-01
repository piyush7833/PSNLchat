const socket = io('http://localhost:8000');

// get DOM element in respective js variables
const form = document.getElementById('send');
const messageInput = document.getElementById('messageinp')
const messageContainer = document.querySelector('.container')
var audio = new Audio('Ping.mp3');
var audio1 = new Audio('ting.mp3');

// functions which will append into the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    // audio to play
    if(position == 'left'){
        audio1.play();
    }
    if(position == 'center'){
        audio.play();
    }
}
// ask new user for his name and le t the server know
const name = prompt ("Enter your name to join the chat");
socket.emit('new-user-joined', name)

// if form get submitted, send message to the server
form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you : ${message}` , 'right')
    socket.emit('send', message);
    messageInput.value = ''
})
//  if new user joined let everyone know, recieve his name  from the server
socket.on('user-joined', name =>{
append(`${name} joined the chat`, 'center')
})
// if server send a message recieve it  
socket.on('recieve', data =>{
append(`${data.name}: ${data.message}`, 'left')
})
// if user leaves the chat let everyoneknow 
socket.on('left', name =>{
append(`${name} left the chat`, 'center')
})


