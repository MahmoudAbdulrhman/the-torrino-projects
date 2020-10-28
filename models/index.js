// import all models
const Question = require('./Question');
const User = require('./User');
const Answer = require('./Answer');

// ==== USER ASSOCIATIONS ==== //
User.hasMany(Question, {
  foreignKey: 'user_id'
});

User.hasMany(Answer, {
    foreignKey: 'user_id'
  });

// ==== QUESTION ASSOCIATIONS ==== //
Question.belongsTo(User, {
  foreignKey: 'user_id'
});

Question.hasMany(Answer, {
    foreignKey: 'question_id'
  });

// ==== ANSWER ASSOCIATIONS ==== //  
Answer.belongsTo(User, {
  foreignKey: 'user_id'
});

Answer.belongsTo(Question, {
  foreignKey: 'question_id'
});


module.exports = { User, Question, Answer };