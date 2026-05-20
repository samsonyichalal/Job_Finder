export default function getMatchScoreLabel(score) {
  if (score >= 75) return "High";
  if (score >= 50) return "Medium";
  return "Low";
}
