import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

const PORT = config.port;

async function main() {
  try {
    await mongoose.connect(config.mongodbUri as string);
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
