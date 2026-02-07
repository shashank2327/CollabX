import express from "express"
import authRoutes from "./routes/auth.routes.js"

const app = express();
app.use(express.json())


// write all the end points here
app.use('/api/auth', authRoutes)




app.listen(3000, () => {
    console.log("Server started on port 3000");
})