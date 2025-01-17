import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      try {
        const response = await fetch(
          `http://localhost:8000/verify-token/${token}`
        );

        if (!response.ok) {
          throw new Error("Echec de la vérification du Token");
        }
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    verifyToken();
  }, [navigate]);

  return <div>Cette page n'est visible que de ceux qui sont connecté</div>;
}

export default ProtectedPage;
