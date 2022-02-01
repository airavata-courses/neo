import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    tokenId: {
      type: String,
      required: false,
    },
    photoURL: {
        type: String,
        required: false,
    }
  },
  { timestamps: true },
);

const User = mongoose.model('User', UserSchema);

export default User;
