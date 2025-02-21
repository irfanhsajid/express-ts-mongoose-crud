// getting-started.js
const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
