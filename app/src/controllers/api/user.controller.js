const { generateToken } = require("../../helpers/jwt.helper");
const {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  getUserByEmail,
} = require("../../services/user.service");
const bcrypt = require("bcrypt");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await getUsers();
      const usersResponse = users.map(({ id, name, email }) => {
        return {
          id,
          name,
          email,
          detail: `/api/users/${id}`,
        };
      });

      const RESPONSE = {
        count: users.length,
        users: usersResponse,
      };

      return res.status(200).json(RESPONSE);
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },
  getUserById: async (req, res) => {
    try {
      const USER_ID = req.params.id;
      const { id, name, last_name, email, phone, avatar } = await getUserById(
        USER_ID
      );

      const USER_DATA_RESPONSE = {
        id,
        name,
        last_name,
        email,
        phone,
        avatar,
      };

      return res.status(200).json(USER_DATA_RESPONSE);
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },
  createUser: async (req, res) => {
    try {
      const result = await insertUser({ 
        ...req.body,
        pass: bcrypt.hashSync(req.body.pass, 10)
       });

      if (result) {
        const SUCCESS_RESPONSE = "User created successfully";
        return res.status(201).json({ msg: SUCCESS_RESPONSE });
      } else {
        const ERROR_RESPONSE = "Somethings wrong";
        return res.status(400).json({ msg: ERROR_RESPONSE });
      }
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },
  login: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await getUserByEmail(email);
      const token = generateToken(user);

      return res.status(200).json({token})
    } catch (error) {
      return res.status(500).json({ Error: "Token error " + error });
    }
  },
  updateUser: async (req, res) => {},
  deleteUser: async (req, res) => {},
};
