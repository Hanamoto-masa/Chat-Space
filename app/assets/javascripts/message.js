$(function(){
  function buildMessage(message){
    var image = ""
    message.image_url ? image = `<img src="${message.image_url}">` : image = ""
    var html = `<div class="message" data-message-id=${message.id}>
                  <div class="message__name">
                    ${message.name}
                  </div>
                  <div class="message__date">
                    ${message.date}
                    </div>
                  </div>
                  <div class="message__text">
                    ${message.content}
                    <div class="message__text">
                      ${image}
                    </div>
                  </div>
                </div>`
    return html
  }
  $('#new_message').on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $(".messages").append(html);
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(message){
      alert("メッセージ送信に失敗しました");
    })
  })
  var buildMessageHTML = function(message) {
    var image = message.image.url ? `<img src="${message.image.url}">` : "";
    var html = `<div class="message" data-message-id=${message.id}>
                  <div class="message__upper-info">
                    <div class="message__upper-info__user">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__text">
                    ${message.content}
                    <div class="message__text">
                      ${image}
                    </div>
                  </div>
                </div>`
    return html;
  };
  var reloadMessages = function() {
    last_message_id = $($(".view").children()[$(".view").children().length - 1]).attr("data-message-id");
    var httpId = location.href.match(new RegExp(/groups\/(\d+)/))[1]
    var http = `/groups/${httpId}/api/messages`
    $.ajax({
      url: `/groups/${httpId}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      var pageCount = 0;
      messages.forEach(function(newMessage){
        insertHTML += buildMessageHTML(newMessage);
        pageCount = 1;
      });
      $(".view").append(insertHTML)
      if (pageCount === 1){
        $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
        pageCount = 0;
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  function limitedPageLoad(){
    var url = location.href ;
    if(url.match(/groups\/\d+\/messages/)) {
      reloadMessages();
    }
  }
  setInterval(limitedPageLoad, 7000);
})