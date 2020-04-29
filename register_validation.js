var valid_fname = false
var valid_lname = false
var valid_uname = false
var valid_email = false
var valid_bdate = false
var valid_pass  = false

$(document).ready(function() {
    $(".registration_error").hide()

    $("#register_fname").on("input", function(){
        valid_fname = true
        let fname = $("#register_fname").val()
        let fname_validation = check_name(fname)
        hide_errors("fname", 3)
        if(fname_validation != "9"){
            $("#fname_err_" + fname_validation).show(700)
            valid_fname = false
        }
        valid_reg()
    })

    $("#register_lname").on("input", function(){
        valid_lname = true
        let lname = $("#register_lname").val()
        let lname_validation = check_name(lname)
        hide_errors("lname", 3)
        if(lname_validation != "9"){
            $("#lname_err_" + lname_validation).show(700)
            valid_lname = false
        }
        valid_reg()
    })

    $("#register_uname").on("input", function(){
        valid_uname = true
        let uname = $("#register_uname").val()
        let uname_validation = check_uname(uname)
        hide_errors("uname", 5)
        if(uname_validation != "9"){
            $("#uname_err_" + uname_validation).show(700)
            valid_uname = false
        }
        valid_reg()
    })

    $("#register_email").on("input", function(){
        valid_email = true
        let email = $("#register_email").val()
        let email_validation = check_email(email)
        hide_errors("email", 2)
        if(email_validation != "9"){
            $("#email_err_" + email_validation).show(700)
            valid_email = false
        }
        valid_reg()
    })

    $("#register_bdate").on("change", function(){
        valid_bdate = true;
        valid_reg()
    })

    $("#register_pass").on("input", function(){
        valid_pass = true
        let pass = $("#register_pass").val()
        let pass_validation = check_pass(pass)
        hide_errors("pass", 3)
        if(pass_validation != "9"){
            $("#pass_err_" + pass_validation).show(700)
            valid_pass = false
        }
        valid_reg()
    })
})

function check_name(name){
    var format = /^[a-zA-Z]+$/

    if (name.length == 0)        { return "0" } // empty name
    else if (name.length < 3)    { return "1" } // name shorter than 3
    else if (!format.test(name)) { return "2" } // name contain non alpha-beta charachter
    else                         { return "9" } // valid name
}

function check_uname(uname){
    var format = /[!@#$%^&*()+=\[\]{};:"\\|,.<>\/?]+/

    if      (uname.length == 0)                                { return "0" } // empty uname
    else if (uname.length < 3)                                 { return "1" } // uname shorter than 3 chars
    else if (uname.charAt(0) >= '0' && uname.charAt(0) <= '9') { return "2" } // uname starts with number
    else if (format.test(uname))                               { return "3" } // uname contains special chars
    else if (users.some(user => user.username == uname))       { return "4" } // uname taken
    else                                                       { return "9" } // valid uname
}

function check_email(email){
    var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if      (email.length == 0)        { return "0" } // empty email
    else if (!format.test(email))      { return "1" } // not an email
    else                               { return "9" } // valid email

}

function check_pass(pass){
    var format_digits  = /\w*[0-9]+\w*/
    var fromat_letters = /\w*[a-zA-Z]+\w*/
    
    if      (pass.length == 0)                                         { return "0" } // empty pass
    else if (pass.length < 6)                                          { return "1" } // pass shorter than 6 chars
    else if (!(fromat_letters.test(pass) && format_digits.test(pass))) { return "2" } // pass doesn't contain letters/numbers 
    else                                                               { return "9" } // valid pass
}

function hide_errors(field, num_of_errors){
    var i
    for(i = 0; i < num_of_errors; i++){
        $("#" + field + "_err_" + i).hide()
    }
}

function valid_reg(){
    valid_registration = false
    if(valid_bdate && valid_email && valid_fname && 
       valid_lname && valid_pass  && valid_uname){
           valid_registration = true
       }
}