import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import Tours from "@/pages/GroupTours";
import CustomTour from "@/pages/CustomizedTour";
import GroupTourDetails from "@/pages/GroupTourDetails";
import Admin from "@/pages/Admin";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tours" component={Tours} />
      <Route path="/tours/:id" component={GroupTourDetails} />
      <Route path="/custom" component={CustomTour} />
      <Route path="/admin" component={Admin} />

      {/* Fallback */}
      <Route>
        <div style={{ padding: 40 }}>
          <h1>404 – Page not found</h1>
        </div>
      </Route>
    </Switch>
  );
}
