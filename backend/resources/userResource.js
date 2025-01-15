// A function that takes a user and formats its data for readability
module.exports = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
    }
}