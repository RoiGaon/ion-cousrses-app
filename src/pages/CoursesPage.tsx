import React from "react";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
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
import { Course } from "../components/CoursesModal/CoursesModal";

export const COURSE_DATA = [
  {
    id: "c1",
    title: "Ionic and React - The Parctial Guide",
    enrolled: new Date("1/18/2022"),
    goals: [
      { id: "c1g1", text: "Finish the course!" },
      { id: "c1g2", text: "Learn a lot!" },
    ],
  },
  {
    id: "c2",
    title: "React.js - The Complete Guide",
    enrolled: new Date("2/29/2021"),
    goals: [
      { id: "c2g1", text: "Finish the course!" },
      { id: "c2g2", text: "Learn a lot!" },
    ],
  },
  {
    id: "c3",
    title: "Javascript - The Complete Guide",
    enrolled: new Date("6/12/2020"),
    goals: [
      { id: "c3g1", text: "Finish the course!" },
      { id: "c3g2", text: "Learn a lot!" },
    ],
  },
];

const CoursesPage: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(
    null
  );

  const cancelIsEditGoalHandler = () => {
    setIsEditing(false);
    setSelectedCourse(null);
  };

  const startAddGoalHandler = () => {
    setIsEditing(true);
    setSelectedCourse(null);
  };

  return (
    <>
      <CoursesModal
        show={isEditing}
        onCancel={cancelIsEditGoalHandler}
        editedCourse={selectedCourse}
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
            {COURSE_DATA.map((course) => (
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
