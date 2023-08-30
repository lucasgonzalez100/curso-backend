import express from 'express';

const { response } = require('express');
const http = require ('http');
const server = http.createServer ((request, response)=>{
    response.end ("este es mi primer hola mundo de backend" )
})

server.listen (8080,()=>{
    console.log ("listening on port 8080")
});