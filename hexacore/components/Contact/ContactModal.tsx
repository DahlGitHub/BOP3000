import { auth, db} from '../../firebase';
import { doc, setDoc } from "firebase/firestore";


const ContactModal = ({ isOpen, onClose, picture, name, uid, email }) => {

  
  const submit = () => {
    onClose()

    const addedUserDocData = {
      email: email,
      name: name,
      picture: picture,
      uid: uid,
    }

    const thisUserDocData = {
      email: auth.currentUser?.email,
      name: auth.currentUser?.displayName,
      uid: auth.currentUser?.uid,
      picture:`https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/Image%2F${auth.currentUser?.uid}?alt=media&token=6eb830e3-d840-4e44-80d6-347ecda90fd7 `

    }

    if (!name) {
      console.log("contact addition failed.")
        return
    } else {
      setDoc(doc(db, "users", uid, "contact-requests", auth.currentUser?.uid), thisUserDocData)
      setDoc(doc(db, "users", auth.currentUser?.uid, "sent-requests", uid), addedUserDocData)
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
                Add Contact?
              </h3>
              <div className="mt-2">
              <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
              <img
                  src={picture} className="flex-shrink-0 object-cover object-center btn- flex w-16 h-16 mr-auto -mb-8 ml-auto rounded-full shadow-xl"/>
              <p className="mt-8 text-2xl font-semibold leading-none text-black tracking-tighter lg:text-3xl">
                 {name}</p>
                  
              <p className="mt-3 text-base leading-relaxed text-center text-black-200">{email}</p>
              
              <div className="w-full mt-6">
                <a onClick={submit} className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base
                    font-medium text-white bg-indigo-600 rounded-xl transition duration-500 ease-in-out transform
                    hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Send contact request</a>
              </div>
            </div>
              </div>
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

export default ContactModal