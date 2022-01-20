import React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";

import { useContextCoursesProvider as useProvider } from "../contextStore/courses-context";

const FilterPage: React.FC = () => {
  const coursesCtx = useProvider();
  const courseFilterChangeHandler = (event: CustomEvent) => {
    coursesCtx.changeCourseFilter(event.detail.value, event.detail.checked);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Filter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {coursesCtx.courses.map((course) => (
            <IonItem key={course.id}>
              <IonLabel>{course.title}</IonLabel>
              <IonToggle
                value={course.id}
                onIonChange={courseFilterChangeHandler}
                color="tertiary"
                checked={course.included}
              ></IonToggle>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FilterPage;
