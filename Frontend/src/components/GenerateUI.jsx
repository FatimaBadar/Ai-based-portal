import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";

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

  return (
    <Card className="ui-card">
      <h2 className="requirement-heading">{requirement.appName} </h2>

      <TabView>
        {requirement.roles?.map((role, roleIndex) => (
          <TabPanel key={roleIndex} header={role}>
            {uiElements
              .filter((ui) => ui.role == role)
              .map((item, index) => (
                <Card className="description-card" key={index}>
                  <h3>{item.name}</h3>
                  <form>
                    {item.fields?.map((field, fieldIndex) => (
                      <div key={fieldIndex}>
                        <label htmlFor={field.name}>
                          {field.name.charAt(0).toUpperCase() +
                            field.name
                              .replace(/([a-z])([A-Z])/g, "$1 $2")
                              .slice(1)}
                        </label>
                        <InputText
                          id={field._id}
                          type={field.type}
                          name={field.name}
                          required={field.required}
                          // placeholder={field.placeholder}
                          className="w-12rem"
                        />
                      </div>
                    ))}

                    <div className="actions">
                      <Button
                        // key={actionIndex}
                        type="submit"
                        label={item.action.toUpperCase()}
                        name={item.action.replace(" ","")}
                        className="m-2"
                      />
                    </div>

                    {error != "" && <Message severity="error" text={error} />}
                  </form>
                </Card>
              ))}

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
    </Card>
  );
};

export default GenerateUI;
