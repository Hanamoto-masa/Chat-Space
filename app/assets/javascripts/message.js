$(function(){
  function buildMessage(message){
    var image = message.image ? `<img src="${message.image}">` : ""
    console.log(image)
    console.log(message)
    var html = `<div class="message" data-id=${message.id}>
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
  var reloadMessages = function() {
    last_message_id = $(".message:last").data("id")
    console.log(last_message_id)
    var httpId = location.href.match(new RegExp(/groups\/(\d+)/))[1]
    var http = `/groups/${httpId}/api/messages`
    $.ajax({
      url: `/groups/${httpId}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages)
      var insertHTML = '';
      var pageCount = 0;
      messages.forEach(function(newMessage){
        insertHTML += buildMessage(newMessage);
        pageCount = 1;
      });
      $(".messages").append(insertHTML)
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