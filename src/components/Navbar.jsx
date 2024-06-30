import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="text-lg flex justify-end gap-12 px-5 py-4 border-b">
      <Link to="/patients">Patients</Link>
      <Link to="/doctors">Doctors</Link>
      <Link to="/hospitals">Hospitals</Link>
      <Link to="/specializations">Specializations</Link>
    </div>
  );
};

export default Navbar;
