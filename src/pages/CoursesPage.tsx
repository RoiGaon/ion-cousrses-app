import React from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { CourseItem, CoursesModal } from "../components";
import { Course } from "types/customTypes";
import { useContextCoursesProvider as useProvider } from "../contextStore/courses-context";

const CoursesPage: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(
    null
  );
  const coursesCtx = useProvider();

  const cancelIsEditGoalHandler = () => {
    setIsEditing(false);
    setSelectedCourse(null);
  };

  const startAddGoalHandler = () => {
    setIsEditing(true);
    setSelectedCourse(null);
  };

  const courseAddHandler = (title: string, date: Date) => {
    coursesCtx.addCourse(title, date);
    setIsEditing(false);
  };

  return (
    <>
      <CoursesModal
        show={isEditing}
        onCancel={cancelIsEditGoalHandler}
        editedCourse={selectedCourse}
        onSave={courseAddHandler}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Courses</IonTitle>
            {!isPlatform("android") && (
              <IonButtons slot="end">
                <IonButton onClick={startAddGoalHandler}>
                  <IonIcon slot="icon-only" icon={addOutline} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            {coursesCtx.courses.map((course) => (
              <IonRow key={course.id}>
                <IonCol size-md="6" offset-md="3">
                  <CourseItem
                    id={course.id}
                    title={course.title}
                    enrolledDate={course.enrolled}
                  />
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
          {isPlatform("android") && (
            <IonFab horizontal="end" vertical="bottom" slot="fixed">
              <IonFabButton color="tertiary" onClick={startAddGoalHandler}>
                <IonIcon icon={addOutline} color="warning" />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default CoursesPage;
