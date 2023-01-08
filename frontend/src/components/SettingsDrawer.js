import { Button, Checkbox, Drawer, Form, Select, Slider, Switch, theme } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setComponentSize, setDarkMode, setTheme } from '../redux/features/themeSlice';
import { IoColorPaletteOutline } from "react-icons/io5";
import {
  SettingOutlined
} from '@ant-design/icons';
const SettingsDrawer = () => {
  const [visible, setVisible] = useState(false);
  const { token } = theme.useToken();


  const [form] = Form.useForm();

  const dispatch = useDispatch()


  const { customTheme, darkModeEnabled } = useSelector(state => state.theme)

  // const { switcher, themes } = useThemeSwitcher();


  const showDrawer = () => {

    setVisible(true);
  };


  const onClose = () => {
    setVisible(false);
  };




  function onThemeFormChangeHandler(value) {


    console.log(value)



    let values = undefined;

    if (value.algorithm !== undefined) {


      dispatch(setDarkMode(value.algorithm))


    } else if (value.algorithm === undefined) {
      values = {

        token: {
          ...customTheme.token,
          ...value

        }
      }

      dispatch(setTheme(values))
    }

  }






  return (
    <>
      <Button size='large' type="text" icon={<SettingOutlined style={{ fontSize: "20px", color: token.colorPrimary }} />} onClick={showDrawer} />
      <Drawer title="Theme Settings" placement="right" onClose={onClose} open={visible}>


        <Form
          name="settingsForm"
          layout='vertical'
          form={form}
          initialValues={

            {
              algorithm: darkModeEnabled,
              ...customTheme.token
            }



          }
          onValuesChange={onThemeFormChangeHandler}
        >

          <Form.Item
            label="Theme Primary Color"
            name="colorPrimary"
            rules={[
              {
                required: false
              },
            ]}
          >
            <input type="color" />

          </Form.Item>

          <Form.Item
            label="Border Radius"
            name="borderRadius"
            rules={[
              {
                required: false
              },
            ]}
          >
            <Slider />

          </Form.Item>

          <Form.Item
            label="Dark Mode"
            name="algorithm"

            valuePropName='checked'
            rules={[
              {
                required: false
              },
            ]}
          >
            <Switch />

            {/* <Checkbox /> */}

          </Form.Item>



        </Form>



      </Drawer>
    </>
  );
};

export default SettingsDrawer;