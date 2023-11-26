import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
// import xd from '../data/loadFile'
const vm = require('node:vm');
const router = express.Router();
const directorio = path.join('./data', 'loadFile.json')


router.get('/', (req, res) => {
    try {
        let data = fs.readFileSync(directorio, 'utf8');
        let dataArray = JSON.parse(data);
        res.send(dataArray);
    }
    catch (error) {
        console.log('Error al ejecutar el codigo', error);
        res.status(500).json({ error: 'Error al ejecutar el codigo' })
    }
});

router.post('/', (req, res) => {
    try {
        let codigo = req.body.codigo;
        let contexto = vm.createContext();
        let salidaConsola = { log: [] as string[] };

        contexto.console = {
            log: (...args: unknown[]) => {
                if (Array.isArray(args)) {
                    salidaConsola.log.push(args.join(' '));
                } else {
                    console.error('args debe ser un array de strings');
                }
            }
        };

        try {
            vm.runInContext(codigo, contexto);
            res.send(salidaConsola.log.join('\n'));
        } catch (err) {
            if (err instanceof ReferenceError) {
                console.log("Error de referencia al ejecutar el código: ", err);
                res.status(400).json({ error: 'Error de referencia al ejecutar el código' });
            } else {
                console.log("Error al ejecutar el codigo: ", err);
                res.status(400).json({ error: 'Error al ejecutar el codigo' });
            }
        }
    } catch (err) {
        console.log("Error inesperado: ", err);
        res.status(500).json({ error: 'Error inesperado en el servidor' });
    }
});

export default router;