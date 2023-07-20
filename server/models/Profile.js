const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const orderHistorySchema = new Schema(
    {
        date: {
            type: Date,
            default: Date.now,
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        price : {
            type: Number,
            required: true,
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


const cartSchema = new Schema(
    {productid: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    total:{
        type:Number,
        required:true,
    },},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

const profileSchema = new Schema(
	{
		firstname: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		lastname: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, "Must match an email address!"],
		},
		password: {
			type: String,
			required: true,
			minlength: 5,
		},
		cart: [cartSchema],
		orderHistory: [orderHistorySchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

// set up pre-save middleware to create password
profileSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

profileSchema.virtual("cartLength").get(function () {
  return this.cart.length;
});

profileSchema.virtual("cartTotal").get(function () {
  let total = 0;
  this.cart.forEach((item) => {
    total += item.total;
  });
  return total.toFixed(2);
});

profileSchema.virtual("orderHistoryLength").get(function () {
	  return this.orderHistory.length;
});

profileSchema.virtual("recentOrder").get(function () {
	  return this.orderHistory.slice(-1)[0];
});



const Profile = model("Profile", profileSchema);

module.exports = Profile;
