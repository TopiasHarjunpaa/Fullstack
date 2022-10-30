import Header from "./components/header";
import Content from "./components/content";
import Total from "./components/total";
import CourseParts from "./data/course-parts";

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={CourseParts} />
      <Total courseParts={CourseParts} />
    </div>
  );
};

export default App;
