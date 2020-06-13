// Control en línea de comandos
const description = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}

const argv = require('yargs')
    .command('crear', 'Crear una tarea por hacer', description)
    .command('actualizar', 'Actualizar el estado de una tarea', {
        description,
        completed: {
            default: true,
            alias: 'c',
            desc: 'Cambiar la tarea de estado pendiente/completado'
        }
    })
    .command('listar', 'Mostrar la lista de tareas')
    .command('borrar', 'Borrar una tarea específica', {
        description: {
            demand: true,
            alias: 'd',
            desc: 'Borra una tarea desde el archivo db/data.json'
        }
    })
    .help()
    .argv

module.exports = {
    argv
}