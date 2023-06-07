import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase-config/firebase";


const DetailsFormLocalSignInModal = ({isOpen, onClose, handleDeleteConfirmation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const submit = async () => {
        if (email && password) {
            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Signed in
                handleDeleteConfirmation();
                onClose();
                
                // ...  
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
        } else {
            alert("Please enter your email and password");
        }
    }

    return (
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } fixed z-10 inset-0 overflow-y-auto`}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={onClose}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>
            <div
              className={`${
                isOpen ? 'block' : 'hidden'
              } inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Confirm your details so we can verify your identity
                  </h3>
                  <div className="mt-2">
                    <h4 className="text-sm text-gray-500">Email:</h4>
                    <input onChange={e => { setEmail(e.currentTarget.value); }} type="email" className="mt-1 text-black rounded w-60 h-10 m-4 px-5 py-3 border-solid border-2 border-sky-500" />
                    
                    <h4 className="text-sm text-gray-500">Password:</h4>
                    <input onChange={e => {setPassword(e.currentTarget.value); }} type="password" className="mt-1 text-black rounded w-60 h-10 m-4 px-5 py-3 border-solid border-2 border-sky-500" />
                    
                  </div>
                  <button onClick={() => submit()} className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base
                          font-medium text-white bg-blue-600 rounded-xl transition duration-500 ease-in-out transform
                          hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Confirm details</button>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )
}

export default DetailsFormLocalSignInModal
