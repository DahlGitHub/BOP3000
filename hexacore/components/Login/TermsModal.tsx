import { registerWithEmailAndPassword, signInWithGoogle, signInWithMicrosoft } from '../../firebase-config/firebase';
import { useRouter } from 'next/router';

const TermsModal = ({isOpen, onClose, provider, email, name, password}) => {

    const router = useRouter();

    const submit = () => {
        if(provider === "Google"){
            signInWithGoogle().then(() => {
                onClose();
                router.push('./dashboard');
            })
        } else if (provider === "Microsoft"){
            signInWithMicrosoft().then(() => {
                onClose();
                router.push('./dashboard');
            })
            
        } else if (provider === "Local"){
          registerWithEmailAndPassword(name, email, password).then(() => {
            onClose();
            router.push('./dashboard');
          }
          ).catch((error) => {
            console.log(error);
          }
          )
        } else {
          console.log("Error: No provider specified");

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
            onClick={(e)=>{
              onClose(e);
            }}
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
            } inline-block align-bottom bg-white  dark:text-white  dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <h3
                  className="text-lg leading-6 font-medium"
                  id="modal-headline"
                >
                  Terms and Conditions
                </h3>
                <div className="mt-2">
                  <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-justify">
                    Privacy Agreement: We are committed to protecting the privacy and security of your personal information. 
                    As an EEA-based company, we adhere to the guidelines set forth by the General Data Protection Regulation (GDPR). 
                    We collect and process personal data in accordance with the applicable data protection laws. 
                    The information you provide to us is used solely for the purpose of delivering our services and improving your user experience. We do not sell, share, or disclose your personal information to third parties without your explicit consent, unless required by law. 
                    We implement robust security measures to safeguard your data and ensure its confidentiality. By using our web app, you consent to the collection, processing, and storage of your personal information as outlined in this privacy agreement. 
                    If you have any concerns or questions regarding your privacy, please contact us.</p>
                
                  <button onClick={() => submit()} className='inline-flex items-center justify-center px-5 py-3 my-3 mx-auto w-full text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'>Accept Terms and Conditions</button>
                
              </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button onClick={(e)=>{
                onClose(e);
              }}
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default TermsModal;