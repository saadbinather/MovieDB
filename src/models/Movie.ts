import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    directorId: {
      type: String,
      required: true,
    },
    genreId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
    posterUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Movie || mongoose.model("Movie", movieSchema);
