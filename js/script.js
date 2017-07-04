$ = function(x) {
  return document.getElementById(x);
}

var xmlHttp;
var members = new Array();
var token = "your slack token";

xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "https://slack.com/api/users.list?token="+token+"&channel=2017-members", false);
xmlHttp.send(null);
data = xmlHttp.responseText;
json = JSON.parse(data);
users = json['members'];

for(i=0; i < 30; i++){
  members[i] = (users[i]['name']);
  var numList = members
  var isStop = true;
  var n = 1;

  // function start() {
  //   $("test").innerText = numList.length;
  // }

  function startBingo() {
    $("start").style.display = "none";
    $("stop").style.display = "inline";
    isStop = false;
    roulette();
  }
  function stopBingo() {
    $("start").style.display = "inline";
    $("stop").style.display = "none";
    isStop = true;
  }
  function resetBingo() {
    location.reload();
  }

  function roulette() {
    var id = "";
    var rnd = Math.floor(Math.random() * numList.length);

    if (isStop) {
      clearTimeout(id);
      $("view").innerText = numList[rnd];
      if (!$("out").innerText) {
        var newli = document.createElement("li");
        var list = $("out");
        var member = n + "：" + numList[rnd];
        list.append(newli);
        newli.append(member);
      } else {
        n++;
        var newli = document.createElement("li");
        var list = $("out");
        var member = n + "：" + numList[rnd];
        list.append(newli);
        newli.append(member);
      }
      numList.splice(rnd, 1);
      // リストが空になったら終了
      if (numList.length == 0) {
        alert("終了です");
        $("start").disabled = true;
        $("start").style.display = "none";
        $("reset").style.display = "inline";
      }
      return false;
    }

    $("view").innerText = numList[rnd];
    id = setTimeout("roulette()", 10);
  }
}
