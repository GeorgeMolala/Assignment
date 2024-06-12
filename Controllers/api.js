var dbData = require('../Index.js');
var User = require('../Models/User.js');
var Task = require('../Models/Tasks.js');
var express = require('express');
var bodyParse = require('body-parser');
var cors = require ('cors');
var app = express();
var router = express.Router();

app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());
app.use(cors());
app.use('/api', router);



// router.use((express.request, express.response, next) => {
//     next();
// })

// API for getting User
router.route('/users').get((request,response) => {
try{
    dbData.getUsers().then(result => response.json(result[0]));
}
catch(err){
    response.status(500).json("Unsuccessful");
}
    
    
}); 

//Api for getting User by ID
router.route('/users/:id').get((request,response) => {

    try{
         dbData.getUsersById(request.params.id).then(result => {response.status(202).json(result[0])});
    }
    catch{
        response.status(500).json("Unsuccessful");
    }
   
 
});

//API for adding a user
router.route('/users').post((request,response) => {
  //  console.log("testing api ID");
    try{
        let user = {...request.body}
        dbData.getUsersAdd(user).then(result => {response.status(201).json("Successful");
    
        });
    }
    catch(err){
        response.status(500).json("Unsuccessful");
    }
  
     
    });


    //Api for Updating User
router.route('/users/:id').put((request,response) => {
        //  console.log("testing api ID");
      const userID = request.params.id;

      try{
         let user = {...request.body}
            dbData.getUsersUpdate(userID, user).then(result => {response.status(202).json("Successful");
          
            });
      }
   catch(err){
        response.status(500).json("Unsuccessful");
   }
           
          });


          //Tasks 

//API for adding a Task
router.route('/users/:id/tasks').post((request,response) => {
    //  console.log("testing api ID");
    let userID = request.params.id;

    try{
        let task = {...request.body}
          dbData.getTasksAdd(userID,task).then(result => {response.status(201).json("Successful");
      
          });
    }
    catch(err){
        response.status(500).json("Unsuccessful");
    }
    
       
      });


//API for Updating Task
router.route('/users/:userid/tasks/:taskid').put((request,response) => {
        //  console.log("testing api ID");
        let userID = request.params.userid;
        let taskID = request.params.taskid;
    
        try{
             let task = {...request.body}
              dbData.getTasksUpdate(userID,taskID, task).then(result => {response.status(202).json("Successful");
                
              });
        }

        catch(err){
            response.status(500).json("Unsuccessful");
        }
       
           
          });


//API For Delete Task
router.route('/users/:userid/tasks/:taskid').delete((request,response) => {
    //  console.log("testing api ID");
    let userID = request.params.userid;
    let taskID = request.params.taskid;

   try{
    dbData.getTasksDelete(userID,taskID).then(result => {response.status(202).json("Successful"); });
   }
      catch(err){
        response.status(500).json("Unsuccessful");
      }    
       
      });


//API for Get Task by ID
router.route('/users/:userid/tasks/:taskid').get((request,response) => {
    
    let taskID = request.params.taskid;
    let userID = request.params.userid;

    try{
         dbData.getTaskByID(taskID, userID).then(result => {response.status(200).json(result[0])  });
    }

    catch(err){
            response.status(500).json("Unsuccessful");
    }
       
     
    });



    //API for Getting all tasks for a single user
    router.route('/users/:userid/tasks').get((request,response) => {
    
           try{

            dbData.getTaskByUserID(request.params.userid).then(result => {
            
                response.status(200).json(result[0])
        
            });
            
           }
            catch(err){
                    response.status(500).json("Unsuccessful");
            }
         
        });

var port = process.env.PORT || 4000;
console.log(port);
app.listen(port);
console.log(port);