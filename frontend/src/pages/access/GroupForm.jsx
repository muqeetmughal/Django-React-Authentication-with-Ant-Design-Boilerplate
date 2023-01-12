import { Button, Col, Form, Input, Modal, Row, Select, message } from 'antd';
import api from 'common/api';
import { toCapitalize } from 'common/functions';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups, handleFormModalCancel, setFormOpen, setSelected } from 'redux/features/accessSlice';

const GroupFormModal = () => {
    const dispatch = useDispatch()
    // const [formValues, setFormValues] = useState({})

    const { selected, formOpen, formMode } = useSelector(state => state.access)





    useEffect(() => {

        console.log("Modal rendered")



    }, [])

    return (


        <Modal
            title={`${toCapitalize(formMode)} Group`}
            width={700}
            open={formOpen}
            footer={null}
            maskClosable={true}
            destroyOnClose={true}
            onCancel={() => dispatch(handleFormModalCancel())}
        >
            {/* {JSON.stringify(selected)} */}
            <GroupForm />
        </Modal>
    )
}

export default GroupFormModal



export const GroupForm = () => {

    const dispatch = useDispatch()
    // const [formValues, setFormValues] = useState({})

    const { selected, formOpen, formMode, permissions_list, formValues } = useSelector(state => state.access)

    const [form] = Form.useForm();


    const onFinish = (values) => {

        if (formMode === "add") {
            api.post("/groups/", values)
                .then((resp) => {

                    if (resp.status === 201) {

                        form.resetFields()
                        dispatch(handleFormModalCancel())

                        dispatch(fetchGroups())
                        message.success(resp.statusText)
                    } else {
                        console.log(resp)
                    }
                })
                .catch((err) => {
                    console.log(err.response.data)
                    Promise.reject(err)
                })

        } else if (formMode === "edit") {
            api.put(`/groups/${formValues.id}/`, values)
                .then((resp) => {

                    if (resp.status === 200) {

                        form.resetFields()

                        dispatch(handleFormModalCancel())

                        dispatch(fetchGroups())

                        message.success("Updated Successfully")
                    } else {
                        message.error("Cannot update please check console")
                        console.log(resp)
                    }
                })
                .catch((err) => {
                    console.log(err.response.data)
                    Promise.reject(err)
                })
        }

    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <Row gutter={[8, 8]}>
                <Form
                    autoComplete="off"
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    style={{ width: "100%" }}
                    initialValues={formValues}
                >
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />

                            </Form.Item>
                            <Form.Item
                                name="permissions"
                                label="Permissions"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    placeholder="Please select"
                                    options={permissions_list}

                                    fieldNames={{ label: "name", value: "id" }}
                                />
                        

                            </Form.Item>
                        </Col>
                        {/* <Col span={12}>
                        </Col> */}
                    </Row>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>


                </Form>
            </Row>
        </>
    )
}
