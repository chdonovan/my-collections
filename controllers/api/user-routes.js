const router = require('express').Router();
const { User, Item, Category } = require('../../models');

// GET Users /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get User by ID
router.get('/', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Item,
                attributes: ['item_name', 'item_description', 'inventory'],
                include: {
                    model: Category,
                    attributes: ['category_name']
                }
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            // req.session.save(() => {
            //     req.session.user_id = dbUserData.id;
            //     req.session.username = dbUserData.username;
            //     req.session.loggedIn = true;
            
            //     res.json(dbUserData);
            // });
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT Update Users by ID /api/users/1
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE Delete Users /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;