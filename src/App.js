import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Navigator, Page, Toolbar, BackButton } from "react-onsenui";
import LoginScreen from "./components/LoginScreen";
import OTPScreen from "./components/OTPScreen";
import HomeScreen from "./components/HomeScreen";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start with loading screen by default

  useEffect(() => {
    const token = Cookies.get("RATIFI_REDUX_TOKEN");
    if (token) {
      setIsLoggedIn(true);
    }
    setTimeout(() => setIsLoading(false), 500); // Simulate a short delay for smooth transition
  }, []);

  const handleBack = (navigator) => {
    if (navigator.routes && navigator.routes.length > 1) {
      navigator.popPage();
    } else {
      console.log("No pages to pop!");
    }
  };

  const renderToolbar = (title, navigator) => (
    <Toolbar>
      <div className="left">
        <BackButton  />
      </div>
      <div className="center">{title}</div>
    </Toolbar>
  );

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Navigator
      renderPage={(route, navigator) => {
        if (!route || !navigator) return null;
        const { title, component: Component, isRenderToolbar } = route;
        return (
          <Page
            renderToolbar={() => isRenderToolbar && renderToolbar(title, navigator)}
            // style={{ backgroundColor: "#FFFFFF" }} // Set background color to white
          
            contentStyle={{ padding: 10 }}
          >
            <Component
              key={route.key}
              route={route}
              navigator={navigator}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
            />
          </Page>
        );
      }}
      initialRoute={
        isLoggedIn
          ? {
              key: "home",
              title: "Home Screen",
              component: (props) => <HomeScreen {...props} />,
              isRenderToolbar: false,
            }
          : {
              key: "login",
              title: "Login Screen",
              component: (props) => <LoginScreen {...props} />,
              isRenderToolbar: false,
            }
      }
    />
  );
}

export default App;
