import { Router } from "express";

import { SettingsController } from "./controllers/SettingsController";
import { CustomersController } from "./controllers/CustomersController";
import { CustomerAddressesController } from "./controllers/CustomerAddressesController";
import { InstallmentsController } from "./controllers/InstallmentsController";
import { ManagersController } from "./controllers/ManagersController";
import { OccupationsController } from "./controllers/OccupationsController";
import { OrdersController } from "./controllers/OrdersController";
import { PaymentsController } from "./controllers/PaymentsController";
import { ProductCategoriesController } from "./controllers/ProductCategoriesController";
import { ProductsController } from "./controllers/ProductsController";
import { ProvidersControllers } from "./controllers/ProvidersController";
import { StockController } from "./controllers/StockController";
import { StockMovesController } from "./controllers/StockMovesController";
import { WorkersController } from "./controllers/WorkersController";
import { CollaboratorsController } from "./controllers/CollaboratorsController";
import { CollaboratorLogsController } from "./controllers/CollaboratorLogsController";
import { UsersController } from "./controllers/UsersController";
import { CashiersController } from "./controllers/CashiersController";
import { CashierMovesController } from "./controllers/CashierMovesController";
import { DoctorPrescriptionController } from "./controllers/DoctorPrescriptionController";

const routes = Router();

// Controllers
const settingsController = new SettingsController();
const usersController = new UsersController();
const managersController = new ManagersController();
const occupationsController = new OccupationsController();
const workersController = new WorkersController();
const customersController = new CustomersController();
const customerAddressesController = new CustomerAddressesController();
const productCategoriesController = new ProductCategoriesController();
const productsController = new ProductsController();
const providersController = new ProvidersControllers();
const stockController = new StockController();
const stockMovesController = new StockMovesController();
const ordersController = new OrdersController();
const paymentsController = new PaymentsController();
const installmentsController = new InstallmentsController();
const collaboratorsController = new CollaboratorsController();
const collaboratorLogsController = new CollaboratorLogsController();
const cashiersController = new CashiersController();
const cashierMovesController = new CashierMovesController();
const doctorPrescriptionController = new DoctorPrescriptionController();

// Routes for Settings
routes.post("/settings/create", settingsController.create);
routes.get("/settings/", settingsController.getSettings);

// Routes for Collaborators
routes.post("/collaborators/create", collaboratorsController.create);
routes.get("/collaborators/", collaboratorsController.getCollaborators);
routes.get("/collaborators/:id", collaboratorsController.getCollaboratorById);
routes.put("/collaborators/:id", collaboratorsController.updateCollaborator);
routes.delete("/collaborators/:id", collaboratorsController.deleteCollaborator);

// Routes for Collaborator Logs
routes.get("/collaborator/logs/", collaboratorLogsController.getCollaboratorsLogs);
routes.get("/collaborator/logs/:id", collaboratorLogsController.getCollaboratorLogsByCollaboratorId);

// Routes for Users
routes.post("/users/create", usersController.create);
routes.get("/users/", usersController.get);
routes.get("/users/:id", usersController.getById);
routes.put("/users/:id", usersController.update);
routes.put("/users/pass/:id", usersController.updatePassword);
routes.post("/users/:id", usersController.login);

// Routes for Cashiers
routes.post("/cashiers/create", cashiersController.create);
routes.get("/cashiers/", cashiersController.getCashiers);

// Routes for Cashier Moves
routes.post("/cashiers/moves/create", cashierMovesController.create);
routes.get("/cashiers/moves", cashierMovesController.get);
routes.get("/cashiers/moves/:id", cashierMovesController.getCashierMovesByCashierId);

// Routes for Managers
routes.post("/managers/register", managersController.create);
routes.post("/managers/login", managersController.login);
routes.post("/managers/token", managersController.authenticateToken);
routes.get("/managers/", managersController.getAllManagers);
routes.put("/managers/:id", managersController.updateManager);
routes.put("/managers/password/:id", managersController.changePassword);
routes.delete("/managers/:id", managersController.remove);

// Routes for Occupations
routes.post("/occupations/register",  occupationsController.create);
routes.get("/occupations/",  occupationsController.getOccupations);
routes.put("/occupations/:id",  occupationsController.updateOccupation);
routes.delete("/occupations/:id",  occupationsController.removeOccupation);

// Routes for Workers
routes.post("/workers/register", workersController.create);
routes.post("/workers/login", workersController.login);
routes.get("/workers/", workersController.getWorkers);
routes.put("/workers/:id", workersController.updateWorker);
routes.put("/workers/occupation/:id", workersController.changeWorkerOccupation);
routes.put("/workers/password/:id", workersController.changePassword);
routes.delete("/workers/:id", managersController.authorizationReq, workersController.removeWorker);

// Routes for Customers
routes.post("/customers/create", customersController.create);
routes.get("/customers", customersController.getCustomers);
routes.get("/customers/:id", customersController.getCustomerById);
routes.put("/customers/:id", customersController.update);
routes.delete("/customers/:id", customersController.remove);

// Routes for Customer Addresses
routes.post("/customeraddresses/create", customerAddressesController.create);
routes.get("/customeraddresses/:id", customerAddressesController.getCustomerAddressesByCustomerId);
routes.put("/customeraddresses/:id", customerAddressesController.update);
routes.delete("/customeraddresses/:id", customerAddressesController.remove);

// Routes for Products
routes.post("/products/register", productsController.create);
routes.get("/products/", productsController.getProducts);
routes.get("/products/:id", productsController.getProductById);
routes.put("/products/:id", productsController.updateProduct);
routes.delete("/products/:id", productsController.updateProductStatus);

// Routes for Providers
routes.post("/providers", providersController.create);
routes.get("/providers", providersController.getProviders);
routes.get("/providers/:id", providersController.getProviderById);
routes.put("/providers/:id", providersController.updateProvider);
routes.delete("/providers/:id", providersController.removeProvider);

// Routes for Stock
routes.post("/stocks/create", stockController.create);
routes.get("/stocks", stockController.getStocks);
routes.get("/stock/product", stockController.getStocksByProduct);
routes.put("/stock/:id", stockController.updateStockMinOrMax);

// Routes for Stock Moves
routes.post("/stockmoves/create", stockMovesController.create);
routes.get("/stockmoves/", stockMovesController.getStocks);
routes.get("/stockmoves/:id", stockMovesController.getStocksByStockId);

// Routes for Orders
routes.post("/orders", ordersController.create);
routes.get("/orders", ordersController.getFullOrderInfo);
routes.get("/orders/:id", ordersController.getOrdersById);
routes.delete("/orders/:id", ordersController.removeOrder);

// Routes for Payments
routes.get('/payments/', paymentsController.getPayments);
routes.get('/payments/:id', paymentsController.getPaymentById);

// Routes for Doctor Prescription
routes.post('/doctorprescription/create', doctorPrescriptionController.create);
routes.get('/doctorprescription/:id', doctorPrescriptionController.getDoctorPrescriptionBySaleId);
routes.put('/doctorprescription/:id', doctorPrescriptionController.update);

export { routes };