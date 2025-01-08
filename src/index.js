import React, { useEffect, useState } from "react";
import axios from 'axios';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from "react-router-dom";
import { Modal, Button, Table, Pagination } from "react-bootstrap";
import { Stepper, Step } from "react-form-stepper";
import Cookies from "js-cookie"; // Import js-cookie
import { useTranslation } from "react-i18next"; // Import i18n for language support
import "./App.css";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import App from "./App";
import myLogo from './ratifi.png'
import myLogo2 from './ratifi-2.png'
import { Organization, Plan, ShareRounded, System } from "grommet-icons";
import { BASE_URL } from "./apiService";
import ReactPWAInstallProvider, { useReactPWAInstall } from "react-pwa-install";
import LoginScreen from "./components/LoginScreen";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"; // Import service worker registration





export const Navbar = (props) => {
  const { right,language,setLanguage } = props;
  const { t, i18n } = useTranslation(); // Initialize translation hooks
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language

  // Handle language change
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage); // Change language using i18n
    Cookies.set("selectedLanguage", newLanguage); // Store selected language in cookies
    if(setLanguage)
    setLanguage(newLanguage)
  };

  useEffect(() => {
    const savedLanguage = Cookies.get("selectedLanguage") || "en"; // Default to 'en' if not found
    setSelectedLanguage(savedLanguage);
    i18n.changeLanguage(savedLanguage);
  }, []);

  return (
    <nav className="navbar px-2">
      <div className="navbar-logo">
        <span style={{ border: "solid 1px white", padding: 4, borderRadius: "40%" }}>
          <img src="/ratifi.png" height={30} alt="logo" />
        </span>
        &nbsp; RatiFi Redux
      </div>
      <div className="my-2 center align-center" style={{ textAlign: "center", alignSelf: "center", justifySelf: "center" }}>
        <select style={{
          padding:5,
          borderRadius:5,
          backgroundColor:'#5B7133',
          fontWeight:'bold',
          color:'white',
          outline:'none',
          border:'none',
          textAlign:'center'
        }} value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="or">ଓଡିଆ</option>
        </select>

      </div>
      <div className="navbar-menu">
        {right ? (
          right
        ) : (
          <div className="dropdown mb-0">
            <div>
              <span style={{fontWeight:'bold'}}>Bharti Institue of Public Policy</span>
              <span style={{ minHeight: 50, marginLeft: 5 }}>
                <img src="/odisha-logo.png" height={40} alt="logo" style={{ resize: "contain" }} />
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};


const ProposalModal = ({ show, handleClose, demandId }) => {
  const [companyDetails, setCompanyDetails] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    cin: "",
    password: "",
    details: "",
    priceQuote: "",
    productQuote: "",
    attachments: [],
    productQuoteAttachmentUrl: "",
  });
  const [isAuth, setIsAuth] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Track if uploading is in progress
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true); // Set uploading state

    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = async () => {
            const base64Image = reader.result.split(",")[1];
            try {
              const response = await axios.post(
                `${BASE_URL}/upload`,
                {
                  base64Image,
                  documentType: "DOC",
                }
              );
              resolve(response.data.documentUrl);
            } catch (error) {
              alert("Failed to upload file: " + error.message);
              reject(error);
            }
          };
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });
      })
    );

    setFormData({ ...formData, attachments: [...formData.attachments, ...uploadedUrls] });
    setIsUploading(false); // Reset uploading state
  };

  const handleFileProductQuoteChange = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true); // Set uploading state

    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = async () => {
            const base64Image = reader.result.split(",")[1];
            try {
              const response = await axios.post(
                `${BASE_URL}/upload`,
                {
                  base64Image,
                  documentType: "DOC",
                }
              );
              resolve(response.data.documentUrl);
            } catch (error) {
              alert("Failed to upload file: " + error.message);
              reject(error);
            }
          };
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });
      })
    );

    setFormData({ ...formData, productQuoteAttachmentUrl: uploadedUrls[0] });
    setIsUploading(false); // Reset uploading state
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      try {
        const response = await fetch( `${BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyRegistrationNumber: formData.cin,
            password: formData.password,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setCompanyDetails(result?.user);
          setIsAuth(true);
          setCurrentStep(1);
        } else {
          alert("Invalid credentials. Please register using the SelliFi Mobile App.");
        }
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    } else if (currentStep === 1) {
      const proposalData = {
        content: formData.details,
        price_quote: formData.priceQuote,
        product_quote: formData?.productQuote,
        demand_id: parseInt(demandId),
        company_id: companyDetails?.companyId,
        company_name: companyDetails?.companyName,
        designation: companyDetails?.designation,
        full_name: companyDetails?.fullName,
        attachments: JSON.stringify(formData.attachments),
        product_quote_attachment_url: formData?.productQuoteAttachmentUrl,
      };

      try {
        const response = await fetch(`${BASE_URL}/proposals`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(proposalData),
        });

        if (response.ok) {
          alert("Proposal submitted successfully");
          setTimeout(() => {
            handleClose();
            navigate("/");
          }, 500);
        } else {
          const error = await response.json();
          alert(`Error: ${error.error}`);
        }
      } catch (err) {
        alert(`Failed to submit proposal: ${err.message}`);
      }
    }
  };

  const isSubmitEnabled =
    currentStep === 1 &&
    isAuth &&
    formData.details &&
    formData.priceQuote &&
    formData.attachments.length > 0 &&
    formData.productQuoteAttachmentUrl &&
    !isUploading; 

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <img src="/favicon.ico" height={25} alt="SelliFi Logo" /> SelliFi: Proposal Submission
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stepper
          activeStep={currentStep}
          connectorStyleConfig={{ activeColor: "#315EB0" }}
          styleConfig={{ completedBgColor: "#315EB0", activeBgColor: "#315EB0" }}
        >
          <Step label="Authentication" />
          <Step label="Proposal Details" />
        </Stepper>
        {currentStep === 0 && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              name="cin"
              placeholder="Company Registration Number"
              value={formData.cin}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        )}
     
     {currentStep === 1 && isAuth && (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <textarea
      name="details"
      placeholder="Proposal Details"
      value={formData.details}
      onChange={handleInputChange}
      className="form-textarea"
    />
    <label>Product Quote</label>
    <textarea
      type="text"
      name="productQuote"
      placeholder="Mention short description of deliverable volume of items"
      value={formData.productQuote}
      onChange={handleInputChange}
      className="form-input"
    />
    <label>Product Quote Attachment (if any)</label>
    <input
      type="file"
      name="product_quote_attachments"
      onChange={handleFileProductQuoteChange}
      className="form-input"
      multiple={false}
    />
  
  
    <label>Price Quote</label>
    <input
      type="text"
      name="priceQuote"
      placeholder="Price Quote"
      value={formData.priceQuote}
      onChange={handleInputChange}
      className="form-input"
    />
    <label>Add Sample Images for Commodity</label>
    <input
      type="file"
      name="attachments"
      accept="image/*"
      onChange={handleFileChange}
      className="form-input"
      multiple
    />
  
  </div>
)}

{isUploading && (
      <span style={{ color: "orange", fontSize: "0.9em", marginBottom: "10px" }}>
        Uploading data, please wait...
      </span>
    )}

      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!isSubmitEnabled && currentStep!==0}
          style={{ backgroundColor: "#315EB0", borderColor: "#315EB0" }}
        >
          {currentStep === 0 ? "Continue" : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};




const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  // useEffect(() => {
  //   const fetchBlogDetails = async () => {
  //     const response = await fetch(`${BASE_URL}/demands/${id}`);
  //     const data = await response.json();
  //     setBlog(data);
  //   };
  //   fetchBlogDetails();
  // }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-detail">
      <h6>Demand ID - {blog?.id}</h6>
      <h1 className="detail-title">{blog.title}</h1>
      <p className="detail-date"><strong>Description:</strong> {blog.description}</p>
      <p className="detail-content"><strong>
        <Plan color="gray" size="medium"/>{" "}
        Estimated Completion Date:</strong> {blog.completion_date || "N/A"}</p>
     <p className="detail-content"><strong> <Organization/>  Organization :</strong> {blog?.organization?.name +`, ${blog?.organization?.address }, ${blog?.organization?.city}, ${blog?.organization?.pincode}, ${blog?.organization?.state}` || "N/A"}</p>
     

     <Table striped bordered hover className="table">
      <thead>
        <tr>
          <td>Item</td>
          <td>Volume</td>
          </tr>
        </thead>
      {blog.items?.map(item=><tr>
        <td className="p-2">{item?.item}</td>
        <td className="p-2">{item?.volume}</td>
      </tr>)}
      </Table>




      <Button
        variant="primary"
        onClick={() => setModalShow(true)}
        className="submit-proposal-button"
        style={{ backgroundColor: "#315EB0", borderColor: "#315EB0" }}
      >
        Submit Proposal
      </Button>
      <ProposalModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        demandId={id}
      />
      <Button
        variant="primary"
        href="/"
        className="back-link"
        style={{ backgroundColor: "gray", borderColor: "#315EB0", marginLeft: 10 }}
      >
        Back to Home
      </Button>
    </div>
  );
};

const DemandTable = ({ demands, page, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(demands.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentDemands = demands.slice(startIndex, endIndex);

  return (
    <div className="demand-table-container">
      <h2 className="table-heading">List of Demands</h2>
      <Table striped bordered hover>
        <thead style={{ backgroundColor: "#315EB0", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Date Expected Completed</th>
            <th>Title</th>
            <th> Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentDemands.map((demand) => (
            <tr key={demand.id}>
              <td>{demand.id}</td>
              <td>{demand.completion_date || "N/A"}</td>
              <td>{demand.title}</td>
              <td>{
                demand.description.length > 50
                  ? `${demand.description.substring(0, 50)}...`
                  : demand.description
              }</td>
              <td>
                <Link to={`/demands/${demand.id}`} className="btn btn-primary btn-sm" style={{background:'#315EAF'}}>
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First onClick={() => onPageChange(1)} disabled={page === 1} />
        <Pagination.Prev onClick={() => onPageChange(page - 1)} disabled={page === 1} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === page}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => onPageChange(page + 1)} disabled={page === totalPages} />
        <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={page === totalPages} />
      </Pagination>
    </div>
  );
};

const MAIN = () => {
  const handleClick = () => {
    pwaInstall
    ({
      title: "RatiFi Redux",
      logo: myLogo2,
      features: (
        <ul>
          <li>Upload Claim Status</li>
          <li>Tutorials & Manuals</li>
          <li>Help & Support</li>
          <li>Works offline</li>
        </ul>
      ),
      description: "RatiFi Redux is designed to facilitate the CFR and IFR claim generation process and it includes a tracking system to monitor progress on claim approval. Apart from providing critical pre-filled information to facilitate easy filing of CFR, it also adopts a novel approach to track the progress of claims and helps to ensure accountability through an inbuilt smart logic engine. There are three primary reasons for the development of JharFRA: standardization, easy access to evidence documents, and scale. ",
    })
      .then(() => alert("App installed successfully or instructions for install shown"))
      .catch(() => alert("User opted out from installing"));
  };

  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;



  const handlePageChange = (newPage) => setPage(newPage);

  return (
    <Router>
      <div className="app">
      {supported() && !isInstalled() && (
       <div style={{

        background:'#5C7232',
        marginBottom:10,
        borderRadius:10,

       }}>
        <span style={{color:'white'}}>
        Click the button to install RatiFi Redux
          </span>
        
       <Button type="button" onClick={handleClick} style={{margin:10,color:'#5C7232',background:'white'}}>
          Install App
        </Button>
        </div>
      )}
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.render(
  <ReactPWAInstallProvider enableLogging>
<MAIN />
</ReactPWAInstallProvider>, document.getElementById("root"));


// Register the service worker
serviceWorkerRegistration.register();