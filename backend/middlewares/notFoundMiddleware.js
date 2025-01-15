// The middleware to use after all the routes to say that the route is not found
module.exports = (req, res) => {
    res.status(404).json({message: 'Not found'})
}