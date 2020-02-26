const Category = require('../models/category');

// 
exports.index = (req, res) => {
    Category.findAll()
    .then(categories => {
        return categories;
    })
    .then(categories => {
        res.render('category/index',{
            categories: categories
        });
    })
    .catch(err => console.log(err))
    
};
// 
exports.getCreate = (req, res) => {
    res.render('category/form/add', {
        update: false
    });
};
// 
exports.postCreate = (req, res) => {
    const title = req.body.title;
    
    Category.create({ 
        title: title,
    })
    .then(result => {
        res.redirect('/category');
    })
    .catch(err => console.log(err));    
};
// 
exports.getUpdate = (req, res) => {
    const id = req.params.catId;
    Category.findByPk(id)
        .then(category => {            
            res.render('category/form/add', {
                update: true,
                category: category
            });
        })
        .catch(err => console.log(err));
};
// 
exports.postUpdate = (req, res) => {
    const title = req.body.title;    
    const id = req.body.catId;
    Category.findByPk(id)
        .then(category => {      
            category.title = title;
            return category.save();
        })
        .then(result => {
            res.redirect('/category');
        })
        .catch(err => console.log(err));
}
// 
exports.delete = (req, res) => {      
    const id = req.body.catId;
    Category.destroy({
        where: {
            id: id
        }
    })
        .then(result => {
            res.redirect('/category');
        })
        .catch(err => console.log(err));
}