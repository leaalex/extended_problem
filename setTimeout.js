console.log("stART");

function setClass(){
  var testarray = document.getElementsByClassName("mengin_fbd");
  for(var i = 0; i < testarray.length; i++)
  {
      testarray[i].className = "class-to-be-added";
  }
  };

function waitForElementToDisplay(selector, time) {
      if(document.querySelector(selector)!=null) {
        // console.log("The element is displayed, you can put your code instead of this alert.")
     setClass();
        // return;
        }

          console.log("/10000 ");
          setTimeout(function() {
              waitForElementToDisplay(selector, time);
          }, time);

  }

waitForElementToDisplay(".mengin_fbd", 500);
