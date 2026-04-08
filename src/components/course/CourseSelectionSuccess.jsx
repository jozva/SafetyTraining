import { useEffect, useState } from "react";
import "./CourseSelectionSuccess.css";
import { useNavigate } from "react-router-dom";

export default function EnrollmentSuccess({ enrollmentData, onBackToHome }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const data = enrollmentData || {
    course: "CPCWHS1001 – Short Courses",
    date: "Fri, 10 April 2026",
    time: "16:01 – 16:02",
    total: "$100",
    paymentMethod: "Bank Transfer",
  };

  const summaryItems = [
    { label: "Course", value: data.course },
    { label: "Date", value: data.date },
    { label: "Time", value: data.time },
    { label: "Payment Method", value: data.paymentMethod },
  ];

  return (
    <div className="enrollment-wrapper">
      <div className={`enrollment-card ${visible ? "visible" : ""}`}>

        {/* Success Icon */}
        <div className="success-icon">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 18L15 25L28 11"
              stroke="#3B6D11"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="enrollment-title">Enrollment Successful!</h2>
        <p className="enrollment-subtitle">
          You have successfully enrolled in your course. A confirmation email
          has been sent to your registered email address.
        </p>

        {/* Summary Card */}
        <div className="summary-card">
          <p className="summary-label">Enrollment Summary</p>

          {summaryItems.map((item) => (
            <div key={item.label} className="summary-row">
              <span className="summary-row-key">{item.label}</span>
              <span className="summary-row-value">{item.value}</span>
            </div>
          ))}

          {/* Total Row */}
          <div className="summary-total-row">
            <span className="summary-total-label">Total</span>
            <span className="summary-total-value">{data.total}</span>
          </div>
        </div>

        {/* Payment Notice */}
        <div className="payment-notice">
          <p>
            Your payment is under review. We will confirm your booking once
            the bank transfer is verified.
          </p>
        </div>

        {/* Back to Home Button */}
        <button className="back-btn" onClick={()=>{navigate("/")}}>
          Back to Home
        </button>

      </div>
    </div>
  );
}
