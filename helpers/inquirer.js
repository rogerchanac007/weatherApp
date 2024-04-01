const inquirer = require("inquirer")
require("colors")

const menuOpt = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [{
            value: 1,
            name: `${"1. ".green}Buscar ciudad`
        },
        {
            value: 2,
            name: `${"2. ".green}Historial`
        },
        {
            value: 0,
            name: `${"0. ".green}Salir`
        },],

    }
]

const inquirerMenu = async () => {
    console.clear()
    console.log("========================".green)
    console.log("  Seleccione una opcion".green)
    console.log("========================\n".green)

    const { opcion } = await inquirer.prompt(menuOpt);
    return opcion
}

const inquirerPausa = async () => {
    await inquirer.prompt({
        type: "input",
        name: "enter",
        message: `Presiona ${"Enter".green} para continuar.`
    })
}




const inquirerInput = async (message) =>{
    const {descripcion} = await inquirer.prompt(
        [
            {
                type: "input",
                name: "descripcion",
                message,
                validate: async (entrada) => {
                    if (entrada.length == 0){
                        return "Necesita ingresar un valor"
                    }
                    else{
                        return true
                    }
                }
            }
        ]
    )
    return descripcion;
}


const confirmCheck = async(tareas)=>{

    const choices = tareas.map((tarea, indice) => {
        indice += 1;
        return {
            value: tarea.id,
            name: `${indice} ${tarea._descripcion}`,
            checked:(tarea.completado) ? true : false

        }
    });

    const preguntas = [
        {
            type:"checkbox",
            name:"ids",
            message:"Confirmar",
            choices
        }
    ]

    const {ids} = await inquirer.prompt(preguntas)
    return ids

}

const listarTareasABorrar = async (tareas = []) => {
    
    const choices = tareas.map((tarea, indice) => {
        indice += 1;
        return {
            value: tarea.id,
            name: `${indice} ${tarea._descripcion}`
        }
    });

    const preguntas = [
        {
            type:"list",
            name:"id",
            message:"Borrar",
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas)

    return id
}

const confirmar = async (mensaje)=>{
    preguntas = [
        {
            type:"confirm",
            name:"ok",
            message:mensaje,
        }
    ]
    let {ok} = await inquirer.prompt(preguntas);
    return ok
}  

module.exports = {
    inquirerInput,
    inquirerMenu,
    inquirerPausa,
    listarTareasABorrar,
    confirmar,
    confirmCheck
}