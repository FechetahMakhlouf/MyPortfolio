const chatBody = document.querySelector('.chat-body');
const messageInput = document.querySelector('.message-input');
const sendMessageButton = document.querySelector('#send-message');
const chatbotToggler = document.querySelector('#chatbot-toggler');
const closeChatbot = document.querySelector('#close-chatbot');
const clearChat = document.querySelector('#clear-chat');
const emojiPicker = document.querySelector('#emoji-picker');

// Backend API for intelligent responses
const BACKEND_URL = "https://chatbot-server-g0jb.onrender.com";

// Chat state
let isTyping = false;
let messageHistory = [];

// Common emojis for picker
const commonEmojis = ['👋', '👍', '❤️', '😊', '🎉', '💪', '🔥', '✨', '👏', '🚀',
    '💻', '⚡', '🌟', '💯', '🎯', '📧', '💼', '📱', '🤖', '🧠'];

// Knowledge base for rich responses
const knowledgeBase = {
    skills: {
        frontend: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
        backend: ['Python', 'Django', 'Flask', 'REST APIs'],
        data: ['SQL', 'PostgreSQL', 'Pandas', 'NumPy'],
        ai: ['Machine Learning', 'Scikit-learn', 'Deep Learning', 'Neural Networks', 'CNN', 'RNN'],
        tools: ['Git', 'GitHub', 'Docker', 'Linux']
    },
    projects: [
        {
            name: 'Medical Desktop App',
            desc: 'SONATRACH Medical Management System',
            tech: ['Python', 'Tkinter', 'SQLite'],
            image: 'assets/img/project-1.jpeg',
            demo: '#',
            code: 'https://github.com/FechetahMakhlouf'
        },
        {
            name: 'CFPA Website',
            desc: 'Professional training center management (collab with Omar Ferradj)',
            tech: ['Django', 'HTML/CSS', 'PostgreSQL'],
            image: 'assets/img/project-2.jpeg',
            demo: '#',
            code: 'https://github.com/FechetahMakhlouf',
            collaborator: {
                name: 'Omar Ferradj',
                url: 'https://omarfrj.vercel.app/'
            }
        },
        {
            name: 'Jadwal App',
            desc: 'Time management with auto planning',
            tech: ['JavaScript', 'HTML/CSS', 'LocalStorage'],
            image: 'assets/img/project-3.jpeg',
            demo: 'https://fechetahmakhlouf.github.io/Gestion-du-Temps/',
            code: 'https://github.com/FechetahMakhlouf'
        },
        {
            name: 'Cat Detector',
            desc: 'Neural Network cat image classifier',
            tech: ['Python', 'TensorFlow', 'Streamlit'],
            image: 'assets/img/project-4.jpeg',
            demo: 'https://cat-detector-tit1.onrender.com',
            code: 'https://github.com/FechetahMakhlouf'
        }
    ],
    education: [
        { degree: "Master's in AI", school: "University of Bouira", year: "2025-2027", status: "In Progress" },
        { degree: "Bachelor's in CS", school: "University of Bouira", year: "2022-2025", status: "Completed" }
    ],
    contact: {
        email: 'makhlouffechetah65@gmail.com',
        phone: '+213-666218828',
        location: 'Algeria, Bouira, Saharidj',
        social: {
            linkedin: 'https://www.linkedin.com/in/makhlouf-fechetah-2b1085332',
            github: 'https://github.com/FechetahMakhlouf',
            whatsapp: 'https://Wa.me/+213666218828',
            telegram: 'https://t.me/Makhlouffech'
        }
    }
};

// Create message element
const createMessageElement = (content, classes = []) => {
    const div = document.createElement('div');
    div.classList.add('message', ...classes);
    div.innerHTML = content;
    return div;
};

// Add timestamp to message
const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// Show typing indicator
const showTyping = () => {
    const typingHTML = `
        <img class="bot-avatar" src="assets/img/home-perfil.png" alt="Bot">
        <div class="message-content">
            <div class="thinking-indicator">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    `;
    const typingMsg = createMessageElement(typingHTML, ['bot-message', 'typing-message']);
    chatBody.appendChild(typingMsg);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
    return typingMsg;
};

// Remove typing indicator
const removeTyping = () => {
    const typingMsg = chatBody.querySelector('.typing-message');
    if (typingMsg) typingMsg.remove();
};

// Add bot message (supports both rich cards and plain text)
const addBotMessage = (response) => {
    let messageHTML;

    if (response.type === 'rich') {
        messageHTML = `
            <img class="bot-avatar" src="assets/img/home-perfil.png" alt="Bot">
            <div class="message-content">
                <div class="message-text">
                    ${response.content}
                </div>
                <span class="message-time">${getTimestamp()}</span>
            </div>
        `;
    } else {
        // Plain text response
        messageHTML = `
            <img class="bot-avatar" src="assets/img/home-perfil.png" alt="Bot">
            <div class="message-content">
                <div class="message-text">
                    <p>${escapeHtml(response.text)}</p>
                </div>
                <span class="message-time">${getTimestamp()}</span>
            </div>
        `;
    }

    const messageDiv = createMessageElement(messageHTML, ['bot-message', 'rich-message']);
    chatBody.appendChild(messageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });

    // Save to history
    messageHistory.push({ role: 'bot', content: response.text || response.content });
};

// Add user message
const addUserMessage = (text) => {
    const messageHTML = `
        <div class="message-content">
            <div class="message-text">${escapeHtml(text)}</div>
            <span class="message-time">${getTimestamp()}</span>
        </div>
    `;

    const messageDiv = createMessageElement(messageHTML, ['user-message']);
    chatBody.appendChild(messageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });

    // Save to history
    messageHistory.push({ role: 'user', content: text });
};

// Escape HTML
const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

// Fetch intelligent response from Gemini API via backend
const fetchIntelligentResponse = async (userMessage) => {
    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Server error");
        }

        const data = await response.json();
        return data.reply;
    } catch (error) {
        console.error("Backend error:", error);
        return "Sorry, I'm having trouble connecting to my brain right now. Please try again later! 🤖";
    }
};

// Create rich skill card
const createSkillCard = () => {
    return `
        <div class="rich-card">
            <div class="rich-card-header">
                <div class="rich-card-icon"><i class="ri-tools-fill"></i></div>
                <span class="rich-card-title">My Technical Skills</span>
            </div>
            <div class="rich-card-body">
                <div class="skill-grid">
                    <div class="skill-item"><i class="ri-html5-fill"></i> HTML5/CSS3</div>
                    <div class="skill-item"><i class="ri-javascript-fill"></i> JavaScript</div>
                    <div class="skill-item"><i class="ri-code-fill"></i> Python</div>
                    <div class="skill-item"><i class="ri-global-fill"></i> Django/Flask</div>
                    <div class="skill-item"><i class="ri-database-2-fill"></i> SQL</div>
                    <div class="skill-item"><i class="ri-robot-fill"></i> ML/AI</div>
                    <div class="skill-item"><i class="ri-brain-fill"></i> Deep Learning</div>
                    <div class="skill-item"><i class="ri-github-fill"></i> Git/GitHub</div>
                </div>
            </div>
        </div>
        <div class="link-buttons">
            <a href="#about" class="link-btn" onclick="closeChatAndScroll('#about')">
                <i class="ri-user-3-line"></i> View Full Profile
            </a>
        </div>
    `;
};

// Create project cards
const createProjectCards = () => {
    const projectsHTML = knowledgeBase.projects.slice(0, 3).map(project => `
        <div class="project-mini-card">
            <img src="${project.image}" alt="${project.name}">
            <div class="project-mini-info">
                <h5>${project.name}</h5>
                <p>${project.desc}</p>
                ${project.collaborator ? `<div class="collab-info"><i class="ri-user-star-line"></i> with <a href="${project.collaborator.url}" target="_blank">${project.collaborator.name}</a></div>` : ''}
                <div class="project-mini-links">
                    <a href="${project.code}" target="_blank"><i class="ri-github-fill"></i> Code</a>
                    ${project.demo !== '#' ? `<a href="${project.demo}" target="_blank"><i class="ri-external-link-line"></i> Live</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    return `
        <div class="rich-card">
            <div class="rich-card-header">
                <div class="rich-card-icon"><i class="ri-folder-3-fill"></i></div>
                <span class="rich-card-title">Featured Projects</span>
            </div>
            <div class="rich-card-body">
                ${projectsHTML}
            </div>
        </div>
        <div class="link-buttons">
            <a href="#projects" class="link-btn" onclick="closeChatAndScroll('#projects')">
                <i class="ri-eye-line"></i> View All Projects
            </a>
        </div>
    `;
};

// Create contact card
const createContactCard = () => {
    return `
        <div class="rich-card">
            <div class="rich-card-header">
                <div class="rich-card-icon"><i class="ri-mail-fill"></i></div>
                <span class="rich-card-title">Get In Touch</span>
            </div>
            <div class="rich-card-body">
                <div class="contact-card-chat">
                    <a href="mailto:${knowledgeBase.contact.email}" class="contact-item-chat">
                        <i class="ri-mail-line"></i>
                        <span>${knowledgeBase.contact.email}</span>
                    </a>
                    <a href="tel:${knowledgeBase.contact.phone}" class="contact-item-chat">
                        <i class="ri-phone-line"></i>
                        <span>${knowledgeBase.contact.phone}</span>
                    </a>
                    <div class="contact-item-chat">
                        <i class="ri-map-pin-line"></i>
                        <span>${knowledgeBase.contact.location}</span>
                    </div>
                </div>
                <div class="contact-social-chat">
                    <a href="${knowledgeBase.contact.social.linkedin}" target="_blank" title="LinkedIn"><i class="ri-linkedin-fill"></i></a>
                    <a href="${knowledgeBase.contact.social.github}" target="_blank" title="GitHub"><i class="ri-github-fill"></i></a>
                    <a href="${knowledgeBase.contact.social.whatsapp}" target="_blank" title="WhatsApp"><i class="ri-whatsapp-fill"></i></a>
                    <a href="${knowledgeBase.contact.social.telegram}" target="_blank" title="Telegram"><i class="ri-telegram-fill"></i></a>
                </div>
            </div>
        </div>
        <div class="link-buttons">
            <a href="#contact" class="link-btn" onclick="closeChatAndScroll('#contact')">
                <i class="ri-send-plane-line"></i> Send Message
            </a>
        </div>
    `;
};

// Create resume card
const createResumeCard = () => {
    return `
        <div class="rich-card">
            <div class="rich-card-header">
                <div class="rich-card-icon"><i class="ri-file-list-3-fill"></i></div>
                <span class="rich-card-title">Education & Experience</span>
            </div>
            <div class="rich-card-body">
                <div class="resume-section-chat">
                    <h5><i class="ri-graduation-cap-fill"></i> Education</h5>
                    <div class="resume-item-chat">
                        <h6>Master's in AI</h6>
                        <span>University of Bouira • 2025-2027</span>
                    </div>
                    <div class="resume-item-chat">
                        <h6>Bachelor's in CS</h6>
                        <span>University of Bouira • 2022-2025</span>
                    </div>
                </div>
                <div class="resume-section-chat">
                    <h5><i class="ri-briefcase-fill"></i> Experience</h5>
                    <div class="resume-item-chat">
                        <h6>Practical Internship</h6>
                        <span>SONATRACH • Feb-Mar 2025</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="link-buttons">
            <a href="#resume" class="link-btn" onclick="closeChatAndScroll('#resume')">
                <i class="ri-eye-line"></i> View Full Resume
            </a>
            <a href="assets/img/CV.png" download class="link-btn secondary">
                <i class="ri-download-line"></i> Download CV
            </a>
        </div>
    `;
};

// Create greeting card with suggestions
const createGreetingCard = () => {
    return `
        <p>👋 Salam Alaikoum! I'm <strong>Makhlouf's Assistant</strong>.</p>
        <p>I can help you with:</p>
        <div class="suggested-questions">
            <button class="suggested-question" data-query="skills">
                <i class="ri-tools-line"></i> What are your skills?
            </button>
            <button class="suggested-question" data-query="projects">
                <i class="ri-folder-3-line"></i> Show me your projects
            </button>
            <button class="suggested-question" data-query="contact">
                <i class="ri-mail-line"></i> How can I contact you?
            </button>
            <button class="suggested-question" data-query="resume">
                <i class="ri-file-list-3-line"></i> Tell me about your experience
            </button>
        </div>
    `;
};

// Process user message - returns response object if known, null if needs AI
const processLocalMessage = (message) => {
    const lowerMsg = message.toLowerCase();

    // Skills related
    if (lowerMsg.includes('skill') || lowerMsg.includes('techno') || lowerMsg.includes('stack') ||
        lowerMsg.includes('python') || lowerMsg.includes('code') || lowerMsg.includes('programming')) {
        return { type: 'rich', content: createSkillCard(), text: 'Here are my technical skills:' };
    }

    // Projects related
    if (lowerMsg.includes('project') || lowerMsg.includes('work') || lowerMsg.includes('portfolio') ||
        lowerMsg.includes('app') || lowerMsg.includes('application')) {
        return { type: 'rich', content: createProjectCards(), text: 'Here are some of my featured projects:' };
    }

    // Contact related
    if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('phone') ||
        lowerMsg.includes('reach') || lowerMsg.includes('connect') || lowerMsg.includes('hire')) {
        return { type: 'rich', content: createContactCard(), text: 'Here\'s how you can reach me:' };
    }

    // Resume/Education related
    if (lowerMsg.includes('resume') || lowerMsg.includes('cv') || lowerMsg.includes('education') ||
        lowerMsg.includes('degree') || lowerMsg.includes('experience') || lowerMsg.includes('study') ||
        lowerMsg.includes('university') || lowerMsg.includes('background')) {
        return { type: 'rich', content: createResumeCard(), text: 'Here\'s a summary of my background:' };
    }

    // Greetings
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey') ||
        lowerMsg.includes('salam') || lowerMsg.includes('bonjour') || lowerMsg.includes('coucou')) {
        return { type: 'rich', content: createGreetingCard(), text: 'Hello! How can I help you today?' };
    }

    // Thanks
    if (lowerMsg.includes('thank') || lowerMsg.includes('merci') || lowerMsg.includes('thanks')) {
        return { type: 'text', text: "You're welcome! 😊 Feel free to ask if you need anything else." };
    }

    // Goodbye
    if (lowerMsg.includes('bye') || lowerMsg.includes('goodbye') || lowerMsg.includes('au revoir')) {
        return { type: 'text', text: 'Goodbye! Have a great day! 👋' };
    }

    // About the bot
    if (lowerMsg.includes('who are you') || lowerMsg.includes('your name') || lowerMsg.includes('bot')) {
        return { type: 'text', text: "I'm Makhlouf's AI assistant! I can tell you about his skills, projects, experience, and help you get in touch with him. Feel free to ask me anything!" };
    }

    // Not a known query - need AI response
    return null;
};

// Handle outgoing message (main entry point)
const handleOutgoingMessage = async (e) => {
    e.preventDefault();

    const message = messageInput.value.trim();
    if (!message || isTyping) return;

    // Add user message
    addUserMessage(message);
    messageInput.value = '';
    messageInput.style.height = 'auto';

    // Check if local knowledge can handle it
    const localResponse = processLocalMessage(message);

    if (localResponse) {
        // Use local rich response
        isTyping = true;
        const typing = showTyping();

        setTimeout(() => {
            removeTyping();
            addBotMessage(localResponse);
            isTyping = false;
        }, 600);
    } else {
        // Need intelligent response from AI
        isTyping = true;
        const typing = showTyping();

        // Fetch response from backend
        const aiResponse = await fetchIntelligentResponse(message);

        removeTyping();
        addBotMessage({ type: 'text', text: aiResponse });
        isTyping = false;
    }
};

// Close chat and scroll to section
window.closeChatAndScroll = (selector) => {
    document.body.classList.remove('show-chatbot');
    setTimeout(() => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 300);
};

// Quick action handlers
document.querySelectorAll('.quick-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const queries = {
            skills: 'What are your skills?',
            projects: 'Show me your projects',
            contact: 'How can I contact you?',
            resume: 'Tell me about your experience'
        };

        messageInput.value = queries[action];
        handleOutgoingMessage(new Event('submit'));
    });
});

// Suggested question handlers
document.addEventListener('click', (e) => {
    if (e.target.closest('.suggested-question')) {
        const btn = e.target.closest('.suggested-question');
        const queryMap = {
            skills: 'What are your skills?',
            projects: 'Show me your projects',
            contact: 'How can I contact you?',
            resume: 'Tell me about your experience'
        };

        const query = btn.dataset.query;
        if (queryMap[query]) {
            messageInput.value = queryMap[query];
            handleOutgoingMessage(new Event('submit'));
        }
    }
});

// Event listeners
if (sendMessageButton) {
    sendMessageButton.addEventListener('click', handleOutgoingMessage);
}

if (messageInput) {
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleOutgoingMessage(e);
        }
    });

    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = messageInput.scrollHeight + 'px';
    });
}

if (chatbotToggler) {
    chatbotToggler.addEventListener('click', () => {
        document.body.classList.toggle('show-chatbot');
        if (document.body.classList.contains('show-chatbot')) {
            setTimeout(() => messageInput?.focus(), 300);
        }
    });
}

if (closeChatbot) {
    closeChatbot.addEventListener('click', () => {
        document.body.classList.remove('show-chatbot');
    });
}

if (clearChat) {
    clearChat.addEventListener('click', () => {
        // Keep only welcome message
        const welcomeMsg = chatBody.querySelector('.welcome-message');
        chatBody.innerHTML = '';
        if (welcomeMsg) {
            chatBody.appendChild(welcomeMsg);
        }
        messageHistory = [];
    });
}

// Emoji picker
if (emojiPicker) {
    const emojiContainer = document.createElement('div');
    emojiContainer.className = 'emoji-picker-container';
    emojiContainer.innerHTML = `
        <div class="emoji-grid">
            ${commonEmojis.map(emoji => `<button class="emoji-btn">${emoji}</button>`).join('')}
        </div>
    `;

    document.querySelector('.chat-form').appendChild(emojiContainer);

    emojiPicker.addEventListener('click', () => {
        emojiContainer.classList.toggle('show');
    });

    emojiContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('emoji-btn')) {
            messageInput.value += e.target.textContent;
            messageInput.focus();
            emojiContainer.classList.remove('show');
        }
    });

    // Close emoji picker when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.input-actions') && !e.target.closest('.emoji-picker-container')) {
            emojiContainer.classList.remove('show');
        }
    });
}

// Close chat on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('show-chatbot')) {
        document.body.classList.remove('show-chatbot');
    }
});