import http, { IncomingMessage, Server, ServerResponse } from "http";
import getOrgans from './controllers/organ-Control';
import { getOrgan, createOrganization, updateOrganization, deleteOrganization} from "./controllers/organ-Control";
/*
implement your server code here
*/
// const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {

//     if (req.method === "GET") {
//       res.end(JSON.stringify({ name: "hello" }));
//     }
//   }
// );

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if(req.url === "/api/organization" && req.method === "GET"){
     getOrgans(req, res)
  }
  else if(req.url?.match(/\/api\/organization\/([0-9]+)/) && req.method === 'GET'){
      const id:number = Number(req.url.split('/')[3])
      getOrgan(req, res, id)
  }
  else if(req.url === "/api/organization" && req.method === 'POST'){
      createOrganization(req, res)
  }
  else if(req.url?.match(/\/api\/organization\/([0-9]+)/) && req.method === 'PATCH'){
    const id:number = Number(req.url.split('/')[3])
    updateOrganization(req, res, id)
  }
  else if(req.url?.match(/\/api\/organization\/([0-9]+)/) && req.method === 'DELETE'){
    const id:number = Number(req.url.split('/')[3])
    deleteOrganization(req, res, id)
  }
  else{
      res.writeHead(404, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({message: "Route Not Found"}))
  }

})



const PORT = process.env.PORT||3005
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
