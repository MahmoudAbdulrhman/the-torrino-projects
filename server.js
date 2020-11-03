const express = require('express');
const session = require("express-session");
const hbs = require('express-handlebars'); 
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

const handlebarsHelpers = require('./utils/helpers');
const exphbs = hbs({helpers: handlebarsHelpers});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const sess = {
  secret: 'Super secret secret',
  cookie: {
    //Session to expire in approx 10 min.  
    maxAge: 10 * 60 * 1000
  
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(routes);
app.engine('handlebars', exphbs);
app.set('view engine', 'handlebars');

// turn on connection to db and server
sequelize.sync({ force: true}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});