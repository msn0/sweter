module.exports.push = function (timestamp, data) {
  console.log(new Date(timestamp).toDateString());
  for(var key in data) {
    console.log("  " + key + ": " + data[key]);
  }
};
