import connection from '../database/database.js';

async function createClient(req, res) {
    const { name, address, phone } = req.body;

    try {
        await connection.query(
            'INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);',
            [name, address, phone]
        );

        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export { createClient };