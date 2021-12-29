import validator from 'validator';
export default function validationMiddleware(req, res, next) {
    	if (validator.isEmail(req.body.email)) return next();
    	res.status(400).send({message: `Email inválido`});
};