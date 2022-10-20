const fs = require('fs');

let characters_arr = [{
    name: "Ivanov",
    age: 23,
    birth_place: "Kyiv"
},
    {
        name: "Petro",
        age: 21,
        birth_place: "Kharkiv"
    }];
const characters_data = JSON.stringify(characters_arr);
fs.writeFileSync('characters.json', characters_data);
let characters_file_in = fs.readFileSync('characters.json');
const characters = JSON.parse(characters_file_in);
for (let character_properties of characters) {
    for (let prop in character_properties)
        console.log(prop, ":", character_properties[prop]);
    console.log("-------------");
}



