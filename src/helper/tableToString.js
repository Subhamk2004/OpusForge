
// More structured version that organizes by sections
export const convertTableToStructuredString = (table) => {
    console.log('entered conversion section');
    
  if (!table || !Array.isArray(table) || table.length === 0) {
    return "No resume data available";
  }

  const sections = {};
  let currentSection = "PROFILE";
  
  // Skip the header row
  for (let i = 1; i < table.length; i++) {
    const [lineNumber, content] = table[i];
    
    // Check if this is a section header
    if (content === "PROFILE" || 
        content === "Education" || 
        content === "Work Experience" || 
        content === "Projects" || 
        content === "Technical Skills" || 
        content === "Positions of Responsibility" || 
        content === "Achievements") {
      
      currentSection = content;
      if (!sections[currentSection]) {
        sections[currentSection] = [];
      }
    } else {
      // Add content to current section
      if (!sections[currentSection]) {
        sections[currentSection] = [];
      }
      sections[currentSection].push(content);
    }
  }
  
  // Build the final string
  let resumeString = "RESUME DATA:\n\n";
  
  Object.entries(sections).forEach(([sectionName, sectionContent]) => {
    resumeString += `${sectionName}:\n`;
    sectionContent.forEach(line => {
      resumeString += `${line}\n`;
    });
    resumeString += `\n`;
  });
  
  return resumeString.trim();
};

