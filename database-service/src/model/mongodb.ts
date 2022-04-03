import mongoose from 'mongoose';

export default function init() {
  mongoose.connect('mongodb://root:password@mongo-neo:27017/NeoDB?authSource=admin', {});

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    // we're connected!
    console.log('mongoose connected!');
  });
}
