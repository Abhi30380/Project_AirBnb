const mongoose = require('mongoose');

const { Schema } = mongoose;
const bookingSchema = new Schema({
    place: { type: Schema.Types.ObjectId, required: true, ref: 'Place' },
    user: { type: Schema.Types.ObjectId, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    price: Number,
})

module.exports = mongoose.model('Booking', bookingSchema);