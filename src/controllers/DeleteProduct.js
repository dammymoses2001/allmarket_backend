const DeleteProduct = (req, res, db) => {
  const { email } = req.body;
  const { id } = req.params;
  // console.log(id, email);
  db('product')
    .returning('*')
    .where('id', id)
    .andWhere('email', email)
    .del()
    .then((data) => {
      if (data[0].id) {
        return res.status(200).json({
          data: data[0].id,
          message: 'product deleted',
        });
      }
      return res.statu(400).json('Ooops something went wrong');
    })
    .catch((err) =>
      res.status(400).send('you dont have the permission to do this')
    );
};

module.exports = DeleteProduct;
