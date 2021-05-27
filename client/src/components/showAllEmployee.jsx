import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { getEmployees } from "stores/slices/employee";
import EmployeeCard from "./employeeCard";

const ShowAllEmployee = () => {
  const dispatch = useDispatch();
  const { employeesReducer, loginReducer } = useSelector((state) => state);
  const { employeeList } = employeesReducer;
  const { employeeId } = loginReducer;
  const [fetchList, setFetchList] = useState(false);
  useEffect(() => {
    if (fetchList) {
      dispatch(getEmployees());
      setFetchList(false);
    }
  }, [fetchList]);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      alignItems="center"
      justify="center"
    >
      {!!employeeList?.length &&
        employeeList.map((employee) => {
          return employeeId !== employee._id ? (
            <Grid item xs={4} key={employee._id}>
              <EmployeeCard
                employee={employee}
                setFetchList={setFetchList}
              ></EmployeeCard>
            </Grid>
          ) : null;
        })}
    </Grid>
  );
};

export default ShowAllEmployee;
