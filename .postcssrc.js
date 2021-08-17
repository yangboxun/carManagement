const path = require('path');
module.exports = {

  "plugins": {
    "precss": {},
    "postcss-import": {
      path: path.resolve(__dirname, './src/assets/img')
    }
  },
}
