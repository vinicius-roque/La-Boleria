import joi from 'joi';

const ordersSchema = joi.object({
    clientId: joi.number().integer().required(),
    cakeId: joi.number().integer().required(),
    quantity: joi.number().integer().required(),
    totalPrice: joi.number().required(),
});

async function validateOrders(req, res, next) {
    const { quantity } = req.body;

    if(quantity <= 0 || quantity >= 5) {
        return res.status(400).send("It's not possible to order less than one or more than four cakes");
    }

    const validation = ordersSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
      const errors = validation.error.details.map(detail => detail.message);

      return res.status(400).send(errors);
    }

    next();
}

export { validateOrders };