import { internships } from "../../Data/Internships";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ skills?: string }>;
}

export default async function InternshipDetailsPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { skills } = await searchParams;

  const internship = internships.find((item) => item.id === parseInt(id));

  if (!internship) {
    notFound();
  }

  // Extract and clean user skills passed from the homepage
  const rawSkillsString = skills || "";
  const studentSkills = rawSkillsString
    ? rawSkillsString.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)
    : [];

  // Advanced partial/substring matching logic
  const matchedSkills = internship.skills.filter(reqSkill => {
    const reqLower = reqSkill.toLowerCase().trim();
    return studentSkills.some(studSkill => 
      reqLower.includes(studSkill) || studSkill.includes(reqLower)
    );
  });

  const missingSkills = internship.skills.filter(skill => !matchedSkills.includes(skill));

  // Compute percentage match
  const totalRequiredCount = internship.skills.length;
  const matchCount = matchedSkills.length;
  const fitScore = totalRequiredCount > 0 ? Math.round((matchCount / totalRequiredCount) * 100) : 0;

  // Custom UI colors based on readiness matching the premium look
  let scoreColor = "#b23b3b"; // Crimson Red
  let scoreBg = "rgba(178, 59, 59, 0.05)";
  let feedbackMessage = "Significant skill gaps identified for this tracking pipeline.";
  
  if (fitScore >= 66) {
    scoreColor = "#2e7d32"; // Elegant Forest Green
    scoreBg = "rgba(46, 125, 50, 0.05)";
    feedbackMessage = "Excellent alignment. Core technical prerequisites satisfied.";
  } else if (fitScore >= 25) {
    scoreColor = "#b58900"; // Muted Amber
    scoreBg = "rgba(181, 137, 0, 0.05)";
    feedbackMessage = "Partial compatibility. Foundational stack present; review missing tools.";
  }

  return (
    <div style={{
      backgroundColor: "#1c262f", // Matches the same external canvas backdrop
      padding: "3rem 1.5rem",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Times New Roman', Times, serif" // Cohesive serif style
    }}>
      
      {/* Floating UI Window Card */}
      <main style={{ 
        width: "100%",
        maxWidth: "700px",
        background: "linear-gradient(to bottom, #ffffff 0%, #f4f7f6 40%, #c9d6df 100%)", // Matches homepage gradient
        borderRadius: "24px",
        boxShadow: "0px 25px 70px rgba(0, 0, 0, 0.3)",
        padding: "3.5rem 3rem",
        color: "#2c3e50",
        boxSizing: "border-box"
      }}>
        
        {/* Navigation row back to main dashboard */}
        <div style={{ marginBottom: "3rem" }}>
          <Link 
            href={`/?skills=${encodeURIComponent(rawSkillsString)}`} 
            style={{ 
              fontFamily: "sans-serif",
              color: "#5a6b7c", 
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: "500",
              borderBottom: "1px solid rgba(90, 107, 124, 0.3)",
              paddingBottom: "2px"
            }}
          >
            ← Return to Directory
          </Link>
        </div>

        {/* Company & Role Details Block */}
        <header style={{ marginBottom: "2.5rem" }}>
          <span style={{ fontFamily: "sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "#7f8c8d", fontWeight: "600" }}>
            {internship.company}
          </span>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "400", margin: "0.3rem 0 1rem 0", color: "#111827", lineHeight: "1.2" }}>
            {internship.title}
          </h1>
          
          <div style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "#5a6b7c", display: "flex", gap: "1.5rem" }}>
            <span>📍 {internship.location}</span>
            <span>⏳ {internship.deadline}</span>
          </div>
        </header>

        {/* --- CUSTOM FIT SCORE ANALYSIS BOARD --- */}
        <section style={{ 
          backgroundColor: "rgba(255, 255, 255, 0.6)", 
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.8)",
          padding: "2rem", 
          borderRadius: "16px",
          marginBottom: "2.5rem",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.02)"
        }}>
          <h2 style={{ fontFamily: "sans-serif", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 1.25rem 0", color: "#34495e" }}>
            Compatibility Vector
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.25rem" }}>
            <div style={{ 
              backgroundColor: scoreBg, 
              color: scoreColor, 
              fontSize: "2.5rem", 
              fontWeight: "bold", 
              padding: "0.5rem 1.5rem", 
              borderRadius: "12px",
              border: `1px solid ${scoreColor}20`,
              fontFamily: "sans-serif"
            }}>
              {fitScore}%
            </div>
            <div style={{ fontSize: "1.05rem", color: "#111827", fontStyle: "italic", lineHeight: "1.4" }}>
              "{feedbackMessage}"
            </div>
          </div>

          {/* Condition-based matching loops */}
          {matchedSkills.length > 0 && (
            <div style={{ fontSize: "0.85rem", marginTop: "1rem", fontFamily: "sans-serif" }}>
              <span style={{ color: "#2e7d32", fontWeight: "600", display: "block", marginBottom: "0.4rem" }}>✓ Verified Matches:</span>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {matchedSkills.map((s, i) => (
                  <span key={i} style={{ backgroundColor: "rgba(46,125,50,0.06)", color: "#2e7d32", padding: "0.3rem 0.7rem", borderRadius: "20px", border: "1px solid rgba(46,125,50,0.1)" }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {missingSkills.length > 0 && (
            <div style={{ fontSize: "0.85rem", marginTop: "1.25rem", fontFamily: "sans-serif" }}>
              <span style={{ color: "#b23b3b", fontWeight: "600", display: "block", marginBottom: "0.4rem" }}>⚡ Recommended Stack Additions:</span>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {missingSkills.map((s, i) => (
                  <span key={i} style={{ backgroundColor: "rgba(178,59,59,0.06)", color: "#b23b3b", padding: "0.3rem 0.7rem", borderRadius: "20px", border: "1px solid rgba(178,59,59,0.1)" }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Minimal Submit Action Button Link */}
        <div style={{ textAlign: "center" }}>
          <a 
            href={internship.applicationLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              fontFamily: "sans-serif",
              display: "block", 
              backgroundColor: "#111827", 
              color: "#ffffff", 
              padding: "1rem", 
              borderRadius: "30px", // Pill button style matches reference layout
              textDecoration: "none", 
              textAlign: "center", 
              fontWeight: "600",
              fontSize: "0.95rem",
              letterSpacing: "0.5px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              transition: "opacity 0.2s ease"
            }}
          >
            Access Gateway Portal ↗
          </a>
        </div>

      </main>
    </div>
  );
}
