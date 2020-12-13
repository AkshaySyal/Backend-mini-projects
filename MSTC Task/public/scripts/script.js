$(function () {

   $("#uname_error_message").hide();
   $("#email_error_message").hide();
   $("#password_error_message").hide();
   $("#retype_password_error_message").hide();
   var error_uname = false;
   var error_email = false;
   var error_password = false;
   var error_retype_password = false;


   $("#form_uname").focusout(function () {
      check_uname();
   });
   $("#form_email").focusout(function () {
      check_email();
   });
   $("#form_password").focusout(function () {
      check_password();
   });
   $("#form_retype_password").focusout(function () {
      check_retype_password();
   });


   function check_uname() {
      var uname = $("#form_uname").val();
      if (uname.length >= 8 && uname !== '') {
         $("#uname_error_message").hide();
         $("#form_uname").css("border-bottom", "2px solid #34F458");
      } else {
         $("#uname_error_message").html("Should contain 8 or more Characters");
         $("#uname_error_message").show();
         $("#form_uname").css("border-bottom", "2px solid #F90A0A");
         error_uname = true;
      }
   }

   function check_password() {
      var password_length = $("#form_password").val().length;
      if (password_length < 8) {
         $("#password_error_message").html("Atleast 8 Characters");
         $("#password_error_message").show();
         $("#form_password").css("border-bottom", "2px solid #F90A0A");
         error_password = true;
      } else {
         $("#password_error_message").hide();
         $("#form_password").css("border-bottom", "2px solid #34F458");
      }
   }

   function check_retype_password() {
      var password = $("#form_password").val();
      var retype_password = $("#form_retype_password").val();
      if (password !== retype_password) {
         $("#retype_password_error_message").html("Passwords Did not Matched");
         $("#retype_password_error_message").show();
         $("#form_retype_password").css("border-bottom", "2px solid #F90A0A");
         error_retype_password = true;
      } else {
         $("#retype_password_error_message").hide();
         $("#form_retype_password").css("border-bottom", "2px solid #34F458");
      }
   }

   function check_email() {
      var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      var email = $("#form_email").val();
      if (pattern.test(email) && email !== '') {
         $("#email_error_message").hide();
         $("#form_email").css("border-bottom", "2px solid #34F458");
      } else {
         $("#email_error_message").html("Invalid Email");
         $("#email_error_message").show();
         $("#form_email").css("border-bottom", "2px solid #F90A0A");
         error_email = true;
      }
   }



   $("#registration_form").submit(function () {
      error_uname = false;
      error_email = false;
      error_password = false;
      error_retype_password = false;

      check_uname();
      check_email();
      check_password();
      check_retype_password();




   });
});