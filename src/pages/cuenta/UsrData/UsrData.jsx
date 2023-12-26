import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLock } from "@fortawesome/free-solid-svg-icons";

const UsrData = () => {
  const [toggleState, untoggle] = useState(true);

  const accountString = localStorage.getItem('account');
  const accountObject = JSON.parse(accountString);

  const toggleHandler = () => {
    untoggle((toggleState) => !toggleState);
  };

  return (
    <>
      <h1 className="text-4xl">Cuenta</h1>
      <div className="bg-gray-200 flex flex-col justify-between rounded-lg shadow-lg p-5 w-115 mx-40">
          <h1 className="text-2xl text-center">Datos del usuario</h1>
          {toggleState ? (
            <div className="text-2xl">
              {accountObject.name && (
                <div>
                  <p className="text-teal-500 font-bold">Nombre:</p>
                  <p className="text-xl">{accountObject.name}</p>

                  <p className="text-teal-500 font-bold">DNI:</p>
                  <p className="text-xl">{accountObject.dni}</p>
                  
                  <p className="text-teal-500 font-bold">Email:</p>
                  <p className="text-xl">{accountObject.email}</p>
                </div>  
              )}
            </div>
          ) : null}

        <button className="block mx-auto mt-15 rounded-full bg-teal-500 border-none text-white font-semibold py-2 px-5 cursor-pointer" onClick={toggleHandler}>
          <p className="text-center">Ver datos del usuario</p>
          <FontAwesomeIcon 
            className="h-6 w-full mx-auto"
            icon={toggleState ? faLock : faEye}
            alt="Privacidad de datos del usuario"
          />
        </button>
      </div>
      </>
  );
};

export default UsrData;