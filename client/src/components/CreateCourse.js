import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";
import UserContext from "../context/UserContext";

import ErrorsDisplay from "./ErrorsDisplay";

const CreateCourse = () => {
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  //const location = useLocation();
  //State
  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);
  const [errors, setErrors] = useState([]);

  // event handlers
  const handleSubmit = async (event) => {
    event.preventDefault();
    //Check Null
    if (!authUser) {
      setErrors(["Please sign in before create a course."]);
    } else {
      const course = {
        userId: authUser.id,
        title: courseTitle.current.value,
        description: courseDescription.current.value,
        estimatedTime: estimatedTime.current.value,
        materialsNeeded: materialsNeeded.current.value
      };

      const credential = {
        username: authUser.username,
        password: authUser.password,
      };
      //debug
      //console.log(course);

      try {
        const response = await api("/courses", "POST", course, credential);
        if (response.status === 201) {
          console.log(`${course.title} is successfully created.`);
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
      }
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              defaultValue=""
              ref={courseTitle}
            />
            {authUser !== null ? (
              <p>
                By {authUser.firstname} {authUser.lastname}
              </p>
            ) : (
              <></>
            )}
            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              defaultValue={""}
              ref={courseDescription}
            />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              defaultValue=""
              ref={estimatedTime}
            />
            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              defaultValue={""}
              ref={materialsNeeded}
            />
          </div>
        </div>
        <button className="button" type="submit">
          Create Course
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;