import React, { useState, useEffect } from 'react';
import { db, auth, storage, signInWithGoogle, signInWithMicrosoft } from '../firebase-config/firebase';
import { GoogleAuthProvider, reauthenticateWithCredential, signInWithPopup, updateProfile} from "firebase/auth";
import { doc, updateDoc, getDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash, faSave, faTrash, faUpload, faUser } from '@fortawesome/free-solid-svg-icons';
import DetailsFormLocalSignInModal from './DetailsFormLocalSignInModal';

const DetailsForm = () => {
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState('');
    const router = useRouter();
    const [fileUrl, setFileUrl] = useState(null);
    const [profilePicture, setProfilePicture] = useState(user?.photoURL ? user.photoURL : "https://cdn-icons-png.flaticon.com/512/147/147142.png");
    const [showUid, setShowUid] = useState(false);
    const [deleteButtonPressed, setDeleteButtonPressed] = useState(false);

    const docImport = doc;

    useEffect(() => {
      if (user) {
          const docRef = doc(db, 'users', user.uid);
          getDoc(docRef).then((doc) => {
          if (doc.exists()) {
              const data = doc.data();
              setName(data.name || '');
          }
          });
      }
    }, [user]);

    

    const handleDeleteConfirmaton = async () => {
      // Prompt the user to reauthenticate before proceeding with deletion
      try{ 
        handleDeleteFromChat().then(() => {
          handleDeleteFromTeam().then(() => {
            handleDelete();
          })
        })
        
      }catch(error){
        
      }
      
    }

    const handleDeleteFromChat = async () => {
      const user = auth.currentUser
      const contactsRef = collection(db, "users", user.uid, "contacts")
      const contactsDocs = await getDocs(contactsRef)
      contactsDocs.forEach(async (doc) => {
        const chatID = "Chat/"+ [auth.currentUser.uid.toLowerCase(), doc.id.toLowerCase()].sort().join('')
        const chatRef = docImport(db, chatID)
        
        const messagesSub = await getDocs(collection(chatRef, 'Messages'))
        const membersSub = await getDocs(collection(chatRef, 'Members'))

        const deleteMembersSubSubcollectionsPromises = membersSub.docs.map((subDoc) => deleteDoc(subDoc.ref));
        const deleteMessagesSubSubcollectionsPromises = messagesSub.docs.map((subDoc) => deleteDoc(subDoc.ref));

        await Promise.all(deleteMembersSubSubcollectionsPromises);
        await Promise.all(deleteMessagesSubSubcollectionsPromises);
        console.log("contactId: "+doc.id + "; user id: " + user.uid)
        deleteDoc(docImport(db, "users", doc.id, "contacts", user.uid))
        deleteDoc(chatRef)
      })

    }

    const handleDeleteFromTeam = async () => {
      const user = auth.currentUser
      const userTeamsRef = collection(db, "users", user.uid, "teams")
      const teamDocs = await getDocs(userTeamsRef)
      teamDocs.forEach(async (doc) => {
        const teamRef = docImport(db, "teams", doc.id)
        const teamDoc = getDoc(teamRef)
        if ((await teamDoc).exists()) {
          const toolsSub = await getDocs(collection(teamRef, 'tools'))
          toolsSub.docs.forEach(async (subDoc) => {
            const tool = subDoc.data().tool
            if(tool === "kanban"){
              const kanbanDocs = await getDocs(collection(teamRef, 'tools', subDoc.id, "kanban"))
              kanbanDocs.forEach(async (subSubDoc) => {
                subSubDoc.data().items.forEach(async (item) => {
                  if(item.assignees.includes(user.uid)){
                    const index = item.assignees.indexOf(user.uid)
                    item.assignees.splice(index, 1)
                    await updateDoc(docImport(db, "teams", doc.id, "tools", subDoc.id, "kanban", subSubDoc.id), {
                      items: item
                    })
                  }
                })
              })
            }
          })
          deleteDoc(docImport(db, "teams", doc.id, "members", user.uid))
        }
      })
    }
    
    const handleDelete = async () => {
      const userData = await getDoc(docImport(db, "users", auth.currentUser.uid))
        try {
          // User has been successfully reauthenticated, proceed with deletion
          const user = auth.currentUser;
          const userDocRef = doc(db, "users", user.uid);
    
          // Delete user document from Firestore
          const contactReqSub = await getDocs(collection(userDocRef, 'contact-requests'))
          const toolsSub = await getDocs(collection(userDocRef, 'tools'))
          const sentReqSub = await getDocs(collection(userDocRef, 'sent-requests'))
          const teamsSub = await getDocs(collection(userDocRef, 'teams'))
        
          
          const deletecontactRequestSubcollectionsPromises = contactReqSub.docs.map(async(subDoc) => {
            const subSub = await deleteDoc(docImport(db, "users", subDoc.id, "contact-requests", user.uid))
            deleteDoc(subDoc.ref)
          });
          const deleteToolSubcollectionsPromises = toolsSub.docs.map((subDoc) => deleteDoc(subDoc.ref));
          const deleteSentReqSubSubcollectionsPromises = sentReqSub.docs.map((subDoc) => {
            const subSub = deleteDoc(docImport(db, "users", subDoc.id, "sent-requests", user.uid))
            deleteDoc(subDoc.ref)
          });
          const deleteTeamsSubSubcollectionsPromises = teamsSub.docs.map((subDoc) => deleteDoc(subDoc.ref));
          await Promise.all(deletecontactRequestSubcollectionsPromises);
          await Promise.all(deleteSentReqSubSubcollectionsPromises);
          await Promise.all(deleteToolSubcollectionsPromises);
          await Promise.all(deleteTeamsSubSubcollectionsPromises);
          deleteDoc(userDocRef)
          // Delete user from Firebase Authentication
          auth.currentUser.delete().catch((error) => {
            console.log(userData.data());
            if(userData.data().authProvider === "google"){
              signInWithGoogle().then(() => {
                if(auth.currentUser === user){
                  handleDeleteConfirmaton()
                }
              })
            } else if(userData.data().authProvider === "local"){
              handleModalOpen()
              if(auth.currentUser === user){
                handleDeleteConfirmaton()
              }
            }
          })
    
          toast.success("Deleted user!");
        } catch (error) {
          
          alert(error.message);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        interface DocData {
            name?: string;
            picture?: string;
        }
      
      const previousData = docSnap.data();

      const docData: DocData = {};
      if (name !== previousData.name) docData.name = name;
      if (fileUrl) {
        await updateProfile(auth.currentUser, {
          photoURL: fileUrl
        });
        docData.picture = fileUrl
      }
      if (name !== previousData.name){
        await updateProfile(auth.currentUser, {
          displayName: name
        });
      }
      if (Object.entries(docData).length === 0) {
        toast.warning("No changes to save.");
        return;
      }
      if (auth.currentUser.uid) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name: name,
          picture: fileUrl
        });
        console.log("Document updated successfully!");
      }
    toast.success("Updated profile settings!");
  }

  const handleFileChange = async (e) => {
    var file = e.target.files[0];
    const storageRef = ref(storage, `/Image/${auth.currentUser?.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL);
          setProfilePicture(downloadURL);
        });
      }
    );
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };
   
   if(user){
    return (
<div className="bg-gray-100 dark:bg-gray-900">
  <DetailsFormLocalSignInModal isOpen={isOpen} onClose={handleModalClose} handleDeleteConfirmation={handleDeleteConfirmaton}/>
  <div className="max-w-3xl mx-auto pt-4">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 flex flex-col sm:flex-row items-center">
      <img
        className="h-24 w-24 object-cover rounded-full mr-4 mb-3 sm:mb-0"
        src={profilePicture}
        alt="Profile Picture"
      />
      <div className="space-y-0.5 font-medium dark:text-white text-left">
        <div>{user.displayName}</div>
        <div className="text-sm font-light text-gray-500 dark:text-gray-400">
          Developer at Hexacore
        </div>
      </div>
      <div className="space-y-0.5 font-medium dark:text-white text-left mx-5">
        <div className="flex items-center">
          <button
            className="mr-2"
            onClick={() => setShowUid(!showUid)}
          >
            {showUid ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
          <div className="text-xs">
            {showUid ? (
              <div className={`font-light ${showUid ? '' : 'invisible'}`}>
                {user.uid}
              </div>
            ) : (
              <div className="font-light">
                {'*'.repeat(user.uid.length)}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          deleteButtonPressed ? 'hidden' : 'block'
        } dark:text-white`}
      >
        <button
          onClick={() => setDeleteButtonPressed(true)}
          className="bg-gray-500 hover:bg-red-700 text-white font-semibold py-2 px-2 rounded mt-3 sm:mt-0"
        >
          <FontAwesomeIcon className='pr-2' icon={faTrash} />
          Delete user
        </button>
      </div>
      {/* Delete confirmation must be fixed or either overall removed*/}
      <div
        className={`${
          deleteButtonPressed ? 'block' : 'hidden'
        } dark:text-white`}>
        <button onClick={()=>setDeleteButtonPressed(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-2 rounded ml-2">
          Cancel
        </button>
        <button
          onClick={() => handleDeleteConfirmaton()}
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-2 rounded ml-2"
        >
          Delete my account
        </button>
      </div>
    </div>
  </div>
  <div className="max-w-3xl mx-auto py-8">
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg px-8 pb-5 dark:bg-gray-800"
    >
      <h2 className="py-4 dark:text-gray-100">Account Settings</h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Full Name
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center p-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:text-gray-100 rounded-l-lg pr-2">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your name"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-left">
        <div className="mb-4 sm:mb-0">
          <div className="flex space-x-2">
            <div className="border-2 border-dashed border-gray-300 rounded-lg h-16">
              <img
                className="h-16 w-16 object-cover rounded-full mr-5 p-2"
                src={profilePicture}
                alt="Profile Picture"
              />
            </div>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-16 px-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or
                  drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  <FontAwesomeIcon
                    className="w-10 h-10 text-gray-400"
                    icon={faUpload}
                  />
                  Image (Max. 20 MB)
                </p>
              </div>

              <input
                type="file"
                id="dropzone-file"
                className="sr-only"
                onChange={handleFileChange}
                accept="image/*"
                max-size="20971520"
              />
            </label>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex flex-col justify-center items-center py-3 px-5 text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <FontAwesomeIcon icon={faSave} className="mb-1" />
            <div className="text-sm">Save changes</div>
          </button>
        </div>
      </div>
    </form>
  </div>
  
</div>
      );
   }
}

export default DetailsForm
