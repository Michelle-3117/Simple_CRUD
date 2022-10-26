import { rejects } from "node:assert"
import { resolve } from "node:path"

const fs = require('fs')
const data = './data.json';

 export function writeDataToFile(filename:string, content:string){
    if(!fs.existSync(filename)){
        fs.writeFile(data, JSON.stringify([content], null, 2), (err:any) => {
            if(err) throw err;
            console.log('data added')
        })
        return;
    }

    fs.readFile(data, 'utf-8', (err:any, fileContent:any) => {
        let data = JSON.parse(fileContent);

        data= data.push(JSON.parse(content))

        fs.writeFile(filename, JSON.stringify(data, null, 2), (err:any) => {
            if(err) throw err;
            console.log('data added')
        })
    })
    

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

// module.exports = {
//     writeDataToFile,
//     getPostData,     
// }