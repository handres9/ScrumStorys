const mongoose = require('mongoose');

var Lista_Historias = new Schema({
    Titulo: String,
    Rol: String,
    Descripcion_funcionalidad: String,
    Finalidad: String,
    Criterios_aceptacion: Array
  });

var Lista_Proyectos = new Schema({
    Proyecto: String,
    Lista_Historias: [Lista_Historias]
});

var Usuario = new Schema({
    Nombre: String,
    Correo: String,
    Password: String,
    Lista_Proyectos: [Lista_Proyectos]
}, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', Usuario);