const mongoose = require('mongoose');


async function main() {
  await mongoose.connect('mongodb://localhost:27017/todos-app');
  console.log("connected to database successfully");
}

main().catch(err => {
    console.log(err)
    process.exit(1);

});

// try {
//   await main();
// } catch (error) {
//   console.log(err)
//     process.exit(1);
// }