console.log("index.js loaded");

// Theme Toggle Logic (Run immediately after script loads)
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Debugging: Check if themeToggle exists
if (!themeToggle) {
  console.error("Theme toggle button not found!");
} else {
  console.log("Theme toggle button found:", themeToggle);

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  console.log("Loaded theme from localStorage:", savedTheme);
  body.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  // Add event listener for theme toggle
  themeToggle.addEventListener("click", () => {
    console.log("Theme toggle button clicked");
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    console.log("Switching to theme:", newTheme);
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
    console.log("Theme after switch:", body.getAttribute("data-theme"));
  });
}

function updateThemeIcon(theme) {
  themeToggle.textContent = theme === "light" ? "🌓" : "☀️";
}

// Manual theme toggle for debugging
window.toggleThemeManually = function () {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
  console.log("Manually switched to theme:", newTheme);
};

// Rest of the script (runs after DOM is loaded)
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  // Mobile Menu Toggle
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  const dropdown = document.querySelector(".dropdown");
  const dropdownToggle = document.querySelector(".dropdown-toggle");

  mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenu.querySelector("i").classList.toggle("fa-bars");
    mobileMenu.querySelector("i").classList.toggle("fa-times");
  });

  // Dropdown Toggle for Mobile (click-based)
  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault();
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        dropdown.classList.toggle("active");
      }
    });
  }

  // Chart.js Setup
  let trades = JSON.parse(localStorage.getItem("trades")) || [
    {
      date: "2025-04-01",
      pair: "AUDUSD",
      ls: "sell",
      size: "0.08",
      entry: "0.62759",
      stopLoss: "0.63051",
      takeProfit: "0.61877",
      rr: "N/A",
      profitLoss: "-23.36",
      trade: "EXIT",
      notes: "Swap: -0.01, Commissions: -0.24, Pips: -29.2, Duration: 54668s",
    },
    {
      date: "2025-04-01",
      pair: "GBPUSD",
      ls: "buy",
      size: "0.12",
      entry: "1.28982",
      stopLoss: "1.28834",
      takeProfit: "1.29898",
      rr: "N/A",
      profitLoss: "-18.24",
      trade: "EXIT",
      notes: "Swap: 0, Commissions: -0.36, Pips: -15.2, Duration: 5538s",
    },
    {
      date: "2025-03-24",
      pair: "USDJPY",
      ls: "sell",
      size: "0.14",
      entry: "149.636",
      stopLoss: "150.086",
      takeProfit: "146.556",
      rr: "N/A",
      profitLoss: "-42.07",
      trade: "EXIT",
      notes: "Swap: 0, Commissions: -0.42, Pips: -45.1, Duration: 14076s",
    },
    {
      date: "2025-03-03",
      pair: "EURUSD",
      ls: "sell",
      size: "0.16",
      entry: "1.04888",
      stopLoss: "1.05173",
      takeProfit: "1.03599",
      rr: "N/A",
      profitLoss: "-45.6",
      trade: "EXIT",
      notes: "Swap: 0.35, Commissions: -0.48, Pips: -28.5, Duration: 40109s",
    },
    {
      date: "2025-02-27",
      pair: "GBPUSD",
      ls: "buy",
      size: "0.03",
      entry: "1.26579",
      stopLoss: "1.26469",
      takeProfit: "1.27116",
      rr: "N/A",
      profitLoss: "-3.24",
      trade: "EXIT",
      notes: "Swap: 0, Commissions: -0.09, Pips: -10.8, Duration: 11s",
    },
    {
      date: "2025-02-25",
      pair: "GBPUSD",
      ls: "sell",
      size: "0.03",
      entry: "1.26631",
      stopLoss: "1.26802",
      takeProfit: "1.2606",
      rr: "N/A",
      profitLoss: "2.97",
      trade: "EXIT",
      notes: "Swap: -0.07, Commissions: -0.09, Pips: 9.9, Duration: 54402s",
    },
    {
      date: "2025-02-26",
      pair: "NZDUSD",
      ls: "buy",
      size: "0.13",
      entry: "0.57245",
      stopLoss: "0.57136",
      takeProfit: "0.5772",
      rr: "N/A",
      profitLoss: "-14.17",
      trade: "EXIT",
      notes: "Swap: 0, Commissions: -0.39, Pips: -10.9, Duration: 6071s",
    },
    {
      date: "2025-02-17",
      pair: "EURUSD",
      ls: "buy",
      size: "0.03",
      entry: "1.04726",
      stopLoss: "1.04646",
      takeProfit: "1.05113",
      rr: "N/A",
      profitLoss: "-2.49",
      trade: "EXIT",
      notes: "Swap: -0.22, Commissions: -0.09, Pips: -8.3, Duration: 42390s",
    },
    {
      date: "2025-02-07",
      pair: "USDCHF",
      ls: "buy",
      size: "0.01",
      entry: "0.90709",
      stopLoss: "0",
      takeProfit: "0",
      rr: "N/A",
      profitLoss: "0.04",
      trade: "EXIT",
      notes: "Swap: 0, Commissions: -0.03, Pips: 0.4, Duration: 21s",
    },
    {
      date: "2025-01-14",
      pair: "NZDUSD",
      ls: "sell",
      size: "0.35",
      entry: "0.56077",
      stopLoss: "0.56185",
      takeProfit: "0.55418",
      rr: "N/A",
      profitLoss: "50.4",
      trade: "EXIT",
      notes: "Swap: 0, Commissions: -1.05, Pips: 14.4, Duration: 17263s",
    },
    {
      date: "2024-12-17",
      pair: "USDCHF",
      ls: "sell",
      size: "0.01",
      entry: "0.89519",
      stopLoss: "0",
      takeProfit: "0",
      rr: "N/A",
      profitLoss: "-0.1",
      trade: "EXIT",
      notes: "Swap: 0, Commissions: -0.03, Pips: -0.9, Duration: 15s",
    },
    {
      date: "2024-11-25",
      pair: "AUDUSD",
      ls: "sell",
      size: "0.06",
      entry: "0.65194",
      stopLoss: "0.65374",
      takeProfit: "0.64412",
      rr: "N/A",
      profitLoss: "-3.36",
      trade: "EXIT",
      notes: "Swap: 0, Commissions: -0.18, Pips: -5.6, Duration: 30162s",
    },
    {
      date: "2024-11-25",
      pair: "GBPUSD",
      ls: "sell",
      size: "0.03",
      entry: "1.25933",
      stopLoss: "1.26135",
      takeProfit: "1.24934",
      rr: "N/A",
      profitLoss: "-3.15",
      trade: "EXIT",
      notes: "Swap: 0, Commissions: -0.09, Pips: -10.5, Duration: 27942s",
    },
    {
      date: "2024-11-25",
      pair: "EURUSD",
      ls: "sell",
      size: "0.03",
      entry: "1.04809",
      stopLoss: "1.05048",
      takeProfit: "1.0332",
      rr: "N/A",
      profitLoss: "-7.47",
    },
  ];

  // Dashboard Metrics
  const netPL = document.getElementById("netPL");
  const tradeFrequency = document.getElementById("tradeFrequency");
  const profitFactor = document.getElementById("profitFactor");
  const tradeWinPercent = document.getElementById("tradeWinPercent");
  const avgWinLoss = document.getElementById("avgWinLoss");

  // Calculate Metrics
  let totalPL = trades.reduce(
    (sum, trade) => sum + parseFloat(trade.profitLoss),
    0
  );
  let totalTrades = trades.length;
  let wins = trades.filter((trade) => parseFloat(trade.profitLoss) > 0).length;
  let losses = trades.filter(
    (trade) => parseFloat(trade.profitLoss) < 0
  ).length;
  let totalWins = trades
    .filter((trade) => parseFloat(trade.profitLoss) > 0)
    .reduce((sum, trade) => sum + parseFloat(trade.profitLoss), 0);
  let totalLosses = trades
    .filter((trade) => parseFloat(trade.profitLoss) < 0)
    .reduce((sum, trade) => sum + parseFloat(trade.profitLoss), 0);
  let winRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;
  let avgWin = wins > 0 ? totalWins / wins : 0;
  let avgLoss = losses > 0 ? totalLosses / losses : 0;
  let profitFactorCalc =
    totalLosses !== 0
      ? Math.abs(totalWins / totalLosses)
      : totalWins > 0
      ? Infinity
      : 0;

  netPL.textContent = `$${totalPL.toFixed(2)}`;
  tradeFrequency.textContent = totalTrades;
  profitFactor.textContent =
    profitFactorCalc === Infinity ? "∞" : profitFactorCalc.toFixed(2);
  tradeWinPercent.textContent = `${winRate.toFixed(1)}%`;
  avgWinLoss.textContent = `$${avgWin.toFixed(2)} / $${avgLoss.toFixed(2)}`;

  // Radar Chart
  const radarChart = new Chart(document.getElementById("radarChart"), {
    type: "radar",
    data: {
      labels: [
        "Win Rate",
        "Profit Factor",
        "Trade Frequency",
        "Avg Win",
        "Avg Loss",
      ],
      datasets: [
        {
          label: "Stats",
          data: [
            winRate / 100,
            profitFactorCalc > 5 ? 5 : profitFactorCalc,
            totalTrades > 50 ? 50 : totalTrades,
            avgWin > 100 ? 100 : avgWin,
            Math.abs(avgLoss) > 100 ? 100 : Math.abs(avgLoss),
          ],
          backgroundColor: "rgba(107, 70, 193, 0.2)",
          borderColor: "rgba(107, 70, 193, 1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
            display: false,
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          pointLabels: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue("--text-color")
              .trim(),
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue("--text-color")
              .trim(),
          },
        },
      },
    },
  });

  // Daily P&L Line Chart
  const dailyPLData = {};
  trades.forEach((trade) => {
    const date = trade.date;
    if (!dailyPLData[date]) dailyPLData[date] = 0;
    dailyPLData[date] += parseFloat(trade.profitLoss);
  });

  const sortedDates = Object.keys(dailyPLData).sort();
  const cumulativePL = [];
  let runningTotal = 0;
  sortedDates.forEach((date) => {
    runningTotal += dailyPLData[date];
    cumulativePL.push(runningTotal);
  });

  const lineChart = new Chart(document.getElementById("myChart"), {
    type: "line",
    data: {
      labels: sortedDates,
      datasets: [
        {
          label: "Cumulative P&L",
          data: cumulativePL,
          borderColor: "rgba(107, 70, 193, 1)",
          backgroundColor: "rgba(107, 70, 193, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue("--text-color")
              .trim(),
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue("--text-color")
              .trim(),
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue("--text-color")
              .trim(),
          },
        },
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    },
  });

  // Daily P&L Bar Chart
  const barChart = new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: sortedDates,
      datasets: [
        {
          label: "Daily P&L",
          data: sortedDates.map((date) => dailyPLData[date]),
          backgroundColor: sortedDates.map((date) =>
            dailyPLData[date] >= 0
              ? "rgba(0, 255, 0, 0.5)"
              : "rgba(255, 0, 0, 0.5)"
          ),
          borderColor: sortedDates.map((date) =>
            dailyPLData[date] >= 0 ? "rgba(0, 255, 0, 1)" : "rgba(255, 0, 0, 1)"
          ),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue("--text-color")
              .trim(),
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue("--text-color")
              .trim(),
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue("--text-color")
              .trim(),
          },
        },
      },
    },
  });

  // Monthly Stats Bar Chart
  const monthlyData = {};
  trades.forEach((trade) => {
    const month = trade.date.substring(0, 7);
    if (!monthlyData[month]) monthlyData[month] = 0;
    monthlyData[month] += parseFloat(trade.profitLoss);
  });

  const sortedMonths = Object.keys(monthlyData).sort();
  const monthlyChart = new Chart(document.getElementById("monthlyChart"), {
    type: "bar",
    data: {
      labels: sortedMonths,
      datasets: [
        {
          label: "Monthly P&L",
          data: sortedMonths.map((month) => monthlyData[month]),
          backgroundColor: sortedMonths.map((month) =>
            monthlyData[month] >= 0
              ? "rgba(0, 255, 0, 0.5)"
              : "rgba(255, 0, 0, 0.5)"
          ),
          borderColor: sortedMonths.map((month) =>
            monthlyData[month] >= 0
              ? "rgba(0, 255, 0, 1)"
              : "rgba(255, 0, 0, 1)"
          ),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue("--text-color")
              .trim(),
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue("--text-color")
              .trim(),
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue("--text-color")
              .trim(),
          },
        },
      },
    },
  });

  // Trade Form Submission
  const tradeForm = document.getElementById("tradeForm");
  const tradesList = document.getElementById("tradesList");

  tradeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const trade = {
      date: document.getElementById("date").value,
      pair: document.getElementById("pair").value,
      ls: document.getElementById("ls").value,
      size: document.getElementById("size").value,
      entry: document.getElementById("entry").value,
      stopLoss: document.getElementById("stopLoss").value,
      takeProfit: document.getElementById("takeProfit").value,
      rr: document.getElementById("rr").value,
      profitLoss: document.getElementById("profitLoss").value,
      trade: document.getElementById("trade").value,
      notes: document.getElementById("notes").value,
    };

    trades.push(trade);
    localStorage.setItem("trades", JSON.stringify(trades));
    renderTrades();
    updateMetrics();
    updateCharts();
    updateWeeklyBreakdown();
    tradeForm.reset();
  });

  function renderTrades() {
    tradesList.innerHTML = "";
    trades.slice(0, 10).forEach((trade) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${trade.date}</td>
        <td>${trade.pair}</td>
        <td>${trade.ls}</td>
        <td>${trade.size}</td>
        <td>${trade.entry}</td>
        <td>${trade.stopLoss}</td>
        <td>${trade.takeProfit}</td>
        <td>${trade.rr}</td>
        <td class="${
          parseFloat(trade.profitLoss) >= 0 ? "positive" : "negative"
        }">$${parseFloat(trade.profitLoss).toFixed(2)}</td>
        <td>${trade.trade}</td>
        <td>${trade.notes}</td>
      `;
      tradesList.appendChild(row);
    });
  }

  function updateMetrics() {
    totalPL = trades.reduce(
      (sum, trade) => sum + parseFloat(trade.profitLoss),
      0
    );
    totalTrades = trades.length;
    wins = trades.filter((trade) => parseFloat(trade.profitLoss) > 0).length;
    losses = trades.filter((trade) => parseFloat(trade.profitLoss) < 0).length;
    totalWins = trades
      .filter((trade) => parseFloat(trade.profitLoss) > 0)
      .reduce((sum, trade) => sum + parseFloat(trade.profitLoss), 0);
    totalLosses = trades
      .filter((trade) => parseFloat(trade.profitLoss) < 0)
      .reduce((sum, trade) => sum + parseFloat(trade.profitLoss), 0);
    winRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;
    avgWin = wins > 0 ? totalWins / wins : 0;
    avgLoss = losses > 0 ? totalLosses / losses : 0;
    profitFactorCalc =
      totalLosses !== 0
        ? Math.abs(totalWins / totalLosses)
        : totalWins > 0
        ? Infinity
        : 0;

    netPL.textContent = `$${totalPL.toFixed(2)}`;
    tradeFrequency.textContent = totalTrades;
    profitFactor.textContent =
      profitFactorCalc === Infinity ? "∞" : profitFactorCalc.toFixed(2);
    tradeWinPercent.textContent = `${winRate.toFixed(1)}%`;
    avgWinLoss.textContent = `$${avgWin.toFixed(2)} / $${avgLoss.toFixed(2)}`;
  }

  function updateCharts() {
    // Update Radar Chart
    radarChart.data.datasets[0].data = [
      winRate / 100,
      profitFactorCalc > 5 ? 5 : profitFactorCalc,
      totalTrades > 50 ? 50 : totalTrades,
      avgWin > 100 ? 100 : avgWin,
      Math.abs(avgLoss) > 100 ? 100 : Math.abs(avgLoss),
    ];
    radarChart.update();

    // Update Line Chart
    const dailyPLData = {};
    trades.forEach((trade) => {
      const date = trade.date;
      if (!dailyPLData[date]) dailyPLData[date] = 0;
      dailyPLData[date] += parseFloat(trade.profitLoss);
    });

    const sortedDates = Object.keys(dailyPLData).sort();
    const cumulativePL = [];
    let runningTotal = 0;
    sortedDates.forEach((date) => {
      runningTotal += dailyPLData[date];
      cumulativePL.push(runningTotal);
    });

    lineChart.data.labels = sortedDates;
    lineChart.data.datasets[0].data = cumulativePL;
    lineChart.update();

    // Update Bar Chart
    barChart.data.labels = sortedDates;
    barChart.data.datasets[0].data = sortedDates.map(
      (date) => dailyPLData[date]
    );
    barChart.data.datasets[0].backgroundColor = sortedDates.map((date) =>
      dailyPLData[date] >= 0 ? "rgba(0, 255, 0, 0.5)" : "rgba(255, 0, 0, 0.5)"
    );
    barChart.data.datasets[0].borderColor = sortedDates.map((date) =>
      dailyPLData[date] >= 0 ? "rgba(0, 255, 0, 1)" : "rgba(255, 0, 0, 1)"
    );
    barChart.update();

    // Update Monthly Chart
    const monthlyData = {};
    trades.forEach((trade) => {
      const month = trade.date.substring(0, 7);
      if (!monthlyData[month]) monthlyData[month] = 0;
      monthlyData[month] += parseFloat(trade.profitLoss);
    });

    const sortedMonths = Object.keys(monthlyData).sort();
    monthlyChart.data.labels = sortedMonths;
    monthlyChart.data.datasets[0].data = sortedMonths.map(
      (month) => monthlyData[month]
    );
    monthlyChart.data.datasets[0].backgroundColor = sortedMonths.map((month) =>
      monthlyData[month] >= 0 ? "rgba(0, 255, 0, 0.5)" : "rgba(255, 0, 0, 0.5)"
    );
    monthlyChart.data.datasets[0].borderColor = sortedMonths.map((month) =>
      monthlyData[month] >= 0 ? "rgba(0, 255, 0, 1)" : "rgba(255, 0, 0, 1)"
    );
    monthlyChart.update();
  }

  // Weekly Trade Breakdown
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const weeklyBreakdown = {
    sun: 0,
    mon: 0,
    tue: 0,
    wed: 0,
    thu: 0,
    fri: 0,
    sat: 0,
  };

  function updateWeeklyBreakdown() {
    days.forEach((day) => (weeklyBreakdown[day] = 0));
    trades.forEach((trade) => {
      const date = new Date(trade.date);
      const dayIndex = date.getDay();
      const day = days[dayIndex];
      weeklyBreakdown[day]++;
    });

    days.forEach((day) => {
      document.getElementById(`${day}Trades`).textContent =
        weeklyBreakdown[day];
    });
  }

  // Initial Render
  renderTrades();
  updateWeeklyBreakdown();

  // Thoughts Section
  const thoughtsTextarea = document.getElementById("thoughts");
  const savedThoughtsDiv = document.getElementById("savedThoughts");

  thoughtsTextarea.value = localStorage.getItem("thoughts") || "";
  savedThoughtsDiv.innerHTML = localStorage.getItem("savedThoughts") || "";

  window.saveThoughts = function () {
    const thoughts = thoughtsTextarea.value;
    localStorage.setItem("thoughts", thoughts);
    const timestamp = new Date().toLocaleString();
    const thoughtEntry = `<p><strong>${timestamp}</strong>: ${thoughts}</p>`;
    const existingThoughts = localStorage.getItem("savedThoughts") || "";
    localStorage.setItem("savedThoughts", thoughtEntry + existingThoughts);
    savedThoughtsDiv.innerHTML = thoughtEntry + existingThoughts;
  };

  // Testimonial Form Submission
  const testimonialForm = document.getElementById("testimonialForm");
  const testimonialsList = document.getElementById("testimonialsList");

  let testimonials = JSON.parse(localStorage.getItem("testimonials")) || [
    {
      text: "Jay's trading strategies have significantly improved my portfolio performance. Highly recommend!",
      author: "Sarah M., Investor",
    },
    {
      text: "The website Jay built for my business is stunning and functional. Great work!",
      author: "Michael K., Entrepreneur",
    },
    {
      text: "Blunt's custom solutions helped streamline my trading process. Fantastic service!",
      author: "David L., Trader",
    },
  ];

  function renderTestimonials() {
    testimonialsList.innerHTML = "";
    testimonials.forEach((testimonial) => {
      const card = document.createElement("div");
      card.classList.add("testimonial-card");
      card.innerHTML = `
        <p>"${testimonial.text}"</p>
        <h4>- ${testimonial.author}</h4>
      `;
      testimonialsList.appendChild(card);
    });
  }

  testimonialForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = document.getElementById("testimonialText").value;
    const author = document.getElementById("testimonialAuthor").value;
    testimonials.push({ text, author });
    localStorage.setItem("testimonials", JSON.stringify(testimonials));
    renderTestimonials();
    testimonialForm.reset();
  });

  renderTestimonials();

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          formMessage.textContent = "Message sent successfully!";
          formMessage.style.color = "green";
          contactForm.reset();
        } else {
          formMessage.textContent = "Oops! Something went wrong.";
          formMessage.style.color = "red";
        }
      })
      .catch((error) => {
        formMessage.textContent = "Error: " + error.message;
        formMessage.style.color = "red";
      });
  });

  // Newsletter Form Submission
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterMessage = document.getElementById("newsletter-message");
  const termsModal = document.getElementById("termsModal");
  const agreeBtn = document.getElementById("agreeBtn");
  const disagreeBtn = document.getElementById("disagreeBtn");
  const closeModal = document.querySelector(".modal .close");

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    termsModal.style.display = "flex";
  });

  agreeBtn.addEventListener("click", () => {
    termsModal.style.display = "none";
    const formData = new FormData(newsletterForm);
    fetch(newsletterForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          newsletterMessage.textContent = "Subscribed successfully!";
          newsletterMessage.style.color = "green";
          newsletterForm.reset();
        } else {
          newsletterMessage.textContent = "Oops! Something went wrong.";
          newsletterMessage.style.color = "red";
        }
      })
      .catch((error) => {
        newsletterMessage.textContent = "Error: " + error.message;
        newsletterMessage.style.color = "red";
      });
  });

  disagreeBtn.addEventListener("click", () => {
    termsModal.style.display = "none";
    newsletterMessage.textContent = "You must agree to the terms to subscribe.";
    newsletterMessage.style.color = "red";
  });

  closeModal.addEventListener("click", () => {
    termsModal.style.display = "none";
  });

  // Initialize Vanilla Tilt
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3,
  });
});
async function uploadImageToS3(file) {
  const AWS = window.AWS;
  AWS.config.update({
    accessKeyId: "YOUR_ACCESS_KEY",
    secretAccessKey: "YOUR_SECRET_KEY",
    region: "YOUR_REGION",
  });

  const s3 = new AWS.S3();
  const params = {
    Bucket: "your-bucket-name",
    Key: `images/${Date.now()}-${file.name}`,
    Body: file,
    ContentType: file.type,
    ACL: "public-read",
  };

  const { Location } = await s3.upload(params).promise();
  return Location;
}
