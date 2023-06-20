const express = require("express"),
    path = require("path"),
    app = express(),
    puerto = 3000;

app.post('/iniciar-sesion', (peticion, respuesta) => {
    
});

app.post('/registrar-usuario', (peticion, respuesta) => {
    
});

app.get('/habilidades', (peticion, respuesta) => {
    
});

app.get('/habilidades-categorias', (peticion, respuesta) => {
    
});

app.get('/solicitudes', (peticion, respuesta) => {
    
});

app.get('/solicitudes-relevantes', (peticion, respuesta) => {
    
});

app.get('/solicitudes-activas', (peticion, respuesta) => {
    
});

app.post('/aceptar-solicitud', (peticion, respuesta) => {
    
});

app.post('/solicitud', (peticion, respuesta) => { //crear-solicitud
    
});

app.get('/solicitud-chat', (peticion, respuesta) => { 
    
});

app.post('/solicitud-chat-mensaje', (peticion, respuesta) => { 
    
});

app.post('/finalizar-solicitud', (peticion, respuesta) => { 
    
});

app.post('/solicitud-chat-mensaje', (peticion, respuesta) => { 
    
});



// Una vez definidas nuestras rutas podemos iniciar el servidor
app.listen(puerto, err => {
    if (err) {
        // Aquí manejar el error
        console.error("Error escuchando: ", err);
        return;
    }
    // Si no se detuvo arriba con el return, entonces todo va bien ;)
    console.log(`Escuchando en el puerto :${puerto}`);
})