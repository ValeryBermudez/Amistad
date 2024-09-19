document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const gustos = document.getElementById('gustos').value.trim();
    const disgustos = document.getElementById('disgustos').value.trim();

    const nombreCompleto = `${nombre} ${apellido}`.toLowerCase();

    // Guardar los datos en localStorage
    const registro = {
        nombre: nombre,
        apellido: apellido,
        gustos: gustos,
        disgustos: disgustos
    };

    // Guardar en localStorage usando el nombre completo como clave
    localStorage.setItem(`amigo_${nombreCompleto}`, JSON.stringify(registro));

    // Mostrar mensaje de éxito
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('mensajeResultado').textContent = `¡Registro de ${nombre} ${apellido} completado!`;

    // Limpiar formulario
    document.getElementById('registroForm').reset();
});
