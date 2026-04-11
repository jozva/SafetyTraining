import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import EnrollmentSection1 from "./EnrollmentSection1"
import EnrollmentSection2 from "./EnrollmentSection2"
import EnrollmentSection3 from "./EnrollmentSection3"
import EnrollmentSection4 from "./EnrollmentSection4"
import EnrollmentSection5 from "./EnrollmentSection5"

const EnrollmentRegister = forwardRef(({userDetails, savedFormData, section, setSection }, ref) => {



   
    const [formData, setFormData] = useState({
        flowId: localStorage.getItem("flowId"),
        userId: localStorage.getItem("enrollId"),
        title: "",
        surname: "",
        givenName: userDetails?.name || "",
        middleName: "",
        preferredName: "",
        dob: "",
        gender: "",
        homePhone: "",
        workPhone: "",
        mobilePhone: "",
        email: "",
        residentialAddress: "",
        suburb: "",
        state: "",
        postcode: "",
        postalDifferent: false,
        postalAddress: "",
        postalSuburb: "",
        postalState: "",
        postalPostcode: "",
        emergencyName: "",
        emergencyRelationship: "",
        emergencyContact: "",
        emergencyPermission: "no",

        educationLevel: "",
        yearCompleted: "",
        schoolName: "",
        schoolInAustralia: true,
        schoolState: "",
        schoolPostcode: "",
        schoolCountry: "",
        hasQualifications: "",
        qualificationLevels: [],
        qualificationDetails: "",
        qualificationFile: null,
        employmentStatus: "",
        employerName: "",
        supervisorName: "",
        workplaceAddress: "",
        employerEmail: "",
        employerPhone: "",
        trainingReason: "",
        trainingReasonOther: "",
        usi: "",
        usiPermission: false,
        staApplication: "",
        staAuthoriseName: "",
        staConsent: false,
        staTownOfBirth: "",
        staOverseasTown: "",
        staIdType: "",
        staIdFile: null,

        countryOfBirth: "",
        speaksOtherLanguage: "",
        otherLanguage: "",
        indigenousStatus: "",
        hasDisability: "",
        disabilityTypes: [],
        disabilityNotes: "",

        // Section 5
        acceptPrivacy: false,
        acceptTerms: false,
        studentName: "",
        declarationDate: "",
        signature: null,
        idDocument: null,
        photoDocument: null
    })

    // Autofill user details
    useEffect(() => {
        if (!userDetails) return

        const parts = (userDetails.name || "").trim().split(" ")

        setFormData(prev => ({
            ...prev,
            givenName: parts[0] || "",
            surname: parts.slice(1).join(" ") || "",
            email: userDetails.email || "",
            mobilePhone: userDetails.phone || ""
        }))
    }, [userDetails])


    useEffect(() => {
    if (!savedFormData) return;

    setFormData(prev => ({
      ...prev,
      title: savedFormData.personalDetails?.title || prev.title,
      surname: savedFormData.personalDetails?.surname || prev.surname,
      givenName: savedFormData.personalDetails?.givenName || prev.givenName,
      middleName: savedFormData.personalDetails?.middleName || prev.middleName,
      preferredName: savedFormData.personalDetails?.preferredName || prev.preferredName,
      dob: savedFormData.personalDetails?.dob || prev.dob,
      gender: savedFormData.personalDetails?.gender || prev.gender,
      email: savedFormData.personalDetails?.email || prev.email,
      homePhone: savedFormData.personalDetails?.homePhone || prev.homePhone,
      mobilePhone: savedFormData.personalDetails?.mobilePhone || prev.mobilePhone,
      residentialAddress: savedFormData.address?.residential?.address || prev.residentialAddress,
      suburb: savedFormData.address?.residential?.suburb || prev.suburb,
      state: savedFormData.address?.residential?.state || prev.state,
      postcode: savedFormData.address?.residential?.postcode || prev.postcode,
      postalAddress: savedFormData.address?.postal?.address || prev.postalAddress,
      postalSuburb: savedFormData.address?.postal?.suburb || prev.postalSuburb,
      postalState: savedFormData.address?.postal?.state || prev.postalState,
      postalPostcode: savedFormData.address?.postal?.postcode || prev.postalPostcode,
      emergencyName: savedFormData.emergencyContact?.name || prev.emergencyName,
      emergencyRelationship: savedFormData.emergencyContact?.relationship || prev.emergencyRelationship,
      emergencyContact: savedFormData.emergencyContact?.contactNumber || prev.emergencyContact,
      emergencyPermission: savedFormData.emergencyContact?.consent ? "yes" : "no",
      educationLevel: savedFormData.education?.highestLevel || prev.educationLevel,
      yearCompleted: savedFormData.education?.yearCompleted || prev.yearCompleted,
      schoolName: savedFormData.education?.schoolName || prev.schoolName,
      schoolState: savedFormData.education?.schoolState || prev.schoolState,
      schoolPostcode: savedFormData.education?.schoolPostcode || prev.schoolPostcode,
      schoolCountry: savedFormData.education?.schoolCountry || prev.schoolCountry,
      hasQualifications: savedFormData.qualifications?.hasQualification ? "yes" : "no",
      qualificationLevels: savedFormData.qualifications?.types || prev.qualificationLevels,
      employmentStatus: savedFormData.employment?.status || prev.employmentStatus,
      employerName: savedFormData.employment?.details?.employerName || prev.employerName,
      supervisorName: savedFormData.employment?.details?.supervisorName || prev.supervisorName,
      workplaceAddress: savedFormData.employment?.details?.address || prev.workplaceAddress,
      employerEmail: savedFormData.employment?.details?.email || prev.employerEmail,
      employerPhone: savedFormData.employment?.details?.phone || prev.employerPhone,
      trainingReason: savedFormData.trainingReason || prev.trainingReason,
      countryOfBirth: savedFormData.language?.countryOfBirth || prev.countryOfBirth,
      otherLanguage: savedFormData.language?.otherLanguage || prev.otherLanguage,
      hasDisability: savedFormData.specialNeeds?.hasDisability ? "yes" : "no",
      disabilityTypes: savedFormData.specialNeeds?.types || prev.disabilityTypes,
      disabilityNotes: savedFormData.specialNeeds?.other || prev.disabilityNotes,
    }));
  }, [savedFormData]);

    // ✅ VALIDATION FUNCTION
    const validateForm = () => {
        if (!formData.acceptPrivacy) return "Accept Privacy Policy"
        if (!formData.acceptTerms) return "Accept Terms"
        if (!formData.studentName) return "Enter Student Name"
        if (!formData.declarationDate) return "Enter Date"
        if (!formData.signature) return "Signature required"
        if (!formData.idDocument) return "Upload ID"
        if (!formData.photoDocument) return "Upload Photo"
        return null
    }

    // ✅ API CALL
    const submitToBackend = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/enrollment-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if (!res.ok) throw new Error(data.message)

            return null
        } catch (err) {
            return err.message || "Something went wrong"
        }
    }

    // ✅ EXPOSE TO PARENT
    useImperativeHandle(ref, () => ({
        submitForm: async () => {

            const error = validateForm()
            if (error) return error

            const apiError = await submitToBackend()
            if (apiError) return apiError

            return null
        }
    }))

    return (
        <div>

            {section === 1 && (
                <EnrollmentSection1
                    userDetails={userDetails}
                    data={formData}
                    setData={setFormData}
                    next={() => setSection(2)}
                />
            )}

            {section === 2 && (
                <EnrollmentSection2
                    data={formData}
                    setData={setFormData}
                    prev={() => setSection(1)}
                    next={() => setSection(3)}
                />
            )}

            {section === 3 && (
                <EnrollmentSection3
                    data={formData}
                    setData={setFormData}
                    prev={() => setSection(2)}
                    next={() => setSection(4)}
                />
            )}

            {section === 4 && (
                <EnrollmentSection4
                    data={formData}
                    setData={setFormData}
                    prev={() => setSection(3)}
                    next={() => setSection(5)}
                />
            )}

            {section === 5 && (
                <EnrollmentSection5
                    data={formData}
                    setData={setFormData}
                    prev={() => setSection(4)}

                />
            )}

        </div>
    )
})

export default EnrollmentRegister