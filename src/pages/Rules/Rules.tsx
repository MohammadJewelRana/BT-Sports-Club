 

const Rules = () => {
    const rules = [
        {
          title: 'Soft Balls',
          description:
            'Use soft or foam cricket balls instead of hard cricket balls to minimize the risk of injury and property damage.',
        },
        {
          title: 'Indoor-Friendly Equipment',
          description:
            'Choose equipment suitable for indoor play. Use lightweight plastic or foam bats and wickets designed for indoor use.',
        },
        {
          title: 'Playing Area',
          description:
            'Designate a specific area within the building for cricket play. Make sure the space is free from fragile or valuable items to prevent accidental damage.',
        },
        {
          title: 'Clear Boundaries',
          description:
            'Clearly define the boundaries of the playing area to avoid disputes and ensure that players are aware of where the ball can and cannot go.',
        },
        {
          title: 'No-Go Zones',
          description:
            'Identify specific areas within the building where playing cricket is not allowed to prevent accidents or damage.',
        },
        {
          title: 'Limited Overs',
          description:
            'Consider playing shorter overs to keep the game more manageable and minimize disruptions in the building.',
        },
        {
          title: 'No Full Swings',
          description:
            'Restrict full swings while batting to prevent accidental hits to walls, ceilings, or other objects.',
        },
        {
          title: 'Soft Shots',
          description:
            'Encourage players to play softer shots to reduce the force with which the ball is hit.',
        },
        {
          title: 'Bowling Style',
          description:
            'Adopt underarm bowling or gentle overarm bowling to minimize the force of the ball.',
        },
        {
          title: 'Wearing Safety Gear',
          description:
            'Although soft balls are less likely to cause injury, consider wearing appropriate protective gear, such as lightweight helmets and padding.',
        },
        {
          title: 'Emergency Exits',
          description:
            'Ensure that emergency exits and pathways are kept clear at all times. Do not obstruct escape routes with cricket equipment.',
        },
        {
          title: 'Supervision',
          description:
            'Have a responsible person or supervisor present to ensure that the game is played safely and that players adhere to the modified rules.',
        },
        {
          title: 'Communication',
          description:
            'Establish clear communication among players to avoid collisions, accidental hits, or other safety hazards.',
        },
        {
          title: 'Respect for Property',
          description:
            'Emphasize the importance of respecting the building and its contents. Players should be aware of their surroundings and take care to avoid causing any damage.',
        },
        {
          title: 'Permission',
          description:
            'If playing in a shared or public space, obtain permission from the relevant authorities or property owners to ensure that playing cricket is allowed.',
        },
      ];

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
