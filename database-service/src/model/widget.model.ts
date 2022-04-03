import mongoose from 'mongoose';

const WidgetSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      trim: true,
    },
    station: {
      type: String,
      required: true,
      trim: true,
    },
    feature: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { timestamps: true },
);

const Widget = mongoose.model('Widget', WidgetSchema);

export default Widget;