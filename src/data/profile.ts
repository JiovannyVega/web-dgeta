export type Section = "personales" | "academicos" | "contacto" | "domicilio";
export type Values = Record<string, string>;
export const initialData: Record<Section, Values> = {
  personales: { nombres: "Roberto", apellidoPaterno: "Rangel", apellidoMaterno: "Garcia", sexo: "Masculino", fechaNacimiento: "2002-05-15", curp: "RAGR020515HDFNRA01" },
  academicos: { especialidad: "", turno: "", numeroControl: "", semestre: "", grupo: "", tutor: "" },
  contacto: {
    celular: "3312345678", telefonoCasa: "3398765432", correo: "roberto.rangel@estudiante.dgeta.edu.mx",
    emergenciaNombre: "", emergenciaApellidoPaterno: "", emergenciaApellidoMaterno: "",
    emergenciaCelular: "", emergenciaParentesco: "",
  },
  domicilio: { codigoPostal: "44100", estado: "Jalisco", municipio: "Guadalajara", localidad: "Guadalajara", colonia: "Centro", calle: "Avenida Hidalgo", numeroExterior: "123", numeroInterior: "A" },
};
