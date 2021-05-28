const {Order, CartItem} = require('../models/order');
const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');
const sendEmail = require('../helpers/sendEmail');
const ErrorHandler = require("../helpers/errorHandler");
const catchAsyncErrors = require('../helpers/catchAsyncErrors');

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((error, order) => {
            if (error || !order) {
                return res.status(400).json({
                    err: errorHandler(error)
                });
            }
            req.order = order;
            next();
        })
};

exports.create = (req, res, next) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        req.body.order.orderId = data.id
        next()
    })
};

exports.listOrders = (req, res) => {
    Order.find()
        .populate('user',"_id name address")
        .sort('-created')
        .exec((error, orders) => {
            if (error) {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(orders);
        });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};

exports.getModePaymentValues = (req, res) => {
    res.json(Order.schema.path('mode_payment').enumValues);
};

exports.getModeShipmentValues = (req, res) => {
    res.json(Order.schema.path('mode_shipment').enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.update({_id: req.body.orderId}, 
        {$set: {status: req.body.status}}, 
        (error, order) => {
            if (error) {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(order);
        }
    );
};

exports.sendFeedbackEmail = catchAsyncErrors(async(req, res, next) => {
	const user = await User.findOne({_id: req.order.user});
	if(!user){
		return next(new ErrorHandler('User not found with this id', 404));
	}

	const feedbackToken = user.getFeedbackToken();

	await user.save((err, user) => {
		if (err) {
			return res.status(400).json({
				error: err.message,
			});
		}
	})

	const feedbackURL = `${process.env.FRONTEND_URL}/feedback/submit/${feedbackToken}`;
	
	const message = `Thank you for shopping in DLVL Studios. We would like to hear your feedback. Please access this link:\n\n${feedbackURL}\n\n`

	try{
		await sendEmail({
			email: user.email,
			subject: 'DLVL Studios Feedback',
			message
		})

		res.status(200).json({
			success: true,
			message:`Email sent to: ${user.email}`
		})
	} catch(error){
		user.feedbackToken = undefined;

		await user.save((err, user) => {
			if (err) {
				return res.status(400).json({
					error: err.message,
				});
			}
		})

		return next(new ErrorHandler(error.message, 500))
	}
    
});

exports.orderByEmail = (req, res) => {
        Order.findById(req.body.id)
        .populate('products.product', 'name price')
        .exec((error, order) => {
            if (error || !order) {
                return res.status(400).json({
                    error: "Something wrong happened"
                });
            }
            if (req.body.email != order.email) {
                return res.status(400).json({
                    error: "We can't find that order that matches our records"
                });
            }
            return res.json({
                    order
            });
        })
};