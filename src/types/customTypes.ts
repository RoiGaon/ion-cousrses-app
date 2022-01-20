export interface Goal {
  id: string;
  title: string;
}

export interface Course {
  id: string;
  title: string;
  enrolled: Date;
  goals: Goal[];
}

export interface CoursesContextType {
  courses: Course[];
  addCourse: (course: Course) => void;
  addGoal: () => void;
  deleteGoal: () => void;
  updateGoal: () => void;
}
