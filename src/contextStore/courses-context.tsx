import React from "react";
import { Course, CoursesContextType, Goal } from "types/customTypes";

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
  const [courses, setCourses] = React.useState<Course[]>([
    {
      id: "c1",
      title: "Ionic and React - The Parctial Guide",
      enrolled: new Date("1/18/2022"),
      goals: [
        { id: "c1g1", text: "Finish the course!" },
        { id: "c1g2", text: "Learn a lot!" },
      ],
    },
  ]);

  const addCourse = (title: string, date: Date) => {
    debugger;
    const newCourse: Course = {
      id: Math.random().toString(),
      title,
      enrolled: date,
      goals: [],
    };

    setCourses((prevCourses) => prevCourses.concat(newCourse));
  };
  const addGoal = (courseId: string, text: string) => {
    const newGoal: Goal = {
      id: Math.random().toString(),
      text,
    };
    setCourses((prevCourses) => {
      const updatedCourses = [...prevCourses];
      const updatedCourseIndex = updatedCourses.findIndex(
        (course) => course.id === courseId
      );
      const updatedCourseGoals =
        updatedCourses[updatedCourseIndex].goals.concat(newGoal);
      const updatedCourse = { ...updatedCourses[updatedCourseIndex] };
      updatedCourse.goals = updatedCourseGoals;
      updatedCourses[updatedCourseIndex] = updatedCourse;
      return updatedCourses;
    });
  };
  const deleteGoal = (courseId: string, goalId: string) => {
    setCourses((prevCourses) => {
      const updatedCourses = [...prevCourses];
      const updatedCourseIndex = updatedCourses.findIndex(
        (course) => course.id === courseId
      );
      const updatedCourseGoals = updatedCourses[
        updatedCourseIndex
      ].goals.filter((goal) => goal.id !== goalId);
      const updatedCourse = { ...updatedCourses[updatedCourseIndex] };
      updatedCourse.goals = updatedCourseGoals;
      updatedCourses[updatedCourseIndex] = updatedCourse;

      return updatedCourses;
    });
  };

  const updateGoal = (courseId: string, goalId: string, newText: string) => {
    setCourses((prevCourses) => {
      const updatedCourses = [...prevCourses];
      const updatedCourseIndex = updatedCourses.findIndex(
        (course) => course.id === courseId
      );
      const updatedCourseGoals =
        updatedCourses[updatedCourseIndex].goals.slice();
      const updatedCourseGoalIndex = updatedCourseGoals.findIndex(
        (goal) => goal.id === goalId
      );
      const updatedGoal = {
        ...updatedCourseGoals[updatedCourseGoalIndex],
        text: newText,
      };
      updatedCourseGoals[updatedCourseGoalIndex] = updatedGoal;
      const updatedCourse = { ...updatedCourses[updatedCourseIndex] };
      updatedCourse.goals = updatedCourseGoals;
      updatedCourses[updatedCourseIndex] = updatedCourse;
      return updatedCourses;
    });
  };

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
