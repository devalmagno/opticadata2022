import { Router } from "express";

import { SettingsController } from "./controllers/SettingsController";
import { CustomersController } from "./controllers/CustomersController";
import { CustomerAddressesController } from "./controllers/CustomerAddressesController";
import { InstallmentsController } from "./controllers/InstallmentsController";
import { ManagersController } from "./controllers/ManagersController";
import { OccupationsController } from "./controllers/OccupationsController";
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
import { EyeInfoController } from "./controllers/EyeInfoController";
import { SalesController } from "./controllers/SalesController";
import { SaleProductsController } from "./controllers/SaleProductsController";

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
const paymentsController = new PaymentsController();
const installmentsController = new InstallmentsController();
const collaboratorsController = new CollaboratorsController();
const collaboratorLogsController = new CollaboratorLogsController();
const cashiersController = new CashiersController();
const cashierMovesController = new CashierMovesController();
const doctorPrescriptionController = new DoctorPrescriptionController();
const eyeInfoContrller = new EyeInfoController();
const salesController = new SalesController();
const saleProductsController = new SaleProductsController();

// Route to create Admin First Use User

// Routes for Settings
routes.post("/settings/create", settingsController.create);
routes.get("/settings/", settingsController.getSettings);

// Routes for Collaborators
routes.post("/collaborators/create", collaboratorsController.create);
routes.get("/collaborators/", collaboratorsController.getCollaborators);
routes.get("/collaborators/:id", collaboratorsController.getCollaboratorById);
routes.get("/collaborators/cpf/:cpf", collaboratorsController.getCollaboratorByCPF);
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
routes.post("/users/login/", usersController.login);
routes.post("/token", usersController.authenticateToken);

// Routes for Cashiers
routes.post("/cashiers/create", cashiersController.create);
routes.get("/cashiers/", cashiersController.getCashiers);
routes.get("/cashiers/:id", cashiersController.getCashierById);
routes.put("/cashiers/:id", cashiersController.closeCashier);

// Routes for Cashier Moves
routes.post("/cashiermoves/create", cashierMovesController.create);
routes.get("/cashiermoves", cashierMovesController.get);
routes.get("/cashiermoves/:id", cashierMovesController.getCashierMovesByCashierId);

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
routes.get("/stock/product/:id", stockController.getStocksByProduct);
routes.put("/stock/:id", stockController.updateStockMinOrMax);

// Routes for Stock Moves
routes.post("/stockmoves/create", stockMovesController.create);
routes.get("/stockmoves/", stockMovesController.getStocks);
routes.get("/stockmoves/:id", stockMovesController.getStocksByStockId);

// Routes for Payments
routes.post('/payments/create', paymentsController.create);
routes.get('/payments/', paymentsController.getPayments);
routes.get('/payments/sale/:id', paymentsController.getPaymentsBySaleId);
routes.get('/payments/:id', paymentsController.getPaymentById);
routes.put('/payments/:id', paymentsController.updatePaymentStatus);

// Routes for Doctor Prescription
routes.post('/doctorprescription/create', doctorPrescriptionController.create);
routes.get('/doctorprescription/', doctorPrescriptionController.getDoctorPrescriptions);
routes.get('/doctorprescription/:id', doctorPrescriptionController.getDoctorPrescriptionById);
routes.put('/doctorprescription/:id', doctorPrescriptionController.update);

// Routes for Eye Info
routes.post('/eyeinfo/create', eyeInfoContrller.create);
routes.get('/eyeinfo/', eyeInfoContrller.getEyeInfo);
routes.get('/eyeinfo/:id', eyeInfoContrller.getEyeInfoByDoctorPrescriptionId);
routes.put('/eyeinfo/:id', eyeInfoContrller.update);

// Routes for Sales
routes.post('/sales/create', salesController.create);
routes.get('/sales/', salesController.getSales);
routes.get('/sales/customer/:id', salesController.getSaleByCustomerId);
routes.get('/sales/doctorprescription/:id', salesController.getSaleByDoctorPrescriptionId);
routes.get('/sales/collaborator/:id', salesController.getSaleByCollaboratorId);
routes.put('/sales/deliveryday/:id', salesController.updateDeliveryDay);
routes.put('/sales/status/:id', salesController.updateSaleStatus);

// Routes for Sale Products
routes.post('/saleproducts/create', saleProductsController.create);
routes.get('/saleproducts/', saleProductsController.getSaleProducts);
routes.get('/saleproducts/sale/:id', saleProductsController.getSaleProductBySaleId);
routes.get('/saleproducts/product/:id', saleProductsController.getSaleByProductId);

export { routes };