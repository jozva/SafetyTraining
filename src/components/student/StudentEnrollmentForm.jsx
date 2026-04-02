import { useState } from "react";
import "./StudentEnrollmentForm.css";

const SECTIONS = [
  "Applicant Information",
  "Course & Qualification",
  "Employment Details",
  "USI & Declaration",
  "Supporting Documents",
];

const initialData = {
  // Section 1
  title: "Mr",
  surname: "",
  givenName: "",
  middleName: "",
  preferredName: "",
  dob: "",
  gender: "Male",
  homePhone: "",
  workPhone: "",
  mobilePhone: "",
  email: "",
  residentialAddress: "",
  suburb: "",
  state: "NSW",
  postcode: "",
  postalSame: true,
  emergencyName: "",
  emergencyRelationship: "",
  emergencyContact: "",
  emergencyPermission: "No",

  // Section 2
  courseId: "",
  qualificationLevel: "",
  studyReason: "",

  // Section 3
  employmentStatus: "",
  employerName: "",
  employerPhone: "",
  occupation: "",

  // Section 4
  usiNumber: "",
  declaration: false,

  // Section 5
  idDocument: null,
};

const STATES = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

export default function StudentEnrollmentForm() {
  const [section, setSection] = useState(1);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field, value) => setData((d) => ({ ...d, [field]: value }));

  const validateSection = () => {
    const e = {};
    if (section === 1) {
      if (!data.surname.trim()) e.surname = "Required";
      if (!data.givenName.trim()) e.givenName = "Required";
      if (!data.dob) e.dob = "Required";
      if (!data.mobilePhone.trim()) e.mobilePhone = "Required";
      if (!data.email.trim()) e.email = "Required";
      if (!data.residentialAddress.trim()) e.residentialAddress = "Required";
      if (!data.suburb.trim()) e.suburb = "Required";
      if (!data.postcode.trim()) e.postcode = "Required";
    }
    if (section === 2) {
      if (!data.courseId) e.courseId = "Required";
    }
    if (section === 4) {
      if (!data.usiNumber.trim()) e.usiNumber = "Required";
      if (!data.declaration) e.declaration = "You must accept the declaration";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateSection()) return;
    if (section < SECTIONS.length) setSection((s) => s + 1);
    else setSubmitted(true);
  };
  const prev = () => section > 1 && setSection((s) => s - 1);

  const progress = Math.round((section / SECTIONS.length) * 100);

  if (submitted) {
    return (
      <div className="ef-wrapper">
        <div className="ef-success">
          <div className="ef-success__icon">🎉</div>
          <h2>Enrollment Submitted!</h2>
          <p>Your enrollment form has been submitted for review. You'll receive a confirmation email shortly.</p>
          <button className="ef-btn ef-btn--primary" onClick={() => { setSubmitted(false); setSection(1); setData(initialData); }}>
            Start New Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ef-wrapper">
      {/* Header Card */}
      <div className="ef-header-card">
        <div className="ef-header-top">
          <div>
            <h1 className="ef-form-title">Student Enrollment Form</h1>
            <p className="ef-form-sub">Complete all sections to finalize your enrollment</p>
          </div>
          <span className="ef-approved-badge">✓ Approved</span>
        </div>

        {/* Progress */}
        <div className="ef-progress-info">
          <span>Section {section} of {SECTIONS.length}</span>
          <span className="ef-progress-pct">{progress}% Complete</span>
        </div>
        <div className="ef-progress-bar">
          <div className="ef-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Step dots */}
        <div className="ef-steps">
          {SECTIONS.map((_, i) => (
            <button
              key={i}
              className={`ef-step ${section === i + 1 ? "ef-step--active" : ""} ${section > i + 1 ? "ef-step--done" : ""}`}
              onClick={() => setSection(i + 1)}
            >
              {section > i + 1 ? "✓" : i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Section Body */}
      <div className="ef-section-label">
        SECTION {section} — {SECTIONS[section - 1].toUpperCase()}
      </div>

      <div className="ef-card">
        {section === 1 && <Section1 data={data} set={set} errors={errors} />}
        {section === 2 && <Section2 data={data} set={set} errors={errors} />}
        {section === 3 && <Section3 data={data} set={set} errors={errors} />}
        {section === 4 && <Section4 data={data} set={set} errors={errors} />}
        {section === 5 && <Section5 data={data} set={set} errors={errors} />}
      </div>

      {/* Navigation */}
      <div className="ef-nav">
        <button className="ef-btn ef-btn--outline" onClick={prev} disabled={section === 1}>
          ← Back
        </button>
        <button className="ef-btn ef-btn--primary" onClick={next}>
          {section === SECTIONS.length ? "Submit" : "Next →"}
        </button>
      </div>
    </div>
  );
}

/* ===== SECTION 1 ===== */
function Section1({ data, set, errors }) {
  return (
    <>
      <div className="ef-subsection">
        <h3 className="ef-subsection__title">APPLICANT DETAILS</h3>
        <p className="ef-subsection__desc">Please complete <strong>full name</strong> and <strong>date of birth</strong> as listed on your ID documents.</p>

        <div className="ef-field-group">
          <label className="ef-label">Title (please tick) <span className="ef-req">*</span></label>
          <div className="ef-radio-row">
            {["Mr", "Mrs", "Miss", "Ms", "Dr", "Other"].map((t) => (
              <label key={t} className="ef-radio">
                <input type="radio" name="title" value={t} checked={data.title === t} onChange={() => set("title", t)} />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="ef-row-3">
          <div className="ef-field">
            <label className="ef-label">Surname <span className="ef-req">*</span></label>
            <input className={`ef-input ${errors.surname ? "ef-input--error" : ""}`} value={data.surname} onChange={e => set("surname", e.target.value)} />
            {errors.surname && <span className="ef-error">{errors.surname}</span>}
          </div>
          <div className="ef-field">
            <label className="ef-label">Given name <span className="ef-req">*</span></label>
            <input className={`ef-input ${errors.givenName ? "ef-input--error" : ""}`} value={data.givenName} onChange={e => set("givenName", e.target.value)} />
            {errors.givenName && <span className="ef-error">{errors.givenName}</span>}
          </div>
          <div className="ef-field">
            <label className="ef-label">Middle name</label>
            <input className="ef-input" value={data.middleName} onChange={e => set("middleName", e.target.value)} />
          </div>
        </div>

        <div className="ef-row-3">
          <div className="ef-field">
            <label className="ef-label">Preferred name <span className="ef-hint">(if different to above)</span></label>
            <input className="ef-input" value={data.preferredName} onChange={e => set("preferredName", e.target.value)} />
          </div>
          <div className="ef-field">
            <label className="ef-label">Date of Birth <span className="ef-req">*</span></label>
            <input type="date" className={`ef-input ${errors.dob ? "ef-input--error" : ""}`} value={data.dob} onChange={e => set("dob", e.target.value)} />
            {errors.dob && <span className="ef-error">{errors.dob}</span>}
          </div>
          <div className="ef-field">
            <label className="ef-label">Gender (please tick) <span className="ef-req">*</span></label>
            <div className="ef-radio-row">
              {["Male", "Female"].map((g) => (
                <label key={g} className="ef-radio">
                  <input type="radio" name="gender" value={g} checked={data.gender === g} onChange={() => set("gender", g)} />
                  <span>{g}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="ef-row-2">
          <div className="ef-field">
            <label className="ef-label">Home Phone</label>
            <input className="ef-input" placeholder="(optional)" value={data.homePhone} onChange={e => set("homePhone", e.target.value)} />
          </div>
          <div className="ef-field">
            <label className="ef-label">Work Phone</label>
            <input className="ef-input" placeholder="(optional)" value={data.workPhone} onChange={e => set("workPhone", e.target.value)} />
          </div>
        </div>

        <div className="ef-row-2">
          <div className="ef-field">
            <label className="ef-label">Mobile Phone <span className="ef-req">*</span></label>
            <input className={`ef-input ${errors.mobilePhone ? "ef-input--error" : ""}`} value={data.mobilePhone} onChange={e => set("mobilePhone", e.target.value)} />
            {errors.mobilePhone && <span className="ef-error">{errors.mobilePhone}</span>}
          </div>
          <div className="ef-field">
            <label className="ef-label">Email <span className="ef-req">*</span></label>
            <input type="email" className={`ef-input ${errors.email ? "ef-input--error" : ""}`} value={data.email} onChange={e => set("email", e.target.value)} />
            {errors.email && <span className="ef-error">{errors.email}</span>}
          </div>
        </div>

        <div className="ef-field">
          <label className="ef-label">Residential Address <span className="ef-req">*</span></label>
          <input className={`ef-input ${errors.residentialAddress ? "ef-input--error" : ""}`} value={data.residentialAddress} onChange={e => set("residentialAddress", e.target.value)} />
          {errors.residentialAddress && <span className="ef-error">{errors.residentialAddress}</span>}
        </div>

        <div className="ef-row-3">
          <div className="ef-field">
            <label className="ef-label">Suburb <span className="ef-req">*</span></label>
            <input className={`ef-input ${errors.suburb ? "ef-input--error" : ""}`} value={data.suburb} onChange={e => set("suburb", e.target.value)} />
            {errors.suburb && <span className="ef-error">{errors.suburb}</span>}
          </div>
          <div className="ef-field">
            <label className="ef-label">State <span className="ef-req">*</span></label>
            <select className="ef-input" value={data.state} onChange={e => set("state", e.target.value)}>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="ef-field">
            <label className="ef-label">Postcode <span className="ef-req">*</span></label>
            <input className={`ef-input ${errors.postcode ? "ef-input--error" : ""}`} value={data.postcode} onChange={e => set("postcode", e.target.value)} />
            {errors.postcode && <span className="ef-error">{errors.postcode}</span>}
          </div>
        </div>

        <label className="ef-checkbox">
          <input type="checkbox" checked={!data.postalSame} onChange={e => set("postalSame", !e.target.checked)} />
          <span>Postal Address is different from Residential Address</span>
        </label>
      </div>

      <div className="ef-subsection">
        <h3 className="ef-subsection__title">EMERGENCY CONTACT</h3>
        <div className="ef-row-3">
          <div className="ef-field">
            <label className="ef-label">Full Name</label>
            <input className="ef-input" value={data.emergencyName} onChange={e => set("emergencyName", e.target.value)} />
          </div>
          <div className="ef-field">
            <label className="ef-label">Relationship</label>
            <input className="ef-input" value={data.emergencyRelationship} onChange={e => set("emergencyRelationship", e.target.value)} />
          </div>
          <div className="ef-field">
            <label className="ef-label">Contact Number</label>
            <input className="ef-input" value={data.emergencyContact} onChange={e => set("emergencyContact", e.target.value)} />
          </div>
        </div>

        <div className="ef-field">
          <label className="ef-label">Emergency permission <span className="ef-req">*</span></label>
          <p className="ef-subsection__desc" style={{marginBottom:"8px"}}>In the event of an emergency do you give STA permission to organise emergency transport and treatment and do you agree to pay all costs related to the emergency?</p>
          <p className="ef-subsection__desc" style={{marginBottom:"8px",fontSize:"0.78rem"}}>Emergency contact details (name, relationship, number) are optional when permission is No.</p>
          <div className="ef-radio-row">
            {["Yes", "No"].map((v) => (
              <label key={v} className="ef-radio">
                <input type="radio" name="emergencyPermission" value={v} checked={data.emergencyPermission === v} onChange={() => set("emergencyPermission", v)} />
                <span>{v}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ===== SECTION 2 ===== */
function Section2({ data, set, errors }) {
  return (
    <div className="ef-subsection">
      <h3 className="ef-subsection__title">COURSE DETAILS</h3>
      <div className="ef-field">
        <label className="ef-label">Select Course <span className="ef-req">*</span></label>
        <select className={`ef-input ${errors.courseId ? "ef-input--error" : ""}`} value={data.courseId} onChange={e => set("courseId", e.target.value)}>
          <option value="">-- Select a course --</option>
          <option value="wc">White Card – Construction Industry</option>
          <option value="fa">Provide First Aid in Education and Care</option>
          <option value="carp">Certificate III in Carpentry</option>
          <option value="paint">Certificate III in Painting and Decorating</option>
          <option value="tile">Certificate III in Wall and Floor Tiling (RPL)</option>
          <option value="haul">Conduct Articulated Haul Truck Operations</option>
          <option value="excav">Conduct Civil Construction Excavator Operations</option>
        </select>
        {errors.courseId && <span className="ef-error">{errors.courseId}</span>}
      </div>
      <div className="ef-field">
        <label className="ef-label">Qualification Level</label>
        <select className="ef-input" value={data.qualificationLevel} onChange={e => set("qualificationLevel", e.target.value)}>
          <option value="">-- Select --</option>
          <option>Certificate I</option>
          <option>Certificate II</option>
          <option>Certificate III</option>
          <option>Certificate IV</option>
          <option>Statement of Attainment</option>
        </select>
      </div>
      <div className="ef-field">
        <label className="ef-label">Main reason for study</label>
        <select className="ef-input" value={data.studyReason} onChange={e => set("studyReason", e.target.value)}>
          <option value="">-- Select --</option>
          <option>To get a job</option>
          <option>To develop existing business</option>
          <option>To start a new business</option>
          <option>For personal interest</option>
          <option>Other</option>
        </select>
      </div>
    </div>
  );
}

/* ===== SECTION 3 ===== */
function Section3({ data, set, errors }) {
  return (
    <div className="ef-subsection">
      <h3 className="ef-subsection__title">EMPLOYMENT DETAILS</h3>
      <div className="ef-field">
        <label className="ef-label">Employment Status</label>
        <div className="ef-radio-col">
          {["Full-time employee", "Part-time employee", "Self-employed", "Employer", "Unpaid family worker", "Unemployed seeking work", "Unemployed not seeking work"].map(s => (
            <label key={s} className="ef-radio">
              <input type="radio" name="employmentStatus" value={s} checked={data.employmentStatus === s} onChange={() => set("employmentStatus", s)} />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="ef-row-2">
        <div className="ef-field">
          <label className="ef-label">Employer Name</label>
          <input className="ef-input" value={data.employerName} onChange={e => set("employerName", e.target.value)} />
        </div>
        <div className="ef-field">
          <label className="ef-label">Employer Phone</label>
          <input className="ef-input" value={data.employerPhone} onChange={e => set("employerPhone", e.target.value)} />
        </div>
      </div>
      <div className="ef-field">
        <label className="ef-label">Occupation / Role</label>
        <input className="ef-input" value={data.occupation} onChange={e => set("occupation", e.target.value)} />
      </div>
    </div>
  );
}

/* ===== SECTION 4 ===== */
function Section4({ data, set, errors }) {
  return (
    <div className="ef-subsection">
      <h3 className="ef-subsection__title">USI & DECLARATION</h3>
      <div className="ef-field">
        <label className="ef-label">USI Number <span className="ef-req">*</span></label>
        <input className={`ef-input ${errors.usiNumber ? "ef-input--error" : ""}`} placeholder="e.g. 3AZ5FC7K9H" value={data.usiNumber} onChange={e => set("usiNumber", e.target.value)} />
        {errors.usiNumber && <span className="ef-error">{errors.usiNumber}</span>}
        <p className="ef-subsection__desc" style={{marginTop:"6px"}}>Don't have a USI? <a href="https://www.usi.gov.au" target="_blank" rel="noreferrer" className="ef-link">Create one at usi.gov.au</a></p>
      </div>
      <div className="ef-field" style={{marginTop:"16px"}}>
        <label className={`ef-checkbox ${errors.declaration ? "ef-checkbox--error" : ""}`}>
          <input type="checkbox" checked={data.declaration} onChange={e => set("declaration", e.target.checked)} />
          <span>I declare that the information I have provided is true and correct, and I agree to the terms and conditions of enrollment.</span>
        </label>
        {errors.declaration && <span className="ef-error">{errors.declaration}</span>}
      </div>
    </div>
  );
}

/* ===== SECTION 5 ===== */
function Section5({ data, set }) {
  return (
    <div className="ef-subsection">
      <h3 className="ef-subsection__title">SUPPORTING DOCUMENTS</h3>
      <p className="ef-subsection__desc">Please upload a copy of your photo ID (passport, driver's licence, etc.).</p>
      <div className="ef-upload-zone" onClick={() => document.getElementById("ef-file-input").click()}>
        <span className="ef-upload-icon">📎</span>
        <span>{data.idDocument ? data.idDocument.name : "Click or drag to upload your ID document"}</span>
        <input id="ef-file-input" type="file" hidden accept=".pdf,.jpg,.jpeg,.png" onChange={e => set("idDocument", e.target.files[0])} />
      </div>
      {data.idDocument && (
        <div className="ef-file-preview">
          ✓ {data.idDocument.name}
          <button className="ef-remove-file" onClick={() => set("idDocument", null)}>✕</button>
        </div>
      )}
    </div>
  );
}