const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
	},

	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

categorySchema.virtual("productLength").get(function () {
	return this.products.length;
});

const Category = model("Category", categorySchema);

module.exports = Category;
