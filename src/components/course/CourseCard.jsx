import "../../styles/CourseCard.css"
import { useNavigate } from "react-router-dom";
function CourseCard({ course }) {

  const navigate = useNavigate()
  
  return (

    <div className="course-card">

      <div className="course-image" onClick={() => navigate(`/course/${course.slug}-${course._id}`)}>

        {course.image && (
          <img src={course.image} alt={course.title}
           
          />
        )}

        <div className="image-overlay">
          View Details
        </div>

      </div>

      <div className="course-body">

        <div className="course-top">

          <span className="badge">
            {`${course.category}`}
          </span>

          <div className="course-card-price">
            <p className="price">
            ${course.sellingPrice}
          </p>
          <p className="old-price">
            ${course.originalPrice}
          </p>
          </div>

        </div>

        <h3 className="course-title">
          {course.title}
        </h3>

        <div className="courseCard-info">

          <p><span><i class="fa-solid fa-location-dot"></i></span> {course.location}</p>
          <p><span><i class="fa-solid fa-chalkboard-user"></i></span> Delivery: {course.deliveryMethod}</p>
          <p><span><i class="fa-regular fa-calendar-days"></i></span>{course.duration}</p>

        </div>

        {course.experienceBasedBooking ? (

          <div className="exp-buttons">

            <button className="book-btn-course" >

              <span className="old-price">
                ${course.withExperienceOriginal}
              </span>

              <span className="new-price-cc">
                ${course.withExperiencePrice || 0}
              </span>

              Book With Experience

            </button>


            <button className="book-btn-course alt">

              <span className="old-price">
                ${course.withoutExperienceOriginal}
              </span>

              <span className="new-price-cc">
                ${course.withoutExperiencePrice}
              </span>

              Book Without Experience

            </button>

          </div>

        ) : (

          <button className="book-btn-course " onClick={()=>navigate(`/book-now/${course._id}`)}>

            {/* <span className="old-price">
              ${course.originalPrice}
            </span>

            <span className="new-price-cc">
              ${course.sellingPrice}
            </span> */}
            
            Book Now
              <span><i class="fa-regular fa-circle-right"></i></span>
          </button>

        )}

        <button
          className="details-btn detail-btn-course"
          onClick={() => navigate(`/course/${course.slug}-${course._id}`)}
        >
          
          View Details
          <span><i class="fa-solid fa-circle-info"></i></span>
        </button>

      </div>

    </div>

  )

}

export default CourseCard