const { Schema, model } = require("mongoose");

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		price: {
			type: Float32("0.00"),
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: [{
			type: String,
			required: true,
		}],

		quantity: {
			type: Int32("1"),
			required: true,
			unique: true,

		},
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

productSchema.virtual("imageLength").get(function () {
    return this.image.length;
});

const Product = model("Product", productSchema);

module.exports = Product;
