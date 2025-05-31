const processTemplateString = (template, variables) => {
  if (!template || typeof template !== "string") {
    console.warn("Invalid template provided");
    return "";
  }

  let result = template;

  try {
    result = result.replace(
      /\$\{JSON\.stringify\(data\)\}/g,
      JSON.stringify(variables.data || {})
    );
  } catch (error) {
    console.error("Error processing template:", error);
    return template;
  }

  return result;
};

export default processTemplateString;
