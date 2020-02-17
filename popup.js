"use strict";

var conversions = [
 // AREA, SIbase = m2.
 {"unit" : "mm2",    "toSIbase" : 0.000001,          "system" : "sMetric",   "category" : "cArea"},
 {"unit" : "cm2",    "toSIbase" : 0.0001,            "system" : "sMetric",   "category" : "cArea"},
 {"unit" : "m2",     "toSIbase" : 1,                 "system" : "sMetric",   "category" : "cArea"},
 {"unit" : "ha",     "toSIbase" : 10000,             "system" : "sMetric",   "category" : "cArea"},
 {"unit" : "km2",    "toSIbase" : 1000000,           "system" : "sMetric",   "category" : "cArea"},
 {"unit" : "in2",    "toSIbase" : 0.00064516,        "system" : "sImperial", "category" : "cArea"},
 {"unit" : "ft2",    "toSIbase" : 0.092903,          "system" : "sImperial", "category" : "cArea"},
 {"unit" : "yd2",    "toSIbase" : 0.836127,          "system" : "sImperial", "category" : "cArea"},
 {"unit" : "ac",     "toSIbase" : 4046.8564224,      "system" : "sImperial", "category" : "cArea"},
 {"unit" : "mi2",    "toSIbase" : 2589988.110336,    "system" : "sImperial", "category" : "cArea"},

 // ENERGY, SIbase = J.
 {"unit" : "kJ",     "toSIbase" : 1000,              "system" : "sMetric",   "category" : "cEnergy"},
 {"unit" : "J",      "toSIbase" : 1,                 "system" : "sMetric",   "category" : "cEnergy"},
 {"unit" : "ftlb",   "toSIbase" : 1.3558179483,      "system" : "sImperial", "category" : "cEnergy"},
 {"unit" : "kcal",   "toSIbase" : 4184,              "system" : "sOther",    "category" : "cEnergy"},
 {"unit" : "gcal",   "toSIbase" : 4.184,             "system" : "sOther",    "category" : "cEnergy"},
 {"unit" : "Wh",     "toSIbase" : 3600,              "system" : "sOther",    "category" : "cEnergy"},
 {"unit" : "kWh",    "toSIbase" : 3600000,           "system" : "sOther",    "category" : "cEnergy"},

 // LENGTH, SIbase = m.
 {"unit" : "mcm",    "toSIbase" : 0.000001,          "system" : "sMetric",   "category" : "cLength"},
 {"unit" : "mm",     "toSIbase" : 0.001,             "system" : "sMetric",   "category" : "cLength"},
 {"unit" : "cm",     "toSIbase" : 0.01,              "system" : "sMetric",   "category" : "cLength"},
 {"unit" : "dm",     "toSIbase" : 0.1,               "system" : "sMetric",   "category" : "cLength"},
 {"unit" : "m",      "toSIbase" : 1,                 "system" : "sMetric",   "category" : "cLength"},
 {"unit" : "km",     "toSIbase" : 1000,              "system" : "sMetric",   "category" : "cLength"},
 {"unit" : "in",     "toSIbase" : 0.0254,            "system" : "sImperial", "category" : "cLength"},
 {"unit" : "ft",     "toSIbase" : 0.3048,            "system" : "sImperial", "category" : "cLength"},
 {"unit" : "yd",     "toSIbase" : 0.9144,            "system" : "sImperial", "category" : "cLength"},
 {"unit" : "mi",     "toSIbase" : 1609.34,           "system" : "sImperial", "category" : "cLength"},
 {"unit" : "nmi",    "toSIbase" : 1852,              "system" : "sOther",    "category" : "cLength"},
 {"unit" : "ly",     "toSIbase" : 9460660000000000,  "system" : "sOther",    "category" : "cLength"},
 {"unit" : "pc",     "toSIbase" : 30856775812799588, "system" : "sOther",    "category" : "cLength"},

 // MASS, SIbase = kg.
 {"unit" : "mg",     "toSIbase" : 0.000001,          "system" : "sMetric",   "category" : "cMass"},
 {"unit" : "ct",     "toSIbase" : 0.0002,            "system" : "sMetric",   "category" : "cMass"},
 {"unit" : "g",      "toSIbase" : 0.001,             "system" : "sMetric",   "category" : "cMass"},
 {"unit" : "hg",     "toSIbase" : 0.01,              "system" : "sMetric",   "category" : "cMass"},
 {"unit" : "kg",     "toSIbase" : 1,                 "system" : "sMetric",   "category" : "cMass"},
 {"unit" : "t",      "toSIbase" : 1000,              "system" : "sMetric",   "category" : "cMass"},
 {"unit" : "oz",     "toSIbase" : 0.0283495,         "system" : "sImperial", "category" : "cMass"},
 {"unit" : "lb",     "toSIbase" : 0.453592,          "system" : "sImperial", "category" : "cMass"},
 {"unit" : "st",     "toSIbase" : 6.35029,           "system" : "sImperial", "category" : "cMass"},
 {"unit" : "tonUS",  "toSIbase" : 907.1847,          "system" : "sImperial", "category" : "cMass"},
 {"unit" : "tonUK",  "toSIbase" : 1016.047,          "system" : "sImperial", "category" : "cMass"},

 // PRESSURE, SIbase = Pa.
 {"unit" : "Pa",     "toSIbase" : 1,                 "system" : "sMetric",   "category" : "cPressure"},
 {"unit" : "kPa",    "toSIbase" : 1000,              "system" : "sMetric",   "category" : "cPressure"},
 {"unit" : "bar",    "toSIbase" : 100000,            "system" : "sMetric",   "category" : "cPressure"},
 {"unit" : "psi",    "toSIbase" : 6894.7572932,      "system" : "sImperial", "category" : "cPressure"},
 {"unit" : "cmH2O",  "toSIbase" : 98.0665,           "system" : "sOther",    "category" : "cPressure"},
 {"unit" : "torr",   "toSIbase" : 133.32236842,      "system" : "sOther",    "category" : "cPressure"},
 {"unit" : "mmHg",   "toSIbase" : 133.322387415,     "system" : "sOther",    "category" : "cPressure"},
 {"unit" : "inH2O",  "toSIbase" : 248.843,           "system" : "sOther",    "category" : "cPressure"},
 {"unit" : "inHg",   "toSIbase" : 3386.389,          "system" : "sOther",    "category" : "cPressure"},
 {"unit" : "atm",    "toSIbase" : 101325,            "system" : "sOther",    "category" : "cPressure"},

 // SPEED, SIbase = km/h.
 {"unit" : "kmph",   "toSIbase" : 1,                 "system" : "sMetric",   "category" : "cSpeed"},
 {"unit" : "mps",    "toSIbase" : 3.6,               "system" : "sMetric",   "category" : "cSpeed"},
 {"unit" : "fps",    "toSIbase" : 1.09728,           "system" : "sImperial", "category" : "cSpeed"},
 {"unit" : "mph",    "toSIbase" : 1.60934,           "system" : "sImperial", "category" : "cSpeed"},
 {"unit" : "knot",   "toSIbase" : 1.852,             "system" : "sOther",    "category" : "cSpeed"},

 // TEMPERATURE, SIbase = C.
 {"unit" : "K",      "toSIbase" : 1,   "addToSIbase" : -273.15, "addFromSIbase": 273.15, "system": "sMetric",   "category" : "cTemperature"},
 {"unit" : "C",      "toSIbase" : 1,   "addToSIbase" : 0,       "addFromSIbase": 0,      "system": "sMetric",   "category" : "cTemperature"},
 {"unit" : "F",      "toSIbase" : 5/9, "addToSIbase" : -32,     "addFromSIbase": 32,     "system": "sImperial", "category" : "cTemperature"},

 // TIME, SIbase = day.
 {"unit" : "ms",     "toSIbase" : 1.157407407e-8,    "system" : "sMetric",   "category" : "cTime"},
 {"unit" : "sec",    "toSIbase" : 0.0000115741,      "system" : "sMetric",   "category" : "cTime"},
 {"unit" : "min",    "toSIbase" : 0.0006944444,      "system" : "sMetric",   "category" : "cTime"},
 {"unit" : "hour",   "toSIbase" : 0.0416666667,      "system" : "sMetric",   "category" : "cTime"},
 {"unit" : "day",    "toSIbase" : 1,                 "system" : "sMetric",   "category" : "cTime"},
 {"unit" : "week",   "toSIbase" : 7,                 "system" : "sMetric",   "category" : "cTime"},
 {"unit" : "month",  "toSIbase" : 30.4375,           "system" : "sMetric",   "category" : "cTime"},
 {"unit" : "year",   "toSIbase" : 365.25,            "system" : "sMetric",   "category" : "cTime"},
 {"unit" : "decad",  "toSIbase" : 3652.5,            "system" : "sMetric",   "category" : "cTime"},
 {"unit" : "centu",  "toSIbase" : 36525,             "system" : "sMetric",   "category" : "cTime"},

 // VOLUME, SIbase = l.
 {"unit" : "ml",     "toSIbase" : 0.001,             "system" : "sMetric",   "category" : "cVolume"},
 {"unit" : "tsp",    "toSIbase" : 0.005,             "system" : "sMetric",   "category" : "cVolume"},
 {"unit" : "cl",     "toSIbase" : 0.01,              "system" : "sMetric",   "category" : "cVolume"},
 {"unit" : "tbsp",   "toSIbase" : 0.015,             "system" : "sMetric",   "category" : "cVolume"},
 {"unit" : "l",      "toSIbase" : 1,                 "system" : "sMetric",   "category" : "cVolume"},
 {"unit" : "m3",     "toSIbase" : 1000,              "system" : "sMetric",   "category" : "cVolume"},
 {"unit" : "in3",    "toSIbase" : 0.016387064,       "system" : "sImperial", "category" : "cVolume"},
 {"unit" : "tspUK",  "toSIbase" : 0.00591939,        "system" : "sImperial", "category" : "cVolume"},
 {"unit" : "tspUS",  "toSIbase" : 0.00492892,        "system" : "sImperial", "category" : "cVolume"},
 {"unit" : "tbspUK", "toSIbase" : 0.0177582,         "system" : "sImperial", "category" : "cVolume"},
 {"unit" : "tbspUS", "toSIbase" : 0.0147868,         "system" : "sImperial", "category" : "cVolume"},
 {"unit" : "fOzUK",  "toSIbase" : 0.0284130625,      "system" : "sImperial", "category" : "cVolume"},
 {"unit" : "fOzUS",  "toSIbase" : 0.0295735156,      "system" : "sImperial", "category" : "cVolume"},
 {"unit" : "cupUS",  "toSIbase" : 0.236588125,       "system" : "sImperial", "category" : "cVolume"},
 {"unit" : "ptUS",   "toSIbase" : 0.473176,          "system" : "sImperial", "category" : "cVolume"},
 {"unit" : "ptUK",   "toSIbase" : 0.56826125,        "system" : "sImperial", "category" : "cVolume"},
 {"unit" : "galUS",  "toSIbase" : 3.78541,           "system" : "sImperial", "category" : "cVolume"},
 {"unit" : "galUK",  "toSIbase" : 4.54609,           "system" : "sImperial", "category" : "cVolume"},
 {"unit" : "ft3",    "toSIbase" : 28.316846592,      "system" : "sImperial", "category" : "cVolume"},

]

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

var elCategory = getEl("category");
var elUnit = getEl("unit");
var elValue = getEl("value");
var elOutput = getEl("output");
var elTools = getEl("tools");
var elLabelDec = getEl("labelDec");
var elAddDec = getEl("addDec");
var elSubtractDec = getEl("subDec");
var elReset = getEl("reset");
var elDismiss = getEl("dismiss");
var elDisclaimerText = getEl("disclaimerText");
var elMessage = getEl("message");


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
  inValue = parseFloat(inValue).toString();

  // Only execute if input value is a number, is safe and is finite
  if (isNaN(parseFloat(inValue)) || !Number.isSafeInteger(parseInt(inValue)) || !Number.isFinite(parseFloat(inValue))) {
    emptyEl(elOutput);
  }
  else {
    emptyEl(elOutput);
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

    for (let i = 0; i < conversions.length; i++) {
      if (conversions[i].category.includes(category)) {
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
          elCell.dataset.raw = round(product, decimals);

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
    handleCopyButtons();
  }
}

function handleCopyButtons() {
  var elCopySpans = document.getElementsByTagName("TD");

  for (var i = 0; i < elCopySpans.length; i++) {
    elCopySpans[i].addEventListener("click", function() {
      if (this.dataset.raw) {
        let copyBuffer = createEl("TEXTAREA", elOutput, this.dataset.raw, "copyBuffer");
        elMessage.className = "message"
        setTimeout(function(){
          elMessage.classList.remove("message");
        }, 2000);
        copyBuffer.select();
        document.execCommand("copy");
        output.removeChild(copyBuffer);
      }
    });
  }
}

function populateInputUnit(select) {
  emptyEl(elUnit);

  let selectedCategory = elCategory.options[elCategory.selectedIndex].value;
  for (let i = 0; i < conversions.length; i++) {
    if (selectedCategory == conversions[i].category) {
      let elOption = createEl("OPTION", elUnit, l10n(conversions[i].unit));
      elOption.value = conversions[i].unit;

      if (select == conversions[i].unit) {
        elOption.selected = "true";
      }
    }
  }
}

function populateInputCategory(select) {
  let previousCategory = "";
  for (let i = 0; i < conversions.length; i++) {
    if (previousCategory != conversions[i].category) {
      let elOption = createEl("OPTION", elCategory, l10n(conversions[i].category));
      elOption.value = conversions[i].category;
      if (select == conversions[i].category) {
        elOption.selected = "true";
      }
    }
    previousCategory = conversions[i].category;
  }
}

function changeDec(step) {
  if (decimals + step >= MIN_DECIMALS && decimals + step <= MAX_DECIMALS) {
    decimals = decimals + step;

    if (decimals == MIN_DECIMALS) {
      elSubtractDec.disabled = true;
    }
    else {
      elSubtractDec.disabled = false;
    }

    if (decimals == MAX_DECIMALS) {
      elAddDec.disabled = true;
    }
    else {
      elAddDec.disabled = false;
    }
    executeCalc();
  }
}

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
    showEl(elReset);
  }
  else {
    hideEl(elReset);
    hideEl(elOutput);
    hideEl(elTools);
  }
}

function setStorage() {
  browser.storage.local.set({
    category: elCategory.value,
    value: elValue.value,
    unit: elUnit.value,
    decimals: decimals,
    timestamp: Date.now()
  });
}

function removeStorage() {
  browser.storage.local.remove("category");
  browser.storage.local.remove("value");
  browser.storage.local.remove("unit");
  browser.storage.local.remove("decimals");
  browser.storage.local.remove("timestamp");
  browser.storage.local.remove("hideDisclaimer");
}

function resetInValue() {
  elValue.value = "";
  elValue.focus();
  setStorage();
}

function initialize() {
  // Localize
  elValue.placeholder = l10n("inputPlaceholder");
  elLabelDec.textContent = l10n("decimals");
  elDisclaimerText.textContent = l10n("disclaimer");
  elDismiss.textContent = l10n("hideDisclaimer");

  // Get values from last selected
  let getStorage = browser.storage.local.get();

  getStorage.then((response) => {
    populateInputCategory(response.category);
    populateInputUnit(response.unit);
    if (response.decimals > -1) {
      decimals = response.decimals;
    }
    if (response.hideDisclaimer) {
      hideEl(disclaimer);
    }
    if (response.value) {
      elValue.value = response.value;
      showEl(elReset);
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

elUnit.addEventListener("change", function() {
  executeCalc();
});

elCategory.addEventListener("change", function() {
  populateInputUnit();
  executeCalc();
});

elAddDec.addEventListener("click", function() {
  changeDec(1);
})

elSubtractDec.addEventListener("click", function() {
  changeDec(-1);
});

elReset.addEventListener("click", function() {
  resetInValue();
  emptyEl(elOutput);
  hideEl(elOutput);
  hideEl(elTools);
});

elDismiss.addEventListener("click", function() {
  hideEl(disclaimer);

  browser.storage.local.set({
    hideDisclaimer: true
  });
});
