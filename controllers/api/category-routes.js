const router = require('express').Router();
const {User, Item, Category } = require('../../models');

// Get all Categories /api/category
router.get('/', (req, res) => {
    Category.findAll({
        attributes: ['id', 'category_name']
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

// GET Category by id
router.get('/:id', (req,res) => {
    Category.findOne({
        attributes: ['id', 'category_name'],
        where: {
            id: req.params.id
        },
    })
    .then(dbCategoryData => {
        if (!dbCategoryData) {
            res.status(404).json({ message: 'no category found with this id'});
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// CREATE a new Category
router.post('/', (req,res) => {
    Category.create({
        category_name: req.body.category_name
    })
    .then(dbCategoryData => {
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

//UPDATE a category
router.put('/:id', (req,res) => {
    Category.update(req.body, {
        where: {
            id: req.params.id
        }

    })
    .then(dbCategoryData => {
        if (!dbCategoryData[0]) {
        res.status(404).json({ message: 'no category with this id'});
        return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

    
});

// DELETE a category
router.delete('/:id', (req,res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCategoryData => {
        if (!dbCategoryData) {
        res.status(404).json({ message: 'no category with this id'});
        return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;