const currentVersion = '1.1.0'; // Cambia este número con cada nueva subida

// Verifica la versión almacenada
const savedVersion = localStorage.getItem('version');

// Si la versión almacenada es diferente, limpiar el localStorage
if (savedVersion !== currentVersion) {
    localStorage.clear(); // Limpiar todo el localStorage
    localStorage.setItem('version', currentVersion); // Guardar la nueva versión
}

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

// Mensajes aleatorios
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

// Función para normalizar los nombres (elimina tildes, mayúsculas y caracteres especiales)
function normalizarTexto(texto) {
    return texto
        .normalize('NFD') // Normaliza y separa los caracteres con tildes
        .replace(/[\u0300-\u036f]/g, '') // Elimina las tildes
        .toLowerCase()
        .replace(/[^a-z\s]/g, ''); // Elimina caracteres especiales, excepto letras y espacios
}

// Manejo del formulario
document.getElementById('secretoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const nombreCompleto = `${nombre} ${apellido}`;
    
    const nombreNormalizado = normalizarTexto(nombreCompleto);
    
    const amigoIndex = amigos.map(amigo => normalizarTexto(amigo)).indexOf(nombreNormalizado);
    
    if (amigoIndex !== -1) {
        // Verifica si ya hay un resultado almacenado en localStorage
        const resultadoAlmacenado = localStorage.getItem(`amigoSecreto_${nombreNormalizado}`);
        
        if (resultadoAlmacenado) {
            alert("Ya has descubierto tu amigo secreto. No puedes intentarlo de nuevo.");
        } else {
            // Amigo encontrado, asignar amigo secreto
            let amigosDisponibles = amigos.slice();
            amigosDisponibles.splice(amigoIndex, 1); // Elimina al usuario actual de la lista
            amigosDisponibles = amigosDisponibles.sort(() => 0.5 - Math.random()); // Barajar la lista
            
            const amigoSecreto = amigosDisponibles[0]; // Asigna el primer amigo disponible
            const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
            
            // Guardar el resultado en localStorage
            localStorage.setItem(`amigoSecreto_${nombreNormalizado}`, JSON.stringify({
                nombreCompleto,
                amigoSecreto,
                mensaje
            }));
            
            // Mostrar el resultado
            mostrarResultado(nombreCompleto, amigoSecreto, mensaje);
            
            // Deshabilitar el botón para evitar nuevos intentos
            document.getElementById('submitBtn').disabled = true;
        }
    } else {
        alert("No estás registrado o ingresaste mal tu nombre.");
    }
});

// Función para mostrar el resultado en la misma página
function mostrarResultado(nombreCompleto, amigoSecreto, mensaje) {
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('nombreResultado').textContent = `Eres ${nombreCompleto}`;
    document.getElementById('amigoSecreto').textContent = `Tu amigo secreto es: ${amigoSecreto}`;
    document.getElementById('mensaje').textContent = mensaje;
}

// Al cargar la página, verificar si ya hay un resultado almacenado
document.addEventListener('DOMContentLoaded', function() {
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const nombreCompleto = `${nombre} ${apellido}`;
    
    const nombreNormalizado = normalizarTexto(nombreCompleto);
    const resultadoAlmacenado = localStorage.getItem(`amigoSecreto_${nombreNormalizado}`);
    
    if (resultadoAlmacenado) {
        const { amigoSecreto, mensaje } = JSON.parse(resultadoAlmacenado);
        mostrarResultado(nombreCompleto, amigoSecreto, mensaje);
        // Deshabilitar el botón para que no intente de nuevo
        document.getElementById('submitBtn').disabled = true;
    }
});
