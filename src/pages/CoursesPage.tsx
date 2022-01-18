import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export const COURSE_DATA = [
  { id: "c1", title: "Ionic and React - The Parctial Guide" },
  { id: "c2", title: "React.js - The Complete Guide" },
  { id: "c3", title: "Javascript - The Complete Guide" },
];

const CoursesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Courses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {COURSE_DATA.map((course) => (
            <IonRow key={course.id}>
              <IonCol size-md="4" offset-md="4">
                <IonCard>
                  <IonCardContent className="ion-text-center">
                    <h2>{course.title}</h2>
                    <IonButton routerLink={`/courses/${course.id}`}>
                      View Details
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CoursesPage;
