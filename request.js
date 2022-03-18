/* *******CH 11 AJAX******* */
// Mediamodifer Mockup API Key: ed250aab-77f9-4660-be5e-89d646a70fee
// Mock Server URL: https://stoplight.io/mocks/mediamodifier/mockup-api/5073360
// Declare XHR object and some supporting variable values

/*curl --request GET
  --url https://api.mediamodifier.com/mockups
  --header 'Content-Type: application/json' 
  --header 'api_key: ed250aab-77f9-4660-be5e-89d646a70fee'
*/

/*var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://api.mediamodifier.com/mockups"; */


// function to handle the response if the request is successful
function loadMockup()  {
    // creates the XML HTTP Request object
    var xhttp = new XMLHttpRequest();
    // sets up the callback function for a potential successful call
    xhttp.onreadystatechange = function()  {
        // these two conditions must be true to be able to handle the rest of the response
        if (this.readyState === 4 && xhttp.status === 200)  {
            var responseObject = JSON.parse(this.responseText);
            var mockupURL = responseObject.mockups;
            document.getElementById("mockupDisplay").src = mockupURL;
        }
    };
    // this opens the connection to the XHR object's remote destination (API end point)
    // xhttp.open("GET", "https://api.mediamodifier.com/", true);
    xhttp.open("get", "mockup.php?", true);

    // sets API key and JSON handler
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("api_key", "ed250aab-77f9-4660-be5e-89d646a70fee");

    // this is what sends the request
    xhttp.send();
}



///////////////////////////////////////////
/* *******CH 7 Object-Oriented JS******* */

// custom object constructor
function Business(name, industry, phone, website)   {   // assigns input element variables as parameters
    this.bizName = name;
    this.bizIndustry = industry;
    this.bizPhone = phone;
    this.bizSite = website;
}

function createCard()   {
    // defines variables that grab the entered values of each input tag
    var bizName = document.getElementById("txt_name").value;
    var bizIndustry = document.getElementById("txt_industry").value;
    var bizPhone = document.getElementById("txt_phone").value;
    var bizSite = document.getElementById("txt_website").value;
    // creates a new business card object and stores the reference to it in addBusiness
    addBusiness = new Business(bizName, bizIndustry, bizPhone, bizSite);
    // display the user's business information on the page by adding to the grid display
    createDisplay(addBusiness); 
}

// displays any business object to a new document node on the page
function createDisplay(business)    {       // creates a new object with the argument of business
    // creates new object div element (document fragment)
    var fragment = document.createElement("div");
    // adds the newObject class name to the div element
    var classAttrib = document.createAttribute("class");
    classAttrib.value = "newObject";
    // sets the class attribute to the div fragment
    fragment.setAttributeNode(classAttrib);

    // puts the business object information inside the div tag innerHTML property to be displayed on the page
    fragment.innerHTML = business.bizName + "<br>" +
                         business.bizIndustry + "<br>" +
                         business.bizPhone + "<br>" +
                         business.bizSite;
    
    // appends new document fragment to div already written in HTML
    document.getElementById("businessDisplay").appendChild(fragment);   

    // expands page with each new added document fragment, since these connected nodes aren't part of the document and so it won't expand on its own
    // generates empty DOM elements to create space between the footer and newly generated divs
    var space = document.createElement("div");      // defines variable that creates an empty div
    space.style.height = "10px";                    // 10px of empty space
    document.getElementById("dynamicContent").appendChild(space);   // adds empty space to the bottom of main section
}



/////////////////////////////////////////////////////
// Design Requests Pricing Estimator (previous class)

// global variables
// first three variables are for reference in function resetForm() to set all form field values to defaults
var logo = false;
var social = false;
var ui = false;

// declaring the arrays
// the following arrays list option values according to their respected dropdown menu options and assign them numerical values
var bCardPrices = new Array();			// creates empty array for business card prices
    bCardPrices["0"]=0;					// defines null "placeholder" value for default array element
    bCardPrices["25"]=110;				// assigns a value of $120 to the input of 25 business cards
    bCardPrices["50"]=120;
    bCardPrices["100"]=140;
    bCardPrices["200"]=180;
    bCardPrices["300"]=220;
    bCardPrices["400"]=260;
    bCardPrices["500"]=300;
    bCardPrices["1000"]=400;
    bCardPrices["2000"]=800;
    bCardPrices["5000"]=2000;

var webDesignPrices = new Array();		// creates empty array for web design prices
    webDesignPrices["0"]=0;			// defines null "placeholder" value for default array element
    webDesignPrices["Page1"]=200;		// assigns a value of $200 to the input of one landing page
    webDesignPrices["Page2"]=400;
    webDesignPrices["Page3"]=600;
    webDesignPrices["Page4"]=800;
    webDesignPrices["Page5"]=1000;
    webDesignPrices["Page6"]=1200;
    webDesignPrices["Page7"]=1400;
    webDesignPrices["Page8"]=1600;
    
var newsletterPrices = new Array();		// creates empty array for newsletter prices
    newsletterPrices["0"]=0;			// defines null "placeholder" value for default array element
    newsletterPrices["Edition1"]=350;	// assigns a value of $350 to the input of one newsletter edition
    newsletterPrices["Edition2"]=700;
    newsletterPrices["Edition3"]=1050;
    newsletterPrices["Edition6"]=2100;
    newsletterPrices["Edition12"]=4200;

var modelPrices = new Array();			// creates empty array for 3D model prices
    modelPrices["0"]=0;				// defines null "placeholder" value for default array element
    modelPrices["Simple1"]=200;			// assigns a value of $200 to the input of one simple 3D model asset
    modelPrices["Simple5"]=900;
    modelPrices["Complex1"]=400;
    modelPrices["Complex5"]=1900;

// Array Functions
// these functions define the relationship of each array with their elements' input quantity

// function associating Business Card price listed in array with user-entered quantity of desired business cards
function getBcardPrice()  {
    var bCardCost = 0;		// sets the main variable that is given back from the price function
    var theForm = document.forms["costEstimator"];		// calls the form where this element can be found
    var selectedCardQuantity = theForm.elements["bCardDesign"];		// defines the quantitative variable and calls the specific element to pull it from
    bCardCost = bCardPrices[selectedCardQuantity.value];		// instructions for the main variable to pull selected input value from the array
    return bCardCost;		// instructions to return results to the pricing function
}

// function associating Website price listed in array with user-entered quantity of desired web pages
function getWebPrice()  {
    var webCost = 0;
    var theForm = document.forms["costEstimator"];
    var selectedPageQuantity = theForm.elements["webDesign"];
    webCost = webDesignPrices[selectedPageQuantity.value];
    return webCost;
}

// function associating Newsletter price listed in array with user-entered quantity of desired editions
function getNewsletterPrice()  {
    var newsletterCost = 0;
    var theForm = document.forms["costEstimator"];
    var selectedEditionQuantity = theForm.elements["newsletterDesign"];
    newsletterCost = newsletterPrices[selectedEditionQuantity.value];
    return newsletterCost;
}

// function associating 3D Model price listed in array with user-entered quantity of desired assets based upon their complexity
function getModelPrice()  {
    var modelCost = 0;
    var theForm = document.forms["costEstimator"];
    var selectedAssetQuantity = theForm.elements["modelDesign"];
    modelCost = modelPrices[selectedAssetQuantity.value];
    return modelCost;
}

// Checkbox Functions
// these functions provide control flow statements to determine whether to include set price, based on whether the user checked the box

// function creating loop statement that detects whether or not to include logo design price in total cost
function logoPrice()  {   
    var logoCost = 0;		// sets the main variable that is given back from the price function
    var theForm = document.forms["costEstimator"];		// calls the form where this element can be found
    var includeLogo = theForm.elements["logoDesign"];		// defines the Boolean variable and calls the specific element to pull it from
    if (includeLogo.checked == true) {				// instructions to execute as long as the called condition comes back as a truthy value
        logoCost = 200;			// sets amount to assign to pricing function, should the loop come back true
    };
    return logoCost;		// instructions to return results to the pricing function
}

// function creating loop statement that detects whether or not to include social media campaign price in total cost
function socialPrice()  {   
    var socialCost = 0;
    var theForm = document.forms["costEstimator"];
    var includeSocial = theForm.elements["socialDesign"];
    if (includeSocial.checked == true) {
        socialCost = 900;
    };
    return socialCost;
}

// function creating loop statement that detects whether or not to include user interface design price in total cost
function uiPrice()  {   
    var uiCost = 0;
    var theForm = document.forms["costEstimator"];
    var includeUI = theForm.elements["uiDesign"];
    if (includeUI.checked == true) {
        uiCost = 1250;
    };
    return uiCost;
}

// function bringing the combination of Array and Boolean functions together as one, seamlessly calculated variable
function calcTotal()  {
    var designPrice = getWebPrice() + getNewsletterPrice() + getModelPrice() + getBcardPrice() + logoPrice() + socialPrice() + uiPrice();
    document.getElementById("estimate").innerHTML = "$" + designPrice;		// instructions to deliver calculated result to be displayed in HTML with called ID
}

// sets all form field values to defaults on refresh
function resetForm() {
    document.getElementById("logoDesign").checked = logo;		    // refers to global variable value of 'false', or unchecked, for reset value
    document.getElementById("uiDesign").checked = ui; 
    document.getElementById("socialDesign").checked = social;		
    var dropDown = document.getElementsByClassName("dropdown");     // places input value back at 0 to reset value on refresh
    dropDown.selectedIndex = 0;
    calcTotal();												    // resets total calculation along with entered values
}

// resets form when page is reloaded with a conditional if/else if statement that provides backward compatibility for IE8
if (window.addEventListener)  {							// default statement that calls resetForm function on page load in modern browsers
    window.addEventListener("load", resetForm, false);
} else if (window.attachEvent)  {						// conditional statement that provides fallback for IE8
    window.attachEvent("onload", resetForm);
}

