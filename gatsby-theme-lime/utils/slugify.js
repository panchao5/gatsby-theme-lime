const limax = require("limax");

function slugify(s) {
  return limax(s, { tone: false });
}

module.exports = slugify;
