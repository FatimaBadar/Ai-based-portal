import "./App.css";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { Divider } from "primereact/divider";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useState, useEffect } from "react";
import { analyzeRequirements } from "./services/api";
import RequirementDisplay from "./components/RequirementDisplay";
import GenerateUI from "./components/GenerateUI";

function App() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uiElements, setUiElements] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const [requirement, setRequirement] = useState("");

  useEffect(() => {
    const storedRequirement = JSON.parse(localStorage.getItem("requirement"));
    setRequirement(storedRequirement);

    const storedActiveStep = JSON.parse(localStorage.getItem("activeStep"));
    if (storedActiveStep !== null) {
      setActiveStep(storedActiveStep);
      console.log("active step (from storage):", storedActiveStep);
    }

    // if (storedRequirement) {
    //   setActiveStep(2);
    // }
    // if (uiElements) {
    //   setActiveStep(3);
    // }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!description || description.trim() === "") {
      setError("Please enter a valid description.");
      setLoading(false);
      return;
    }
    // setLoading(true);

    try {
      const response = await analyzeRequirements(description);
      setRequirement(response);

      localStorage.setItem("requirement", JSON.stringify(response));

      setActiveStep(2);

      localStorage.setItem("activeStep", JSON.stringify(2));
    } catch (error) {
      console.error("Error analyzing requirements:", error);
      setError(
        "There was an error analyzing the requirements. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateUI = (ui) => {
    setUiElements(ui);
    // setLoading(true);
    // setUiElements(ui.UIElements);
    // localStorage.setItem("UIElements", JSON.stringify(ui.UIElements));
    setActiveStep(3);
    localStorage.setItem("activeStep", JSON.stringify(3));
    // setLoading(false);
  };

  const resetRequirements = () => {
    localStorage.removeItem("requirement");
    localStorage.removeItem("activeStep");
    setRequirement("");
    setActiveStep(1);
  };

  return (
    <div className="App">
      <Card className="header">
        <h1>Mini AI App Builder</h1>
        <p>Describe your app and watch AI generate a working UI prototype</p>
      </Card>

      <Card className="topbar">
        <div className="tab-bar">
          <div className="step">
            <Badge
              value="1"
              size="large"
              severity={activeStep === 1 ? "primary" : "info"}
            ></Badge>
            <div className="step-label">Describe Your App</div>
          </div>

          <div className="twoDividers">
            <Divider align="center" />
            <Divider align="center" />
          </div>

          <div className="step">
            <Badge
              value="2"
              size="large"
              severity={activeStep === 2 ? "primary" : "info"}
            ></Badge>
            <div className="step-label">Review Requirements</div>
          </div>

          <div className="twoDividers">
            <Divider align="center" />
            <Divider align="center" />
          </div>

          <div className="step">
            <Badge
              value="3"
              size="large"
              severity={activeStep === 3 ? "primary" : "info"}
            ></Badge>
            <div className="step-label">Generate UI</div>
          </div>
        </div>
      </Card>

      {/* <div className="lower-part"> */}
      <Card className="description-card">
        <Button
          className="reset-req"
          // type="submit"
          label="Reset Requirements"
          icon="pi pi-undo"
          // loading={loading}
          onClick={resetRequirements}
        />

      {activeStep == 1 && (
        // <Card className="description-card">
          <form onSubmit={handleSubmit}>
            <div className="description-form">
              <label htmlFor="description" className="description-label">
                Enter your prompt for App Description here
              </label>
              <InputTextarea
                id="description"
                className="form-textarea"
                value={description}
                placeholder="Example: I want an app to manage student courses and grades. Teachers can add courses, students can enroll, and admins can manage reports and analytics..."
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                cols={30}
                // disabled={loading}
              />
              {error != "" && <Message severity="error" text={error} />}
              <Button
                type="submit"
                label="Analyze Requirements"
                icon="pi pi-bolt"
                loading={loading}
              />
            </div>
          </form>
        // </Card>
      )}

      {requirement && activeStep == 2 && (
        <RequirementDisplay
          onUIElements={handleGenerateUI}
        />
      )}
      {activeStep == 3 && (
        <GenerateUI
        />
      )}
            </Card>

    </div>
  );
}

export default App;
