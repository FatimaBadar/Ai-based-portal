import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";

const GenerateUI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [uiElements, setUiElements] = useState("");
  // const [roleEntities, setRoleEntities] = useState("");

  useEffect(() => {
    const storedElements = JSON.parse(localStorage.getItem("UIElements"));

    setUiElements(storedElements);
    if (uiElements) {
      console.log("Received UI Elements:", uiElements);
    }
  }, []);

  return (
    <Card className="ui-card">
      <h2 className="requirement-heading">{uiElements.appName} </h2>

      <TabView>
        {/* {uiElements.navigation?.role.map((item, index) => {
          // Filter entities for this role
          const roleEntities =
            uiElements.navigation.entities.filter((entity) =>
              entity.roles.includes(item.label)
            ) || []; */}

            {/* return( */}
            {uiElements.navigation?.role.map((item, index) => (

          <TabPanel key={index} header={item.label}>
            {item.content.forms?.map((form, formIndex) => (
              // {item.content.forms?.map((form, formIndex) => (
              <Card className="description-card" key={formIndex}>
                <h3>{form.title}</h3>
                <form>
                  {form.fields?.map((field, fieldIndex) => (
                    <div key={fieldIndex}>
                      <label htmlFor={field.label}>{field.label}</label>
                      <InputText
                        id={field.id}
                        type={field.type}
                        name={field.label}
                        required={field.required}
                        placeholder={field.placeholder}
                        className="w-12rem"
                      />
                    </div>
                  ))}

                  <div className="actions">
                    {form.actions?.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        type={action.type}
                        label={action.label}
                        className="m-2"
                      />
                    ))}
                  </div>

                  {error != "" && <Message severity="error" text={error} />}
                </form>
              </Card>
            ))}

             {/* Optional: Render role-specific features */}
              <div className="role-features">
                {item.content?.features?.map((feature, featureIndex) => (
                  <Button
                    key={featureIndex}
                    label={feature.label}
                    className="m-2"
                    variant={feature.variant || "outline"}
                  />
                ))}
              </div>
          </TabPanel>
      //  {/* ); 
      ))}
      </TabView>
    </Card>
  );
};

export default GenerateUI;
