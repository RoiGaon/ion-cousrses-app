export interface Goal {
  id: string;
  text: string;
}

export interface Course {
  id: string;
  title: string;
  enrolled: Date;
  goals: Goal[];
  included: boolean;
}

export interface CoursesContextType {
  courses: Course[];
  addCourse: (courseTitle: string, courseDate: Date) => void;
  addGoal: (courseId: string, goalText: string) => void;
  deleteGoal: (courseId: string, goalId: string) => void;
  updateGoal: (courseId: string, goalId: string, newText: string) => void;
  changeCourseFilter: (courseId: string, isIncluded: boolean) => void;
}
