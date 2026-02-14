const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = document.querySelector("#file-cancel");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");

const userData = {
    message: null,
    file: {
        data: null,
        mime_type: null
    }
}

const initialInputHeight = messageInput.scrollHeight;

const API_KEY = "AIzaSyCk0qNP62LA_S_hEAU04VpT9ywiXz4TrAU";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

// Create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}
const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");

    // Contexte système avec les informations personnelles du CV
    const systemContext = `Tu es un assistant pour makhlouf utile et généraliste.  
Voici des informations sur FECHETAH Makhlouf (coordonnées, formation, compétences, loisirs, etc.) :

INFORMATIONS PERSONNELLES:
- Nom complet: FECHETAH Makhlouf
- Date de naissance: 10/02/2003 à M'chedallah
- Adresse: SAHARIDJ W BOUIRA
- Statut: Célibataire (Single)
- Nationalité: Algérien
- Téléphone: +213 0666218828
- Email: makhlouf.fechetah@univ-bouira.dz

FORMATION ACADÉMIQUE:
- 2025-2026: 1ère année Master en Informatique à l'Université de Bouira
- 2025: Licence en Informatique, spécialisation Systèmes d'Information
- 2024-2025: 3ème année Licence en Informatique à l'Université de Bouira
- 2023-2024: 2ème année Licence en Informatique à l'Université de Bouira
- 2022-2023: 1ère année Licence en Informatique à l'Université de Bouira
- 2022: Diplôme de Lycée en Sciences Expérimentales (BELKACEMI ALI High School _ Saharidj)

STAGE:
- 25/02/2025 au 26/03/2025: Stage pratique à SONATRACH _ STATION SBM _ Beni Mansour

LANGUES:
- Français: Très bien parlé, lu et écrit
- Anglais: Très bien parlé, lu et écrit
- Arabe: Très bien parlé, lu et écrit
- Kabyle: Langue maternelle

COMPÉTENCES:
- Adaptabilité
- Compétences en communication
- Responsable et apprécie le travail en équipe
- Dynamique, actif, ponctuel, sérieux et disponible

LOISIRS:
Internet, littérature, lecture, nouvelles technologies, voyages

SKILLES:
HTML , CSS , JavaScript , Python , Django , Git & Github , SQL , Algorithms & Data Structures , Machine Learning , Data Analysis

Utilise ces informations UNIQUEMENT lorsque l'utilisateur pose une question explicite sur Makhlouf (son parcours, ses compétences, ses coordonnées, etc.).  
Pour toutes les autres questions (culture générale, aide technique, blagues, etc.), réponds de manière normale, polie et utile, comme le ferait n'importe quel assistant IA.`;

    // Combiner le contexte système avec le message de l'utilisateur
    const fullMessage = systemContext + "\n\nQuestion de l'utilisateur: " + userData.message;

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: fullMessage }, ...(userData.file.data ? [{ inline_data: userData.file }] : [])]
            }]
        })
    }

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);

        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        messageElement.innerText = apiResponseText;
    } catch (error) {
        console.log(error);
        messageElement.innerHTML = error.message;
        messageElement.style.color = "#ff0000";
    } finally {
        userData.file = {};
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    }
}

const handleOutgoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    messageInput.value = "";
    fileUploadWrapper.classList.remove("file-uploaded");
    messageInput.dispatchEvent(new Event("input"));

    const messageContent = `<div class="message-text"></div>
                            ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,
                            ${userData.file.data}" class="attachment" />` : ""}`;
    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").innerText = userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

    setTimeout(() => {
        const messageContent = `<img class="bot-avatar" src="assets/img/home-perfil.png" width="50" height="50" viewBox="0 0 1024 1024">
            </img>
            <div class="message-text">
               <div class="thinking-indicator">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
               </div>
            </div>`;

        const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
        generateBotResponse(incomingMessageDiv);
    }, 600);
}

// Handle Enter key press for sending messages
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if (e.key === "Enter" && userMessage && !e.shiftKey && window.innerWidth > 768) {
        handleOutgoingMessage(e);
    }
});

messageInput.addEventListener("input", () => {
    messageInput.style.height = `${initialInputHeight}px`;
    messageInput.style.height = `${messageInput.scrollHeight}px`;
    document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "8px" : "15px";
});

// Handle file input change
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        fileUploadWrapper.querySelector("img").src = e.target.result;
        fileUploadWrapper.classList.add("file-uploaded");
        const base64String = e.target.result.split(",")[1];

        // Store file data in userData
        userData.file = {
            data: base64String,
            mime_type: file.type
        }

        fileInput.value = "";
    }

    reader.readAsDataURL(file);
});

fileCancelButton.addEventListener("click", () => {
    userData.file = {};
    fileUploadWrapper.classList.remove("file-uploaded");
});

const picker = new EmojiMart.Picker({
    theme: "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (emoji) => {
        const { selectionStart: start, selectionEnd: end } = messageInput;
        messageInput.setRangeText(emoji.native, start, end, "end");
        messageInput.focus();
    },
    onClickOutside: (e) => {
        if (e.target.id === "emoji-picker") {
            document.body.classList.toggle("show-emoji-picker");
        } else {
            document.body.classList.remove("show-emoji-picker");
        }
    }
});

document.querySelector(".chat-form").appendChild(picker);

sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
document.querySelector("#file-upload").addEventListener("click", () => fileInput.click());
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
closeChatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot"));