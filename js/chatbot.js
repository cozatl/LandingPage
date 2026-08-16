// Objeto predefinido de respuestas según las instrucciones
const responses = {
    'hola': '¡Hola! ¿Cómo estás?',
    'adios': '¡Adiós! Que tengas un buen día.',
    'como estas': 'Estoy bien, gracias por preguntar.',
    'que puedes hacer': 'Puedo responder a tus preguntas básicas, como: qué es amazon prime?, como estás?',
    'que es amazon prime': `Amazon Prime es un programa de suscripción de pago de la tienda Amazon que ofrece envíos rápidos y gratuitos sin compra mínima en millones de productos, además de acceso a plataformas de entretenimiento digital como películas, música y lectura por una tarifa mensual o anual.
    Beneficios: música, envíos y películas.`
};

// Referencias a los elementos para minimizar
const chatContainer = document.getElementById('chat-container');
const chatHeader = document.getElementById('chat-header');
const toggleBtn = document.getElementById('toggle-btn');

// Referencias a los elementos del DOM
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Función para minimizar o maximizar el chat
function toggleChat() {
    chatContainer.classList.toggle('minimized');
    
    // Cambiar el icono del botón dependiendo del estado
    if (chatContainer.classList.contains('minimized')) {
        toggleBtn.textContent = '+';
    } else {
        toggleBtn.textContent = '−';
    }
}

// Permitir minimizar haciendo clic en el botón o en cualquier parte de la cabecera
chatHeader.addEventListener('click', toggleChat);

// Evitar que el clic en el botón active el evento de la cabecera dos veces
toggleBtn.addEventListener('click', (event) => {
    event.stopPropagation(); 
    toggleChat();
});

// Función para generar la respuesta del chatbot basada en el mensaje del usuario
function generateBotResponse(userMessage) {
    // Normalizar el texto (pasar a minúsculas y quitar espacios sobrantes)
    const cleanedMessage = userMessage
        .toLowerCase()
        .trim()
        .normalize("NFD")                // Descompone caracteres con acento
        .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos físicamente
        .replace(/[¿?¡!.,]/g, "");       // Elimina signos de interrogación, exclamación, puntos y comas
    
    // Buscar en el objeto de respuestas o devolver un mensaje por defecto
    if (responses[cleanedMessage]) {
        return responses[cleanedMessage];
    } else {
        return 'Lo siento, no entiendo esa pregunta. Prueba con "hola" o "qué puedes hacer".';
    }
}

// Función principal para procesar y enviar el mensaje
function handleSendMessage() {
    const messageText = userInput.value;

    // Validar que el campo no esté vacío
    if (messageText.trim() === '') return;

    // 1. Agregar mensaje del usuario al contenedor
    appendMessage(messageText, 'user');

    // Limpiar el campo de entrada inmediatamente
    userInput.value = '';

    // 2. Obtener la respuesta del chatbot
    const botReply = generateBotResponse(messageText);

    // 3. Agregar la respuesta del chatbot al contenedor (con un pequeño retraso para simular pensamiento)
    setTimeout(() => {
        appendMessage(botReply, 'bot');
    }, 400);
}

// Función auxiliar para crear un nuevo elemento en el div de mensajes
function appendMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = text;
    
    chatMessages.appendChild(messageElement);
    
    // Desplazar automáticamente el scroll hacia abajo para ver el mensaje nuevo
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Evento que se ejecuta al hacer clic en el botón de enviar
sendBtn.addEventListener('click', handleSendMessage);

// Evento adicional para permitir el envío al presionar la tecla "Enter"
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleSendMessage();
    }
});