import React, { useState, useEffect } from 'react';
import { Container } from "@nextui-org/react";
import { auth, db, storage } from "../firebase"
import { updateProfile } from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faAt, faEyeSlash, faSave, faUpload, faUser } from '@fortawesome/free-solid-svg-icons';

const DetailsForm = () => {
    
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [phone, setPhone] = useState('');
    const router = useRouter();
    const [fileUrl, setFileUrl] = useState(null);
    const [profilePicture, setProfilePicture] = useState(user?.photoURL ? user.photoURL : "https://cdn-icons-png.flaticon.com/512/147/147142.png");
    const [originalData, setOriginalData] = useState(null);
    const [showUid, setShowUid] = useState(false);

    useEffect(() => {
        if (user) {
            const docRef = doc(db, 'users', user.uid);
            getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setName(data.name || '');
                setBio(data.bio || '');
                setPhone(data.phone || '');
            }
            });
        }
        }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        interface DocData {
            name?: string;
            bio?: string;
            phone?: string;
            picture?: string;
        }
      
      const previousData = docSnap.data();

      const docData: DocData = {};
      if (name !== previousData.name) docData.name = name;
        if (bio !== previousData.bio) docData.bio = bio;
        if (phone !== previousData.phone) docData.phone = phone;
      if (fileUrl) {
        await updateProfile(auth.currentUser, {
          photoURL: fileUrl
        });
        docData.picture = fileUrl;
      }
      if (Object.entries(docData).length === 0) {
        toast.warning("No changes to save.");
        return;
      }
    await updateDoc(doc(db, "users", user.uid), docData);
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
   
   if(user){
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className='max-w-3xl mx-auto pt-4'>
                <div className='bg-white rounded-lg p-3 flex'>
                <img
                    className="h-24 w-24 object-cover rounded-full mr-4"
                    src={profilePicture}
                    alt="Profile Picture"
                  />
                  <div className="space-y-0.5 font-medium dark:text-white text-left pt-4">
                      <div>{user.displayName}</div>
                      <div className="text-sm font-light text-gray-500 dark:text-gray-400">Developer at Hexacore</div>
                  </div>
                  <div className="space-y-0.5 font-medium dark:text-white text-left pt-4 mx-5">
                    <div>
                        <button className='mr-2' onClick={() => setShowUid(!showUid)}>
                        {showUid ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/>}
                        </button>User ID
                    </div>
                        {showUid ? (
                        <div className={`text-sm font-light ${showUid ? '' : 'invisible'} text-gray-500 dark:text-gray-400`}>{user.uid}</div>
                        ) : (
                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">{'*'.repeat(user.uid.length)}</div>
                        )}
                  </div>
                </div>
           
            </div>
            <div className="max-w-3xl mx-auto py-8">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg px-8 pb-5">
              <h2 className="py-4">Account Settings</h2>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center p-2.5 bg-white border border-gray-300 rounded-l-lg pr-2">
                        <FontAwesomeIcon icon={faUser}/>
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
              <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center p-2.5 bg-white border border-gray-300 rounded-l-lg pr-2">
                        <FontAwesomeIcon icon={faAt}/>
                    </span>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={user.email}
                    />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="phone">
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder='+47 123 45 678'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            
              <div className="flex justify-between mb-2">
                <div>
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address / Street</label>
                <input type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="" placeholder="" />
                </div>
                <div>
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                <input type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="" placeholder="" />
                </div>
                <div>
                <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                <input type="text" name="country" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="" placeholder="" />
                </div>
              </div>


              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter a brief bio"
                  value={bio || ''}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className='flex justify-between items-center'>
                <div>
                    <div className='flex space-x-2'>
                        <div className='border-2 border-dashed border-gray-300 rounded-lg h-16'>
                            <img
                            className="h-16 w-16 object-cover rounded-full mr-5 p-2"
                            src={profilePicture}
                            alt="Profile Picture"
                            />
                        </div>
                       <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-16 px-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400"><FontAwesomeIcon className="w-10 h-10 text-gray-400" icon={faUpload}/>Image (Max. 20 MB)</p>
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
                    className="inline-flex flex-col justify-center items-center py-3 px-5 text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    <FontAwesomeIcon icon={faSave} className='mb-1'/>
                    <div className='text-sm'>Save changes</div>
                    </button>
                </div>
              </div>
            
              
            </form>
          </div>
          <ToastContainer />
        </div>
      );
   }
}

export default DetailsForm
