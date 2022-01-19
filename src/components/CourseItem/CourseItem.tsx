import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React from "react";

interface Props {
  title: string;
  enrolledDate: Date;
  id: string;
}

const CourseItem: React.FC<Props> = ({ title, enrolledDate, id }) => {
  return (
    <IonCard>
      <IonCardContent className="ion-text-center">
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>
          Enrolled on{" "}
          {enrolledDate.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </IonCardSubtitle>
        <div className="ion-text-right">
          <IonButton
            fill="clear"
            color="tertiary"
            routerLink={`/courses/${id}`}
          >
            View Details
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default CourseItem;
