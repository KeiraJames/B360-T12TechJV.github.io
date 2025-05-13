window.addEventListener('DOMContentLoaded', (event) => {
    const initialDepositEl = document.getElementById('initialDeposit');
    const monthlyContributionEl = document.getElementById('monthlyContribution');
    const interestRateEl = document.getElementById('interestRate');
    const yearsEl = document.getElementById('years');
    const calculateButton = document.getElementById('calculateButton');
    const resultsAreaEl = document.getElementById('resultsArea');

    const totalSavedResultEl = document.getElementById('totalSavedResult');
    const interestEarnedResultEl = document.getElementById('interestEarnedResult');
    const futureValueResultEl = document.getElementById('futureValueResult');

    calculateButton.addEventListener('click', () => {
        // Get values from input fields
        const P = parseFloat(initialDepositEl.value) || 0; // Principal (Initial Deposit)
        const PMT = parseFloat(monthlyContributionEl.value) || 0; // Monthly Contribution
        const r_annual_percent = parseFloat(interestRateEl.value) || 0; // Annual interest rate (percentage)
        const t = parseInt(yearsEl.value) || 0; // Number of years
        
        // Get compounding frequency
        const compoundingRadios = document.getElementsByName('compounding');
        let n = 1; // Default to annually
        for (const radio of compoundingRadios) {
            if (radio.checked) {
                n = parseInt(radio.value);
                break;
            }
        }

        // Convert annual rate percentage to decimal and then to periodic rate
        const r_annual_decimal = r_annual_percent / 100;
        const r_periodic = r_annual_decimal / n; // Periodic interest rate

        const nt = n * t; // Total number of compounding periods

        // --- Compound Interest Formula for initial deposit ---
        // FV_principal = P * (1 + r/n)^(nt)
        const fv_principal = P * Math.pow((1 + r_periodic), nt);

        // --- Future Value of a Series Formula for monthly contributions ---
        // FV_series = PMT * [ ((1 + r/n)^(nt) - 1) / (r/n) ]
        // This formula assumes PMT is made at the end of each period.
        // If PMT is made at the beginning, there's a slight adjustment.
        // For simplicity, and if contributions are at the same frequency as compounding:
        let fv_series = 0;
        if (PMT > 0 && r_periodic > 0) { // Only if there are contributions and interest
            // If compounding is monthly (n=12), and PMT is monthly, this is straightforward.
            // If compounding is annual (n=1), and PMT is monthly, this formula needs adjustment
            // or we need to calculate it year by year.
            // For this example, let's assume PMT aligns with compounding periods
            // If n=12 (monthly compounding), PMT is the monthly contribution.
            // If n=1 (annual compounding), we need to treat PMT as an annual sum or adjust.
            
            if (n === 12) { // Monthly compounding and monthly PMT
                 fv_series = PMT * ((Math.pow((1 + r_periodic), nt) - 1) / r_periodic);
            } else if (n === 1 && PMT > 0) { // Annual compounding, but monthly PMT
                // More complex: Each year's monthly contributions become a mini-annuity.
                // Simpler approach for this example: Sum contributions for a year and treat as end-of-year deposit.
                // Or, for a more accurate calculation, iterate year by year.
                // Let's do an iterative approach for annual compounding with monthly contributions
                let current_balance_for_series = 0;
                let annual_contribution = PMT * 12;
                for (let year = 0; year < t; year++) {
                    current_balance_for_series = (current_balance_for_series + annual_contribution) * (1 + r_annual_decimal);
                }
                fv_series = current_balance_for_series;
                // To be super precise for annual compounding with monthly payment, one might consider the interest earned
                // on those monthly payments within the year. For this example, we'll use the iterative sum above.
            }
        } else if (PMT > 0 && r_periodic === 0) { // No interest, just sum of contributions
             fv_series = PMT * nt; // If PMT is per compounding period
             if (n === 1 && PMT > 0) { // Annual compounding, sum of monthly PMTs
                 fv_series = PMT * 12 * t;
             }
        }


        const futureValue = fv_principal + fv_series;
        
        let totalPrincipalInvested = P;
        if (n === 12) {
            totalPrincipalInvested += (PMT * 12 * t);
        } else if (n === 1) {
            totalPrincipalInvested += (PMT * 12 * t); // Assuming PMT is monthly regardless of compounding
        }

        const interestEarned = futureValue - totalPrincipalInvested;

        // Display results
        totalSavedResultEl.textContent = `$${totalPrincipalInvested.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        interestEarnedResultEl.textContent = `$${interestEarned.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        futureValueResultEl.textContent = `$${futureValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        
        resultsAreaEl.style.display = 'block'; // Show results
    });
});
