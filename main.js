/**
 * 高第理財顧問 - 主要 JavaScript
 * 包含導航列、FAQ、表單驗證、動畫效果
 */

document.addEventListener("DOMContentLoaded", function () {
  // 初始化所有功能
  initMobileMenu();
  initStickyHeader();
  initBackToTop();
  initFAQ();
  initFormValidation();
  initScrollReveal();
  initSmoothScroll();
  initLoanCalculator(); // 新增：貸款試算表
});

/**
 * 行動裝置選單切換
 */
function initMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // 點擊選單項目後關閉選單
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // 點擊外部區域關閉選單
  document.addEventListener("click", function (e) {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      menuBtn.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });
}

/**
 * 固定導航列效果
 */
function initStickyHeader() {
  const header = document.querySelector(".header");
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    // 添加滾動樣式
    if (currentScroll > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
}

/**
 * 回到頂部按鈕
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/**
 * FAQ 手風琴效果
 */
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      // 關閉其他項目
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      // 切換當前項目
      item.classList.toggle("active");
    });
  });
}

/**
 * 表單驗證
 */
function initFormValidation() {
  const form = document.getElementById("consultForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // 收集表單資料
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 簡單驗證
    if (!data.name || !data.phone || !data.loanType) {
      showNotification("請填寫必填欄位", "error");
      return;
    }

    // 驗證手機號碼格式
    const phoneRegex = /^09\d{8}$/;
    const cleanPhone = data.phone.replace(/[-\s]/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      showNotification("請輸入正確的手機號碼格式", "error");
      return;
    }

    // 驗證 Email 格式（如果有填寫）
    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showNotification("請輸入正確的電子郵件格式", "error");
        return;
      }
    }

    // 模擬送出
    showNotification("感謝您的諮詢！我們將盡快與您聯繫。", "success");
    form.reset();
  });
}

/**
 * 顯示通知訊息
 */
function showNotification(message, type = "info") {
  // 移除已存在的通知
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // 建立通知元素（使用安全的 DOM 操作避免 XSS）
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;

  // 使用 textContent 而非 innerHTML 避免 XSS
  const iconSpan = document.createElement("span");
  iconSpan.className = "notification-icon";
  iconSpan.textContent =
    type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";

  const messageSpan = document.createElement("span");
  messageSpan.className = "notification-message";
  messageSpan.textContent = message;

  notification.appendChild(iconSpan);
  notification.appendChild(messageSpan);

  document.body.appendChild(notification);

  // 觸發動畫（使用 CSS class 而非 inline styles）
  requestAnimationFrame(() => {
    notification.classList.add("notification-visible");
  });

  // 自動移除
  setTimeout(() => {
    notification.classList.remove("notification-visible");
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

/**
 * 滾動顯示動畫
 */
function initScrollReveal() {
  // 為需要動畫的元素添加 data-reveal 屬性
  const revealElements = document.querySelectorAll(
    ".service-card, .feature-item, .process-step, .faq-item"
  );

  revealElements.forEach((el) => {
    el.setAttribute("data-reveal", "true");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    observer.observe(el);
  });
}

/**
 * 平滑滾動
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      // 安全性驗證：確保 href 只包含有效的 ID 格式（#開頭，後接字母數字底線連字號）
      const validIdPattern = /^#[a-zA-Z][a-zA-Z0-9_-]*$/;
      if (!validIdPattern.test(href)) {
        console.warn("無效的錨點連結格式:", href);
        return;
      }

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * 快速試算功能（Hero 區塊）- 與下方試算表連動
 */
document.addEventListener("DOMContentLoaded", function () {
  const heroCalculateBtn = document.getElementById("heroCalculateBtn");
  const heroLoanType = document.getElementById("heroLoanType");
  const heroLoanAmount = document.getElementById("heroLoanAmount");

  if (heroCalculateBtn) {
    heroCalculateBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // 驗證輸入
      if (!heroLoanType.value) {
        showNotification("請選擇貸款類型", "error");
        return;
      }

      if (!heroLoanAmount.value || heroLoanAmount.value <= 0) {
        showNotification("請輸入預計貸款金額", "error");
        return;
      }

      // 獲取下方試算表的元素
      const calcLoanType = document.getElementById("calcLoanType");
      const calcAmount = document.getElementById("calcAmount");
      const calcAmountSlider = document.getElementById("calcAmountSlider");
      const calcRate = document.getElementById("calcRate");
      const calculateBtn = document.getElementById("calculateBtn");
      const calcTermSlider = document.getElementById("calcTermSlider");
      const calcTerm = document.getElementById("calcTerm");
      const maxAmountLabel = document.getElementById("maxAmountLabel");
      const maxTermLabel = document.getElementById("maxTermLabel");

      // 貸款類型資料（與試算表同步）
      const loanData = {
        "youth-business": { rate: 1.67, maxAmount: 200, maxTerm: 7 },
        "first-home": { rate: 1.775, maxAmount: 800, maxTerm: 30 },
        student: { rate: 1.15, maxAmount: 100, maxTerm: 8 },
        agriculture: { rate: 1.5, maxAmount: 500, maxTerm: 15 },
        sme: { rate: 2.0, maxAmount: 1500, maxTerm: 10 },
        labor: { rate: 1.718, maxAmount: 10, maxTerm: 3 },
      };

      // 同步貸款類型
      calcLoanType.value = heroLoanType.value;

      // 獲取貸款類型資料
      const selectedData = loanData[heroLoanType.value];

      // 更新利率
      calcRate.value = selectedData.rate;

      // 更新滑桿範圍
      calcAmountSlider.max = selectedData.maxAmount;
      calcTermSlider.max = selectedData.maxTerm;
      maxAmountLabel.textContent = `${selectedData.maxAmount} 萬`;
      maxTermLabel.textContent = `${selectedData.maxTerm} 年`;

      // 同步金額（限制在最大值內）
      let amount = parseInt(heroLoanAmount.value);
      if (amount > selectedData.maxAmount) {
        amount = selectedData.maxAmount;
        showNotification(
          `此貸款類型最高額度為 ${selectedData.maxAmount} 萬元，已自動調整`,
          "info"
        );
      }
      calcAmount.value = amount;
      calcAmountSlider.value = amount;

      // 設定預設期限（取最大期限的一半或 5 年）
      const defaultTerm = Math.min(5, Math.ceil(selectedData.maxTerm / 2));
      calcTerm.value = defaultTerm;
      calcTermSlider.value = defaultTerm;

      // 顯示通知
      const loanTypeName =
        heroLoanType.options[heroLoanType.selectedIndex].text;
      showNotification(
        `正在為您計算 ${loanTypeName} ${amount} 萬元的方案...`,
        "success"
      );

      // 滾動到試算表區塊
      setTimeout(() => {
        const calculatorSection = document.getElementById("calculator");
        if (calculatorSection) {
          const headerOffset = 80;
          const elementPosition = calculatorSection.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // 滾動完成後自動執行計算
          setTimeout(() => {
            calculateBtn.click();
          }, 800);
        }
      }, 500);
    });
  }
});

/**
 * 貸款試算表功能
 */
function initLoanCalculator() {
  const loanTypeSelect = document.getElementById("calcLoanType");
  const amountInput = document.getElementById("calcAmount");
  const amountSlider = document.getElementById("calcAmountSlider");
  const termInput = document.getElementById("calcTerm");
  const termSlider = document.getElementById("calcTermSlider");
  const rateInput = document.getElementById("calcRate");
  const calculateBtn = document.getElementById("calculateBtn");
  const maxAmountLabel = document.getElementById("maxAmountLabel");
  const maxTermLabel = document.getElementById("maxTermLabel");

  // 如果試算表元素不存在則退出
  if (!loanTypeSelect || !calculateBtn) return;

  // 貸款類型資料
  const loanData = {
    "youth-business": {
      rate: 1.67,
      maxAmount: 200,
      maxTerm: 7,
      name: "青年創業貸款",
    },
    "first-home": {
      rate: 1.775,
      maxAmount: 800,
      maxTerm: 30,
      name: "青年首購房貸",
    },
    student: { rate: 1.15, maxAmount: 100, maxTerm: 8, name: "就學貸款" },
    agriculture: { rate: 1.5, maxAmount: 500, maxTerm: 15, name: "農業貸款" },
    sme: { rate: 2.0, maxAmount: 1500, maxTerm: 10, name: "中小企業貸款" },
    labor: { rate: 1.718, maxAmount: 10, maxTerm: 3, name: "勞工紓困貸款" },
  };

  // 當貸款類型變更時更新相關欄位
  loanTypeSelect.addEventListener("change", function () {
    const selected = this.value;
    const data = loanData[selected];

    if (data) {
      // 更新利率
      rateInput.value = data.rate;

      // 更新金額滑桿範圍
      amountSlider.max = data.maxAmount;
      maxAmountLabel.textContent = `${data.maxAmount} 萬`;

      // 如果當前金額超過最大值，調整為最大值
      if (parseInt(amountInput.value) > data.maxAmount) {
        amountInput.value = data.maxAmount;
        amountSlider.value = data.maxAmount;
      }

      // 更新期限滑桿範圍
      termSlider.max = data.maxTerm;
      maxTermLabel.textContent = `${data.maxTerm} 年`;

      // 如果當前期限超過最大值，調整為最大值
      if (parseInt(termInput.value) > data.maxTerm) {
        termInput.value = data.maxTerm;
        termSlider.value = data.maxTerm;
      }
    }
  });

  // 同步金額輸入框和滑桿（含邊界驗證）
  amountInput.addEventListener("input", function () {
    let value = parseInt(this.value) || 1;
    const max = parseInt(amountSlider.max) || 200;
    // 邊界驗證：確保值在有效範圍內
    if (value < 1) value = 1;
    if (value > max) value = max;
    this.value = value;
    amountSlider.value = value;
  });

  amountSlider.addEventListener("input", function () {
    amountInput.value = this.value;
  });

  // 同步期限輸入框和滑桿（含邊界驗證）
  termInput.addEventListener("input", function () {
    let value = parseInt(this.value) || 1;
    const max = parseInt(termSlider.max) || 30;
    // 邊界驗證：確保值在有效範圍內
    if (value < 1) value = 1;
    if (value > max) value = max;
    this.value = value;
    termSlider.value = value;
  });

  termSlider.addEventListener("input", function () {
    termInput.value = this.value;
  });

  // 計算按鈕點擊事件
  calculateBtn.addEventListener("click", function () {
    calculateLoan();
  });

  // 執行初始計算
  calculateLoan();

  /**
   * 計算貸款
   */
  function calculateLoan() {
    const loanType = loanTypeSelect.value;

    // NaN 檢查：確保輸入值有效，否則使用預設值
    let principal = parseFloat(amountInput.value);
    if (isNaN(principal) || principal <= 0) principal = 100;
    principal = principal * 10000; // 轉換為元

    let annualRate = parseFloat(rateInput.value);
    if (isNaN(annualRate) || annualRate < 0) annualRate = 1.67;
    annualRate = annualRate / 100;

    let years = parseInt(termInput.value);
    if (isNaN(years) || years <= 0) years = 5;

    const months = years * 12;
    const repaymentType = document.querySelector(
      'input[name="repaymentType"]:checked'
    ).value;

    let monthlyPayment, totalPayment, totalInterest;

    if (repaymentType === "equal-principal-interest") {
      // 本息平均攤還法（等額本息）
      // 公式：月付金 = 本金 × 月利率 × (1 + 月利率)^期數 / ((1 + 月利率)^期數 - 1)
      const monthlyRate = annualRate / 12;
      if (monthlyRate === 0) {
        monthlyPayment = principal / months;
      } else {
        monthlyPayment =
          (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
      }
      totalPayment = monthlyPayment * months;
      totalInterest = totalPayment - principal;
    } else {
      // 本金平均攤還法（等額本金）
      // 每期本金相同，利息逐期遞減
      const monthlyPrincipal = principal / months;
      const monthlyRate = annualRate / 12;
      let totalInterestCalc = 0;

      for (let i = 1; i <= months; i++) {
        const remainingPrincipal = principal - monthlyPrincipal * (i - 1);
        const monthlyInterest = remainingPrincipal * monthlyRate;
        totalInterestCalc += monthlyInterest;
      }

      totalInterest = totalInterestCalc;
      totalPayment = principal + totalInterest;
      // 第一期月付金（最高）
      monthlyPayment = monthlyPrincipal + principal * monthlyRate;
    }

    // 更新顯示結果
    updateResults({
      loanType: loanData[loanType].name,
      monthlyPayment: monthlyPayment,
      principal: principal,
      totalInterest: totalInterest,
      totalPayment: totalPayment,
      periods: months,
    });
  }

  /**
   * 更新結果顯示
   */
  function updateResults(data) {
    // 格式化金額
    const formatCurrency = (num) => {
      return "$" + Math.round(num).toLocaleString("zh-TW");
    };

    // 更新各項數值
    document.getElementById("resultLoanType").textContent = data.loanType;
    document.getElementById("monthlyPayment").textContent = formatCurrency(
      data.monthlyPayment
    );
    document.getElementById("principal").textContent = formatCurrency(
      data.principal
    );
    document.getElementById("totalInterest").textContent = formatCurrency(
      data.totalInterest
    );
    document.getElementById("totalPayment").textContent = formatCurrency(
      data.totalPayment
    );
    document.getElementById("totalPeriods").textContent = `${data.periods} 期`;

    // 計算比例
    const principalRatio = (data.principal / data.totalPayment) * 100;
    const interestRatio = (data.totalInterest / data.totalPayment) * 100;

    // 更新比例圖表
    const chartPrincipal = document.getElementById("chartPrincipal");
    const chartInterest = document.getElementById("chartInterest");

    chartPrincipal.style.width = `${principalRatio}%`;
    chartInterest.style.width = `${interestRatio}%`;

    chartPrincipal.querySelector(
      "span"
    ).textContent = `本金 ${principalRatio.toFixed(1)}%`;
    chartInterest.querySelector(
      "span"
    ).textContent = `利息 ${interestRatio.toFixed(1)}%`;

    // 添加動畫效果
    const resultSection = document.getElementById("calculatorResult");
    resultSection.style.animation = "none";
    resultSection.offsetHeight; // 觸發重繪
    resultSection.style.animation = "highlightResult 0.5s ease";
  }
}
