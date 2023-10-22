import React from 'react';


function SuccessModal({ show, onClose, success, data, loading }) {
     return (
          <div
               className="modal"
               tabIndex="-1"
               role="dialog"
               style={{ display: show ? 'block' : 'none' }}
          >
               <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                         <div className="modal-header">
                              <h5 className="modal-title text-center">
                                   {loading ? 'Loading...' : success ? 'Success' : 'Error'}
                              </h5>
                              {/* when sending request and loading no btn to close the model until request is complete */}
                              {loading ? null : (
                                   <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        onClick={onClose}
                                   >
                                        <span aria-hidden="true">&times;</span>
                                   </button>
                              )}
                         </div>
                         {/* body content */}
                         <div className="modal-body text-center align-items-center">
                              {loading ? (
                                   
                                        <div className="spinner-border" role="status">
                                             <span className="visually-hidden">Loading...</span>
                                        </div>
               
                              ) : success ? (
                                   <>   
                                        <h3>THANK YOU FOR TRUSTING US!</h3>
                                             <p>Your Card data with the card holder name {data.data.cardholdername} has been successfully saved.</p>
                                        <div className="modal-footer">
                                             <button
                                                       type="button"
                                                       className="btn btn-primary"
                                                       data-dismiss="modal"
                                                       aria-label="Close"
                                                       onClick={onClose}
                                                       >Close</button>
                                        </div>
                                   </>
                              ) : (
                                   <>
                                        <p>An error occurred while saving the data.</p>
                                        <p>Please try again.</p>
                                        <div className="modal-footer">
                                             <button
                                                  type="button"
                                                  className="btn btn-primary"
                                                  data-dismiss="modal"
                                                  aria-label="Close"
                                                  onClick={onClose}
                                             >Close</button>
                                        </div>
                                   </>
                              )}
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default SuccessModal;