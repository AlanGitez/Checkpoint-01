"use strict";

/*
 * El objetivo es hacer un TO DO LIST:
 *   vas a tener que agregarle tareas a distintas personas y
 *   configurar propiedades de esas tareas.
 *
 *    (\
 *    \'\
 *     \'\     __________
 *     / '|   ()_________)
 *     \ '/    \ ~~~~~~~~ \
 *      \       \ ~~~~~~   \
 *      ==).      \__________\
 *     (__)       ()__________)
 */

var tasks = 
{
  
}; // acá vamos a guardar nuestras personas y tareas

module.exports = {
  reset: function () {
    tasks = {}; // esta función ya esta armada :D
  },
  // ==== COMPLETEN LAS SIGUIENTES FUNCIONES (vean los test de `model.js`) =====
  // LISTA DE LOS USUARIOS.
  listPeople: function () {
    // devuelve un arreglo de personas con tareas
    let people = [];
    for (const key in tasks) {
      people.push(key);
    }
    return people;
  },
  add: function (name, task) {
    // guarda una tarea para una persona en particular
    if(!task.complete) task.complete = false;
    tasks[name] ? tasks[name].push(task) : tasks[name] = [task];
  },
  // CUANTAS TAREAS POSEE CADA USUARIO.
  list: function(name){
    return tasks[name];
  },
  complete: function(name, i){
    if(!tasks[name][i].complete)
    tasks[name][i].complete = true;
  },
  remove: function(name, i){
    return tasks[name].splice(i, 1);
  }
  // etc.
};
