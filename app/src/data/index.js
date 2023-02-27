const path = require("path");
const fs = require("fs");

module.exports = {
    productsData: JSON.parse(fs.readFileSync(path.join(__dirname, "/productsData.json"),"utf-8")),
    users: JSON.parse(fs.readFileSync(path.join(__dirname, "/users.json"),"utf-8")),
    writeUsersJson: (data) => {
        fs.writeFileSync(path.join(__dirname, "../data/users.json"), JSON.stringify(data), "utf-8")
    }
}