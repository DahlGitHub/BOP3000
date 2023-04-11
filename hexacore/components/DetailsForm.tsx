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

const DetailsForm = () => {
    
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [phone, setPhone] = useState('');
    const router = useRouter();
    const [fileUrl, setFileUrl] = useState(null);
    const [profilePicture, setProfilePicture] = useState(user?.photoURL ? user.photoURL : "https://cdn-icons-png.flaticon.com/512/147/147142.png");
    const [originalData, setOriginalData] = useState(null);
    

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
        alert(error);
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
        <div className="bg-gray-200 min-h-screen">
          <div className="max-w-3xl mx-auto py-8">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl font-medium mb-4">Account Settings</h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your name"
                  value={name || ''}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter a brief bio"
                  value={bio || ''}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="picture">
                  Profile Picture
                </label>
                <div className="flex items-center">
                  <img
                    className="h-16 w-16 object-cover rounded-full mr-4"
                    src={profilePicture}
                    alt="Profile Picture"
                  />
                  <input
                    type="file"
                    name="picture"
                    id="picture"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="picture"
                    className="cursor-pointer bg-blue-500 hover:bg-blue-600 py-2 px-4 text-white rounded-lg"
                  >
                    Upload Picture
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
              
            </form>
          </div>
          <ToastContainer />
        </div>
      );
   }
}

export default DetailsForm
