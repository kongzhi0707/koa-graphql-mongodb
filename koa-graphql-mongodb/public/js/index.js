window.onload = function () {

  $('#btn2').click(function() {
    $.ajax({
      url: '/student',
      data: {},
      success:function (res){
        if (res.success) {
          renderStudent (res.student)
        }
      }
    })
  })

  function renderStudent (data) {
    var str = '';
    if (data && data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        str += '<li>姓名：'+data[i].name+'，性别：'+data[i].sex+'，年龄：'+data[i].age+'</li>'
      }
    }
    console.log(str);
    $('#studentList').html(str)
  }
}