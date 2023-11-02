import { MongoClient, ServerApiVersion } from 'mongodb';
import Variables from '../config/variables';

class MongoDBClient {
    private static MONGO_URI =
        Variables.db.protocol +
        Variables.db.username +
        Variables.db.password +
        Variables.db.host +
        Variables.db.options;

    private static client = new MongoClient(this.MONGO_URI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    private static connected: boolean = false;

    static getClient = async () => {
        if (!this.connected) {
            try {
                await this.client.connect();
            } catch (error) {
                console.log('Error connecting to client', error);
            }
        }
        return this.client;
    };
}

export default MongoDBClient;
