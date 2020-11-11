const index = (req, res, db) => {
  const { email } = req.body;
  // console.log('myproduct', email);
  db.select('*')
    .from('product')
    .where('email', '=', email)
    .orderBy('id')
    .then((data) => {
      // console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => console.log(err));
};

module.exports = index;
