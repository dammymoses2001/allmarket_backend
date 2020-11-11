const Register = (req, res, db, bcrypt) => {

  const { fullname, email, password, contact } = req.body;
  //console.log(fullname, email, password, contact);
  db.select('*')
    .from('login')
    .where('email', '=', email)
    .then(user => {
      // console.log(user.length)

      if (user.length > 0) {
        //console.log(user)
        res.status(400).json("User Exist")
      }
      else {
        //  const { fullname, email, password, contact } = req.body;
        //console.log(fullname,email, password, contact)

        var hash = bcrypt.hashSync(password);
        db.transaction((trx) => {
          trx
            .insert({
              email: email,
              hash: hash,
            })
            .into('login')
            .returning('email')
            .then((loginEmail) => {
              return trx('customer')
                .returning('*')
                .insert({
                  fullname: fullname,
                  email: loginEmail[0],
                  contact: contact,
                  datejoined: new Date().toString(),
                })
                .then((user) => {
                  res.status(201).json('Register Successful, You can now Sign');
                })
                .catch((err) => res.status(400).json('Oops, something went wrong...'));
            })
            .then(trx.commit)
            .catch(trx.rollback);
        }).catch((err) => res.status(401).json('Oops, something went wrong...'));
      }
    })
    .catch(error => {
      console.log(error)
    })



};

module.exports = Register;
