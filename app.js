const express = require("express");
const cors = require("cors");
const { authenticateDB } = require("./config/config");
const dotenv = require("dotenv");

// Setup environment variables
dotenv.config();

// Inisialisasi Express
const app = express();

app.use(cors());
app.use(express.json());

// Menghubungkan ke database terlebih dahulu sebelum menjalankan server
authenticateDB()
  .then(() => {
    // Routes
    const authRoutes = require("./routes/auth");
    app.use("/api/auth", authRoutes);

    const ForumRoutes = require("./routes/forum");
    app.use("/api/forum", ForumRoutes);

    const ProductRoutes = require("./routes/product");
    app.use("/api/product", ProductRoutes);

    const CategoryRoutes = require("./routes/category");
    app.use("/api/category", CategoryRoutes);

    const SuggestionRoutes = require("./routes/suggestion");
    app.use("/api/suggestion", SuggestionRoutes);

    const WebinarRoutes = require("./routes/webinar");
    app.use("/api/webinar", WebinarRoutes);

    const UserRoutes = require("./routes/user");
    app.use("/api/user", UserRoutes);

    // Menjalankan server pada port yang diberikan oleh Vercel
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Tidak dapat terhubung ke database:", err);
  });
