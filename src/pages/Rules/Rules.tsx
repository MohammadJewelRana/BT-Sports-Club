 

const Rules = () => {
  const rules=[
    {
      "title": "Respect Rules and Regulations",
      "description": "All players must adhere to the established rules and regulations to ensure safety and fair play."
    },
    {
      "title": "No Use of Slang or Offensive Language",
      "description": "Players should maintain respectful communication and avoid using slang or offensive language."
    },
    {
      "title": "No Quarreling",
      "description": "Disputes should be resolved amicably. Quarreling or aggressive behavior is strictly prohibited."
    },
    {
      "title": "Mandatory Fundraising Contributions",
      "description": "Every member is required to contribute a designated amount during fundraising efforts, which will be used for purchasing sporting goods."
    },
    {
      "title": "Lost Ball Replacement",
      "description": "If a player loses a ball, they are responsible for replacing it. If they fail to do so, the committee will take appropriate action."
    },
    {
      "title": "Committee Responsibilities",
      "description": "Committee members are responsible for managing funds, calculating expenses, and ensuring that all financial activities are transparent and fair."
    },
    {
      "title": "Protect Building Instruments",
      "description": "Players must take care not to damage any building instruments or property. Any damage caused will be addressed by the committee."
    },
    {
      "title": "Soft Balls",
      "description": "Use soft or foam cricket balls instead of hard ones to minimize the risk of injury and property damage."
    },
    {
      "title": "Indoor-Friendly Equipment",
      "description": "Choose equipment that is suitable for indoor play, such as lightweight plastic or foam bats and wickets."
    },
    {
      "title": "Designated Playing Area",
      "description": "The rooftop playing area should be free from fragile or valuable items to prevent accidental damage."
    },
    {
      "title": "Clear Boundaries",
      "description": "Clearly define the playing area boundaries to avoid disputes and ensure everyone knows where the ball can and cannot go."
    },
    {
      "title": "No-Go Zones",
      "description": "Identify areas on the rooftop where playing cricket is not allowed to prevent accidents or damage."
    },
    {
      "title": "Limited Overs",
      "description": "Play shorter overs to keep the game manageable and minimize disruptions."
    },
    {
      "title": "No Full Swings",
      "description": "Restrict full swings while batting to avoid accidental hits to walls, ceilings, or other objects."
    },
    {
      "title": "Soft Shots",
      "description": "Encourage players to play softer shots to reduce the force of the ball."
    },
    {
      "title": "Safe Bowling Style",
      "description": "Adopt underarm or gentle overarm bowling to minimize the ball's force."
    },
    {
      "title": "Safety Gear",
      "description": "Although soft balls are used, players should consider wearing lightweight helmets and padding for additional protection."
    },
    {
      "title": "Keep Emergency Exits Clear",
      "description": "Ensure that emergency exits and pathways are unobstructed by cricket equipment."
    },
    {
      "title": "Supervision",
      "description": "A responsible person or supervisor should be present to ensure the game is played safely and according to the rules."
    },
    {
      "title": "Respect for Property",
      "description": "Players should respect the building and its contents, taking care to avoid causing any damage."
    },
    {
      "title": "Permission",
      "description": "If playing in a shared or public space, obtain permission from the relevant authorities or property owners."
    },
    {
      "title": "Additional Rules",
      "description": "Follow any additional rules set by the committee or building management to ensure a safe and enjoyable playing environment."
    }
  ]
  

  return (
    <div>
      {/* <Heading heading={"rules"}></Heading> */}

      <div className="   w-full   md:p-2 ">


     
      <header className="w-full max-w-2xl mx-auto text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800">Cricket Rules for Indoor Play</h1>
        <p className="mt-4 text-gray-600">
          Follow these guidelines to ensure a safe and enjoyable cricket experience in a confined space or building.
        </p>
      </header>

      <main className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        {rules.map((rule, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{rule.title}</h2>
            <p className="text-gray-600 text-xl text-justify">{rule.description}</p>
          </div>
        ))}
      </main>
 
 






      </div>
    </div>
  );
};

export default Rules;
