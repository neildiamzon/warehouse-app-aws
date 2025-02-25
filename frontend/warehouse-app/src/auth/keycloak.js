import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://<KEYCLOAK_VM_IP>:8080/",
  realm: "myrealm",
  clientId: "warehouse-app",
});

export default keycloak;