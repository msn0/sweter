module.exports.push = function(timestamp, data) {
    console.log(
        (new Date()).toDateString() + " | " + JSON.stringify({"data":"data"})
    );
}
