import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const announcementItem = new Schema({
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('AnnouncementItem', announcementItem);
