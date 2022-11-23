const bendb = require("./Databasem/app.js");
const db = new bendb({
    path: `./databasee.json`,
    seperator: ".",
    spaces: 10
});
db.set("sen","bnen3")
//db.add("money","1000")
let a = db.get("benn")
console.log(a)
if(a === null){
    console.log("sinir")
}