import React from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";

import { COURSE_DATA } from "./CoursesPage";

const CourseGoalsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const selectedCourse = COURSE_DATA.find((course) => course.id === courseId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>
            {selectedCourse ? selectedCourse.title : "No Course Found!"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>This is the Course Goals Page</h2>
      </IonContent>
    </IonPage>
  );
};

export default CourseGoalsPage;
