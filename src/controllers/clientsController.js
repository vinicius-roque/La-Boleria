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

async function showClientsOrders(req, res) {
    const {id} = req.params;
    
    const existingId = await connection.query(
        'SELECT FROM clients WHERE id = $1;', [id]
    );

    if(existingId.rows.length === 0) {
        return res.status(404).send("This client doesn't exists!");
    }

    try {
        const orders = await connection.query(
            'SELECT orders.id AS "orderId", orders.quantity, orders."createdAt", orders."totalPrice", cakes.name AS "cakeName" FROM orders JOIN cakes ON cakes.id = orders."cakeId" WHERE orders."clientId" = $1 ORDER BY orders."createdAt" DESC;', [id]
        );

        return res.status(200).send(orders.rows.map(value => (
            {
                orderId: value.orderId,
                quantity: value.quantity,
                createdAt: `${value.createdAt.getFullYear()}-${value.createdAt.getMonth()}-${value.createdAt.getDate()} ${value.createdAt.getHours()}:${value.createdAt.getMinutes()}`,
                totalPrice: value.totalPrice,
                cakeName: value.cakeName
            }
        )));
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export { createClient, showClientsOrders };