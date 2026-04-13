import { useEffect, useState } from "react";
import "../styles/BookingSuccess.css";

const BookingSuccess = ({
  courseName = "RIIWHS204E – Short Courses",
  date = "Fri, 10 April 2026",
  time = "22:00 – 23:00",
  paymentMethod = "Bank Transfer",
  total = "$150",
  isPending = true,
  onDashboard = () => {},
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const rows = [
    { label: "Course", value: courseName },
    { label: "Date", value: date },
    { label: "Time", value: time },
    { label: "Payment method", value: paymentMethod },
  ];

  return (
    <div className={`bs-backdrop ${visible ? "bs-visible" : ""}`}>
      <div className="bs-card">

        <div className="bs-icon-wrap">
          <svg
            className="bs-check"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="bs-title">Booking Successful!</h1>
        <p className="bs-subtitle">
          You have successfully booked your course. A confirmation email has
          been sent to your registered email address.
        </p>

        <div className="bs-summary">
          <p className="bs-summary-label">Booking summary</p>
          {rows.map(({ label, value }) => (
            <div className="bs-row" key={label}>
              <span className="bs-row-key">{label}</span>
              <span className="bs-row-val">{value}</span>
            </div>
          ))}
          <div className="bs-row bs-total-row">
            <span className="bs-total-key">Total</span>
            <span className="bs-total-val">{total}</span>
          </div>
        </div>

        {isPending && (
          <div className="bs-notice">
            Your payment is under review. We will confirm your booking once the
            bank transfer is verified.
          </div>
        )}

        <button className="bs-btn" onClick={onDashboard}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;