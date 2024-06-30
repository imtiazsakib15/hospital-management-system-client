const Specializations = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    const specializationInfo = {
      id: "",
      name,
    };
    console.log(specializationInfo);
  };
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center">
        Add Specializations Details
      </h1>
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
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          type="submit"
        >
          Add Specialization
        </button>
      </form>
    </div>
  );
};

export default Specializations;
