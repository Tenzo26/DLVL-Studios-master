const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const CollectionImageSchema = new mongoose.Schema(
	{
		_collection: {
            type: ObjectId,
            ref: "Collection",
            unique: true
        },

        photo: {
            data: Buffer,
            contentType: String
        }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("CollectionImage", CollectionImageSchema);