const AddProduct = (req, res, db, jwt) => {
  const { email, productName, productPrice, userContact, imageurl } = req.body;
  // console.log(req.token);
  jwt.verify(req.token, process.env.SECRETKEY, (err, authData) => {
    if (err) {
      //console.log(err.message);
      res.status(400).json(err.message);
    } else {
      db('product')
        .returning('*')
        .insert({
          email,
          product_name: productName,
          product_price: productPrice,
          user_contact: userContact,
          imageurl: imageurl,
          dateadded: new Date().toString(),
        })
        .then((data) =>
          res.status(201).json({
            message: 'product added',
            data: data[0],
          })
        )
        .catch((err) => {
          res.status(400).json(err);
          //console.log(err);
        });
    }
  });
};

module.exports = AddProduct;
