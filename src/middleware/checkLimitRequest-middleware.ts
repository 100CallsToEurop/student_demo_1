import {Request, Response, NextFunction} from "express";
import {addMilliseconds} from "date-fns";

const requests: Array<{ip: any, createAt: Date}> = []

export const checkLimitReq = async(req: Request, res: Response, next: NextFunction) => {
    const ip = req.socket.remoteAddress
    const INTERVAL = 10000
    const maxLimit = 5
    const currentData = new Date()
    const formDate = addMilliseconds(currentData, -INTERVAL)

    requests.push({ip, createAt: currentData})

    const limits = requests.filter(el => el.ip === ip && el.createAt > formDate)
    console.log(limits.length)
    if(limits.length > maxLimit){
        res.status(429).send(429)
        return
    }

    next()

}
