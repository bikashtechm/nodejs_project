import { nextTick } from "process";

export class UserController {

    static login( req, res, next) {
        const error = new Error('User does not exists');
        next(error);
    }

    static test( req, res, next) {
        console.log('Called Test Function..')
    }
}