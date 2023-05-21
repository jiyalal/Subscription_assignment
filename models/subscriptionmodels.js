const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const subscriptionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    perMonthPrice: {
      type: Number,
    },
    tenure: {
      type: String,
    },
    discription: {
      type: String,
    },
    userId: {
      required: true,
      type: ObjectId,
      ref: "user",
    },
    subScriptionStart: {
      type: Date,
    },
    expire: {
      type: Date,
    },

    deletedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subscription", subscriptionSchema);
