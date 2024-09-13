import type { RequestHandler } from "express";
import { Request } from '../../types'

import { Client } from "pg"

export const request: Request = Request.GET

export const callback = (pgConn: Client): RequestHandler => {
    return async (req, res) => {
        let result = await pgConn.query(`SELECT a.*,
                                         ARRAY_AGG(m.* ORDER BY m.id, ', ') AS movies
                                         FROM actors a
                                         JOIN movie_actors ma ON a.id = ma.actor_id
                                         JOIN movies m ON m.id = ma.movie_id
                                         GROUP BY a.id, a.firstname;`)
        if (result.rows.length == 0) {
            res.status(202).send({message: `unknown error`})
            return
        }
        
        res.send(result.rows)
    }
}