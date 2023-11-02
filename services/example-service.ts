import MongoDBClient from '../db/mongodb-client';

class Example {
    constructor() {
        console.log('Example service loaded');
    }

    getById(id: number) {
        return {
            id: 1,
            name: 'Example',
        };
    }

    async get() {
        const client = await MongoDBClient.getClient();
        const objects = await client
            .db('codemaster')
            .collection('test')
            .find()
            .toArray();
        return objects;
    }

    create(name: string) {
        return {
            id: 1,
            name: name,
        };
    }
}

export default Example;
