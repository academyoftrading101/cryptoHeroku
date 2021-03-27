let final_value = 1000000 * (1+0.07)^8


function pmt(rate_per_period, number_of_payments, present_value, future_value, type) {
    if (rate_per_period != 0.0) 
    {
        // Interest rate exists
        var q = Math.pow(1 + rate_per_period, number_of_payments);
        return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));

    } 
    
    else if (number_of_payments != 0.0) {
        return -(future_value + present_value) / number_of_payments;
    }

    return 0;
}

function CalcPMT(RateReturn, Amt, ExpInflation, years, position) {
    let i = RateReturn
    let xi = ExpInflation
    let n = years
    var monthly = Math.round(pmt(i / 1200, n * 12, 0, -xi, 1));
    return monthly
}   

    console.log(CalcPMT(5,0,1718186,8,0))





    //








//     //function for Inflation Adjusted Sum value
// function InflationAdjustedSum(Amt, ExpInflation, years, position) {    
//     var Amt = parseInt(Amt.replace(/\,/g, ''));
//     var ExpInflation = parseInt(ExpInflation.replace(/\,/g, ''));
//     var years = parseInt(years.replace(/\,/g, ''));

//     var answer = Math.round(Amt * Math.pow((1 + (ExpInflation / 100)), years));
//     switch (position) {
//         case position:
//             if (isNaN(answer)) {
//                 document.getElementById("txtInflation" + position).innerHTML = 00;
//                 document.getElementById("year" + position).innerHTML = 00;
                
//                 document.getElementById("gyrs" + position).innerHTML = 00;
//                 document.getElementById("ygyrs" + position).innerHTML = 00;                
//             }
//             else {
//                 document.getElementById("txtInflation" + position).innerHTML = addCommasValue(answer);
//                 document.getElementById("year" + position).innerHTML = years;
//                 document.getElementById("gyrs" + position).innerHTML = years;
//                 document.getElementById("ygyrs" + position).innerHTML = years;               
//             }
//             break;
//         default:

//     }

// }
// ///////////PMT function
// function pmt(rate_per_period, number_of_payments, present_value, future_value, type) {
//     if (rate_per_period != 0.0) {
//         // Interest rate exists
//         var q = Math.pow(1 + rate_per_period, number_of_payments);
//         return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));

//     } else if (number_of_payments != 0.0) {
//         // No interest rate, but number of payments exists
//         return -(future_value + present_value) / number_of_payments;
//     }

//     return 0;
// }
// /*CalcPMT function*/
// function CalcPMT(RateReturn, Amt, ExpInflation, years, position) {
//     var i = parseInt(RateReturn.replace(/\,/g, ''));
//     var p = parseInt(Amt.replace(/\,/g, ''));
//     var Inf = parseInt(ExpInflation.replace(/\,/g, ''));

//     var n = parseInt(years);
//     var monthly = Math.round(pmt(i / 1200, n * 12, 0, -Inf, 1));
//     var annually = Math.round(pmt(i / 100, n, 0, -Inf, 1));
//     switch (position) {
//         case position:
//             if (isNaN(monthly)) {
//                 document.getElementById("txtMonthly" + position).innerHTML = 00;
//                 document.getElementById("grs" + position).innerHTML = 00;             
//             }
//             else {
//                 document.getElementById("txtMonthly" + position).innerHTML = addCommasValue(parseInt(monthly));
//                 document.getElementById("grs" + position).innerHTML = addCommasValue(parseInt(monthly));                    
//             }
//             if (isNaN(annually)) {
//                 document.getElementById("txtAnual" + position).innerHTML = 00;
//                 document.getElementById("ygrs" + position).innerHTML = 00;                
//             }
//             else {
//                 document.getElementById("txtAnual" + position).innerHTML = addCommasValue(parseInt(annually));
//                 document.getElementById("ygrs" + position).innerHTML = addCommasValue(parseInt(annually));            
//             }
//             break;
//         default:

//     }
// }

// function CalculateTotal() {
//     var adjustedu = 0;
//     var monthlyedu = 0;
//     var yearlyedu = 0;
//     var Adjustedsum = 0;
//     var Monthlysum = 0;
//     var Yearlysum = 0;

//     if (parseInt(selgls[1]) != 0) {
//         if (noc == 2) {
//             if (!isNaN(parseInt(document.getElementById("txtInflation21").innerHTML.replace(/\,/g, '')))) {
//                 Adjustedsum += parseInt(document.getElementById("txtInflation21").innerHTML.replace(/\,/g, ''));
//             }
//             if (!isNaN(parseInt(document.getElementById("txtMonthly21").innerHTML.replace(/\,/g, '')))) {
//                 Monthlysum += parseInt(document.getElementById("txtMonthly21").innerHTML.replace(/\,/g, ''));
//             }
//             if (!isNaN(parseInt(document.getElementById("txtAnual21").innerHTML.replace(/\,/g, '')))) {
//                 Yearlysum += parseInt(document.getElementById("txtAnual21").innerHTML.replace(/\,/g, ''));
//             }

//             if (!isNaN(parseInt(document.getElementById("txtInflation22").innerHTML.replace(/\,/g, '')))) {
//                 Adjustedsum += parseInt(document.getElementById("txtInflation22").innerHTML.replace(/\,/g, ''));
//             }
//             if (!isNaN(parseInt(document.getElementById("txtMonthly22").innerHTML.replace(/\,/g, '')))) {
//                 Monthlysum += parseInt(document.getElementById("txtMonthly22").innerHTML.replace(/\,/g, ''));
//             }
//             if (!isNaN(parseInt(document.getElementById("txtAnual22").innerHTML.replace(/\,/g, '')))) {
//                 Yearlysum += parseInt(document.getElementById("txtAnual22").innerHTML.replace(/\,/g, ''));
//             }
//         }
//         else {
//             if (!isNaN(parseInt(document.getElementById("txtInflation2").innerHTML.replace(/\,/g, '')))) {
//                 Adjustedsum += parseInt(document.getElementById("txtInflation2").innerHTML.replace(/\,/g, ''));
//             }
//             if (!isNaN(parseInt(document.getElementById("txtMonthly2").innerHTML.replace(/\,/g, '')))) {
//                 Monthlysum += parseInt(document.getElementById("txtMonthly2").innerHTML.replace(/\,/g, ''));
//             }
//             if (!isNaN(parseInt(document.getElementById("txtAnual2").innerHTML.replace(/\,/g, '')))) {
//                 Yearlysum += parseInt(document.getElementById("txtAnual2").innerHTML.replace(/\,/g, ''));
//             }
//         }
//     }

//     //add the values if the first block is shown
//     if (parseInt(selgls[0]) != 0) {
//         if (!isNaN(parseInt(document.getElementById("txtInflation1").innerHTML.replace(/\,/g, '')))) {
//             Adjustedsum += parseInt(document.getElementById("txtInflation1").innerHTML.replace(/\,/g, ''));
//         }
//         if (!isNaN(parseInt(document.getElementById("txtMonthly1").innerHTML.replace(/\,/g, '')))) {
//             Monthlysum += parseInt(document.getElementById("txtMonthly1").innerHTML.replace(/\,/g, ''));
//         }
//         if (!isNaN(parseInt(document.getElementById("txtAnual1").innerHTML.replace(/\,/g, '')))) {
//             Yearlysum += parseInt(document.getElementById("txtAnual1").innerHTML.replace(/\,/g, ''));
//         }
//     }
//     //add the values if the third block is shown
//     if (parseInt(selgls[2]) != 0) {
//         if (!isNaN(parseInt(document.getElementById("txtInflation2").innerHTML.replace(/\,/g, '')))) {
//             Adjustedsum += parseInt(document.getElementById("txtInflation2").innerHTML.replace(/\,/g, ''));
//         }
//         if (!isNaN(parseInt(document.getElementById("txtMonthly2").innerHTML.replace(/\,/g, '')))) {
//             Monthlysum += parseInt(document.getElementById("txtMonthly2").innerHTML.replace(/\,/g, ''));
//         }
//         if (!isNaN(parseInt(document.getElementById("txtAnual2").innerHTML.replace(/\,/g, '')))) {
//             Yearlysum += parseInt(document.getElementById("txtAnual2").innerHTML.replace(/\,/g, ''));
//         }
//     }
//     //add the values if the fourth block is shown
//     if (parseInt(selgls[3]) != 0) {
//         if (!isNaN(parseInt(document.getElementById("txtInflation4").innerHTML.replace(/\,/g, '')))) {
//             Adjustedsum += parseInt(document.getElementById("txtInflation4").innerHTML.replace(/\,/g, ''));
//         }
//         if (!isNaN(parseInt(document.getElementById("txtMonthly4").innerHTML.replace(/\,/g, '')))) {
//             Monthlysum += parseInt(document.getElementById("txtMonthly4").innerHTML.replace(/\,/g, ''));
//         }
//         if (!isNaN(parseInt(document.getElementById("txtAnual4").innerHTML.replace(/\,/g, '')))) {
//             Yearlysum += parseInt(document.getElementById("txtAnual4").innerHTML.replace(/\,/g, ''));
//         }
//     }
//     //add the values if the fifth block is shown
//     if (parseInt(selgls[4]) != 0) {
//         if (!isNaN(parseInt(document.getElementById("txtInflation5").innerHTML.replace(/\,/g, '')))) {
//             Adjustedsum += parseInt(document.getElementById("txtInflation5").innerHTML.replace(/\,/g, ''));
//         }
//         if (!isNaN(parseInt(document.getElementById("txtMonthly5").innerHTML.replace(/\,/g, '')))) {
//             Monthlysum += parseInt(document.getElementById("txtMonthly5").innerHTML.replace(/\,/g, ''));
//         }
//         if (!isNaN(parseInt(document.getElementById("txtAnual5").innerHTML.replace(/\,/g, '')))) {
//             Yearlysum += parseInt(document.getElementById("txtAnual5").innerHTML.replace(/\,/g, ''));
//         }
//     }

//     document.getElementById("txtInflation").innerHTML = addCommasValue(parseInt(Adjustedsum));
//     document.getElementById("txtMonthly").innerHTML = addCommasValue(parseInt(Monthlysum));
//     document.getElementById("txtAnual").innerHTML = addCommasValue(parseInt(Yearlysum));

// }

// function InflationCall() {
//     if (parseInt(selgls[0]) != 0) {
//         InflationAdjustedSum(document.getElementById('txtAmt1').value, document.getElementById('txtExpInflation1').value, document.getElementById('txtTimeGoal1').value, 1);
//         CalcPMT(document.getElementById('txtExpRateReturn1').value, document.getElementById('txtAmt1').value, document.getElementById('txtInflation1').innerHTML, document.getElementById('txtTimeGoal1').value, 1);
//     }    
//     if (parseInt(selgls[1]) != 0) {
//         if (noc == 2) {
//             InflationAdjustedSum(document.getElementById('txtAmt21').value, document.getElementById('txtExpInflation21').value, document.getElementById('txtTimeGoal21').value, 21);
//             CalcPMT(document.getElementById('txtExpRateReturn21').value, document.getElementById('txtAmt21').value, document.getElementById('txtInflation21').innerHTML, document.getElementById('txtTimeGoal21').value, 21);
            
//             InflationAdjustedSum(document.getElementById('txtAmt22').value, document.getElementById('txtExpInflation22').value, document.getElementById('txtTimeGoal22').value, 22);
//             CalcPMT(document.getElementById('txtExpRateReturn22').value, document.getElementById('txtAmt22').value, document.getElementById('txtInflation22').innerHTML, document.getElementById('txtTimeGoal22').value, 22);
//         }
//         else {
//             InflationAdjustedSum(document.getElementById('txtAmt2').value, document.getElementById('txtExpInflation2').value, document.getElementById('txtTimeGoal2').value, 2);
//             CalcPMT(document.getElementById('txtExpRateReturn2').value, document.getElementById('txtAmt2').value, document.getElementById('txtInflation2').innerHTML, document.getElementById('txtTimeGoal2').value, 2);
//         }
//     }

//     if (parseInt(selgls[2]) != 0) {        
//         InflationAdjustedSum(document.getElementById('txtAmt3').value, document.getElementById('txtExpInflation3').value, document.getElementById('txtTimeGoal3').value, 3);
//         CalcPMT(document.getElementById('txtExpRateReturn3').value, document.getElementById('txtAmt3').value, document.getElementById('txtInflation3').innerHTML, document.getElementById('txtTimeGoal3').value, 3);
//     }

//     if (parseInt(selgls[3]) != 0) {
//         InflationAdjustedSum(document.getElementById('txtAmt4').value, document.getElementById('txtExpInflation4').value, document.getElementById('txtTimeGoal4').value, 4);
//         CalcPMT(document.getElementById('txtExpRateReturn4').value, document.getElementById('txtAmt4').value, document.getElementById('txtInflation4').innerHTML, document.getElementById('txtTimeGoal4').value, 4);
//     }

//     if (parseInt(selgls[4]) != 0) {
//         InflationAdjustedSum(document.getElementById('txtAmt5').value, document.getElementById('txtExpInflation5').value, document.getElementById('txtTimeGoal5').value, 5);
//         CalcPMT(document.getElementById('txtExpRateReturn5').value, document.getElementById('txtAmt5').value, document.getElementById('txtInflation5').innerHTML, document.getElementById('txtTimeGoal5').value, 5);
//     }

//     CalculateTotal();

//     if ($(".rsamt label").html().length >= 20) {
//         $(".rsamt").css("font-size", "20px");
//     }
//     else if ($(".rsamt label").html().length >= 17) {
//         $(".rsamt").css("font-size", "32px");
//     }
//     else if ($(".rsamt label").html().length >= 12) {
//         $(".rsamt").css("font-size", "36px");
//     }
//     else {
//         $(".rsamt").css("font-size", "45px");
//     }
// }

// /*add commas to the textboxes 
// @param: HTMLelement*/
// function addCommas(Num) {
//     ////My array
//     var Number1 = Num.value;
//     var CommaSeperaterList = '3,2,2,2,2,2,2,2,2';
//     var Number = Number1.replace(/\,/g, '');
//     var myArray = CommaSeperaterList.split(',');

//     var newNum = "";
//     var newNum2 = "";
//     var count = 0;
//     if (Number.indexOf('.') != -1) { ////number ends with a decimal point
//         /*if (Number.indexOf('.') == Number.length-1){
//         Number += "00";
//         }
//         if (Number.indexOf('.') == Number.length-2){ ////number ends with a single digit
//         Number += "0";
//         }*/
//         places = Number.length - Number.indexOf('.') - 1;
//         if (places >= 3) { ////number ends with a three or more digit
//             num = parseFloat(Number);
//             Number = num.toFixed(2);
//         }
//         var a = Number.split(".");
//         Number = a[0]; ////the part we will commaSeperation
//         var end = '.' + a[1] ////the decimal place we will ignore and add back later
//     }
//     else { var end = ""; }
//     var q = 0;
//     for (var k = Number.length - 1; k >= 0; k--) {
//         ar = myArray[q]

//         var oneChar = Number.charAt(k);
//         if (count == ar) {
//             newNum += ","
//             newNum += oneChar;
//             count = 1;
//             q++;
//             continue;
//         }
//         else {
//             newNum += oneChar;
//             count++;
//         }
//     }
//     for (var k = newNum.length - 1; k >= 0; k--) {
//         var oneChar = newNum.charAt(k);
//         newNum2 += oneChar;
//     }
//     Num.value = newNum2 + end;
// }

// /*add commas to the value supplied to the function 
// @param: the value to be converted to comma separated*/
// function addCommasValue(Num) {
//     ////My array
//     var Number1 = Num;
//     var CommaSeperaterList = '3,2,2,2,2,2,2,2,2';
//     var Number = Number1.toString().replace(/\,/g, '');
//     var myArray = CommaSeperaterList.split(',');

//     var newNum = "";
//     var newNum2 = "";
//     var count = 0;
//     if (Number.indexOf('.') != -1) { ////number ends with a decimal point
//         if (Number.indexOf('.') == Number.length - 1) {
//             Number += "00";
//         }
//         if (Number.indexOf('.') == Number.length - 2) { ////number ends with a single digit
//             Number += "0";
//         }
//         var a = Number.split(".");
//         Number = a[0]; ////the part we will commaSeperation
//         var end = '.' + a[1] ////the decimal place we will ignore and add back later
//     }
//     else { var end = ""; }
//     var q = 0;
//     for (var k = Number.length - 1; k >= 0; k--) {
//         ar = myArray[q]

//         var oneChar = Number.charAt(k);
//         if (count == ar) {
//             newNum += ","
//             newNum += oneChar;
//             count = 1;
//             q++;
//             continue;
//         }
//         else {
//             newNum += oneChar;
//             count++;
//         }
//     }
//     for (var k = newNum.length - 1; k >= 0; k--) {
//         var oneChar = newNum.charAt(k);
//         newNum2 += oneChar;
//     }
//     return newNum2 + end;
// }

// //validation for numbers with comma
// function validDigits(field, fieldname) {
//     sText = field.value;
//     var ValidChars = "0123456789.,";
//     var IsNumber = true;
//     var Char;
//     for (i = 0; i < sText.length && IsNumber == true; i++) {
//         Char = sText.charAt(i);
//         if (ValidChars.indexOf(Char) == -1) {
//             IsNumber = false;
//             sText = sText.replace(/[a-zA-Z \-\&\^\(\)\+=#@~`\!%\$\/\*{}\[\]]+/g, '');
//             field.value = sText;
//             inlineMsg(fieldname, 'Please enter numbers', 3);
//             return IsNumber;
//         }
//     }
//     return IsNumber;
// }

// /*check for digits only*/
// function DigitsOnly(field) {
//     sText = field.value;
//     var ValidChars = /^[0-9]*$/;
//     if (ValidChars.test(sText) == false) {
//         field.value = '1';
//         return false;
//     }
//     return true;
// }

// /*function to determine whether a field contains characters*/
// function isAlphabetic(field) {
//     val = field.value;
//     if (val.match(/^[ a-zA-Z]+$/)) {
//         return true;
//     }
//     else {
//         field.value = '';
//     }
// }