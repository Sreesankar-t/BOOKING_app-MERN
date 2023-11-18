import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title:String,
    summary:String,
    content:String,
    photos: {
        type: [String]
      },
 
  }, {
    timestamps: true,
  });

  const Blog = mongoose.model('Blog',PostSchema);

export default Blog;