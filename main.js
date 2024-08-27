// Selecting DOM elements
const steps = document.querySelectorAll(".form-step"),
  stepContainers = document.querySelectorAll(".step-container"),
  mainArea = document.querySelector("main"),
  nextButton = document.querySelector("#nextBtn"),
  backButton = document.querySelector("#backBtn"),
  confirmButton = document.querySelector("#confirmBtn");

let currentStep = 0;

// Function to update the `aria-current` attribute
function updateAria(current) {
  mainArea.setAttribute("aria-current", current);
}

// Function to navigate through steps and containers
function navigateSteps(array) {
  array.forEach((item, index) => {
    item.classList.toggle("active", index === currentStep);
  });
}

// Function to update button visibility based on the current step
function updateButtons() {
  backButton.style.display = currentStep === 0 ? "none" : "inline-block";
  nextButton.style.display = currentStep === 3 ? "none" : "inline-block";
  confirmButton.style.display = currentStep === 3 ? "inline-block" : "none";
}

// Function to display the last step and confirmation message
function displayLastStep() {
  signUpForm.style.display = "none";
  backMsg.classList.add("active");
}

// Function to move to the next step
function nextStep() {
  if (currentStep < 4) currentStep++;
  if (currentStep === 3) displaySummary();
  updateLayout();
}

// Function to move to the previous step
function previousStep() {
  if (currentStep > 0) currentStep--;
  updateLayout();
}

// Function to update the layout (steps, containers, buttons)
function updateLayout() {
  updateAria(currentStep);
  navigateSteps(steps);
  navigateSteps(stepContainers);
  updateButtons();
}

// Initialize layout on page load
window.onload = updateLayout;

// Event listeners for navigation buttons
nextButton.addEventListener("click", nextStep);
backButton.addEventListener("click", previousStep);
confirmButton.addEventListener("click", displayLastStep);

// Plan and service selection
const planCards = document.querySelectorAll("input[name=plan-type]"),
  serviceCards = document.querySelectorAll("input[name=service-card]"),
  planPeriod = document.getElementById("plan-period"),
  summaryContainer = document.querySelector(".summary-container");

// Function to calculate cost based on the plan period
function calculateCost(monthlyCost) {
  return planPeriod.checked ? monthlyCost * 10 : monthlyCost;
}

// Function to display the summary of the selected plan and services
function displaySummary() {
  let totalCost = 0,
    period = planPeriod.checked ? "yr" : "mo",
    fullPeriod = planPeriod.checked ? "Yearly" : "Monthly";

  // Display selected plan and cost
  planCards.forEach(plan => {
    if (plan.checked) {
      const planCost = calculateCost(+plan.getAttribute("data-price"));
      totalCost += planCost;
      summaryContainer.innerHTML = `
        <li>
          <div>
            <h4>${plan.value} (${fullPeriod})</h4>
            <a href="#">Change</a>
          </div>
          <strong>+$${planCost}/${period}</strong>
        </li>`;
    }
  });

  // Display selected services and cost
  serviceCards.forEach(service => {
    if (service.checked) {
      const serviceCost = calculateCost(+service.getAttribute("data-price"));
      totalCost += serviceCost;
      summaryContainer.innerHTML += `
        <li>
          ${service.value} <strong>+$${serviceCost}/${period}</strong>
        </li>`;
    }
  });

  summaryPeriod.innerText = `${fullPeriod.slice(0, -2)}`;
  totalCostElement.innerText = `+$${totalCost}/${period}`;
}
