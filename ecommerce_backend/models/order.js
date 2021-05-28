const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
	{
		product: { type: ObjectId, ref: "Product" },
		name: String,
		price: Number,
		count: Number,
		size: { type: String }
	},
	{ timestamps: true }
);

const CartItem = mongoose.model("CartItem", CartItemSchema);

const OrderSchema = new mongoose.Schema(
	{
		first_name: { type: String, required: true },
		last_name: { type: String, required: true },
		contact_number: { type: Number, required: true },
		mode_payment: {
			type: String,
			enum: ["GCASH", "BDO", "BPI", "COD via Grab Pabili"],
			required: true
		},
		mode_shipment: {
			type: String,
			enum: ["Metro Manila: Grab", "Metro Manila: Lalamove", "Provicial: LBC"], 
			required: true
		},
		instagram: {
			type: String, 
			default: "Not Specified"
		},
		email: { type: String, required: true },
		products: [CartItemSchema],
		amount: { type: Number },
		address: { type: String, required: true },
		status: {
			type: String,
			default: "Processing",
			enum: ["Processing", "Paid", "Shipped", "Delivered", "Cancelled"]
		},
		updated: Date,
		user: { type: ObjectId, ref: "User" }
		
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem };
