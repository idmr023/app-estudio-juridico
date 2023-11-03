import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { validarEmail, validarPassword } from "./validaciones";

const DatosUsuario = ({ updateStep }) => {
  const [email, setEmail] = useState({
    value: "",
    valid: null,
  });
  const [password, setPassword] = useState({ value: "", valid: null });

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    const isValid = validarEmail(emailValue);
    setEmail({ value: emailValue, valid: isValid });
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    const isValid = validarPassword(passwordValue);
    setPassword({ value: passwordValue, valid: isValid });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.valid && password.valid) {
      console.log("Siguiente formulario");
      console.log(email, password);
      updateStep(1);
    } else {
      console.log("No hacer nada");
    }
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Correo electrónico"
        variant="outlined"
        fullWidth
        margin="dense"
        type="email"
        error={email.valid === false}
        helperText={
          email.valid === false && "Ingresa un correo electrónico válido."
        }
        value={email.value}
        onChange={handleEmailChange}
      />
      <TextField
        label="Contraseña"
        variant="outlined"
        fullWidth
        margin="dense"
        type="password"
        error={password.valid === false}
        helperText={
          password.valid === false &&
          "Ingresa una contraseña válida, al menos 8 caracteres y máximo 20."
        }
        value={password.value}
        onChange={handlePasswordChange}
      />
      <Button variant="contained" type="submit">
        Siguiente
      </Button>
    </Box>
  );
};

export default DatosUsuario;