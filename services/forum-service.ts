import { BSON, ObjectId } from 'mongodb';
import MongoDBClient from '../db/mongodb-client';

class ForumService {
    constructor() {}

    async getById(id: string) {
        const client = await MongoDBClient.getClient();
        const question = await client
            .db('codemaster')
            .collection('questions')
            .findOne({ _id: new ObjectId(id) });

        if (!question) {
            throw new Error('Question not found');
        }

        // Sort the comments by the number of votes in descending order
        question.comments.sort((a: any, b: any) => b.votes - a.votes);
        return question;
    }

    async get() {
        const client = await MongoDBClient.getClient();
        const questions = await client
            .db('codemaster')
            .collection('questions')
            .find({})
            .toArray();
        return questions;
    }

    async createQuestion(question: any) {
        const client = await MongoDBClient.getClient();
        const newDocument = await client
            .db('codemaster')
            .collection('questions')
            .insertOne(question);

        if (!newDocument) {
            throw new Error('Error creating question');
        }

        return newDocument;
    }

    async createComment(comment: any, id: string) {
        console.log(comment);
        const client = await MongoDBClient.getClient();
        const question = await client
            .db('codemaster')
            .collection('questions')
            .findOne({ _id: new ObjectId(id) });

        if (!question) {
            throw new Error('Error creating comment');
        }

        // Add id
        comment._id = new ObjectId();

        const newQuestion = {
            ...question,
            comments: [...question.comments, comment],
        };

        const updatedQuestion = await client
            .db('codemaster')
            .collection('questions')
            .updateOne({ _id: new ObjectId(id) }, { $set: newQuestion });

        if (!updatedQuestion) {
            throw new Error('Error creating comment');
        }

        return updatedQuestion;
    }

    async voteComment(id: string, commentId: string, vote: number) {
        const client = await MongoDBClient.getClient();
        const question = await client
            .db('codemaster')
            .collection('questions')
            .findOne({ _id: new ObjectId(id) });

        if (!question) {
            throw new Error('Error creating comment');
        }

        // Find the comment
        question.comments.forEach((comment: any) => {
            if (comment._id.toString() === commentId) {
                comment.votes += vote;
            }
        });

        const updatedQuestion = await client
            .db('codemaster')
            .collection('questions')
            .updateOne({ _id: new ObjectId(id) }, { $set: question });

        if (!updatedQuestion) {
            throw new Error('Error creating comment');
        }

        return updatedQuestion;
    }
}

export default ForumService;
