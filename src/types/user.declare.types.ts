import {UserViewModel} from "./types";

declare global {
    namespace Express {
        export interface Request {
            user: UserViewModel | null
        }
    }
}