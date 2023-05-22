import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase-config/firebase";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

/*

async function fetchTeams({setTeams, selectTeam, handleFavTeamSelect}) {
  const docImport = doc;

  const favTeamDoc = await getDocs(collection(db, "users", auth.currentUser?.uid, "favTeam"));
  const favTeamDataID = favTeamDoc.docs.map((doc) => doc.id);

  const querySnapshot = await getDocs(collection(db, "users", auth.currentUser?.uid, "teams"));
  const elements = [];

  if (querySnapshot.empty) {
    setTeams(null);
  } else {
    const promises = querySnapshot.docs.map(async (doc) => {
      const teamID = doc.id;
      const teamDoc = await getDoc(docImport(db, "teams", teamID));
      const teamData = teamDoc.data();
      const favTeamCheck = favTeamDataID.includes(teamDoc.data().teamuid);
      const element = (
        <div className="flex border-solid border-2 border-sky-500 w-fit h-fit rounded m-5">
          <button key={teamData.teamuid} onClick={() => selectTeam(teamData.teamuid, teamData.name)} className="text-black dark:text-white text-lg font-bold rounded-l flex items-center w-fit px-5 py-2 transition-colors duration-200 dark:hover:bg-blue-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
            {teamData.name}
          </button>
          <button onClick={() => handleFavTeamSelect(teamData.name, teamData.teamuid)} className="text-black dark:text-white text-lg font-bold rounded-r flex items-center w-fit py-2 pl-2 transition-colors duration-200 dark:hover:bg-blue-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
            {favTeamCheck ? <FontAwesomeIcon icon={["fas", "star"]} /> : <FontAwesomeIcon icon={["far", "star"]} />}
          </button>
        </div>
      );
      elements.push(element);
    });

    await Promise.all(promises);
    setTeams(elements); // set the elements array instead of results
  }
}

export default fetchTeams;
*/