import { nextTick } from "process";

export class UserController {

    static login( req, res, next) {
        res.send(req.query);
    }

}