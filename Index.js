const express = require('express'), app = express()
const { Date } = require('msnodesqlv8');
const SqlConfig = require('./DbConfig.js');
//const Users = require('./Models/User.js')

const sql = require("mssql/msnodesqlv8");

//Get All Users
async function getUsers () {

    try{

    let Pool = await sql.connect(SqlConfig)
    const test = await Pool.query("SELECT * FROM Users_tbl")    
   
     return test.recordsets;
    }
      catch(err){
             console.log("Connection Error")
      }
};


//Get User By ID
async function getUsersById (UserId) {

   try{

    let Pool = await sql.connect(SqlConfig)
    
   
    const test = await Pool.request().input('input_parameter', sql.Int, UserId)
    .query('SELECT * FROM Users_tbl WHERE UserId = @input_parameter');
   
     return test.recordsets;
    }
      catch(err){
             console.log("Connection Error");
     }
};


//Add User
async function getUsersAdd (user) {

    try{

    let Pool = await sql.connect(SqlConfig)

    console.log(user);
    const test = await Pool.request()
    .input('input_parameterUserName', sql.NVarChar, user.Username)
    .input('input_parameterFirst_Name', sql.NVarChar, user.First_name)
    .input('input_parameterLast_name', sql.NVarChar, user.Last_name)
    .query('INSERT INTO Users_tbl(Username, First_name, Last_name) VALUES(@input_parameterUserName, @input_parameterFirst_Name, @input_parameterLast_name )');   
   
     return test.recordsets;
    }
     catch(err){
            console.log("Connection Error")
     }
};



//Update User
async function getUsersUpdate (userID, user) {

    try{

    let Pool = await sql.connect(SqlConfig)

   
    const test = await Pool.request()
    .input('input_parameterUserName', sql.NVarChar, user.Username)
    .input('input_parameterFirst_Name', sql.NVarChar, user.First_name)
    .input('input_parameterLast_name', sql.NVarChar, user.Last_name)
    .input('input_parameter_userid', sql.Int, userID)
    .query('UPDATE Users_tbl SET Username = @input_parameterUserName , First_name = @input_parameterFirst_Name, Last_name = @input_parameterLast_name WHERE UserId = @input_parameter_userid');   
   
     return test.recordsets;
    }
     catch(err){
            console.log("Connection Error")
     }
};

//Tasks

//Adding Task
async function getTasksAdd (userID, Task) {

    try{

    let Pool = await sql.connect(SqlConfig)
   // var date = new Date(); 

    console.log("Testing Task Add");
   
    console.log("Testing Task Add");
    const test = await Pool.request()
    .input('input_parameterName', sql.NVarChar, Task.name)
    .input('input_parameterDescription', sql.NVarChar, Task.Description)
    .input('input_parameterUserId', sql.Int, userID)
    .input('input_parameterDate', sql.DateTime, Task.Date_time)
    .query('INSERT INTO Task_tbl(name, Description, UserId, Date_time) VALUES(@input_parameterName, @input_parameterDescription, @input_parameterUserId, @input_parameterDate  )');   
   
     return test.recordsets;
    }
     catch(err){

        var status = "Connection Error"
            return status;
     }
};

//Update Tasks
async function getTasksUpdate (userID,taskID, Task) {

    try{

    let Pool = await sql.connect(SqlConfig)

    const test = await Pool.request()
    .input('input_parameterName', sql.NVarChar, Task.name)
    .input('input_parameterDescription', sql.NVarChar, Task.Description)
    .input('input_parameterUserId', sql.Int, userID)
    .input('input_parameterDate', sql.DateTime, Task.Date_time)
    .input('input_parameterTaskID', sql.Int, taskID)
    .query('UPDATE Task_tbl SET name = @input_parameterName , Description = @input_parameterDescription, UserId = @input_parameterUserId, Date_time= @input_parameterDate WHERE TaskId = @input_parameterTaskID AND UserId = @input_parameterUserId');   
   

     return test.recordsets;
    
    }
     catch(err){
            console.log("Connection Error")
     }
};


//Delete Task
async function getTasksDelete (userID,taskID) {

    try{

    let Pool = await sql.connect(SqlConfig)

    
    const test = await Pool.request()
    .input('input_parameterUserId', sql.Int, userID)
    .input('input_parameterTaskID', sql.Int, taskID)
    .query('DELETE FROM Task_tbl WHERE TaskId = @input_parameterTaskID AND UserId = @input_parameterUserId');   
   

     return test.recordsets;
    
    }
     catch(err){
            console.log("Connection Error")
     }
};

//Get Task By ID
async function getTaskByID (taskID, userID) {

    try{
 
     let Pool = await sql.connect(SqlConfig)
   
    
     const test = await Pool.request()
     .input('input_parametertaskID', sql.Int, taskID)
     .input('input_parameteruserID', sql.Int, userID)
     .query('SELECT * FROM Task_tbl WHERE UserId = @input_parameteruserID AND TaskId = @input_parametertaskID');
    
      return test.recordsets;
     }
       catch(err){
              console.log("Connection Error");
      }
 };


 //Get Tasks for a single user
 async function getTaskByUserID (userid) {

     message = 'content found';
    try{
 
     let Pool = await sql.connect(SqlConfig)
   
    
     const test = await Pool.request()
     .input('input_parameteruserID', sql.Int, userid)
     .query('SELECT * FROM Task_tbl WHERE UserId = @input_parameteruserID');
    
     
         return test.recordsets;
     
     
     }
      catch(err){

              console.log("Connection Error");
              
      }
 };


module.exports = {
    getUsers : getUsers,
    getUsersById: getUsersById,
    getUsersAdd: getUsersAdd,
    getUsersUpdate: getUsersUpdate,
    getTasksAdd: getTasksAdd,
    getTasksUpdate: getTasksUpdate,
    getTasksDelete: getTasksDelete,
    getTaskByID : getTaskByID,
    getTaskByUserID: getTaskByUserID
}

//app.listen(4100, ()=> get());