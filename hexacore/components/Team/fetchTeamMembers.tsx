import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

async function fetchTeamMembers(selectedTeam, setTeamMembers) {

    const docImport = doc;
    console.log("fetching team members")
    const querySnapshot = await getDocs(collection(db, "teams", selectedTeam, "members"));
  
    const promises = querySnapshot.docs.map(async (doc, index) => {
      const userId = doc.data().uid;
      const userDoc = await getDoc(docImport(db, "users", userId));
      const userData = userDoc.data();
      const element = (
        <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
          <img className="object-cover w-8 h-8 rounded-full" src={userData.picture} alt=""/>
          <div className="text-left rtl:text-right">
            <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">{userData.name}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">{userData.email}</p>
          </div>
        </button>
      );
  
      return element;
    });
  
    const results = await Promise.all(promises);
    setTeamMembers(results);
  }

  export default fetchTeamMembers;