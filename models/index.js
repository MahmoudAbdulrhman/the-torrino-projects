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

Question.belongsToMany(User, {
    through: Rating,
    as: 'rated_questions',
    foreignKey: 'question_id'
});

Question.hasMany(Rating, {
    foreignKey: 'question_id'
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

// ==== RATING ASSOCIATIONS ==== // 
Rating.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Rating.belongsTo(Question, {
    foreignKey: 'question_id'
});
  

module.exports = { User, Answer, Question, Rating };