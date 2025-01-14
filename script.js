import { marked } from 'marked';
import hljs from 'highlight.js';

// Configure marked to use highlight.js
marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
    }
});

// Sample responses for demo
const responses = {
    quantum: `Quantum computing is like having a super-powerful calculator that can solve complex problems much faster than regular computers. Instead of using bits (0s and 1s), it uses quantum bits or "qubits" that can be both 0 and 1 at the same time - kind of like being in two places at once!

Here's a simple analogy:
- Regular computer: Checking each path in a maze one at a time
- Quantum computer: Checking all paths simultaneously

This makes quantum computers potentially much faster at solving certain types of problems, like:
- Breaking complex codes
- Simulating molecules for drug discovery
- Optimizing financial portfolios
- Solving complex mathematical problems`,

    birthday: `Here are some creative birthday party ideas for a 10-year-old:

1. **Science Party**
   - Do fun experiments
   - Make slime
   - Create volcanoes
   - Lab coat party favors

2. **Gaming Tournament**
   - Video game stations
   - Board game competitions
   - Prize ceremonies
   - Gaming-themed snacks

3. **Outdoor Adventure**
   - Treasure hunt
   - Obstacle course
   - Camping activities
   - Nature exploration

4. **Art Workshop**
   - Painting session
   - Craft stations
   - DIY party favors
   - Gallery showcase`,

    http: `Here's how to make HTTP requests in JavaScript using the Fetch API:

\`\`\`javascript
// GET Request
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// POST Request
fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        title: 'foo',
        body: 'bar',
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
\`\`\`

You can also use async/await for cleaner code:

\`\`\`javascript
async function getData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}
\`\`\``,
};

// Chat management
let chatHistory = [];

function createMessage(role, content) {
    const message = document.createElement('div');
    message.className = `message ${role}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? 'U' : 'A';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = marked.parse(content);
    
    message.appendChild(avatar);
    message.appendChild(messageContent);
    
    return message;
}

function addMessage(role, content) {
    const chat = document.getElementById('chat');
    const welcomeScreen = document.getElementById('welcomeScreen');
    
    if (welcomeScreen) {
        welcomeScreen.remove();
    }
    
    const message = createMessage(role, content);
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
    
    chatHistory.push({ role, content });
}

function getResponse(message) {
    message = message.toLowerCase();
    
    if (message.includes('quantum')) {
        return responses.quantum;
    } else if (message.includes('birthday')) {
        return responses.birthday;
    } else if (message.includes('http')) {
        return responses.http;
    }
    
    return "I am a demo clone and can only respond to specific example questions. Try asking about quantum computing, birthday ideas, or HTTP requests!";
}

// Event Listeners
document.getElementById('messageForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage('user', message);
        input.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const response = getResponse(message);
            addMessage('assistant', response);
        }, 500);
    }
});

document.getElementById('userInput').addEventListener('input', (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
});

document.getElementById('newChat').addEventListener('click', () => {
    const chat = document.getElementById('chat');
    chat.innerHTML = `
        <div class="welcome-screen" id="welcomeScreen">
            <h1>ChatGPT Clone</h1>
            <div class="examples">
                <h2>Examples</h2>
                <div class="example-grid">
                    <button class="example-btn">"Explain quantum computing in simple terms" →</button>
                    <button class="example-btn">"Got any creative ideas for a 10 year old's birthday?" →</button>
                    <button class="example-btn">"How do I make an HTTP request in Javascript?" →</button>
                </div>
            </div>
        </div>
    `;
    chatHistory = [];
});

// Example button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('example-btn')) {
        const question = e.target.textContent.replace('" →', '').replace('"', '');
        document.getElementById('userInput').value = question;
        document.getElementById('messageForm').dispatchEvent(new Event('submit'));
    }
});