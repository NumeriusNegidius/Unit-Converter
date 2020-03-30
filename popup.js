"use strict";

const MAX_INTEGER = 15;
const MAX_DECIMALS = 10;
const MIN_DECIMALS = 0;
var decimals = 2;
var sortOrder = 0;

// ELEMENT MANIPULATION FUNCTIONS/SHORTHANDS
function l10n(text, arg) {
  return browser.i18n.getMessage(text.toString(), arg);
}

function getEl(element) {
  return document.getElementById(element);
}

function createEl(elType, appendToEl, text, cssClass) {
  let element = document.createElement(elType);
  if (text) {
    element.textContent = text;
  }
  if (cssClass) {
    element.className = cssClass;
  }
  appendToEl.appendChild(element);

  return element;
}

function hideEl(element) {
  element.style.display = "none";
}

function showEl(element) {
  element.style.display = "block";
}

function emptyEl(element) {
  while (element.firstChild) {
    element.firstChild.remove();
  }
}

// MAKE VARIABLES OF AV ELEMENTS USED
var elSelectorSelected = getEl("selectorSelected");
var elSelector = getEl("selector");
var elSelectorVeil = getEl("selectorVeil");
var elSelectorList = getEl("selectorList");
var elSelectorClose = getEl("selectorClose");
var elSelectorFilter = getEl("selectorFilter");
var elSelectorFilterReset = getEl("selectorFilterReset");
var elSort0 = getEl("sort0");
var elSort1 = getEl("sort1");
var elUnit = getEl("unit");
var elKeepHidableShown = getEl("keepHidableShown");
var elValue = getEl("value");
var elValueReset = getEl("valueReset");
var elInput = getEl("input");
var elOutput = getEl("output");
var elShowHidden = getEl("showHidden");
var elTools = getEl("tools");
var elDecimalsLabel = getEl("decimalsLabel");
var elDecimalsAdd = getEl("decimalsAdd");
var elDecimalsSubtract = getEl("decimalsSubtract");
var elDisclaimerDismiss = getEl("disclaimerDismiss");
var elDisclaimerText = getEl("disclaimerText");
var elPopup = getEl("popup");

function round(val, decimals) {
  return Number.parseFloat(val).toFixed(decimals);
}

function executeCalc() {
  let inUnit = elUnit.value;
  let inValue = elValue.value;

  emptyEl(elOutput);
  hideEl(elTools);
  hideEl(elShowHidden);

  if (inUnit && inValue) {
    // Calculate inValue if entered as a fraction
    if (inValue.indexOf("/") > 0) {
      let numerator = inValue.split("/")[0];
      let denominator = inValue.split("/")[1];
      inValue = parseFloat(numerator) / parseFloat(denominator);
    }

    if (inValue.toString().length > MAX_INTEGER) {
      inValue = parseFloat(inValue).toExponential().toString();
    }

    // Only execute if input value is a number, is safe and is finite
    if (isNaN(parseFloat(inValue))) {
      console.log("[UNIT CONVERTER] No result: " + inValue + " is NaN");

    } else if (!Number.isSafeInteger(parseInt(inValue))) {
      console.log("[UNIT CONVERTER] No result: Input number is not safe (too big)");

    } else if (!Number.isFinite(parseFloat(inValue))) {
      console.log("[UNIT CONVERTER] No result: Input number is not finite");

    } else {
      let inUnitIndex = conversions.findIndex(function(item){
        return item.unit === inUnit;
      });

      let category = conversions[inUnitIndex].category;
      if (conversions[inUnitIndex].addToSIbase) {
        inValue = parseFloat(inValue) - parseFloat(conversions[inUnitIndex].addToSIbase);
      }
      let inValueInSIbase = inValue * conversions[inUnitIndex].toSIbase;

      if (parseFloat(inValue) == 0 && !conversions[inUnitIndex].allowZero) {
        console.log("[UNIT CONVERTER] No result: Input number is 0");
      } else {
        showEl(elOutput);
        showEl(elTools);
        setStorage();

        var previousOutSystem;
        var countUnitsHidden = 0;
        // Create conversion list
        for (let i = 0; i < conversions.length; i++) {
          if (conversions[i].category.includes(category)) {

            // Get conversion data and do the math
            let outUnit = conversions[i].unit;
            let outUnitTag = conversions[i].tag;
            let outSystem = conversions[i].system;
            let addToSIbase = conversions[i].addToSIbase;
            let allowZero = conversions[i].allowZero;
            let unroundedProduct = (1 / conversions[i].toSIbase) * inValueInSIbase;
            if (conversions[i].addToSIbase) {
              unroundedProduct = unroundedProduct + conversions[i].addToSIbase;
            }
            let product = round(unroundedProduct, decimals);

            // Don't show input unit among output conversions
            if (elUnit.value != outUnit) {
              let outInteger, outDecimals;

              let productSign = Math.sign(product);     // Whether positive or negative. Returns 1 or -1
              let productArray = product.split(".");    // Split at decimal point

              //Convert to Esperanto, since it uses " " as thousands separator
              outInteger = parseInt(productArray[0]).toLocaleString("eo").replace(/-/g, "");

              if (productArray.length > 0) {
                outDecimals = productArray[1];
              }

              // Make wrapper + heading for each system
              var countUnitsInSystem;
              var elSystemGroup;
              if (outSystem != previousOutSystem) {
                elSystemGroup = createEl("DIV", elOutput, null, "systemGroup"); // Wrapper div for system
                elSystemGroup.id = outSystem;

                let elSystem = createEl("DIV", elSystemGroup, l10n(outSystem), "system"); // System heading

                // Count potential units in system, regardless of visibility
                let getUnitsInSystem = conversions.filter(function(data) {
                  return data.category === category && data.system === outSystem && data.unit != inUnit;
                });
                countUnitsInSystem = getUnitsInSystem.length;
              }

              // Make wrapper + unit descriptor + conversion product divs for each conversion
              let elConversionRow = createEl("DIV", elSystemGroup, null, "conversion");
              let elConversionUnit = createEl("DIV", elConversionRow, l10n(outUnit), "conversionUnit");
              let elConversionProduct = createEl("DIV", elConversionRow, null, "conversionProduct");

              for (let n = 0; n < outUnitTag.length; n++) {
                let elConversionUnitTag = createEl("SPAN", elConversionUnit, l10n(outUnitTag[n]), "systemTag");
              }

              // Hide conversions that are unsafe that are unsafe ...or 0 with current decimal settings are hidden by default
              if (!Number.isSafeInteger(Math.round(product))) {
                countUnitsInSystem--;
                countUnitsHidden++;

                let elError = createEl("SPAN", elConversionProduct, l10n("errorTooLarge"), "errorInfo");
                elConversionRow.classList.add("hidable");
                if (elKeepHidableShown.value == "1") {
                  elConversionRow.classList.add("shown");
                }

              // Hide conversions that equals 0 with max decimals shown, unless 0 if acceptable (e.g. degrees)
              } else if (round(unroundedProduct, MAX_DECIMALS) == 0 && !allowZero) {
                countUnitsInSystem--;
                countUnitsHidden++;

                let elError = createEl("SPAN", elConversionProduct, l10n("errorTooSmall"), "errorInfo");
                elConversionRow.classList.add("hidable");
                if (elKeepHidableShown.value == "1") {
                  elConversionRow.classList.add("shown");
                }

              // Hide conversions that equals 0 with current decimal settings, unless 0 if acceptable (e.g. degrees)
              } else if (product == 0 && !allowZero) {
                countUnitsInSystem--;
                countUnitsHidden++;

                let elError = createEl("SPAN", elConversionProduct, l10n("errorTooFewDecimals"), "errorInfo");
                elConversionRow.classList.add("hidable");
                if (elKeepHidableShown.value == "1") {
                  elConversionRow.classList.add("shown");
                }

              // Show conversions
              } else {
                elConversionRow.classList.add("copyable");  // Add copy style
                elConversionRow.dataset.copyText = product; // Add copy data

                if (productSign == -1) {
                  let elNegativeSign = createEl("SPAN", elConversionProduct, "−", "negative");
                }

                let elInteger = createEl("SPAN", elConversionProduct, outInteger);
                if (outInteger == 0) {
                  elInteger.classList.add("deemphasize");
                }

                if (decimals > 0) {
                  let elDecimals = createEl("SPAN", elConversionProduct, "." + outDecimals);
                  if (outDecimals == 0) {
                    elDecimals.classList.add("deemphasize");
                  }
                }
              }

              previousOutSystem = outSystem;

              // Hide system group if it has no visible conversions, unless "Show hidden" button is clicked
              if (countUnitsInSystem == 0 && keepHidableShown.value == "0") {
                getEl(outSystem).classList.add("hidable");
              }
            }
          }
        }

        handleHiddenUnits(countUnitsHidden);
        handleCopyButtons();
      }
    }
  }
}

// If result includes hidden conversions, add a button to show them
// and set a hidden value to remember until popup is closed or another unit is selected
function handleHiddenUnits(countUnitsHidden) {
  if (countUnitsHidden > 0 && keepHidableShown.value == "0") {
    showEl(elShowHidden);
    elOutput.classList.add("whenHiddenButton");

    elShowHidden.textContent = l10n("hiddenConversions", countUnitsHidden);

    elShowHidden.addEventListener("click", function() {
      hideEl(elShowHidden);
      elOutput.classList.remove("whenHiddenButton");
      if (elKeepHidableShown.value == "0") {
        elKeepHidableShown.value = 1;
      } else {
        elKeepHidableShown.value = 0;
      }

      let elResults = document.getElementsByClassName("hidable");
      for (let i = 0; i < elResults.length; i++) {
        elResults[i].classList.add("shown");
      }
    });
  }
}

// Create notification + event listeners for each valid result so that the value can be copied
function handleCopyButtons() {
  let elCopySpans = document.getElementsByClassName("conversion");

  for (let i = 0; i < elCopySpans.length; i++) {
    elCopySpans[i].addEventListener("click", function() {
      if (this.dataset.copyText) {
        let copyBuffer = createEl("TEXTAREA", elOutput, this.dataset.copyText, "copyBuffer");
        elPopup.className = "popupCopy"
        setTimeout(function(){
          elPopup.classList.remove("popupCopy");
        }, 2000);
        copyBuffer.select();
        document.execCommand("copy");
        output.removeChild(copyBuffer);
      }
    });
  }
}

// Show closed selector and set hidden value
function setSelectorSelectedText(selectedUnit) {
  let unitIndex = conversions.findIndex(function(item){
    return item.unit === selectedUnit;
  });
  let category = conversions[unitIndex].category;
  let tags = conversions[unitIndex].tag;

  elUnit.value = selectedUnit;

  elSelectorSelected.textContent = l10n(selectedUnit);
  for (let n = 0; n < tags.length; n++) {
    let elSelectorUnitTag = createEl("SPAN", elSelectorSelected, l10n(tags[n]), "systemTag");
  }
  let elUnitName = createEl("SPAN", elSelectorSelected, " | " + l10n(category) + "");
}

// Sort {conversions} by category and localized unit name
// By creating an array with conversion positions in order
function sortConversions() {
  var tempArray = [];     // Array used for each category
  var sortedArray = [];   // Concatenated array used for all, sorted by category, name

  for (let i = 0; i < conversions.length; i++) {       // Iterate through all conversions
    let data = l10n(conversions[i].unit) + "|" + i     // Create a localized entry + position separated by |
    tempArray.push(data);

    if (i < conversions.length -1) {
      if (conversions[i].category != conversions[i+1].category) {  // If next category is not same as current...
        tempArray.sort();                                          // ...Sort all entries in category
        sortedArray = sortedArray.concat(tempArray);               // ...Add them to the bigger array
        tempArray = [];                                            // ...Empty the array
      }
    } else if (i = conversions.length) {                           // The above applies for the last conversion in category
      tempArray.sort();
      sortedArray = sortedArray.concat(tempArray);
      tempArray = [];
    }
  }

  var finalArray = [];
  for (let i = 0; i < sortedArray.length; i++) {              // Iterate through the sorted array
    finalArray.push(parseInt(sortedArray[i].split("|")[1]));  // Create a new array with only positions
  }
  return finalArray;
}

function setSortOrderCheckmark() {
  if (sortOrder == 0) {
    elSort0.classList.add("selected");
    elSort1.classList.remove("selected");
  } else if (sortOrder == 1) {
    elSort0.classList.remove("selected");
    elSort1.classList.add("selected");
  }
}

// Populate selector list
function populateSelector(selectedUnit, filterText) {
  if (selectedUnit) {
    setSelectorSelectedText(selectedUnit);
  }

  // Empty list first...
  let elSelectorChild = elSelectorList.lastElementChild;
  while (elSelectorChild) {
    elSelectorList.removeChild(elSelectorChild);
    elSelectorChild = elSelectorList.lastElementChild;
  }

  let sortedConversions = sortConversions();
  setSortOrderCheckmark();

  // ...then populate list
  let previousCategory;
  for (let i = 0; i < conversions.length; i++) {
    let sortedI;
    if (sortOrder == 0) {
      sortedI = i;
    } else if (sortOrder == 1) {
      sortedI = sortedConversions[i];
    }

    let unitDict = l10n(conversions[sortedI].unit) + " "  // Localized unit name
                 + l10n(conversions[sortedI].category) + " " // Localized category name
                 + l10n(conversions[sortedI].unit.toString() + "Dict"); // Localized unit dictionary
    if (!filterText || unitDict.toLowerCase().search(filterText.toLowerCase()) > -1) {
      if (previousCategory != conversions[sortedI].category) {
        let elSelectorCategory = createEl("DT", elSelectorList, l10n(conversions[sortedI].category));
      }
      let elSelectorUnit = createEl("DD", elSelectorList, l10n(conversions[sortedI].unit));
      elSelectorUnit.dataset.unit = conversions[sortedI].unit;

      let tags = conversions[sortedI].tag;
      for (let n = 0; n < tags.length; n++) {
        let elSelectorUnitTag = createEl("SPAN", elSelectorUnit, l10n(tags[n]), "systemTag");
      }

      setSelectorCheckmark(selectedUnit);
      previousCategory = conversions[sortedI].category;
    }
  }
  if (filterText) {
    elSelectorList.scrollTop = 0;
  }

  // Create Event Listeners for each unit in the selector
  let elSelectorValues = document.getElementsByTagName("DD");
  for (let i = 0; i < elSelectorValues.length; i++) {
    elSelectorValues[i].addEventListener("click", function() {
      elUnit.value = elSelectorValues[i].dataset.unit;

      setSelectorSelectedText(elUnit.value);
      closeSelector();
      executeCalc();
    });
  }
}

function setSelectorCheckmark(selectedUnit) {
  let elSelectorValues = document.getElementsByTagName("DD");
  for (let i = 0; i < elSelectorValues.length; i++) {
    if (elSelectorValues[i].dataset.unit != selectedUnit) {
      elSelectorValues[i].removeAttribute("id");
    } else {
      elSelectorValues[i].id = "checked";
    }
  }
}

function changeDecimals(step) {
  if (decimals + step >= MIN_DECIMALS && decimals + step <= MAX_DECIMALS) {
    decimals = decimals + step;

    if (decimals == MIN_DECIMALS) {
      elDecimalsSubtract.disabled = true;
    }
    else {
      elDecimalsSubtract.disabled = false;
    }

    if (decimals == MAX_DECIMALS) {
      elDecimalsAdd.disabled = true;
    }
    else {
      elDecimalsAdd.disabled = false;
    }
    executeCalc();
  }
}

function onFilter() {
  let selectedUnit = ""
  if (elUnit.value) {
    selectedUnit = elUnit.value;
  }

  if (elSelectorFilter.value.length > 0) {
    showEl(elSelectorFilterReset);
  }
  else {
    hideEl(elSelectorFilterReset);
  }

  populateSelector(selectedUnit, elSelectorFilter.value);
}

// Sanitize value input
function onInput() {
  // Allowed characters in input value: "0-9", ".", "/", "-"
  let caret = elValue.selectionStart;
  let refVal = elValue.value;
  let returnVal = elValue.value.replace(/[^\-\d./]/g, "");

  // If entered or pasted input contains non-allowed characters, position the
  // caret to right after allowed input
  if (refVal.length > returnVal.length) {
    caret = caret - (refVal.length - returnVal.length);
  }

  // If entered or pasted input contains more than 1 ".", remove all but the
  // first and position the caret to right after allowed input
  let posFirstPoint = returnVal.indexOf(".");
  if (returnVal.split(".").length > 2) {
    returnVal = returnVal.substr(0, posFirstPoint + 1)
              + returnVal.substr(posFirstPoint + 1).replace(/\./g, "");
    caret--;
  }

  // If entered or pasted input contains "/", don't allow it to be the first
  // character. Then remove all but one of them (the first), and position the
  // caret to where it were
  let posFirstDivider = returnVal.indexOf("/");
  if (posFirstDivider == 0) {
    returnVal = returnVal.substr(1);
    caret--;
  }
  if (returnVal.split("/").length > 2) {
    returnVal = returnVal.substr(0, posFirstDivider + 1)
              + returnVal.substr(posFirstDivider + 1).replace(/\//g, "");
    caret--;
  }

  // If entered or pasted input contains "-", only allow it to be the first
  // character. Then remove all but the first, and position the caret to where
  // it were
  let posFirstMinus = returnVal.indexOf("-");
  if (posFirstMinus > 0) {
    returnVal = returnVal.replace(/-/g, "");
    caret--;
  }
  else if (returnVal.split("-").length > 2) {
    returnVal = returnVal.substr(0, 1)
              + returnVal.substr(1).replace(/-/g, "");
    caret--;
  }

  // Update the input value field and position the caret
  elValue.value = returnVal;
  elValue.setSelectionRange(caret, caret);

  if (elValue.value.length > 0) {
    showEl(elValueReset);
  }
  else {
    hideEl(elValueReset);
    hideEl(elOutput);
  }
}

function setSortOrder(sortId) {
  sortOrder = sortId;
  setStorage();

  let selectedUnit = ""
  if (elUnit.value) {
    selectedUnit = elUnit.value;
  }
  populateSelector(selectedUnit);
}

function setStorage() {
  browser.storage.local.set({
    value: elValue.value,
    unit: elUnit.value,
    decimals: decimals,
    sortOrder: sortOrder,
    timestamp: Date.now()
  });
}

function openSelector() {
  showEl(elSelector);
  showEl(elSelectorVeil);
  hideEl(elSelectorSelected);
  hideEl(elTools);
  hideEl(elOutput);
  hideEl(elShowHidden);
  keepHidableShown.value = 0;

  elInput.classList.add("whenSelectorOpen");

  elSelectorFilter.focus();

  // Scroll elSelectorList so that selected unit is visible
  let elChecked = getEl("checked");
  if (elChecked) {
    elSelectorList.scrollTop = elChecked.offsetTop - 150;
  }
}

function closeSelector() {
  showEl(elSelectorSelected);
  hideEl(elSelector);
  hideEl(elSelectorVeil);
  showEl(elOutput);
  executeCalc();

  elSelectorFilter.value = "";
  elInput.classList.remove("whenSelectorOpen");
  elValue.focus();
  populateSelector(elUnit.value);
}

function initialize() {
  // Localize
  elSelectorSelected.textContent = l10n("selectorText");
  elValue.placeholder = l10n("inputPlaceholder");
  elSelectorFilter.placeholder = l10n("filterPlaceholder");
  elDecimalsLabel.textContent = l10n("decimals");
  elDisclaimerText.textContent = l10n("disclaimer");

  // Get values from last selected
  let getStorage = browser.storage.local.get();

  getStorage.then((response) => {
    if (response.decimals > -1) {
      decimals = response.decimals;
    }

    if (response.sortOrder > -1) {
      sortOrder = response.sortOrder;
    }

    if (response.hideDisclaimer) {
      hideEl(disclaimer);
    }

    if (response.unit) {
      populateSelector(response.unit);
    } else {
      populateSelector();
    }

    if (response.value) {
      elValue.value = response.value;
      showEl(elValueReset);
    }

    if (response.unit && response.value) {
      executeCalc();
    }
  });

  elValue.focus();
}

window.onload = function() {
  initialize();
};

elValue.addEventListener("input", function() {
  onInput();
  executeCalc();
});

elSelectorFilter.addEventListener("input", function() {
  onFilter();
})

elSelectorSelected.addEventListener("click", function() {
  openSelector();
});

elSelectorSelected.addEventListener("contextmenu", function(e) {
  e.preventDefault();
  openSelector();
});

elSelectorClose.addEventListener("click", function() {
  closeSelector();
});

elSelectorVeil.addEventListener("click", function() {
  closeSelector();
});

elDecimalsAdd.addEventListener("click", function() {
  changeDecimals(1);
});

elDecimalsSubtract.addEventListener("click", function() {
  changeDecimals(-1);
});

elSort0.addEventListener("click", function() {
  setSortOrder(0);
});

elSort1.addEventListener("click", function() {
  setSortOrder(1);
});

elValueReset.addEventListener("click", function() {
  elValue.value = "";
  elValue.focus();
  setStorage();
  emptyEl(elOutput);
  hideEl(elOutput);
  hideEl(elValueReset);
  hideEl(elTools);
  hideEl(elShowHidden);
});

elSelectorFilterReset.addEventListener("click", function() {
  elSelectorFilter.value = "";
  elSelectorFilter.focus();
  onFilter();
});

elDisclaimerDismiss.addEventListener("click", function() {
  hideEl(disclaimer);

  browser.storage.local.set({
    hideDisclaimer: true
  });
});
