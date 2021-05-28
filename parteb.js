const fs = require('fs')

const json = JSON.parse(fs.readFileSync("./out.json", {encoding:'utf-8'}))

items=[]
for(let modules in json){
  for(let modulo in json[modules]){
    obj={ //guardo en variable (nombre, largodearreglo)
      name: modulo,
      value: json[modules][modulo].length
  }
  items.push(obj)
  }
}

items.sort(function (a, b) { // ordeno por tamano de arreglo de menor a mayor
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
});
let salida = []
let modules = []

for(let i in items){
      if(json.content_module[items[i].name] === undefined){
      const cmod = JSON.parse(fs.readFileSync("./json/"+json.auth_module[items[i].name][0], {encoding:'utf-8'}))
      if(!modules.includes(cmod.provider.content_module) ||  !modules.includes(cmod.provider.auth_module))
      salida.push(json.auth_module[items[i].name][0])
      if(!modules.includes(cmod.provider.content_module))
      modules.push(cmod.provider.content_module)
      if(!modules.includes(cmod.provider.auth_module))
      modules.push(cmod.provider.auth_module)
      }else{
        const cmod = JSON.parse(fs.readFileSync("./json/"+json.content_module[items[i].name][0], {encoding:'utf-8'}))
        if(!modules.includes(cmod.provider.content_module) ||  !modules.includes(cmod.provider.auth_module))
        salida.push(json.content_module[items[i].name][0])
        if(!modules.includes(cmod.provider.content_module))
        modules.push(cmod.provider.content_module)
        if(!modules.includes(cmod.provider.auth_module))
        modules.push(cmod.provider.auth_module)
      }
}
console.log(salida)