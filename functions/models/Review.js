import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
    },
    starRating: {
      type: Number,
    },
    gps: {
      type: [String],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

ReviewSchema.pre("find", function () {
  this.where({ deleted: false });
});

ReviewSchema.pre("findOne", function () {
  this.where({ deleted: false });
});

export default mongoose.model("Review", ReviewSchema);
