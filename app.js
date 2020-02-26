const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
const app = express();
// express default config
app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
// import Models
const Article = require('./models/article');
const ArticleCategory = require('./models/articleCategory');
const Cateroty = require('./models/category');
// import Routes
const articleRoute = require('./routes/article');
const categoryRoute = require('./routes/category');
// set Routes
const articleControllers = require('./controllers/article');
app.get('/', articleControllers.index);
app.use('/article', articleRoute);
app.use('/category', categoryRoute);
// set error page
app.use('/', (req, res) => {
    res.render('error')
});
// Model relations
Article.belongsToMany(Cateroty, {through: ArticleCategory});
Cateroty.belongsToMany(Article, {through: ArticleCategory});

sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log(err));
