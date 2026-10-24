// Reading form fields in admin actions
export const text = (data: FormData, name: string) => String(data.get(name) ?? "").trim();

// an empty field is stored as NULL
export const optional = (data: FormData, name: string) => text(data, name) || null;

// a textarea with one item per line
export const lines = (data: FormData, name: string) =>
  text(data, name)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Něco se nepovedlo, zkuste to prosím znovu.";
