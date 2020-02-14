
const users = {
  manager: {
    roles: ['USER', 'ADMIN'],
  },
  biker: {
    roles: ['USER', 'BIKER'],
  }
};

const bikers = {
  biker1: {
    id: 1,
    name: 'biker1'
  },
  biker2: {
    id: 2,
    name: 'biker2'
  },
  biker3: {
    id: 3,
    name: 'biker3'
  },
  biker4: {
    id: 4,
    name: 'biker4'
  },
  biker5: {
    id: 5,
    name: 'biker5'
  },
  biker5: {
    id: 5,
    name: 'biker5'
  },
  biker6: {
    id: 6,
    name: 'biker6'
  },
  biker7: {
    id: 7,
    name: 'biker7'
  },
  biker8: {
    id: 8,
    name: 'biker8'
  },
  biker9: {
    id: 9,
    name: 'biker9'
  },
  biker10: {
    id: 10,
    name: 'biker10'
  }
}

// sign in user
exports.signIn = async(req, res) => {
  const { username, password } = req.body;
  
  // Validate request
  if (!username || !password) {
    return res.status(400).send({
      message: "login form can not be empty"
    });
  }    

  // sign in user
  try {
    if (username.includes('admin')) {
      return res.send({ id: 1, name: 'admin', roles: users.manager.roles })
    }

    if (bikers[username]) {
      return res.send({ ...bikers[username], roles: users.biker.roles })
    }
    
    return res.status(400).send({
      message: "user not found"
    });
  }
  catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while sing in."
    });
  };
};
