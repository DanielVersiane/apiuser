'use strict';

class AppController {
  index({ response }) {
    return response.status(200).send({ message: 'Hello World' });
  }
}

module.exports = AppController;
