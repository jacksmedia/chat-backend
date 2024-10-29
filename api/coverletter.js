const keywords = {
  technologies: ["Python", "JavaScript", "AWS", "Docker", "Node.js"],
  methodologies: ["ChatGPT", "Agile", "SCRUM", "TDD", "CI/CD"],
  skills: ["problem-solving", "collaborative", "analytical", "communication", "troubleshooting"]
};

// Function to scan text for keywords
function extractKeywords(text) {
  return {
    technologies: keywords.technologies.filter((tech) => text.toLowerCase().includes(tech.toLowerCase())),
    methodologies: keywords.methodologies.filter((method) => text.toLowerCase().includes(method.toLowerCase())),
    skills: keywords.skills.filter((skill) => text.toLowerCase().includes(skill.toLowerCase()))
  };
}

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { job_description, boilerplate } = req.body;

    if (!job_description || !boilerplate) {
      return res.status(400).json({ error: "Job description and boilerplate cover letter are required." });
    }

    // Extract keywords from job description
    const foundKeywords = extractKeywords(job_description);

    // Adjust the boilerplate cover letter with extracted keywords
    let adjustedCoverLetter = boilerplate;

    if (foundKeywords.technologies.length > 0) {
      adjustedCoverLetter += ` I am proficient in ${foundKeywords.technologies.join(", ")}.`;
    }
    if (foundKeywords.methodologies.length > 0) {
      adjustedCoverLetter += ` My experience with ${foundKeywords.methodologies.join(", ")} methodologies has prepared me for this role.`;
    }
    if (foundKeywords.skills.length > 0) {
      adjustedCoverLetter += ` My strengths include ${foundKeywords.skills.join(", ")}.`;
    }

    return res.status(200).json({ cover_letter: adjustedCoverLetter });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
