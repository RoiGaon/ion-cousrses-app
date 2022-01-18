import { Route, Redirect } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { CourseTabsPage, FilterPage } from "./pages";
import { list, options } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/theme.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonMenu contentId="main">
        <IonToolbar>
          <IonTitle>Course Goals</IonTitle>
        </IonToolbar>
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem
                button
                routerLink="/courses/all-goals"
                routerDirection="none"
              >
                <IonIcon slot="start" icon={list} />
                <IonLabel>All Goals</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem button routerLink="/filter">
                <IonIcon slot="start" icon={options} />
                <IonLabel>Filter</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id="main">
        <Route exact path="/filter" component={FilterPage} />
        <Route path="/courses" component={CourseTabsPage} />
        <Redirect exact path="/" to="courses/list" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
