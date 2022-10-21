import connection from '../database/database.js';

async function createOrders(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body;

    try {
        await connection.query(
            'INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") VALUES ($1, $2, $3, $4);',
            [clientId, cakeId, quantity, totalPrice]
        );

        return res.sendStatus(201);
    } catch (error) {
        return res.status(404).send("This client or cake doesn't exists");
    }
    //remember to add createdAt value and correct  404 request
}

export { createOrders };