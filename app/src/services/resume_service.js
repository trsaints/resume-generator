export function generateResume({ components, form }) {
  const data = extractFormData(form);
}

function extractFormData(form) {
  const formData = new FormData(form);

  for (const [key, value] of formData) {
    console.log(`${key}: ${value}`);
  }
}
