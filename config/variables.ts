import * as dotenv from 'dotenv';

interface VariablesInterface {
    environment: string;
    port: string;
    db: {
        protocol: string;
        username: string;
        password: string;
        host: string;
        options?: string;
    };
}

// Loads .env file content into process.env
dotenv.config();

// Global project's config object
const Variables: VariablesInterface = {
    environment: process.env.ENVIRONMENT || 'development',
    port: process.env.PORT || '3000',
    db: {
        protocol: process.env.DB_PROTOCOL || '',
        username: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || '',
        host: process.env.DB_HOST || '',
        options: process.env.DB_OPTIONS || '',
    },
};

export default Variables;
