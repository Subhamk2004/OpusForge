const processTemplateString = (template, variables) => {
  if (!template || typeof template !== "string") {
    console.warn("Invalid template provided");
    return "";
  }

  let result = template;

  try {
    // Handle ${JSON.stringify(data)} pattern first
    result = result.replace(
      /\$\{JSON\.stringify\(data\)\}/g,
      JSON.stringify(variables.data || {})
    );

    // Handle other ${variable} patterns with safe JSON serialization
    Object.keys(variables).forEach((key) => {
      const regex = new RegExp(`\\$\\{${key}\\}`, "g");
      const value = variables[key];

      // Handle different data types appropriately
      let replacement;
      if (typeof value === "string") {
        replacement = value;
      } else if (value === null || value === undefined) {
        replacement = "";
      } else {
        replacement = JSON.stringify(value);
      }

      result = result.replace(regex, replacement);
    });

    // Handle *variable* patterns (your original format)
    Object.keys(variables).forEach((key) => {
      const regex = new RegExp(`\\*${key}\\*`, "g");
      const value = variables[key];

      // For asterisk patterns, use string representation
      const replacement =
        value !== null && value !== undefined ? String(value) : "";
      result = result.replace(regex, replacement);
    });
  } catch (error) {
    console.error("Error processing template:", error);
    return template; // Return original template if processing fails
  }

  return result;
};

export default processTemplateString;
