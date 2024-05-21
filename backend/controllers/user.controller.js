const users = require('../database/users.json');
const { addUser } = require('../models/user.model');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ status: 400, message: 'email_or_password_required', data: null });
    
    const user = await users.find(user => user.email === email)
    if (!user) return res.status(404).json({ status: 404, message: 'no_such_user', data: null });

    const validPassword = await users.find(user => user.password === password);
    if (!validPassword) return res.status(404).json({ status: 404, message: 'invalid_email_or_password', data: null });

    return res.status(200).json({ status: 200, message: "login_success", data: user})
  },

  signup: async (req, res) => {
    const { email, password, nickname, profile_image } = req.body;
    if (!email || !password || !nickname ) return res.status(400).json({ status: 400, message: "required", data: null });

    const invalidEmail = await users.find(user => user.email === email);
    if (invalidEmail) return res.status(404).json({ status: 404, message: "invalid_email", data: null })

    const newUserId = addUser({ email, password, nickname, profile_image });
    if (!newUserId) return res.status(500).json({ status: 500, message: "internal_server_error", data: null});

    return res.status(201).json({ 
      status: 201, 
      message: "resgister_success", 
      data: { user_id: newUserId }
    })
  },
}