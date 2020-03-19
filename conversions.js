"use strict";

var conversions = [
  // AREA, SIbase = m2.
  {"unit" : "mm2",    "toSIbase" : 0.000001,          "system" : "sMetric",   "tag" : ["SI"],               "category" : "cArea"},
  {"unit" : "cm2",    "toSIbase" : 0.0001,            "system" : "sMetric",   "tag" : ["SI"],               "category" : "cArea"},
  {"unit" : "m2",     "toSIbase" : 1,                 "system" : "sMetric",   "tag" : ["SI"],               "category" : "cArea"},
  {"unit" : "ha",     "toSIbase" : 10000,             "system" : "sMetric",   "tag" : ["SI"],               "category" : "cArea"},
  {"unit" : "km2",    "toSIbase" : 1000000,           "system" : "sMetric",   "tag" : ["SI"],               "category" : "cArea"},
  {"unit" : "in2",    "toSIbase" : 0.00064516,        "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cArea"},
  {"unit" : "ft2",    "toSIbase" : 0.092903,          "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cArea"},
  {"unit" : "yd2",    "toSIbase" : 0.836127,          "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cArea"},
  {"unit" : "ac",     "toSIbase" : 4046.8564224,      "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cArea"},
  {"unit" : "mi2",    "toSIbase" : 2589988.110336,    "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cArea"},

  // ENERGY, SIbase = J.
  {"unit" : "J",      "toSIbase" : 1,                 "system" : "sMetric",   "tag" : ["SI"],               "category" : "cEnergy"},
  {"unit" : "kJ",     "toSIbase" : 1000,              "system" : "sMetric",   "tag" : ["SI"],               "category" : "cEnergy"},
  {"unit" : "Wh",     "toSIbase" : 3600,              "system" : "sOther",    "tag" : ["SI Derived"],       "category" : "cEnergy"},
  {"unit" : "kWh",    "toSIbase" : 3600000,           "system" : "sOther",    "tag" : ["SI Derived"],       "category" : "cEnergy"},
  {"unit" : "ftlb",   "toSIbase" : 1.3558179483,      "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cEnergy"},
  {"unit" : "gcal",   "toSIbase" : 4.184,             "system" : "sOther",    "tag" : ["Other"],            "category" : "cEnergy"},
  {"unit" : "kcal",   "toSIbase" : 4184,              "system" : "sOther",    "tag" : ["Other"],            "category" : "cEnergy"},

  // LENGTH, SIbase = m.
  {"unit" : "mcm",    "toSIbase" : 0.000001,          "system" : "sMetric",   "tag" : ["SI"],               "category" : "cLength"},
  {"unit" : "mm",     "toSIbase" : 0.001,             "system" : "sMetric",   "tag" : ["SI"],               "category" : "cLength"},
  {"unit" : "cm",     "toSIbase" : 0.01,              "system" : "sMetric",   "tag" : ["SI"],               "category" : "cLength"},
  {"unit" : "dm",     "toSIbase" : 0.1,               "system" : "sMetric",   "tag" : ["SI"],               "category" : "cLength"},
  {"unit" : "m",      "toSIbase" : 1,                 "system" : "sMetric",   "tag" : ["SI"],               "category" : "cLength"},
  {"unit" : "km",     "toSIbase" : 1000,              "system" : "sMetric",   "tag" : ["SI"],               "category" : "cLength"},
  {"unit" : "th",     "toSIbase" : 0.0000254,         "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cLength"},
  {"unit" : "in",     "toSIbase" : 0.0254,            "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cLength"},
  {"unit" : "ft",     "toSIbase" : 0.3048,            "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cLength"},
  {"unit" : "yd",     "toSIbase" : 0.9144,            "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cLength"},
  {"unit" : "mi",     "toSIbase" : 1609.34,           "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cLength"},
  {"unit" : "nmi",    "toSIbase" : 1852,              "system" : "sOther",    "tag" : ["Imperial", "USCS"], "category" : "cLength"},
  {"unit" : "ly",     "toSIbase" : 9460730472580800,  "system" : "sOther",    "tag" : ["Imperial", "USCS"], "category" : "cLength"},
  {"unit" : "pc",     "toSIbase" : 30856775812799588, "system" : "sOther",    "tag" : ["Imperial", "USCS"], "category" : "cLength"},

  // MASS, SIbase = kg.
  {"unit" : "mg",     "toSIbase" : 0.000001,          "system" : "sMetric",   "tag" : ["SI"],               "category" : "cMass"},
  {"unit" : "ct",     "toSIbase" : 0.0002,            "system" : "sMetric",   "tag" : ["SI"],               "category" : "cMass"},
  {"unit" : "g",      "toSIbase" : 0.001,             "system" : "sMetric",   "tag" : ["SI"],               "category" : "cMass"},
  {"unit" : "hg",     "toSIbase" : 0.01,              "system" : "sMetric",   "tag" : ["SI"],               "category" : "cMass"},
  {"unit" : "kg",     "toSIbase" : 1,                 "system" : "sMetric",   "tag" : ["SI"],               "category" : "cMass"},
  {"unit" : "t",      "toSIbase" : 1000,              "system" : "sMetric",   "tag" : ["SI"],               "category" : "cMass"},
  {"unit" : "oz",     "toSIbase" : 0.0283495,         "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cMass"},
  {"unit" : "lb",     "toSIbase" : 0.453592,          "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cMass"},
  {"unit" : "st",     "toSIbase" : 6.35029,           "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cMass"},
  {"unit" : "tonUS",  "toSIbase" : 907.1847,          "system" : "sImperial", "tag" : ["USCS"],             "category" : "cMass"},
  {"unit" : "tonUK",  "toSIbase" : 1016.047,          "system" : "sImperial", "tag" : ["Imperial"],         "category" : "cMass"},

  // PRESSURE, SIbase = Pa.
  {"unit" : "Pa",     "toSIbase" : 1,                 "system" : "sMetric",   "tag" : ["SI"],               "category" : "cPressure"},
  {"unit" : "kPa",    "toSIbase" : 1000,              "system" : "sMetric",   "tag" : ["SI"],               "category" : "cPressure"},
  {"unit" : "bar",    "toSIbase" : 100000,            "system" : "sMetric",   "tag" : ["SI Derived"],       "category" : "cPressure"},
  {"unit" : "psi",    "toSIbase" : 6894.7572932,      "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cPressure"},
  {"unit" : "cmH2O",  "toSIbase" : 98.0665,           "system" : "sOther",    "tag" : ["Other"],            "category" : "cPressure"},
  {"unit" : "torr",   "toSIbase" : 133.32236842,      "system" : "sOther",    "tag" : ["Other"],            "category" : "cPressure"},
  {"unit" : "mmHg",   "toSIbase" : 133.322387415,     "system" : "sOther",    "tag" : ["Other"],            "category" : "cPressure"},
  {"unit" : "inH2O",  "toSIbase" : 248.843,           "system" : "sOther",    "tag" : ["Other"],            "category" : "cPressure"},
  {"unit" : "inHg",   "toSIbase" : 3386.389,          "system" : "sOther",    "tag" : ["Other"],            "category" : "cPressure"},
  {"unit" : "atm",    "toSIbase" : 101325,            "system" : "sOther",    "tag" : ["Other"],            "category" : "cPressure"},

  // SPEED, SIbase = km/h.
  {"unit" : "kmph",   "toSIbase" : 1,                 "system" : "sMetric",   "tag" : ["SI Derived"],       "category" : "cSpeed"},
  {"unit" : "mps",    "toSIbase" : 3.6,               "system" : "sMetric",   "tag" : ["SI"],               "category" : "cSpeed"},
  {"unit" : "fps",    "toSIbase" : 1.09728,           "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cSpeed"},
  {"unit" : "mph",    "toSIbase" : 1.60934,           "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cSpeed"},
  {"unit" : "kn",     "toSIbase" : 1.852,             "system" : "sOther",    "tag" : ["Other"],            "category" : "cSpeed"},

  // TEMPERATURE, SIbase = C.
  {"unit" : "K",      "toSIbase" : 1,   "addToSIbase": 273.15, "allowZero": true, "system": "sMetric",   "tag" : ["SI"],               "category" : "cTemperature"},
  {"unit" : "C",      "toSIbase" : 1,   "addToSIbase": 0,      "allowZero": true, "system": "sMetric",   "tag" : ["SI"],               "category" : "cTemperature"},
  {"unit" : "F",      "toSIbase" : 5/9, "addToSIbase": 32,     "allowZero": true, "system": "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cTemperature"},

  // TIME, SIbase = day.
  {"unit" : "ms",     "toSIbase" : 0.001,             "system" : "sMetric",   "tag" : ["SI"], "category" : "cTime"},
  {"unit" : "sec",    "toSIbase" : 1,                 "system" : "sMetric",   "tag" : ["SI"], "category" : "cTime"},
  {"unit" : "min",    "toSIbase" : 60,                "system" : "sMetric",   "tag" : ["SI"], "category" : "cTime"},
  {"unit" : "hour",   "toSIbase" : 3600,              "system" : "sMetric",   "tag" : ["SI"], "category" : "cTime"},
  {"unit" : "day",    "toSIbase" : 86400,             "system" : "sMetric",   "tag" : ["SI"], "category" : "cTime"},
  {"unit" : "week",   "toSIbase" : 604800,            "system" : "sMetric",   "tag" : ["SI"], "category" : "cTime"},
  {"unit" : "month",  "toSIbase" : 2629800,           "system" : "sMetric",   "tag" : ["SI"], "category" : "cTime"},
  {"unit" : "year",   "toSIbase" : 31557600,          "system" : "sMetric",   "tag" : ["SI"], "category" : "cTime"},
  {"unit" : "decad",  "toSIbase" : 315576000,         "system" : "sMetric",   "tag" : ["SI"], "category" : "cTime"},
  {"unit" : "centu",  "toSIbase" : 3155760000,        "system" : "sMetric",   "tag" : ["SI"], "category" : "cTime"},

  // VOLUME, SIbase = l.
  {"unit" : "ml",     "toSIbase" : 0.001,             "system" : "sMetric",   "tag" : ["SI"],               "category" : "cVolume"},
  {"unit" : "tsp",    "toSIbase" : 0.005,             "system" : "sMetric",   "tag" : ["SI"],               "category" : "cVolume"},
  {"unit" : "cl",     "toSIbase" : 0.01,              "system" : "sMetric",   "tag" : ["SI"],               "category" : "cVolume"},
  {"unit" : "tbsp",   "toSIbase" : 0.015,             "system" : "sMetric",   "tag" : ["SI"],               "category" : "cVolume"},
  {"unit" : "l",      "toSIbase" : 1,                 "system" : "sMetric",   "tag" : ["SI"],               "category" : "cVolume"},
  {"unit" : "m3",     "toSIbase" : 1000,              "system" : "sMetric",   "tag" : ["SI"],               "category" : "cVolume"},
  {"unit" : "tspUS",  "toSIbase" : 0.00492892,        "system" : "sImperial", "tag" : ["USCS"],             "category" : "cVolume"},
  {"unit" : "tspUK",  "toSIbase" : 0.00591939,        "system" : "sImperial", "tag" : ["Imperial"],         "category" : "cVolume"},
  {"unit" : "in3",    "toSIbase" : 0.016387064,       "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cVolume"},
  {"unit" : "tbspUK", "toSIbase" : 0.0177582,         "system" : "sImperial", "tag" : ["Imperial"],         "category" : "cVolume"},
  {"unit" : "tbspUS", "toSIbase" : 0.0147868,         "system" : "sImperial", "tag" : ["USCS"],             "category" : "cVolume"},
  {"unit" : "fOzUK",  "toSIbase" : 0.0284130625,      "system" : "sImperial", "tag" : ["Imperial"],         "category" : "cVolume"},
  {"unit" : "fOzUS",  "toSIbase" : 0.0295735156,      "system" : "sImperial", "tag" : ["USCS"],             "category" : "cVolume"},
  {"unit" : "cupUS",  "toSIbase" : 0.236588125,       "system" : "sImperial", "tag" : ["USCS"],             "category" : "cVolume"},
  {"unit" : "ptUS",   "toSIbase" : 0.473176473,       "system" : "sImperial", "tag" : ["USCS"],             "category" : "cVolume"},
  {"unit" : "ptUK",   "toSIbase" : 0.56826125,        "system" : "sImperial", "tag" : ["Imperial"],         "category" : "cVolume"},
  {"unit" : "qtUS",   "toSIbase" : 0.946352946,       "system" : "sImperial", "tag" : ["USCS"],             "category" : "cVolume"},
  {"unit" : "qtUK",   "toSIbase" : 1.1365225,         "system" : "sImperial", "tag" : ["Imperial"],         "category" : "cVolume"},
  {"unit" : "potUS",  "toSIbase" : 1.89270589,        "system" : "sImperial", "tag" : ["USCS"],             "category" : "cVolume"},
  {"unit" : "galUS",  "toSIbase" : 3.78541,           "system" : "sImperial", "tag" : ["USCS"],             "category" : "cVolume"},
  {"unit" : "galUK",  "toSIbase" : 4.54609,           "system" : "sImperial", "tag" : ["Imperial"],         "category" : "cVolume"},
  {"unit" : "ft3",    "toSIbase" : 28.316846592,      "system" : "sImperial", "tag" : ["Imperial", "USCS"], "category" : "cVolume"},
]
