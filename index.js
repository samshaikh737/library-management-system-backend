const chalk = require("chalk");
const dotenv = require("dotenv");
dotenv.config({ path: "src/config/config.env" });


// <--------------------------------------------- Database connect --------------------------------------------------->
require('./src/config/database').sync({ alter: true }).then(async () => {
  console.log(
    chalk.greenBright.bold(
      `Database connected`
    )
  );

  const { app } = require("./app");

  // <--------------------------------------------- Express App setup --------------------------------------------------->
  const PORT = process.env.PORT || 3000;
  const server = app.listen(PORT, async () => {
    console.log(
      chalk.yellowBright.bold(
        `Server is running on PORT: ${PORT}`
      )
    );
  });

  // // <---------------------------------------- Handle unhandled Promise rejections -------------------------------------->
  process.on("unhandledRejection", (err) => {
    console.log(chalk.bold.redBright(`Error: ${err.message}`));
    console.log(err);
    server.close(() => {
      console.log(
        chalk.bold.redBright(
          "Server closed due to unhandled promise rejection"
        )
      );
      process.exit(1);
    });
  });
}).catch(() => {
  console.log(
    chalk.bold.redBright(
      "Error: Datababse not connected!"
    )
  );
})

