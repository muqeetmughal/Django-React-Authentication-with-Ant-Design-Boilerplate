import React from 'react'
import PropTypes from 'prop-types';
import { Table } from 'antd';
const FRQTable = (props) => {
    return (
        <>

            <Table
                columns={props.columns}
                dataSource={props.table_data}
                scroll={{
                    x: 1600,
                    y: "80vh"
                }}
                bordered={true}
                rowKey={(r) => r._id}
                size='small'
                pagination={{
                    position: ["bottomRight"],
                }}
                // loading={props.isTableDataLoading}
                // rowSelection={true}
                onRow={(record, rowIndex) => {

                    return {
                        //   onClick: event => {console.log(record, rowIndex, event)}, // click row
                        //   onDoubleClick: (event) => {alert(event)}, // double click row
                        //   onContextMenu: (event) => {console.log(event)}, // right button click row
                        //   onMouseEnter: event => {}, // mouse enter row
                        //   onMouseLeave: event => {}, // mouse leave row
                    };
                }}
            // onChange={handleTableChange}
            />


        </>
    )
}
// FRQTable.propTypes = {
//     table_data: PropTypes.array,
//     columns: PropTypes.array,
//     isTableDataLoading: PropTypes.bool,


// };
export default FRQTable