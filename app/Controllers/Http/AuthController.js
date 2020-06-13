'use strict';

const { validateAll } = use('Validator');
const User = use('App/Models/User');

class AuthController {
  async register({ request, response }) {
    const validation = await validateAll(request.all(), {
      name: 'required|min:5|max:60',
      username: 'required|min:5|max:80|unique:users',
      email: 'required|email|unique:users',
      password: 'required|min:6|max:60',
    });

    if (validation.fails()) {
      return response.status(400).send({ message: validation.messages() });
    }

    const data = request.only(['name', 'username', 'email', 'password']);
    const user = await User.create(data);
    return user;
  }

  async authenticate({ request, response, auth }) {
    const validation = await validateAll(request.all(), {
      username: 'required|min:5',
      password: 'required|min:6',
    });

    if (validation.fails()) {
      return response.status(400).send({ message: validation.messages() });
    }

    const { username, password } = request.all();

    const token = await auth.attempt(username, password);

    return { token };
  }
}

module.exports = AuthController;
