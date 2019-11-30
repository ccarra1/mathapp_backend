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

const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('questions', {

        // id: primary ID for the question
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        // operand1_id: id for the non LEVEL associated operand
        operand1_id: {
        	type: Sequelize.INTEGER,
        	references: {
        		model: 'operand',
        		key: 'id',
        	}
        }
        
        // level_id: id for the LEVEL (contains operation and second operand
        level_id: {
        	type: Sequelize.INTEGER,
        	references: {
        		model: 'level',
        		key: 'id',
        	}
        }

        // implement a data field to store data for testing get/post
        data: Sequelize.TEXT

    })
}