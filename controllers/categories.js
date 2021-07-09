const mongoose = require('mongoose');

const { Category } = require('../models');


categoryTree = (parentId = "", docs) => {
    const category = docs.filter(doc => parentId == doc.parent);


    var categories = [];
    for (var cat of category) {
        categories.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: categoryTree(cat._id, docs)
        })
    }

    return categories;

}


module.exports = {
    getAllCategories: (req, res, next) => {

        Category.find({})
            .exec()
            .then(docs => {

                const categories = categoryTree('', docs);

                res.status(201).json({
                    message: categories
                });
            })
            .catch(er => {
                res.status(500).json({
                    error: er
                })
            });

    },

    createCategories: (req, res, next) => {

        const category = new Category({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            slug: req.body.slug,
            parent: req.body.parent,
            createdAt: new Date(),
            createdBy: req.body.createdBy
        });

        category.save()
            .then(doc => {
                res.status(201).json({
                    message: doc
                });
            })
            .catch(er => {
                res.status(500).json({
                    error: er
                })
            });

    }
}