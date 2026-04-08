import "../styles/ViewDetailsRight.css"
function ViewDetailsRight({ course }) {

    return (

       <div className="view-details-right">

            <div className="price-card">

                <p className="old-price">${course?.originalPrice}</p>
                <h1 className="new-price">${course?.sellingPrice}</h1>
                <p className="course-fee">Course Fees</p>
                <p className="save-text">{`Save $${course.originalPrice - course.sellingPrice} !`}</p>

                {course?.slblPrice && (
                    <>
                        <hr className="vdr-hr" />
                        <p className="combo-label">SL + BL</p>
                        <h3 className="combo-price">${course?.slblPrice}</h3>
                    </>
                )}

            </div>

            <div className="course-details-box">

                <h3 className="course-detail-vdr">Course Details</h3>

                <div className="detail-item duration">
                    <div className="detail-item-div">
                        <span>🕒</span>
                        <p>Duration</p>
                    </div>
                    <strong>{course?.duration}</strong>
                </div>

                <div className="detail-item location">
                    <div className="detail-item-div">
                        <span>📍</span>
                        <p>Location</p>
                    </div>
                    <strong>{course?.deliveryMethod}</strong>
                </div>

                <button className="book-btn-courses">
                    BOOK NOW — ${course?.sellingPrice}
                </button>

                {course?.slblPrice && (
                    <button className="book-btn-alt">
                        Book Now SL + BL — ${course?.slblPrice}
                    </button>
                )}

                <hr className="vdr-hr" />

                <ul className="course-benefits">
                    <li>✅ Nationally Recognized Certification</li>
                    <li>🛡 Industry-Standard Training</li>
                    <li>⭐ Expert Instructors</li>
                </ul>

            </div>

            <div className="help-card">

                <div className="help-header">
                    <div className="help-icon">📞</div>
                    <div>
                        <h3>Need Help?</h3>
                        <p>Contact our training advisors for personalized guidance</p>
                    </div>
                </div>

                <button className="help-btn">📞 Call: 1300 976 097</button>
                <button className="email-btn">✉ Email Support</button>

            </div>

        </div>

    )

}

export default ViewDetailsRight