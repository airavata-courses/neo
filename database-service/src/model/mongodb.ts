import mongoose from 'mongoose';

export default function init() {
  mongoose.connect(process.env.MONGO_URL, {});

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    // we're connected!
    console.log('mongoose connected!');
  });
}
