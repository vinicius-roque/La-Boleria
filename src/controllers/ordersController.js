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
}

async function showOrders(req, res) {
    const { date } = req.query;

    try {
        const requests = await connection.query(
            'SELECT orders.id AS "orderId", orders.quantity, orders."createdAt", orders."totalPrice", clients.id AS "clientId", clients.name AS "clientName", clients.address, clients.phone, cakes.id AS "cakeId", cakes.name AS "cakeName", cakes.price, cakes.description, cakes.image FROM orders JOIN clients ON orders."clientId" = clients.id JOIN cakes ON orders."cakeId" = cakes.id;'    
        );

        if(date) {
            const dateFormat = new Date(date);

            requests.rows = requests.rows.filter(time => time.createdAt.getDate() == dateFormat.getDate() &&
                time.createdAt.getMonth() == dateFormat.getMonth() &&     
                time.createdAt.getFullYear() == dateFormat.getFullYear()
            );
        }

        if(!requests.rows.length) {
            return res.status(404).send([]);
        }

        return res.status(200).send(requests.rows.map(value => (
            {
                client: {
                    id: value.clientId,
                    name: value.clientName,
                    address: value.address,
                    phone: value.phone
                },
                cake: {
                    id: value.cakeId,
                    name: value.cakeName,
                    price: value.price,
                    description: value.description,
                    image: value.image
                },
                orderId: value.orderId,
                createdAt: `${value.createdAt.getFullYear()}-${value.createdAt.getMonth()}-${value.createdAt.getDate()} ${value.createdAt.getHours()}:${value.createdAt.getMinutes()}`,
                quantity: value.quantity,
                totalPrice: value.totalPrice
            }
        )));
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function showOrdersById(req, res) {
    const { id } = req.params;

    const existingId = await connection.query(
        'SELECT id FROM orders WHERE id = $1;', [id]
    );

    if(!existingId) {
        return res.status(404).send("This order doesn't exists");
    }

    try {
        const { rows : orders } = await connection.query(
            `SELECT orders.id AS "orderId", orders."createdAt", orders.quantity, orders."totalPrice", clients.id AS "clientId", clients.name AS "clientName", clients.address, clients.phone, cakes.id AS "cakeId", cakes.name AS "cakeName", cakes.price, cakes.description, cakes.image FROM orders JOIN clients ON orders."clientId" = clients.id JOIN cakes ON orders."cakeId" = cakes.id WHERE orders.id=$1;`, [id]
        );

        return res.status(200).send(
            orders.map((value) => {
                return {
                    client: {
                        id: value.clientId,
                        name: value.clientName,
                        address: value.address,
                        phone: value.phone
                    },
                    cake: {
                        id: value.cakeId,
                        name: value.cakeName,
                        price: value.price,
                        description: value.description,
                        image: value.image
                    },
                    orderId: value.orderId,
                    createdAt: `${value.createdAt.getFullYear()}-${value.createdAt.getMonth()}-${value.createdAt.getDate()} ${value.createdAt.getHours()}:${value.createdAt.getMinutes()}`,
                    quantity: value.quantity,
                    totalPrice: value.totalPrice
                };
            })
        );
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export { createOrders, showOrders, showOrdersById };