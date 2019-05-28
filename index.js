const express = require('express');
const app= express();
const yargs = require('yargs');
const b = require('./base');
const port = 3000;
let result ="";
console.log("Bienvenido a la academia de NodeJS! Disfrutalo.");
yargs.command({
    command:"enroll",
    describe:"Proceso de enrolamiento",
    builder:{
        courseId:{
            alias:"c",
            describe: "course identification",
            demandOption:true
        },
        name:{
            alias:"n",
            describe: "concerned username",
            demandOption:true
        },
        id:{
            alias:"i",
            describe: "user id",
            demandOption:true
        }
    },
    handler(argv) {
        if (argv){
            result = b.enrollment(argv);
            app.get("/enroll", (req,res)=>{
                res.send(result);
            });
        }else{
            console.log("Incompleted information.");
        }
    }
}).command({
    command:"list",
    describe:"Listado de cursos disponibles",
    handler() {
        console.log("Listando los cursos disponibles");
        result = b.getCourses();
        app.get("/list", (req,res)=>{
            console.log(result);
            res.send(result);
        });
    }
}).argv;

app.listen(port);