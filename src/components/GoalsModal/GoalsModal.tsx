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
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

interface Props {
  show: boolean;
  onCancel: () => void;
  onSave: (goalText: string) => void;
  editedGoal: { id: string; text: string } | null;
}

const GoalsModal: React.FC<Props> = ({
  show,
  onCancel,
  editedGoal,
  onSave,
}) => {
  const [error, setError] = React.useState("");
  const textInputRef = React.useRef<HTMLIonInputElement>(null);

  const saveHandler = () => {
    const enteredText = textInputRef.current!.value;

    if (!enteredText || enteredText.toString().trim().length === 0) {
      setError("Pleasr enter a valid text");
      return;
    }
    setError("");

    onSave(enteredText.toString());
  };

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
                <IonInput
                  type="text"
                  value={editedGoal?.text}
                  ref={textInputRef}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          {error && (
            <IonRow>
              <IonText color="danger">
                <p>{error}</p>
              </IonText>
            </IonRow>
          )}
          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton color="dark" fill="clear" onClick={onCancel}>
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="tertiary" expand="block" onClick={saveHandler}>
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
