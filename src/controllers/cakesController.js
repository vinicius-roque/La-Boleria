import connection from '../database/database.js';

async function createCake(req, res) {
     const { name, price, image, description } = req.body;

     try {
          await connection.query(
               'INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4);',
               [name, price, image, description]
          ); 

          res.sendStatus(201);
          return
     } catch (error) {
          res.status(500).send(error.message);
          return
     }
}

export { createCake };