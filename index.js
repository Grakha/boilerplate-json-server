const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);


// Custom middleware to access POST methids.
// Can be customized for other HTTP method as well.
server.use((request, response, next) => {

  console.log("POST request listener");

  const body = request.body;

  console.log(body);

  if (request.method === "POST") {
    // If the method is a POST echo back the name from request body
    response.json({ message:"User created successfully", name: request.body.name});
  }else{
      //Not a post request. Let db.json handle it
      next();
  }
});

server.use(router);

const PORT = process.env.PORT || 3001; 

server.listen(PORT, () => {
  console.log("JSON Server is running", PORT);
});