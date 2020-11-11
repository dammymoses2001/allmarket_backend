const MyProduct = (req, res, db) => {
  db.select('*')
    .from('product')
    // .where('email', '=', email)
    .orderBy('id')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json('Ooops something went wrong');
    });
};

module.exports = MyProduct;
