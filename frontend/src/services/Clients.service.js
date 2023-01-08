import api from '../common/api'

const ClientsService = {}


ClientsService.getClients = () => {
  return api
    .get("/clients/get_all")
};

ClientsService.listClients = () => {
  return api
    .get("/clients/list_clients")
};
ClientsService.createClient = (data) => {
  return api
    .post("/clients/create",
      data
    )
};
ClientsService.editClient = (id, data) => {
  return api
    .put(`/clients/edit/${id}`,
      data
    )
};
ClientsService.deleteClient = (data) => {
  return api
    .delete("/clients/delete", {
      data: data
    })
};
ClientsService.getSingleClient = (id) => {
  return api
    .get(`/clients/client_data/${id}`)
};

export default ClientsService;
