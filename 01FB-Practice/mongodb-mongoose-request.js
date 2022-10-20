const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const scheme = new Schema({author: String, title: String}, {versionKey: false});
mongoose.connect("mongodb://localhost:27017/bookmart", {
    useUnifiedTopology: true, useNewUrlParser: true
});
const MongModel = mongoose.model("users", scheme);

console.log("Results:")

let res = readAll();
res.then(r => console.log(r));

async function readAll() {
    let promis = new Promise((resolve, reject) => {
        let res = MongModel.find({}, function (err, docs) {
            mongoose.disconnect();
            if (err)
                reject(err);
            else
                resolve(docs);
        });
    });
    return promis;
}

function create(obj) {
    obj.save().then(function (res) {
        console.log("Об'єкт збережено:", res);
        mongoose.disconnect();
    })
        .catch(function (err) {
            console.log(err);
            mongoose.disconnect();
        });
}
