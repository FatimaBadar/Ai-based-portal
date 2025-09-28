import React, { useEffect, useState } from "react";
import { createUIElements } from "../services/api";
import { Card } from "primereact/card";

const RequirementDisplay = ({ onUIElements }) => {

// const RequirementDisplay = ()=> {
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
      // const response = await createUIElements(requirement.id);

      // console.log("UI Elements created successfully:", response);
      setLoading(false);

      //send this data to next component - generateUi so first back to app.js
      sendbackUIElements(true);
      // onUIELements(true)
    } catch (error) {
      console.error("Error creating UI elements:", error);
      setError("Failed to generate UI elements. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Card className="requirement-card">
      <h2 className="requirement-heading">Captured Requirements </h2>
      {/* <button onClick={onBack} className="btn btn-outline">
            <ArrowLeft size={16} style={{ marginRight: '8px' }} />
            Back
          </button> */}

      <div className="grid grid-2">
        <div className="card" style={{ margin: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            {/* <Zap size={24} color="#3b82f6" style={{ marginRight: '12px' }} /> */}
            <h3 style={{ fontSize: "1.1rem", color: "#1f2937" }}>App Name</h3>
          </div>
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "#3b82f6",
            }}
          >
            {requirement.appName}
          </p>
        </div>

        <div className="card" style={{ margin: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            {/* <Users size={24} color="#10b981" style={{ marginRight: '12px' }} /> */}
            <h3 style={{ fontSize: "1.1rem", color: "#1f2937" }}>User Roles</h3>
          </div>
          <div>
            {requirement.roles?.map((role, index) => (
              <span key={index} className="badge badge-primary">
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card" style={{ margin: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            {/* <Database size={24} color="#f59e0b" style={{ marginRight: '12px' }} /> */}
            <h3 style={{ fontSize: "1.1rem", color: "#1f2937" }}>Entities</h3>
          </div>
          <div>
            {requirement.entities?.map((entity, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "12px",
                  padding: "12px",
                  backgroundColor: "#f8fafc",
                  borderRadius: "8px",
                }}
              >
                <h4
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#374151",
                  }}
                >
                  {entity.name}
                </h4>
                <div>
                  {entity.fields?.map((field, fieldIndex) => (
                    <span
                      key={fieldIndex}
                      className="badge"
                      style={{ marginRight: "4px", marginBottom: "4px" }}
                    >
                      {field.name} ({field.type})
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ margin: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            {/* <Settings size={24} color="#8b5cf6" style={{ marginRight: '12px' }} /> */}
            <h3 style={{ fontSize: "1.1rem", color: "#1f2937" }}>Features</h3>
          </div>
          <div>
            {requirement.features?.map((feature, index) => (
              <span key={index} className="badge badge-success">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <button
          onClick={handleGenerateUI}
          className="btn btn-primary"
          disabled={loading}
          style={{ minWidth: "200px" }}
        >
          {loading ? (
            <div className="loading">
              <div
                className="spinner"
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              ></div>
              Generating UI...
            </div>
          ) : (
            <>
              {/* <ArrowRight size={20} style={{ marginRight: '8px' }} /> */}
              Generate UI
            </>
          )}
        </button>
      </div>
    </Card>
  );
};

export default RequirementDisplay;
