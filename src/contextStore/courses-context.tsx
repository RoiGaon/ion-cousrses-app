import React from "react";
import { Course, CoursesContextType } from "types/customTypes";

const CoursesContext = React.createContext<CoursesContextType>({
  courses: [],
  addCourse: () => {},
  addGoal: () => {},
  deleteGoal: () => {},
  updateGoal: () => {},
});

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const ContextCoursesProvider: React.FC<Props> = ({ children }) => {
  const [courses, setCourses] = React.useState<Course[]>([]);

  const addCourse = () => {};
  const addGoal = () => {};
  const deleteGoal = () => {};
  const updateGoal = () => {};

  const courseValue = {
    courses: courses,
    addCourse,
    addGoal,
    deleteGoal,
    updateGoal,
  };

  return (
    <CoursesContext.Provider value={courseValue}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useContextCoursesProvider = () => {
  return React.useContext(CoursesContext);
};
