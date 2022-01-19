import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

interface Props {
  show: boolean;
  onCancel: () => void;
  editedGoal: { id: string; text: string } | null;
}

const GoalsModal: React.FC<Props> = ({ show, onCancel, editedGoal }) => {
  return (
    <IonModal isOpen={show}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{editedGoal ? "Edit" : "Add"} Goal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Your Goal</IonLabel>
                <IonInput type="text" value={editedGoal?.text} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton color="dark" fill="clear" onClick={onCancel}>
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="tertiary" expand="block">
                <span style={{ color: "gold" }}>Save</span>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default GoalsModal;
