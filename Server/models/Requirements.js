import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    required: { type: Boolean, default: false }
});

const EntitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    fields: [FieldSchema],
    roles: [String] // roles that can access this entity
});

const FormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fields: [FieldSchema],
    role: { type: String, required: true },
    action: { type: String, required: true },
})

const RequirementSchema = new mongoose.Schema({
    appName: { type: String, required: true },
    description: { type: String, required: true },
    entities: [EntitySchema],
    roles: [String],
    features: [String],
    form: [FormSchema],
    createdAt: { type: Date, default: Date.now }
});

export const Requirement = mongoose.model("Requirement", RequirementSchema);