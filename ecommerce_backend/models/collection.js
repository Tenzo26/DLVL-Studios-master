const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, "Collection name is required."],
			maxlength: 32,
			unique: true,
		},
		
		description: {
            type: String,
            required: [true, 'Description is required.'],
            maxlength: 2000
        }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Collection", CollectionSchema);