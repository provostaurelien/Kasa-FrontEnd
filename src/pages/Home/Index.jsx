import PropertyList from '../../Services/Api.jsx';

function Home() {
  return (
    <div className="home">
      <h1>Liste des propriétés</h1>
      <PropertyList />
    </div>
  );
}

export default Home;
