// Lista de amigos
const amigos = [
    "Arcesio Espitia", 
    "Angel Rodriguez", 
    "Angela Rodriguez", 
    "Maria Juncos", 
    "Juan Juncos", 
    "Andres Juncos", 
    "Yuranis Rodriguez", 
    "Valery Bermudez", 
    "Carolina Suarez"
];

// Mensajes
const mensajes = [
    "Eres mi lugar favorito en este mundo.",
    "Un amigo como tú es un tesoro invaluable.",
    "Contigo, cada momento es una aventura.",
    "La risa compartida es la mejor medicina.",
    "Tu sonrisa ilumina mis días más oscuros.",
    "Gracias por ser mi cómplice en locuras.",
    "Eres el sueño del que nunca quiero despertar.",
    "Juntos somos imparables, siempre a tu lado.",
    "Tus abrazos son mi refugio favorito.",
    "La amistad contigo es un regalo que valoro siempre."
];

// Registro del usuario
document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const nombreCompleto = `${nombre} ${apellido}`;

    // Guardar el nombre registrado en localStorage
    localStorage.setItem('nombreUsuario', nombreCompleto);
    alert("¡Registro exitoso! Ahora puedes descubrir tu Amigo Secreto.");
});

// Descubrir Amigo Secreto
document.getElementById('descubrirBtn').addEventListener('click', function() {
    const nombreUsuario = localStorage.getItem('nombreUsuario');

    if (!nombreUsuario) {
        document.getElementById('resultado').innerText = "No estás registrado.";
        return;
    }

    // Filtrar el nombre del usuario registrado
    const amigosDisponibles = amigos.filter(amigo => amigo !== nombreUsuario);
    
    if (amigosDisponibles.length === 0) {
        document.getElementById('resultado').innerText = "No hay suficientes amigos para asignar.";
        return;
    }

    // Asignar un amigo secreto aleatorio
    const amigoSecreto = amigosDisponibles[Math.floor(Math.random() * amigosDisponibles.length)];
    const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];

    // Mostrar el resultado
    document.getElementById('resultado').innerHTML = `
        Eres <strong>${nombreUsuario}</strong>.<br>
        Tu amigo secreto es: <strong>${amigoSecreto}</strong>.<br>
        <em>${mensaje}</em>
    `;
});
