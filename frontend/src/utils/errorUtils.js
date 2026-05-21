export function getApiErrorInfo(error) {
  const status = error?.response?.status;
  const detail = error?.response?.data?.detail;
  const message = typeof detail === "string"
    ? detail
    : error?.message || "Something went wrong.";

  const lowerMessage = String(message).toLowerCase();

  if (status === 401) {
    return {
      title: "Session expired",
      message: "Please sign in again to continue.",
      actionLabel: "Sign in",
      tone: "warning",
    };
  }

  if (status === 403) {
    return {
      title: "Access denied",
      message: message || "You do not have permission to perform this action.",
      actionLabel: "Go back",
      tone: "warning",
    };
  }

  if (status === 404 && lowerMessage.includes("profile")) {
    return {
      title: "Profile not set up",
      message: "Complete your onboarding profile to unlock AI analysis, job matches, and career recommendations.",
      actionLabel: "Complete profile",
      tone: "info",
    };
  }

  if (status === 404) {
    return {
      title: "Nothing found",
      message,
      actionLabel: "Refresh",
      tone: "info",
    };
  }

  if (status === 429 || lowerMessage.includes("quota") || lowerMessage.includes("rate limit")) {
    return {
      title: "AI limit reached",
      message: "The AI provider is temporarily rate-limited. Try again in a moment or use the saved database-backed insights.",
      actionLabel: "Try again",
      tone: "warning",
    };
  }

  if (status >= 500) {
    return {
      title: "Server error",
      message: "The backend had a problem processing your request. Please try again shortly.",
      actionLabel: "Retry",
      tone: "danger",
    };
  }

  if (lowerMessage.includes("network") || lowerMessage.includes("failed to fetch") || error?.code === "ERR_NETWORK") {
    return {
      title: "Connection issue",
      message: "We could not reach the backend. Check your connection and make sure the API server is running.",
      actionLabel: "Retry",
      tone: "danger",
    };
  }

  if (lowerMessage.includes("profile") || lowerMessage.includes("onboarding")) {
    return {
      title: "Profile incomplete",
      message: message,
      actionLabel: "Complete profile",
      tone: "info",
    };
  }

  return {
    title: "Request failed",
    message,
    actionLabel: "Retry",
    tone: "danger",
  };
}

export function isProfileIncompleteError(error) {
  const info = getApiErrorInfo(error);
  return info.title === "Profile not set up" || info.title === "Profile incomplete";
}
