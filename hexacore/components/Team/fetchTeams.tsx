import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Link from "next/link";

async function fetchTeams(setTeams, selectTeam) {

    const docImport = doc;

    const querySnapshot = await getDocs(collection(db, "users", auth.currentUser?.uid, "teams"));
      const elements = [];
      
      if(querySnapshot.empty){
        setTeams(null)
      } else {
        const promises = querySnapshot.docs.map(async (doc) => {
          
          const teamID = doc.data().uid;
          const teamDoc = await getDoc(docImport(db, "teams", teamID));
          const teamData = teamDoc.data();
          const element = (
            <h1 onClick={() => selectTeam(teamData.teamuid, teamData.name)} className="cursor-pointer text-black dark:text-white text-xl text-center flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
              {teamData.name}
            </h1>
          );
        elements.push(element);
      });

      await Promise.all(promises);
      setTeams(elements); // set the elements array instead of results

    }
  }

export default fetchTeams