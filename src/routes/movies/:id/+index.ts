import type { RequestHandler } from "express";
import { Request } from '../../../types'

import dummyData from "../dummyData"

export const request: Request = Request.GET

export const callback: RequestHandler = (req, res) => {
    if (!dummyData[req.params.id]) {
        res.status(200).send({error: 202, message: `Could not find movie ${req.params.id}`})
        return
    }

    res.send(dummyData[req.params.id])
}