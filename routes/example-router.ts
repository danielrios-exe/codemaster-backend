import express from 'express';
import ExampleService from '../services/example-service';

const router = express.Router();
const example = new ExampleService();

router.get('/', async (req, res) => {
    const exampleObject = await example.get();
    res.json(exampleObject);
});

router.get('/:id', (req, res) => {
    const exampleObject = example.getById(parseInt(req.params.id));
    res.json(exampleObject);
});

router.post('/', (req, res) => {
    const exampleObject = example.create(req.body.name);
    res.json(exampleObject);
});

export default router;
