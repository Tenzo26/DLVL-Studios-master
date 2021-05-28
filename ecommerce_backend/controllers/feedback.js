const Feedback = require("../models/feedback");
const User = require("../models/user");
const { errorHandler } = require('../helpers/dbErrorHandler');
const ErrorHandler = require("../helpers/errorHandler");
const catchAsyncErrors = require('../helpers/catchAsyncErrors');
const sendToken = require("../helpers/jwtToken");
const crypto = require('crypto');

exports.updateById = async (req, res) => {
	const { id } = req.params;
	const { status, content } = req.body;
	console.log(req.body);

	const feedback = await Feedback.update(
		{ _id: id },
		{ $set: { status: status, content: content } }
	);

	if (feedback) {
		return res.status(200).json({
			error: false,
			message: "success",
		});
	}

	return res.status(400).json({
		error: true,
		message: "something went wrong",
	});
};

exports.userUpdateById = async (req, res) => {
	const { id } = req.params;
	const { content } = req.body;

	const feedback = await Feedback.update(
		{ _id: id },
		{ $set: { content: content } }
	);

	if (feedback) {
		return res.status(200).json({
			error: false,
			message: "success",
		});
	}

	return res.status(400).json({
		error: true,
		message: "something went wrong",
	});
};

exports.getPublishedFeedback = async (req, res) => {
	try {
		const feedback = await Feedback.find({})
			.where("status")
			.equals(true)
			.populate("user", "name");

		return res.status(200).json({
			result: feedback,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.pendingFeedback = async (req, res) => {
	try {
		const feedback = await Feedback.find({}).populate("user", "name");
		return res.status(200).json({
			result: feedback,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.createFeedback = catchAsyncErrors(async(req, res) => {
	// hash url token
		const fbackToken = crypto.createHash('sha256').update(req.params.feedbackToken).digest('hex')
	
		const user = await User.findOne({
			feedbackToken: fbackToken
		})
		const content = req.body.content
	
	if(user && content){
		const feedback = new Feedback({
			content: content,
			user: req.profile
		});
	
		await feedback.save();
		user.feedbackToken = undefined;
		console.log("Feedback Token claimed.")
		await user.save();
	
		sendToken(user, 200, res)
	}
	
	else {
		console.log("Failed to submit feedback.")
		return res.status(400).json({
			error: "Failed to submit feedback.",
		});
	}
	

	
})

/*

	if (!content) {
		return res.status(400).json({
			error: "Content is empty"
		});
	}

	const feedback = new Feedback({
		content: content,
		user: req.profile
	});
	*/

exports.updateFeedback = async (req, res) => {
	const { id } = req.params;
	await Feedback.update({ _id: id }, { $set: { status: true } });
};

exports.deleteFeedback = async (req, res) => {
	const { id } = req.params;
	await Feedback.findOneAndDelete({ _id: id });
};
