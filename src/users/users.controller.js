const userService = require("./users.service");
const authService = require("../auth/auth.service");

const createUserController = async (req, res) => {
  const { username, name, email, password, avatar } = req.body;

  if (!username || !name || !email || !password || !avatar) {
    return res.status(400).send({
      message: "invalid crendencials, try again!",
    });
  }

  const foundUser = await userService.findByEmailUserService(email);

  if (foundUser) {
    return res.status(400).send({
      message: "User is already in use!",
    });
  }

  const user = await userService
    .createUserService(req.body)
    .catch((err) => console.log(err.message));

  if (!user) {
    return res.status(400).send({
      message: "Error to create user",
    });
  }

  const token = authService.generateToken(user.id);

  res.status(201).send({
    user: {
      id: user.id,
      name,
      username,
      email,
      avatar,
    },
    token,
  }
  );
};

const findAllUserController = async (req, res) => {
  const user = await userService.findAllUserService();

  if (user.length === 0) {
    return res.status(400).send({
      message: "Não existem usuarios cadastrados!",
    });
  }
  res.send(user);
};

module.exports = { createUserController, findAllUserController };
