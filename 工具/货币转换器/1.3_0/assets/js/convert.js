// convert.js - jlozano developer - Version 1.3 


// Open popup

var Popup = localStorage.getItem("Popup");

$(".popup").on('click', function () {
	var myWidth = 400;
 var myHeight = 520;
 var left = (screen.width - myWidth) / 1.05;
 var top = 60;
 window.open(location.href, "popUpWindow",'scrollbars=no,resizable=no,titlebar=no,toolbar=no,menubar=no,location=no,directories=no,status=yes,width=' + myWidth + ',height=' + myHeight + ',top=' + top + ', left=' + left);
	// window.close();
});


// Save amount if change input value
					
$('.importe').change(function () {
    localStorage[$(this).attr('name')] = $(this).val();
});


// Load amount saved 

$(document).ready(function () {
    function init() {
					if (localStorage["importe"]) {
									$('#amount').val(localStorage["importe"]);
					}		
    }		
	 init();	
});

// bt Swap currencies

$('#swap').on('click', function () {			
	var Currency_1 = localStorage.getItem("Currency_1");
	var Currency_2 = localStorage.getItem("Currency_2");
	localStorage.setItem('Currency_1', Currency_2);	
	localStorage.setItem('Currency_2', Currency_1);	
});


// Active selects currencies


// Currency_1

$("#fromDropdown").ddslick({
    data: ddData1,
    width: 300,
    height: 200,
    imagePosition: "left",
    selectText: tag1,
    onSelected: function selection(data) {
				console.log(data);
    selFrom = data.selectedData.value;
				localStorage.setItem('Currency_1', data.selectedData.value);
    }
});

// Currency_2

$("#toDropdown").ddslick({
    data: ddData2,
    width: 300,
    height: 200,
    imagePosition: "left",
    selectText: tag1,
    onSelected: function(data) {
				console.log(data);
    selTo = data.selectedData.value;
				localStorage.setItem('Currency_2', data.selectedData.value);
    }
});


// Save localStorage - Selected currency

var Currency_1 = localStorage.getItem("Currency_1");
var Currency_2 = localStorage.getItem("Currency_2");

// document.getElementById("code_currency").innerHTML = Currency_1;

// Currency_1 

if (Currency_1 == "USD") {$('#fromDropdown').ddslick('select', {index: 0 });}
if (Currency_1 == "EUR") {$('#fromDropdown').ddslick('select', {index: 1 });}
if (Currency_1 == "JPY") {$('#fromDropdown').ddslick('select', {index: 2 });}
if (Currency_1 == "GBP") {$('#fromDropdown').ddslick('select', {index: 3 });}
if (Currency_1 == "AUD") {$('#fromDropdown').ddslick('select', {index: 4 });}
if (Currency_1 == "CAD") {$('#fromDropdown').ddslick('select', {index: 5 });}
if (Currency_1 == "CHF") {$('#fromDropdown').ddslick('select', {index: 6 });}
if (Currency_1 == "CNY") {$('#fromDropdown').ddslick('select', {index: 7 });}
if (Currency_1 == "SEK") {$('#fromDropdown').ddslick('select', {index: 8 });}
if (Currency_1 == "NZD") {$('#fromDropdown').ddslick('select', {index: 9 });}
if (Currency_1 == "MXN") {$('#fromDropdown').ddslick('select', {index: 10 });}
if (Currency_1 == "SGD") {$('#fromDropdown').ddslick('select', {index: 11 });}
if (Currency_1 == "HKD") {$('#fromDropdown').ddslick('select', {index: 12 });}
if (Currency_1 == "NOK") {$('#fromDropdown').ddslick('select', {index: 13 });}
if (Currency_1 == "KRW") {$('#fromDropdown').ddslick('select', {index: 14 });}
if (Currency_1 == "TRY") {$('#fromDropdown').ddslick('select', {index: 15 });}
if (Currency_1 == "RUB") {$('#fromDropdown').ddslick('select', {index: 16 });}
if (Currency_1 == "INR") {$('#fromDropdown').ddslick('select', {index: 17 });}
if (Currency_1 == "BRL") {$('#fromDropdown').ddslick('select', {index: 18 });}
if (Currency_1 == "ZAR") {$('#fromDropdown').ddslick('select', {index: 19 });}
if (Currency_1 == "PHP") {$('#fromDropdown').ddslick('select', {index: 20 });}
if (Currency_1 == "CZK") {$('#fromDropdown').ddslick('select', {index: 21 });}
if (Currency_1 == "IDR") {$('#fromDropdown').ddslick('select', {index: 22 });}
if (Currency_1 == "MYR") {$('#fromDropdown').ddslick('select', {index: 23 });}
if (Currency_1 == "HUF") {$('#fromDropdown').ddslick('select', {index: 24 });}
if (Currency_1 == "ISK") {$('#fromDropdown').ddslick('select', {index: 25 });}
if (Currency_1 == "HRK") {$('#fromDropdown').ddslick('select', {index: 26 });}
if (Currency_1 == "BGN") {$('#fromDropdown').ddslick('select', {index: 27 });}
if (Currency_1 == "RON") {$('#fromDropdown').ddslick('select', {index: 28 });}
if (Currency_1 == "DKK") {$('#fromDropdown').ddslick('select', {index: 29 });}
if (Currency_1 == "THB") {$('#fromDropdown').ddslick('select', {index: 30 });}
if (Currency_1 == "PLN") {$('#fromDropdown').ddslick('select', {index: 31 });}
if (Currency_1 == "ILS") {$('#fromDropdown').ddslick('select', {index: 32 });}

// Currency_2 

if (Currency_2 == "USD") {$('#toDropdown').ddslick('select', {index: 0 });}
if (Currency_2 == "EUR") {$('#toDropdown').ddslick('select', {index: 1 });}
if (Currency_2 == "JPY") {$('#toDropdown').ddslick('select', {index: 2 });}
if (Currency_2 == "GBP") {$('#toDropdown').ddslick('select', {index: 3 });}
if (Currency_2 == "AUD") {$('#toDropdown').ddslick('select', {index: 4 });}
if (Currency_2 == "CAD") {$('#toDropdown').ddslick('select', {index: 5 });}
if (Currency_2 == "CHF") {$('#toDropdown').ddslick('select', {index: 6 });}
if (Currency_2 == "CNY") {$('#toDropdown').ddslick('select', {index: 7 });}
if (Currency_2 == "SEK") {$('#toDropdown').ddslick('select', {index: 8 });}
if (Currency_2 == "NZD") {$('#toDropdown').ddslick('select', {index: 9 });}
if (Currency_2 == "MXN") {$('#toDropdown').ddslick('select', {index: 10 });}
if (Currency_2 == "SGD") {$('#toDropdown').ddslick('select', {index: 11 });}
if (Currency_2 == "HKD") {$('#toDropdown').ddslick('select', {index: 12 });}
if (Currency_2 == "NOK") {$('#toDropdown').ddslick('select', {index: 13 });}
if (Currency_2 == "KRW") {$('#toDropdown').ddslick('select', {index: 14 });}
if (Currency_2 == "TRY") {$('#toDropdown').ddslick('select', {index: 15 });}
if (Currency_2 == "RUB") {$('#toDropdown').ddslick('select', {index: 16 });}
if (Currency_2 == "INR") {$('#toDropdown').ddslick('select', {index: 17 });}
if (Currency_2 == "BRL") {$('#toDropdown').ddslick('select', {index: 18 });}
if (Currency_2 == "ZAR") {$('#toDropdown').ddslick('select', {index: 19 });}
if (Currency_2 == "PHP") {$('#toDropdown').ddslick('select', {index: 20 });}
if (Currency_2 == "CZK") {$('#toDropdown').ddslick('select', {index: 21 });}
if (Currency_2 == "IDR") {$('#toDropdown').ddslick('select', {index: 22 });}
if (Currency_2 == "MYR") {$('#toDropdown').ddslick('select', {index: 23 });}
if (Currency_2 == "HUF") {$('#toDropdown').ddslick('select', {index: 24 });}
if (Currency_2 == "ISK") {$('#toDropdown').ddslick('select', {index: 25 });}
if (Currency_2 == "HRK") {$('#toDropdown').ddslick('select', {index: 26 });}
if (Currency_2 == "BGN") {$('#toDropdown').ddslick('select', {index: 27 });}
if (Currency_2 == "RON") {$('#toDropdown').ddslick('select', {index: 28 });}
if (Currency_2 == "DKK") {$('#toDropdown').ddslick('select', {index: 29 });}
if (Currency_2 == "THB") {$('#toDropdown').ddslick('select', {index: 30 });}
if (Currency_2 == "PLN") {$('#toDropdown').ddslick('select', {index: 31 });}
if (Currency_2 == "ILS") {$('#toDropdown').ddslick('select', {index: 32 });}


// Button convert

document.getElementById("convert").addEventListener('click', convertCurrency);

// Convert currency

function convertCurrency() {
    var fromCurrency = selFrom;
    var toCurrency = selTo;
    var xmlhttp = new XMLHttpRequest();
				var url = "https://api.exchangeratesapi.io/latest";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var result = xmlhttp.responseText;
            var jsResult = JSON.parse(result);
        if (selFrom === "EUR") {
            oneUnit = jsResult.rates[toCurrency];
        }							
								else if (selTo === "EUR") {
            oneUnit = 1/jsResult.rates[fromCurrency];
        }
								else 
            var oneUnit = jsResult.rates[toCurrency]/jsResult.rates[fromCurrency];
            var amount = document.getElementById('amount').value;
            var res = document.getElementById('result');
            var calculation = oneUnit*amount;
            if(amount == 0){
            res.innerHTML = tag2;
            }
				   else {
        if (selTo == selFrom) {
            res.textContent = tag3;
								}
        else {      
            res.textContent = amount + " " + selFrom + " = " + calculation.toFixed(2) + " " + selTo;
												}
        }
    }
}
}

// convert.js - jlozano developer - Version 1.3 