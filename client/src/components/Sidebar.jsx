import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <h2 className="sidebar-title">Stone Paper Scissors Arena</h2>
      <NavLink
        to="/"
        end
        className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
      >
        Play Game
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
      >
        History
      </NavLink>
    </nav>
  );
}