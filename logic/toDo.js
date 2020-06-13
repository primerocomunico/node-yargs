// File system
const fs = require('fs')

let listToDo = []

// Guardar en el archivo db/data.json
const safeDB = () => {
    let data = JSON.stringify(listToDo)
    fs.writeFile(`./db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo guardar la información', err);
    })
}

// Leer la info del archivo db/data.json
const getDB = () => {

    try {
        listToDo = require('../db/data.json')
    } catch (err) {
        // Evitamos que de un error cuando el archivo JSON inicialmente esté vacío
        listToDo = []
    }
}

// Función con parámetro description para crear una tarea
const createTask = (description) => {

    // Obtenemos los datos del archivo db/data.json para evitar que se sobre escriban
    getDB()

    let toDo = {
        description,
        complete: false
    }

    listToDo.push(toDo);
    safeDB();
    return 'Tarea creada con éxito. Utiliza el comando "listar" para mostrar todas las tareas.';
}

// Función para listar todas las tareas del archivo db/data.json
const listTasks = () => {
    getDB()
    return listToDo
}

// Función actualizar estado de tareas
const updateTask = (description, complete = true) => {
    getDB()

    const notes = 'Tarea realizada'

    let index = listToDo.findIndex(task => {
        return task.description === description
    })
    // Comprobar que el index es válido y existe en el return, ya que -1 es que no existe
    if (index >= 0) {
        // del index encontrado cambiamos su valor a true
        listToDo[index].complete = complete
        listToDo[index].notes = notes
        safeDB()
        return `Tarea ${listToDo[index].description} actualizada`
    } else {
        'No se actualizó nada'
    }
}

const deleteTask = (description) => {
    getDB()
    let newListToDo = listToDo.filter(task => {
        return task.description != description
    })
    let data = JSON.stringify(newListToDo)
    fs.writeFile(`./db/data.json`, data, (err) => {
        if (err) {
            throw new Error('No se pudo ejecutar el comando', err)
        } 
    })
    return `La tarea ${description} ha sido eliminada`
}

module.exports = {
    createTask,
    listTasks,
    updateTask,
    deleteTask
}