import type { RequestHandler } from "express";
import { Request } from '../../../types'

import { Client } from "pg";

export const request: Request = Request.GET

export const callback = (pgConn: Client): RequestHandler => {
    return async (req, res) => {
        try {
            let result = await pgConn.query(`SELECT * FROM actors WHERE id = ${req.params.id};`)
            if (result.rows.length == 0) {
                res.status(202).send({message: `movie with id '${req.params.id}' does not exist`})
                return
            }
    
            res.send(result.rows)
        } catch (e) {
            res.send(e)
        }
    }
}