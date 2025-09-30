import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const GenerateUI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [uiElements, setUiElements] = useState(
    // ]);
    [
      {
        _id: "",
        name: "",
        fields: [],
        role: "",
        action: [],
      },
    ]
  );
  const [requirement, setRequirement] = useState("");
  // const [roleEntities, setRoleEntities] = useState("");

  useEffect(() => {
    const storedRequirement = JSON.parse(localStorage.getItem("requirement"));
    if (storedRequirement) {
      setRequirement(storedRequirement);
      setUiElements(storedRequirement.form || []);
      console.log("Received req:", storedRequirement);
      console.log("Received UI Elements1:", storedRequirement.form || []);
    }
    // if (uiElements) {
    //   console.log("Received UI Elements:", uiElements);
    // }
  }, []);

  function isSingleWord(inputString) {
    const words = inputString.trim().split(/\s+/);
    return words.length === 1 && words[0] !== "";
  }

  function getActionLabel(item) {
    //if already 2 words, same
    if (!isSingleWord(item.action)) return item.action;
  
    //if 1 word
    else {
      if (item.action.toLowerCase().includes(item.name.toLowerCase())) {
        return (
          item.action.charAt(0).toUpperCase() + item.action.slice(1) +
          " " +
          item.role.charAt(0).toUpperCase() +
          item.role.replace(/([a-z])([A-Z])/g, "$1 $2").slice(1) +
          "s"
        );
      }
      return(
          item.action.charAt(0).toUpperCase() + item.action.slice(1) +
        " " +
        item.name.charAt(0).toUpperCase() +
        item.name.replace(/([a-z])([A-Z])/g, "$1 $2").slice(1) +
        "s");
      // return item.action + item.name;
    }

    // const action = item.action.trim();
    // const name = item.name.trim();
    // const role = item.role?.trim() || "";

    // // Case: if action is a single word AND it matches or relates to entity name
    // if (
    //   !isSingleWord(action) &&
    //   action.toLowerCase().includes(name.toLowerCase())
    // ) {
    //   // Use role instead (pluralize role)
    //   const pluralRole = role.endsWith("s") ? role : role + "s";
    //   console.log(`${action} ${pluralRole}`);
    //   return `${action} ${pluralRole}`;
    // }

    // // Case: if action already has entity name (like "Manage Grades")
    // if (action.toLowerCase().includes(name.toLowerCase())) {
    //   console.log(`${action}`);

    //   return action;
    // }

    // // Case: single-word action, append entity plural
    // if (isSingleWord(action)) {
    //   const pluralName = name.endsWith("s") ? name : name + "s";
    //   console.log(`${action} ${pluralRole}`);
    //   return `${action} ${pluralName}`;
    // }

    // // Fallback: return as is
    // return action;
  }

  function getFieldLabel(name) {
    return (
      name.charAt(0).toUpperCase() +
      name.replace(/([a-z])([A-Z])/g, "$1 $2").slice(1)
    );
  }

  return (
    <div>
      <h2 className="requirement-heading">{requirement.appName} </h2>

      <TabView>
        {requirement.roles?.map((role, roleIndex) => (
          <TabPanel key={roleIndex} header={role}>
            <div className="grid">
              <div className="col-12 md:col-6">
                {uiElements
                  .filter((ui) => ui.role == role)
                  .map((item, index) => (
                    <Card className="ui-card" key={index}>
                      <h2>{item.name} Management</h2>
                      <form className="form">
                        {item.fields?.map((field, fieldIndex) => (
                          <div key={fieldIndex} className="form-fields">
                            <label htmlFor={field.name}>
                              {getFieldLabel(field.name)}
                            </label>
                            <InputText
                              id={field._id}
                              type={field.type}
                              name={field.name}
                              required={field.required}
                              className="w-12rem"
                            />
                          </div>
                        ))}

                        <Button
                          type="submit"
                          label={getActionLabel(item)}
                          name={item.action.replace(" ", "")}
                          className="m-2"
                        />

                        {error != "" && (
                          <Message severity="error" text={error} />
                        )}
                      </form>
                    </Card>
                  ))}
              </div>
              <div className="col-12 md:col-6">
                <Card className="ui-table">
                  <h2>{role} Data</h2>
                  <DataTable value={uiElements.filter((ui) => ui.role == role)}>
                    <Column field="name" header="Entity" />
                    <Column field="action" header="Feature" />
                    <Column field="role" header="Role" />
                  </DataTable>
                </Card>

                {uiElements
                  .filter((ui) => ui.role === role)
                  .map((item, itemIndex) => (
                    <Card className="ui-table" key={itemIndex}>
                      <h2>{item.name} List</h2>

                      <DataTable value={item.fields || []}>
                        <Column
                          field="name"
                          header="Field Name"
                          body={(field) => getFieldLabel(field.name)} // Pass the field name
                        />
                        <Column field="type" header="Type" />
                        <Column field="required" header="Required" />
                      </DataTable>
                    </Card>
                  ))}
              </div>
            </div>

            {/* <div className="role-features">
              {item.content?.features?.map((feature, featureIndex) => (
                <Button
                  key={featureIndex}
                  label={feature.label}
                  className="m-2"
                  variant={feature.variant || "outline"}
                />
              ))}
            </div> */}

            {/* Table */}
          </TabPanel>
        ))}
      </TabView>
    </div>
  );
};

export default GenerateUI;
