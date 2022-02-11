var Userdb = require('../model/model');

//CREATE AND SAVE A NEW USER:
exports.create = (req, res) => {
  //Validate:
  if (!req.body) {
    res.status(400).send({ message: 'Content cannot be empty' });
  }

  //Create:
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //Save user:
  user
    .save(user)
    .then((data) => {
      // res.send(data);
      res.redirect('/');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating a new user',
      });
    });
};

//RETRIEVE AND RETURN ALL USERS & RETRIEVE AND RETURN A SINGLE USER:
exports.find = (req, res) => {
  //Verify if SINGLE user id is present:
  if (req.query.id) {
    const id = req.query.id;

    //Return the single user:
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: `No user was found with the id: ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: `Error retrieving the user with id: ${id}` });
      });
  } else {
    //Return ALL users in the DB:
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            'Error occurred while retrieving the user information',
        });
      });
  }
};

//UPDATE THE NEWLY IDENTIFIED USER BY USER ID;
exports.update = (req, res) => {
  //Validate:
  if (!req.body) {
    return res.status(400).send({ message: 'Data to update cannot be empty' });
  }

  //Get ID:
  const id = req.params.id;

  //Update the user (if found):
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: ` Cannot update user with id: ${id}` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error updating user information' });
    });
};

//DELETE A USER WITH USER ID:
exports.delete = (req, res) => {
  //Get ID:
  const id = req.params.id;

  //Delete user (if found):
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: ` Cannot delete user with id: ${id}` });
      } else {
        res.send({ message: 'The user was deleted successfully' });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: `Could not delete user with id: ${id}` });
    });
};
