const express = require('express');
const cors = require("cors");
const storage = require('node-persist');
const bodyParser = require("body-parser");
const { request, response } = require('express');
 const {v4: uuidv4 } = require('uuid'); 
// const privateMoorings = require('../privateMoorings.json');


(async()=>{
    
    await storage.init({dir:'./data'});

    // for(let m of privateMoorings){await storage.setItem(m.id.toString(),m);}
    const server = express();
    server.use(cors());
    server.use(express.json());
    server.use(bodyParser.json());

    server.get('/api/moorings', async(request,response)=>{
        let moorings = await storage.values();
        response.json(moorings);
    })

    server.post('/api/moorings', async(request, response) =>{
        try{  
            let id = uuidv4();
            let m = {id,...request.body};  
            await storage.setItem(`mooring-${id}`,m);
            response.json({data:m,status:200});
        }
        catch(error){
            response.json({status:500});
        }
      
      });

      server.put('/api/moorings', async(request, response) =>{
        try{  
            let id = request.params.id;
            let key = `mooring-${id}`; 
            let updatedM = await storage.updateItem(key.request.body);
            response.json(updatedM.content.value);
        }
        catch(error){
            response.json({status:500});
        }
      
      });

      server.delete('/api/moorings', async(request, response) =>{
        try{  
            let id = request.params.id;
            let key = `mooring-${id}`; 
            let updatedM= await storage.removeItem(key);
            response.json(updatedM.content.value);
        }
        catch(error){
            response.json({status:500});
        }
      
      });

    
const PORT = process.env.PORT || 4000;

server.listen(PORT, ()=>{
    console.log(`The server is up and running and listening on port: ${PORT}`);
})

    


})();






// server.put('/api/moorings/:id', (request, response) =>{
//     try{
     
  
//         let id = request.params.id;
        
  
       
        
//         response.json({data:m,status:200});
//     }
//     catch(error){
//         response.json({status:500});
//     }
  
//   });




