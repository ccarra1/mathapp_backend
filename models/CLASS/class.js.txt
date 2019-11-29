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