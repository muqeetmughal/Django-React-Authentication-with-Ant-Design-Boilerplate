import { Button, Modal } from 'antd';
import React, { } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormModal } from '../../../redux/features/global/globalSlice';


const FormModal = (props) => {

    const is_modal_open =  useSelector(state=>state.global.formModelopen)
    const dispatch = useDispatch()

    const showModal = () => {
        dispatch(setFormModal(true))
    };

    const handleOk = () => {
        dispatch(setFormModal(false))
    };

    const handleCancel = () => {
        dispatch(setFormModal(false))
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {props.text}
            </Button>
            <Modal style={{top:30}} footer={[]} width={1000} title={props.text} open={is_modal_open} onOk={handleOk} onCancel={handleCancel}>
                {props.children}
            </Modal>
        </>
    )
}

export default FormModal