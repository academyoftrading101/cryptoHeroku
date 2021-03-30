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

