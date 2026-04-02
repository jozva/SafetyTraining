import { useState } from "react";
import "./StudentMyCourses.css";

const mockEnrolledCourses = [
  {
    id: 1,
    title: "White Card : Prepare to Work Safely in the Construction Industry",
    enrolledDate: "Apr 1, 2026",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
    status: "Active",
    payment: "Pending Verification",
    lln: "Completed",
    form: "Approved",
    progress: 10,
  },
];

const mockBrowseCourses = [
  {
    id: 1,
    title: "Provide First Aid in an Education and Care Setting",
    category: "First Aid Courses",
    nextBatch: "May 1, 2026",
    duration: "1 Day",
    enrolled: 7,
    price: "$90",
    dates: ["May 1, 2026"],
    image: "https://images.unsplash.com/photo-1516841273335-e39b37888115?w=400&q=80",
  },
  {
    id: 2,
    title: "Certificate III in Carpentry Course Information",
    category: "Certificate Courses",
    nextBatch: "Contact us",
    duration: null,
    enrolled: 0,
    price: "$3000",
    tags: ["Theory", "Practical"],
    image: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=400&q=80",
  },
  {
    id: 3,
    title: "Certificate III in Painting and Decorating",
    category: "Certificate Courses",
    nextBatch: "Contact us",
    duration: null,
    enrolled: 0,
    price: "$2700",
    tags: ["Theory", "Practical"],
    image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80",
  },
  {
    id: 4,
    title: "Certificate III in Wall and Floor Tiling (RPL)",
    category: "Certificate Courses",
    nextBatch: "Contact us",
    duration: "1 Day",
    enrolled: 0,
    price: "$1900",
    tags: ["Theory", "Practical"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
  {
    id: 5,
    title: "Conduct articulated haul truck operations",
    category: "Earthmoving Courses",
    nextBatch: "Apr 1, 2026",
    duration: "1 Day Course",
    enrolled: 6,
    price: "$350",
    dates: ["Apr 1, 2026"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80",
  },
  {
    id: 6,
    title: "Conduct Civil Construction Excavator Operations",
    category: "Earthmoving Courses",
    nextBatch: "Apr 1, 2026",
    duration: "1",
    enrolled: 4,
    price: "$340",
    dates: ["Apr 1, 2026"],
    image: "https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?w=400&q=80",
  },
];

const statusColors = {
  Active: "status-active",
  "Pending Verification": "status-pending",
  Completed: "status-completed",
  Approved: "status-approved",
};

export default function StudentMyCourses() {
  const [tab, setTab] = useState("enrolled");
  const [search, setSearch] = useState("");
  const [selectedDates, setSelectedDates] = useState({});

  const filtered = mockBrowseCourses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mc-wrapper">
      <div className="mc-header">
        <h1 className="mc-title">My Courses</h1>
        <p className="mc-subtitle">Manage your enrolled courses and discover new certifications</p>
      </div>

      {/* Banners */}
      <div className="mc-banner mc-banner--success">
        <span className="mc-banner__icon">✓</span>
        <div>
          <strong>Pre-Enrollment Assessment Passed</strong>
          <p>Score: 92.31% – You can now enroll in courses. You can also retake LLND anytime if you want to improve your result.</p>
        </div>
      </div>

      <div className="mc-banner mc-banner--optional">
        <div className="mc-banner__left">
          <span className="mc-optional-badge">Optional</span>
          <div>
            <strong className="mc-banner__title--purple">LLND Assessment Retake Available</strong>
            <p>You have already passed. Retake anytime if you want to improve your score.</p>
          </div>
        </div>
        <button className="mc-btn mc-btn--purple">
          <span>📖</span> Retake Assessment
        </button>
      </div>

      <div className="mc-banner mc-banner--success">
        <span className="mc-banner__icon">✓</span>
        <div>
          <strong>Enrollment Form Approved</strong>
          <p>Your enrollment form has been approved.</p>
          <a href="#" className="mc-link">View Form</a>
        </div>
      </div>

      {/* Tabs */}
      <div className="mc-tabs">
        <button
          className={`mc-tab ${tab === "enrolled" ? "mc-tab--active" : ""}`}
          onClick={() => setTab("enrolled")}
        >
          Enrolled Courses
        </button>
        <button
          className={`mc-tab ${tab === "browse" ? "mc-tab--active" : ""}`}
          onClick={() => setTab("browse")}
        >
          Browse Courses
        </button>
      </div>

      {/* Enrolled Tab */}
      {tab === "enrolled" && (
        <div className="mc-enrolled">
          {mockEnrolledCourses.map((course) => (
            <div key={course.id} className="mc-course-card">
              <img src={course.image} alt={course.title} className="mc-course-card__img" />
              <div className="mc-course-card__body">
                <div className="mc-course-card__top">
                  <div>
                    <h3 className="mc-course-card__title">{course.title}</h3>
                    <p className="mc-course-card__date">Enrolled: {course.enrolledDate}</p>
                  </div>
                  <div className="mc-course-card__badges">
                    <span className={`mc-badge ${statusColors[course.status]}`}>{course.status}</span>
                    <span className={`mc-badge ${statusColors[course.payment]}`}>Payment: {course.payment}</span>
                    <span className={`mc-badge ${statusColors[course.lln]}`}>LLN: {course.lln}</span>
                    <span className={`mc-badge ${statusColors[course.form]}`}>Form: {course.form}</span>
                  </div>
                </div>
                <div className="mc-course-card__progress-section">
                  <div className="mc-course-card__progress-label">
                    <span>Overall Progress</span>
                    <span className="mc-course-card__progress-pct">{course.progress}%</span>
                  </div>
                  <div className="mc-progress-bar">
                    <div className="mc-progress-bar__fill" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
                <button className="mc-btn mc-btn--purple mc-btn--sm">
                  <span>📖</span> Retake LLND Assessment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Browse Tab */}
      {tab === "browse" && (
        <div className="mc-browse">
          <div className="mc-search-wrap">
            <span className="mc-search-icon">🔍</span>
            <input
              className="mc-search"
              placeholder="Search for courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="mc-grid">
            {filtered.map((course) => (
              <div key={course.id} className="mc-browse-card">
                <div className="mc-browse-card__img-wrap">
                  <img src={course.image} alt={course.title} className="mc-browse-card__img" />
                  <span className="mc-category-badge">{course.category}</span>
                </div>
                <div className="mc-browse-card__body">
                  <h3 className="mc-browse-card__title">{course.title}</h3>
                  <p className="mc-browse-card__batch">Next batch starts: {course.nextBatch}</p>
                  <div className="mc-browse-card__meta">
                    {course.duration && <span>⏱ {course.duration}</span>}
                    <span>👥 {course.enrolled}</span>
                  </div>
                  {course.tags && (
                    <div className="mc-tags">
                      {course.tags.map((t) => (
                        <span key={t} className="mc-tag">{t}</span>
                      ))}
                    </div>
                  )}
                  {course.dates && (
                    <div className="mc-date-select">
                      <label>📅 Select a Date</label>
                      <select
                        value={selectedDates[course.id] || ""}
                        onChange={(e) =>
                          setSelectedDates({ ...selectedDates, [course.id]: e.target.value })
                        }
                      >
                        <option value="">Choose a date</option>
                        {course.dates.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="mc-browse-card__footer">
                    <div>
                      <p className="mc-price-label">Price</p>
                      <p className="mc-price">{course.price}</p>
                    </div>
                    <button className="mc-btn mc-btn--purple mc-btn--sm">
                      ↑ Enroll &amp; Pay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}