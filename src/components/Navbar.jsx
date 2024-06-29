const Navbar = () => {
  return (
    <div className="text-lg flex justify-end gap-12 px-5 py-4 border-b">
      <a href="/patients">Patients</a>
      <a href="/doctors">Doctors</a>
      <a href="/hospitals">Hospitals</a>
      <a href="/specializations">Specializations</a>
    </div>
  );
};

export default Navbar;
