// src/translations/index.js

export const translations = {
  en: {
    // Common
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    create: "Create",
    update: "Update",
    search: "Search",
    actions: "Actions",
    loading: "Loading...",
    saving: "Saving...",

    // Table
    name: "Name",
    title: "Title",
    description: "Description",
    createdAt: "Created At",
    noRecordsFound: "No records found",
    notSet: "Not Set",
    noDescription: "No Description",

    // Pagination
    previous: "Previous",
    next: "Next",
    page: "Page",
    of: "of",

    // Form validation
    required: "This field is required",
    minLength: "Minimum length is {min} characters",
    maxLength: "Maximum length is {max} characters",

    // Messages
    createSuccess: "Record created successfully",
    updateSuccess: "Record updated successfully",
    deleteSuccess: "Record deleted successfully",
    createError: "Failed to create record",
    updateError: "Failed to update record",
    deleteError: "Failed to delete record",

    // ... add other keys as you had

    // Auth
    login: "Login",
    logout: "Logout",
    signIn: "Sign In",
    welcomeBack: "Welcome back",
    loginToAccount: "Sign in to your account",
    invalidCredentials: "Invalid username or password",
    loginSuccess: "Successfully logged in!",
    logoutSuccess: "Successfully logged out!",
  },
  rw: {
    // Common
    save: "Bika",
    cancel: "Hagarika",
    edit: "Hindura",
    delete: "Siba",
    view: "Reba",
    create: "Kora",
    update: "Vugurura",
    search: "Shakisha",
    actions: "Ibikorwa",
    loading: "Birimo gutegurwa...",
    saving: "Birimo kubikwa...",

    // Table
    name: "Izina",
    title: "Umutwe",
    description: "Ibisobanuro",
    createdAt: "Byaremwe",
    noRecordsFound: "Nta makuru yabonetse",
    notSet: "Ntabwo byashyizweho",
    noDescription: "Nta bisobanuro",

    // Pagination
    previous: "Ibanziriza",
    next: "Ikurikira",
    page: "Urupapuro",
    of: "kuri",

    // Form validation
    required: "Iki kigabane gisabwa",
    minLength: "Uburebure buto ni inyuguti {min}",
    maxLength: "Uburebure bunini ni inyuguti {max}",

    // Messages
    createSuccess: "Byaremwe neza",
    updateSuccess: "Byavuguruwe neza",
    deleteSuccess: "Byasibwe neza",
    createError: "Byanze gukorwa",
    updateError: "Byanze guvugurura",
    deleteError: "Byanze gusiba",

    // ... add other keys as you had

    // Auth
    login: "Kwinjira",
    logout: "Gusohoka",
    signIn: "Kwinjira",
    welcomeBack: "Murakaza neza",
    loginToAccount: "Injira muri konti yawe",
    invalidCredentials: "Izina ry'ukoresha cyangwa ijambo banga si byo",
    loginSuccess: "Mwinjiye neza!",
    logoutSuccess: "Mwasohokiye neza!",
  },
};

export const t = (key, language, params) => {
  let text =
    (translations[language] && translations[language][key]) ||
    (translations.en && translations.en[key]) ||
    key;

  if (params) {
    Object.keys(params).forEach((param) => {
      text = text.replace(`{${param}}`, String(params[param]));
    });
  }

  return text;
};
