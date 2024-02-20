const app = require("./app.js")
require("dotenv").config();

const PORT=9000;


app.listen(PORT, () => {
    console.log(`Server is running at PORT : ${PORT}`);
})