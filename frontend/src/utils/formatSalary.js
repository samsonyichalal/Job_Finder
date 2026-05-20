export default function formatSalary(amount, currency = "USD") {
  if (amount === undefined || amount === null || isNaN(amount)) return "N/A";
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0
  });
  return formatter.format(amount);
}
