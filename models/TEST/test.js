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

class Test extends Model {}
Test.init({ 
	type: Sequelize.STRING
	time_taken : Sequelize.DATE(7)
	timestamp: Sequelize.DATE
}, {
	sequelize, 
	modelName: ‘test’ 
});

Test.hasMany(Question);
Test.belongTo(Student);
Test.belongsTo(Teacher);