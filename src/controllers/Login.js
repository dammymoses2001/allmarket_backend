const Login = (req, res, db, bcrypt, jwt) => {
  const { email, password } = req.body;
  //console.log(email, password);
  try {
    db.select('*')
      .from('login')
      .where('email', '=', email)
      .then((userdetail) => {
        const validatepassword = bcrypt.compareSync(
          password,
          userdetail[0].hash
        );
        // console.log(validatepassword);
        if (validatepassword) {
          db.select('*')
            .from('customer')
            .where('email', '=', email)
            .then((userdetail) => {
              if (userdetail[0].email) {
                const user = userdetail[0];
                jwt.sign(
                  { user },
                  process.env.SECRETKEY,
                  { expiresIn: '1day' },
                  (err, token) => {
                    //console.log(err, token);
                    if (err) {
                      // console.log(err);
                      res.status(400).json('Oops something went wrong');
                    }
                    if (token) {
                      res.status(200).json({
                        token: token,
                        message: 'User Logged In',
                      });
                    } else {
                      // console.log('error');
                    }
                  }
                );
              }
            })
            .catch((err) => {
              res.status(400).json('Invalid Credentials1');
              console.log(err);
            });
        } else {
          console.log('err');
          res.status(400).json('Invalid Credentials2');
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json('Invalid Credentials');
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = Login;
