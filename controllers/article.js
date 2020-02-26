const Article = require('../models/article');
const Caterogy = require('../models/category');
const articleCategory = require('../models/articleCategory');
// 
exports.index = (req, res) => {
    Article.findAll(
        {
            include: [{// Notice `include` takes an ARRAY
              model: Caterogy
            }]
        }
    )
    .then(articles => {
        return articles;
    })
    .then(articles => {        
        res.render('article/index', {
            articles: articles
        });
    })
    .catch(err => console.log(err))
    
};
// 
exports.getCreate = (req, res) => {
    Caterogy.findAll()
    .then(categories => {
        return categories;
    })
    .then( categories => {
        res.render('article/form/add',{
            categories: categories,
            update: false
        });
    } )
    .catch(err => console.log(err));
    
};
// 
exports.postCreate = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const categories = req.body.categories;
    
    Article.create({ 
        title: title,
        imageUrl: imageUrl
    })
    .then(article => {
        return article.addCategory(categories);
    })
    .then(result => {
        res.redirect('/article')
    })
    .catch(err => console.log());
};
// 
exports.read = (req, res) => {
    const id = req.params.artId;
    Article.findByPk(id, 
        {
            include: [{// Notice `include` takes an ARRAY
              model: Caterogy
            }]
        }
    )
        .then(article => {
            res.render('article/single', {
                article: article
            });
        })
        .catch(err => console.log(err))
};
// 
exports.getUpdate = (req, res) => {
    const id = req.params.artId;
    Article.findByPk(id, 
        {
            include: [{// Notice `include` takes an ARRAY
              model: Caterogy
            }]
        }
    )
        .then(article => {
            Caterogy.findAll()
            .then(categories => {
                return categories;
            })
            .then(categories => {
                res.render('article/form/add', {
                    article: article,
                    categories: categories,
                    update: true
                });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
};
// 
exports.postUpdate = (req, res) => {
    const id = req.body.artId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const categories = req.body.categories;
  
    Article.findByPk(id, 
        {
            include: [{// Notice `include` takes an ARRAY
              model: Caterogy
            }]
        }
    )
        .then(article => {
            article.title = title;
            article.imageUrl = imageUrl;
            return article.save();
        })        
        .then(article => {
            article.getCategories().then(articleCategories=>{
                for(category of articleCategories){
                    category.article_category.destroy();
                }
            });
            if(categories){
                return article.addCategory(categories);
            } 
            return article;            
        })
        .then(result => {
            res.redirect('/article');
        })
        .catch(err => console.log(err))
};

exports.delete = (req, res) => {
    const id = req.body.artId;
    Article.destroy({
        where: {
            id: id
        }
    })
        .then(result => {
            res.redirect('/article');
        })
        .catch(err => console.log(err));
}