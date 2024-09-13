import type { RequestHandler } from "express";
import { Request } from '../types'

export const request: Request = Request.GET

export const callback = (): RequestHandler => {

    return (req, res) => {
        res.send("pong!")
    }
}