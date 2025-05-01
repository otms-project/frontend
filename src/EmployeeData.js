import { useState, useEffect } from 'react';
import * as React from "react";
import { Grid, StatsCard, Card, colors } from 'tabler-react';
import C3Chart from "react-c3js";

function generateResult(input) {
  if (input === undefined) {
    return 0;
  } else {
    return input;
  }
}

// 1. List total employees
export function ListAllEmployees() {
  const [stats, handleStats] = useState([]);

  const FetchData = async () => {
    const data = await fetch('/api/v1/employee/search/all');
    const stats = await data.json();
    handleStats(stats);
  }

  useEffect(() => {
    FetchData();
  }, []);

  const empData = stats.length;

  return (
    <Grid.Col sm={3}>
      <StatsCard 
        layout={1} 
        movement={0} 
        total={empData} 
        label="Total Employees" 
      />
    </Grid.Col>
  );
}

// 2. List Active Employees
export function ListEmployeeActiveEmployee() {
  const [stats, handleStats] = useState([]);

  const FetchData = async () => {
    const data = await fetch('/api/v1/employee/search/all');
    const stats = await data.json();
    handleStats(stats);
  }

  useEffect(() => {
    FetchData();
  }, []);

  const activeCount = stats.filter(emp => 
    emp.status === "Active" || emp.status === "Current Employee"
  ).length;

  return (
    <Grid.Col sm={3}>
      <StatsCard
        layout={1}
        movement={0}
        total={generateResult(activeCount)}
        label="Active Employees"
      />
    </Grid.Col>
  );
}

// 3. List Inactive/Ex-Employees
export function ListEmployeeInActiveEmployee() {
  const [stats, handleStats] = useState([]);

  const FetchData = async () => {
    const data = await fetch('/api/v1/employee/search/all');
    const stats = await data.json();
    handleStats(stats);
  }

  useEffect(() => {
    FetchData();
  }, []);

  const inactiveCount = stats.filter(emp => 
    emp.status === "Ex-Employee" || emp.status === "Inactive"
  ).length;

  return (
    <Grid.Col sm={3}>
      <StatsCard
        layout={1}
        movement={0}
        total={generateResult(inactiveCount)}
        label="Ex-Employees"
      />
    </Grid.Col>
  );
}

// 4. Role Distribution Chart
export function RoleDistribution() {
  const [stats, handleStats] = useState([]);

  const FetchData = async () => {
    const data = await fetch('/api/v1/employee/search/all');
    const stats = await data.json();
    handleStats(stats);
  }

  useEffect(() => {
    FetchData();
  }, []);

  const devopsCount = stats.filter(emp => emp.designation === "DevOps").length;
  const developerCount = stats.filter(emp => emp.designation === "Developer").length;

  return (
    <Grid.Col sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Job Role Distribution</Card.Title>
        </Card.Header>
        <Card.Body>
          <C3Chart
            style={{ height: "12rem" }}
            data={{
              columns: [
                ["DevOps", generateResult(devopsCount)],
                ["Developer", generateResult(developerCount)],
              ],
              type: "donut",
              colors: {
                data1: colors["green"],
                data2: colors["green-light"],
              },
              names: {
                data1: "DevOps",
                data2: "Developer",
              },
            }}
            legend={{ show: false }}
            padding={{ bottom: 0, top: 0 }}
          />
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}

// 5. Location Distribution Chart
export function LocationDistribution() {
  const [stats, handleStats] = useState([]);

  const FetchData = async () => {
    const data = await fetch('/api/v1/employee/search/all');
    const stats = await data.json();
    handleStats(stats);
  }

  useEffect(() => {
    FetchData();
  }, []);

  const delhiCount = stats.filter(emp => emp.office_location === "Delhi").length;
  const bangaloreCount = stats.filter(emp => emp.office_location === "Bangalore").length;
  const hyderabadCount = stats.filter(emp => emp.office_location === "Hyderabad").length;
  const newyorkCount = stats.filter(emp => emp.office_location === "Newyork").length;

  return (
    <Grid.Col sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Locations Distribution</Card.Title>
        </Card.Header>
        <Card.Body>
          <C3Chart
            style={{ height: "12rem" }}
            data={{
              columns: [
                ["Delhi", generateResult(delhiCount)],
                ["Bangalore", generateResult(bangaloreCount)],
                ["Hyderabad", generateResult(hyderabadCount)],
                ["Newyork", generateResult(newyorkCount)],
              ],
              type: "donut",
              colors: {
                data1: colors["blue-darker"],
                data2: colors["blue"],
                data3: colors["blue-light"],
                data4: colors["blue-lighter"],
              },
              names: {
                data1: "Delhi",
                data2: "Bangalore",
                data3: "Hyderabad",
                data4: "Newyork",
              },
            }}
            legend={{ show: false }}
            padding={{ bottom: 0, top: 0 }}
          />
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}

// 6. Status Distribution Chart
export function StatusDistribution() {
  const [stats, handleStats] = useState([]);

  const FetchData = async () => {
    const data = await fetch('/api/v1/employee/search/all');
    const stats = await data.json();
    handleStats(stats);
  }

  useEffect(() => {
    FetchData();
  }, []);

  const activeCount = stats.filter(emp => 
    emp.status === "Active" || emp.status === "Current Employee"
  ).length;
  const inactiveCount = stats.filter(emp => 
    emp.status === "Ex-Employee" || emp.status === "Inactive"
  ).length;

  return (
    <Grid.Col sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Employees Distribution</Card.Title>
        </Card.Header>
        <Card.Body>
          <C3Chart
            style={{ height: "12rem" }}
            data={{
              columns: [
                ["Current Employees", generateResult(activeCount)],
                ["Ex-Employees", generateResult(inactiveCount)],
              ],
              type: "donut",
              colors: {
                data1: colors["blue-darker"],
                data2: colors["blue"],
              },
              names: {
                data1: "Current Employees",
                data2: "Ex-Employees",
              },
            }}
            legend={{ show: false }}
            padding={{ bottom: 0, top: 0 }}
          />
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}

