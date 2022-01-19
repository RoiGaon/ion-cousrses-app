import React from "react";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";

import { useParams } from "react-router";
import { COURSE_DATA } from "./CoursesPage";
import { EditableGoalItem, GoalsModal } from "../components";

const CourseGoalsPage: React.FC = () => {
  const [startedDeleting, setStartedDeleting] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedGoal, setSelectedGoal] = React.useState<any>();
  const { courseId } = useParams<{ courseId: string }>();
  const slidingOptionsRef = React.useRef<HTMLIonItemSlidingElement>(null);

  const selectedCourse = COURSE_DATA.find((course) => course.id === courseId);

  const startDeleteItemHandler = () => {
    slidingOptionsRef.current?.closeOpened();
    setStartedDeleting(true);
  };

  const deleteItemHandler = () => {
    setStartedDeleting(false);
    setToastMessage("Goal Deleted!");
  };

  const startEditGoalHandler = (event: React.MouseEvent, goalId: string) => {
    event.stopPropagation();
    const goal = selectedCourse?.goals.find((goal) => goal.id === goalId);
    slidingOptionsRef.current?.closeOpened();
    if (!goal) return;
    setIsEditing(true);
    setSelectedGoal(goal);
  };

  const cancelIsEditGoalHandler = () => {
    setIsEditing(false);
    setSelectedGoal(null);
  };

  const startAddGoalHandler = () => {
    setIsEditing(true);
    setSelectedGoal(null);
  };

  return (
    <>
      <GoalsModal
        show={isEditing}
        onCancel={cancelIsEditGoalHandler}
        editedGoal={selectedGoal}
      />
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => setToastMessage("")}
      />
      <IonAlert
        isOpen={startedDeleting}
        header="Are Your Sure?"
        message="Do you want to delete the goal? This cannot be undone."
        buttons={[
          {
            text: "No",
            role: "cancel",
            handler: () => setStartedDeleting(false),
          },
          { text: "Yes", handler: deleteItemHandler },
        ]}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/courses/list" />
            </IonButtons>
            <IonTitle>
              {selectedCourse ? selectedCourse.title : "No Course Found!"}
            </IonTitle>
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
          {selectedCourse && (
            <IonList>
              {selectedCourse.goals.map((goal) => (
                <EditableGoalItem
                  key={goal.id}
                  slidingRef={slidingOptionsRef}
                  onStartDelete={startDeleteItemHandler}
                  onStartEdit={(e) => startEditGoalHandler(e, goal.id)}
                  text={goal.text}
                />
              ))}
            </IonList>
          )}
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

export default CourseGoalsPage;
