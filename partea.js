const fs = require('fs')

var files = fs.readdirSync("./json")


let existe_modulos = []
let modulos = {}

function ejecuteJson(value,file){
    for(let modulo in value.provider){
        if (!existe_modulos.includes(modulo)){
            modulos[modulo]={}
            existe_modulos.push(modulo)
        }
        if(modulos[modulo][value.provider[modulo]]){
            modulos[modulo][value.provider[modulo]].push(file)
        }else{ 
            modulos[modulo][value.provider[modulo]]=[]
            modulos[modulo][value.provider[modulo]].push(file)
        }
    }
}

files.map(file => (
    ejecuteJson(JSON.parse(fs.readFileSync("./json/"+file, {encoding:'utf-8'})),file)
))


const out = JSON.stringify(modulos)
fs.writeFile('./out.json', out , (error)=>{
    if(error){
        throw error
    }
    console.log('Archivo ./out.json fue creado exitosamente')
}
);
