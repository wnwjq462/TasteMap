$(document).ready(function(){
    $('.omrs-input-underlined i').on('click',function(){
        $('.pwinput').toggleClass('active');
        if($('.pwinput').hasClass('active')){
            $(this).attr('class',"fa fa-eye-slash fa-lg");
            $('.pwinput').attr('type',"text");
        }else{
            $(this).attr('class',"fa fa-eye fa-lg");
            $('.pwinput').attr('type','password');
        }
    });

});

function logincheck() {
    var id = document.getElementById('idinput').value;
    var pw = document.getElementById('pwinput').value;

    var ids = new Array("지영", "다현", "서연", "형구", "지현", "수용");
    var pws = new Array('11','22','33','44','55','66');

    if (id=='' || pw=='') {
        return false;
    } else if (!(ids.includes(id) && pws.includes(pw))){
        document.getElementById("bumper").innerText = '아이디 혹은 패스워드가 존재하지 않거나 틀렸습니다.';
        document.getElementById('FormLogin').reset();
        return false;
    } else{ 
        return true;
    }
}

function signupcheck() {
    idcheck();
    if (document.getElementById("bumper1").innerText != '') {
        return false;
    }
    if (document.getElementById("bumper2").innerText != '') {
        return false;
    }
    if (id=='' || pw=='') {
        return false;
    } else{ 
        return true;
    }
}

function idcheck() {
    var id = document.getElementById('idinput').value;
    var pw = document.getElementById('pwinput').value;
    var ids = new Array("지영", "다현", "서연", "형구", "지현", "수용");
    if (ids.includes(id)){
        document.getElementById("bumper1").innerText = '이미 존재하는 아이디입니다.';
    } else {
        document.getElementById("bumper1").innerText = '';
    }
}


function getCheckedCnt()  {
    // 선택된 목록 가져오기
    const query = 'input[name="keyword-like"]:checked';
    const selectedElements = 
        document.querySelectorAll(query);
    
    // 선택된 목록의 갯수 세기
    const selectedElementsCnt = selectedElements.length;

    // 출력
    if (selectedElements.length > 9) {
    document.getElementById("bumper2").innerText = '키워드는 9개까지 선택 가능합니다.';
    } else {
        document.getElementById("bumper2").innerText = '';
    }
  }
  