import { rejects } from "node:assert"
import { resolve } from "node:path"

const fs = require('fs')

function writeDataToFile(filename:string, content:string){

}

export function getPostData(req:any){
    return new Promise((resolve, reject) => {
        try {
            let body = ''
            req.on('data', (chunk:any) => {
                body += chunk.toString()
            })
            req.on('end', () => {
                resolve (body)
            })
        }catch(error){
           reject (error) 
        }
    })
}
export interface objInterface {
    [key: string]: number | string | string[]
}