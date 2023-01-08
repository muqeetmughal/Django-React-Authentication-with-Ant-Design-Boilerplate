import api from '../common/api'

const ItemsService = {}

ItemsService.createItem = (data) => {
    return api
        .post("/items/create", data)
};

ItemsService.deleteItem = (data) => {
    return api
        .delete("/items/delete", {
            data: data
        })
};

ItemsService.patchItem = (data) => {
    return api
        .patch("/items/update", data)
};
ItemsService.getSingleItem = (id) => {
    return api
        .get(`/items/item_data/${id}`)
};

ItemsService.createMemberFormSchema = () => {
    return api
        .get("/items/form/manager/create")
};
ItemsService.updateMemberFormSchema = () => {
    return api
        .get("/items/form/manager/update")
};


ItemsService.createFundFormSchema = () => {
    return api
        .get("/items/form/fund/create")
};
ItemsService.updateFundFormSchema = () => {
    return api
        .get("/items/form/fund/update")
};

ItemsService.createSubFundFormSchema = () => {
    return api
        .get("/items/form/subfund/create")
};
ItemsService.updateSubFundFormSchema = () => {
    return api
        .get("/items/form/subfund/update")
};


ItemsService.createShareClassFormSchema = () => {
    return api
        .get("/items/form/shareclass/create")
};
ItemsService.updateShareClassFormSchema = () => {
    return api
        .get("/items/form/shareclass/update")
};


ItemsService.createTaskFormSchema = () => {
    return api
        .get("/items/form/task/create")
};
ItemsService.updateTaskFormSchema = () => {
    return api
        .get("/items/form/task/update")
};
ItemsService.viewTaskFormSchema = () => {
    return api
        .get("/items/form/task/view")
};


ItemsService.listManagers = () => {
    return api
        .get("/items/query?output_format=parent&kind=manager")
};
ItemsService.listFunds = () => {
    return api
        .get("/items/query?output_format=parent&kind=fund")
};
ItemsService.listSubFunds = () => {
    return api
        .get("/items/query?output_format=parent&kind=subfund")
};
ItemsService.listShareClasses = () => {
    return api
        .get("/items/query?output_format=parent&kind=shareclass&active=true")
};



ItemsService.listNames = (kind) => {
    return api
        .get("/items/list_names/" + kind)
};



ItemsService.listChildNames = (id) => {
    return api
        .get("/items/list_children/" + id)
};





export default ItemsService;
