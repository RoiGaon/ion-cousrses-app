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
  IonToolbar,
} from "@ionic/react";
import { useContextCoursesProvider as useProvider } from "../contextStore/courses-context";

const AllGoalsPage: React.FC = () => {
  const coursesCtx = useProvider();
  const goals = coursesCtx.courses
    .map((course) =>
      course.goals.map((goal) => ({ ...goal, courseTitle: course.title }))
    )
    .reduce((goalArr, nestedGoalArr) => {
      let updatedGoalArr = goalArr;
      for (let goal of nestedGoalArr) {
        updatedGoalArr = updatedGoalArr.concat(goal);
      }
      return updatedGoalArr;
    }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>All Goals</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {goals.map((goal) => (
            <IonItem key={goal.id}>
              <IonLabel>
                <h2>{goal.courseTitle}</h2>
                <p>{goal.text}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AllGoalsPage;
