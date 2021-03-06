/*
    Copyright 2019 SER401 Project 14 Team - All Rights Reserved

    Team Members: 
    RAYMOND ACEVEDO
    SHAWN WEINER
    CHRISTOPHER SALAZAR
    ROBERT PILLITTERI
    SHELTON LACY 

    Unauthorized copying of this file, via any medium is strictly prohibited
    Proprietary and confidential
*/

const express = require('express');
const router = express.Router();
const data = require('../database');
const HttpStatus = require('http-status-codes');

// implementing a basic getter to get all known students in the DB
router.get('/', function (req, res) {
    var result = {};
    data.Student.findAll()
        .then(function (students) {
            result['data'] = students;
            result['endpoint'] = "/students";
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying all students');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = "/students";
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
})

// implement a handler to handle the URIs generated from posting data
router.get('/:id', function(req, res) {
    var result = {};
    data.Student.findAll({
            where: {
                id: `${req.params.id}`
            }
        })
        .then( studentData => {
            result['data'] = studentData;
            result['endpoint'] = `/students/${req.params.id}`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/students/${req.params.id}`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
})


// get data store it, return a URI + id for stored data
router.post('/', function (req, res) {
    var result = {};
    console.log(`Post: `);
    console.log(req.body);
    data.Student.create({
        "data": JSON.stringify(req.body)
    }).then(newStudent => {
        console.log(`New student test data received: Entry ${newStudent.id} created.`);
        console.log(`Data added was: ${newStudent.data}.`);
        var uri = req.protocol + '://' + req.get('host') +
            req.baseUrl + req.path + newStudent.id;
        result['data'] = {
            'id': newStudent.id,
            'uri': uri
        };
        result['endpoint'] = "/students";
        result['responseCode'] = HttpStatus.CREATED;
        result['response'] = "Created"
        res.status(result.responseCode);
        res.header('Location', uri);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error creating new student record');
        console.log(err)
        result['data'] = {};
        result['endpoint'] = "/students";
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
})

// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use(function (req, res) {
    var result = {};
    result['data'] = {
        "endpoint": "/students"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});

// required to make routes work
module.exports = router;