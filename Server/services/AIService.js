import { OpenAI } from "openai";
import dotenv from "dotenv";   

dotenv.config();

const openaiClient = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: process.env.HUGGING_FACE_API_KEY,
})

//Parse JSON
async function cleanAndParseJSON(responseText){ 
    try {
        const clean = responseText
        .replace(/,\s*}/g, "}") // remove trailing commas in objects
        .replace(/,\s*]/g, "]") // remove trailing commas in arrays
        .replace(/(\r\n|\n|\r)/gm, ""); // strip newlines

        const parsed = JSON.parse(clean);

        //remove duplicates in roles/features
        const { appName, entities, roles, features } = parsed;

        return {
            appName: appName || "Untitled App",
            entities: Array.isArray(entities) ? entities: [],
            roles: Array.isArray(roles) ? [...new Set(roles)] : [],
            features: Array.isArray(features) ? [...new Set(features)] : [],
        }
    }
    catch (error) {
        console.error("Failed to parse JSON:", error);
        return null;
    }
}

export async function ExtractRequirements(description) {
    try{
         const prompt = `Analyze this app description and extract structured requirement information.
        Return only valid JSON with no additional text.
        
        Also give me another JSON for creating a form. 
        Create a **form specification** that maps features to entities and roles:  
        - Each form belongs to exactly one role.  
        - Each form corresponds to one entity that the role has access to.  
        - Actions for the form should come from features related to that entity.  

        Description: "${description}"
        
        Return ONLY a JSON object with this exact structure:
        {
        "appName": "extracted app name",
        "entities": [
            {
            "name": "entity name",
            "roles": ["role1", "role2", "roleN"],
            "fields": [
                {"name": "field name1", "type": "string", "required": true},
                {"name": "field name2", "type": "number", "required": false},,
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
                {"name": "field name2", "type": "number", "required": false},,
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
            messages: [
                { role: "user", content: prompt }  
            ],
            temperature: 0.3,
            max_tokens: 1000,
        });

        const response = chatCompletion.choices[0].message.content;
        console.log("AI Response:", response);

        if(response) {
            const parsed = cleanAndParseJSON(response);
            if(parsed) {
                console.log("Parsed JSON:", parsed);
                return parsed;
            }
        }
        
        console.log("No JSON found, using fallback");
        return null;
    }
    catch (error) {
        console.error("AI extraction failed:", error);
        return null;
    }   
}

    