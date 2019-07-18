$(document).ready(function(){
   let comments = [];
   let savedComments = localStorage.getItem('comments');
   if ( savedComments != undefined ) {
      comments = JSON.parse(savedComments);
      for ( let i = 0; i < comments.length; i++ ) {
          addCommentToDOM(comments[i]);
      }
   }
   let flag = false;
   $(document).on('keydown', function(event){
       if ( event.key == "Control" ) flag = true;
       if ( event.key == "Enter" && flag ) {
          let input_value = $('#in').val();
           if ( input_value.length > 3 ) {
              let comment = {
                 time: Math.floor(Date.now()/1000),
                 message: input_value
              } 
              comments.push(comment);
              addCommentToDOM(comment);
              $('#in').val('');
           } else alert('Введите больше 3-ох символов') 
       }
   })
    
   $('#public').on('click', function(){
       let input_value = $('#in').val();
       if ( input_value.length > 3 ) {
          let comment = {
             time: Math.floor(Date.now()/1000),
             message: input_value
          } 
          comments.push(comment);
          addCommentToDOM(comment);
          $('#in').val('');
       } else alert('Введите больше 3-ох символов')
   })
    
   function addCommentToDOM(obj) {
       localStorage.setItem('comments', JSON.stringify(comments));
       $('<div/>',{class: "review-block"}).append($('<span/>',{class: "reviewer-name", text: "NO NAME"}), $('<span/>',{class: "time", text: timeConverter(obj.time)}), $('<div/>',{class: "message-wrap"}).append($('<div/>',{class: "triangle"}).append($('<img/>',{src: "img/tr.png"})), $('<p/>',{ text: obj.message}))).appendTo($('.review-block-wrap'));
   }
                                                                                                            
   function timeConverter(UNIX_timestamp){
         let t = new Date(UNIX_timestamp*1000);
         let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
         let year = t.getFullYear();
         let month = months[t.getMonth()];
         let date = t.getDate();
         let hour = t.getHours();
         let min = (t.getMinutes() < 10) ? "0"+t.getMinutes() : t.getMinutes();
         let sec = (t.getSeconds() < 10) ? "0"+t.getSeconds() : t.getSeconds();
         let dateTime = date+' '+month+' '+year+' '+hour+':'+min+':'+sec ;
         return dateTime;
     }                                                                                                        
});