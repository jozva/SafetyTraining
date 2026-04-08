import { useState, useEffect, useRef } from "react";
import CourseSelection from "../components/course/CourseSelection";
import "../styles/BookNow.css";
import Payment from "../components/Payment";
import LLNDAssessment from "../components/llnd/LLNDAssessment";
import EnrollmentRegister from "../components/enrollmrntRegister/EnrollmentRegister";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";



function BookNow() {
    const navigate = useNavigate();
    const enrollRef = useRef(null);
    const { id: enrollId } = useParams();
    const [isCompanyEnroll, setIsCompanyEnroll] = useState(false);
    const [isLoading, setIsLoading] = useState(!!enrollId);
    const [enrollmentType, setEnrollmentType] = useState("individual");
    const [step, setStep] = useState(1);
    const [selectedSession, setSelectedSession] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [enrollSection, setEnrollSection] = useState(1);
    const [isPaymentValid, setIsPaymentValid] = useState(false);
    const [triggerValidation, setTriggerValidation] = useState(false);
    const [paymentData, setPaymentData] = useState({});


    useEffect(() => {
        if (selectedCourse?._id) {
            localStorage.setItem("courseId", selectedCourse._id);
        }
    }, [selectedCourse]);

    useEffect(() => {
        if (selectedSession?._id) {
            localStorage.setItem("sessionId", selectedSession._id);
        }
    }, [selectedSession]);

    useEffect(() => {
        if (!enrollId) return;

        setIsLoading(true);

        fetch(`https://safety-training-academy-tho8.onrender.com/api/book-now/check-role?id=${enrollId}`)
            .then(res => res.json())
            .then(data => {
                console.log("API RESPONSE:", data);

                if (data.role === "company" || data.role === "Company") {
                    setIsCompanyEnroll(true);
                    setEnrollmentType("company");
                } else {
                    navigate("/");
                }
            })
            .catch(() => navigate("/"))
            .finally(() => setIsLoading(false));

    }, [enrollId]);

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const totalSteps = enrollmentType === "individual" ? 4 : 2;
    const effectiveStep = isCompanyEnroll ? step - 1 : step;
    const progress = (effectiveStep / totalSteps) * 100;

   useEffect(() => {
        if (step === 1) {
            setSelectedSession(null);
            localStorage.removeItem("enrollId");
            localStorage.removeItem("flowId");
            localStorage.removeItem("courseId");
            localStorage.removeItem("sessionId");
        }
    }, [step]);

    if (isLoading) return <div>Loading...</div>;

    const createFlow = async () => {
        try {
            const studentId = localStorage.getItem("enrollId");

            if (!studentId) {

                console.error("No studentId found");
                return;
            }

            const res = await fetch("https://safety-training-academy-tho8.onrender.com/api/flow/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    studentId,
                    course: {
                        courseId: selectedCourse._id,
                        courseName: selectedCourse.category,
                        price: selectedCourse.sellingPrice
                    },
                    enrollmentType
                })
            });

            const data = await res.json();

            localStorage.setItem("flowId", data._id);

            console.log("FLOW CREATED:", data);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className="enroll-page">

            <h1 className="title">Student Enrollment</h1>
            <p className="subtitle">Complete all steps to enroll in your course</p>

            <div className="enroll-card">

                {/* Stepper */}
                <p className="home-pg-btn" style={{ width: "fit-content", padding: "10px 20px" }} onClick={() => { navigate("/") }}>
                    Back to Home
                </p>
                <div className="stepper">
                    <div className="stepper-wo-pbar">

                        <div className={`step ${step >= 1 ? "active" : ""}`}>📖</div>

                        {enrollmentType === "individual" && (
                            <>
                                <div className={`step ${step >= 2 ? "active" : ""}`}>💳</div>
                                <div className={`step ${step >= 3 ? "active" : ""}`}>📋</div>
                                <div className={`step ${step >= 4 ? "active" : ""}`}>📄</div>
                            </>
                        )}

                        {enrollmentType === "company" && (
                            <div className={`step ${step >= 2 ? "active" : ""}`}>💳</div>
                        )}

                    </div>

                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Step Content */}

                {step === 1 && (
                    <CourseSelection
                        enrollmentType={enrollmentType}
                        setEnrollmentType={setEnrollmentType}
                        selectedSession={selectedSession}
                        setSelectedSession={setSelectedSession}
                        selectedCourse={selectedCourse}
                        setSelectedCourse={setSelectedCourse}
                        hideEnrollmentType={isCompanyEnroll}
                    />
                )}

                {step === 2 && (
                    <Payment
                        selectedCourse={selectedCourse}
                        setUserDetails={setUserDetails}
                        enrollmentType={enrollmentType}
                        setEnrollmentType={setEnrollmentType}
                        selectedSession={selectedSession}
                        setSelectedSession={setSelectedSession}
                        setIsValid={setIsPaymentValid}
                        triggerValidation={triggerValidation}
                        isCompanyEnroll={isCompanyEnroll}
                        setPaymentData={setPaymentData}
                    />
                )}

                {step === 3 && (
                    <LLNDAssessment
                        userDetails={userDetails}
                        onComplete={() => isCompanyEnroll ? navigate("/enrollment-success", { state: { email: userDetails.email } }) : setStep(4)}
                    />
                )}

                {step === 4 && (
                    <EnrollmentRegister
                        ref={enrollRef}
                        userDetails={userDetails}
                        section={enrollSection}
                        setSection={setEnrollSection}
                    />
                )}

                {/* Buttons */}
                <div className={`next-wrapper ${step > 1 ? "has-prev" : ""}`}>

                    {step > 1 && step !== 3 && (
                        <button
                            className="prev-btn"
                            disabled={step === 4 && enrollSection === 1}
                            onClick={() => {
                                if (step === 4) {
                                    if (enrollSection > 1) {
                                        setEnrollSection(prev => prev - 1);
                                    }
                                    return;
                                }

                                setStep(prev => prev - 1);
                            }}
                        >
                            Previous
                        </button>
                    )}

                    {step !== 3 && (
                        <button
                            className="next-btn"
                            disabled={
                                (step === 1 && !selectedSession) 
                            }
                            onClick={async () => {

                                if (step === 2) {
                                    setTriggerValidation(true);
                                     console.log("isPaymentValid:", isPaymentValid);

                                    if (!isPaymentValid) return;

                                    try {

                                        console.log("try block entered");
                                        let studentId = localStorage.getItem("enrollId");
                                        console.log("studentId from localStorage:", studentId);

                                        // ✅ create only if not exists
                                        if (!studentId) {
                                            const res = await fetch("https://safety-training-academy-tho8.onrender.com/api/enroll/enrollment", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({
                                                    ...userDetails,
                                                    payment: paymentData,
                                                    courseId: selectedCourse?._id
                                                })
                                            });

                                            const data = await res.json();
                                            studentId = data._id;

                                            localStorage.setItem("enrollId", studentId);
                                        }

                                        // ✅ create flow only once
                                        const flowId = localStorage.getItem("flowId");

                                        if (!flowId) {
                                            await createFlow();
                                        }

                                        setStep(3);

                                    } catch (err) {
                                        alert(err.message);
                                    }

                                    return;
                                }

                                // 🔥 Enrollment flow
                                if (step === 4) {

                                    if (enrollSection === 5) {

                                        if (!enrollRef.current) return;

                                        const error = await enrollRef.current.submitForm();

                                        if (error) {
                                            alert(error);
                                            return;
                                        }

                                        navigate("/enrollment-success", {
                                            state: { email: userDetails.email }
                                        });

                                        return;
                                    }

                                    setEnrollSection(prev => prev + 1);
                                    return;
                                }

                                // 🔥 Normal steps
                                if (isCompanyEnroll && step === 2) {
                                    setStep(3);
                                } else if (step < totalSteps) {
                                    setStep(prev => prev + 1);
                                }
                            }}
                        >
                            {step === 4 && enrollSection === 5 ? "Submit" : "Next"}
                        </button>
                    )}

                </div>

            </div>
        </section>
    );
}

export default BookNow;