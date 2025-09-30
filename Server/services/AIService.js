import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openaiClient = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HUGGING_FACE_API_KEY,
});

//Parse JSON
async function cleanAndParseJSON(responseText) {
  try {
    const clean = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/,\s*}/g, "}") // remove trailing commas in objects
      .replace(/,\s*]/g, "]") // remove trailing commas in arrays
      .replace(/(\r\n|\n|\r)/gm, "") // strip newlines
      .trim();

    const parsed = JSON.parse(clean);

    //remove duplicates in roles/features
    const { appName, entities, roles, features, form } = parsed;

    return {
      appName: appName || "Untitled App",
      entities: Array.isArray(entities) ? entities : [],
      roles: Array.isArray(roles) ? [...new Set(roles)] : [],
      features: Array.isArray(features) ? [...new Set(features)] : [],
      form: Array.isArray(form) ? form : [],
    };
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    
    // repairing by closing braces/brackets
    let repaired = responseText;
    const openCurly = (repaired.match(/{/g) || []).length;
    const closeCurly = (repaired.match(/}/g) || []).length;
    const openSquare = (repaired.match(/\[/g) || []).length;
    const closeSquare = (repaired.match(/]/g) || []).length;

    repaired += "}".repeat(openCurly - closeCurly);
    repaired += "]".repeat(openSquare - closeSquare);

    return JSON.parse(repaired);
  }
}

export async function ExtractRequirements(description) {
  try {
    const prompt = `Analyze the following app description and extract structured requirements.
        Description: "${description}"
    
        Output Rules:
        1. Return ONLY one valid JSON object (no text, no markdown, no comments).
        2. Do not include code fences or explanations.
        3. Always close all brackets and braces properly.
        4. If information is missing, use an empty string "" or empty array [].
        5. The JSON object must also include a "form" that maps features to entities and roles.
        6. The form specification must follow these rules:  
        - Each form belongs to exactly one role.  
        - Each form corresponds to one entity that the role has access to.  
        - The "action" field comes from features related to that entity.
        
        JSON Structure (must match exactly):
        {
        "appName": "extracted app name",
        "entities": [
            {
                "name": "entity name",
                "roles": ["role1", "role2", "roleN"],
                "fields": [
                    {"name": "field name1", "type": "string", "required": true},
                    {"name": "field name2", "type": "number", "required": false},
                    {"name": "field nameN", "type": "boolean", "required": true}
                ]
            }
        ],
        "roles": ["role1", "role2", "roleN"],
        "features": ["feature1", "feature2", "featureN"],
        "form": [
            {
                "name": "entity name",
                "role": "Role1",
                "fields": [
                    {"name": "field name1", "type": "string", "required": true},
                    {"name": "field name2", "type": "number", "required": false},
                    {"name": "field nameN", "type": "boolean", "required": true}
                ],
                "action": "action name"
            }
        ]
        }
        where N is a number >= 1
    `;

    const chatCompletion = await openaiClient.chat.completions.create({
      model: "deepseek-ai/DeepSeek-V3.1-Terminus:novita",
      // model: "openai/gpt-oss-20b:fireworks-ai",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 3000,
    });

    const response = chatCompletion.choices[0].message.content;
    console.log("AI Response:", response);

    if (response) {
      const parsed = await cleanAndParseJSON(response);
      if (parsed) {
        console.log("Parsed JSON:", parsed);
        return parsed;
      }
    }

    console.log("No JSON found, using fallback");
    return null;
  } catch (error) {
    console.error("AI extraction failed:", error);
    return null;
  }
}
