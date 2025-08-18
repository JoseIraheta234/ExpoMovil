// Core modules
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Rutas de autenticación y usuarios
import registerClientsRoutes from "./src/routes/registerClients.js";
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import passwordRecoveryRoutes from "./src/routes/passwordRecovery.js";
import profileRoutes from "./src/routes/profile.js";

// Rutas de recursos principales
import clientsRoutes from "./src/routes/clients.js";
import employeesRoutes from "./src/routes/Employees.js";
import vehiclesRoutes from "./src/routes/vehicles.js";
import reservationsRoutes from "./src/routes/reservas.js";
import contractsRoutes from "./src/routes/contratos.js";
import maintenancesRoutes from "./src/routes/mantenimientos.js";
import brandsRoutes from "./src/routes/brands.js";

// Rutas utilitarias y de comunicación
import sendWelcomeRoutes from "./src/routes/sendWelcome.js";
import contactRoutes from "./src/routes/contact.js";

const app = express();


// Configuración de CORS
// Permitir solicitudes desde localhost:5173 y localhost:5174
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Rutas de autenticación y usuarios
app.use("/api/registerClients", registerClientsRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/passwordRecovery", passwordRecoveryRoutes);
app.use("/api/profile", profileRoutes);

// Rutas de recursos principales
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/vehicles", vehiclesRoutes);
app.use("/api/reservas", reservationsRoutes);
app.use("/api/contracts", contractsRoutes);
app.use("/api/maintenances", maintenancesRoutes);
app.use("/api/brands", brandsRoutes);


// Rutas utilitarias y de comunicación
app.use("/api/sendWelcome", sendWelcomeRoutes);
app.use("/api/contact", contactRoutes);


export default app;