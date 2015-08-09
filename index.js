// index.js loads .env config and the Babel hook. The application entry point is
// in lib/koral_client.js

require("dotenv").load();
require("babel/register");
require("./lib/koral_client");
