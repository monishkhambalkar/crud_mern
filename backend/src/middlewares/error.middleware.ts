import { Request, Response, NextFunction } from "express";

export default function errorHandler(err: any, req: Request, res : Response, next : NextFunction){
    console.log(err);
    res.status(err.status || 500).json({error : err.message || "Internal server error "})
}