import type { RequestHandler } from "express";
import { Request } from '../../../types'

import { Client } from "pg";

export const request: Request = Request.GET

export const callback = (pgConn: Client): RequestHandler => {
    return async (req, res) => {
        try {
            let result = await pgConn.query(
                `SELECT * FROM movies WHERE id = ${req.params.id};`)
            
            for (let i = 0; i < result.rows.length; i++)
                if (!result.rows[i].actors) result.rows[i].actors = (await pgConn.query(`SELECT a.* FROM movie_actors AS ma JOIN actors a ON a.id = ma.actor_id WHERE movie_id = ${result.rows[i].id};`)).rows
            
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