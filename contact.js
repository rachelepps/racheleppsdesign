
///////////////////// VALIDATION CH 4 | CONTACT FORM  ///////////////////////

                    /* <<<<<<<<<< SUMMARY >>>>>>>>>>> 
The following code uses exception/error handling as a bulletproofing technique to validate submitted form data. All of the input labels marked with an asterisk* are given rules to follow based on user input.
Every requirement is dependent on the user clicking Submit, so all functions lead back to the Submit button using event handlers that trigger each validation event.

The first three functions check for text input values (first name, last name, and email) to make sure they are not left blank when the form is submitted. Each of these functions use try statements to allow for the evaluation
of errors - in this case, the error is simply that nothing has been entered, but in the future I would like to add maximum character requirements as well. These functions begin by defining the variables that tie them to a 
specific aspect of the form, then they use try statements to rest the condition of whether or not the input came back as an empty string. If it returns empty, the throw statement specifies an error message to display that is 
specific to each field. The catch statement follows up with the exception thrown by the try statement, giving its error message a name with instructions on how to handle it. Those instructions specify where to deliver the error 
message (both in HTML and to console) and how it should notify the user of where the error is (using red CSS styling and aria attributes as an accessible alternative for screenreaders). The finally statement comes in next to 
perform cleanup tasks that revert the catch handling errors both visibly and behind the scenes, so that the associated field no longer prevents the user from submitting the form.

The next function groups two related questions together in a fieldset and checks to make sure one of the radio buttons from each question has been selected before the form may be submitted. By delivering a single throw message
that applies to the whole fieldset, I was able to write more efficient code that groups two sets of if/else statements under one try statement. By calling each radio button by its array index number and accessing its checked
property, I created a conditional statement that uses && operators to check if none of the option buttons in each set are selected. Using the ! operator, my if statements check to see if the first button is not selected, and
then continues down the line with && to determine a Boolean outcome. If all those conditions are true, the if statement is true, meaning that no button is checked. So if the try statement determines that all the option buttons
are unselected (for one or both radio questions), then it adds a red border to each button and sets the validity of the whole fieldset to false. If the variable fieldsetValidity returns false, a throw message is delivered to 
be caught by an event named msg, which overrides the CSS style of display: none, tells the throw message where to be delivered, and stops the form from being submitted.

Finally, the event listeners allow for all of this to be triggered by the event of the submit button getting clicked! In the future, I'd like to improve this form by hiding the fieldsets for project request assets and 
estimated project budget unless the "Project Request" reason for contact radio button is selected. I would also like to add maximum character requirements to all the strings and the numerical text entry. Finally, I want to
set up a display message that informs the user that the form as a whole has errors and to look for the missing information that requires their attention.


/* global variables referencing error messages and validation */
var errorAlert = document.getElementsByClassName("hiddenError");
var formValidity = true;            // declares variable meant to track whether form as a whole is valid or if user needs to add/change entries

///////////////////// jQUERY CH 12 | UPDATED FIRST NAME VALIDATION FUNCTION  ///////////////////////

// first name validation function definition
function checkFirstName()  {
    var formHasErrors = false;      // defines general error variable to identify whether form has errors, setting the default as error-free
    
    // * CH 12 * redefining firstName variable using jQuery syntax using val() method instead of vanilla JS
    var firstName = $('#fname').val();
    // var firstName = document.getElementById("fname").value;     // defines first name field variable with instructions to check for a value

    // * CH 12 * fNameError variable replaced with jQuery
    // var fNameError = document.getElementById("fNameErr");       // defines location to display error alert (connected to HTML span element)
    
    // * CH 12 * fNameField variable replaced with jQuery
    // var fNameField = document.getElementById("fname");      // defines variable to reference first name field without value (the field as a whole)

    //// * CH 9 * regular expression for first name character requirements ////
    // regular expression allowing for characters A-Z, spaces, hyphens, and apostrophes for the more exotic names
    var fNameCheck = /^[a-z '-]+$/i;
    try  {
        if (/.{2,}/.test(firstName) === false) {      // if entered value is less than two characters:
            throw "&xotime; First name must be at least 2 characters long &cudarrr;";      // specify error message to address length requirement
        }  else if (fNameCheck.test(firstName) === false) {     // if at least 2 characters entered and regular expression rules aren't followed:
            throw "&xotime; Please provide a valid first name &cudarrr;";      // specify error message to indicate entered value is invalid
         }
        // if (firstName === "")  {           // if first name returns an empty string on submit, trigger the following error message:
           // throw "&xotime; Please enter your first name &cudarrr;";        // error message to display (CSS style = .hiddenError)
      //  }
        ////// * CH 8 * tie first name to client profile object //////
        // copy first name value to profile object
        profile.fname = firstName;
        // copy profile.fname value to profile section
        document.getElementById("profileFname").innerHTML = profile.fname;
        // make profile section and last name section visible
        document.getElementById("profile").style.display = "block";
        document.getElementById("fNameSection").style.display = "block";
    }
    catch (errMsg)  {              // assigns the name: errMsg to the error message specified by the exception thrown by the above try statement
        formHasErrors = true;      // confirms the form is invalid because of specified error

        // * CH 12 * replaces innerHTML property with jQuery syntax using html() method
        $('#fNameErr').html(errMsg);
        //fNameError.innerHTML = errMsg;          // instructs catch handling to display in location set by fNameError variable
        
        // * CH 12 * jQuery that replaces fNameError variable style.display = "block" and instead shows error dynamically 
        $('#fNameErr').show();       
        //fNameError.style.display = "block";     // handles error by displaying error message (overrides CSS rule of display: none;)   
        
        // * CH 12 * jQuery that replaces fNameField.style.borderColor = "red" and uses jQuery CSS method for same effect
        $('#fname').css("border-color", "red");     
        // fNameField.style.borderColor = "red";                   // gives field a red border to indicate error
     
        formValidity = false;                      // indicates lack of field validation is preventing form from being submitted
    }
    finally  {
        if (formHasErrors)  {
            console.log("Please enter missing information for first name.");     // cleanup error notification that executes regardless of whether try block throws an exception
        }  else  {                          // if field no longer has errors:
            firstName.value = true;         // set the value of first name to true
            
            // * CH 12 * jQuery that replaces fNameError variable style.display = "none" and instead shows error dynamically
            $('#fNameErr').hide();
            // fNameError.style.display = "none";      // remove erroneous message by substituting an empty string
            
            // * CH 12 * jQuery that replaces fNameField.style.borderColor = "" and uses jQuery CSS method to hide border color dynamically
            $('#fname').css("border-color", "");
            // fNameField.style.borderColor = ""; 
        }
    }
    return true;
}

// last name validation function definition
function checkLastName()  {
    var formHasErrors = false;      // defines general error variable to identify whether form has errors, setting the default as error-free
    var lastName = document.getElementById("lname").value;      // defines last name field variable with instructions to check for a value
    var lNameError = document.getElementById("lNameErr");       // defines location to display error alert (connected to HTML span element)
    var lNameField = document.getElementById("lname");     // defines variable to reference last name field without value (the field as a whole)
    //// * CH 9 * regular expression for last name character requirements ////
    // regular expression allowing for characters A-Z, spaces, hyphens, periods, commas, and apostrophes for the more exotic names
    var lNameCheck = /^[a-z ,.'-]+$/i;  
    try  {
        if (/.{3,}/.test(lastName) === false) {     // if entered value is less than three characters:
            throw "&xotime; Last name must be at least 3 characters long &cudarrr;";    // specify error message to address length requirement
        }  else if (lNameCheck.test(lastName) === false) {      // if at least 3 characters entered and regular expression rules aren't followed:
            throw "&xotime; Please provide a valid last name &cudarrr;";        // specify error message to indicate entered value is invalid
         }
       /* if (lastName === "")  {            // if first name returns an empty string on submit, trigger the following error message:
            throw "&xotime; Please enter your last name &cudarrr;";     // error message to display (CSS style = .hiddenError)
        } */
        ////// * CH 8 * tie last name to client profile object //////
        // copy last name value to profile object
        profile.lname = lastName;
        // copy profile.lname value to profile section
        document.getElementById("profileLname").innerHTML = profile.lname;
        // make profile section and last name section visible
        document.getElementById("profile").style.display = "block";
        document.getElementById("lNameSection").style.display = "block";
    }
    catch (errMsg)  {               // assigns the name: errMsg to the error message specified by the exception thrown by the above try statement
        formHasErrors = true;       // confirms the form is invalid because of specified error
        lNameError.innerHTML = errMsg;          // instructs catch handling to display in location set by lNameError variable
        lNameError.style.display = "block";     // handles error by displaying error message (overrides CSS rule of display: none;)
        lNameField.style.borderColor = "red";                  // gives field a red border to indicate error
       /* lNameError.setAttribute('aria-hidden', false);         // accessibility attribute to inform screenreaders of new error message
        lNameError.setAttribute('aria-invalid', true);         // accessibility attribute to inform screenreaders of missing form information
        formValidity = false; */
     //   errorDiv.style.display = "block";   // handles error by displaying error message (overrides CSS rule of display: none;)
        lNameError.innerHTML = errMsg;           // instructs catch handling to display in location set by errorDiv variable
        formValidity = false;                    // indicates lack of field validation is preventing form from being submitted
    }
    finally  {
        if (formHasErrors)  {
            console.log("Please enter missing information for last name.");     // cleanup error notification that executes regardless of whether try block throws an exception
        }  else  {                          // if field no longer has errors:
            lastName.value = true;          // set the value of last name to true
            lNameError.style.display = "none";      // remove erroneous message by setting it to display: none
            lNameField.style.borderColor = ""; 
        }
    }
    return true;
}

// email validation function definition
function checkEmail()  {
    var formHasErrors = false;      // defines general error variable to identify whether form has errors, setting the default as error-free
    var email = document.getElementById("email").value;     // defines email field variable with instructions to check for a value
    var emailError = document.getElementById("emailErr");   // defines location to display error alert (connected to HTML span element)
    var emailField = document.getElementById("email");      // defines variable to reference email field without value (the field as a whole)
    //// * CH 9 * regular expression for email character requirements ////
    // first part of email must include 1+ of the following available characters: A-Z, 0-9, and an underscore, hyphen, and/or dot separator. The @ character is required, followed by previously mentioned pattern.
    // next should come proper domain name structure with a domain identifier that consists of 2-6 alphabetic characters
    var emailCheck = /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]+)*@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*(\.[a-z]{2,6})$/; 
    try  {
        if (email === "")  {            // if email returns an empty string on submit, trigger the following error message:
            throw "&xotime; Please enter your e-mail address &cudarrr;";        // error message to display (CSS style = .hiddenError)
        } else if (emailCheck.test(email) === false) {                          // if regular expression rules aren't followed:
            throw "&xotime; Please provide a valid email address &cudarrr;";    // display error message indicating entered value is invalid
         }
        ////// * CH 8 * tie email to client profile object //////
        // convert email address to lowercase
        email = email.toLowerCase();
        // copy valid email value to profile object
        profile.email = email;
        // copy profile.email value to profile section
        document.getElementById("profileEmail").innerHTML = profile.email;
        // make profile section and email section visible
        document.getElementById("profile").style.display = "block";
        document.getElementById("emailSection").style.display = "block";
    }
    catch (errMsg)  {              // assigns the name: errMsg to the error message specified by the exception thrown by the above try statement
        formHasErrors = true;      // confirms the form is invalid because of specified error
        emailError.innerHTML = errMsg;          // instructs catch handling to display in location set by emailError variable
        emailError.style.display = "block";     // handles error by displaying error message (overrides CSS rule of display: none;)
        emailField.style.borderColor = "red";                   // gives field a red border to indicate error
     /*   emailError.setAttribute('aria-hidden', false);          // accessibility attribute to inform screenreaders of new error message
        emailError.setAttribute('aria-invalid', true);          // accessibility attribute to inform screenreaders of missing form information
        formValidity = false; */
    //    errorDiv.style.display = "block";   // handles error by displaying error message (overrides CSS rule of display: none;)
        emailError.innerHTML = errMsg;           // instructs catch handling to display in location set by errorDiv variable
        formValidity = false;                      // indicates lack of field validation is preventing form from being submitted
    }
    finally  {
        if (formHasErrors)  {
            console.log("Please enter missing information for email address.");     // cleanup error notification that executes regardless of whether try block throws an exception
        }  else  {                          // if field no longer has errors:
            email.value = true;             // set the value of email to true
            emailError.style.display = "none";      // remove erroneous message by setting it to display: none
            emailField.style.borderColor = ""; 
        }
    }
    return true;
}

//////// * CH 9 * validate phone number ////////
function checkPhone()  {
    var formHasErrors = false;
    var phone = document.getElementById("phone").value;
    var phoneError = document.getElementById("phoneErr");
    var phoneField = document.getElementById("phone");
    //// * CH 9 * regular expression for phone number character requirements ////
    // first 3 digits can be in parentheses; dashes/periods optional after first 3 and following 3 characters; plus + sign allowed before first digit; must be b/w 10-12 total digits
    var phoneCheck = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    try  {
        // phone input not required, so default state is set not to disrupt validation or leave user feedback if left unentered
         if (phone === "")  {                                                   // if phone number input is left blank:
            formHasErrors = false;                                              // this function does not trigger invalid protocol
            formValidity = true;
        } else if (phoneCheck.test(phone) === false)  {                         // if phone is entered and in the wrong format according to regular expression:
            throw "&xotime; Please provide a valid phone number &cudarrr;";     // display error message indicating entered value is invalid
        }
        //// tie phone number to client profile object ////
        // copy valid email value to profile object
        profile.phone = phone;
        // copy profile.email value to profile section
        document.getElementById("profilePhone").innerHTML = profile.phone;
        // make profile section and email section visible
        document.getElementById("profile").style.display = "block";
        document.getElementById("phoneSection").style.display = "block";
    }
    // if error message is triggered and phone number is invalid, perform the following response to correct errors:
    catch (errMsg)  {              // assigns the name: errMsg to the error message specified by the exception thrown by the above try statement
        formHasErrors = true;      // confirms the form is invalid because of specified error
        phoneError.innerHTML = errMsg;          // instructs catch handling to display in location set by phoneError variable
        phoneError.style.display = "block";     // handles error by displaying error message (overrides CSS rule of display: none;)
        phoneField.style.borderColor = "red";   // gives field a red border to indicate error
        formValidity = false;                   // indicates lack of field validation is preventing form from being submitted
    }
    finally {
        if (formHasErrors)  {
            console.log("Please enter a valid phone number.");  // cleanup error notification that executes regardless of whether try block throws an exception
        }   else {                                  // if field no longer has errors:
            phone = true;                           // set the value of phone to true
            phoneError.style.display = "none";      // remove erroneous message by setting it to display: none
            phoneField.style.borderColor = "";
        }
    }
    return true;
}

// validate radio buttons
function checkButtons() {
    var fieldsetValidity = true;                                             // defines validity variable with a goal of obtaining true
    var methodButtons = document.getElementsByName("contactMethod");        // defines variable that references contact method radio buttons
    var reasonButtons = document.getElementsByName("contactReason");        // defines variable that references contact reason radio buttons
    var errorDiv = document.querySelector("#contactPref .fieldsetErr");     // variable that sets location of error message
    try {   // verify that a contact method is selected by accessing checked property of all options
        if (!methodButtons[0].checked && !methodButtons[1].checked && !methodButtons[2].checked && !methodButtons[3].checked)  {
            // conditional statement that checks if none of the four option buttons for contact method are selected by calling their array indexes
            for (i = 0; i < 4; i++)  {          // incremental counting each of the 4 options; if none selected, apply the following style:
                methodButtons[i].style.outline = "1px solid red";   // display red outline around radio buttons to indicate missing selection
            }
            fieldsetValidity = false;       // indicates form cannot be submitted until selection requirements have been met
        }  else  {
            for (i = 0; i < 4; i++)  {      // alternative instructions to perform after incremental counting, if selection has been made
                methodButtons[i].style.outline = "";        // removes error indicator for contact method radio buttons by setting outline style to empty string
            }
        }   // verify that a contact reason is selected by accessing checked property of all options
        if (!reasonButtons[0].checked && !reasonButtons[1].checked && !reasonButtons[2].checked && !reasonButtons[3].checked && !reasonButtons[4].checked)  {
            // conditional statement that checks if none of the five option buttons for contact reason are selected by calling their array indexes
            for (i = 0; i < 5; i++)  {          // incremental counting each of the 5 options; if none selected, apply the following style:
                reasonButtons[i].style.outline = "1px solid red";   // display red outline around radio buttons to indicate missing selection
            }
            fieldsetValidity = false;       // indicates form cannot be submitted until selection requirements have been met
        }  else  {
            for (i = 0; i < 5; i++)  {      // alternative instructions to perform after incremental counting, if selection has been made
                reasonButtons[i].style.outline = "";        // removes error indicator for contact reason radio buttons by setting outline style to empty string
            }
        }
        if (!fieldsetValidity)  {           // instructions to perform if either contact method or contact reason selection is not made
            throw "&xotime; Please complete all contact preference details &cudarrr;";      // error message to display (CSS style = .fieldsetErr)
        }  else  {
            errorDiv.style.display = "none";    // otherwise, if both selections have been made, hide throw message
        }
    }
    catch(msg)  {                           // assigns the name: msg to the error message specified by the exception thrown by the above try statement
        console.log(msg);
        errorDiv.style.display = "block";   // handles error by displaying error message (overrides CSS rule of display: none;)
        errorDiv.innerHTML = msg;           // instructs catch handling to display in location set by errorDiv variable
        fieldsetValidity = false;           // indicates lack of fieldset validation is preventing form from being submitted
        formValidity = false;               // form unable to submit unless set to true
    }
}

// * CH 6 * validate project request assets fieldset | requires selection of at least one asset if project request was selected as the contact reason
// selection is only required if user has selected to submit a project request
function checkAssets() {
    var formHasErrors;
    var reqValidity;
    var reqErrMsg = document.getElementById("reqErr");       // designates location of error message within project request fieldset
    var assets = document.getElementsByName("projectItems");                // defines variable that references project asset checkboxes
    try {   
        if (document.getElementById("request").checked) {   // if project request is selected as the reason for contact...
            if (!assets[0].checked && !assets[1].checked && !assets[2].checked && !assets[3].checked &&     // verify that a project asset is selected by accessing checked property of all options
                !assets[4].checked && !assets[5].checked && !assets[6].checked && !assets[7].checked)  {
                for (i = 0; i < 8; i++)  {          // incremental counting each of the 8 options; if none selected, apply the following style:
                    assets[i].style.outline = "1px solid red";   // display red outline around checkboxes to indicate missing selection
                }
                formHasErrors = true;
                reqValidity = false;
            }   else  {
                for (i = 0; i < 8; i++)  {      // alternative instructions to perform after incremental counting, if selection has been made
                    assets[i].style.outline = "";        // removes error indicator for project request checkboxes by setting outline style to empty string
                    }
                }
            if (!reqValidity)  {           // instructions to perform if project request was selected and no project asset is selected
                throw "&xotime; When requesting a project, please select at least one asset &cudarrr;";      // error message to display (CSS style = #reqErr)
            }  else  {
                reqErrMsg.style.display = "none";    // otherwise, if required selections have been made, hide throw message
            }
        }
    }
    catch (msg) {
        reqErrMsg.style.display = "block";           // show error message by setting its display to block
        reqErrMsg.innerHTML = msg;                   // instructs catch handling to display in location set by reqErrMsg variable
        formValidity = false;                        // form unable to submit unless set to true
    }
    finally  {
        if (formHasErrors)  {
            console.log("Please select at least one asset checkbox.");     // cleanup error notification that executes regardless of whether try block throws an exception
            
        }  else  {                          // if field no longer has errors:
            reqValidity = true;             // set the value budget to true
            reqErrMsg.style.display = "none";       // do not display error message
        } 
    }
    return true; 
 }

// * CH 6 * validate budget entry if project request is selected as contact reason
// entry of budget value is only required if user has selected to submit a project request
function checkBudget()  {
    var formHasErrors;                                                            // defines error indication variable
    var budgetNumField = document.getElementById("budgetNum");                    // defines budget field from within HTML
    var budgetNumElement = document.getElementById("budgetNum").value;            // defines budget number from within HTML
    var budgetErrMsg = document.getElementById("budgetErr");                      // defines location to send budget error message within HTML
    try {
        if (document.getElementById("request").checked) {
            // project request is checked but budget field is empty
            if (budgetNumElement === "")  {
                // throw "&xotime; When requesting a project, please enter an estimated budget &Lleftarrow;";
                budgetErrMsg.innerHTML = "&xotime; When requesting a project, please enter an estimated budget &Lleftarrow;";
            } 
        } 
        ////// * CH 8 * tie budget to client profile object //////
        // copy valid budget value to profile object
        profile.budget = budgetNumElement;
        // copy profile.email value to profile section
        document.getElementById("profileBudget").innerHTML = "$" + profile.budget;
        // make profile section and budget section visible
        document.getElementById("profile").style.display = "block";
        document.getElementById("budgetSection").style.display = "block";
    }  
    catch (msg) {
        budgetErrMsg.style.display = "block";       // display error message under catch handling procedure
        budgetErrMsg.innerHTML = msg;               // instructs catch handling to display in location set by budgetErrMsg variable 
        budgetNumField.style.borderColor = "red";   // warn user of missing entry by outlining field with a red border
        formValidity = false;                       // form unable to submit unless set to true
        formHasErrors = true;                       // sets up error indicator to reference for finally statement
    }
    finally  {
        if (formHasErrors)  {
            console.log("Please enter a number for estimated budget.");     // cleanup error notification that executes regardless of whether try block throws an exception
            
        }  else  {                          // if field no longer has errors:
            budgetNumElement = true;             // set the value budget to true
            budgetErrMsg.style.display = "none";
            budgetNumField.style.borderColor = "";
        } 
    }
    return true; 
} 

// * CH 6 * validate number cost estimate for older browsers 
function validateNumbers()   {
    var budgetNotNum;                                                               // initial definition for variable to use when budget entry is invalid
    var budgetNumElement = document.getElementById("budgetNum");                    // defines budget number from within HTML
    var budgetErrMsg = document.getElementById("budgetErr");                        // defines location to send budget error message within HTML
    try {  
        if (isNaN(budgetNumElement.value))  {      // checks if value entered is not a number (NaN)
        budgetNotNum = true;                                                        // gives definition to variable that argues budget entry is invalid
    } else {                                                                    // follow these rules if budget value is a number:
        budgetNumElement.style.outline = "";                                        // do not display red outline around budget entry field
        budgetErrMsg.style.display = "none";                                        // hide error message
        }
    if (budgetNotNum)   {                                                       // follow these rules if budget value is not a number:
        throw "must contain numbers only &Lleftarrow;";                             // ending of throw error message to display (applies to all number verification tasks)
        }
    }
    catch(msg)  {
        if (budgetNotNum)   {
            budgetNumElement.style.outline = "1px solid red";                       // display red outline around erroneous field
            budgetErrMsg.style.display = "block";                                   // display budget error message
            budgetErrMsg.innerHTML = "&xotime; Your proposed budget " + msg;        // beginning of budget error message (split with throw msg in case I need to add more numerical form fields...this way I can use this function twice)
            formValidity = false;                   // indicates form cannot be submitted until numerical entry requirements have been met
            console.log(msg); 
        }
    }
}

// * CH 6 * validate form as a whole: main validation function
function validateForm(evt)  {
    if (evt.preventDefault) {               // disables default behavior in modern browsers for validateForm event
        evt.preventDefault();               // prevent form from submitting
    }   else {
        evt.returnValue = false;            // prevent form from submitting in IE8
    }
    formValidity = true;                    // reset value for revalidation
    // calls to validation functions
    checkFirstName();
    checkLastName();
    checkEmail();
    checkPhone();
    checkButtons();
    checkAssets();
    checkBudget();
    validateNumbers();
    if (formValidity === true)  {           // execution of this statement is contingent on the form data passing all validation checks
        document.getElementById("errorText").innerHTML = "";            // set main error message to empty string
        document.getElementById("errorText").style.display = "none";    // do not display errorText span element
        submitForm();                       // carry out submitForm function actions
    }   else {                              // sets three statements to execute if any of the form data is invalid
        document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your contact request &Downarrow;";       // writes error message and tells it where to be displayed in HTML
        document.getElementById("errorText").style.display = "block";           // makes error text visible on the page
        window.scrollTo(0, 0);          // new scroll height to move back up to 
        //window.scrollTo(0, window.innerHeight / .4);      // moves the browser back to the top of the form (user's window height / .4) so users can see the errorText section, then examine form from the top down for errors
        console.log("Please fix all form errors.");       // inform console that errors still require attention
    }
}
// * CH 6 * actions to take once form is ready to be submitted
function submitForm() {
    window.location.href = "validate.html";                // tells browser where to lead user after form is correctly submitted
    document.getElementById("contactForm").submit();       // uses submit() method to submit the form contents manually if custom validation functions find that the data is valid
}

// creates event listeners for validation
function createEventListeners()  {
    // * CH 6 * event listener for main validation function, validateForm() 
    var form = document.getElementById("contactForm");              // creates variable referring to the second form in the document, the contact form
    if (form.addEventListener)  {                                   // if statement prioritizing event listener method for modern browsers
        form.addEventListener("submit", validateForm, false);       // creates event listener on the submit event 
    }   else if (form.attachEvent)  {                               // provides fallback for IE8
        form.attachEvent("onsubmit", validateForm);
    }
    // * CH 8 * event listener for registering assets to profile through registerAssets(event) function
    var projectItems = document.getElementsByName("projectItems");      // creates variable referring to selected asset type checkboxes
    if (projectItems[0].addEventListener) {                             // looping event listener that keeps updating based on checkbox selections
        for (var i = 0; i < projectItems.length; i++) {                 
            projectItems[i].addEventListener("change", registerAssets, false);  // if any checkboxes are checked or unchecked, run registerAssets function
        }
    } else if (projectItems[0].attachEvent) {                           // provides fallback for IE8
        for (var i = 0; i < projectItems.length; i++) {
            projectItems[i].attachEvent("onchange", registerAssets);
        }
   }
   //  * CH 8 * event listeners for name, email and budget profile display
   var fNameInput = document.getElementById("fname");                   // creates variable referring to entered first name value
   var lNameInput = document.getElementById("lname");                   // creates variable referring to entered last name value
   var emailInput = document.getElementById("email");                   // creates variable referring to entered email value
   var phoneInput = document.getElementById("phone");                   // creates variable referring to entered phone number value
   var budgetInput = document.getElementById("budgetNum");              // creates variable referring to entered budget value
   if (fNameInput.addEventListener) {                                   // if statement prioritizing event listener method for modern browsers
        // if any of the following values are changed, run appropriate function
        fNameInput.addEventListener("change", checkFirstName, false);   
        lNameInput.addEventListener("change", checkLastName, false);
        emailInput.addEventListener("change", checkEmail, false); 
        phoneInput.addEventListener("change", checkPhone, false); 
        budgetInput.addEventListener("change", checkBudget, false); 
    } else if (fNameInput.attachEvent) {                                // provides fallback for IE8
        fNameInput.attachEvent("onchange", checkFirstName);
        lNameInput.attachEvent("onchange", checkLastName);
        emailInput.attachEvent("onchange", checkEmail);
        phoneInput.attachEvent("onchange", checkPhone);
        budgetInput.attachEvent("onchange", checkBudget);
    }

}


///////////////////// MANIPULATING ARRAYS CH 8 | CONTACT FORM CLIENT PROFILE DISPLAY ///////////////////////
// Note: More code for CH 8 project is written above, woven into previously written functions to incorporate their data. These areas are notated with comments as CH 8 adjustments.

// global variables
var profile = {};       // creates an empty object that defines the client profile, where all printable inputs will be directed
var assetType = [];     // creates an empty array that is used to collect user input selections
var arrayString;        // variable used to assign assetType array to a string
var objectString;       // creates variable to assign JSON string profile object conversion to

// add design assets to profile
function registerAssets(event) {
    if (event === undefined) { // get caller element in IE8
       event = window.event;
    }
    var callerElement = event.target || event.srcElement;   // defines variable that assigns where registerLoding event should be targeted with IE8 fallback
    var assetName = callerElement.value;    // assetName variable stores the value of the checkbox that called the function
    if (callerElement.checked) { // if box has just been checked:
       // add checkbox value to asset array
       assetType.push(assetName);
       // add checkbox value to list in profile section under project request assets section
       var newAsset = document.createElement("li");
       // write new list item in the HTML using the variable that stores the checkbox value
       newAsset.innerHTML = assetName;
       // styling required to match other <p> elements (CSS doesn't apply, since new list items aren't part of the native document)
       newAsset.style.color = "#cbbc8c";
       newAsset.style.fontSize = "100%";
       // append new checked input to section parent
       document.getElementById("profileAssets").appendChild(newAsset);
       // make profile section and asset section visible
       document.getElementById("profile").style.display = "block";
       document.getElementById("assetsSection").style.display = "block";
    } else { // if box has just been unchecked
       var listItems = document.querySelectorAll("#profileAssets li");
       for (var i = 0; i < listItems.length; i++) {
          if (listItems[i].innerHTML === assetName) {
             // use splice method to remove element at index i from array (delete a single element of assetType array at current index)
             assetType.splice(i, 1); 
             // remove asset type from client profile asset list
             listItems[i].parentNode.removeChild(listItems[i]);
             break;
          }
       }
    }
 }
 
 // convert form input to strings for submission
 function convertToString() {
    // convert asset array to string
    arrayString = assetType.toString();
    // convert profile object to JSON string
    objectString = JSON.stringify(profile);
 }

 // run setup function when page finishes loading 
if (window.addEventListener)    {
    window.addEventListener("load", createEventListeners, false);
}  else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}