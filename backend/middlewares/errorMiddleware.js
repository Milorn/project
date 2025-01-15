// This is a special express middlware that takes 4 parameters, express will call
// this middleware if a synchronous error happens
module.exports = (req, res, next, err) => {
    console.log(err)
    res.status(500).json({message: 'Server error'})
}