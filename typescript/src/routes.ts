import { Request, Response } from 'express';
import createUser from './services/CreateUser'

// string, number, boolean, object, Array
// interfaces
export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        name: 'Diego', 
        email: 'diego@rocketseat.com',
        password: '123456',
        techs: [
            'Node.js', 
            'ReactJs', 
            'React Native',
            { title: 'Javascript', experience: 100 }
        ]
    });

    return response.json({message: 'Hello World'});
}