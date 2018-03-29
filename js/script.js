$ = function (x) {
  return document.getElementById(x);
}

var n = 1;
var members = new Array();
var membersUse = new Array();

function paseJson() {
  var xmlHttp;
  var token = "your slack token";
  var isStop = true;

  xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "https://slack.com/api/users.list?token=" + token, false);
  xmlHttp.send(null);
  data = xmlHttp.responseText;
  json = JSON.parse(data);
  users = json['members'];

  for (let user of users) {
    if (user['deleted'] == false) {
      members.push((user['name']));
    }
  }

  return members
}


function initCheckbox() {
  members = paseJson();
  for (member of members) {
    var box = $('box');
    box.insertAdjacentHTML('afterbegin', `<input type="checkbox" checked="checked" name="user" value="${member}" class="select-user"><label>${member}</label><br>`)
  }
}

function getCheckbox() {
  var checkbox = document.getElementsByName('user')
  for (i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked == true) {
      membersUse.push(checkbox[i].value);
    }
  }
  alert('追加されました');
  return membersUse;
}


function startBingo() {
  if (membersUse.length == 0) {
    alert('メンバーを選択してください');
  } else {
    $("start").style.display = "none";
    $("stop").style.display = "inline";
    isStop = false;
    roulette();
  }
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
  var rnd = Math.floor(Math.random() * membersUse.length);

  if (isStop) {
    clearTimeout(id);
    $("view").innerText = membersUse[rnd];
    if (!$("out").innerText) {
      var newli = document.createElement("li");
      var list = $("out");
      var member = n + "：" + membersUse[rnd];
      list.append(newli);
      newli.append(member);
    } else {
      n++;
      var newli = document.createElement("li");
      var list = $("out");
      var member = n + "：" + membersUse[rnd];
      list.append(newli);
      newli.append(member);
    }
    membersUse.splice(rnd, 1);

    if (membersUse.length == 0) {
      alert("Finish");
      $("start").disabled = true;
      $("start").style.display = "none";
      $("reset").style.display = "inline";
    }
    return false;
  }

  $("view").innerText = membersUse[rnd];
  id = setTimeout("roulette()", 10);
}
