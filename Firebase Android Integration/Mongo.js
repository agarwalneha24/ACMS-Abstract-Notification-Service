const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

var logSchema = new mongoose.Schema({
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    tokenID: { type: String, required: true },
    payload: { type: Object, required: true },
});

var responses = mongoose.model('responses', logSchema);

function saveLogEntry(response) {
    var entry = new responses({
        status: response.status,
        tokenID: response.token,
        payload: response.payload
    });
    entry.save(function (err) {
        console.log(err);
    })
}
module.exports = { saveLogEntry };