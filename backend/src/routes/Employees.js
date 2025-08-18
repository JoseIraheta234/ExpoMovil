import express from "express";
import EmpleadosController from "../controllers/EmployeesController.js";

const router = express.Router();

router.route("/")
  .get(EmpleadosController.getEmpleados)
  

router.route("/:id")
  .get(EmpleadosController.getEmpleadoById)
  
  .delete(EmpleadosController.deleteEmpleado);

export default router;