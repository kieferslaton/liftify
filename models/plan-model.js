const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    startDate: {
        type: Date, 
        required: true
    },
    user: {
        type: String,
        required: true
    }, 
    days: {
        type: Array
    }
});

const Plan = mongoose.model('Plan', PlanSchema);

module.exports = Plan