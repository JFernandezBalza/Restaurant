import { AppDataSource } from "./config/data-source";
import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";

AppDataSource.initialize()
  .then(() => {
    console.log("Se realizo con exitó la conexión a la DB");
    server.listen(PORT, () => {
      console.log(`Server listening on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
