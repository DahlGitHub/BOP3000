import {Container} from "@nextui-org/react";

const FrontpageCard = () => {

    const sections = [
        {
          title: "Organize your teams",
          description:"With our clear and easy to understand layout, you can easily make a team with the team-members you want. It's easy to share documents and communicate with other members",
          imageUrl:"https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/Image%2Fteam.png?alt=media&token=01bf49ca-ee33-405b-81f7-06eae5b3863c",
        },
        {
          title: "Keep track with the Kanban board",
          description:"Create new tasks using our kanban cards to easily keep track of current tasks and what's done. You can also select priorities on cards and allocate team members to a task.",
          imageUrl:"https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/Image%2Fkanban.png?alt=media&token=f651983e-8857-4de0-aae2-8f991713d2a2",
        },
        {
          title: "Chat with co-workers and friends",
          description:"Our chat gives you the option to communicate. If you want to vote on a subject, it's possible to create a poll in the chat.",
          imageUrl:"https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com/o/Image%2Fchat.png?alt=media&token=3a9255ca-7a99-43e4-be9e-c9f0dc06c16d",
        },
      ];
      
      return (
        <Container lg>
          {sections.map((section, index) => (
            <div className="max-w-screen md:w-3/4 mx-auto p-5" key={index}>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-center justify-center h-full py-4 dark:bg-gray-800 bg-gray-200 rounded-xl md:space-x-10">
                <div className="md:w-2/3 mx-8">
                  <p className="w-full text-2xl font-semibold dark:text-white m-5">{section.title}</p>
                  <p className="w-full pb-8 text-sm tracking-wide leading-tight dark:text-white m-5">
                    {section.description}
                  </p>
                </div>
                <div className="w-auto h-auto md:w-1/3 md:p-5 mx-5">
                  <img className="flex-1 w-full rounded-lg md:rounded-none" src={section.imageUrl} alt="" />
                </div>
              </div>
            </div>
          ))}
        </Container>
      );
}
export default FrontpageCard