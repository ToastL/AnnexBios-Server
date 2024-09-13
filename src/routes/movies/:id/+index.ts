import type { RequestHandler } from "express";
import { Request } from '../../../types'

import { Client } from "pg";

export const request: Request = Request.GET

export const callback = (pgConn: Client): RequestHandler => {
    return async (req, res) => {
        try {
            let result = await pgConn.query(`SELECT m.*, 
                        ARRAY_AGG(a.* ORDER BY a.id, ', ') AS actors
                        FROM movies m 
                        JOIN movie_actors ma ON m.id = ma.movie_id
                        JOIN actors a ON a.id = ma.actor_id
                        WHERE m.id = ${req.params.id}
                        GROUP BY m.id, m.title`)
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