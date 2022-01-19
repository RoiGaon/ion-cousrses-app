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
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { addOutline, create, trash } from "ionicons/icons";

import { useParams } from "react-router";
import { COURSE_DATA } from "./CoursesPage";
import { GoalsModal } from "../components";

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
                // option 2
                <IonItemSliding key={goal.id} ref={slidingOptionsRef}>
                  <IonItemOptions side="start">
                    <IonItemOption
                      onClick={startDeleteItemHandler}
                      color="danger"
                    >
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonItemOption>
                  </IonItemOptions>
                  <IonItem
                    lines="full"
                    // option 1
                    // button
                    // onClick={deleteItemHandler}
                  >
                    <IonLabel>{goal.text}</IonLabel>
                    {/* 
                // option 1
                <IonButton
                fill="clear"
                color="dark"
                slot="end"
                  onClick={editGoalHandler}
                  >
                  <IonIcon slot="icon-only" icon={create} />
                </IonButton> */}
                  </IonItem>
                  {/* // option 2 */}
                  <IonItemOptions side="end">
                    <IonItemOption
                      onClick={(e) => startEditGoalHandler(e, goal.id)}
                      color="tertiary"
                    >
                      <IonIcon slot="icon-only" icon={create} color="warning" />
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
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
