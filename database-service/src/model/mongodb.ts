import mongoose from 'mongoose';

export default function init() {
  mongoose.connect('mongodb://root:password@localhost:27017/NeoDB', {});

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    // we're connected!
    console.log('mongoose connected!');
  });
}
