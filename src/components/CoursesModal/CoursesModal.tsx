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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { calendar } from "ionicons/icons";
import React from "react";

export interface Course {
  id: string;
  title: string;
  enrolled: Date;
  goals: { id: string; title: string }[];
}

interface Props {
  show: boolean;
  onCancel: () => void;
  editedCourse: Course | null;
}

const CoursesModal: React.FC<Props> = ({ show, onCancel, editedCourse }) => {
  const [popoverDate2, setPopoverDate2] = React.useState<string | Date>("");

  const formatDate = (date: Date) => ({
    shortDate: date.toLocaleDateString("en-GB"),
    fullDate: date,
  });

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
                <IonInput type="text" value={editedCourse?.title} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="fixed">Date</IonLabel>
                <IonGrid>
                  <IonRow>
                    <IonCol size="6" offset="4">
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
                    onIonChange={(ev) =>
                      setPopoverDate2(
                        formatDate(new Date(ev.detail.value!)).shortDate
                      )
                    }
                  />
                </IonPopover>
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

export default CoursesModal;
