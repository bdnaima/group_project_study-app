const Home = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div>
      <h1>Welcome {currentUser?.fullName}!</h1>
    </div>
  );
};

export default Home;
