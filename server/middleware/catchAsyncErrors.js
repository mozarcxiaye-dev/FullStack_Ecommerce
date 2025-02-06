// module.exports = fn =>  (req, res, next) => {
//     fn(req, res, next).catch(next)
// }

module.exports = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
} 