import "/node_modules/flag-icons/css/flag-icons.min.css";

const flags = Object.freeze([
  {
    class: "fi-af",
    label: "Afghanistan",
    value: 4,
  },
  {
    class: "fi-al",
    label: "Albania",
    value: 8,
  },
  {
    class: "fi-aq",
    label: "Antarctica",
    value: 10,
  },
  {
    class: "fi-dz",
    label: "Algeria",
    value: 12,
  },
  {
    class: "fi-as",
    label: "American Samoa",
    value: 16,
  },
  {
    class: "fi-ad",
    label: "Andorra",
    value: 20,
  },
  {
    class: "fi-ao",
    label: "Angola",
    value: 24,
  },
  {
    class: "fi-ag",
    label: "Antigua and Barbuda",
    value: 28,
  },
  {
    class: "fi-az",
    label: "Azerbaijan",
    value: 31,
  },
  {
    class: "fi-ar",
    label: "Argentina",
    value: 32,
  },
  {
    class: "fi-au",
    label: "Australia",
    value: 36,
  },
  {
    class: "fi-at",
    label: "Austria",
    value: 40,
  },
  {
    class: "fi-bs",
    label: "Bahamas",
    value: 44,
  },
  {
    class: "fi-bh",
    label: "Bahrain",
    value: 48,
  },
  {
    class: "fi-bd",
    label: "Bangladesh",
    value: 50,
  },
  {
    class: "fi-am",
    label: "Armenia",
    value: 51,
  },
  {
    class: "fi-bb",
    label: "Barbados",
    value: 52,
  },
  {
    class: "fi-be",
    label: "Belgium",
    value: 56,
  },
  {
    class: "fi-bm",
    label: "Bermuda",
    value: 60,
  },
  {
    class: "fi-bt",
    label: "Bhutan",
    value: 64,
  },
  {
    class: "fi-bo",
    label: "Bolivia (Plurinational State of)",
    value: 68,
  },
  {
    class: "fi-ba",
    label: "Bosnia and Herzegovina",
    value: 70,
  },
  {
    class: "fi-bw",
    label: "Botswana",
    value: 72,
  },
  {
    class: "fi-bv",
    label: "Bouvet Island",
    value: 74,
  },
  {
    class: "fi-br",
    label: "Brazil",
    value: 76,
  },
  {
    class: "fi-bz",
    label: "Belize",
    value: 84,
  },
  {
    class: "fi-io",
    label: "British Indian Ocean Territory",
    value: 86,
  },
  {
    class: "fi-sb",
    label: "Solomon Islands",
    value: 90,
  },
  {
    class: "fi-vg",
    label: "Virgin Islands (British)",
    value: 92,
  },
  {
    class: "fi-bn",
    label: "Brunei Darussalam",
    value: 96,
  },
  {
    class: "fi-bg",
    label: "Bulgaria",
    value: 100,
  },
  {
    class: "fi-mm",
    label: "Myanmar",
    value: 104,
  },
  {
    class: "fi-bi",
    label: "Burundi",
    value: 108,
  },
  {
    class: "fi-by",
    label: "Belarus",
    value: 112,
  },
  {
    class: "fi-kh",
    label: "Cambodia",
    value: 116,
  },
  {
    class: "fi-cm",
    label: "Cameroon",
    value: 120,
  },
  {
    class: "fi-ca",
    label: "Canada",
    value: 124,
  },
  {
    class: "fi-cv",
    label: "Cabo Verde",
    value: 132,
  },
  {
    class: "fi-ky",
    label: "Cayman Islands",
    value: 136,
  },
  {
    class: "fi-cf",
    label: "Central African Republic",
    value: 140,
  },
  {
    class: "fi-lk",
    label: "Sri Lanka",
    value: 144,
  },
  {
    class: "fi-td",
    label: "Chad",
    value: 148,
  },
  {
    class: "fi-cl",
    label: "Chile",
    value: 152,
  },
  {
    class: "fi-cn",
    label: "China",
    value: 156,
  },
  {
    class: "fi-tw",
    label: "Taiwan, Province of China",
    value: 158,
  },
  {
    class: "fi-cx",
    label: "Christmas Island",
    value: 162,
  },
  {
    class: "fi-cc",
    label: "Cocos (Keeling) Islands",
    value: 166,
  },
  {
    class: "fi-co",
    label: "Colombia",
    value: 170,
  },
  {
    class: "fi-km",
    label: "Comoros",
    value: 174,
  },
  {
    class: "fi-yt",
    label: "Mayotte",
    value: 175,
  },
  {
    class: "fi-cg",
    label: "Congo",
    value: 178,
  },
  {
    class: "fi-cd",
    label: "Congo, Democratic Republic of the",
    value: 180,
  },
  {
    class: "fi-ck",
    label: "Cook Islands",
    value: 184,
  },
  {
    class: "fi-cr",
    label: "Costa Rica",
    value: 188,
  },
  {
    class: "fi-hr",
    label: "Croatia",
    value: 191,
  },
  {
    class: "fi-cu",
    label: "Cuba",
    value: 192,
  },
  {
    class: "fi-cy",
    label: "Cyprus",
    value: 196,
  },
  {
    class: "fi-cz",
    label: "Czechia",
    value: 203,
  },
  {
    class: "fi-bj",
    label: "Benin",
    value: 204,
  },
  {
    class: "fi-dk",
    label: "Denmark",
    value: 208,
  },
  {
    class: "fi-dm",
    label: "Dominica",
    value: 212,
  },
  {
    class: "fi-do",
    label: "Dominican Republic",
    value: 214,
  },
  {
    class: "fi-ec",
    label: "Ecuador",
    value: 218,
  },
  {
    class: "fi-sv",
    label: "El Salvador",
    value: 222,
  },
  {
    class: "fi-gq",
    label: "Equatorial Guinea",
    value: 226,
  },
  {
    class: "fi-et",
    label: "Ethiopia",
    value: 231,
  },
  {
    class: "fi-er",
    label: "Eritrea",
    value: 232,
  },
  {
    class: "fi-ee",
    label: "Estonia",
    value: 233,
  },
  {
    class: "fi-fo",
    label: "Faroe Islands",
    value: 234,
  },
  {
    class: "fi-fk",
    label: "Falkland Islands (Malvinas)",
    value: 238,
  },
  {
    class: "fi-gs",
    label: "South Georgia and the South Sandwich Islands",
    value: 239,
  },
  {
    class: "fi-fj",
    label: "Fiji",
    value: 242,
  },
  {
    class: "fi-fi",
    label: "Finland",
    value: 246,
  },
  {
    class: "fi-ax",
    label: "Åland Islands",
    value: 248,
  },
  {
    class: "fi-fr",
    label: "France",
    value: 250,
  },
  {
    class: "fi-gf",
    label: "French Guiana",
    value: 254,
  },
  {
    class: "fi-pf",
    label: "French Polynesia",
    value: 258,
  },
  {
    class: "fi-tf",
    label: "French Southern Territories",
    value: 260,
  },
  {
    class: "fi-dj",
    label: "Djibouti",
    value: 262,
  },
  {
    class: "fi-ga",
    label: "Gabon",
    value: 266,
  },
  {
    class: "fi-ge",
    label: "Georgia",
    value: 268,
  },
  {
    class: "fi-gm",
    label: "Gambia",
    value: 270,
  },
  {
    class: "fi-ps",
    label: "Palestine, State of",
    value: 275,
  },
  {
    class: "fi-de",
    label: "Germany",
    value: 276,
  },
  {
    class: "fi-gh",
    label: "Ghana",
    value: 288,
  },
  {
    class: "fi-gi",
    label: "Gibraltar",
    value: 292,
  },
  {
    class: "fi-ki",
    label: "Kiribati",
    value: 296,
  },
  {
    class: "fi-gr",
    label: "Greece",
    value: 300,
  },
  {
    class: "fi-gl",
    label: "Greenland",
    value: 304,
  },
  {
    class: "fi-gd",
    label: "Grenada",
    value: 308,
  },
  {
    class: "fi-gp",
    label: "Guadeloupe",
    value: 312,
  },
  {
    class: "fi-gu",
    label: "Guam",
    value: 316,
  },
  {
    class: "fi-gt",
    label: "Guatemala",
    value: 320,
  },
  {
    class: "fi-gn",
    label: "Guinea",
    value: 324,
  },
  {
    class: "fi-gy",
    label: "Guyana",
    value: 328,
  },
  {
    class: "fi-ht",
    label: "Haiti",
    value: 332,
  },
  {
    class: "fi-hm",
    label: "Heard Island and McDonald Islands",
    value: 334,
  },
  {
    class: "fi-va",
    label: "Holy See",
    value: 336,
  },
  {
    class: "fi-hn",
    label: "Honduras",
    value: 340,
  },
  {
    class: "fi-hk",
    label: "Hong Kong",
    value: 344,
  },
  {
    class: "fi-hu",
    label: "Hungary",
    value: 348,
  },
  {
    class: "fi-is",
    label: "Iceland",
    value: 352,
  },
  {
    class: "fi-in",
    label: "India",
    value: 356,
  },
  {
    class: "fi-id",
    label: "Indonesia",
    value: 360,
  },
  {
    class: "fi-ir",
    label: "Iran (Islamic Republic of)",
    value: 364,
  },
  {
    class: "fi-iq",
    label: "Iraq",
    value: 368,
  },
  {
    class: "fi-ie",
    label: "Ireland",
    value: 372,
  },
  {
    class: "fi-il",
    label: "Israel",
    value: 376,
  },
  {
    class: "fi-it",
    label: "Italy",
    value: 380,
  },
  {
    class: "fi-ci",
    label: "Côte d'Ivoire",
    value: 384,
  },
  {
    class: "fi-jm",
    label: "Jamaica",
    value: 388,
  },
  {
    class: "fi-jp",
    label: "Japan",
    value: 392,
  },
  {
    class: "fi-kz",
    label: "Kazakhstan",
    value: 398,
  },
  {
    class: "fi-jo",
    label: "Jordan",
    value: 400,
  },
  {
    class: "fi-ke",
    label: "Kenya",
    value: 404,
  },
  {
    class: "fi-kp",
    label: "Korea (Democratic People's Republic of)",
    value: 408,
  },
  {
    class: "fi-kr",
    label: "Korea, Republic of",
    value: 410,
  },
  {
    class: "fi-kw",
    label: "Kuwait",
    value: 414,
  },
  {
    class: "fi-kg",
    label: "Kyrgyzstan",
    value: 417,
  },
  {
    class: "fi-la",
    label: "Lao People's Democratic Republic",
    value: 418,
  },
  {
    class: "fi-lb",
    label: "Lebanon",
    value: 422,
  },
  {
    class: "fi-ls",
    label: "Lesotho",
    value: 426,
  },
  {
    class: "fi-lv",
    label: "Latvia",
    value: 428,
  },
  {
    class: "fi-lr",
    label: "Liberia",
    value: 430,
  },
  {
    class: "fi-ly",
    label: "Libya",
    value: 434,
  },
  {
    class: "fi-li",
    label: "Liechtenstein",
    value: 438,
  },
  {
    class: "fi-lt",
    label: "Lithuania",
    value: 440,
  },
  {
    class: "fi-lu",
    label: "Luxembourg",
    value: 442,
  },
  {
    class: "fi-mo",
    label: "Macao",
    value: 446,
  },
  {
    class: "fi-mg",
    label: "Madagascar",
    value: 450,
  },
  {
    class: "fi-mw",
    label: "Malawi",
    value: 454,
  },
  {
    class: "fi-my",
    label: "Malaysia",
    value: 458,
  },
  {
    class: "fi-mv",
    label: "Maldives",
    value: 462,
  },
  {
    class: "fi-ml",
    label: "Mali",
    value: 466,
  },
  {
    class: "fi-mt",
    label: "Malta",
    value: 470,
  },
  {
    class: "fi-mq",
    label: "Martinique",
    value: 474,
  },
  {
    class: "fi-mr",
    label: "Mauritania",
    value: 478,
  },
  {
    class: "fi-mu",
    label: "Mauritius",
    value: 480,
  },
  {
    class: "fi-mx",
    label: "Mexico",
    value: 484,
  },
  {
    class: "fi-mc",
    label: "Monaco",
    value: 492,
  },
  {
    class: "fi-mn",
    label: "Mongolia",
    value: 496,
  },
  {
    class: "fi-md",
    label: "Moldova, Republic of",
    value: 498,
  },
  {
    class: "fi-me",
    label: "Montenegro",
    value: 499,
  },
  {
    class: "fi-ms",
    label: "Montserrat",
    value: 500,
  },
  {
    class: "fi-ma",
    label: "Morocco",
    value: 504,
  },
  {
    class: "fi-mz",
    label: "Mozambique",
    value: 508,
  },
  {
    class: "fi-om",
    label: "Oman",
    value: 512,
  },
  {
    class: "fi-na",
    label: "Namibia",
    value: 516,
  },
  {
    class: "fi-nr",
    label: "Nauru",
    value: 520,
  },
  {
    class: "fi-np",
    label: "Nepal",
    value: 524,
  },
  {
    class: "fi-nl",
    label: "Netherlands",
    value: 528,
  },
  {
    class: "fi-cw",
    label: "Curaçao",
    value: 531,
  },
  {
    class: "fi-aw",
    label: "Aruba",
    value: 533,
  },
  {
    class: "fi-sx",
    label: "Sint Maarten (Dutch part)",
    value: 534,
  },
  {
    class: "fi-bq",
    label: "Bonaire, Sint Eustatius and Saba",
    value: 535,
  },
  {
    class: "fi-nc",
    label: "New Caledonia",
    value: 540,
  },
  {
    class: "fi-vu",
    label: "Vanuatu",
    value: 548,
  },
  {
    class: "fi-nz",
    label: "New Zealand",
    value: 554,
  },
  {
    class: "fi-ni",
    label: "Nicaragua",
    value: 558,
  },
  {
    class: "fi-ne",
    label: "Niger",
    value: 562,
  },
  {
    class: "fi-ng",
    label: "Nigeria",
    value: 566,
  },
  {
    class: "fi-nu",
    label: "Niue",
    value: 570,
  },
  {
    class: "fi-nf",
    label: "Norfolk Island",
    value: 574,
  },
  {
    class: "fi-no",
    label: "Norway",
    value: 578,
  },
  {
    class: "fi-mp",
    label: "Northern Mariana Islands",
    value: 580,
  },
  {
    class: "fi-um",
    label: "United States Minor Outlying Islands",
    value: 581,
  },
  {
    class: "fi-fm",
    label: "Micronesia (Federated States of)",
    value: 583,
  },
  {
    class: "fi-mh",
    label: "Marshall Islands",
    value: 584,
  },
  {
    class: "fi-pw",
    label: "Palau",
    value: 585,
  },
  {
    class: "fi-pk",
    label: "Pakistan",
    value: 586,
  },
  {
    class: "fi-pa",
    label: "Panama",
    value: 591,
  },
  {
    class: "fi-pg",
    label: "Papua New Guinea",
    value: 598,
  },
  {
    class: "fi-py",
    label: "Paraguay",
    value: 600,
  },
  {
    class: "fi-pe",
    label: "Peru",
    value: 604,
  },
  {
    class: "fi-ph",
    label: "Philippines",
    value: 608,
  },
  {
    class: "fi-pn",
    label: "Pitcairn",
    value: 612,
  },
  {
    class: "fi-pl",
    label: "Poland",
    value: 616,
  },
  {
    class: "fi-pt",
    label: "Portugal",
    value: 620,
  },
  {
    class: "fi-gw",
    label: "Guinea-Bissau",
    value: 624,
  },
  {
    class: "fi-tl",
    label: "Timor-Leste",
    value: 626,
  },
  {
    class: "fi-pr",
    label: "Puerto Rico",
    value: 630,
  },
  {
    class: "fi-qa",
    label: "Qatar",
    value: 634,
  },
  {
    class: "fi-re",
    label: "Réunion",
    value: 638,
  },
  {
    class: "fi-ro",
    label: "Romania",
    value: 642,
  },
  {
    class: "fi-ru",
    label: "Russian Federation",
    value: 643,
  },
  {
    class: "fi-rw",
    label: "Rwanda",
    value: 646,
  },
  {
    class: "fi-bl",
    label: "Saint Barthélemy",
    value: 652,
  },
  {
    class: "fi-sh",
    label: "Saint Helena, Ascension and Tristan da Cunha",
    value: 654,
  },
  {
    class: "fi-kn",
    label: "Saint Kitts and Nevis",
    value: 659,
  },
  {
    class: "fi-ai",
    label: "Anguilla",
    value: 660,
  },
  {
    class: "fi-lc",
    label: "Saint Lucia",
    value: 662,
  },
  {
    class: "fi-mf",
    label: "Saint Martin (French part)",
    value: 663,
  },
  {
    class: "fi-pm",
    label: "Saint Pierre and Miquelon",
    value: 666,
  },
  {
    class: "fi-vc",
    label: "Saint Vincent and the Grenadines",
    value: 670,
  },
  {
    class: "fi-sm",
    label: "San Marino",
    value: 674,
  },
  {
    class: "fi-st",
    label: "Sao Tome and Principe",
    value: 678,
  },
  {
    class: "fi-sa",
    label: "Saudi Arabia",
    value: 682,
  },
  {
    class: "fi-sn",
    label: "Senegal",
    value: 686,
  },
  {
    class: "fi-rs",
    label: "Serbia",
    value: 688,
  },
  {
    class: "fi-sc",
    label: "Seychelles",
    value: 690,
  },
  {
    class: "fi-sl",
    label: "Sierra Leone",
    value: 694,
  },
  {
    class: "fi-sg",
    label: "Singapore",
    value: 702,
  },
  {
    class: "fi-sk",
    label: "Slovakia",
    value: 703,
  },
  {
    class: "fi-vn",
    label: "Viet Nam",
    value: 704,
  },
  {
    class: "fi-si",
    label: "Slovenia",
    value: 705,
  },
  {
    class: "fi-so",
    label: "Somalia",
    value: 706,
  },
  {
    class: "fi-za",
    label: "South Africa",
    value: 710,
  },
  {
    class: "fi-zw",
    label: "Zimbabwe",
    value: 716,
  },
  {
    class: "fi-es",
    label: "Spain",
    value: 724,
  },
  {
    class: "fi-ss",
    label: "South Sudan",
    value: 728,
  },
  {
    class: "fi-sd",
    label: "Sudan",
    value: 729,
  },
  {
    class: "fi-eh",
    label: "Western Sahara",
    value: 732,
  },
  {
    class: "fi-sr",
    label: "Suriname",
    value: 740,
  },
  {
    class: "fi-sj",
    label: "Svalbard and Jan Mayen",
    value: 744,
  },
  {
    class: "fi-sz",
    label: "Eswatini",
    value: 748,
  },
  {
    class: "fi-se",
    label: "Sweden",
    value: 752,
  },
  {
    class: "fi-ch",
    label: "Switzerland",
    value: 756,
  },
  {
    class: "fi-sy",
    label: "Syrian Arab Republic",
    value: 760,
  },
  {
    class: "fi-tj",
    label: "Tajikistan",
    value: 762,
  },
  {
    class: "fi-th",
    label: "Thailand",
    value: 764,
  },
  {
    class: "fi-tg",
    label: "Togo",
    value: 768,
  },
  {
    class: "fi-tk",
    label: "Tokelau",
    value: 772,
  },
  {
    class: "fi-to",
    label: "Tonga",
    value: 776,
  },
  {
    class: "fi-tt",
    label: "Trinidad and Tobago",
    value: 780,
  },
  {
    class: "fi-ae",
    label: "United Arab Emirates",
    value: 784,
  },
  {
    class: "fi-tn",
    label: "Tunisia",
    value: 788,
  },
  {
    class: "fi-tr",
    label: "Turkey",
    value: 792,
  },
  {
    class: "fi-tm",
    label: "Turkmenistan",
    value: 795,
  },
  {
    class: "fi-tc",
    label: "Turks and Caicos Islands",
    value: 796,
  },
  {
    class: "fi-tv",
    label: "Tuvalu",
    value: 798,
  },
  {
    class: "fi-ug",
    label: "Uganda",
    value: 800,
  },
  {
    class: "fi-ua",
    label: "Ukraine",
    value: 804,
  },
  {
    class: "fi-mk",
    label: "North Macedonia",
    value: 807,
  },
  {
    class: "fi-eg",
    label: "Egypt",
    value: 818,
  },
  {
    class: "fi-gb",
    label: "United Kingdom of Great Britain and Northern Ireland",
    value: 826,
  },
  {
    class: "fi-gg",
    label: "Guernsey",
    value: 831,
  },
  {
    class: "fi-je",
    label: "Jersey",
    value: 832,
  },
  {
    class: "fi-im",
    label: "Isle of Man",
    value: 833,
  },
  {
    class: "fi-tz",
    label: "Tanzania, United Republic of",
    value: 834,
  },
  {
    class: "fi-us",
    label: "United States of America",
    value: 840,
  },
  {
    class: "fi-vi",
    label: "Virgin Islands (U.S.)",
    value: 850,
  },
  {
    class: "fi-bf",
    label: "Burkina Faso",
    value: 854,
  },
  {
    class: "fi-uy",
    label: "Uruguay",
    value: 858,
  },
  {
    class: "fi-uz",
    label: "Uzbekistan",
    value: 860,
  },
  {
    class: "fi-ve",
    label: "Venezuela (Bolivarian Republic of)",
    value: 862,
  },
  {
    class: "fi-wf",
    label: "Wallis and Futuna",
    value: 876,
  },
  {
    class: "fi-ws",
    label: "Samoa",
    value: 882,
  },
  {
    class: "fi-ye",
    label: "Yemen",
    value: 887,
  },
  {
    class: "fi-zm",
    label: "Zambia",
    value: 894,
  },
]);
const getFlag = (code) => {
  const flag = flags.find((item) => {
    return item.value === code;
  });
  return flag ? flag.class : "";
};
export { flags, getFlag };
