import React, { useEffect, useState } from "react";
import {Button} from "primereact/button"

const RequirementDisplay = ({ onUIElements }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requirement, setRequirement] = useState("");

  useEffect(() => {
    const storedRequirement = JSON.parse(localStorage.getItem("requirement"));
    setRequirement(storedRequirement);
  }, []);

  const sendbackUIElements = (data) => {
    onUIElements(data);
  };
  const handleGenerateUI = async (e) => {
    e.preventDefault();

    if (!requirement.id || requirement.id.trim() === "") {
      setError("Please enter a valid requirement.");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      setLoading(false);
      sendbackUIElements(true);
    } catch (error) {
      console.error("Error creating UI elements:", error);
      setError("Failed to generate UI elements. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="req-heading">
        Captured Requirements for App: {requirement.appName}{" "}
      </h2>
      <div className="requirements">
        <div className="req-box">
          <h3 className="label-type">Roles</h3>
          <div className="req-item" style={{ margin: 0 }}>
            {requirement.roles?.map((role, index) => (
              <p className="label-data" key={index}>
                {role}
              </p>
            ))}
          </div>

          <h3 className="label-type">Entities</h3>
          <div className="req-item" style={{ margin: 0 }}>
            {requirement.entities?.map((entity, index) => (
              <p className="label-data" key={index}>
                {entity.name}
              </p>
            ))}
          </div>

          <h3 className="label-type">Features</h3>
          <div className="req-item" style={{ margin: 0 }}>
            {requirement.features?.map((feature, index) => (
              <p className="label-data" key={index}>
                {feature}
              </p>
            ))}
          </div>
        </div>

        <div className="req-box">
          <h3 className="label-type">Entities </h3>
          <div style={{ margin: 0 }}>
            {requirement.entities?.map((entity, index) => (
                <div key={index} className="entity-fields">
                <h4>{entity.name}</h4>
                {entity.fields?.map((field, fieldIndex) => (
                <p key={fieldIndex} className="field">
                    {field.name} ({field.type})
                </p>
                ))}
              </div>
            ))}
          </div>
          </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <Button
          onClick={handleGenerateUI}
          // className="btn btn-primary"
          type="submit"
          disabled={loading}
          label="Generate UI"
          style={{ minWidth: "200px" }}
        >
          {/* {loading ? (
            <div className="loading">
              <div
                className="spinner"
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              ></div>
              Generating UI...
            </div>
          ) : (
            <>Generate UI</>
          )} */}
        </Button>
      </div>
    </div>
  );
};

export default RequirementDisplay;
