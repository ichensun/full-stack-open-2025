const Persons = ({ data }) => {
  return (
    <div>
      {data.map((person) => (
        <p key={person.id} style={{ margin: '2px 0' }}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
