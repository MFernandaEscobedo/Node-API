const jwt = require('jsonwebtoken');

function verifyTokenLogged(req, res, next) {
  if(!req.headers.Authorization) {
    return res.status(401).send('acceso no autorizado');
  }
  let token = req.headers.Authorization.split(' ')[1];
  let payload = jwt.verify(token, 'clavesecreta');
  if(!payload) {
    return res.status(401).send('acceso no autorizado');
  }
  req.userId = payload.subject;
  next();
}

module.exports = {
  verifyTokenLogged
}
