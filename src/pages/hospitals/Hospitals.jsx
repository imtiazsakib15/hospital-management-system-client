const Hospitals = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const address = e.target.address.value;

    const hospitalInfo = {
      id: "",
      name,
      address,
    };
    console.log(hospitalInfo);
  };
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center">Add Hospitals Details</h1>
      <form onSubmit={handleSubmit} className="w-96 mx-auto py-6 space-y-3">
        <div className="grid grid-cols-5 items-center">
          <label htmlFor="name">Name:</label>
          <input
            className="border col-span-4 px-2 py-1"
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className="grid grid-cols-5 items-center">
          <label htmlFor="address">Address:</label>
          <input
            className="border col-span-4 px-2 py-1"
            type="text"
            name="address"
            id="address"
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          type="submit"
        >
          Add Hospital
        </button>
      </form>
    </div>
  );
};

export default Hospitals;
