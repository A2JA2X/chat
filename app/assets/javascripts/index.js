$(function () {
  function appendUser(user) {
    var html = `
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </div>
               `
    return html;
  };
  function clickHTML(user) {
    var userId = user.attr("data-user-id");
    var html = `<div class='chat-group-user clearfix js-chat-member' id='${userId}'>
                  <input name='group[user_ids][]' type='hidden' value="${userId}">
                  <p class='chat-group-user__name'>${user.attr("data-user-name")}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
               </div>`
    return html;
  }
  $("#user-search-field").on("keyup", function () {
    var input = $("#user-search-field").val();
    var href = window.location.href
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    }).done(function (users) {
      $(".user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function (user) {
          var html = appendUser(user);
          $(".user-search-result").append(html);
        });
      }
    }).fail(function () {
      alert('通信に失敗しました');
    });
  });

  $(document).on("click", ".user-search-add", function () {
    $input = $(this);
    var add_user_html = clickHTML($input);
    $("#search-users").append(add_user_html);
    $input.parent()[0].remove();
  });

  $(document).on("click", ".user-search-remove", function () {
    $input = $(this);
    $input.parent().remove();
  });
});
