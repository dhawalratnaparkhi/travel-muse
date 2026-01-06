import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import GroupTours from "@/pages/GroupTours";
import CustomizedTour from "@/pages/CustomizedTour";
import Admin from "@/pages/Admin";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tours" component={GroupTours} />
      <Route path="/custom" component={CustomizedTour} />
      <Route path="/admin" component={Admin} />
    </Switch>
  );
}
