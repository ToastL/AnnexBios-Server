import type { RequestHandler } from "express"
import { Request } from '../../types'

import dummyData from "./dummyData"

export const request: Request = Request.GET

export const callback: RequestHandler = (req, res) => {
    const movie = req.url.split('/')[2]

    res.send(dummyData[movie])
}