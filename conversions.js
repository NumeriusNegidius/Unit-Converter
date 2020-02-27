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
 {"unit" : "kn",     "toSIbase" : 1.852,             "system" : "sOther",    "category" : "cSpeed"},

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
