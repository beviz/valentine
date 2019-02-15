var moment = require("moment");
var axios = require("axios");

window.onload = function() {
  var when = "2017-02-14T13:57:07.631Z";
  var computeTime = function() {
    var formated = "YYYY-MM-DD HH:mm:ss";

    var startTime = moment(new Date(when)).format(formated);

    var now = moment().format(formated);

    var ms = moment(now).diff(moment(startTime));

    var duration = moment.duration(ms);
    // var y = duration.years();
    var d = Math.floor(duration.asDays());
    var h = duration.hours();
    var m = duration.minutes();
    var s = duration.seconds();
    // document.querySelector(".year").innerText = y;
    document.querySelector(".day").innerText = d;
    document.querySelector(".hour").innerText = h;
    document.querySelector(".minute").innerText = m;
    document.querySelector(".second").innerText = s;
    requestAnimationFrame(computeTime);
  };

  var catchError = function() {
    document.querySelector(".prompt").style.display = "block";
  };

  var onSuccess = function(res) {
    when = res.data.when;
    document.querySelector(".prompt").style.display = "none";
    document.querySelector(".content").style.display = "block";
    requestAnimationFrame(computeTime);
    var manifesto = document.querySelector(".manifesto");
    manifesto.style.display = "block";
    manifesto.innerText = res.data.manifesto;
  };

  var hostArr = window.location.host.split(".");
  axios
    .get(`/ido/${hostArr[0]}.json`)
    .then(function(res) {
      if (!res || res.status < 200 || res.status >= 300 || !res.data) {
        throw "error";
      }
      onSuccess(res);
    })
    .catch(catchError);
};
