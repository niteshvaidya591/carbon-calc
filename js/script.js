
/******************************************************** */
  // Range slider js starts

  
const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach((wrap) => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
  });

  // setting bubble on DOM load
  setBubble(range, bubble);
});

function setBubble(range, bubble) {
  const val = range.value;

  const min = range.min || 0;
  const max =  range.max || 100;

  const offset = Number(((val - min) * 100) / (max - min));

  bubble.textContent = val;

  // yes, 14px is a magic number
  bubble.style.left = `calc(${offset}% - 14px)`;
}

/******************************************************** */

// slider ui starts

const sliders = document.querySelectorAll(".slider-ui");

sliders.forEach(slider => {
	let input = slider.querySelector("input[type=range]");
	let min = input.getAttribute("min");
	let max = input.getAttribute("max");
	let valueElem = slider.querySelector(".value");

	slider.querySelector(".min").innerText = min;
	slider.querySelector(".max").innerText = max;

	function setValueElem() {
		valueElem.innerText = input.value;
		let percent = (input.value - min) / (max - min) * 100;
		valueElem.style.left = percent + "%";
	}
	setValueElem();

	input.addEventListener("input", setValueElem);
	input.addEventListener("mousedown", () => {
		valueElem.classList.add("up");
	});
	input.addEventListener("mouseup", () => {
		valueElem.classList.remove("up");
	});
});

/******************************************************** */
// fuel range slider starts

var $range = $(".js-range-slider"),
    $input = $(".js-input"),
    instance,
    min = 0,
    max = 1000;

$range.ionRangeSlider({
    skin: "big",
    type: "single",
    min: min,
    max: max,
    from: 500,
    onStart: function(data) {
        $input.prop("value", data.from);
    },
    onChange: function(data) {
        $input.prop("value", data.from);
    }
});
/******************************************************** */

//DOM elements
const DOMstrings = {
    stepsBtnClass: 'multisteps-form__progress-btn',
    stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
    stepsBar: document.querySelector('.multisteps-form__progress'),
    stepsForm: document.querySelector('.multisteps-form__form'),
    stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
    stepFormPanelClass: 'multisteps-form__panel',
    stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
    stepPrevBtnClass: 'js-btn-prev',
    stepNextBtnClass: 'js-btn-next'
  };
  
  //remove class from a set of items
  const removeClasses = (elemSet, className) => {
    
    elemSet.forEach(elem => {
      
      elem.classList.remove(className);
      
    });
    
  };
  
  //return exect parent node of the element
  const findParent = (elem, parentClass) => {
    
    let currentNode = elem;
  
    while(! (currentNode.classList.contains(parentClass))) {
      currentNode = currentNode.parentNode;
    }
    
    return currentNode;
    
  };
  
  //get active button step number
  const getActiveStep = elem => {
    return Array.from(DOMstrings.stepsBtns).indexOf(elem);
  };
  
  //set all steps before clicked (and clicked too) to active
  const setActiveStep = (activeStepNum) => {
    
    //remove active state from all the state
    removeClasses(DOMstrings.stepsBtns, 'js-active');
    
    //set picked items to active
    DOMstrings.stepsBtns.forEach((elem, index) => {
      
      if(index <= (activeStepNum) ) {
        elem.classList.add('js-active');
      }
      
    });
  };
  
  //get active panel
  const getActivePanel = () => {
    
    let activePanel;
    
    DOMstrings.stepFormPanels.forEach(elem => {
      
      if(elem.classList.contains('js-active')) {
        
        activePanel = elem;
        
      }
      
    });
    
    return activePanel;
                                      
  };
  
  //open active panel (and close unactive panels)
  const setActivePanel = activePanelNum => {
    
    //remove active class from all the panels
    removeClasses(DOMstrings.stepFormPanels, 'js-active');
    
    //show active panel
    DOMstrings.stepFormPanels.forEach((elem, index) => {
      if(index === (activePanelNum)) {
        
        elem.classList.add('js-active');
     
        setFormHeight(elem);
        
      }
    })
    
  };
  
  //set form height equal to current panel height
  const formHeight = (activePanel) => {
    
    const activePanelHeight = activePanel.offsetHeight;
    
    DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;
    
  };
  
  const setFormHeight = () => {
    const activePanel = getActivePanel();
  
    formHeight(activePanel);
  }
  
  //STEPS BAR CLICK FUNCTION
  DOMstrings.stepsBar.addEventListener('click', e => {
    
    //check if click target is a step button
    const eventTarget = e.target;
    
    if(!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
      return;
    }
    
    //get active button step number
    const activeStep = getActiveStep(eventTarget);
    
    //set all steps before clicked (and clicked too) to active
    setActiveStep(activeStep);
    
    //open active panel
    setActivePanel(activeStep);
  });
  
  //PREV/NEXT BTNS CLICK
  DOMstrings.stepsForm.addEventListener('click', e => {
    
    const eventTarget = e.target;
    
    //check if we clicked on `PREV` or NEXT` buttons
    if(! ( (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) || (eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)) ) ) 
    {
      return;
    }
    
    //find active panel
    const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);
    
    let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);
    
    //set active step and active panel onclick
    if(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
      activePanelNum--;
    
    } else {
      
      activePanelNum++;
    
    }
    
    setActiveStep(activePanelNum);
    setActivePanel(activePanelNum);
    
  });
  
  //SETTING PROPER FORM HEIGHT ONLOAD
  window.addEventListener('load', setFormHeight, false);
  
  //SETTING PROPER FORM HEIGHT ONRESIZE
  window.addEventListener('resize', setFormHeight, false);
  
  //changing animation via animation select !!!YOU DON'T NEED THIS CODE (if you want to change animation type, just change form panels data-attr)
  /*
  const setAnimationType = (newType) => {
    DOMstrings.stepFormPanels.forEach(elem => {
      elem.dataset.animation = newType;
    })
  };
  
  //selector onchange - changing animation
  const animationSelect = document.querySelector('.pick-animation__select');
  
  animationSelect.addEventListener('change', () => {
    const newAnimationType = animationSelect.value;
    
    setAnimationType(newAnimationType);
  });*/


  /**************************************************** */
  
  // autocomplete
  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
      var a,
        b,
        i,
        val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
                  (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) {
        //up
        /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }

  /*An array containing all the searchs names in the braven:*/
  var searchs = [
    "United states",
    "United Kingdom",
    "Argentina",
    "Austria",
    "Australia",
    "Find a doctor",
    "United Arab Emirates"
  ];

  /*initiate the autocomplete function on the "homesearch" element, and pass along the countries array as possible autocomplete values:*/
  autocomplete(document.getElementById("location"), searchs);

