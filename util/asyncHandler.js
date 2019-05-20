module.exports = (cb) => {
    return async (req, res, next=null) => {
        try {
            await cb(req, res, next)
        }
        catch(err) {
            next(err)
        }
    }
}