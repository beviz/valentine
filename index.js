var moment = require("moment");
var axios = require("axios");
var punycode = require("punycode");

window.onload = function() {
  var hostArr = window.location.host.split(".");
  const host = punycode.toUnicode(window.location.host);
  if (host.length > 1) document.title = host;

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
    document.querySelector(".day").innerText = d < 10 ? `0${d}` : d;
    document.querySelector(".hour").innerText = h < 10 ? `0${h}` : h;
    document.querySelector(".minute").innerText = m < 10 ? `0${m}` : m;
    document.querySelector(".second").innerText = s < 10 ? `0${s}` : s;
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

    if (res.data.from) {
      document.querySelector(".info span").innerText = res.data.from;
    }
  };

  axios
    .get(`/ido/${hostArr[0]}.json`)
    .then(function(res) {
      if (!res || res.status < 200 || res.status >= 300 || !res.data) {
        throw "error";
      }
      onSuccess(res);
    })
    .catch(catchError);
  // onSuccess({ data: { when: "2018-1-1" } });
};
