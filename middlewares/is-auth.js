const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    // get the header Authorization from the incoming request (front)
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return res.status(401).format({
            'json/application': () => res.send('Not autheticated.')
        })
    }

    const token = authHeader.split(' ')[1] // authHeader => ['Bearer', 'token_ekdjfdnfndfknf']
    let decodedToken

    try {
        decodedToken = jwt.verify(token, 'supersecretsecret')
    } catch (error) {
        error.statusCode = 500;
        throw error
    }

    if (!decodedToken) {
        return res.status(401).format({
            'json/application': () => res.send('Not authenticated')
        })
    }

    // you can set info to  all reqs using the decoded token
    req.userId = decodedToken.user_id
    next()

}
