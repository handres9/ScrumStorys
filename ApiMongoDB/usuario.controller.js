const Usuario = require('./usuario.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Usuario content can not be empty"
        });
    }

    // Create a User
    const usuario = new Usuario({
        Nombre: req.body.nombre, 
        Correo: req.body.correo,
        Password: req.body.pass
    });

    // Save Product in the database
    usuario.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the user."
        });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Usuario.find()
    .then(usuario => {
        res.send(usuario);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving users."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Usuario.findById(req.params.productId)
    .then(usuario => {
        if(!usuario) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });            
        }
        res.send(usuario);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving product with id " + req.params.productId
        });
    });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find and update product with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        title: req.body.title || "No product title", 
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    }, {new: true})
    .then(usuario => {
        if(!usuario) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(usuario);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.productId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(usuario => {
        if(!usuario) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
};