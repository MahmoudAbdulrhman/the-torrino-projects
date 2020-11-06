// import all models
const Question= require('./Question');
const User = require('./User');
const Answer = require('./Answer');
const Rating = require('./Rating');

// ==== USER ASSOCIATIONS ==== //
User.hasMany(Question, {
    foreignKey: 'user_id'
});

User.belongsToMany(Question, {
    through: Rating,
    as: 'rated_questions',
    foreignKey: 'user_id'
});

User.hasMany(Rating, {
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

Answer.hasMany(Rating, {
    foreignKey: 'answer_id'
});

Answer.belongsToMany(User, {
    through: Rating,
    as: 'rated_answer',
    foreignKey: 'answer_id'
});

// ==== RATING ASSOCIATIONS ==== // 
Rating.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Rating.belongsTo(Answer, {
    foreignKey: 'answer_id'
});
  

module.exports = { User, Answer, Question, Rating };