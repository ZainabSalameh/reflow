const express              = require('express');
const cors                 = require('cors');
const circuit              = require('reflow-circuit');
const board                = require('reflow-board');
const grid                 = require('reflow-grid');
const createCassandraConnection  = require('reflow-cassandra-connection');

process.env.PORT="3000";
process.env.CASSANDRA_KEYSPACE="reflow";
process.env.CASSANDRA_CONTACT_POINTS="localhost";
process.env.CASSANDRA_USERNAME="cassandra";
process.env.CASSANDRA_PASSWORD="password123";

(async function() {
  try {
    const app = express();
    app.disable('x-powered-by');
    app.enable('trust proxy');
    app.use(cors());
    // const cassandraConnection = await createCassandraConnection({
    //   keyspace: process.env.CASSANDRA_KEYSPACE,
    //   contactPoints: process.env.CASSANDRA_CONTACT_POINTS.split(','),
    //   replication: "{ 'class': 'SimpleStrategy', 'replication_factor' : 1 }",
    //   username: process.env.CASSANDRA_USERNAME,
    //   password: process.env.CASSANDRA_PASSWORD,
    // });

    // app.use(circuit({
    //   connection: cassandraConnection,
    // }));

    app.use(board());
    app.use(grid());

    app.all('*', function(req, res) {
      console.log('Invalid route recieved: ', req.url);
      res.status(404).send('404. Invalid Route.');
    });

    app.listen(process.env.PORT, function() {
      console.log(`Server Running on port ${process.env.PORT}`)
    });
  } catch(err) {
    throw err;
  }
})()
