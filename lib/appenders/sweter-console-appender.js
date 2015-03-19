module.exports.push = function(timestamp, data) {
    console.log(new Date(timestamp).toDateString() + " | " + data);
};
