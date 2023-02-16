import React, { Fragment } from "react";
import {Container, Image, Row, Col, Grid, Card, Text } from "@nextui-org/react";
import {useMediaQuery} from './useMediaQuery.js'
import {auth, db, storage} from "../firebase"
import { doc, setDoc, addDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const DetailsForm = () => {
    const isMd = useMediaQuery(960);
    const [email, setEmail] = React.useState(null);
    const [country, setCountry] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const [firstName, setFirstName] = React.useState(null);
    const [lastName, setLastName] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const router = useRouter();
    const [fileUrl, setFileUrl] = React.useState(null)
    

    const submit =  (e) => {
        e.preventDefault();
            const docData = {
                email: email,
                country: country,
                language: language,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                picture: fileUrl
            }
            if (!email) {
                return
            } else {
                setDoc(doc(db, "users", auth.currentUser?.uid.toString()), docData)
            
                alert("Saved info")
            }

    }

    const filechanged = async (e) =>{
        var file = e.target.files[0];
        const storageRef = ref(storage, `/Image/${file.name}`);
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
            console.log("FileUrl " + downloadURL);
          });
        }
      );
            
   }


    return (
        <Container lg>
            <div className="bg-gray-200 min-h-screen pt-2 font-mono my-16">
                <div className="container mx-auto">
                    <div className="inputs w-full max-w-2xl p-6 mx-auto">
                        <h2 className="text-2xl text-gray-900">Account Settings</h2>
                        <img className="inline object-cover w-20 h-20 mr-2 rounded-full" src="https://static.thenounproject.com/png/363640-200.png" alt="Profile image"/>
                        <form className="mt-6 border-t border-gray-400 pt-4">
                        
                            <div className='flex flex-wrap -mx-3 mb-6'>
                                <div className='w-full md:w-full px-3 mb-6'>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >email address</label>
                                    <input type="email" onChange={e => { setEmail(e.currentTarget.value); }} className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' id='grid-text-1' placeholder='Enter email'  required/>
                                </div>
                                <div className='w-full md:w-full px-3 mb-6 '>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>password</label>
                                    <button className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md ">change your password</button>
                                </div>
                                <div className='w-full md:w-full px-3 mb-6'>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>pick your country</label>
                                    <div className="flex-shrink w-full inline-block relative">
                                        <select onChange={e => { setCountry(e.currentTarget.value); }} className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded">
                                            <option>choose ...</option>
                                            <option>USA</option>
                                            <option>Norway</option>
                                            <option>Spain</option>
                                            <option>UK</option>
                                        </select>
                                        <div className="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full md:w-full px-3 mb-6'>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Preferred language</label>
                                    <div className="flex-shrink w-full inline-block relative">
                                        <select onChange={e => { setLanguage(e.currentTarget.value); }} className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded">
                                            <option>choose ...</option>
                                            <option>English</option>
                                            <option>France</option>
                                            <option>Spanish</option>
                                        </select>
                                        <div className="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="personal w-full border-t border-gray-400 pt-4">
                                    <h2 className="text-2xl text-gray-900">Personal info:</h2>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className='w-full md:w-1/2 px-3 mb-6'>
                                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >first name</label>
                                            <input onChange={e => { setFirstName(e.currentTarget.value); }} className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text'  required/>
                                        </div>
                                        <div className='w-full md:w-1/2 px-3 mb-6'>
                                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >last name</label>
                                            <input onChange={e => { setLastName(e.currentTarget.value); }} className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text'  required/>
                                        </div>
                                    </div>
                                    <div className='w-full md:w-full px-3 mb-6'>
                                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Phone number</label>
                                        <input type="number" onChange={e => { setPhone(e.currentTarget.value); }} className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'  required/>
                                    </div>
                                    <div className='w-full md:w-full px-3 mb-6'>
                                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Bio</label>
                                        <textarea className='bg-gray-100 rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner border border-gray-400 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'  required></textarea>
                                    </div>
                                    <div className="flex justify-end">
                                        <button onClick={submit} className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3">save changes</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default DetailsForm
