import React from "react";

function ResumePreview({ formData, selectedTemplate, anonymize = false, previewId }) {
  const { name, email, phone, education = [], experience = [], skills = [] } = formData;

  // Show fields directly in the preview. We always render the
  // 'Personal Details' and 'Skills' headings so the preview layout
  // matches the form even when those fields are empty.
  const displayName = name || "";
  const displayEmail = email || "";
  const displayPhone = phone || "";

  if (selectedTemplate === "classic") {
    return (
      <div className="resume-preview classic-template">
        <div className="preview-card" id={previewId}>
          <h2>{displayName}</h2>

          <h3 className="section-heading">Personal details</h3>
          <p className="meta">{anonymize ? <span className="muted">Hidden</span> : (displayEmail || <span className="muted">Email not provided</span>)} {(!anonymize && displayEmail && displayPhone) ? ' | ' : ''} {anonymize ? null : (displayPhone || <span className="muted">Phone not provided</span>)}</p>

          <hr />

          {education.length > 0 && (
            <>
              <h3>Education</h3>
              <ul>
                {education.map((edu, i) => {
                  if (!edu || (!edu.degree && !edu.institution && !edu.year)) return null;
                  return (
                    <li key={i}><strong>{edu.degree || ''}</strong>{edu.degree && (edu.institution || edu.year) ? ', ' : ''}{edu.institution || ''}{(edu.institution || edu.degree) && edu.year ? ' (' + edu.year + ')' : edu.year ? '(' + edu.year + ')' : ''}</li>
                  );
                })}
              </ul>
            </>
          )}

          {experience.length > 0 && (
            <>
              <h3>Experience</h3>
              <ul>
                {experience.map((exp, i) => {
                  if (!exp || (!exp.position && !exp.company && !exp.duration)) return null;
                  return (
                    <li key={i}><strong>{exp.position || ''}</strong>{exp.position && (exp.company || exp.duration) ? ', ' : ''}{exp.company || ''}{(exp.company || exp.position) && exp.duration ? ' (' + exp.duration + ')' : exp.duration ? '(' + exp.duration + ')' : ''}</li>
                  );
                })}
              </ul>
            </>
          )}

          <h3 className="section-heading">Skills</h3>
          {skills && skills.length > 0 ? (
            <div className="skill-chips">{skills.map((s, i) => (<span key={i} className="chip">{s}</span>))}</div>
          ) : (
            <p className="muted">No skills added</p>
          )}
        </div>
      </div>
    );
  }

  // Modern Template
  return (
    <div className="resume-preview modern-template">
      <div className="preview-card" id={previewId}>
        <h2>{displayName}</h2>
        <h3 className="section-heading">Personal details</h3>
        <p className="meta">{anonymize ? <span className="muted">Hidden</span> : (displayEmail || <span className="muted">Email not provided</span>)} {(!anonymize && displayEmail && displayPhone) ? ' | ' : ''} {anonymize ? null : (displayPhone || <span className="muted">Phone not provided</span>)}</p>

        {education.length > 0 && (
          <div className="section">
            <h3>🎓 Education</h3>
            {education.map((edu, i) => edu && (edu.degree || edu.institution || edu.year) ? (
              <p key={i}><strong>{edu.degree || ''}</strong> – {edu.institution || ''}{(edu.institution || edu.degree) && edu.year ? ' (' + edu.year + ')' : edu.year ? '(' + edu.year + ')' : ''}</p>
            ) : null)}
          </div>
        )}

        {experience.length > 0 && (
          <div className="section">
            <h3>💼 Experience</h3>
            {experience.map((exp, i) => exp && (exp.position || exp.company || exp.duration) ? (
              <p key={i}><strong>{exp.position || ''}</strong> – {exp.company || ''}{(exp.company || exp.position) && exp.duration ? ' (' + exp.duration + ')' : exp.duration ? '(' + exp.duration + ')' : ''}</p>
            ) : null)}
          </div>
        )}

        <div className="section">
          <h3>⚙️ Skills</h3>
          {skills && skills.length > 0 ? (
            <div className="skill-chips">{skills.map((s, i) => (<span key={i} className="chip">{s}</span>))}</div>
          ) : (
            <p className="muted">No skills added</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
