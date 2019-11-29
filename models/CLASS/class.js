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

class Class extends Model {}
Class.init({
  name: Sequelize.STRING,
  grade: Sequelize.INTEGER
}, {
  sequelize,
  modelName: 'class'
});

Class.hasOne(Teacher);
Class.belongsTo(Teacher);
