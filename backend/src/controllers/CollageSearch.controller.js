import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/Collage.json");

// Load full objects
let Colleges = [];

try {
  const data = fs.readFileSync(filePath, "utf8");
  Colleges = JSON.parse(data);
  console.log(`✅ Loaded colleges: ${Colleges.length}`);
} catch (err) {
  console.error("❌ Failed to load Collage.json:", err.message);
}

const Search = (req, res) => {
  try {
    const query = (req.query.query || "").toLowerCase();
    if (!query) return res.json([]);

    const result = Colleges
      .filter(({ name, state, city }) =>
        name?.toLowerCase().includes(query) ||
        state?.toLowerCase().includes(query) ||
        city?.toLowerCase().includes(query)
      )
      .slice(0, 10);

    return res.json(result);

  } catch (error) {
    console.error("❌ Search error:", error.message);
    return res.status(500).json({
      message: "Search failed",
      error: error.message
    });
  }
};

export default Search;
