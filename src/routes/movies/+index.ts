import type { RequestHandler } from "express";
import { Request } from '../../types'

import { Client } from "pg"

export const request: Request = Request.GET

export const callback = (pgConn: Client): RequestHandler => {
    return async (req, res) => {
        // let result = await pgConn.query(
        //     `SELECT m.*, 
        //             STRING_AGG(a.*, ', ' ORDER BY ) AS actors 
        //             FROM movies m 
        //             JOIN movie_actors ma ON m.id = ma.movie_id
        //             JOIN actors a ON a.id = ma.actor_id
        //             GROUP BY m.id, m.title;`)
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