import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
// import xd from '../data/loadFile'

const router = express.Router();
const directorio = path.join('./data','loadFile.json')


router.get('/',(req,res)=>{
    try{
        let data = fs.readFileSync(directorio, 'utf8');
        let dataArray = JSON.parse(data);
        res.send(dataArray);
    }
    catch(error){
        console.log('Error al ejecutar el codigo', error);
        res.status(500).json({error: 'Error al ejecutar el codigo'})
    }
});

// router.post('/',(req,res)=>{
//     console.log("Entro ?");
//     let code = req.body.codigo;
//     // console.log(req.body.codigo);
//     // console.log(typeof(req.body));
//     let vm = new VM();
//     try{
//         console.log("entro 2");
//         console.log(code);
//         let result = vm.run("var resultado = console.log('Hola Mundo'); resultado;");
//         console.log("entro 3");
//         console.log(result);
//         res.json({result});
//     }catch(err){
//         console.log("Error al ejecutar el codigo: ", err);
//         res.status(500).json({error: 'Error al ejecutar el codigo'});
//     }
// });

export default router;