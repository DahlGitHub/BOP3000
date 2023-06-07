import { auth,db } from '../../firebase-config/firebase';
import { doc, collection, setDoc, getDocs, getDoc, deleteDoc, onSnapshot, query } from "firebase/firestore";
import {useState, useEffect} from "react";
import AvatarPicture from '../AvatarPicture';

const ContactRequests = ({isOpen, onClose, setInviteCount}) => {
  
  const docImport = doc;

  const [invites, setInvites] = useState([]);
  const [addedUid, setAddedUid] = useState(null);

  useEffect(() => {
    async function fetchInvites() {
      const q = query(collection(db, "users", auth.currentUser?.uid, "contact-requests"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          const contactID = change.doc.data().uid;
          const contactDoc = await getDoc(docImport(db, "users", contactID));
          const contactData = contactDoc.data();
          if (change.type === "added") {
            const element = (
              <div key={change.doc.id}  className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                <div className="text-left rtl:text-right flex">
                  <div className='mx-3'>
                    <AvatarPicture picture={contactData.picture} name={contactData.name} containerWidth={"10"} containerHeight={"10"}/>
                  </div>
                  <h1 className="text-lg font-medium text-gray-700 capitalize dark:text-white">{contactData.name}</h1>
                </div>
                <button onClick={() => submit(contactID)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded ml-2">Accept</button>
                <button onClick={() => decline(contactID)} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded ml-2">Decline</button>
              </div>
            )
            setInvites(prevState => [...prevState, element]);
            setInviteCount(prevState => prevState + 1);
          }
          if (change.type === "removed") {
            setInvites(prevState => prevState.filter((item) => item.key !== change.doc.id));
            setInviteCount(prevState => prevState - 1);
          }
        })
      })
    }
    
     fetchInvites();
    }, []);



    const submit = async (contactID) => {

        if (contactID) {
            const userRef = doc(db, "users", auth.currentUser?.uid, "contacts", contactID);
            await setDoc(userRef, {
              uid: contactID
            });

            const contactRef = doc(db, "users", contactID, "contacts", auth.currentUser?.uid);
            await setDoc(contactRef, {
                uid: auth.currentUser?.uid,
            });

            deleteDoc(doc(db, "users", auth.currentUser?.uid, "contact-requests", contactID));
            deleteDoc(doc(db, "users", contactID, "sent-requests", auth.currentUser?.uid));
            
        }
      onClose()
    }
    const decline = async (contactID) => {
        onClose()
        if (addedUid) {
            deleteDoc(doc(db, "users", auth.currentUser?.uid, "contact-requests", contactID));
            deleteDoc(doc(db, "users", contactID, "sent-requests", auth.currentUser?.uid));
            onClose();
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
                  Contact requests
                </h3>
                <div className="mt-2">
                  <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">

                  
                   {invites.length > 0 ? invites : <p className="text-gray-500">No contact requests</p>} 

                    
                        
                </div>
          
                
                
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button onClick={onClose}
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

export default ContactRequests;