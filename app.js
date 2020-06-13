const argv = require('./config/yargs').argv
var colors = require('colors');

const toDoActions = require('./logic/toDo')

let comando = argv._[0]
switch (comando) {
    case 'crear':
        // create viene del archivo toDo.js
        let task = toDoActions.createTask(argv.description)
        console.log(task);
        break;

    case 'listar':
        // list viene del archivo toDo.js
        let toDoList = toDoActions.listTasks()
        for (let task of toDoList) {
            if (task.complete == true) {
                console.log('===== Done ====='.green);
            } else {
                console.log('===== For doing ====='.red);
            }
            console.log(task.description);
            console.log('Complete: ', task.complete);
            if (task.notes) {
                console.log('Anotaciones: ', task.notes);
                console.log('====================='.green);
            } else {
                console.log('====================='.red);
            }
        }
        break;

    case 'actualizar':
        let updated = toDoActions.updateTask(argv.description, argv.completed);
        console.log(updated);
        break;

    case 'borrar':
        let deleted = toDoActions.deleteTask(argv.description)
        console.log(deleted);
        break;

    default:
        console.log('Comando no reconocido');
}