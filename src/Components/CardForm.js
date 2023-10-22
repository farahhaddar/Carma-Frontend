import React from 'react';

function CardForm({
     state,
     handleInputChange,
     handleInputFocus,
     validationErrors,
     handleSubmit,
}) {
     return (
          <form onSubmit={handleSubmit} className='my-3'>
               <div className="form-group mb-3">
                    <input
                         type="tel"
                         name="number"
                         id="number"
                         maxLength="19"
                         className="form-control"
                         placeholder="Card Number 16 digits"
                         value={state.number}
                         onChange={handleInputChange}
                         onFocus={handleInputFocus}
                         style={validationErrors.number ? { borderColor: 'red' } : {}}
                    />
                    <div className='small grey'>(Hint: use 4111 1111 1111 1111 to valid luhun or 1111 1111 1111 1111 to see invalid error)</div>
                    <div className="text-danger small">{validationErrors.number}</div>
               </div>
               <div className="form-group mb-3">
                    <input
                         type="text"
                         name="name"
                         id="name"
                         className="form-control"
                         placeholder="Card Holder Name"
                         value={state.name}
                         onChange={handleInputChange}
                         onFocus={handleInputFocus}
                         style={validationErrors.name ? { borderColor: 'red' } : {}}
                    />
                    <div className="text-danger small">{validationErrors.name}</div>
               </div>
               <div className="form-row mb-3 d-flex justify-content-between">
                    <div className="col-5">
                         <input
                              type="text"
                              name="expiry"
                              id="expiry"
                              className="form-control"
                              placeholder="MM/YY Expiry"
                              value={state.expiry}
                              onChange={handleInputChange}
                              onFocus={handleInputFocus}
                              style={validationErrors.expiry ? { borderColor: 'red' } : {}}
                         />
                         <div className="text-danger small">{validationErrors.expiry}</div>
                    </div>
                    <div className="col-5">
                         <input
                              type="tel"
                              name="cvc"
                              id="cvc"
                              className="form-control"
                              placeholder="CVV 3 Digits"
                              value={state.cvc}
                              onChange={handleInputChange}
                              onFocus={handleInputFocus}
                              style={validationErrors.cvc ? { borderColor: 'red' } : {}}
                         />
                         <div className="text-danger small">{validationErrors.cvc}</div>
                    </div>
               </div>
               <button type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
               </button>
          </form>
     );
}

export default CardForm;
