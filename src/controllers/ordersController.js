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

            requests.rows = requests.rows.filter(time => (time.createdAt.getDate() == dateFormat.getDate() &&
                time.createdAt.getMonth() == dateFormat.getMonth() &&     
                time.createdAt.getFullYear() == dateFormat.getFullYear()
            ));
        }

        if(!requests.rows.length) {
            return res.status(404).send([]);
        }

        const fullList = requests.rows.map(time => (
            {
                client: {
                    id: time.clientId,
                    name: time.clientName,
                    address: time.address,
                    phone: time.phone
                },
                cake: {
                    id: time.cakeId,
                    name: time.cakeName,
                    price: time.price,
                    description: time.description,
                    image: time.image
                },
                orderId: time.orderId,
                createdAt: `${date} ${time.createdAt.getHours()}:${time.createdAt.getMinutes()}`,
                quantity: time.quantity,
                totalPrice: time.totalPrice
            }
        ));

        return res.status(200).send(fullList);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function showOrdersById(req, res) {
    
}

async function showClientsOrders(req, res) {

}

export { createOrders, showOrders, showOrdersById, showClientsOrders };