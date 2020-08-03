//First, we need to define a connection. 
//If your app uses only one database, you should use mongoose.connect. 
//If you need to create additional connections, use mongoose.createConnection

//1.Basic Usage
await mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
//mongoose.createConnection return value is a Connection.