export const getErrorMessage = (error) => error?.message || "Invalid input";

export const validateIncome = (value) => {
  if (value === undefined || value === null || value === "") return "Income is required";
  if (Number(value) <= 0) return "Income must be > 0";
  return true;
};

export const validateLoanAmount = (value) => {
  if (value === undefined || value === null || value === "") return "Loan amount is required";
  if (Number(value) <= 0) return "Loan amount must be > 0";
  if (Number(value) > 10000000) return "Loan amount exceeds maximum limit"; 
  return true;
};

export const validateAge = (value) => {
  if (!value) return "Age is required";
  if (Number(value) < 18 || Number(value) > 75) return "Age must be between 18 and 75";
  return true;
};
