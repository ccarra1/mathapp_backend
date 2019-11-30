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


router.get('/:id', function(req,res) {

    console.log("get question by ID");
    console.log(req.params.id);

    if ((typeof(req.params.id) === undefined) || // shouldn't happen, but if id is undefined
        (req.params.id == null) || // id is null, again shouldn't happen
        (req.params.id == "") || // id is empty string
        (parseInt(req.params.id, 10) === NaN)) // id is not a number
        {
            result['data'] = {};
            result['endpoint'] = "/questions/:id";
            result['responseCode'] = HttpStatus.BAD_REQUEST;
            result['response'] = "Invalid parameter for request.  ID must be an integer";
            res.status(HttpStatus.BAD_REQUEST);
            res.json(result);
            return;
        }

        // refactored search to separate function for readability
        var id = parseInt(req.params.id, 10)
        getQuestionByID(id)
            .then((result) =>{
                console.log(result);
                res.json(result);
                return;
            })
        // build our response packet
        //res.status(result.responseCode);
});

//get list of all questions
/**
 * @api (get) /questions
 * 
 * @apiName Get All Questions
 * 
 * @apiGroup Questions
 * 
 * @apiSuccess (JSON) data Current list of all known questions
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/', function(req,res) {
    var result = {};
    data.Questions.findAll()
        .then(function (questions) {
            result['data'] = questions;
            result['endpoint'] = "/questions";
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            questions.forEach(element => {
                console.log(element);
            });
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function(err){
            console.log('Error querying all questions');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = "/questions";
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});


// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use(function(req,res) {
    var result = {};
    result['data'] = {
        "endpoint" : "/questions"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});

async function getQuestionByID(id) {
    // result object
    var result = {};

    // execute query
    data.Questions.findByPk(id)
        .then(function(questions) {
            if (!questions) {
                // not found, send proper response
                result['responseCode'] = HttpStatus.NO_CONTENT;
                result['response'] = `ID: ${id} does not match a known question.`
                result['data'] = {};
                return result;
            }

            // it was found, build response
            result['data'] = {
                "Questions": Questions.toJSON()
            }
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Request successful, "
            return result;
        })

        // we had an error?
        .catch(function (err) {
            console.log(err)
            result['data'] = {};
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            return result;
        })
}

// required to make routes work
module.exports = router;