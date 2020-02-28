"use strict";

const MAX_INTEGER = 15;
const MAX_DECIMALS = 10;
const MIN_DECIMALS = 0;
var decimals = 2;

// ELEMENT MANIPULATION FUNCTIONS/SHORTHANDS
function l10n(text) {
  return browser.i18n.getMessage(text.toString());
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
var elInput = getEl("input");
var elSelectorSelected = getEl("selectorSelected");
var elSelector = getEl("selector");
var elSelectorVeil = getEl("selectorVeil");
var elSelectorList = getEl("selectorList");
var elCloseSelector = getEl("closeSelector");
var elFilter = getEl("filter");
var elResetFilter = getEl("resetFilter");
var elUnit = getEl("unit");
var elValue = getEl("value");
var elOutput = getEl("output");

var elTools = getEl("tools");
var elDecimalsLabel = getEl("decimalsLabel");
var elDecimalsAdd = getEl("decimalsAdd");
var elDecimalsSubtract = getEl("decimalsSubtract");
var elResetValue = getEl("resetValue");
var elDismiss = getEl("dismiss");
var elDisclaimerText = getEl("disclaimerText");
var elPopup = getEl("popup");

function round(val, decimals) {
  if (parseInt(val).toString().length <= MAX_INTEGER) {
    return Number.parseFloat(val).toFixed(decimals);
  }
  else {
    return Number.parseFloat(val).toExponential(decimals);
  }
}

function executeCalc() {
  let inUnit = elUnit.value;
  let inValue = elValue.value;

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

  // Only execute if input value is a number, is safe and is finite
  if (isNaN(parseFloat(inValue))) {
    console.log(inValue, "is NaN");
    hideEl(elTools);

  } else if (parseFloat(inValue) == 0) {
    hideEl(elTools);
    console.log("Input number is 0");

  } else if (!Number.isSafeInteger(parseInt(inValue))) {
    hideEl(elTools);
    console.log("Input number is not safe (too big)");

  } else if (!Number.isFinite(parseFloat(inValue))) {
    hideEl(elTools);
    console.log("Input number is not finite");

  } else {
    showEl(elOutput);
    showEl(elTools);
    setStorage();

    let inUnitIndex = conversions.findIndex(function(item){
      return item.unit === inUnit;
    });

    let category = conversions[inUnitIndex].category;
    if (conversions[inUnitIndex].addToSIbase) {
      inValue = parseFloat(inValue) + parseFloat(conversions[inUnitIndex].addToSIbase);
    }
    let inValueInSIbase = inValue * conversions[inUnitIndex].toSIbase;

    let previousOutSystem;

    // Create result table
    let elTable = createEl("TABLE", elOutput);

    // Count how many possible conversions there are and how many units are actually shown
    let countUnitsInCategory = 0;
    let countUnitsShown = 0;
    for (let i = 0; i < conversions.length; i++) {
      if (conversions[i].category.includes(category)) {
        countUnitsInCategory++;
        let outUnit, outSystem, outTitle, product, addFromSIbase;

        outUnit = conversions[i].unit;
        outSystem = conversions[i].system;
        outTitle = l10n(conversions[i].unit);
        addFromSIbase = conversions[i].addFromSIbase;

        product = (1 / conversions[i].toSIbase) * inValueInSIbase;
        if (conversions[i].addFromSIbase) {
          product = product + conversions[i].addFromSIbase;
        }
        product = round(product, decimals);

        if (product != 0 && elUnit.value != outUnit && Number.isSafeInteger(Math.round(product))) {
          countUnitsShown++;
          let outExponent, outInteger, outDecimals;
          let spanIntClass, spanDecClass;

          let productSign = Math.sign(product);
          let decimalStart = product.indexOf(".");
          let exponentStart = product.indexOf("e");

          let productArray = product.split(/[.e]+/);

          outInteger = parseInt(productArray[0]).toLocaleString("eo").replace(/-/g, "");

          if (decimalStart > 0) {
            outDecimals = productArray[1];
            outExponent = productArray[2];
          }
          else if (exponentStart) {
            outExponent = productArray[1];
          }

          if (outSystem != previousOutSystem) {
            let elRowSpacer = createEl("TR", elTable, null, "space");
            let elCellSpacer = createEl("TD", elRowSpacer, null);
            let elRowH = createEl("TR", elTable, null, "head");
            let elCellH = createEl("TD", elRowH, l10n(outSystem));
          }

          let elRow = createEl("TR", elTable, null, "result");
          let elCell = createEl("TD", elRow);
          let elCellTitle = createEl("DIV", elCell, outTitle);
          let elCellProduct = createEl("DIV", elCell);
          elCell.dataset.copyText = round(product, decimals);

          let elProductContainer = createEl("SPAN", elCellProduct, "", "copy");

          if (outExponent) {
            let spanExp = createEl("SPAN", elProductContainer, "", "exponent");
            let spanExpSup = createEl("SUP", spanExp, outExponent.replace("+", ""));
          }

          if (productSign == -1) {
            let spanneg = createEl("SPAN", elProductContainer, "−", "negative");
          }

          if (outInteger == 0) {
            spanIntClass = "deemphasize";
          }

          let spanInt = createEl("SPAN", elProductContainer, outInteger, spanIntClass);

          if (decimals > 0) {
            if (outDecimals == 0) {
              spanDecClass = "deemphasize";
            }
            let spanDec = createEl("SPAN", elProductContainer, "." + outDecimals, spanDecClass);
          }
          previousOutSystem = outSystem;
        }
      }
    }

    if (countUnitsShown < (countUnitsInCategory - 1)) {
      // Subtract 1, because input unit is never shown in output
      let elFootnoteText = (countUnitsInCategory - countUnitsShown - 1) + " "
                         + l10n("hiddenConversions");
      let elFootnote = createEl("DIV", elOutput, elFootnoteText, "footnote");
    }

    handleCopyButtons();
  }
}

function handleCopyButtons() {
  var elCopySpans = document.getElementsByTagName("TD");

  for (var i = 0; i < elCopySpans.length; i++) {
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

  if (elFilter.value.length > 0) {
    showEl(elResetFilter);
  }
  else {
    hideEl(elResetFilter);
  }

  populateSelector(selectedUnit, elFilter.value);
}

function populateSelector(select, filterText) {
  elValue.disabled = false;

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
      // unitDict += conversions[i].unit + " ";
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
      markSelector(select);
      elSelectorUnit.dataset.unit = conversions[i].unit;
      previousCategory = conversions[i].category;
    }
  }

  // Create Event Listeners for each option
  var elSelectorValues = document.getElementsByTagName("DD");
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
  var elSelectorValues = document.getElementsByTagName("DD");
  for (let i = 0; i < elSelectorValues.length; i++) {
    if (elSelectorValues[i].dataset.unit != select) {
      elSelectorValues[i].classList.remove("checked");
    } else {
      elSelectorValues[i].classList.add("checked");
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
    showEl(elResetValue);
  }
  else {
    hideEl(elResetValue);
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

  elInput.classList.add("whenSelectorOpen");
}

function closeSelector() {
  showEl(elSelectorSelected);
  hideEl(elSelector);
  hideEl(elSelectorVeil);
  showEl(elOutput);

  elFilter.value = "";
  elInput.classList.remove("whenSelectorOpen");

  populateSelector(elUnit.value);
}

function initialize() {
  // Localize
  elSelectorSelected.textContent = l10n("selectorText");
  elValue.placeholder = l10n("inputPlaceholder");
  elFilter.placeholder = l10n("filterPlaceholder");
  elDecimalsLabel.textContent = l10n("decimals");
  elDisclaimerText.textContent = l10n("disclaimer");
  elDismiss.textContent = l10n("hideDisclaimer");

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
      elValue.disabled = true;
    }

    if (response.value) {
      elValue.value = response.value;
      showEl(elResetValue);
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

elFilter.addEventListener("input", function() {
  onFilter();
})

elSelectorSelected.addEventListener("click", function() {
  openSelector();
});

elCloseSelector.addEventListener("click", function() {
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

elResetValue.addEventListener("click", function() {
  elValue.value = "";
  elValue.focus();
  setStorage();
  emptyEl(elOutput);
  hideEl(elOutput);
  hideEl(elTools);
});

elResetFilter.addEventListener("click", function() {
  elFilter.value = "";
  elFilter.focus();
  onFilter();
});

elDismiss.addEventListener("click", function() {
  hideEl(disclaimer);

  browser.storage.local.set({
    hideDisclaimer: true
  });
});
