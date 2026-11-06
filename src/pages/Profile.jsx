import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { email, logout, getProfile } = useContext(UserContext);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        await getProfile();
      } catch (error) {
        console.error(error);
      }
    };

    cargarPerfil();
  }, [getProfile]);

  return (
    <main className="profile-page">
      <section className="profile">
        <h1>Perfil de usuario</h1>
        <p className="profile-email">
          Email: <strong>{email}</strong>
        </p>
        <button type="button" className="btn btn-dark" onClick={logout}>
          Cerrar sesión
        </button>
      </section>
    </main>
  );
};

export default Profile;
