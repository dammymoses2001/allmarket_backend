const MyProfile = (req, res, db) => {
  const { email } = req.body;
  //console.log(email)
  db.select('*')
    .from('customer')
    .where('email', '=', email)
    // .orderBy('id')
    .then((data) => res.status(200).json(data))
    .catch((err) => console.log(err));
};

module.exports = MyProfile;
