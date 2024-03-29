$(document).ready(function(){
   let flag = false;
   
   function isInputInvalid(value){
       if ( value.length > 3 ) {
          $('#in').css('border','1px solid #a9a9a9');
          $('.error').hide();
          $('#in').val('');
          return false;
       }
       else{
          $('#in').css('border','1px solid red');
          $('.error').show();
          $('#in').val('');
          return true;
       }
   }
    
   function addComment(){
       let input_value = $('#in').val();
       if ( isInputInvalid(input_value) ) 
          return;

          let comment = {
             time: Math.floor(Date.now()/1000),
             message: input_value
          } 
          addCommentToDOM(comment);
       
   }
    
   function addCommentToDOM(obj){
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
    
   $(document).on('keydown', function(event){
       if ( event.key == "Control" ) flag = true;
       if ( event.key == "Enter" && flag ) {
           addComment();
           flag = fasle;
       }
   })
    
   $('#public').on('click', addComment)                                                                                                      
});