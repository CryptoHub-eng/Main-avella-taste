const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
app.get("/", (req, res) => {
  res.send("Avella Taste server is running.");
});
app.get("/api/products", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*");
    if (error) {
      console.error("SUPABASE ERROR:", error);
      return res.status(500).json({
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
    }
    res.json(data);
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({
      error: error.message
    });
  }
});
app.listen(PORT, () => {
  console.log(`Avella Taste server running on port ${PORT}`);
});
