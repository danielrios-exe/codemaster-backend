import MongoDBClient from '../db/mongodb-client';

class ForumService {
    constructor() {}

    async getById(id: string) {
        return {
            id: 1,
            title: 'Cómo puedo declarar una variable global?',
            description:
                'Estoy tratando de crear una variable global pero al momento de leer el valor es undefined',
            createdBy: 'Daniel Rios',
            votes: 3,
            comments: [
                {
                    id: 1,
                    description:
                        'Todo depende del lenguaje que vayas a utilizar. En general debes entender que todas las variables se encuentran dentro de un scope. Debes tener la variable en el scope global, es decir, fuera de cualquier función.',
                    createdBy: 'Mr Java',
                    votes: 2,
                },
                {
                    id: 2,
                    description:
                        'En JavaScript, se declara una variable global cuando se define fuera de una función. En este caso, la variable es accesible para cualquier script que se ejecute en la página, incluidas otras funciones.',
                    createdBy: 'Mark Zuckerberg',
                    votes: 1,
                },
            ],
        };
    }

    async get() {
        const questions = [
            {
                id: 1,
                title: 'Cómo puedo declarar una variable global?',
                description:
                    'Estoy tratando de crear una variable global pero al momento de leer el valor es undefined',
                createdBy: 'Daniel Rios',
                votes: 3,
            },
            {
                id: 2,
                title: 'Cómo configuraron prettier para proyectos de JS?',
                description:
                    'Recuerdo que en la clase lo mencionaron, pero no recuerdo cómo se hace :(',
                createdBy: 'Mr Java',
                votes: 1,
            },
            {
                id: 3,
                title: 'Es lo mismo una variable y una constante?',
                description: 'Ayuda por favor, no entiendo la diferencia',
                createdBy: 'Mark Zuckerberg',
                votes: 0,
            },
        ];
        return questions;
    }

    create(name: string) {
        return {
            id: 1,
            name: name,
        };
    }
}

export default ForumService;
