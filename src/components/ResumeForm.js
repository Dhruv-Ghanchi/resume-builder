import React from "react";
import { ReactSortable } from "react-sortablejs";

function ResumeForm({
  formData,
  setFormData,
  handleChange,
  addEducation,
  removeEducation,
  addExperience,
  removeExperience,
}) {
  return (
    <div className="form">
      <h2>Enter Your Details</h2>

      {/* Basic Info */}
      <div className="form-group">
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
      </div>

      {/* Education */}
      <h3>Education</h3>
      <ReactSortable
        list={formData.education}
        setList={(newList) => setFormData({ ...formData, education: newList })}
      >
        {formData.education.map((edu, index) => (
          <div key={index} className="dynamic-section">
            <div className="dynamic-fields">
              <div className="form-group">
                <label>Degree / Course</label>
                <input
                  name="degree"
                  placeholder="Degree / Course"
                  value={edu.degree}
                  onChange={(e) => handleChange(e, "education", index)}
                />
              </div>

              <div className="form-group">
                <label>Institution</label>
                <input
                  name="institution"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleChange(e, "education", index)}
                />
              </div>

              <div className="form-group">
                <label>Year</label>
                <input
                  name="year"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => handleChange(e, "education", index)}
                />
              </div>
            </div>

            <button className="delete-btn" onClick={() => removeEducation(index)}>
              🗑
            </button>
          </div>
        ))}
      </ReactSortable>
      <button className="add-btn" onClick={addEducation}>
        + Add Education
      </button>

      {/* Experience */}
      <h3>Experience</h3>
      <ReactSortable
        list={formData.experience}
        setList={(newList) => setFormData({ ...formData, experience: newList })}
      >
        {formData.experience.map((exp, index) => (
          <div key={index} className="dynamic-section">
            <div className="dynamic-fields">
              <div className="form-group">
                <label>Job Title</label>
                <input
                  name="position"
                  placeholder="Job Title"
                  value={exp.position}
                  onChange={(e) => handleChange(e, "experience", index)}
                />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input
                  name="company"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleChange(e, "experience", index)}
                />
              </div>

              <div className="form-group">
                <label>Duration</label>
                <input
                  name="duration"
                  placeholder="Duration"
                  value={exp.duration}
                  onChange={(e) => handleChange(e, "experience", index)}
                />
              </div>
            </div>

            <button className="delete-btn" onClick={() => removeExperience(index)}>
              🗑
            </button>
          </div>
        ))}
      </ReactSortable>
      <button className="add-btn" onClick={addExperience}>
        + Add Experience
      </button>

      {/* Skills */}
      <h3>Skills</h3>
      <div className="form-group">
        <label>Skills (comma separated)</label>
        <textarea
          name="skills"
          placeholder="Separate skills with commas"
          value={formData.skills.join(", ")}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default ResumeForm;
