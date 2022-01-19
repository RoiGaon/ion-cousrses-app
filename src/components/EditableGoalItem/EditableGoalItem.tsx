import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import { create, trash } from "ionicons/icons";
import React from "react";

interface Props {
  slidingRef: React.Ref<HTMLIonItemSlidingElement>;
  onStartDelete: () => void;
  onStartEdit: (event: React.MouseEvent) => void;
  text: string;
}

const EditableGoalItem: React.FC<Props> = ({
  slidingRef,
  onStartDelete,
  onStartEdit,
  text,
}) => {
  return (
    // option 2
    <IonItemSliding ref={slidingRef}>
      <IonItemOptions side="start">
        <IonItemOption onClick={onStartDelete} color="danger">
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
      </IonItemOptions>
      <IonItem
        lines="full"
        // option 1
        // button
        // onClick={deleteItemHandler}
      >
        <IonLabel>{text}</IonLabel>
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
        <IonItemOption onClick={onStartEdit} color="tertiary">
          <IonIcon slot="icon-only" icon={create} color="warning" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default EditableGoalItem;
