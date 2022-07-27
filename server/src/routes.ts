import { Router } from "express";

import { SettingsController } from "./controllers/SettingsController";
import { CustomersController } from "./controllers/CustomersController";
import { InstallmentsController } from "./controllers/InstallmentsController";
import { ManagersController } from "./controllers/ManagersController";
import { OccupationsController } from "./controllers/OccupationsController";
import { OrdersController } from "./controllers/OrdersController";
import { PaymentsController } from "./controllers/PaymentsController";
import { ProductCategoriesController } from "./controllers/ProductCategoriesController";
import { ProductsController } from "./controllers/ProductsController";
import { ProvidersControllers } from "./controllers/ProvidersController";
import { StockController } from "./controllers/StockController";
import { WorkersController } from "./controllers/WorkersController";
import { CollaboratorsController } from "./controllers/CollaboratorsController";
import { CollaboratorLogsController } from "./controllers/CollaboratorLogsController";
import { UsersController } from "./controllers/UsersController";
import { CashiersController } from "./controllers/CashiersController";

const routes = Router();

// Controllers
const settingsController = new SettingsController();
const usersController = new UsersController();
const managersController = new ManagersController();
const occupationsController = new OccupationsController();
const workersController = new WorkersController();
const customersController = new CustomersController();
const productCategoriesController = new ProductCategoriesController();
const productsController = new ProductsController();
const providersController = new ProvidersControllers();
const stockController = new StockController();
const ordersController = new OrdersController();
const paymentsController = new PaymentsController();
const installmentsController = new InstallmentsController();
const collaboratorsController = new CollaboratorsController();
const collaboratorLogsController = new CollaboratorLogsController();
const cashiersController = new CashiersController();

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
routes.post("/cashiers/", cashiersController.getCashiers);

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
routes.get("/customers", customersController.getCustomers);
routes.post("/customers/register", customersController.create);
routes.get("/customers/:email", customersController.getByEmail);
routes.delete("/customers/:email", customersController.removeByEmail);

// Routes for Product Categories
routes.post("/productcategories/register", productCategoriesController.create);
routes.get("/productcategories/", productCategoriesController.getProductCategories);
routes.get("/productcategories/:id", productCategoriesController.getProductCategoryById);
routes.put("/productcategories/:id", productCategoriesController.updateProductCategory);
routes.delete("/productcategories/:id", productCategoriesController.removeProductCategory);

// Routes for Products
routes.post("/products/register", productsController.create);
routes.get("/products/", productsController.getProducts);
routes.get("/products/:id", productsController.getProductById);
routes.put("/products/:id", productsController.updateProduct);
routes.delete("/products/:id", productsController.removeProduct);

// Routes for Providers
routes.post("/providers", providersController.create);
routes.get("/providers", providersController.getProviders);
routes.put("/providers/:id", providersController.updateProvider);
routes.delete("/providers/:id", providersController.removeProvider);

// Routes for Stock
routes.post("/stock", stockController.create);
routes.get("/stock", stockController.getStocks);
routes.get("/stock/product", stockController.getStocksByProduct);

// Routes for Orders
routes.post("/orders", ordersController.create);
routes.get("/orders", ordersController.getFullOrderInfo);
routes.get("/orders/:id", ordersController.getOrdersById);
routes.delete("/orders/:id", ordersController.removeOrder);

// Routes for Payments
routes.get('/payments/', paymentsController.getPayments);
routes.get('/payments/:id', paymentsController.getPaymentById);

// Routes for Installments 
routes.get("/installments/", installmentsController.getInstallments);
routes.get("/installments/:date", installmentsController.getInstallmentsByDate);
routes.get("/installments/:payment_id", installmentsController.getInstallmentsByPayment);
routes.put("/installments/:id", installmentsController.updateInstallment);

export { routes };