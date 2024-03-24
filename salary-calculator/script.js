const TAX_RATES = {
    '0 - 24,000': 10,
    '24,001 - 32,333': 25,
    '32,334 - 500,000': 30,
    '500,001 - 800,000': 32.5,
    'Above 800,000': 35,
};

const NHIF_RATES = {
    '0 - 5,999': 150,
    '6,000 - 7,999': 300,
    '8,000 - 11,999': 400,
    '12,000 - 14,999': 500,
    '15,000 - 19,999': 600,
    '20,000 - 24,999': 750,
    '25,000 - 29,999': 850,
    '30,000 - 34,999': 900,
    '35,000 - 39,999': 950,
    '40,000 - 44,999': 1000,
    '45,000 - 49,999': 1100,
    '50,000 - 59,999': 1200,
    '60,000 - 69,999': 1300,
    '70,000 - 79,999': 1400,
    '80,000 - 89,999': 1500,
    '90,000 - 99,999': 1600,
    '100,000 and above': 1700,
};

const NSSF_RATE = 6; // 6% of the basic salary
const TAX_RELIEF = 2400; // Tax relief amount

function calculateTaxableSalary(grossSalary) {
    const nssf = calculateNSSF(grossSalary);
    return grossSalary - nssf;
}

function calculateTax(grossSalary) {
    let taxableSalary = calculateTaxableSalary(grossSalary);
    let tax = 0;
    
    for (let range in TAX_RATES) {
        const [min, max] = range.split(' - ').map(val => parseInt(val.replace(',', '')));
        if (taxableSalary > min && (taxableSalary <= max || max === undefined)) {
            tax = (TAX_RATES[range] / 100) * taxableSalary;
            break;
        }
    }
    
    // Subtract tax relief
    tax -= TAX_RELIEF;
    if (tax < 0) {
        tax = 0;
    }
    return tax;
}

function calculateNHIF(grossSalary) {
    let nhif = 0;
    for (let range in NHIF_RATES) {
        const [min, max] = range.split(' - ').map(val => parseInt(val.replace(',', '')));
        console.log(`Parsed min: ${min}, Parsed max: ${max}`); 
        
        if (grossSalary > min && (grossSalary <= max || max === undefined)) {
            nhif = NHIF_RATES[range];
            break;
        }
    }
    console.log(`Calculated NHIF: ${nhif}`); 
    return nhif;
}

function calculateNSSF(grossSalary) {
    return (NSSF_RATE / 100) * grossSalary;
}

function calculateNetSalary(basicSalary, benefits) {
    const grossSalary = basicSalary + benefits; 
    const tax = calculateTax(grossSalary);
    const nhif = calculateNHIF(grossSalary);
    const nssf = calculateNSSF(grossSalary);

    const deductions = tax + nhif + nssf;
    const netSalary = grossSalary - deductions;

    return {
        grossSalary,
        tax,
        nhif,
        nssf,
        deductions,
        netSalary
    };
}

function calculateSalary() {
    const basicSalary = parseFloat(document.getElementById('basicSalary').value);
    const benefits = parseFloat(document.getElementById('benefits').value);

    const salaryDetails = calculateNetSalary(basicSalary, benefits);

    document.getElementById('result').innerHTML = `
        Gross Salary: ${salaryDetails.grossSalary.toFixed(2)}<br>
        Tax: ${salaryDetails.tax.toFixed(2)}<br>
        NHIF: ${salaryDetails.nhif.toFixed(2)}<br>
        NSSF: ${salaryDetails.nssf.toFixed(2)}<br>
        Total Deductions: ${salaryDetails.deductions.toFixed(2)}<br>
        Net Salary: ${salaryDetails.netSalary.toFixed(2)}
    `;
}