// cors.js
const cors = require('cors');

function configureCors(app) {
    app.use(cors());
}

module.exports = { configureCors };
