import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orSchema = new Schema({
  tags: [],
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  type: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Tutorship', orSchema);
