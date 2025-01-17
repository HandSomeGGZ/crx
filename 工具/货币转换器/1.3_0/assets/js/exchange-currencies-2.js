// exchange-currencies-2.js - jlozano developer - Version 1.3 


// Bottom Currency List 

var ddData2 = [

// 1. US Dollar
		{
			text: "USD / " + currencytag1,
			value: "USD",
			selected: false,
			imageSrc: "assets/countries/united-states.svg"
		},
// 2. Euro
		{
			text: "EUR / " + currencytag2,
			value: "EUR",
			selected: false,
			imageSrc: "assets/countries/european-union.svg"
		},
// 3. Japanese Yen
		{
			text: "JPY / " + currencytag3,
			value: "JPY",
			selected: false,
			imageSrc: "assets/countries/japan.svg"
		},
// 4. Pound Sterling
		{
			text: "GBP / " + currencytag4,
			value: "GBP",
			selected: false,
			imageSrc: "assets/countries/united-kingdom.svg"
		},
// 5. Australian Dollar
		{
			text: "AUD / " + currencytag5,
			value: "AUD",
			selected: false,
			imageSrc: "assets/countries/australia.svg"
		},
// 6. Canadian Dollar
		{
			text: "CAD / " + currencytag6,
			value: "CAD",
			selected: false,
			imageSrc: "assets/countries/canada.svg"
		},
// 7. Swiss Franc
		{
			text: "CHF / " + currencytag7,
			value: "CHF",
			selected: false,
			imageSrc: "assets/countries/switzerland.svg"
		},
// 8. Chinese Yuan
		{
			text: "CNY / " + currencytag8,
			value: "CNY",
			selected: false,
			imageSrc: "assets/countries/china.svg"
		},
// 9. Swedish Krona
		{
			text: "SEK / " + currencytag9,
			value: "SEK",
			selected: false,
			imageSrc: "assets/countries/sweden.svg"
		},
// 10. New Zealand Dollar
		{
			text: "NZD / " + currencytag10,
			value: "NZD",
			selected: false,
			imageSrc: "assets/countries/new-zealand.svg"
		},
// 11. Mexican Peso
		{
			text: "MXN / " + currencytag11,
			value: "MXN",
			selected: false,
			imageSrc: "assets/countries/mexico.svg"
		},
// 12. Singapore Dollar
		{
			text: "SGD / " + currencytag12,
			value: "SGD",
			selected: false,
			imageSrc: "assets/countries/singapore.svg"
		},
// 13. Hong Kong Dollar
		{
			text: "HKD / " + currencytag13,
			value: "HKD",
			selected: false,
			imageSrc: "assets/countries/hong-kong.svg"
		},
// 14. Norwegian Krone
		{
			text: "NOK / " + currencytag14,
			value: "NOK",
			selected: false,
			imageSrc: "assets/countries/norway.svg"
		},
// 15. South Korean Won
		{
			text: "KRW / " + currencytag15,
			value: "KRW",
			selected: false,
			imageSrc: "assets/countries/south-korea.svg"
		},
// 16. Turkish Lira
		{
			text: "TRY / " + currencytag16,
			value: "TRY",
			selected: false,
			imageSrc: "assets/countries/turkey.svg"
		},
// 17. Russian Ruble
		{
			text: "RUB / " + currencytag17,
			value: "RUB",
			selected: false,
			imageSrc: "assets/countries/russia.svg"
		},
// 18. Indian Rupee
		{
			text: "INR / " + currencytag18,
			value: "INR",
			selected: false,
			imageSrc: "assets/countries/india.svg"
		},
// 19. Brazilian Real
		{
			text: "BRL / " + currencytag19,
			value: "BRL",
			selected: false,
			imageSrc: "assets/countries/brazil.svg"
		},
// 20. South African Rand
		{
			text: "ZAR / " + currencytag20,
			value: "ZAR",
			selected: false,
			imageSrc: "assets/countries/south-africa.svg"
		},
// 21. Philippine Peso
		{
			text: "PHP / " + currencytag21,
			value: "PHP",
			selected: false,
			imageSrc: "assets/countries/philippines.svg"
		},
// 22. Czech Koruna
		{
			text: "CZK / " + currencytag22,
			value: "CZK",
			selected: false,
			imageSrc: "assets/countries/czech-republic.svg"
		},
// 23. Indonesian Rupiah
		{
			text: "IDR / " + currencytag23,
			value: "IDR",
			selected: false,
			imageSrc: "assets/countries/indonesia.svg"
		},
// 24. Malaysian Ringgit
		{
			text: "MYR / " + currencytag24,
			value: "MYR",
			selected: false,
			imageSrc: "assets/countries/malaysia.svg"
		},
// 25. Hungarian Forint
		{
			text: "HUF / " + currencytag25,
			value: "HUF",
			selected: false,
			imageSrc: "assets/countries/hungary.svg"
		},
// 26. Icelandic krona
		{
			text: "ISK / " + currencytag26,
			value: "ISK",
			selected: false,
			imageSrc: "assets/countries/iceland.svg"
		},
// 27. Croatian Kuna
		{
			text: "HRK / " + currencytag27,
			value: "HRK",
			selected: false,
			imageSrc: "assets/countries/croatia.svg"
		},
// 28. Bulgarian Lev
		{
			text: "BGN / " + currencytag28,
			value: "BGN",
			selected: false,
			imageSrc: "assets/countries/bulgaria.svg"
		},
// 29. Romanian Leu
		{
			text: "RON / " + currencytag29,
			value: "RON",
			selected: false,
			imageSrc: "assets/countries/romania.svg"
		},
// 30. Danish Krone
		{
			text: "DKK / " + currencytag30,
			value: "DKK",
			selected: false,
			imageSrc: "assets/countries/denmark.svg"
		},
// 31. Thai Baht
		{
			text: "THB / " + currencytag31,
			value: "THB",
			selected: false,
			imageSrc: "assets/countries/thailand.svg"
		},
// 32. Polish Zloty
		{
			text: "PLN / " + currencytag32,
			value: "PLN",
			selected: false,
			imageSrc: "assets/countries/poland.svg"
		},
// 33. Israeli Shekel
		{
			text: "ILS / " + currencytag33,
			value: "ILS",
			selected: false,
			imageSrc: "assets/countries/israel.svg"
		},

]	

// exchange-currencies-2.js - jlozano developer - Version 1.3 