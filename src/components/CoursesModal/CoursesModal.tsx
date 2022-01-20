import {
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPopover,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { calendar } from "ionicons/icons";
import React from "react";
import { Course } from "types/customTypes";

interface Props {
  show: boolean;
  onCancel: () => void;
  editedCourse: Course | null;
  onSave: (title: string, date: Date) => void;
}

const CoursesModal: React.FC<Props> = ({
  show,
  onCancel,
  editedCourse,
  onSave,
}) => {
  const [popoverDate2, setPopoverDate2] = React.useState<string>("");
  const [error, setError] = React.useState("");
  const titleInputRef = React.useRef<HTMLIonInputElement>(null);

  const formatDate = (event: CustomEvent) => {
    let date = event.detail?.value;
    setPopoverDate2(date.split("T")[0]);
  };

  const saveHandler = () => {
    const enteredTitle = titleInputRef.current!.value;

    if (
      !enteredTitle ||
      !popoverDate2 ||
      enteredTitle.toString().trim().length === 0
    ) {
      setError("Please enter a valid title and select a valid date.");
      return;
    }
    setError("");

    onSave(enteredTitle.toString(), new Date(popoverDate2));
  };

  return (
    <IonModal isOpen={show} onDidDismiss={onCancel}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{editedCourse ? "Edit" : "Add"} Course</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Course Title</IonLabel>
                <IonInput
                  ref={titleInputRef}
                  type="text"
                  value={editedCourse?.title}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="fixed">Date</IonLabel>
                <IonGrid>
                  <IonRow>
                    <IonCol size-md="4" offset-md="7" size-xs="6" offset-xs="4">
                      <IonInput
                        id="date-input-2"
                        value={popoverDate2.toString()}
                      />
                    </IonCol>
                    <IonCol size="1">
                      <IonButton fill="clear" id="open-date-input-2">
                        <IonIcon icon={calendar} />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <IonPopover trigger="open-date-input-2" showBackdrop={false}>
                  <IonDatetime
                    presentation="date"
                    onIonChange={(e) => formatDate(e)}
                  />
                </IonPopover>
              </IonItem>
            </IonCol>
          </IonRow>
          {error && (
            <IonRow className="ion-text-center">
              <IonCol>
                <IonText color="danger">
                  <p>{error}</p>
                </IonText>
              </IonCol>
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

export default CoursesModal;
