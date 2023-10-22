import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import CardForm from './CardForm';
import SuccessModal from './SuccessModal';

function PaymentForm() {

     const apiUrl = process.env.REACT_APP_API_PATH;

     // Defining states
     const [state, setState] = useState({
          number: '',
          expiry: '',
          cvc: '',
          name: '',
          focus: '',
     });

     // Error handling state
     const [validationErrors, setValidationErrors] = useState({
          number: '',
          name: '',
          expiry: '',
          cvc: '',
     });

     // State for  modal on submit
     const [showModal, setShowModal] = useState(false);

     // State variables to control the UI while waiting for fetch to finish
     const [loading, setIsLoading] = useState(false); //loading
     const [success, setSuccess] = useState(false); // data sent successfully

     // path the data from backend after fetch
     const [responseData, setResponseData] = useState(null);



     // Function handles input changes for card details, formats, and validates rules
     const handleInputChange = (evt) => {
          const { name, value } = evt.target;

          if (name === 'number') {
               const formattedValue = value.replace(/\D/g, '');
               const formattedNumber = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
               if (formattedNumber.length <= 19) {
                    setState((prev) => ({ ...prev, [name]: formattedNumber }));
               }
          } else if (name === 'expiry') {
               const formattedValue = value.replace(/\D/g, '');
               if (formattedValue.length <= 2) {
                    setState((prev) => ({ ...prev, [name]: formattedValue }));
               } else if (formattedValue.length > 2 && formattedValue.length <= 4) {
                    const month = formattedValue.slice(0, 2);
                    const year = formattedValue.slice(2, 4);
                    setState((prev) => ({ ...prev, [name]: `${month}/${year}` }));
               }
          } else if (name === 'cvc') {
               const formattedValue = value.replace(/\D/g, '');
               if (formattedValue.length <= 3) {
                    setState((prev) => ({ ...prev, [name]: formattedValue }));
               }
          } else if (name === 'name') {
               // Allow only letters and spaces, and limit to 25 characters
               const formattedValue = value.replace(/[^A-Za-z\s]/g, '').slice(0, 25);
               if (formattedValue.length <= 25) {
                    setState((prev) => ({ ...prev, [name]: formattedValue }));
               }
          } else {
               setState((prev) => ({ ...prev, [name]: value }));
          }
     }

     // Function focuses on the card design when the target state when changed
     const handleInputFocus = (evt) => {
          setState((prev) => ({ ...prev, focus: evt.target.name }));
     };

     // Function to toggle loading/success modal
     const toggleModal = () => setShowModal(!showModal);

     // Function to reset the form
     const resetForm = () => {
          setState({ number: '', expiry: '', cvc: '', name: '', focus: '', }); // Clear the form data
          setShowModal(false); // Close the success modal
     }

    
     // Function to submit the form data and do a post req  to the backend
     const handleSubmit= (e) => {
          e.preventDefault();
         
          // Custom validation logic
          const errors = {};
          let formIsValid = true;

          if (!state.number || state.number.length < 19) {
               errors.number = '*Card number is required';
               formIsValid = false;
          } else {
               errors.number = '';
          }

          if (!state.name || state.name.length > 25) {
               errors.name = '*Card holder name is required and should be less than 25 characters';
               formIsValid = false;
          } else {
               errors.name = '';
          }

          if (!state.expiry || state.expiry.length !== 5) {
               errors.expiry = '*Expiry date is required in MM/YY format';
               formIsValid = false;
          } else {
               errors.expiry = '';
          }

          if (!state.cvc || state.cvc.length !== 3) {
               errors.cvc = '*Cvc is required and should be 3 digits';
               formIsValid = false;
          } else {
               errors.cvc = '';
          }

          if (formIsValid) {

               // to remove design edits to the values like / and spaces
               const customData = {
                    cardholderName: state.name,
                    cardNumber: state.number.replace(/\s+/g, ""),
                    cvv: state.cvc,
                    expirationMonth: parseInt(state.expiry.slice(0, 2)),
                    expirationYear: parseInt(state.expiry.slice(3, 5)),
                    userId: 1, // will be replace with the actual user ID in logged session later 
               };

               setIsLoading(true);// Show the loader while fetching data
               toggleModal();// Show the  modal

               //setTimeout set just for the sake of  testing loader on dev b/c its fast
               setTimeout(() => { 
               
                    // Make your fetch request here...
                    fetch(apiUrl+'/cards', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(customData),
                    
                    }).then((response) => {
                         if (response.ok || response.status === 200) {
                              // Handle successful response (status code 200)
                              return response.json().then((data) => {
                              setValidationErrors({ number: '', name: '', expiry: '', cvc: '', });// Clear any existing validation errors
                              setResponseData(data);// Set the response data
                              setIsLoading(false); // Switch loading state to off
                              setSuccess(true); // Set success to true
                              });

                         }else if (response.status === 400) {
                               // Handle client error (status code 400) from node validation library on routes
                              return response.json().then((data) => {
                                   const errors = {};
                                   // Loop through the errors array
                                   for (const error of data.errors) {
                                        const { path,msg } = error;
                                        // Check if the path exists in the state
                                        if (path === 'cardNumber') {
                                             errors.number =msg;
                                        } if (path === 'cardholderName') {
                                             errors.name = msg;
                                        } if (path === 'cvv') {
                                             errors.cvc= msg;
                                        } if (path === 'expirationMonth') {
                                             errors.expiry = msg;
                                        } if (path === 'expirationYear') {
                                             errors.expiry = msg;
                                        }
                                   }
                                   setIsLoading(false);
                                   setSuccess(false);
                                   setValidationErrors(errors);// set existing validation errors
                              });
           
                         }else {
                              setIsLoading(false);
                         } 
                    })
                    .catch((error) => {
                         setIsLoading(false);
                         console.error('Error:', error);
                    });

               }, 2000);
          } else {
               setValidationErrors(errors);
               // Focus on the first input field with an error
               if (errors.number) {
                    document.querySelector('[name="number"]').focus();
               } else if (errors.name) {
                    document.querySelector('[name="name"]').focus();
               } else if (errors.expiry) {
                    document.querySelector('[name="expiry"]').focus();
               } else if (errors.cvc) {
                    document.querySelector('[name="cvc"]').focus();
               }
          }
     }

     return (
          <div className="gradient-background">
               <div className='container-lg h-100'>
                    <div className="row justify-content-center align-items-center min-vh-100">
                         <div className="col-md-6">
                              <div className='card shadow p-4 '>
                                   <div className="text-center">
                                        <h1 className="mb-3">Welcome To Payment Gateway</h1>
                                        <h5 className="mb-3">Please enter your card info to proceed</h5>
                                   </div>
                                  
                                  {/* design */}
                                   <Cards
                                        number={state.number}
                                        expiry={state.expiry}
                                        cvc={state.cvc}
                                        name={state.name}
                                        focused={state.focus}
                                   />
                                   {/* form */}
                                   <CardForm
                                        state={state}
                                        handleInputChange={handleInputChange}
                                        handleInputFocus={handleInputFocus}
                                        validationErrors={validationErrors}
                                        handleSubmit={handleSubmit}
                                   />
                                   
                                   {/* popup model */}
                                   <SuccessModal
                                        show={showModal}
                                        onClose={() => {
                                             toggleModal();
                                             if (success) { resetForm(); } 
                                        }}
                                        success={success}
                                        data={responseData}
                                        loading={loading}
                                   />
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default PaymentForm;
