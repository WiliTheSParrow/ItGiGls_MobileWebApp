//This specific port is indicated by the PORT environment variable. When your web server starts up on Heroku, make sure it’s listening on the port number specified by PORT:
app.listen(process.env.PORT);

//To avoid having to set the PORT environment variable when running on your local machine, you can replace the line above with the following:
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port);