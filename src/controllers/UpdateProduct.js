const UpdateProduct = (req, res, db, jwt) => {
  // console.log(req.body);
  jwt.verify(req.token, process.env.SECRETKEY, (err, authData) => {
    if (err) {
      res.status(400).json(err.message);
    } else {
      const {
        id,
        email,
        productName,
        productPrice,
        userContact,
        imageurl,
      } = req.body;
      db('product')
        .where('id', id)
        .andWhere('email', email)
        .returning('*')
        .update({
          email,
          product_name: productName,
          product_price: productPrice,
          user_contact: userContact,
          imageurl: imageurl,
        })
        .then((data) => {
          if (data[0].id) {
            //console.log(data[0]);
            return res.status(201).json({
              data: data[0],
              message: 'Product Details Edited Check Changes in the Homepage',
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res
            .status(400)
            .json(
              "sorry you don't have the permission to perform this operation"
            );
        });
    }
  });
};

module.exports = UpdateProduct;
