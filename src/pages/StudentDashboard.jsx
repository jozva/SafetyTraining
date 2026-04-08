import React from "react";
import { useEffect, useState } from "react";
import "../styles/StudentDashboard.css";

const mockData = {
  studentName: "Sarmad",
  assessmentScore: 92.31,
  assessmentPassed: true,
  enrollmentFormApproved: true,
};

export default function StudentDashboard() {
const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const studentId = user.id
  localStorage.setItem("studentId",user.id);


  console.log(studentId);

  useEffect(() => {

    const fetchDashboard = async () => {
      try {
        const res = await fetch(`https://safety-training-academy.onrender.com/api/student/dashboard/${studentId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const resData = await res.json();
        console.log("helo",res);

        setData(resData);

      } catch (err) {
        console.error(err);
        setError("Something went wrong da 😅");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

  }, [studentId]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-welcome">
          Welcome Back! <span className="wave">👋</span>
        </h1>
        <p className="dashboard-subtitle">
          Here's what's happening with your courses today.
        </p>
      </div>

      <div className="dashboard-alerts">
        {mockData.assessmentPassed && (
          <div className="alert alert-success">
            <span className="alert-icon">✅</span>
            <div className="alert-body">
              <p className="alert-title">Pre-Enrollment Assessment Passed</p>
              <p className="alert-desc">
                Score: {mockData.assessmentScore}% – You can now enroll in
                courses. Payment verification required after enrollment.
              </p>
            </div>
          </div>
        )}

        {mockData.enrollmentFormApproved && (
          <div className="alert alert-success">
            <span className="alert-icon">✅</span>
            <div className="alert-body">
              <p className="alert-title">Enrollment Form Approved</p>
              <p className="alert-desc">
                Your enrollment form has been approved.
              </p>
              <a href="#" className="alert-link">
                View Form
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="quick-actions-card">
        <h2 className="quick-actions-title">Quick Actions</h2>
        <div className="quick-actions-list">
          <button className="quick-action-btn">
            <span className="qa-icon">📖</span>
            <span>Enroll in New Course</span>
          </button>
          <button className="quick-action-btn">
            <span className="qa-icon">🏅</span>
            <span>Download Certificates</span>
          </button>
          <button className="quick-action-btn">
            <span className="qa-icon">📈</span>
            <span>View Results</span>
          </button>
        </div>
      </div>
    </div>
  );
}