import React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Grid, Button, Card, CardContent } from "@material-ui/core";
import AddEmployee from "components/addEmployee";
import { useHistory } from "react-router-dom";
import ShowAllEmployee from "components/showAllEmployee";
import Header from "components/header";
import { ROUTES } from "utils/enums";
import ShowFeedback from "components/showFeedback";

const useStyles = makeStyles({
  container: {
    position: "relative",
    top: "70px",
    padding: "10px",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isAdmin } = useSelector((state) => state.loginReducer);

  return (
    <>
      <Header />
      <div className={classes.container}>
        <Grid direction="row" container spacing={0}>
          <Grid container spacing={0} direction="column" item xs={3}>
            <Card
              variant="outlined"
              style={{
                height: "calc(100vh - 100px)",
              }}
            >
              <CardContent>
                {isAdmin && (
                  <>
                    <Button
                      color="primary"
                      onClick={() => history.push(ROUTES.ADD_EMPLOYEE)}
                    >
                      Add Employee
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => history.push(ROUTES.SHOW_ALL_EMPLOYEES)}
                    >
                      Show All Employee
                    </Button>
                  </>
                )}
                <>
                  <Button
                    color="primary"
                    onClick={() => history.push(ROUTES.DASHBOARD)}
                  >
                    SHow Feedbacks
                  </Button>
                </>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Switch>
              <Route path={ROUTES.SHOW_ALL_EMPLOYEES}>
                <ShowAllEmployee />
              </Route>
              <Route path={ROUTES.ADD_EMPLOYEE}>
                <AddEmployee />
              </Route>
              <Route path={ROUTES.DASHBOARD}>
                <ShowFeedback />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
