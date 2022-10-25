import joi from 'joi';
import connection from '../database/database.js';

const cakesSchema = joi.object({
    name: joi.string().min(0).required(),
    price: joi.number().positive().required(),
    image: joi.string().min(0).max(255).trim().required().pattern(new RegExp(
        /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i
      )),
    description: joi.string().min(0).required()
});

async function validateCake(req, res, next) {
    const { name, price, image, description } = req.body;

    const exintingCake = await connection.query(
        'SELECT * FROM cakes WHERE name = $1;', [name]
    );

    if(exintingCake.rows.length > 0) {
        return res.status(409).send("This cake already exists!");
    } 

    if(name.length === 0 || name.length < 2 || price.length === 0 || price <= 0 || image.length === 0 || typeof description !== 'string') {
        return res.status(400).send('check the inputs!');
    }

    const validation = cakesSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        const errors = validation.error.details.map(detail => detail.message);

        return res.status(422).send(errors);
    }

    next();
}

export { validateCake };