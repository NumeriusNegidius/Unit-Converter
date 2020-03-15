"use strict";

const MAX_INTEGER = 15;
const MAX_DECIMALS = 10;
const MIN_DECIMALS = 0;
var decimals = 2;

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

    emptyEl(elOutput);
    hideEl(elTools);

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
        inValue = parseFloat(inValue) + parseFloat(conversions[inUnitIndex].addToSIbase);
      }
      let inValueInSIbase = inValue * conversions[inUnitIndex].toSIbase;

      if (parseFloat(inValue) == 0 && !conversions[inUnitIndex].allowZero) {
        console.log("[UNIT CONVERTER] No result: Input number is 0");
      } else {
        showEl(elOutput);
        showEl(elTools);
        setStorage();

        let previousOutSystem;
        let countUnitsHidden = 0;
        // Create conversion list
        for (let i = 0; i < conversions.length; i++) {
          if (conversions[i].category.includes(category)) {

            // Get conversion data and do the math
            let outUnit = conversions[i].unit;
            let outSystem = conversions[i].system;
            let addFromSIbase = conversions[i].addFromSIbase;
            let allowZero = conversions[i].allowZero;
            let unroundedProduct = (1 / conversions[i].toSIbase) * inValueInSIbase;
            if (conversions[i].addFromSIbase) {
              unroundedProduct = unroundedProduct + conversions[i].addFromSIbase;
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

              // Make category heading row + spacer row above
              // Also count potential units in system
              var countUnitsInSystem;
              if (outSystem != previousOutSystem) {
                let elSystem = createEl("DIV", elOutput, l10n(outSystem), "system");
                elSystem.id = outSystem;

                let getUnitsInSystem = conversions.filter(function(data) {
                  return data.category === category && data.system === outSystem && data.unit != inUnit;
                });
                countUnitsInSystem = getUnitsInSystem.length;
              }

              // Make conversion row
              let elConversionRow = createEl("DIV", elOutput, null, "conversion");
              let elConversionUnit = createEl("DIV", elConversionRow, l10n(outUnit), "conversionUnit");
              let elConversionProduct = createEl("DIV", elConversionRow, null, "conversionProduct");

              // Conversions that are unsafe or 0 with current decimal settings are hidden by default
              if (!Number.isSafeInteger(Math.round(product))) {
                countUnitsInSystem--;
                countUnitsHidden++;

                let elError = createEl("SPAN", elConversionProduct, l10n("errorTooLarge"), "errorInfo");
                elConversionRow.classList.add("hidable");
                if (elKeepHidableShown.value == "1") {
                  elConversionRow.classList.add("shown");
                }

              } else if (round(unroundedProduct, MAX_DECIMALS) == 0 && !allowZero) {
                countUnitsInSystem--;
                countUnitsHidden++;

                let elError = createEl("SPAN", elConversionProduct, l10n("errorTooSmall"), "errorInfo");
                elConversionRow.classList.add("hidable");
                if (elKeepHidableShown.value == "1") {
                  elConversionRow.classList.add("shown");
                }

              } else if (product == 0 && !allowZero) {
      // console.log("WHADDABOUT DEGREES?");
                countUnitsInSystem--;
                countUnitsHidden++;

                let elError = createEl("SPAN", elConversionProduct, l10n("errorTooFewDecimals"), "errorInfo");
                elConversionRow.classList.add("hidable");
                if (elKeepHidableShown.value == "1") {
                  elConversionRow.classList.add("shown");
                }

              } else {
                // Add copy style and copy data
                elConversionRow.classList.add("copyable");
                elConversionRow.dataset.copyText = product;

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
              handleHiddenSystems(outSystem, countUnitsInSystem);
              previousOutSystem = outSystem;
            }
          }
        }

        handleHiddenUnits(countUnitsHidden);
        handleCopyButtons();
      }
    }
  }
}

function handleHiddenSystems(outSystem, countUnitsInSystem) {
  if (countUnitsInSystem == 0 && keepHidableShown.value == "0") {
    let elSystem = getEl(outSystem);
    getEl(outSystem).classList.add("hidable");
  }
}

function handleHiddenUnits(countUnitsHidden) {
  if (countUnitsHidden > 0 && keepHidableShown.value == "0") {
    showEl(elShowHidden)
    elShowHidden.textContent = l10n("hiddenConversions", countUnitsHidden);

    elShowHidden.addEventListener("click", function() {
      hideEl(elShowHidden);
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

// THIS IS THE FAUX SELECT DROPDOWN IN CLOSED STATE
function setSelectorSelectedText(select) {
  let unitIndex = conversions.findIndex(function(item){
    return item.unit === select;
  });
  let selectorUnit = select;
  let selectorCategory = conversions[unitIndex].category;

  elUnit.value = selectorUnit;
  elSelectorSelected.textContent = l10n(selectorUnit) + " (" + l10n(selectorCategory) + ")";
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

function populateSelector(select, filterText) {
  if (select) {
    setSelectorSelectedText(select);
  }

  // Empty list first...
  let elSelectorChild = elSelectorList.lastElementChild;
  while (elSelectorChild) {
    elSelectorList.removeChild(elSelectorChild);
    elSelectorChild = elSelectorList.lastElementChild;
  }

  // ...then populate list
  let previousCategory = "";
  for (let i = 0; i < conversions.length; i++) {

    let elSelectorUnit;
    if (filterText) {
      let unitDict = ""
      unitDict += l10n(conversions[i].unit) + " ";
      unitDict += l10n(conversions[i].category) + " ";
      unitDict += l10n(conversions[i].unit.toString() + "Dict");

      if (unitDict.toLowerCase().search(filterText.toLowerCase()) > -1) {
        if (previousCategory != conversions[i].category) {
          let elSelectorCategory = createEl("DT", elSelectorList, l10n(conversions[i].category));
        }
        elSelectorUnit = createEl("DD", elSelectorList, l10n(conversions[i].unit));
        markSelector(select);
        elSelectorUnit.dataset.unit = conversions[i].unit;
        previousCategory = conversions[i].category;
      }
    } else {
      if (previousCategory != conversions[i].category) {
        let elSelectorCategory = createEl("DT", elSelectorList, l10n(conversions[i].category));
      }
      elSelectorUnit = createEl("DD", elSelectorList, l10n(conversions[i].unit));
      elSelectorUnit.dataset.unit = conversions[i].unit;
      markSelector(select);
      previousCategory = conversions[i].category;
    }
  }

  // Create Event Listeners for each option
  let elSelectorValues = document.getElementsByTagName("DD");
  for (let i = 0; i < elSelectorValues.length; i++) {
    elSelectorValues[i].addEventListener("click", function() {
      elUnit.value = elSelectorValues[i].dataset.unit;

      setSelectorSelectedText(elUnit.value);
      markSelector(elUnit.value);
      closeSelector();
      executeCalc();
    });
  }
}

function markSelector(select) {
  let elSelectorValues = document.getElementsByTagName("DD");
  for (let i = 0; i < elSelectorValues.length; i++) {
    if (elSelectorValues[i].dataset.unit != select) {
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

function setStorage() {
  browser.storage.local.set({
    value: elValue.value,
    unit: elUnit.value,
    decimals: decimals,
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

  // Scroll elSelectorList so that selected unit is visible
  let topPos = getEl("checked").offsetTop - 150;
  elSelectorList.scrollTop = topPos;
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
