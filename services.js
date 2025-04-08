console.log("services.js loaded");

// Initialize the global state object
window.state = {
  data: {
    trades: [],
  },
};

// Sample trade data for 2025 (for testing purposes)
const sampleTrades = [
  {
    date: "2025-01-15",
    pair: "EUR/USD",
    ls: "Long",
    size: 1.5,
    entry: 1.105,
    profitLoss: 150.75,
    balance: 10150.75,
    tags: ["Breakout Strategy", "Low Risk"],
    notes: "Entered on a strong uptrend after breakout above 1.1000.",
  },
  {
    date: "2025-02-10",
    pair: "GBP/USD",
    ls: "Short",
    size: 2.0,
    entry: 1.285,
    profitLoss: -75.3,
    balance: 10075.45,
    tags: ["Scalping", "High Risk"],
    notes: "Took a quick scalp on a news spike, but market reversed.",
  },
  {
    date: "2025-03-01",
    pair: "USD/JPY",
    ls: "Long",
    size: 1.0,
    entry: 145.2,
    profitLoss: 200.0,
    balance: 10275.45,
    tags: ["Trend Following"],
    notes: "Followed a long-term trend with good momentum.",
  },
];

// Simulated live market data (updated every 10 seconds)
let liveMarketData = {
  "EUR/USD": { price: 1.095, trend: "bearish" },
  "GBP/USD": { price: 1.275, trend: "neutral" },
  "USD/JPY": { price: 147.8, trend: "bullish" },
  "AUD/USD": { price: 0.665, trend: "bearish" },
};

// Function to simulate live market updates
function updateLiveMarketData() {
  Object.keys(liveMarketData).forEach((pair) => {
    const change = (Math.random() - 0.5) * 0.005; // Random price change between -0.0025 and +0.0025
    liveMarketData[pair].price = Math.max(
      0,
      (liveMarketData[pair].price + change).toFixed(4)
    );
    liveMarketData[pair].trend =
      change > 0 ? "bullish" : change < 0 ? "bearish" : "neutral";
  });
  console.log("Live market data updated:", liveMarketData);
}

// Update market data every 10 seconds
setInterval(updateLiveMarketData, 10000);

// Function to initialize trades (load from localStorage or use sample data)
function initializeTrades() {
  const savedTrades = localStorage.getItem("trades");
  window.state.data.trades = savedTrades
    ? JSON.parse(savedTrades)
    : sampleTrades;
  if (!savedTrades) {
    localStorage.setItem("trades", JSON.stringify(window.state.data.trades));
  }
}

// Function to add a new trade
function addTrade(trade) {
  if (
    !trade.date ||
    !trade.pair ||
    !trade.ls ||
    !trade.size ||
    !trade.entry ||
    trade.profitLoss === undefined ||
    trade.balance === undefined
  ) {
    console.error("Invalid trade data:", trade);
    return false;
  }

  window.state.data.trades.push(trade);
  console.log("New trade added:", trade);
  localStorage.setItem("trades", JSON.stringify(window.state.data.trades));
  return true;
}

// Function to delete a trade
function deleteTrade(index) {
  window.state.data.trades.splice(index, 1);
  localStorage.setItem("trades", JSON.stringify(window.state.data.trades));
  populateTradingJournal();
}

// Function to export trades as CSV
function exportTrades() {
  const trades = getTrades().filter(
    (trade) => new Date(trade.date).getFullYear() === 2025
  );
  if (trades.length === 0) {
    alert("No trades to export for 2025.");
    return;
  }

  const headers = [
    "Date",
    "Pair",
    "L/S",
    "Size",
    "Entry",
    "Profit/Loss",
    "Balance",
    "Tags",
    "Notes",
  ];
  const csvRows = [headers.join(",")];
  trades.forEach((trade) => {
    const row = [
      trade.date,
      trade.pair,
      trade.ls,
      trade.size,
      trade.entry,
      trade.profitLoss,
      trade.balance,
      `"${trade.tags ? trade.tags.join(";") : ""}"`,
      `"${trade.notes ? trade.notes.replace(/"/g, '""') : ""}"`,
    ];
    csvRows.push(row.join(","));
  });

  const csv = csvRows.join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "trades_2025.csv";
  a.click();
  window.URL.revokeObjectURL(url);
}

// Function to get all trades
function getTrades() {
  return window.state.data.trades;
}

// Theme Toggle Functionality
function initializeTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  if (!themeToggle) {
    console.error("Theme toggle button not found!");
    return;
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  body.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  // Add event listener for theme toggle
  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector(".theme-icon");
  if (themeIcon) {
    themeIcon.textContent = theme === "light" ? "🌓" : "☀️";
  }
}

// Manual theme toggle for onclick
window.toggleThemeManually = function () {
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
};

// Mobile Menu Toggle
function initializeMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenu.querySelector("i").classList.toggle("fa-bars");
      mobileMenu.querySelector("i").classList.toggle("fa-times");
    });
  } else {
    console.error("Mobile menu or nav links not found!");
  }
}

// Carousel Functionality
let currentSlide = 0;
const totalSlides = 3;

function goToSlide(index) {
  const slides = document.getElementById("carouselSlides");
  const dots = document.querySelectorAll(".dot");
  currentSlide = index;
  slides.style.transform = `translateX(-${currentSlide * 33.33}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}

// Trading Journal Enhancements
let currentSort = "date-desc";
let currentFilter = "";
let chartDataPoints = [];

// Function to populate the filter dropdown with unique pairs
function populateFilterDropdown() {
  const filterPair = document.getElementById("filterPair");
  const trades = getTrades();
  const pairs = [...new Set(trades.map((trade) => trade.pair))];
  filterPair.innerHTML = '<option value="">All Pairs</option>';
  pairs.forEach((pair) => {
    const option = document.createElement("option");
    option.value = pair;
    option.textContent = pair;
    filterPair.appendChild(option);
  });
}

// Function to sort trades
function sortTrades() {
  const sortBy = document.getElementById("sortBy").value;
  currentSort = sortBy;
  populateTradingJournal();
}

// Function to filter trades
function filterTrades() {
  const filterPair = document.getElementById("filterPair").value;
  currentFilter = filterPair;
  populateTradingJournal();
}

// Function to calculate trade summary
function updateTradeSummary() {
  const trades = getTrades().filter(
    (trade) => new Date(trade.date).getFullYear() === 2025
  );
  const totalTrades = trades.length;
  const totalProfitLoss = trades
    .reduce((sum, trade) => sum + trade.profitLoss, 0)
    .toFixed(2);
  const winningTrades = trades.filter((trade) => trade.profitLoss > 0).length;
  const winRate =
    totalTrades > 0 ? ((winningTrades / totalTrades) * 100).toFixed(2) : 0;

  document.getElementById("totalTrades").textContent = totalTrades;
  document.getElementById(
    "totalProfitLoss"
  ).textContent = `$${totalProfitLoss}`;
  document.getElementById("totalProfitLoss").className =
    totalProfitLoss >= 0 ? "positive" : "negative";
  document.getElementById("winRate").textContent = `${winRate}%`;
}

// Function to draw a mini-chart of profit/loss over time
function drawProfitLossChart() {
  const canvas = document.getElementById("profitLossChart");
  const ctx = canvas.getContext("2d");
  const chartType = document.getElementById("chartType").value;
  const trades = getTrades().filter(
    (trade) => new Date(trade.date).getFullYear() === 2025
  );

  if (trades.length === 0) {
    ctx.fillStyle = "#e0e0e0";
    ctx.font = "14px Inter";
    ctx.textAlign = "center";
    ctx.fillText("No trades to display", canvas.width / 2, canvas.height / 2);
    chartDataPoints = [];
    return;
  }

  // Calculate data points based on chart type
  let dataPoints = [];
  let cumulative = 0;
  if (chartType === "cumulative") {
    dataPoints = trades.map((trade) => {
      cumulative += trade.profitLoss;
      return { value: cumulative, trade };
    });
  } else {
    dataPoints = trades.map((trade) => ({ value: trade.profitLoss, trade }));
  }

  chartDataPoints = dataPoints;

  const maxValue = Math.max(...dataPoints.map((dp) => dp.value), 0);
  const minValue = Math.min(...dataPoints.map((dp) => dp.value), 0);
  const range = Math.max(Math.abs(maxValue), Math.abs(minValue), 1);
  const width = canvas.width;
  const height = canvas.height;
  const stepX = width / (dataPoints.length - 1 || 1);
  const zeroY = height * (maxValue / (maxValue - minValue)) || height / 2;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw zero line
  ctx.beginPath();
  ctx.strokeStyle = "#b0b0b0";
  ctx.lineWidth = 1;
  ctx.moveTo(0, zeroY);
  ctx.lineTo(width, zeroY);
  ctx.stroke();

  // Draw line chart
  ctx.beginPath();
  ctx.strokeStyle = "#3498db";
  ctx.lineWidth = 2;
  dataPoints.forEach((dp, i) => {
    const x = i * stepX;
    const y = zeroY - (dp.value / range) * (height / 2);
    dp.x = x;
    dp.y = y;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();

  // Draw points
  ctx.fillStyle = "#3498db";
  dataPoints.forEach((dp) => {
    ctx.beginPath();
    ctx.arc(dp.x, dp.y, 3, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Function to show chart tooltip on hover
function setupChartTooltip() {
  const canvas = document.getElementById("profitLossChart");
  const tooltip = document.createElement("div");
  tooltip.className = "chart-tooltip";
  canvas.parentElement.appendChild(tooltip);

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let closestPoint = null;
    let minDistance = Infinity;

    chartDataPoints.forEach((dp) => {
      const distance = Math.sqrt((dp.x - x) ** 2 + (dp.y - y) ** 2);
      if (distance < minDistance && distance < 20) {
        minDistance = distance;
        closestPoint = dp;
      }
    });

    if (closestPoint) {
      const trade = closestPoint.trade;
      tooltip.style.display = "block";
      tooltip.style.left = `${x + 10}px`;
      tooltip.style.top = `${y - 40}px`;
      tooltip.innerHTML = `
        <strong>${trade.pair}</strong><br>
        Date: ${trade.date}<br>
        Profit/Loss: $${trade.profitLoss.toFixed(2)}<br>
        ${trade.notes ? `Notes: ${trade.notes}` : ""}
      `;
    } else {
      tooltip.style.display = "none";
    }
  });

  canvas.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
}

// Function to populate Trading Journal 2025 with trades
function populateTradingJournal() {
  const tradingJournalGrid = document.getElementById("tradingJournalGrid");
  const loadingSpinner = document.getElementById("tradingJournalLoading");
  if (!tradingJournalGrid) {
    console.error("Trading Journal Grid not found");
    return;
  }

  // Show loading spinner
  loadingSpinner.style.display = "block";
  tradingJournalGrid.style.opacity = "0.5";

  setTimeout(() => {
    // Get trades and filter for 2025
    let trades = getTrades().filter(
      (trade) => new Date(trade.date).getFullYear() === 2025
    );

    // Apply filter
    if (currentFilter) {
      trades = trades.filter((trade) => trade.pair === currentFilter);
    }

    // Apply sorting
    switch (currentSort) {
      case "date-asc":
        trades.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "date-desc":
        trades.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "profit-asc":
        trades.sort((a, b) => a.profitLoss - b.profitLoss);
        break;
      case "profit-desc":
        trades.sort((a, b) => b.profitLoss - a.profitLoss);
        break;
      case "pair-asc":
        trades.sort((a, b) => a.pair.localeCompare(b.pair));
        break;
      case "pair-desc":
        trades.sort((a, b) => b.pair.localeCompare(b.pair));
        break;
    }

    // Clear existing content
    tradingJournalGrid.innerHTML = "";

    if (trades.length === 0) {
      const noTradesMessage = document.createElement("p");
      noTradesMessage.textContent = currentFilter
        ? `No trades recorded for ${currentFilter} in 2025.`
        : "No trades recorded for 2025 yet.";
      noTradesMessage.style.color = "#fff";
      noTradesMessage.style.textAlign = "center";
      tradingJournalGrid.appendChild(noTradesMessage);
      loadingSpinner.style.display = "none";
      tradingJournalGrid.style.opacity = "1";
      return;
    }

    // Populate trades
    trades.forEach((trade, index) => {
      const card = document.createElement("div");
      card.className = "tradingjournal-card";
      card.innerHTML = `
        <button class="delete-button" onclick="deleteTrade(${index})" aria-label="Delete trade">
          <i class="fas fa-trash"></i>
        </button>
        <img src="https://via.placeholder.com/300x150?text=${
          trade.pair
        }+Trade" alt="${trade.pair} Trade" />
        <div class="content">
          <h3>${trade.pair} - ${trade.date}</h3>
          <div class="trade-details">
            <p><strong>L/S:</strong> ${trade.ls}</p>
            <p><strong>Size:</strong> ${trade.size}</p>
            <p><strong>Entry:</strong> ${trade.entry}</p>
            <p><strong>Profit/Loss:</strong> <span class="${
              trade.profitLoss >= 0 ? "positive" : "negative"
            }">$${trade.profitLoss.toFixed(2)}</span></p>
            <p><strong>Balance:</strong> $${trade.balance.toFixed(2)}</p>
          </div>
          ${
            trade.tags && trade.tags.length > 0
              ? `<div class="tags">${trade.tags
                  .map((tag) => `<span class="tag">${tag}</span>`)
                  .join("")}</div>`
              : ""
          }
          ${trade.notes ? `<div class="notes">${trade.notes}</div>` : ""}
          <a href="trade.html" class="learn-more">View Details <i class="fas fa-arrow-right"></i></a>
        </div>
      `;
      tradingJournalGrid.appendChild(card);
    });

    // Update trade summary and chart
    updateTradeSummary();
    drawProfitLossChart();

    // Hide loading spinner
    loadingSpinner.style.display = "none";
    tradingJournalGrid.style.opacity = "1";
  }, 500); // Simulate loading delay
}

// AI Chatbot Enhancements
let lastTopic = "";
let lastTradeMentioned = null;
let lastPairMentioned = null;
let conversationContext = [];
let userProfile = {
  preferredPairs: [],
  preferredStrategies: [],
  language: "English",
};
let feedbackLog = [];

// Load feedback from localStorage
function loadFeedback() {
  const savedFeedback = localStorage.getItem("feedbackLog");
  feedbackLog = savedFeedback ? JSON.parse(savedFeedback) : [];
}

// Save feedback to localStorage
function saveFeedback() {
  localStorage.setItem("feedbackLog", JSON.stringify(feedbackLog));
}

// Function to calculate feedback trends
function getFeedbackTrends() {
  const trends = {};
  feedbackLog.forEach((entry) => {
    const key = entry.response.split(" ").slice(0, 5).join(" "); // Use first 5 words as a key
    if (!trends[key]) {
      trends[key] = { yes: 0, no: 0 };
    }
    trends[key][entry.rating]++;
  });
  return trends;
}

// Function to calculate Trader Score
function calculateTraderScore() {
  const trades = getTrades().filter(
    (trade) => new Date(trade.date).getFullYear() === 2025
  );
  if (trades.length === 0) return 0;

  const totalProfitLoss = trades.reduce(
    (sum, trade) => sum + trade.profitLoss,
    0
  );
  const winningTrades = trades.filter((trade) => trade.profitLoss > 0).length;
  const winRate = (winningTrades / trades.length) * 100;
  const consistency = trades.length > 5 ? 20 : trades.length * 4; // Bonus for consistency

  // Score: 40% profit, 40% win rate, 20% consistency
  const profitScore = Math.min((totalProfitLoss / 1000) * 40, 40); // Max 40 points
  const winRateScore = (winRate / 100) * 40; // Max 40 points
  const consistencyScore = consistency; // Max 20 points

  return Math.round(profitScore + winRateScore + consistencyScore);
}

// Function to update user profile based on interactions
function updateUserProfile(message, trades) {
  // Update preferred pairs
  const pairs = trades.map((trade) => trade.pair);
  const pairCounts = {};
  pairs.forEach((pair) => {
    pairCounts[pair] = (pairCounts[pair] || 0) + 1;
  });
  userProfile.preferredPairs = Object.keys(pairCounts).sort(
    (a, b) => pairCounts[b] - pairCounts[a]
  );

  // Update preferred strategies
  const strategies = trades.flatMap((trade) => trade.tags || []);
  const strategyCounts = {};
  strategies.forEach((strategy) => {
    strategyCounts[strategy] = (strategyCounts[strategy] || 0) + 1;
  });
  userProfile.preferredStrategies = Object.keys(strategyCounts).sort(
    (a, b) => strategyCounts[b] - strategyCounts[a]
  );

  // Update language preference
  if (message.includes("spanish")) {
    userProfile.language = "Spanish";
  } else if (message.includes("french")) {
    userProfile.language = "French";
  } else if (message.includes("english")) {
    userProfile.language = "English";
  }
}

// Enhanced sentiment analysis
function analyzeSentiment(message) {
  const positiveWords = [
    "good",
    "great",
    "awesome",
    "happy",
    "profitable",
    "success",
    "excellent",
    "amazing",
  ];
  const negativeWords = [
    "bad",
    "terrible",
    "loss",
    "fail",
    "sad",
    "disappointing",
    "poor",
    "awful",
  ];
  message = message.toLowerCase();

  let sentimentScore = 0;
  positiveWords.forEach((word) => {
    if (message.includes(word)) sentimentScore += 1;
  });
  negativeWords.forEach((word) => {
    if (message.includes(word)) sentimentScore -= 1;
  });

  if (sentimentScore > 0) return "positive";
  if (sentimentScore < 0) return "negative";
  return "neutral";
}

// Enhanced web search function (simulating broader web access)
function webSearch(query) {
  query = query.toLowerCase();

  // Forex Market Trends
  if (
    query.includes("forex market trends") ||
    query.includes("market update")
  ) {
    if (query.includes("2025")) {
      return "As of April 7, 2025, the forex market has been influenced by several factors. The USD has strengthened due to the Federal Reserve's rate hikes in January and March 2025 (25 basis points each), pushing EUR/USD to a range of 1.07-1.10. GBP/USD has seen volatility around 1.27-1.30 due to ongoing Brexit-related negotiations. USD/JPY has climbed to around 147.50, driven by safe-haven flows amid geopolitical tensions in Eastern Europe. Emerging market currencies like the AUD and NZD have weakened due to a slowdown in China's economic growth.";
    }
    return "I can provide forex market trends up to March 2024. For example, in early 2024, EUR/USD was trading around 1.09, influenced by ECB rate expectations. Would you like trends for a specific year, like 2025, or a different topic?";
  }

  // Trading Strategies
  if (query.includes("trading strategies") || query.includes("best strategy")) {
    if (query.includes("2025")) {
      return "In 2025, effective forex trading strategies include: 1) **Breakout Trading** - Capitalizing on key levels like 1.1000 for EUR/USD, which has been a significant resistance. 2) **Trend Following** - Using 50-day and 200-day moving averages to ride trends, especially on USD/JPY, which has shown a strong uptrend. 3) **News Trading** - Trading around major events like the Federal Reserve's rate decisions, which have caused 50-70 pip movements in USD pairs. 4) **Carry Trading** - Favoring pairs like AUD/JPY due to Australia's stable 4.1% interest rate versus Japan's near-zero rates.";
    }
    return "Trading strategies depend on the market conditions. As of 2024, popular strategies included trend following with moving averages and breakout trading around key levels. Would you like strategies for a specific year, like 2025, or a particular pair?";
  }

  // AI in Trading
  if (query.includes("ai in trading") || query.includes("ai trading tools")) {
    if (query.includes("2025")) {
      return "By April 2025, AI in trading has advanced significantly. Platforms like MetaTrader 5 now offer AI-driven predictive models with 75-80% accuracy for short-term price movements on pairs like EUR/USD. Trading bots using reinforcement learning are popular, executing trades with latency under 10ms. AI tools also provide sentiment analysis from social media platforms like X, helping traders gauge market mood. For example, recent X posts show bullish sentiment on USD/JPY due to safe-haven demand.";
    }
    return "As of 2024, AI in trading was growing, with tools like automated bots on platforms like Binance and predictive models on TradingView. Would you like to know about AI trading tools in 2025 or a specific platform?";
  }

  // Economic Events
  if (query.includes("economic events") || query.includes("news")) {
    if (query.includes("2025")) {
      return "Key economic events in 2025 up to April 7 include: 1) **Federal Reserve Rate Hikes** on January 15 and March 5, increasing rates by 25 basis points each, boosting the USD. 2) **ECB Rate Decision** on February 10, where rates were held steady at 3.75%, leading to a 1% drop in EUR/USD. 3) **UK GDP Data** on March 15, showing a 0.2% growth, slightly supporting GBP. 4) **Geopolitical Tensions** in Eastern Europe, driving safe-haven flows to USD and JPY, with USD/JPY hitting 147.50.";
    }
    return "I can provide economic events up to March 2024. For example, the Federal Reserve raised rates by 25 basis points in February 2024, impacting USD pairs. Would you like events for 2025 or a specific region?";
  }

  // Best Pairs to Trade
  if (query.includes("best pairs to trade") || query.includes("top pairs")) {
    if (query.includes("2025")) {
      return "As of April 2025, the best pairs to trade include: 1) **USD/JPY** - High volatility (average daily range of 100 pips) due to safe-haven flows. 2) **EUR/USD** - High liquidity with tight spreads (1-2 pips), ideal for day trading. 3) **GBP/USD** - Volatile (80-90 pips daily) due to Brexit news, good for breakout strategies. 4) **AUD/JPY** - Popular for carry trades with a 4% interest rate differential. Always check current market conditions before trading!";
    }
    return "In 2024, top pairs included EUR/USD for its liquidity and USD/JPY for volatility. Would you like to know the best pairs for 2025 or a specific trading style?";
  }

  // Technical Analysis
  if (
    query.includes("technical analysis") ||
    query.includes("chart patterns")
  ) {
    if (query.includes("eur/usd") && query.includes("2025")) {
      return "As of April 2025, EUR/USD technical analysis shows a head-and-shoulders pattern forming on the daily chart, with the neckline at 1.0850. A break below could target 1.0700, while resistance is at 1.1000 (200-day moving average). RSI is at 45, indicating neutral momentum, but MACD shows bearish divergence, suggesting caution for longs.";
    }
    if (query.includes("usd/jpy") && query.includes("2025")) {
      return "USD/JPY in April 2025 is in a strong uptrend on the weekly chart, trading at 147.50. It’s above the 50-day moving average (145.80), with support at 146.00. The RSI is at 65, nearing overbought territory, and a double-top pattern might form if it fails to break 148.00. Watch for a pullback to 146.50 as a buying opportunity.";
    }
    return "I can provide technical analysis for specific pairs. For example, in 2024, EUR/USD showed a double-bottom pattern at 1.0800. Please specify a pair and year, like 'technical analysis EUR/USD 2025'.";
  }

  // Risk Management
  if (query.includes("risk management") || query.includes("stop loss")) {
    return "Effective risk management in forex trading includes: 1) **Position Sizing** - Risk no more than 1-2% of your account per trade. For a $10,000 account, that’s $100-$200. 2) **Stop Loss** - Always set a stop loss; for EUR/USD, a 30-50 pip stop is common for day trades. 3) **Risk-Reward Ratio** - Aim for at least 1:2; if your stop loss is 30 pips, target 60 pips profit. 4) **Diversification** - Don’t overexpose to one pair; trade across majors like EUR/USD, USD/JPY, and GBP/USD. Would you like tips for a specific pair or strategy?";
  }

  // Broker Recommendations
  if (query.includes("best brokers") || query.includes("forex broker")) {
    if (query.includes("2025")) {
      return "As of April 2025, top forex brokers include: 1) **IG** - Best for beginners with tight spreads (0.8 pips on EUR/USD) and a user-friendly platform. 2) **OANDA** - Great for advanced traders with robust charting tools and API access. 3) **Saxo Bank** - Ideal for high-volume traders with low fees and access to 40+ forex pairs. 4) **XM** - Popular for low minimum deposits ($5) and high leverage (up to 1000:1). Always check regulation and fees before choosing!";
    }
    return "In 2024, brokers like IG, OANDA, and Pepperstone were popular for their low spreads and reliability. Would you like broker recommendations for 2025 or a specific region?";
  }

  // General Market Sentiment
  if (
    query.includes("market sentiment") ||
    query.includes("trader sentiment")
  ) {
    if (query.includes("2025")) {
      return "As of April 2025, market sentiment is mixed. X posts show 60% bullish sentiment on USD/JPY due to safe-haven demand, while EUR/USD sentiment is bearish (70% expecting a drop below 1.0800) due to ECB’s dovish stance. GBP/USD sentiment is neutral, with traders awaiting UK inflation data on April 15, 2025. Sentiment on AUD/USD is bearish due to China’s economic slowdown affecting commodity currencies.";
    }
    return "I can provide market sentiment up to March 2024. For example, in early 2024, traders were bullish on USD due to Fed rate hike expectations. Would you like sentiment for 2025 or a specific pair?";
  }

  // Fallback for Unrecognized Queries
  return "I couldn’t find specific information on that topic. Try asking about forex market trends, trading strategies, economic events, technical analysis, risk management, best pairs to trade, or market sentiment for 2025. For example, 'search forex market trends 2025' or 'technical analysis EUR/USD 2025'. You can also ask about your trading performance, like 'What’s my performance on EUR/USD this year?'";
}

// Function to translate responses to Spanish or French
function translateResponse(response, language) {
  if (language === "Spanish") {
    return response
      .replace("Hello", "Hola")
      .replace("I’m", "Soy")
      .replace("your", "tu")
      .replace("trades", "operaciones")
      .replace("profit", "ganancia")
      .replace("loss", "pérdida")
      .replace("Would you like", "¿Te gustaría")
      .replace("for 2025", "para 2025")
      .replace("Check", "Mira")
      .replace("Great job", "¡Buen trabajo")
      .replace("Let’s improve", "Mejoremos");
  } else if (language === "French") {
    return response
      .replace("Hello", "Bonjour")
      .replace("I’m", "Je suis")
      .replace("your", "ton")
      .replace("trades", "transactions")
      .replace("profit", "profit")
      .replace("loss", "perte")
      .replace("Would you like", "Voulez-vous")
      .replace("for 2025", "pour 2025")
      .replace("Check", "Regarde")
      .replace("Great job", "Bon travail")
      .replace("Let’s improve", "Améliorons");
  }
  return response;
}

// Function to suggest a trade based on historical performance and live data
function suggestTrade() {
  const trades = getTrades().filter(
    (trade) => new Date(trade.date).getFullYear() === 2025
  );
  if (trades.length === 0) {
    return "I don’t have any trades recorded for 2025 yet, so I can’t suggest a trade. Add some trades via the Dashboard!";
  }

  const pairPerformance = {};
  trades.forEach((trade) => {
    if (!pairPerformance[trade.pair]) {
      pairPerformance[trade.pair] = { totalProfit: 0, count: 0, winCount: 0 };
    }
    pairPerformance[trade.pair].totalProfit += trade.profitLoss;
    pairPerformance[trade.pair].count += 1;
    if (trade.profitLoss > 0) pairPerformance[trade.pair].winCount += 1;
  });

  const bestPair = Object.keys(pairPerformance).reduce((a, b) =>
    pairPerformance[a].totalProfit > pairPerformance[b].totalProfit ? a : b
  );
  const winRate = (
    (pairPerformance[bestPair].winCount / pairPerformance[bestPair].count) *
    100
  ).toFixed(2);

  const liveData = liveMarketData[bestPair];
  const trendInfo = liveData
    ? ` The current price is ${liveData.price}, and the trend is ${liveData.trend}.`
    : "";

  return `Based on your 2025 trades, your most profitable pair is ${bestPair}, with a total profit of $${pairPerformance[
    bestPair
  ].totalProfit.toFixed(
    2
  )} and a win rate of ${winRate}%. Consider trading ${bestPair} again!${trendInfo}`;
}

// Function to analyze performance for a specific pair
function analyzePairPerformance(pair) {
  const trades = getTrades().filter(
    (trade) =>
      trade.pair.toLowerCase() === pair.toLowerCase() &&
      new Date(trade.date).getFullYear() === 2025
  );
  if (trades.length === 0) {
    return `You have no recorded trades for ${pair} in 2025. Try adding some trades via the Dashboard!`;
  }

  const totalProfitLoss = trades
    .reduce((sum, trade) => sum + trade.profitLoss, 0)
    .toFixed(2);
  const winningTrades = trades.filter((trade) => trade.profitLoss > 0).length;
  const winRate = ((winningTrades / trades.length) * 100).toFixed(2);

  const liveData = liveMarketData[pair.toUpperCase()];
  const liveInfo = liveData
    ? ` The current price is ${liveData.price}, with a ${liveData.trend} trend.`
    : "";

  return `Your performance on ${pair} in 2025: You made ${trades.length} trades, with a total profit/loss of $${totalProfitLoss} and a win rate of ${winRate}%.${liveInfo}`;
}

// Voice Input Functionality
let recognition = null;
window.startVoiceInput = function () {
  const voiceButton = document.getElementById("voiceButton");
  const input = document.getElementById("chatbotInput");

  if (!("webkitSpeechRecognition" in window)) {
    alert("Sorry, your browser does not support speech recognition.");
    return;
  }

  if (!recognition) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      voiceButton.classList.add("listening");
      voiceButton.querySelector("i").classList.remove("fa-microphone");
      voiceButton.querySelector("i").classList.add("fa-microphone-slash");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      input.value = transcript;
      sendMessage();
    };

    recognition.onend = () => {
      voiceButton.classList.remove("listening");
      voiceButton.querySelector("i").classList.remove("fa-microphone-slash");
      voiceButton.querySelector("i").classList.add("fa-microphone");
      recognition = null;
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("An error occurred during speech recognition: " + event.error);
      recognition.stop();
    };
  }

  recognition.start();
};

// Interactive AI Chatbot Logic
function sendMessage() {
  const input = document.getElementById("chatbotInput");
  const messages = document.getElementById("chatbotMessages");
  const loadingSpinner = document.getElementById("chatbotLoading");
  const userMessage = input.value.trim();

  if (!userMessage) return;

  // Display user message with animation
  const userDiv = document.createElement("div");
  userDiv.className = "message user-message";
  userDiv.textContent = userMessage;
  userDiv.style.opacity = "0";
  messages.appendChild(userDiv);
  setTimeout(() => {
    userDiv.style.transition = "opacity 0.5s";
    userDiv.style.opacity = "1";
  }, 10);

  // Show loading spinner
  loadingSpinner.style.display = "block";
  messages.style.opacity = "0.5";

  // Generate bot response
  setTimeout(() => {
    const sentiment = analyzeSentiment(userMessage);
    const botResponse = generateBotResponse(
      userMessage.toLowerCase(),
      sentiment
    );
    const translatedResponse = translateResponse(
      botResponse,
      userProfile.language
    );
    const botDiv = document.createElement("div");
    botDiv.className = "message bot-message";
    botDiv.innerHTML = `${translatedResponse}<br><small>Was this helpful? <button onclick="logFeedback('yes', '${translatedResponse}')">Yes</button> <button onclick="logFeedback('no', '${translatedResponse}')">No</button></small>`;
    botDiv.style.opacity = "0";
    messages.appendChild(botDiv);
    setTimeout(() => {
      botDiv.style.transition = "opacity 0.5s";
      botDiv.style.opacity = "1";
    }, 100);

    // Scroll to bottom
    messages.scrollTop = messages.scrollHeight;

    // Hide loading spinner
    loadingSpinner.style.display = "none";
    messages.style.opacity = "1";
  }, 1000); // Simulate processing delay

  // Clear input
  input.value = "";
}

// Function to log user feedback
window.logFeedback = function (rating, response) {
  feedbackLog.push({ response, rating, timestamp: new Date().toISOString() });
  saveFeedback();
  console.log("Feedback logged:", feedbackLog);
  const feedbackMessage =
    rating === "yes"
      ? "Thanks for the feedback! I’m glad I could help."
      : "I’m sorry that wasn’t helpful. I’ll try to improve. What else can I assist with?";
  const messages = document.getElementById("chatbotMessages");
  const feedbackDiv = document.createElement("div");
  feedbackDiv.className = "message bot-message";
  feedbackDiv.textContent = feedbackMessage;
  feedbackDiv.style.opacity = "0";
  messages.appendChild(feedbackDiv);
  setTimeout(() => {
    feedbackDiv.style.transition = "opacity 0.5s";
    feedbackDiv.style.opacity = "1";
  }, 100);
  messages.scrollTop = messages.scrollHeight;
};

function generateBotResponse(message, sentiment) {
  const trades = getTrades();
  const trades2025 = trades.filter(
    (trade) => new Date(trade.date).getFullYear() === 2025
  );

  // Update user profile
  updateUserProfile(message, trades2025);

  // Update conversation context with more details
  conversationContext.push({
    user: message,
    sentiment,
    pair: lastPairMentioned,
  });
  if (conversationContext.length > 5) conversationContext.shift();

  // Update last topic and pair mentioned
  if (
    message.includes("trading") ||
    message.includes("journal") ||
    message.includes("trade")
  ) {
    lastTopic = "trading";
  } else if (message.includes("bot") || message.includes("v2")) {
    lastTopic = "bot";
  } else if (message.includes("service") || message.includes("services")) {
    lastTopic = "services";
  }

  const pairMatch = message.match(/(\w+\/\w+)/i);
  if (pairMatch) {
    lastPairMentioned = pairMatch[1].toUpperCase();
  }

  // Sentiment-based tone adjustment
  let sentimentResponse = "";
  let sentimentSuggestion = "";
  if (sentiment === "positive") {
    sentimentResponse = "Great to hear you’re feeling positive! ";
    sentimentSuggestion =
      " Keep up the momentum—maybe try a new strategy to boost your profits even more!";
  } else if (sentiment === "negative") {
    sentimentResponse =
      "I’m sorry you’re feeling down. Let’s turn things around! ";
    sentimentSuggestion =
      " Would you like some risk management tips to help minimize losses?";
  } else {
    sentimentResponse = "Let’s dive into your query! ";
  }

  // Proactive suggestion
  let proactiveSuggestion = "";
  if (message.includes("trade") && !message.includes("suggest")) {
    proactiveSuggestion =
      " Would you like me to suggest a trade based on your history and live market data?";
  } else if (message.includes("market trends")) {
    proactiveSuggestion =
      " Would you like to know the best pairs to trade in 2025?";
  } else if (lastPairMentioned && !message.includes("performance")) {
    proactiveSuggestion = ` Would you like to know your performance on ${lastPairMentioned} this year?`;
  }

  // Gamification: Trader Score
  const traderScore = calculateTraderScore();
  let traderScoreMessage = "";
  if (trades2025.length > 0) {
    traderScoreMessage = ` Your Trader Score is ${traderScore}/100. ${
      traderScore >= 70
        ? "Great job!"
        : traderScore >= 40
        ? "Nice work—keep improving!"
        : "Let’s improve your score!"
    }`;
  }

  // Check feedback trends to adjust responses
  const feedbackTrends = getFeedbackTrends();
  let responseAdjustment = "";
  const messageKey = message.split(" ").slice(0, 5).join(" ");
  if (
    feedbackTrends[messageKey] &&
    feedbackTrends[messageKey].no > feedbackTrends[messageKey].yes
  ) {
    responseAdjustment =
      " I noticed my previous responses on this topic weren’t helpful. Let me provide more detailed information this time.";
  }

  // Main responses
  if (message.includes("hello") || message.includes("hi")) {
    return `${sentimentResponse}Hello! I’m Blunt’s AI Chatbot. I can help with information about the portfolio, services, bot updates, trading journal, or search the web for forex trends, strategies, and more. What’s on your mind? ${traderScoreMessage}`;
  } else if (message.includes("portfolio")) {
    return `${sentimentResponse}Check out the Personal Portfolio and Trading Journal 2025 in the Portfolio section below! The portfolio showcases my best work, while the trading journal offers insights into my 2025 trades. ${traderScoreMessage}${sentimentSuggestion}`;
  } else if (message.includes("trading") || message.includes("journal")) {
    const tradeCount = trades2025.length;
    if (tradeCount === 0) {
      return `${sentimentResponse}The Trading Journal 2025 section is below, but there are no trades recorded yet for 2025. You can add trades via the Dashboard! ${traderScoreMessage}${sentimentSuggestion}`;
    }
    const totalProfitLoss = trades2025
      .reduce((sum, trade) => sum + trade.profitLoss, 0)
      .toFixed(2);
    return `${sentimentResponse}The Trading Journal 2025 section below shows my ${tradeCount} trades for the year, with a total profit/loss of $${totalProfitLoss}. You can sort, filter, export, or even delete trades, and check the summary for more insights! ${traderScoreMessage}${sentimentSuggestion}`;
  } else if (
    message.includes("recent trade") ||
    message.includes("last trade")
  ) {
    if (trades2025.length === 0) {
      return `${sentimentResponse}I don’t have any trades recorded for 2025 yet. You can add some via the Dashboard! ${traderScoreMessage}${sentimentSuggestion}`;
    }
    const lastTrade = trades2025.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )[0];
    lastTradeMentioned = lastTrade;
    lastPairMentioned = lastTrade.pair;
    return `${sentimentResponse}My most recent trade in 2025 was on ${
      lastTrade.date
    } with ${lastTrade.pair}. It was a ${
      lastTrade.ls
    } position with a profit/loss of $${lastTrade.profitLoss.toFixed(
      2
    )}. Check the Trading Journal 2025 section for more details! ${traderScoreMessage}${proactiveSuggestion}${sentimentSuggestion}`;
  } else if (message.includes("profitable trade")) {
    const profitableTrades = trades2025.filter((trade) => trade.profitLoss > 0);
    if (profitableTrades.length === 0) {
      return `${sentimentResponse}I haven’t had any profitable trades in 2025 yet. Check back later or add new trades via the Dashboard! ${traderScoreMessage}${sentimentSuggestion}`;
    }
    const mostProfitable = profitableTrades.reduce(
      (max, trade) => (trade.profitLoss > max.profitLoss ? trade : max),
      profitableTrades[0]
    );
    lastTradeMentioned = mostProfitable;
    lastPairMentioned = mostProfitable.pair;
    return `${sentimentResponse}My most profitable trade in 2025 was on ${
      mostProfitable.date
    } with ${
      mostProfitable.pair
    }, earning a profit of $${mostProfitable.profitLoss.toFixed(
      2
    )}. See more in the Trading Journal 2025 section! ${traderScoreMessage}${proactiveSuggestion}${sentimentSuggestion}`;
  } else if (
    message.includes("average profit") ||
    message.includes("average loss")
  ) {
    if (trades2025.length === 0) {
      return `${sentimentResponse}There are no trades recorded for 2025 yet, so I can’t calculate averages. Add some trades via the Dashboard! ${traderScoreMessage}${sentimentSuggestion}`;
    }
    const profits = trades2025
      .filter((trade) => trade.profitLoss > 0)
      .map((trade) => trade.profitLoss);
    const losses = trades2025
      .filter((trade) => trade.profitLoss < 0)
      .map((trade) => trade.profitLoss);
    const avgProfit =
      profits.length > 0
        ? (profits.reduce((sum, val) => sum + val, 0) / profits.length).toFixed(
            2
          )
        : 0;
    const avgLoss =
      losses.length > 0
        ? (losses.reduce((sum, val) => sum + val, 0) / losses.length).toFixed(2)
        : 0;
    return `${sentimentResponse}In 2025, your average profit per winning trade is $${avgProfit}, and your average loss per losing trade is $${avgLoss}. ${traderScoreMessage}${sentimentSuggestion}`;
  } else if (
    message.includes("suggest a trade") ||
    message.includes("suggest trade")
  ) {
    return `${sentimentResponse}${suggestTrade()} ${traderScoreMessage}${sentimentSuggestion}`;
  } else if (
    message.includes("performance on") ||
    message.includes("how did i do on")
  ) {
    const pairMatch = message.match(/(\w+\/\w+)/i);
    if (!pairMatch) {
      return `${sentimentResponse}Please specify a currency pair, like 'performance on EUR/USD'. ${traderScoreMessage}${sentimentSuggestion}`;
    }
    const pair = pairMatch[1].toUpperCase();
    lastPairMentioned = pair;
    return `${sentimentResponse}${analyzePairPerformance(
      pair
    )} ${traderScoreMessage}${sentimentSuggestion}`;
  } else if (message.includes("tell me more") && lastPairMentioned) {
    const webQuery = `technical analysis ${lastPairMentioned} 2025`;
    return `${sentimentResponse}Here’s more on ${lastPairMentioned}: ${webSearch(
      webQuery
    )} ${traderScoreMessage}${proactiveSuggestion}${sentimentSuggestion}`;
  } else if (message.includes("what about") && message.match(/(\w+\/\w+)/i)) {
    const pair = message.match(/(\w+\/\w+)/i)[1].toUpperCase();
    lastPairMentioned = pair;
    return `${sentimentResponse}${analyzePairPerformance(
      pair
    )} ${traderScoreMessage}${proactiveSuggestion}${sentimentSuggestion}`;
  } else if (
    message.includes("live market update") ||
    message.includes("current market")
  ) {
    let marketUpdate = `${sentimentResponse}Here’s the latest market update as of now:\n`;
    Object.keys(liveMarketData).forEach((pair) => {
      marketUpdate += `- ${pair}: ${liveMarketData[pair].price} (${liveMarketData[pair].trend})\n`;
    });
    marketUpdate +=
      "These prices are simulated and update every 10 seconds. Would you like to focus on a specific pair?";
    return `${marketUpdate} ${traderScoreMessage}${sentimentSuggestion}`;
  } else if (message.includes("services")) {
    return `${sentimentResponse}I offer a range of services, including Web Development, AI Consulting, Trading Automation, Design Services, and Bot Maintenance. Check out the Services section above for more details! ${traderScoreMessage}${sentimentSuggestion}`;
  } else if (message.includes("bot v2") || message.includes("bot update")) {
    return `${sentimentResponse}The Bot v2.0 release is highlighted in the carousel above! It includes the latest AI features and performance updates. Visit the Bot page for more details. ${traderScoreMessage}${sentimentSuggestion}`;
  } else if (message.includes("search")) {
    const query = message.replace("search", "").trim();
    return `${sentimentResponse}${responseAdjustment}${webSearch(
      query
    )} ${traderScoreMessage}${proactiveSuggestion}${sentimentSuggestion}`;
  } else if (message.includes("trader score")) {
    return `${sentimentResponse}${traderScoreMessage} The score is based on your profit (40%), win rate (40%), and consistency (20%). Keep trading to improve your score! ${sentimentSuggestion}`;
  } else {
    return `${sentimentResponse}I’m not sure how to respond to that. I can help with your portfolio, trading journal, services, bot updates, or search the web for forex trends and strategies. For example, try 'suggest a trade' or 'search forex market trends 2025'. ${traderScoreMessage}${sentimentSuggestion}`;
  }
}

// Initialize everything on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeTrades();
  initializeTheme();
  initializeMobileMenu();
  setInterval(nextSlide, 5000);
  goToSlide(0);
  populateFilterDropdown();
  populateTradingJournal();
  setupChartTooltip();
  loadFeedback();

  // Add event listener for Enter key on chatbot input
  const chatbotInput = document.getElementById("chatbotInput");
  if (chatbotInput) {
    chatbotInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }
});
// Function to initialize the trades array
function initializeTrades() {
  if (!trades) {
    trades = [];
  }
}
// Function to initialize the theme based on user preference
function initializeTheme() {
  const theme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark-theme", theme === "dark");
  document.getElementById("themeToggle").checked = theme === "dark";
}
// Function to initialize the mobile menu
function initializeMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });
}
// Function to populate the filter dropdown with unique pairs
function populateFilterDropdown() {
  const filterDropdown = document.getElementById("filterDropdown");
  const uniquePairs = [...new Set(trades.map((trade) => trade.pair))];
  uniquePairs.forEach((pair) => {
    const option = document.createElement("option");
    option.value = pair;
    option.textContent = pair;
    filterDropdown.appendChild(option);
  });
}
// Function to populate the trading journal with trades
function populateTradingJournal() {
  const tradingJournal = document.getElementById("tradingJournal");
  tradingJournal.innerHTML = ""; // Clear existing content
  trades.forEach((trade) => {
    const tradeRow = document.createElement("div");
    tradeRow.className = "trade-row";
    tradeRow.innerHTML = `
      <div>${trade.date}</div>
      <div>${trade.pair}</div>
      <div>${trade.ls}</div>
      <div>${trade.profitLoss}</div>
      <button onclick="deleteTrade('${trade.date}')">Delete</button>
    `;
    tradingJournal.appendChild(tradeRow);
  });
}
// Function to delete a trade from the journal
function deleteTrade(date) {
  trades = trades.filter((trade) => trade.date !== date);
  saveTrades();
  populateTradingJournal();
}
// Function to save trades to local storage
function saveTrades() {
  localStorage.setItem("trades", JSON.stringify(trades));
}
// Function to load feedback from local storage
function loadFeedback() {
  const feedback = localStorage.getItem("feedbackLog");
  if (feedback) {
    feedbackLog = JSON.parse(feedback);
  }
}
// Function to save feedback to local storage
function saveFeedback() {
  localStorage.setItem("feedbackLog", JSON.stringify(feedbackLog));
}
// Function to calculate trader score based on trades
function calculateTraderScore() {
  const totalProfit = trades.reduce((sum, trade) => sum + trade.profitLoss, 0);
  const winRate =
    (trades.filter((trade) => trade.profitLoss > 0).length / trades.length) *
    100;
  const consistency =
    trades.length > 0 ? (trades.length / trades.length) * 100 : 0;
  return Math.round((totalProfit + winRate + consistency) / 3);
}
// Function to get feedback trends
function getFeedbackTrends() {
  const trends = {};
  feedbackLog.forEach((feedback) => {
    const key = feedback.response.split(" ").slice(0, 5).join(" ");
    if (!trends[key]) {
      trends[key] = { yes: 0, no: 0 };
    }
    trends[key][feedback.rating] += 1;
  });
  return trends;
}
