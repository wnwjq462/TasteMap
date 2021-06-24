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
          // 실패 시 처리
          document.getElementById("bumper").innerText = request.responseText;
          document.getElementById("FormLogin").reset();
        }
      },
      success: function (response) {
        location.href = "/dining";
      },
    });
  }
}

function signupcheck() {
  var id = document.getElementById("idinput").value;
  var pw = document.getElementById("pwinput").value;
  var keywordarray = [];

  $("input:checkbox[name='keyword-like']:checked").each(function () {
    var checkeditem = $(this).val();
    keywordarray.push(checkeditem);
  });

  if (document.getElementById("bumper2").innerText != "") {
    return false;
  }
  if (id == "" || pw == "") {
    document.getElementById("bumper1").innerText =
      "아이디, 패스워드를 입력해주세요.";
    return false;
  } else {
    console.log(keywordarray);
    document.getElementById("bumper1").innerText = "";
    $.ajax({
      type: "post",
      url: "/auth/join",
      dataType: "json",
      traditional: true,
      data: {
        account: id,
        password: pw,
        keywords: keywordarray,
      },

      error: function (request, status, error) {
        if (request.status == 400) {
          var errortext = request.responseText;
          var errormsg = errortext
            .replace('{"message":"', "")
            .replace('"}', "");
          // 실패 시 처리
          document.getElementById("bumper1").innerText = errormsg;
        }
      },

      success: function (response) {
        alert("회원가입에 성공했습니다.");
        location.href = "/auth/login";
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

function modifyuserinfo() {
  var pw = document.getElementById("pwinput").value;
  var keywordarray = [];

  $("input:checkbox[name='keyword-like']:checked").each(function () {
    var checkeditem = $(this).val();
    keywordarray.push(checkeditem);
  });

  if (document.getElementById("bumper2").innerText != "") {
    return false;
  }
  console.log(keywordarray);

  $.ajax({
    type: "post",
    url: "/user",
    dataType: "json",
    traditional: true,
    data: {
      password: pw,
      keywords: keywordarray,
    },

    error: function (request, status, error) {
      if (request.status == 400) {
        var errortext = request.responseText;
        var errormsg = errortext.replace('{"message":"', "").replace('"}', "");
        // 실패 시 처리
        document.getElementById("bumper2").innerText = errormsg;
      }
    },

    success: function (response) {
      alert("정보가 수정되었습니다.");
      location.href = "/dining";
    },
  });
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
