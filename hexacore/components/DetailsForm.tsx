import React, { useState, useEffect } from 'react';
import {Container} from "@nextui-org/react";
import {auth, db, storage} from "../firebase"
import { updateProfile } from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';

const DetailsForm = () => {
    const [user, loading] = useAuthState(auth)
    const [name, setName] = React.useState(null);
    const [bio, setBio] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const router = useRouter();
    const [fileUrl, setFileUrl] = React.useState(null);
    const [profilePicture, setProfilePicture] = React.useState(user?.photoURL ? user.photoURL : "https://cdn-icons-png.flaticon.com/512/147/147142.png");

    const submitName =  (e) => {
        e.preventDefault();
        const docData = {
            name: name  
        }
        if (!name) {
            return
        } else {
            updateDoc(doc(db, "users", user.uid), docData)
            alert("Saved info")
        }
    }
    const submitPicture = (e) => {
        e.preventDefault();
        const docData = {
            picture: fileUrl
        }
        if (!fileUrl) {
            return
        } else {
            updateProfile(auth.currentUser, {
                photoURL: fileUrl
            }).then(()=>{
                alert("Saved info")
            }).catch((error)=>{
                alert(error)
            })
            //updateDoc(doc(db, "users", userID), docData)
        }
    }
    const submitBio =  (e) => {
        e.preventDefault();
        const docData = {
            bio: bio 
        }
        if (!bio) {
            return
        } else {
            updateDoc(doc(db, "users", user.uid), docData)
            alert("Saved info")
        }
    }
    const submitPhone =  (e) => {
        e.preventDefault();
        const docData = {
            phone: phone 
        }
        if (!phone) {
            return
        } else {
            updateDoc(doc(db, "users", user.uid), docData)
            alert("Saved info")
        }
    }
    const filechanged = async (e) =>{
        var file = e.target.files[0];
        const storageRef = ref(storage, `/Image/${auth.currentUser?.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed",
        (snapshot) => {
        },
        (error) => {
          alert(error);
        },
        () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFileUrl(downloadURL)
            setProfilePicture(downloadURL)
        });
        }
    );     
   }
   if(user){
    return (
        <Container lg>
            <div className="bg-gray-200 min-h-screen pt-2 font-mono my-16">
                <div className="container mx-auto">
                    <div className="inputs w-full max-w-2xl p-6 mx-auto">
                        <h2 className="text-2xl text-gray-900">Account Settings</h2>
                        <form className="mt-6 border-t border-gray-400 pt-4">
                            <div className='flex flex-wrap -mx-3 mb-6'>
                                <div className='w-full md:w-full px-3 mb-6'>
                                <img
                                    src={profilePicture} className="flex-shrink-0 object-cover object-center btn- flex w-40 h-40 mr-auto -mb-8 ml-auto rounded-full shadow-xl"/>
                                </div>
                                <div className='w-full md:w-full px-3 mb-6'>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor="imageInput">images</label>
                                    <input
                                        type="file"
                                        className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md"
                                        name="img"
                                        onChange={filechanged}
                                        required
                                    />
                                    <button onClick={submitPicture} className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3">save changes</button>
                                </div>
                                <div className='w-full md:w-full px-3 mb-6'>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Name</label>
                                    <input type="email" onChange={e => { setName(e.currentTarget.value); }} className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' id='grid-text-1' placeholder='Enter your name'  required/>
                                    <button onClick={submitName} className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3">save changes</button>
                                </div>
                                <div className='w-full md:w-full px-3 mb-6 '>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>password</label>
                                    <button className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md ">change your password</button>
                                </div>
                                
                                <div className='w-full md:w-full px-3 mb-6'>
                                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Phone number</label>
                                        <input type="number" onChange={e => { setPhone(e.currentTarget.value); }} className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'  required/>
                                        <button onClick={submitPhone} className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3">save changes</button>
                                    </div>
                                    <div className='w-full md:w-full px-3 mb-6'>
                                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Bio</label>
                                        <textarea onChange={e => { setBio(e.currentTarget.value); }} className='bg-gray-100 rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner border border-gray-400 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'  required></textarea>
                                        <button onClick={submitBio} className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3">save changes</button>
                                    </div>
                                    
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
   }
}

export default DetailsForm
