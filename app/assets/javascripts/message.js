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
      // $(".form__submit").removeAttr("disabled");
    })
    .fail(function(message){
      alert("メッセージ送信に失敗しました");
    })
  })
})