import Errors from '../errors/errors';
import MongoDBClient from '../db/mongodb-client';
import AuthenticationService from './authentication-service';
import { parse } from 'path';
import { WithId } from 'mongodb';

interface User {
    id?: string;
    username: string;
    password: string;
    name: string;
    lastName: string;
    email: string;
}

class UserService {
    /**
     * Searches for a user in the database
     * Used for auth
     * @param username
     * @param password
     * @returns Mongo user object or null if not found
     */
    async getUserByUsername(username: string): Promise<any> {
        const client = await MongoDBClient.getClient();
        const user = await client
            .db('codemaster')
            .collection('user')
            .findOne({ username: username });

        return user;
    }

    /**
     * Checks if a user is in the database
     * Used to authenticate users
     * @param username
     * @param password
     * @returns boolean
     */
    async isUserValid(username: string, password: string): Promise<boolean> {
        const authService = new AuthenticationService();
        const userFromDB = await this.getUserByUsername(username);

        if (!userFromDB) {
            throw Errors.UNAUTHORIZED;
        }

        const decryptedPassword = authService.decryptor(userFromDB.password);
        const isUserValid = password === decryptedPassword;

        return isUserValid;
    }

    async createUser(userObj: User) {
        const authService = new AuthenticationService();
        const client = await MongoDBClient.getClient();

        // Check if user exists
        const existentUser = await this.getUserByUsername(userObj.username);
        if (existentUser) {
            throw Errors.USERNAME_ALREADY_IN_DB;
        }

        // Encrypt password
        const encryptedPassword = authService.encryptor(userObj.password);
        const newUser = {
            ...userObj,
            password: encryptedPassword,
        };

        // Persist user
        const mongoUser = await client
            .db('codemaster')
            .collection('user')
            .insertOne(newUser);

        // At this point input is already validated
        // If insert fails, we have something wrong
        if (!mongoUser) {
            throw Errors.INTERNAL_SERVER_ERROR;
        }

        const token = authService.createToken({
            username: userObj.username,
            password: userObj.password,
        });

        // Remove password from response
        newUser.password = '';
        newUser.id = mongoUser.insertedId.toString();

        return { token, createdUser: newUser };
    }

    async getUserInfo(username: string) {
        const client = await MongoDBClient.getClient();
        const user = await client
            .db('codemaster')
            .collection('user')
            .findOne({ username: username });

        if (!user) {
            throw Errors.NO_USER_FOUND;
        }

        // Remove password from response
        user.password = '';

        return user;
    }

    validateUserInput(user: User) {
        const { username, password, name, lastName, email } = user;

        if (!username || !password || !name || !lastName || !email) {
            throw Errors.INVALID_USER_OBJECT;
        }
    }

    async updateUserInfo(user: any) {
        const client = await MongoDBClient.getClient();
        const { username, name, lastName, email } = user;

        const updatedUser = await client
            .db('codemaster')
            .collection('user')
            .updateOne(
                { username: username },
                { $set: { name, lastName, email } },
            );

        if (!updatedUser) {
            throw Errors.INTERNAL_SERVER_ERROR;
        }

        return updatedUser;
    }
}

export default UserService;
export type UserType = User;
