const dotenv = require("dotenv");
dotenv.config({ path: 'src/config/config.env' });



const sequelize = require('../config/database');
require("../models")
sequelize.sync({ force: true }).catch(() => null);

console.log("Migration done successfully")