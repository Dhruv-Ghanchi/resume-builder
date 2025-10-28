import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import Header from "./components/Header";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: [{ degree: "", institution: "", year: "" }],
    experience: [{ position: "", company: "", duration: "" }],
    skills: [],
  });

  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [anonymize, setAnonymize] = useState(false);

  // Update fields
  const handleChange = (e, section, index) => {
    const { name, value } = e.target;

    if (section === "education" || section === "experience") {
      const list = [...formData[section]];
      list[index][name] = value;
      setFormData({ ...formData, [section]: list });
    } else if (name === "skills") {
      setFormData({ ...formData, skills: value.split(",").map(s => s.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add / Remove Education
  const addEducation = () =>
    setFormData({
      ...formData,
      education: [...formData.education, { degree: "", institution: "", year: "" }],
    });
  const removeEducation = (index) => {
    const newEdu = [...formData.education];
    newEdu.splice(index, 1);
    setFormData({ ...formData, education: newEdu });
  };

  // Add / Remove Experience
  const addExperience = () =>
    setFormData({
      ...formData,
      experience: [...formData.experience, { position: "", company: "", duration: "" }],
    });
  const removeExperience = (index) => {
    const newExp = [...formData.experience];
    newExp.splice(index, 1);
    setFormData({ ...formData, experience: newExp });
  };

  // PDF download
  const handleDownload = () => {
    const input = document.getElementById("resume-preview");

    // Add a temporary class to ensure the preview uses PDF-friendly
    // colors (solid dark background + white text) when html2canvas captures it.
    // We remove the class after the capture so the live preview is unchanged.
    input.classList.add("pdf-download");

    // Allow the browser a single frame to apply the CSS changes before capture.
    setTimeout(() => {
      html2canvas(input, { scale: 2, useCORS: true, allowTaint: true }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("resume.pdf");
      }).catch((err) => {
        console.error('Error creating PDF', err);
      }).finally(() => {
        input.classList.remove("pdf-download");
      });
    }, 80);
  };

  return (
    <div className="container">
      <Header
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        anonymize={anonymize}
        setAnonymize={setAnonymize}
      />

      <main className="main">
        <section className="left-column">
          <ResumeForm
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            addEducation={addEducation}
            removeEducation={removeEducation}
            addExperience={addExperience}
            removeExperience={removeExperience}
          />
        </section>

        <aside className="right-column preview-wrap">
          <ResumePreview formData={formData} selectedTemplate={selectedTemplate} anonymize={anonymize} previewId="resume-preview" />

          <div className="actions-right">
            <button className="download-btn" onClick={handleDownload}>
              Download PDF
            </button>
          </div>
        </aside>
      </main>
      
    </div>
  );
}

export default App;
