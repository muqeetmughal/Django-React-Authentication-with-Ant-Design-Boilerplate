// import './App.less';


import React, { useEffect, useRef, useState } from 'react'

import { useLocation } from 'react-router';
// import MainLayout from "./components/layouts/MainLayout"

// import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { useSelector } from 'react-redux';

import LoadingBar from 'react-top-loading-bar'
import RoutesConfig from './Routes';
import 'antd/dist/reset.css';
import { ConfigProvider, theme } from 'antd';


function App() {


  // const themes = {
  //   dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  //   light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
  // };



  // const { theme } = useSelector(state => state.theme)

  const location = useLocation()
  const ref = useRef(null)
  const [prevLoc, setPrevLoc] = useState("")
  const { customTheme, darkModeEnabled } = useSelector(state => state.theme)

  const { token } = theme.useToken()


  useEffect(() => {
    setPrevLoc(location.pathname)
    ref.current.continuousStart()
    if (location.pathname === prevLoc) {
      setPrevLoc('')
    }
  }, [location])

  useEffect(() => {
    ref.current.complete()
  }, [prevLoc])


  return (
    <div className="App">

      <ConfigProvider
        theme={{
          algorithm: darkModeEnabled ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: customTheme.token
        }}
        prefixCls="frq"
        iconPrefixCls='frq'
      >
        <LoadingBar ref={ref} color={token.colorPrimary} height={5}/>

        <RoutesConfig />
      </ConfigProvider>

    </div>
  );
}

export default App;
