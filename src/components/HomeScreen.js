import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Button,
  List,
  ListItem,
  Page,
  Toolbar,
  Icon,
  Card,
} from "react-onsenui";
import LoginScreen from "./LoginScreen";
import CreateTenderScreen from "./CreateTenderScreen";
import ListTendersScreen from "./ListTenderScreen";
import ShowQuotesScreen from "./ShowQuotesScreen";
import {
  ChatOption,
  CirclePlay,
  Copy,
  History,
  Home,
  Logout,
  MailOption,
  RadialSelected,
  SettingsOption,
  System,
} from "grommet-icons";
import Nav from "./Nav";
import { Navbar } from "..";

const HomeScreen = ({ navigator, setIsLoggedIn }) => {
   const [language, setLanguage] = useState("en");
  const [organization, setOrganization] = useState({
    name: "",
    id: "",
  });

  const loadOrganizationDetails = () => {
    const orgName = Cookies.get("org_name");
    const orgId = Cookies.get("org_id");

    if (orgName && orgId) {
      setOrganization({ name: orgName, id: orgId });
    }
  };

  const clearOrganizationDetails = () => {
    Cookies.remove("RATIFI_REDUX_TOKEN");
    setOrganization({ name: "", id: "" });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    clearOrganizationDetails();
    navigator.pushPage({
      title: "Login",
      component: LoginScreen,
    });
  };

  const handleCreateTender = () => {
    navigator.pushPage({
      title: <Nav title="Upload Claim Status" />,
      component: CreateTenderScreen,
      isRenderToolbar: true,
    });
  };

  const handleListTenders = () => {
    navigator.pushPage({
      title: <Nav title="Video Tutorials" />,
      component: ListTendersScreen,
      isRenderToolbar: true,
    });
  };

  const handleShowQuotes = () => {
    navigator.pushPage({
      title: <Nav title="Help & Support" />,
      component: ShowQuotesScreen,
      isRenderToolbar: true,
    });
  };

  useEffect(() => {
    loadOrganizationDetails();
  }, []);

  return (
     <div
         style={{
           textAlign: "center",
           background: "#eee",
           paddingBottom: 10,
          //  padding: 10,
           height:'100vh'
         }}
         key={'key'} // Use key to force re-render on language change
       >
         <Navbar language={language} setLanguage={setLanguage} />
      <div style={{ padding: "20px" }}>
        {/* <List>
          <ListItem tappable onClick={handleCreateTender}>
            <div className="left">+</div>
            <div className="center">Upload Claim Status</div>
          </ListItem>
          <ListItem tappable onClick={handleListTenders}>
            <div className="left">
              <History size="small" />
            </div>
            <div className="center">Watch Tutorials</div>
          </ListItem>
          <ListItem tappable onClick={handleShowQuotes}>
            <div className="left">
              <MailOption size="small" />
            </div>
            <div className="center">Help & Support</div>
          </ListItem>
        </List> */}

        <Card style={{padding:10}}>
          {/* <div>Claims Menu</div> */}
          <div style={{ display: "flex",flexWrap:'wrap',justifyContent:'center'}}>
            <div
              onClick={handleCreateTender}
              style={{ width: 80, height: 100, margin: 5,marginBottom:5, }}
            >
              <div
                style={{
                  padding: "15px 10px",
                  border: "solid 3px  #5C7232",
                  background: "#5C7232",
                  borderRadius: 20,
                 textAlign:'center'
                }}
              >
                <Copy color="white" size="medium" />
              </div>
              <div
                style={{
                  marginTop: 5,
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#5C7232",
                  textAlign:'center'
                }}
              >
                Digital Record
              </div>
            </div>

            <div
              onClick={handleListTenders}
              style={{ width: 80, height: 100, margin: 5,marginBottom:5 }}
            >
              <div
                style={{
                  padding: "15px 10px",
                  border: "solid 3px #5C7232",
                  background: "#5C7232",
                  borderRadius: 20,
                  textAlign:'center'
                }}
              >
                <CirclePlay color="white" size="medium" />
              </div>
              <div
                style={{
                  marginTop: 5,
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#5C7232",
                  textAlign:'center'
                }}
              >
                Video Tutorials
              </div>
            </div>

            <div
              onClick={handleShowQuotes}
              style={{ width: 80, height: 100, margin: 5,marginBottom:5 }}
            >
              <div
                style={{
                  padding: "15px 10px",
                  border: "solid 3px  #5C7232",
                  background: "#5C7232",
                  borderRadius: 20,
                 textAlign:'center'
                }}
              >
                <ChatOption color="white" size="medium" />
              </div>
              <div
                style={{
                  marginTop: 5,
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#5C7232",
                  textAlign:'center'
                }}
              >
                Help & Support
              </div>
            </div>

            <div
              onClick={handleShowQuotes}
              style={{ width: 80, height: 100, margin: 5,marginBottom:5 }}
            >
              <div
                style={{
                  padding: "15px 10px",
                  border: "solid 3px  #5C7232",
                  background: "#5C7232",
                  borderRadius: 20,
                 textAlign:'center'
                }}
              >
                <SettingsOption color="white" size="medium" />
              </div>
              <div
                style={{
                  marginTop: 5,
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#5C7232",
                  textAlign:'center'
                }}
              >
                Profile & Settings
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div>
        {/* <div className="mt-2">
          Name - Siddharth Yadav <b></b>
        </div> */}
       
        <div className="mt-2">
          Internet -{" "}
          <b style={{ color: "green" }}>
            <span>Connected</span>{" "}
            <span>
              [<RadialSelected size="small" color="green" />]{" "}
            </span>
          </b>
        </div>
        <div className="mt-2">
          Sync - <b style={{ color: "green" }}>Completed</b>
        </div>
      </div>

      
      <div>
        <Button onClick={handleLogout} style={{marginTop:10,color:'white',background:"#5C7232"}}>
        
        <Logout color="white" size="small"/> {' '}
          <span style={{fontSize:'14px'}}>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default HomeScreen;
