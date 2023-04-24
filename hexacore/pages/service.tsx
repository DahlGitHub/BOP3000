import { Container } from "@nextui-org/react"
import Layout from "../components/Layout/Layout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAt, faSave, faUser } from "@fortawesome/free-solid-svg-icons"
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { ToastContainer, toast } from 'react-toastify';

const service = () => {

  const [Feedback, setFeedback] = useState('');
  const [Subject, setSubject] = useState('');
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    
  }, []);



const handleSubmit = async (e) => {
  e.preventDefault();
  const docRef = doc(db, "service", user.uid);
  const docSnap = await getDoc(docRef);
  console.log("test sumbit")

  interface DocData {
    name?: string;
    email?: string;
    subject?: string;
    feedback?: string;
  }

  const docData: DocData = {};
  docData.name = user.displayName;
  docData.email = user.email;
  docData.subject = Subject;
  docData.feedback = Feedback;

  await setDoc(doc(db, "service", Subject + user.uid), docData);
 // toast.success("Feedback sent");
}

if(user){
  return(
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="bg-white dark:bg-gray-900 p-10">
        <Container lg>

          <form onSubmit={handleSubmit} className="rounded-lg px-8 pb-5 ">
            <div className="flex justify-between mb-2 my-5">
                <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Hello {user.displayName}</h1>
                <p className="text-gray-900 dark:text-white">if you have an issue be sure to give us some feedback</p>
                </div>
                
            </div>
            <div className="my-5">
              <label htmlFor="Subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-bold">Subject (use a few words to descbribe the issue)</label>
              <input
                  type="text"
                  name="Subject"
                  id="Subject"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  placeholder='Subject'
                  value={Subject || ''}
                  onChange={(e) => setSubject(e.target.value)}
                />
            </div>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-bold" htmlFor="Feedback">
                  Feedback
                </label>
                <textarea
                  name="Feedback"
                  id="Feedback"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write a short summary of what you need help with"
                  value={Feedback || ''}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <button
                    type="submit"
                    className="inline-flex flex-col justify-center items-center py-3 my-3 px-5 text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    <FontAwesomeIcon icon={faSave} className='mb-1'/>
                    <div className='text-sm'>Submit Feedback</div>
                    </button>
          </form>
          
          
        </Container>
        </div>
    </Layout>
  )
  }
}
export default service