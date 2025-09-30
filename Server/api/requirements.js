import { Router } from "express";
import { ExtractRequirements } from "../services/AIService.js";
import { Requirement } from "../models/Requirements.js";

// dotenv.config();
const router = Router();

router.post("/analyzeRequirement", async (req, res) => {
  try {
    const { description } = req.body;

    if (!description || description.trim().length === 0) {
      return res.status(400).json({ error: "Description is required" });
    }

    //Call service
    const analysisResult = await ExtractRequirements(description);
    if (analysisResult) {
      
      //Save to db
      const req = new Requirement({
        appName: analysisResult.appName,
        description: description,
        entities: analysisResult.entities,
        roles: analysisResult.roles,
        features: analysisResult.features,
        form: analysisResult.form
      });

      await req.save();

      const returnData = {
        id: req._id,
        appName: req.appName,
        entities: req.entities,
        roles: req.roles,
        features: req.features,
        form: req.form
      };
      return res.status(200).json({
        sucess: true,
        data: returnData,
      });
    } else {
      return res
        .status(500)
        .json({
          error: "Failed to analyze requirements",
          details: error.message,
        });
    }
  } catch (error) {
    console.error("Error in /analyzeRequirement:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
