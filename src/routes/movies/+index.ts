import type { RequestHandler } from "express";
import { Request } from '../../types'

import { Client } from "pg"

export const request: Request = Request.GET

export const callback = (pgConn: Client): RequestHandler => {
    return async (req, res) => {
        let result = await pgConn.query(
            `SELECT * FROM movies;`)
        
        for (let i = 0; i < result.rows.length; i++)
            if (!result.rows[i].actors) result.rows[i].actors = (await pgConn.query(`SELECT a.* FROM movie_actors AS ma JOIN actors a ON a.id = ma.actor_id WHERE movie_id = ${result.rows[i].id};`)).rows

        res.send(result.rows)

        if(result.rows){
            //SELECT QUERY Actors
            // rows['actors'] uitbreiden
        }
    }
}