document.addEventListener('DOMContentLoaded', () => {
    // Preloader — show only once per session
    const preloader = document.getElementById('preloader');
    if (preloader) {
        if (sessionStorage.getItem('introSeen')) {
            // Already seen this session — hide instantly, no animation
            preloader.style.display = 'none';
        } else {
            // First visit — play the intro, then mark as seen
            sessionStorage.setItem('introSeen', '1');
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            }, 1500);
        }
    }

    // Basic form submission handler for "Get Started" form
    const getStartedForm = document.getElementById('getStartedForm');
    if (getStartedForm) {
        getStartedForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Just a placeholder alert to simulate successful submission
            alert('Thank you for reaching out! One of our investment experts will contact you shortly.');
            getStartedForm.reset();
        });
    }

    // Risk Profile Logic
    const riskForm = document.getElementById('riskForm');
    const quizContainer = document.getElementById('quizContainer');
    const resultContainer = document.getElementById('resultContainer');
    const profileName = document.getElementById('profileName');
    const profileDesc = document.getElementById('profileDesc');
    const fundSuggestions = document.getElementById('fundSuggestions');
    const retakeBtn = document.getElementById('retakeBtn');

    if (riskForm) {
        let globalWaText = '';

        riskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const q1 = parseInt(document.querySelector('input[name="q1"]:checked').value);
            const q2 = parseInt(document.querySelector('input[name="q2"]:checked').value);
            const q3 = parseInt(document.querySelector('input[name="q3"]:checked').value);
            const q4 = parseInt(document.querySelector('input[name="q4"]:checked').value);
            const q5 = parseInt(document.querySelector('input[name="q5"]:checked').value);
            const q6 = parseInt(document.querySelector('input[name="q6"]:checked').value);
            const q7 = parseInt(document.querySelector('input[name="q7"]:checked').value);
            const score = q1 + q2 + q3 + q4 + q5 + q6 + q7;
            
            let pName = '';
            let pDesc = '';
            let suggestions = '';
            
            if (score <= 12) {
                pName = 'Conservative Investor';
                pDesc = 'You prioritize capital preservation over high returns. You prefer low volatility and are comfortable with moderate gains matching inflation.';
                suggestions = `
                    <li class="mb-2"><i class="fa-solid fa-check text-secondary me-2"></i> <strong>Liquid Funds:</strong> For emergency reserves.</li>
                    <li class="mb-2"><i class="fa-solid fa-check text-secondary me-2"></i> <strong>Short Duration Debt Funds:</strong> Stable returns.</li>
                    <li><i class="fa-solid fa-check text-secondary me-2"></i> <strong>Conservative Hybrid Funds:</strong> Mostly debt with a slight equity kicker.</li>
                `;
            } else if (score <= 18) {
                pName = 'Moderate Investor';
                pDesc = 'You seek a balance between risk and reward. You can tolerate short-term fluctuations for better long-term inflation-beating returns.';
                suggestions = `
                    <li class="mb-2"><i class="fa-solid fa-check text-secondary me-2"></i> <strong>Balanced Advantage Funds:</strong> Dynamic allocation between equity and debt.</li>
                    <li class="mb-2"><i class="fa-solid fa-check text-secondary me-2"></i> <strong>Large Cap Equity Funds:</strong> Investing in established blue-chip companies.</li>
                    <li><i class="fa-solid fa-check text-secondary me-2"></i> <strong>Index Funds:</strong> Passive, low-cost broad market exposure.</li>
                `;
            } else if (score <= 23) {
                pName = 'Growth Investor';
                pDesc = 'You focus primarily on capital appreciation. You have a longer time horizon and are willing to endure market volatility for higher returns.';
                suggestions = `
                    <li class="mb-2"><i class="fa-solid fa-check text-secondary me-2"></i> <strong>Flexi-Cap Funds:</strong> Highly diversified growth-oriented strategies.</li>
                    <li class="mb-2"><i class="fa-solid fa-check text-secondary me-2"></i> <strong>Mid Cap Funds:</strong> For aggressive wealth creation over the long term.</li>
                    <li><i class="fa-solid fa-check text-secondary me-2"></i> <strong>Aggressive Hybrid Funds:</strong> Higher exposure to equity with some debt stability.</li>
                `;
            } else {
                pName = 'Aggressive Investor';
                pDesc = 'You want maximum wealth creation. You have a long time horizon and are completely comfortable with high market volatility.';
                suggestions = `
                    <li class="mb-2"><i class="fa-solid fa-check text-secondary me-2"></i> <strong>Small & Mid Cap Funds:</strong> Higher risk but significant long-term growth potential.</li>
                    <li class="mb-2"><i class="fa-solid fa-check text-secondary me-2"></i> <strong>Sectoral/Thematic Funds:</strong> For active aggressive alpha generation.</li>
                    <li><i class="fa-solid fa-check text-secondary me-2"></i> <strong>Equity Linked Savings Schemes (ELSS):</strong> Wealth creation with tax benefits.</li>
                `;
            }
            
            profileName.innerText = pName;
            profileDesc.innerText = pDesc;
            fundSuggestions.innerHTML = suggestions;

            const getLabelText = (inputName) => {
                const el = document.querySelector('input[name="' + inputName + '"]:checked');
                return document.querySelector('label[for="' + el.id + '"]').innerText.trim();
            };

            const rpName = document.getElementById('rpName').value;
            const rpPhone = document.getElementById('rpPhone').value;
            const rpWhatsapp = document.getElementById('rpWhatsapp').value || rpPhone;
            const rpCity = document.getElementById('rpCity').value;

            globalWaText = `Hello Mentor,

I have completed the Risk Profile Assessment.

Name: ${rpName}
Phone: ${rpPhone}
WhatsApp: ${rpWhatsapp}
City: ${rpCity}

Age Group: ${getLabelText('q1')}
Monthly Income: ${getLabelText('q2')}
Monthly Savings: ${getLabelText('q3')}
Market Fall Reaction: ${getLabelText('q4')}
Investment Duration: ${getLabelText('q5')}
Investment Goal: ${getLabelText('q6')}
Investment Experience: ${getLabelText('q7')}

Risk Profile: ${pName}

Please review my profile and suggest the most suitable investment plan for me.

Thank You.`;

            quizContainer.classList.add('d-none');
            resultContainer.classList.remove('d-none');
            
            // Auto open Whatsapp
            setTimeout(() => {
                const encodedMsg = encodeURIComponent(globalWaText);
                window.open('https://wa.me/918111079681?text=' + encodedMsg, '_blank');
            }, 1000);
        });

        // Attach WhatsApp button click
        const waBtn = document.getElementById('waBtn');
        if (waBtn) {
            waBtn.addEventListener('click', () => {
                const encodedMsg = encodeURIComponent(globalWaText);
                window.open('https://wa.me/918111079681?text=' + encodedMsg, '_blank');
            });
        }
    }

    if (retakeBtn) {
        retakeBtn.addEventListener('click', () => {
            riskForm.reset();
            resultContainer.classList.add('d-none');
            quizContainer.classList.remove('d-none');
            window.scrollTo(0, 0);
        });
    }

    // Scroll to Top or internal hash navigation can be placed here

});

// Risk Wizard Logic
window.nextStep = function(targetStep) {
    const allSteps = document.querySelectorAll('.risk-step');
    allSteps.forEach(step => step.classList.remove('active'));
    
    const target = document.getElementById('step-' + targetStep);
    if(target) {
        target.classList.add('active');
        const container = document.getElementById('quizContainer');
        if(container) {
            window.scrollTo({
                top: container.offsetTop - 120,
                behavior: 'smooth'
            });
        }
    }
};


/* Extracted from plan.html */
// =====================================================
// UTILITY
// =====================================================
function fmtINR(n) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + 'Cr';
  if (n >= 100000)   return '₹' + (n / 100000).toFixed(2) + 'L';
  if (n >= 1000)     return '₹' + (n / 1000).toFixed(2) + 'K';
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

function linkSlider(sliderId, inputId, callback) {
  const slider = document.getElementById(sliderId);
  const input  = document.getElementById(inputId);
  if (!slider || !input) return;
  slider.addEventListener('input', () => { input.value = slider.value; callback(); });
  input.addEventListener('input',  () => { slider.value = input.value;  callback(); });
}

// Charts registry
const charts = {};

function makeBarChart(canvasId, labels, datasets) {
  if (charts[canvasId]) charts[canvasId].destroy();
  charts[canvasId] = new Chart(document.getElementById(canvasId), {
    type: 'bar',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ' ' + fmtINR(ctx.parsed.y) } } },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { font: { size: 10 } } },
        y: { stacked: true, display: false }
      }
    }
  });
}

function makeDonutChart(canvasId, values, colors) {
  if (charts[canvasId]) charts[canvasId].destroy();
  charts[canvasId] = new Chart(document.getElementById(canvasId), {
    type: 'doughnut',
    data: { datasets: [{ data: values, backgroundColor: colors, borderWidth: 0, hoverOffset: 4 }] },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '68%',
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ' ' + fmtINR(ctx.parsed) } } }
    }
  });
}

// =====================================================
// NAVIGATION
// =====================================================
let currentGoalType = 'bike';

const goalConfig = {
  bike:     { icon: 'fa-motorcycle',     title: 'Bike Planner',     amtLabel: 'Bike Cost (Today)', defAmt: 200000,  maxAmt: 5000000  },
  car:      { icon: 'fa-car-side',       title: 'Car Planner',      amtLabel: 'Car Cost (Today)',  defAmt: 1000000, maxAmt: 20000000 },
  house:    { icon: 'fa-house-chimney',  title: 'House Planner',    amtLabel: 'House Cost (Today)',defAmt: 5000000, maxAmt: 100000000},
  marriage: { icon: 'fa-heart',          title: 'Marriage Planner', amtLabel: 'Wedding Budget',   defAmt: 1500000, maxAmt: 20000000 }
};

function openCalc(type) {
  document.getElementById('plannerGrid').style.display = 'none';
  document.getElementById('calculatorPanel').style.display = 'block';

  // Hide all panels
  ['sipPanel','swpPanel','goalPanel','retirePanel'].forEach(id => {
    document.getElementById(id).classList.add('d-none');
  });

  if (type === 'sip') {
    document.getElementById('sipPanel').classList.remove('d-none');
    calcSIP();
  } else if (type === 'swp') {
    document.getElementById('swpPanel').classList.remove('d-none');
    calcSWP();
  } else if (type === 'retirement') {
    document.getElementById('retirePanel').classList.remove('d-none');
    calcRetirement();
  } else {
    // Goal planners
    currentGoalType = type;
    const cfg = goalConfig[type];
    document.getElementById('goalTitle').innerHTML = `<i class="fa-solid ${cfg.icon} me-2"></i>${cfg.title}`;
    document.getElementById('goalAmtLabel').textContent = cfg.amtLabel;
    const amtSlider = document.getElementById('goalAmtSlider');
    amtSlider.max = cfg.maxAmt;
    amtSlider.value = cfg.defAmt;
    document.getElementById('goalAmt').value = cfg.defAmt;
    document.getElementById('goalPanel').classList.remove('d-none');
    calcGoal();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToGrid() {
  document.getElementById('plannerGrid').style.display = '';
  document.getElementById('calculatorPanel').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =====================================================
// SIP CALCULATOR
// =====================================================
function calcSIP() {
  const monthly = parseFloat(document.getElementById('sipAmt').value) || 0;
  const years   = parseFloat(document.getElementById('sipYrs').value) || 0;
  const rate    = parseFloat(document.getElementById('sipRate').value) || 0;
  const n = years * 12;
  const r = rate / 100 / 12;
  const maturity  = r > 0 ? monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r) : monthly * n;
  const invested  = monthly * n;
  const gains     = maturity - invested;

  document.getElementById('sipMaturity').textContent = fmtINR(maturity);
  document.getElementById('sipInvested').textContent = fmtINR(invested);
  document.getElementById('sipGains').textContent    = fmtINR(gains);

  // Yearly chart data
  const labels = [], inv = [], gns = [];
  for (let y = 1; y <= years; y++) {
    const months = y * 12;
    const mat = r > 0 ? monthly * ((Math.pow(1+r, months)-1)/r)*(1+r) : monthly*months;
    const i   = monthly * months;
    labels.push('Yr ' + y);
    inv.push(i);
    gns.push(Math.max(0, mat - i));
  }
  makeBarChart('sipChart', labels,
    [{ data: inv, backgroundColor: '#064e3b', label: 'Invested' },
     { data: gns, backgroundColor: '#059669', label: 'Gains'    }]);
}

linkSlider('sipAmtSlider', 'sipAmt', calcSIP);
linkSlider('sipYrsSlider', 'sipYrs', calcSIP);
linkSlider('sipRateSlider','sipRate',calcSIP);

// =====================================================
// SWP CALCULATOR
// =====================================================
function calcSWP() {
  const principal  = parseFloat(document.getElementById('swpAmt').value)  || 0;
  const withdrawal = parseFloat(document.getElementById('swpWdl').value)   || 0;
  const rate       = parseFloat(document.getElementById('swpRate').value)   || 0;
  const years      = parseFloat(document.getElementById('swpYrs').value)    || 0;
  const waitYrs    = parseFloat(document.getElementById('swpWait').value)   || 0;
  const incRate    = parseFloat(document.getElementById('swpInc').value)    || 0;

  const mRate = rate / 100 / 12;
  // Grow principal during waiting period
  let balance = principal * Math.pow(1 + mRate, waitYrs * 12);
  let totalWd = 0;
  let monthlyWd = withdrawal;

  const labels = [], balances = [];
  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      balance = balance * (1 + mRate) - monthlyWd;
      if (balance < 0) balance = 0;
      totalWd += monthlyWd;
    }
    monthlyWd *= (1 + incRate / 100);
    labels.push('Yr ' + y);
    balances.push(Math.max(0, balance));
  }

  document.getElementById('swpBalance').textContent  = fmtINR(Math.max(0, balance));
  document.getElementById('swpInvested').textContent = fmtINR(principal);
  document.getElementById('swpWithdrawn').textContent= fmtINR(totalWd);

  makeBarChart('swpChart', labels,
    [{ data: balances, backgroundColor: '#064e3b', label: 'Balance' }]);
}

linkSlider('swpAmtSlider',  'swpAmt',  calcSWP);
linkSlider('swpWdlSlider',  'swpWdl',  calcSWP);
linkSlider('swpRateSlider', 'swpRate', calcSWP);
linkSlider('swpYrsSlider',  'swpYrs',  calcSWP);
linkSlider('swpWaitSlider', 'swpWait', calcSWP);
linkSlider('swpIncSlider',  'swpInc',  calcSWP);

// =====================================================
// GOAL PLANNER (Bike / Car / House / Marriage)
// =====================================================
function calcGoal() {
  const todayAmt  = parseFloat(document.getElementById('goalAmt').value)       || 0;
  const years     = parseFloat(document.getElementById('goalYrs').value)        || 0;
  const rate      = parseFloat(document.getElementById('goalRate').value)       || 0;
  const inflation = parseFloat(document.getElementById('goalInflation').value) || 0;
  const savings   = parseFloat(document.getElementById('goalSavings').value)   || 0;

  const futureAmt   = todayAmt * Math.pow(1 + inflation / 100, years);
  const savingsGrow = savings  * Math.pow(1 + rate / 100, years);
  const remaining   = Math.max(0, futureAmt - savingsGrow);

  const n = years * 12;
  const r = rate / 100 / 12;
  const sipNeeded = remaining > 0 && r > 0 ? remaining * r / ((Math.pow(1+r, n)-1)*(1+r)) :
                    remaining > 0 ? remaining/n : 0;

  document.getElementById('goalFutureAmt').textContent  = fmtINR(futureAmt);
  document.getElementById('goalSavingsVal').textContent = fmtINR(savingsGrow);
  document.getElementById('goalSIP').textContent        = fmtINR(sipNeeded);

  const saved = Math.min(savingsGrow, futureAmt);
  const rem   = Math.max(0, futureAmt - saved);
  document.getElementById('goalCenter').textContent = fmtINR(futureAmt);
  makeDonutChart('goalChart', [saved, rem], ['#059669', '#064e3b']);
}

linkSlider('goalAmtSlider',      'goalAmt',      calcGoal);
linkSlider('goalYrsSlider',      'goalYrs',      calcGoal);
linkSlider('goalRateSlider',     'goalRate',      calcGoal);
linkSlider('goalInflationSlider','goalInflation', calcGoal);
linkSlider('goalSavingsSlider',  'goalSavings',  calcGoal);

// =====================================================
// RETIREMENT PLANNER
// =====================================================
function calcRetirement() {
  const monthlyExpense = parseFloat(document.getElementById('retExpense').value)     || 0;
  const currentAge     = parseFloat(document.getElementById('retCurrentAge').value)  || 0;
  const retireAge      = parseFloat(document.getElementById('retRetireAge').value)   || 0;
  const lifeAge        = parseFloat(document.getElementById('retLifeAge').value)     || 0;
  const preRate        = parseFloat(document.getElementById('retGrowRate').value)    || 0;
  const inflation      = parseFloat(document.getElementById('retInflation').value)   || 0;
  const savings        = parseFloat(document.getElementById('retSavings').value)     || 0;

  const yearsToRetire  = Math.max(0, retireAge - currentAge);
  const yearsPostRetire= Math.max(0, lifeAge   - retireAge);

  // Monthly expense at retirement (inflation adjusted)
  const monthlyAtRetire = monthlyExpense * Math.pow(1 + inflation / 100, yearsToRetire);
  // Corpus needed (25x annual expenses — widely used rule)
  const annualAtRetire  = monthlyAtRetire * 12;
  const corpus          = annualAtRetire * 25;

  // Current savings grown to retirement
  const savingsGrown = savings * Math.pow(1 + preRate / 100, yearsToRetire);

  // SIP to fill the gap
  const n = yearsToRetire * 12;
  const r = preRate / 100 / 12;
  const sipNeed = corpus - savingsGrown;
  let sipMonthly = 0;
  if (sipNeed > 0 && n > 0) {
    sipMonthly = r > 0 ? sipNeed * r / ((Math.pow(1+r, n)-1)*(1+r)) : sipNeed/n;
  }

  document.getElementById('retCorpus').textContent = fmtINR(corpus);
  document.getElementById('retSavVal').textContent  = fmtINR(savingsGrown);
  document.getElementById('retSIP').textContent     = fmtINR(Math.max(0, sipMonthly));

  // Chart: year-by-year corpus build up
  const labels = [], sipData = [], savData = [];
  for (let y = 1; y <= yearsToRetire; y++) {
    const months = y * 12;
    const sipCorpus = r > 0 ? Math.max(0,sipMonthly) * ((Math.pow(1+r,months)-1)/r)*(1+r) : Math.max(0,sipMonthly)*months;
    const savCorpus = savings * Math.pow(1+preRate/100, y);
    labels.push('Yr ' + y);
    sipData.push(sipCorpus);
    savData.push(savCorpus);
  }
  makeBarChart('retChart', labels,
    [{ data: sipData, backgroundColor: '#064e3b', label: 'SIP Corpus'      },
     { data: savData, backgroundColor: '#059669', label: 'Savings Growth'  }]);
}

linkSlider('retExpenseSlider',    'retExpense',    calcRetirement);
linkSlider('retCurrentAgeSlider', 'retCurrentAge', calcRetirement);
linkSlider('retRetireAgeSlider',  'retRetireAge',  calcRetirement);
linkSlider('retLifeAgeSlider',    'retLifeAge',    calcRetirement);
linkSlider('retGrowRateSlider',   'retGrowRate',   calcRetirement);
linkSlider('retInflationSlider',  'retInflation',  calcRetirement);
linkSlider('retSavingsSlider',    'retSavings',    calcRetirement);