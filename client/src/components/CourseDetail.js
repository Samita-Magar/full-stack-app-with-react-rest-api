import React, { useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CourseContext from "../context/CourseContext";
import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";
import ReactMarkdown from "react-markdown";

const CourseDetail = (props) => {
  const { course, actions } = useContext(CourseContext);
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const path = `/courses/${id}`;
  let credential = {
    username: "",
    password: "",
  };

  if (authUser !== null) {
    credential = {
      username: authUser.username,
      password: authUser.password,
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      await actions.getCourse(path);
    };
    fetchData();
     // eslint-disable-next-line
  }, []);

  //Event handler
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await api(path, "DELETE", null, credential);
      if (response.status === 204) {
        console.log(`Course ${course.id} Course successfully deleted!`);
        navigate("/");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          {authUser !== null && authUser.id === course.userId ? (
            <>
              <Link to={`/courses/${course.id}/update`} className="button">
                Update Course
              </Link>
              <Link to="/" className="button" onClick={handleDelete}>
                Delete Course
              </Link>
            </>
          ) : (
            <></>
          )}
          <Link to="/" className="button button-secondary">
            Return to List
          </Link>
        </div>
      </div>
      <div className="wrap">
        <h2>Course Details</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>
                By {course.user.firstName} {course.user.lastName}
              </p>
              <p>
                <ReactMarkdown>{course.description}</ReactMarkdown>
              </p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
                      <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>

            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseDetail;