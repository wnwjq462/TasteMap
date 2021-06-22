$(document).ready(function () {
  $(".omrs-input-underlined i").on("click", function () {
    $(".pwinput").toggleClass("active");
    if ($(".pwinput").hasClass("active")) {
      $(this).attr("class", "fa fa-eye-slash fa-lg");
      $(".pwinput").attr("type", "text");
    } else {
      $(this).attr("class", "fa fa-eye fa-lg");
      $(".pwinput").attr("type", "password");
    }
  });
});

function logincheck() {
  var id = document.getElementById("idinput").value;
  var pw = document.getElementById("pwinput").value;

  if (id == "" || pw == "") {
    return false;
  } else {
    $.ajax({
      type: "post",
      url: "/auth/login",
      data: {
        account: id,
        password: pw,
      },
      error: function (request, status, error) {
        if (request.status == 400) {
          alert(
            "code = " +
              request.status +
              " message = " +
              request.responseText +
              " error = " +
              error
          );

          // 실패 시 처리
          document.getElementById("bumper").innerText =
            "아이디 혹은 패스워드가 존재하지 않거나 틀렸습니다.";
          document.getElementById("FormLogin").reset();
        }
      },
      success: function (response) {
        return true;
      },
    });
  }
}

function signupcheck() {
  var id = document.getElementById("idinput").value;
  var pw = document.getElementById("pwinput").value;
  const query = 'input[name="keyword-like"]:checked';
  const selectedElements = document.querySelectorAll(query);

  if (document.getElementById("bumper2").innerText != "") {
    return false;
  }
  if (id == "" || pw == "") {
    return false;
  } else {
    $.ajax({
      type: "post",
      url: "/auth/join",
      data: {
        userid: id,
        userpw: pw,
        keywords: selectedElements,
      },
      error: function (request, status, error) {
        alert(
          "code = " +
            request.status +
            " message = " +
            request.responseText +
            " error = " +
            error
        ); // 실패 시 처리
        if (request.status == 404) {
          document.getElementById("bumper1").innerText =
            "이미 존재하는 아이디입니다.";
        }
      },
      success: function (response) {
        return true;
      },
    });
  }
}

function getCheckedCnt() {
  // 선택된 목록 가져오기
  const query = 'input[name="keyword-like"]:checked';
  const selectedElements = document.querySelectorAll(query);

  // 선택된 목록의 갯수 세기
  const selectedElementsCnt = selectedElements.length;

  // 출력
  if (selectedElements.length > 9) {
    document.getElementById("bumper2").innerText =
      "키워드는 9개까지 선택 가능합니다.";
  } else {
    document.getElementById("bumper2").innerText = "";
  }
}
