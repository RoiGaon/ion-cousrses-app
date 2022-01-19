import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { list, trophyOutline } from "ionicons/icons";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { AllGoalsPage, CourseGoalsPage, CoursesPage } from ".";

const CourseTabsPage: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/courses" to="/courses/all-goals" />
        <Switch>
          <Route exact path="/courses/list" component={CoursesPage} />
          <Route exact path="/courses/all-goals" component={AllGoalsPage} />
          <Route exact path="/courses/:courseId" component={CourseGoalsPage} />
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="all-goals" href="/courses/all-goals">
          <IonIcon icon={list} />
          <IonLabel>All Goals</IonLabel>
        </IonTabButton>
        <IonTabButton tab="courses" href="/courses/list">
          <IonIcon icon={trophyOutline} />
          <IonLabel>Courses</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default CourseTabsPage;
