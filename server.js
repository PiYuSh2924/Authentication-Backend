import dotenv from "dotenv"
import express from "express";
import {connectDB} from "./database/db.js"
import homeRoutes from "./routes/home-routes.js"
import authRoutes from "./routes/auth-routes.js"
import adminRoutes from "./routes/admin-routes.js"
import uploadImageRoutes from "./routes/image-routes.js"
import uploadVideoRoutes from "./routes/video-routes.js"

dotenv.config()
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/image", uploadImageRoutes);
app.use('/api/video', uploadVideoRoutes)

app.listen(PORT, () => {
  console.log(`Server is now listeining to PORT ${PORT}`);
});