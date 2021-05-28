const { errorHandler } = require('../helpers/dbErrorHandler');
const Collection = require('../models/collection');
const Product = require('../models/product');
const CollectionImage = require('../models/collection_image')
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.collectionById = (req, res, next, id) => {
    Collection.findById(id)
        .exec((err,collection) => {
        if (err || !collection) {
            return res.status(400).json({
                error: 'Collection not found'
            });
        }
        req.collection = collection;
        next();
    });
};

exports.photo = (req, res) => {
    CollectionImage.findOne({_collection: req.collection._id})
        .exec((error, collection) => {
            if (error || !collection) {
                return res.status(400).json({
                    error: 'Collection not found'
                });
            }

            if (collection && collection.photo) {
                res.set("Content-Type", collection.photo.contentType);
                return res.send(collection.photo.data);
            }

            else {
                return res.status(400).json({
                    error: 'Image not found'
                });
            }

        })
};

exports.read = (req, res) => {
    return res.json(req.collection);
}

exports.update = (req, res) => {

    const collection = req.collection
    collection.name = req.body.name;
    collection.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    });
    
}

exports.remove = (req, res) => {
    const collection = req.collection
    collection.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        console.log(data)
        CollectionImage.findOne({_collection: data._id})
            .exec((err, image) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }

                image.remove((err, data) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        })
                    }
                })
            })
        res.json({
            message: 'Collection deleted'
        });
    });
}

exports.update = (req, res) => {
    const collection = req.collection
    collection.name = req.body.name;
    collection.description = req.body.description;
    collection.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    });
}

exports.list = (req, res) => {
    Collection.find()
        .exec((err,data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    });
}



exports.create = (req, res) => {
    const collection = new Collection(req.body);
        collection.save((err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            console.log("Collection Created")
            res.json({data});
        });
    };
    /*
    const collection = new Collection(req.body);
    collection.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({data});
    });
    */

exports.collectionImage = (req, res) => {
    let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: "Image could not be uploaded",
			});
		}
		let collection_image = new CollectionImage(fields);
		if (files.photo) {
			if (files.photo.size > 5000000
				) {
				return res.status(400).json({
					error: "Image should be less than 5MB in size",
				});
			}
			collection_image.photo.data = fs.readFileSync(files.photo.path);
			collection_image.photo.contentType = files.photo.type;
            collection_image._collection = req.collection._id
		}

		collection_image.save((err, result) => {
			if (err) {
				return res.status(400).json({
					error: "Collection image  cannot be saved",
				});
			}
			res.json(result);
		});
	});
};

exports.listRelated = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 6;

	Product.find({ _id: { $ne: req.product }, _collection: req.collection })
		.limit(limit)
        .select("-photo_1")
        .select("-photo_2")
        .select("-photo_3")
		.populate("category", "_ id name")
		.populate("_collection", "_ id name")
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error: "Products not found",
				});
			}

			res.json(products);
		});
};

exports.collectionImageUpdate = (req, res) => {
    CollectionImage.findOne({_collection: req.collection._id})
        .exec((err, image) => {
            if (err) {
                return res.status(400).json({
                    error: "Collection not found"
                })
            }
            let form = new formidable.IncomingForm();
            form.keepExtensions = true;
            form.parse(req, (err, fields, files) => {
                if (err) {
                    return res.status(400).json({
                        error: "Image could not be uploaded",
                    });
                }

                if (files.photo) {
                    if (files.photo.size > 5000000
                        ) {
                        return res.status(400).json({
                            error: "Image should be less than 5MB in size",
                        });
                    }
                    image.photo.data = fs.readFileSync(files.photo.path);
                    image.photo.contentType = files.photo.type;
                }

                image.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: "Collection image cannot be saved",
                        });
                    }
                    res.json(result);
                });
            });
        });
}
