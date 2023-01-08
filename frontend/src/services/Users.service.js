import api from '../common/api'

const UsersService = {}


UsersService.getUsers = () => {
  return api
    .get("/users/get_all")
};
UsersService.createUser = (data) => {
  return api
    .post("/users/create",
      data
    )
};
UsersService.editUser = (id, data) => {
  return api
    .put(`/users/edit/${id}`,
      data
    )
};
UsersService.changePassword = (id, data) => {
  return api
    .put(`/users/reset_password/${id}`,
      data
    )
};
UsersService.deleteUser = (data) => {
  return api
    .delete("/users/delete", {
      data: data
    })
};
UsersService.getSingleUser = (id) => {
  return api
    .get(`/users/user_data/${id}`)
};
UsersService.getRoles = () => {
  return api
    .get(`/users/get_roles`)
};
UsersService.getGroups = () => {
  return api
    .get(`/users/get_groups/department`)
};
export default UsersService;
