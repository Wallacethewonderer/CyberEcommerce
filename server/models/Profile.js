const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { cartSchema } = require("./subScheme/cart");

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



const Profile = model("Profile", profileSchema);

module.exports = Profile;
