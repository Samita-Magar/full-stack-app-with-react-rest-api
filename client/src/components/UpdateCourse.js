import React, { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils/apiHelper";
import CourseContext from "../context/CourseContext";
import UserContext from "../context/UserContext";
import ErrorsDisplay from "./ErrorsDisplay";

const UpdateCourse = (props) => {
  const { course } = useContext(CourseContext);
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  
  //Set API path
  const path = `/courses/${id}`;

  //State
  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);

  // Event Handlers
  const handleSubmit = async (event) => {
    event.preventDefault();

    const courseDetail = {
      id: course.id,
      title: courseTitle.current.value,
      description: courseDescription.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
    };

    const credential = {
      username: authUser.username,
      password: authUser.password,
    };
    //debug
    //console.log(course);

    try {
      const response = await api(path, "PUT", courseDetail, credential);
      if (response.status === 204) {
        console.log(`Course ${course.id} is successfully updated!`);
        navigate("/");
      } else if (response.status === 400) {
        const data = await response.json();
        //console.log(data);
        setErrors(data.errors);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    };
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              defaultValue={course.title}
              ref={courseTitle}
            />
            <p>By Joe Smith</p>
            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              defaultValue={course.description}
              ref={courseDescription}
            />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              defaultValue={course.estimatedTime}
              ref={estimatedTime}
            />
            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              defaultValue={course.materialsNeeded}
              ref={materialsNeeded}
            />
          </div>
        </div>
        <button className="button" type="submit" onClick={handleSubmit}>
          Update Course
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;