module.exports = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  // const bearerHeader = req.body.headers['Authorization'];
  //const bearerHeader = req.headers['authorization'];
  // console.log('headers Yahooo', req.headers);
  const bearer = bearerHeader.split(' ');

  const bearerToken = bearer[1];
  //   console.log(bearerToken);
  req.token = bearerToken;
  next();
};
