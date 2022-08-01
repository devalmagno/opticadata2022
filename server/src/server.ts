import { http } from "./http";

const port = process.env.PORT || 3333;

http.listen(port, () => console.log("Server is running!"));