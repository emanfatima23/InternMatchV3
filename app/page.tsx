"use client";

import { useState } from "react";
import Link from "next/link";
import { internships } from "../data/internships";

export default function Home() {
  // Converted to state so new user-entered tokens can be pushed dynamically
  const [availableSkills, setAvailableSkills] = useState<string[]>([
    "HTML", "CSS", "JavaScript", "React", "Node.js", 
    "Python", "MySQL", "QA", "Data Analytics", 
    "Ruby on Rails", "Unity 3D", "C#", "UI/UX Design"
  ]);

  const [selectedSkills, setSelectedSkills] = useState<string[]>(["HTML", "CSS", "JavaScript"]);
  const [customSkill, setCustomSkill] = useState<string>("");

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSkill = customSkill.trim();
    
    if (!cleanSkill) return;

    // Prevent adding visual duplicates case-insensitively
    const exactMatch = availableSkills.find(
      (s) => s.toLowerCase() === cleanSkill.toLowerCase()
    );

    if (!exactMatch) {
      setAvailableSkills([...availableSkills, cleanSkill]);
      setSelectedSkills([...selectedSkills, cleanSkill]);
    } else if (!selectedSkills.includes(exactMatch)) {
      // If it exists in the list but wasn't active, toggle it on
      setSelectedSkills([...selectedSkills, exactMatch]);
    }

    setCustomSkill(""); // Clear the input field
  };

  const skillsQueryString = selectedSkills.join(", ");

  return (
    <div style={{
      backgroundColor: "#1c262f", 
      padding: "3rem 1.5rem",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Times New Roman', Times, serif" 
    }}>
      
      {/* Main floating card window */}
      <main style={{ 
        width: "100%",
        maxWidth: "1100px",
        background: "linear-gradient(to bottom, #ffffff 0%, #f4f7f6 40%, #c9d6df 100%)", 
        borderRadius: "24px",
        boxShadow: "0px 25px 70px rgba(0, 0, 0, 0.3)",
        padding: "3.5rem 3rem",
        color: "#2c3e50",
        boxSizing: "border-box"
      }}>
        
        {/* Minimal Navigation Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4rem" }}>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold", letterSpacing: "1px", color: "#111", fontFamily: "sans-serif" }}>
            🇵🇰 
          </span>
          <nav style={{ display: "flex", gap: "1.5rem" }}>
            {["Internships", "Skill Analyzer", "Corporate Partners"].map((item, idx) => (
              <span key={idx} style={{ fontFamily: "sans-serif", fontSize: "0.8rem", letterSpacing: "0.05em", color: "#5a6b7c", cursor: "pointer", fontWeight: "500" }}>
                {item}
              </span>
            ))}
          </nav>
          <span style={{ fontFamily: "sans-serif", fontSize: "0.85rem", opacity: 0.6 }}>v1.0.0</span>
        </div>

        {/* Project Header */}
        <header style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", color: "#7f8c8d", marginBottom: "1rem", fontWeight: "600" }}>
            Find Internship that fits you.
          </div>
          <h1 style={{ 
            fontSize: "3.5rem", 
            fontWeight: "400", 
            margin: "0 0 1rem 0", 
            color: "#111827",
            letterSpacing: "-0.5px",
            lineHeight: "1.1"
          }}>
            Intern Match
          </h1>
          <p style={{ 
            fontFamily: "sans-serif", 
            maxWidth: "540px", 
            margin: "0 auto", 
            color: "#627282", 
            fontSize: "0.95rem", 
            lineHeight: "1.6",
            fontWeight: "300"
          }}>
            Select your technologies below to instantly run a compatibility assessment against active internship prerequisites from Pakistan's top tech firms.
          </p>
        </header>

        {/* Interactive Skill Selector Component Container */}
        <section style={{ maxWidth: "700px", margin: "0 auto 4.5rem auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "sans-serif", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1.25rem", color: "#34495e", fontWeight: "600" }}>
            Toggle Your Current Skill Set
          </h2>

          {/* Minimal Add Skill Submission Bar */}
          <form 
            onSubmit={handleAddCustomSkill} 
            style={{ 
              display: "flex", 
              justifyContent: "center", 
              gap: "0.5rem", 
              maxWidth: "400px", 
              margin: "0 auto 2rem auto" 
            }}
          >
            <input 
              type="text"
              placeholder="Add custom tech skill..."
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              style={{
                fontFamily: "sans-serif",
                flex: 1,
                padding: "0.5rem 1rem",
                borderRadius: "30px",
                border: "1px solid rgba(0,0,0,0.12)",
                backgroundColor: "rgba(255,255,255,0.6)",
                fontSize: "0.85rem",
                color: "#2c3e50",
                outline: "none"
              }}
            />
            <button
              type="submit"
              style={{
                fontFamily: "sans-serif",
                backgroundColor: "#111",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1.25rem",
                borderRadius: "30px",
                fontSize: "0.85rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "opacity 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              + Add
            </button>
          </form>
          
          {/* Skill Pills Matrix Grid */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}>
            {availableSkills.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  style={{
                    fontFamily: "sans-serif",
                    padding: "0.45rem 1.1rem",
                    borderRadius: "30px", 
                    border: isSelected ? "1px solid #111" : "1px solid rgba(0,0,0,0.08)",
                    backgroundColor: isSelected ? "#111" : "rgba(0,0,0,0.03)",
                    color: isSelected ? "#fff" : "#555",
                    fontSize: "0.8rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                >
                  {skill} {isSelected ? "✓" : ""}
                </button>
              );
            })}
          </div>
        </section>

        {/* Horizontal Card Grid Layout */}
        <section>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "2rem",
            alignItems: "stretch"
          }}>
            {internships.map((job) => (
              <div 
                key={job.id} 
                style={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.4)", 
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  padding: "2rem", 
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.02)"
                }}
              >
                <div>
                  <span style={{ 
                    fontFamily: "sans-serif",
                    fontSize: "0.7rem", 
                    textTransform: "uppercase", 
                    color: "#7f8c8d",
                    fontWeight: "600",
                    letterSpacing: "1px"
                  }}>
                    {job.company}
                  </span>
                  <h3 style={{ 
                    margin: "0.5rem 0 1.5rem 0", 
                    fontSize: "1.35rem", 
                    fontWeight: "400",
                    color: "#2c3e50",
                    lineHeight: "1.3"
                  }}>
                    {job.title}
                  </h3>
                </div>
                
                <div>
                  <Link 
                    href={`/internship/${job.id}?skills=${encodeURIComponent(skillsQueryString)}`}
                    style={{
                      fontFamily: "sans-serif",
                      display: "inline-block",
                      backgroundColor: "transparent",
                      borderBottom: "1px solid #111", 
                      color: "#111",
                      padding: "0.25rem 0",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      fontWeight: "600"
                    }}
                  >
                    Check Fit Score →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        
      </main>
    </div>
  );
}