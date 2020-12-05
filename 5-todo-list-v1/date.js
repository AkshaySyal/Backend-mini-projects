
module.exports.getDate = getDate;
module.exports.getDay = getDay;

function getDate() {
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var d = new Date();
    var date = d.toLocaleDateString("hn-US", options);
    return date;
}

function getDay() {
    var options = {
        weekday: "long"
    };
    var d = new Date()
    var day = d.toLocaleDateString("hn-US", options);
    return day;
}
