import { db } from './firebase-config.js';
import { ref, set, get } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";

// Función para mostrar el resultado en la misma página
function mostrarResultado(nombre, gustos, noGustos) {
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('nombreResultado').textContent = `Te registraste como ${nombre}.`;
    document.getElementById('gustosResultado').textContent = `Te gusta: ${gustos}.`;
    document.getElementById('noGustosResultado').textContent = `No te gusta: ${noGustos}.`;
}

// Manejo del formulario de registro
document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const gustos = document.getElementById('gustos').value.trim();
    const noGustos = document.getElementById('noGustos').value.trim();

    if (nombre && gustos && noGustos) {
        const registro = {
            nombre: nombre,
            gustos: gustos,
            noGustos: noGustos
        };

        // Guarda los datos bajo un identificador único en Firebase
        set(ref(db, 'registros/' + nombre.toLowerCase()), registro)
            .then(() => {
                mostrarResultado(nombre, gustos, noGustos);
                alert('¡Registro exitoso!');
                document.getElementById('registroForm').reset();
            })
            .catch(error => {
                console.error('Error al registrar:', error);
            });
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Función para leer y mostrar datos (opcional)
function leerDatos() {
    get(ref(db, 'registros'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No hay datos disponibles");
            }
        })
        .catch((error) => {
            console.error("Error al leer los datos:", error);
        });
}

// Llamar a la función para leer datos (opcional)
leerDatos();
