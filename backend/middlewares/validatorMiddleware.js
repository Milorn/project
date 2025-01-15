// A middleware to use the package "joi" to validate the body data
// to make sure for example that certain fields are present
// it's a function that takes a parameter (schema) which is the Joi rules
// to use to describe how the data should be. And it returns a middleware
module.exports = (schema) => async (req, res, next) => {
    try {
        // We check the body respects the schema
        // The second parameter is just for formatting
        await schema.validateAsync(req.body, {
            abortEarly: false,
            errors: {
                wrap: {
                    label: ''
                }
            }
        })
        next() // If everything is fine we call next
    } catch (e) {
        // If validation errors happened we get inside the catch
        res.status(422).json({errors: e.details.map(error => error.message)}) // Formatting the errors for readability
    }
}