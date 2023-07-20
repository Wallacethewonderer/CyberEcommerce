const { Schema, model } = require("mongoose");
const imageSchema = require("./subScheme/image");

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
		image: [imageSchema],

		quantity: {
			type: Int32("1"),
			required: true,
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
