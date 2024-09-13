import type { RequestHandler } from "express";
import { Request } from '../../types'

import { Client } from "pg"

export const request: Request = Request.GET

export const callback = (pgConn: Client): RequestHandler => {
    return async (req, res) => {
        let result = await pgConn.query("SELECT * FROM actors;")
        if (result.rows.length == 0) {
            res.status(202).send({message: `unknown error`})
            return
        }
        
        res.send(result.rows)
    }
}