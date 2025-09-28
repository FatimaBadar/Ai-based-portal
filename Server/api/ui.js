import { Router } from "express";
import { Requirement } from "../models/Requirements.js";
import { UI } from "../models/UI.js";

// dotenv.config();
console.log("In UI.js");
const router = Router();

router.post("/createUIElements", async (req, res) => {
  try {
    console.log("In /createUIElements route");
    const { requirementId } = req.body;

    if (!requirementId || requirementId.trim().length === 0) {
      return res.status(400).json({ error: "requirementId is required" });
    }

    //get the req
    const requirement = await Requirement.findById(requirementId);
    if (!requirement) {
      return res.status(404).json({ error: "Requirement not found" });
    }

    //generate UI for that req
    const uiElements = createUIElements(requirement);

    //save Ui elemtent to db
    const UIObject = new UI({
      requirementId: requirement._id,
      uiElements: uiElements,
    });
    await UIObject.save();

    console.log("UI Elements created and saved successfully", UIObject);
    res.json({
      success: true,
      data: {
        id: UIObject._id,
        requirementId: requirement._id,
        UIElements: uiElements,
      },
    });
  } catch (error) {
    console.error("Error in /saveUI:", error);
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
});

function createUIElements(requirement) {
  const { appName, features, roles, entities } = requirement;

  return {
    appName,
    role: roles.map((role) => ({
      id: role.toLowerCase(),
      label: role,
      content: roleContent(role, entities, features),
    })),
  };
}

function getFieldType(type) {
  switch (type) {
    case "string":
      return "text";
    case "number":
      return "number";
    case "date":
      return "date";
    case "email":
      return "email";
    case "boolean":
      return "checkbox";
    default:
      return "text";
  }
}

function roleContent(role, entities, features) {
  //entity for this role only
  const roleEntities = entities.filter((entity) => entity.roles.includes(role));

  const forms = roleEntities.map((entity) => ({
    id: entity.name.toLowerCase(),
    title: `${entity.name} Management`,
    fields: entity.fields.map((field) => ({
      id: field.name,
      label: field.name.charAt(0).toUpperCase() + field.name.slice(1),
      type: getFieldType(field.type),
      required: field.required,
      placeholder: `Enter ${field.name}`,
    })),
    actions: [
      { type: "submit", label: "Save" },
      { type: "reset", label: "Clear" },
    ],
  }));

  const tables = roleEntities.map((entity) => ({
    id: `${entity.name.toLowerCase()} Table`,
    title: `${entity.name} List`,
    headers: entity.fields.map((field) => ({
      key: field.name,
      label: field.name.charAt(0).toUpperCase() + field.name.slice(1),
    })),
    rows: [], // Data to be populated dynamically
  }));

  return {
    forms,
    tables,
    features: features.map((feature) => ({
      //   id: feature.toLowerCase().replace(/\s+/g, "-"),
      label: feature,
      type: "button",
      variant: "outline",
    })),
  };
}

export default router;
