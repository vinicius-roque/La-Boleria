import joi from 'joi';

const clientsSchema = joi.object({
    name: joi.string().min(1).required(),
    address: joi.string().min(1).required(),
    phone: joi.string().min(10).max(11).pattern(/^[0-9]+$/).required()
});

async function validateClient(req, res, next) {
    const validation = clientsSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
      const errors = validation.error.details.map(detail => detail.message);

      return res.status(400).send(errors)
    }

    next();
}

export { validateClient };