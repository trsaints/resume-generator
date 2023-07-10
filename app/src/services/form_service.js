function getValidityState(target) {
  const minLength = target.getAttribute("minlength") | 0,
    maxLength = target.getAttribute("maxlength") | 0,
    inputType = target.getAttribute("type");

  const validationTypes = [
    "patternMismatch",
    "tooLong",
    "tooShort",
    "typeMismatch",
    "valueMissing",
  ];

  const typePatternMessage = {
    email: "Um endereço de email: seu_endereco@dominio.subdominio",
    url: "Uma URL válida, por exemplo: https://example.com/",
    text: `Conter entre ${minLength} e ${maxLength} caracteres, não conter caracteres especiais (como !, @, #, etc.)`,
  };

  const validationMessages = {
    patternMismatch: `Este campo deve conter o seguinte padrão: ${typePatternMessage[inputType]}`,
    tooLong: `Este campo deve conter, no máximo, ${maxLength} caracteres.`,
    tooShort: `Este campo precisa de, no mínimo, ${minLength} caracteres.`,
    typeMismatch: `Este campo deve conter o seguinte padrão: ${typePatternMessage[inputType]}`,
    valueMissing: "É obrigatório preencher este campo.",
  };

  for (let i in validationTypes) {
    let type = validationTypes[i];

    let isInvalid = target.validity[type];

    if (isInvalid)
      return {
        valid: false,
        validityMessage: validationMessages[type],
        validationType: validationTypes[i],
      };
  }

  return { valid: true, validityMessage: "" };
}

export { getValidityState };
