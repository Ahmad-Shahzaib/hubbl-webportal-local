export function fileExist(file_url) {
  var http = new XMLHttpRequest();

  http.open("HEAD", file_url, false);
  http.send();

  return http.status != 404;
}

export function isPureText(string) {
  let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return !format.test(string);
}
export function loginValidator(data = new Object()) {
  // if (!data.email.includes("@") && !data.email.includes(".")) {
  //   return "The provided email address is not valid";
  // }
  return true;
}

export function hgvdetailsValidator_section1(data = new Object()) {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    address_line1: "Address Line 1",
    city: "Town / City",
    county: "County",
    code: "Post Code",
  };
  for (const property in labels) {
    count++;
    if (data[property] == "") {
      let section = "Update HGV Details";
      if (count > 5) {
        section = "'Bank Information Details' Section";
      }
      warnings.push(labels[property] + " is a required field");
      errors = {
        ...errors,
        ...{ [property]: labels[property] + " is a required field" },
      };
    } else if (
      (property == "bank_sort_code" &&
        (data[property].length > 8 || data[property] < 8)) ||
      (property == "bank_account_number" &&
        (data[property].length > 8 || data[property] < 8))
    ) {
      warnings.push(labels[property] + " must be an 8 digit number");
      errors = {
        ...errors,
        ...{ [property]: labels[property] + " must be an 8 digit number" },
      };
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
}

export function hgvdetailsValidator_section2(data = new Object()) {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    bank_name: "Business Bank Name",
    bank_sort_code: "Bank Sort Code",
    bank_account_number: "Bank Account Number",
  };
  for (const property in labels) {
    count++;
    if (data[property] == "") {
      let section = "Update HGV Details";
      if (count > 5) {
        section = "'Bank Information Details' Section";
      }
      warnings.push(labels[property] + " is a required field");
      errors = {
        ...errors,
        ...{ [property]: labels[property] + " is a required field" },
      };
    } else if (
      (property == "bank_sort_code" &&
        (data[property].length > 8 || data[property] < 8)) ||
      (property == "bank_account_number" &&
        (data[property].length > 8 || data[property] < 8))
    ) {
      warnings.push(labels[property] + " must be an 8 digit number");
      errors = {
        ...errors,
        ...{ [property]: labels[property] + " must be an 8 digit number" },
      };
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
}

export function hgvdetailsValidator(data = new Object()) {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    address_line1: "Address Line 1",
    city: "Town / City",
    county: "County",
    code: "Post Code",
    bank_name: "Business Bank Name",
    bank_sort_code: "Bank Sort Code",
    bank_account_number: "Bank Account Number",
  };
  for (const property in labels) {
    count++;
    if (data[property] == "") {
      let section = "Update HGV Details Section";
      if (count > 5) {
        section = "'Bank Information Details' Section";
      }
      warnings.push(labels[property] + " is a required field in " + section);
      errors = {
        ...errors,
        ...{ [property]: labels[property] + " is a required field" },
      };
    } else if (
      (property == "bank_sort_code" &&
        (data[property].length > 8 || data[property] < 8)) ||
      (property == "bank_account_number" &&
        (data[property].length > 8 || data[property] < 8))
    ) {
      warnings.push(
        labels[property] + " must be an 8 digit number in" + section
      );
      errors = {
        ...errors,
        ...{ [property]: labels[property] + " must be an 8 digit number" },
      };
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
}

export function profileValidator(data = new Object()) {
  if (data.first_name == "") {
    return "First Name is required";
  }
  if (data.last_name == "") {
    return "Last Name is required";
  }
  if (data.address == "" || data.address == null) {
    return "Address is required";
  }
  if (data.phone == "" || data.phone == null) {
    return "Phone is required";
  }
  return true;
}

export function adminValidator(data = new Object()) {
  if (!isPureText(data.first_name)) {
    return "The First Name field must not containt special characters";
  }
  if (!isPureText(data.last_name)) {
    return "The Last Name field must not containt special characters";
  }
  if (data.email == "") {
    return "The email field is required";
  }
  if (!data.email.includes("@") || !data.email.includes(".")) {
    return "Please write a valid email address";
  }
  if (data.phone_no == "" || data.phone_no == null || data.phone_no == "null") {
    return "Please enter a valid phone number";
  }
  return true;
}

export function passwordValidator(data = new Object()) {
  if (data.new_password == "") {
    return "Please write new password";
  }
  if (data.confirm_password == "") {
    return "Please rewrite your new password to confirm password reset request";
  }
  if (data.new_password !== data.confirm_password) {
    return "New Password is not matching with confirm password field!";
  }
  return true;
}
export function emailAddressValidator(email = new String()) {
  if (email == "") {
    return "Email is a required field";
  }
  if (!email.includes("@") || !email.includes(".") || email.includes("@.")) {
    return "Please write a valid email address";
  }
  return true;
}

export function emailValidator(data = new Object()) {
  if (data.from == "") {
    return "Please write email address to send from";
  }
  if (!data.from.includes("@") && !data.from.includes(".")) {
    return "Please provide a valid email address to send this email from";
  }
  if (data.to == "") {
    return "Please write receipents email address to send an email";
  }
  if (!data.to.includes("@") && !data.to.includes(".")) {
    return "Provided email list contains invalid email address";
  }
  if (data.subject == "") {
    return "Email Subject is required";
  }
  if (data.text == "") {
    return "Email text is required";
  }
  return true;
}

export const staffValidator_section1 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    home_address: "Home Address",
    phone_no: "Phone Number",
    dob: "Date Of Birth",
  };
  for (const property in labels) {
    count++;
    if (
      property !== "images" &&
      property !== "user_id" &&
      property !== "agency_id" &&
      property !== "correspondance_address"
    ) {
      if (data[property] == "") {
        let section = "'Profile Information' Section";
        if (count > 6 && count < 13) {
          section = "'Basic Information' Section";
        } else if (count > 13) {
          section = "'Bank Details' Section";
        }
        warnings.push(labels[property] + " is a required field");
        errors = {
          ...errors,
          ...{ [property]: labels[property] + " is a required field" },
        };
      } else if (
        (property == "bank_sort_code" &&
          (data[property].length > 8 || data[property] < 8)) ||
        (property == "bank_account_no" &&
          (data[property].length > 8 || data[property] < 8))
      ) {
        warnings.push(labels[property] + " must be an 8 digit number");
        errors = {
          ...errors,
          ...{ [property]: labels[property] + " must be an 8 digit number" },
        };
      }
      if (property == "email") {
        const valid = emailAddressValidator(data[property]);
        if (typeof valid !== "boolean") {
          warnings.push(valid);
          errors = {
            ...errors,
            ...{ [property]: valid },
          };
        }
      }
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const staffValidator_section2 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    sub_domain: "Sub Domain",
    correspondence_address: "Correspondence Address",
    national_insurance: "National Insurance",
    emp_no: "Employee Number",
    emp_start_date: "Employement Start Date",
    // emp_end_date: "Employement End Date",
    emp_type: "Employement Type",
  };
  for (const property in labels) {
    count++;
    if (
      property != "home_address" &&
      property !== "images" &&
      property !== "user_id" &&
      property !== "agency_id" &&
      property !== "correspondance_address"
    ) {
      if (data[property] == "") {
        let section = "'Profile Information' Section";
        if (count > 6 && count < 13) {
          section = "'Basic Information' Section";
        } else if (count > 13) {
          section = "'Bank Details' Section";
        }
        warnings.push(labels[property] + " is a required field");
        errors = {
          ...errors,
          ...{ [property]: labels[property] + " is a required field" },
        };
      } else if (
        (property == "bank_sort_code" &&
          (data[property].length > 8 || data[property] < 8)) ||
        (property == "bank_account_no" &&
          (data[property].length > 8 || data[property] < 8))
      ) {
        warnings.push(labels[property] + " must be an 8 digit number");
        errors = {
          ...errors,
          ...{ [property]: labels[property] + " must be an 8 digit number" },
        };
      }
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const staffValidator_section3 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    personal_bank_name: "Personal Bank Name",
    bank_sort_code: "Bank Sort Code",
    bank_account_no: "Bank Account Number",
  };
  for (const property in labels) {
    count++;
    if (
      property != "home_address" &&
      property !== "images" &&
      property !== "user_id" &&
      property !== "agency_id" &&
      property !== "correspondance_address"
    ) {
      if (data[property] == "") {
        let section = "'Profile Information' Section";
        if (count > 6 && count < 13) {
          section = "'Basic Information' Section";
        } else if (count > 13) {
          section = "'Bank Details' Section";
        }
        warnings.push(labels[property] + " is a required field");
        errors = {
          ...errors,
          ...{ [property]: labels[property] + " is a required field" },
        };
      } else if (
        property == "bank_sort_code" ||
        property == "bank_account_no"
      ) {
        if (property == "bank_sort_code" && String(data[property]).length < 6) {
          warnings.push(labels[property] + " must be an 6 digit number");
          errors = {
            ...errors,
            ...{ [property]: labels[property] + " must be an 6 digit number" },
          };
        }
        if (
          property == "bank_account_no" &&
          String(data[property]).length < 8
        ) {
          warnings.push(labels[property] + " must be an 8 digit number");
          errors = {
            ...errors,
            ...{ [property]: labels[property] + " must be an 8 digit number" },
          };
        }
      }
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const staffValidator = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    home_address: "Home Address",
    phone_no: "Phone Number",
    dob: "Date Of Birth",
    images: "Profile Image",
    sub_domain: "Sub Domain",
    correspondence_address: "Correspondence Address",
    national_insurance: "National Insurance",
    emp_no: "Employee Number",
    emp_start_date: "Employement Start Date",
    // emp_end_date: "Employement End Date",
    emp_type: "Employement Type",
    personal_bank_name: "Personal Bank Name",
    bank_sort_code: "Bank Sort Code",
    bank_account_no: "Bank Account Number",
  };
  for (const property in labels) {
    count++;
    if (
      property !== "images" &&
      property !== "user_id" &&
      property !== "agency_id" &&
      property !== "correspondance_address"
    ) {
      let section = "'Profile Information' Section";
      if (count > 6 && count < 13) {
        section = "'Basic Information' Section";
      } else if (count > 13) {
        section = "'Bank Details' Section";
      }
      if (data[property] == "") {
        warnings.push(labels[property] + " is a required field in" + section);
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " is a required field",
          },
        };
      } else if (
        property == "bank_sort_code" ||
        property == "bank_account_no"
      ) {
        if (property == "bank_sort_code" && String(data[property]).length < 6) {
          warnings.push(
            labels[property] + " must be an 6 digit number in" + section
          );
          errors = {
            ...errors,
            ...{ [property]: labels[property] + " must be an 6 digit number" },
          };
        }
        if (
          property == "bank_account_no" &&
          String(data[property]).length < 8
        ) {
          warnings.push(
            labels[property] + " must be an 8 digit number in" + section
          );
          errors = {
            ...errors,
            ...{ [property]: labels[property] + " must be an 8 digit number" },
          };
        }
      }
      if (property == "email") {
        const valid = emailAddressValidator(data[property]);
        if (typeof valid !== "boolean") {
          warnings.push(valid + "in " + section);
          errors = {
            ...errors,
            ...{ [property]: valid },
          };
        }
      }
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const driverFormValidator_section1 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    driver_code: "Driver Code",
    first_name: "First Name",
    last_name: "Last Name",
    phone_no: "Phone Number",
    email: "Email",
    address_line1: "Address Line 1",
    county: "County",
    post_code: "Post Code",
    company_registeration_number: "Company Registration Number",
    license_number: "License Number",
    proposed_com_name: "Proposed Company Name",
    town: "Town",
    dob: "Date of birth",
    national_insurance_no: "National Insurance Number",
  };
  const sections = [
    "Personal Information",
    "Bank Information",
    "B2B Operation",
    "Legal",
    "Attachments",
    "General Information",
  ];
  for (const property in labels) {
    count++;
    // if (data[property]) {
    if (
      property == "driver_code" ||
      property == "address_line1" ||
      property == "first_name" ||
      property == "last_name" ||
      property == "phone_no" ||
      property == "town" ||
      property == "county" ||
      property == "post_code" ||
      property == "proposed_com_name" ||
      property == "dob" ||
      property == "email" ||
      property == "national_insurance_no" ||
      property == "company_registeration_number" ||
      property == "license_number" ||
      property == "personal_bank_name" ||
      property == "bank_sort_code" ||
      property == "LTD" ||
      property == "PLI" ||
      property == "bank_account_no"
    ) {
      // if (property == "driver_code") {
      //   alert(data[property]);
      // }
      // alert("working");
      let section = "";
      if (count < 20) {
        section = sections[0] + " Section";
      } else if (count < 25) {
        section = sections[1] + " Section";
      } else if (count < 32) {
        section = sections[2] + " Section";
      } else if (count < 36) {
        section = sections[3] + " Section";
      }
      if (
        data[property] == "" ||
        data[property] == null ||
        data[property] == "null"
      ) {
        warnings.push(labels[property] + " is a required field");
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " is a required field",
          },
        };
      }
      if (
        property == "bank_account_no" &&
        (!(data[property].length >= 8) || isNaN(data[property]))
      ) {
        warnings.push(labels[property] + " must be an 8 digit number");
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " must be an 8 digit number",
          },
        };
      }
      if (
        property == "bank_sort_code" &&
        (!(data[property].length >= 6) || isNaN(data[property]))
      ) {
        warnings.push(labels[property] + " must be a 6 digit number");
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " must be a 6 digit number",
          },
        };
      }
      if (
        property == "company_registeration_number" &&
        (data[property] < 10 && data[property] > 10)
      ) {
        warnings.push(labels[property] + " must be an 10 digit number");
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " must be an 10 digit number",
          },
        };
      }
      if (
        property == "license_number" &&
        (data[property] < 20 && data[property] > 20)
      ) {
        warnings.push(labels[property] + " must be an 20 digit number");
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " must be an 20 digit number",
          },
        };
      }
      if (property == "email") {
        const valid = emailAddressValidator(data[property]);
        if (typeof valid !== "boolean") {
          warnings.push(valid);
          errors = {
            ...errors,
            ...{ [property]: valid },
          };
        }
      }
    }
    // }
  }

  if (data.vat_flag == "Yes" && data.vat_reg_no == "") {
    errors = {
      ...errors,
      ...{
        vat_reg_no:
          "Vat Registeration Number is required if the VAT Flag is Yes",
      },
    };
    warnings.push(
      "Vat Registeration Number is required if the VAT Flag is Yes"
    );
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const driverFormValidator_section2 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    personal_bank_name: "Business Bank Name",
    bank_sort_code: "Bank Sort Code",
    bank_account_no: "Bank Account Number",
  };
  const sections = [
    "Personal Information",
    "Bank Information",
    "B2B Operation",
    "Legal",
    "Attachments",
    "General Information",
  ];
  for (const property in labels) {
    count++;
    // if (data[property]) {
    if (
      property == "driver_code" ||
      property == "address_line1" ||
      property == "first_name" ||
      property == "last_name" ||
      property == "phone_no" ||
      property == "town" ||
      property == "county" ||
      property == "post_code" ||
      property == "proposed_com_name" ||
      property == "dob" ||
      property == "email" ||
      property == "national_insurance_no" ||
      property == "company_registeration_number" ||
      property == "license_number" ||
      property == "personal_bank_name" ||
      property == "bank_sort_code" ||
      property == "LTD" ||
      property == "PLI" ||
      property == "bank_account_no"
    ) {
      // if (property == "driver_code") {
      //   alert(data[property]);
      // }
      // alert("working");
      let section = "";
      if (count < 20) {
        section = sections[0] + " Section";
      } else if (count < 25) {
        section = sections[1] + " Section";
      } else if (count < 32) {
        section = sections[2] + " Section";
      } else if (count < 36) {
        section = sections[3] + " Section";
      }
      if (
        data[property] == "" ||
        data[property] == null ||
        data[property] == "null"
      ) {
        warnings.push(labels[property] + " is a required field");
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " is a required field",
          },
        };
      }
      if (
        property == "bank_account_no" &&
        (!(data[property].length == 8) || isNaN(data[property]))
      ) {
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " must be an 8 digit number",
          },
        };
        warnings.push(labels[property] + " must be an 8 digit number");
      }
      if (
        property == "bank_sort_code" &&
        (!(data[property].length >= 6) || isNaN(data[property]))
      ) {
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " must be a 6 digit number",
          },
        };
        warnings.push(labels[property] + " must be a 6 digit number");
      }
      if (
        property == "company_registeration_number" &&
        (data[property] < 10 && data[property] > 10)
      ) {
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " must be an 10 digit number",
          },
        };
        warnings.push(labels[property] + " must be an 10 digit number");
      }
      if (
        property == "license_number" &&
        (data[property] < 20 && data[property] > 20)
      ) {
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " must be an 20 digit number",
          },
        };
        warnings.push(labels[property] + " must be an 20 digit number");
      }
    }
    // }
  }

  if (data.vat_flag == "Yes" && data.vat_reg_no == "") {
    errors = {
      ...errors,
      ...{
        vat_reg_no:
          "Vat Registeration Number is required if the VAT Flag is Yes",
      },
    };
    warnings.push(
      "Vat Registeration Number is required if the VAT Flag is Yes"
    );
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const driverFormValidator = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    driver_code: "Driver Code",
    first_name: "First Name",
    last_name: "Last Name",
    phone_no: "Phone Number",
    email: "Email",
    address_line1: "Address Line 1",
    town: "Town",
    county: "County",
    post_code: "Post Code",
    company_registeration_number: "Company Registration Number",
    license_number: "License Number",
    proposed_com_name: "Proposed Company Name",
    dob: "Date of birth",
    national_insurance_no: "National Insurance Number",
    personal_bank_name: "Business Bank Name",
    bank_sort_code: "Bank Sort Code",
    bank_account_no: "Bank Account Number",
  };
  const sections = [
    "Personal Information",
    "Bank Information",
    "B2B Operation",
    "Legal",
    "Attachments",
    "General Information",
  ];
  for (const property in labels) {
    count++;
    // if (data[property]) {
    if (
      property == "driver_code" ||
      property == "address_line1" ||
      property == "first_name" ||
      property == "last_name" ||
      property == "phone_no" ||
      property == "town" ||
      property == "county" ||
      property == "post_code" ||
      property == "proposed_com_name" ||
      property == "dob" ||
      property == "email" ||
      property == "national_insurance_no" ||
      property == "company_registeration_number" ||
      property == "license_number" ||
      property == "personal_bank_name" ||
      property == "bank_sort_code" ||
      property == "LTD" ||
      property == "PLI" ||
      property == "bank_account_no"
    ) {
      // if (property == "driver_code") {
      //   alert(data[property]);
      // }
      // alert("working");
      let section = "";
      if (count < 15) {
        section = sections[0] + " Section";
      } else if (count < 25) {
        section = sections[1] + " Section";
      } else if (count < 32) {
        section = sections[2] + " Section";
      } else if (count < 36) {
        section = sections[3] + " Section";
      }
      if (
        data[property] == "" ||
        data[property] == null ||
        data[property] == "null"
      ) {
        warnings.push(labels[property] + " is a required field in " + section);
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " is a required field",
          },
        };
      }
      if (
        property == "bank_account_no" &&
        (!(data[property].length == 8) || isNaN(data[property]))
      ) {
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " must be an 8 digit number",
          },
        };
        warnings.push(
          labels[property] + " must be an 8 digit number in " + section
        );
      }
      if (
        property == "bank_sort_code" &&
        (!(data[property].length >= 6) || isNaN(data[property]))
      ) {
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " must be a 6 digit number",
          },
        };
        warnings.push(
          labels[property] + " must be a 6 digit number in " + section
        );
      }
      if (
        property == "company_registeration_number" &&
        (data[property] < 10 && data[property] > 10)
      ) {
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " must be an 10 digit number",
          },
        };
        warnings.push(
          labels[property] + " must be an 10 digit number in " + section
        );
      }
      if (
        property == "license_number" &&
        (data[property] < 20 && data[property] > 20)
      ) {
        errors = {
          ...errors,
          ...{
            [property]: labels[property] + " must be an 20 digit number",
          },
        };
        warnings.push(
          labels[property] + " must be an 20 digit number in " + section
        );
      }
      if (property == "email") {
        const valid = emailAddressValidator(data[property]);
        if (typeof valid !== "boolean") {
          warnings.push(valid + " in " + section);
          errors = {
            ...errors,
            ...{ [property]: valid },
          };
        }
      }
    }
    // }
  }

  if (data.vat_flag == "Yes" && data.vat_reg_no == "") {
    errors = {
      ...errors,
      ...{
        vat_reg_no:
          "Vat Registeration Number is required if the VAT Flag is Yes",
      },
    };
    warnings.push(
      "Vat Registeration Number is required if the VAT Flag is Yes in Personal Information Section"
    );
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const hirerFormValidator_section1 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    company_re_name: "Company Registered Name",
    company_re_no: "Company Registered Number",
    company_trading_name: "Company Trading Name",
  };
  const sections = [
    "Company Details",
    "Address Details",
    "Contact Details",
    "Bio & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "company_re_name" ||
      property == "company_re_no" ||
      property == "company_trading_name" ||
      property == "address_line1" ||
      property == "town" ||
      property == "county" ||
      property == "post_code" ||
      property == "sub_domain" ||
      property == "email" ||
      property == "dob" ||
      property == "phone_no1" ||
      property == "flag" ||
      property == "short_description"
    ) {
      let section = "";
      if (count < 5) {
        section = sections[0] + " Section";
      } else if (count < 12) {
        section = sections[1] + " Section";
      } else if (count < 17) {
        section = sections[2] + " Section";
      } else {
        section = sections[3] + " Section";
      }
      if (data[property] == "") {
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field");
      }
      if (property == "company_re_no" && data[property].length > 8) {
        warnings.push(
          labels[property] + " may not contain more than 8 numbers"
        );
        errors = {
          ...errors,
          [property]: labels[property] + " may not contain more than 8 numbers",
        };
      }
    }
  }

  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};
export const hirerFormValidator_section2 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    address_line1: "Address Line 1",
    town: "Town",
    county: "County",
    post_code: "Post Code",
  };
  const sections = [
    "Company Details",
    "Address Details",
    "Contact Details",
    "Bio & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "company_re_name" ||
      property == "company_re_no" ||
      property == "company_trading_name" ||
      property == "address_line1" ||
      property == "town" ||
      property == "county" ||
      property == "post_code" ||
      property == "sub_domain" ||
      property == "email" ||
      property == "dob" ||
      property == "phone_no1" ||
      property == "flag" ||
      property == "short_description"
    ) {
      let section = "";
      if (count < 5) {
        section = sections[0] + " Section";
      } else if (count < 12) {
        section = sections[1] + " Section";
      } else if (count < 17) {
        section = sections[2] + " Section";
      } else {
        section = sections[3] + " Section";
      }
      if (data[property] == "") {
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field");
      }
      if (property == "company_re_no" && data[property].length > 8) {
        warnings.push(
          labels[property] + " may not contain more than 8 numbers"
        );
        errors = {
          ...errors,
          [property]: labels[property] + " may not contain more than 8 numbers",
        };
      }
    }
  }

  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};
export const hirerFormValidator_section3 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    email: "Email",
    phone_no1: "Phone Number 1",
  };
  const sections = [
    "Company Details",
    "Address Details",
    "Contact Details",
    "Bio & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "company_re_name" ||
      property == "company_re_no" ||
      property == "company_trading_name" ||
      property == "address_line1" ||
      property == "town" ||
      property == "county" ||
      property == "post_code" ||
      property == "sub_domain" ||
      property == "email" ||
      property == "dob" ||
      property == "phone_no1" ||
      property == "flag" ||
      property == "short_description"
    ) {
      let section = "";
      if (count < 5) {
        section = sections[0] + " Section";
      } else if (count < 12) {
        section = sections[1] + " Section";
      } else if (count < 17) {
        section = sections[2] + " Section";
      } else {
        section = sections[3] + " Section";
      }
      if (data[property] == "") {
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field");
      }
      if (property == "company_re_no" && data[property].length > 8) {
        warnings.push(
          labels[property] + " may not contain more than 8 numbers"
        );
        errors = {
          ...errors,
          [property]: labels[property] + " may not contain more than 8 numbers",
        };
      }
      if (property == "email") {
        const valid = emailAddressValidator(data[property]);
        if (typeof valid !== "boolean") {
          warnings.push(valid);
          errors = {
            ...errors,
            ...{ [property]: valid },
          };
        }
      }
      if (property == "email") {
        const valid = emailAddressValidator(data[property]);
        if (typeof valid !== "boolean") {
          warnings.push(valid);
          errors = {
            ...errors,
            ...{ [property]: valid },
          };
        }
      }
    }
  }

  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};
export const hirerFormValidator_section4 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    flag: "Hirer Flag",
    short_description: "Short Description",
  };
  const sections = [
    "Company Details",
    "Address Details",
    "Contact Details",
    "Bio & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "company_re_name" ||
      property == "company_re_no" ||
      property == "company_trading_name" ||
      property == "address_line1" ||
      property == "town" ||
      property == "county" ||
      property == "post_code" ||
      property == "sub_domain" ||
      property == "email" ||
      property == "dob" ||
      property == "phone_no1" ||
      property == "flag" ||
      property == "short_description"
    ) {
      let section = "";
      if (count < 5) {
        section = sections[0] + " Section";
      } else if (count < 12) {
        section = sections[1] + " Section";
      } else if (count < 17) {
        section = sections[2] + " Section";
      } else {
        section = sections[3] + " Section";
      }
      if (data[property] == "") {
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field");
      }
      if (property == "company_re_no" && data[property].length > 8) {
        warnings.push(
          labels[property] + " may not contain more than 8 numbers"
        );
        errors = {
          ...errors,
          [property]: labels[property] + " may not contain more than 8 numbers",
        };
      }
    }
  }

  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};
export const hirerFormValidator = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    company_re_name: "Company Registered Name",
    company_trading_name: "Company Trading Name",
    company_re_no: "Company Registered Number",
    address_line1: "Address Line 1",
    town: "Town / City",
    county: "County",
    post_code: "Post Code",
    email: "Email",
    phone_no1: "Phone Number 1",
    flag: "Hirer Flag",
    short_description: "Short Description",
  };
  const sections = [
    "Company Details",
    "Address Details",
    "Contact Details",
    "Bio & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "company_re_name" ||
      property == "company_re_no" ||
      property == "company_trading_name" ||
      property == "address_line1" ||
      property == "town" ||
      property == "county" ||
      property == "post_code" ||
      property == "sub_domain" ||
      property == "email" ||
      property == "dob" ||
      property == "phone_no1" ||
      property == "flag" ||
      property == "short_description"
    ) {
      let section = "";
      if (count < 4) {
        section = sections[0] + " Section";
      } else if (count < 8) {
        section = sections[1] + " Section";
      } else if (count < 10) {
        section = sections[2] + " Section";
      } else {
        section = sections[3] + " Section";
      }
      if (data[property] == "") {
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field in " + section);
      }
      if (property == "company_re_no" && data[property].length > 8) {
        warnings.push(
          labels[property] +
            " may not contain more than 8 numbers in " +
            section
        );
        errors = {
          ...errors,
          [property]: labels[property] + " may not contain more than 8 numbers",
        };
      }
      if (property == "email") {
        const valid = emailAddressValidator(data[property]);
        if (typeof valid !== "boolean") {
          warnings.push(valid);
          errors = {
            ...errors,
            ...{ [property]: valid },
          };
        }
      }
    }
  }

  if (data.short_description == null || data.short_description.length > 1000) {
    warnings.push(
      "Short Description must not be more than 1000 characters in Bio & Other Detils Section"
    );
    errors = {
      ...errors,
      short_description:
        "Short Description must not be more than 1000 characters in Bio & Other Detils Section",
    };
  }

  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const agencySubstitutionValidator_section1 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    short_description: "Title",
    long_description: "Description",
    contact_person: "Contact Person",
    phone_number: "Phone Number",
  };
  const sections = [
    "Title & Description",
    "Job Details",
    "Job Starting Detils",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "short_description" ||
      property == "long_description" ||
      property == "flag" ||
      property == "group_drivers" ||
      property == "drivers_count" ||
      property == "start" ||
      property == "start" ||
      property == "start1" ||
      property == "start_time" ||
      property == "start_date" ||
      property == "end" ||
      property == "end1" ||
      property == "contact_person" ||
      property == "phone_number" ||
      property == "hire_type" ||
      property == "driver_class" ||
      property == "hire_quantity" ||
      property == "hirer_rate"
    ) {
      let section = "";
      if (count < 5) {
        section = sections[0] + " Section";
      } else if (count < 11) {
        section = sections[1] + " Section";
      } else if (count < 16) {
        section = sections[2] + " Section";
      } else if (count < 20) {
        section = sections[3] + " Section";
      } else {
        section = sections[4] + " Section";
      }
      if (
        (data[property] == "" || data[property] == null) &&
        data[property] !== "group_drivers"
      ) {
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field");
      }
      if (
        property == "flag" &&
        data.flag == "1" &&
        (data["group_drivers"] == "" || data["driver_id"] == "")
      ) {
        if (data["group_drivers"] == "") {
          errors = {
            ...errors,
            group_drivers: "Please select a driver",
          };
        } else if (data["driver_id"] == "") {
          errors = {
            ...errors,
            group_drivers: "Please select a main driver",
          };
        }
        warnings.push(
          "Main driver & the driver assigned to this substitution job must be specified"
        );
      }
      if (
        property == "short_description" &&
        data[property] &&
        data[property].length > 45
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 45 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 45 numbers"
        );
      }
      if (
        property == "long_description" &&
        data[property] &&
        data[property].length > 250
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 250 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 250 numbers"
        );
      }
      if (property == "phone_number" && isNaN(data[property])) {
        errors = {
          ...errors,
          [property]: labels[property] + " Must be a number",
        };
        warnings.push(labels[property] + " Must be a number");
      }
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const agencySubstitutionValidator_section2 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    group_drivers: "'Select Driver To Assign'",
    driver_id: "Main Driver",
    flag: "Publish Flag",
    hire_type: "Hire Type",
    driver_class: "Driver Class",
    hire_quantity: "Hire Quantity",
    hirer_rate: "Hire Rate",
  };
  const sections = [
    "Title & Description",
    "Job Details",
    "Job Starting Detils",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "short_description" ||
      property == "long_description" ||
      property == "flag" ||
      property == "driver_id" ||
      property == "group_drivers" ||
      property == "drivers_count" ||
      property == "start" ||
      property == "start" ||
      property == "start1" ||
      property == "start_time" ||
      property == "start_date" ||
      property == "end" ||
      property == "end1" ||
      property == "contact_person" ||
      property == "phone_number" ||
      property == "hire_type" ||
      property == "driver_class" ||
      property == "hire_quantity" ||
      property == "hirer_rate"
    ) {
      let section = "";
      if (count < 5) {
        section = sections[0] + " Section";
      } else if (count < 11) {
        section = sections[1] + " Section";
      } else if (count < 16) {
        section = sections[2] + " Section";
      } else if (count < 20) {
        section = sections[3] + " Section";
      } else {
        section = sections[4] + " Section";
      }
      if (
        (data[property] == "" || data[property] == null) &&
        property !== "group_drivers" &&
        property !== "driver_id"
      ) {
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field");
      }
      if (
        property == "flag" &&
        data.flag == "1" &&
        (data["group_drivers"] == "" || data["driver_id"] == "")
      ) {
        if (data["group_drivers"] == "") {
          errors = {
            ...errors,
            group_drivers: "Please select a driver to assign",
          };
        }
        if (data["driver_id"] == "") {
          errors = {
            ...errors,
            driver_id: "Please select a main driver",
          };
          warnings.push("Please select a main driver");
        }
      }
      if (
        property == "short_description" &&
        data[property] &&
        data[property].length > 45
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 45 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 45 numbers"
        );
      }
      if (
        property == "long_description" &&
        data[property] &&
        data[property].length > 250
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 250 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 250 numbers"
        );
      }
      if (property == "phone_number" && isNaN(data[property])) {
        errors = {
          ...errors,
          [property]: labels[property] + " Must be a number",
        };
        warnings.push(labels[property] + " Must be a number");
      }
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const agencySubstitutionValidator_section3 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    start: "Starting Point (Post Code)",
    start1: "Starting Address Line 1",
    start3: "Starting Town / City",
    start_date: "Start Date",
    start_time: "Start Time",
  };
  const sections = [
    "Title & Description",
    "Job Details",
    "Job Starting Detils",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "short_description" ||
      property == "long_description" ||
      property == "flag" ||
      property == "group_drivers" ||
      property == "drivers_count" ||
      property == "start" ||
      property == "start1" ||
      property == "start3" ||
      property == "start_time" ||
      property == "start_date" ||
      property == "end" ||
      property == "end1" ||
      property == "contact_person" ||
      property == "phone_number" ||
      property == "hire_type" ||
      property == "driver_class" ||
      property == "hire_quantity" ||
      property == "hirer_rate"
    ) {
      let section = "";
      if (count < 5) {
        section = sections[0] + " Section";
      } else if (count < 11) {
        section = sections[1] + " Section";
      } else if (count < 16) {
        section = sections[2] + " Section";
      } else if (count < 20) {
        section = sections[3] + " Section";
      } else {
        section = sections[4] + " Section";
      }
      if (
        (data[property] == "" || data[property] == null) &&
        data[property] !== "group_drivers"
      ) {
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field");
      }
      if (
        property == "flag" &&
        data.flag == "1" &&
        (data["group_drivers"] == "" || data["driver_id"] == "")
      ) {
        if (data["group_drivers"] == "") {
          errors = {
            ...errors,
            group_drivers: "Please select a driver",
          };
        } else if (data["driver_id"] == "") {
          errors = {
            ...errors,
            group_drivers: "Please select a main driver",
          };
        }
        warnings.push(
          "Main driver & the driver assigned to this substitution job must be specified"
        );
      }
      if (
        property == "short_description" &&
        data[property] &&
        data[property].length > 45
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 45 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 45 numbers"
        );
      }
      if (
        property == "long_description" &&
        data[property] &&
        data[property].length > 250
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 250 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 250 numbers"
        );
      }
      if (property == "phone_number" && isNaN(data[property])) {
        errors = {
          ...errors,
          [property]: labels[property] + " Must be a number",
        };
        warnings.push(labels[property] + " Must be a number");
      }
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const agencySubstitutionValidator_section4 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    end: "Ending Point (Post Code)",
    end1: "Ending Address 1",
    end3: "Ending Town / City",
  };
  const sections = [
    "Title & Description",
    "Job Details",
    "Job Starting Detils",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "short_description" ||
      property == "long_description" ||
      property == "flag" ||
      property == "group_drivers" ||
      property == "drivers_count" ||
      property == "start" ||
      property == "start" ||
      property == "start1" ||
      property == "start3" ||
      property == "start_time" ||
      property == "start_date" ||
      property == "end" ||
      property == "end1" ||
      property == "end3" ||
      property == "contact_person" ||
      property == "phone_number" ||
      property == "hire_type" ||
      property == "driver_class" ||
      property == "hire_quantity" ||
      property == "hirer_rate"
    ) {
      let section = "";
      if (count < 5) {
        section = sections[0] + " Section";
      } else if (count < 11) {
        section = sections[1] + " Section";
      } else if (count < 16) {
        section = sections[2] + " Section";
      } else if (count < 20) {
        section = sections[3] + " Section";
      } else {
        section = sections[4] + " Section";
      }
      if (
        (data[property] == "" || data[property] == null) &&
        data[property] !== "group_drivers"
      ) {
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field");
      }
      if (
        property == "flag" &&
        data.flag == "1" &&
        (data["group_drivers"] == "" || data["driver_id"] == "")
      ) {
        if (data["group_drivers"] == "") {
          errors = {
            ...errors,
            group_drivers: "Please select a driver",
          };
        } else if (data["driver_id"] == "") {
          errors = {
            ...errors,
            group_drivers: "Please select a main driver",
          };
        }
        warnings.push(
          "Main driver & the driver assigned to this substitution job must be specified"
        );
      }
      if (
        property == "short_description" &&
        data[property] &&
        data[property].length > 45
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 45 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 45 numbers"
        );
      }
      if (
        property == "long_description" &&
        data[property] &&
        data[property].length > 250
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 250 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 250 numbers"
        );
      }
      if (property == "phone_number" && isNaN(data[property])) {
        errors = {
          ...errors,
          [property]: labels[property] + " Must be a number",
        };
        warnings.push(labels[property] + " Must be a number");
      }
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const agencySubstitutionValidator = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    short_description: "Title",
    long_description: "Description",
    group_drivers: "'Select Driver To Assign'",
    contact_person: "Contact Person",
    phone_number: "Phone Number",
    driver_id: "Main Driver",
    flag: "Publish Flag",
    hire_type: "Hire Type",
    driver_class: "Driver Class",
    hire_quantity: "Hire Quantity",
    hirer_rate: "Hire Rate",
    start: "Starting Point (Post Code)",
    start1: "Starting Address Line 1",
    start3: "Starting Town / City",
    start_date: "Start Date",
    start_time: "Start Time",
    end: "Ending Point (Post Code)",
    end1: "Ending Address 1",
    end3: "Ending Town / City",
  };
  const sections = [
    "Title & Description",
    "Job Details",
    "Job Starting Detils",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "short_description" ||
      property == "long_description" ||
      property == "flag" ||
      property == "driver_id" ||
      property == "group_drivers" ||
      property == "drivers_count" ||
      property == "start" ||
      property == "start" ||
      property == "start1" ||
      property == "start3" ||
      property == "start_time" ||
      property == "start_date" ||
      property == "end" ||
      property == "end1" ||
      property == "end3" ||
      property == "contact_person" ||
      property == "phone_number" ||
      property == "hire_type" ||
      property == "driver_class" ||
      property == "hire_quantity" ||
      property == "hirer_rate"
    ) {
      let section = "";
      if (count < 5) {
        section = sections[0] + " Section";
      } else if (count < 11) {
        section = sections[1] + " Section";
      } else if (count < 16) {
        section = sections[2] + " Section";
      } else if (count < 20) {
        section = sections[3] + " Section";
      } else {
        section = sections[4] + " Section";
      }
      if (
        (data[property] == "" || data[property] == null) &&
        property !== "group_drivers" &&
        property !== "driver_id"
      ) {
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field in " + section);
      }
      if (property == "flag" && data.flag == "1") {
        if (data["group_drivers"] == "") {
          errors = {
            ...errors,
            group_drivers: "Please select a driver to assign",
          };
          warnings.push("Please select a driver to assign in " + section);
        }
        if (data["driver_id"] == "") {
          errors = {
            ...errors,
            driver_id: "Please select a main driver",
          };
          warnings.push("Please select a main driver in " + section);
        }
      }
      if (
        property == "short_description" &&
        data[property] &&
        data[property].length > 45
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 45 numbers",
        };
        warnings.push(
          labels[property] +
            " may not contain more than 45 numbers in " +
            section
        );
      }
      if (
        property == "long_description" &&
        data[property] &&
        data[property].length > 250
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 250 numbers",
        };
        warnings.push(
          labels[property] +
            " may not contain more than 250 numbers in " +
            section
        );
      }
      if (property == "phone_number" && isNaN(data[property])) {
        errors = {
          ...errors,
          [property]: labels[property] + " Must be a number",
        };
        warnings.push(labels[property] + " Must be a number in " + section);
      }
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};
// time sheet validation
export const timesheetvalidator_section1 = (
  DATA = [],
  formType,
  isSubmitting = true,
  labels
) => {
  if (formType == 0) {
    if (DATA.work_service == "" && DATA.expenses == "") {
      return "The Form Is Empty";
    }
    if (isSubmitting) {
      if (DATA.work_service == "") {
        return "Please Enter Work Service Amount";
      }
      if (DATA.expenses == "") {
        return "Please Enter The Expenses";
      }
    }
  } else {
    if (isSubmitting) {
      for (let i = 0; i < 1; i++) {
        let count = 0;
        let key = 1;
        let clients = DATA["client"]
          ? DATA["client"].split(",")
          : ["", "", "", "", "", "", ""];
        let unit = DATA["day" + key + "_units"]
          ? DATA["day" + key + "_units"].split(",")
          : [];
        let rate = DATA["day" + key + "_unit_rate"]
          ? DATA["day" + key + "_unit_rate"].split(",")
          : [];
        let type = DATA["day" + key + "_unit_type"]
          ? DATA["day" + key + "_unit_type"].split(",")
          : [];
        let total_count = DATA["day" + key + "_total"]
          ? DATA["day" + key + "_total"].split(",")
          : [];
        let start_hours = DATA["day" + key + "_start_time_hours"]
          ? DATA["day" + key + "_start_time_hours"].split(",")
          : [];
        let start_mins = DATA["day" + key + "_start_time_mins"]
          ? DATA["day" + key + "_start_time_mins"].split(",")
          : [];
        let finish_hours = DATA["day" + key + "_finish_time_hours"]
          ? DATA["day" + key + "_finish_time_hours"].split(",")
          : [];
        let finish_mins = DATA["day" + key + "_finish_time_mins"]
          ? DATA["day" + key + "_finish_time_mins"].split(",")
          : [];
        let break_hours = DATA["day" + key + "_break_time_hours"]
          ? DATA["day" + key + "_break_time_hours"].split(",")
          : [];
        let break_mins = DATA["day" + key + "_break_time_mins"]
          ? DATA["day" + key + "_break_time_mins"].split(",")
          : [];
        if (!type.includes("Not Worked")) {
          if (clients[0] == "") {
            return labels[i] + "'s Client field is empty";
          }
        }
        if (unit.includes("") || unit.length == 0) {
          return "One of " + labels[i] + "'s form unit field is empty";
        }
        if (rate.includes("") || rate.length == 0) {
          return "One of " + labels[i] + "'s form rate field is empty";
        }
        if (type.includes("") || type.length == 0) {
          return "One of " + labels[i] + "'s form type field is empty";
        }
        for (let j = 0; j <= type.length; j++) {
          if (
            type[j] == "Day Rate" ||
            type[j] == "Standard Hours" ||
            type[j] == "Standard Rate"
          ) {
            if (!start_hours[j]) {
              return (
                "One of " + labels[i] + "'s form start hours field is empty"
              );
            }
            if (!start_mins[j]) {
              return (
                "One of " + labels[i] + "'s form start minutes field is empty"
              );
            }
            if (!finish_hours[j]) {
              return (
                "One of " + labels[i] + "'s form finish hours field is empty"
              );
            }
            if (!finish_mins[j]) {
              return (
                "One of " + labels[i] + "'s form finish mins field is empty"
              );
            }
            if (!break_hours[j]) {
              return (
                "One of " + labels[i] + "'s form break hours field is empty"
              );
            }
            if (!break_mins[j]) {
              return (
                "One of " + labels[i] + "'s form break mins field is empty"
              );
            }
          }
        }
      }
    }
  }
  return true;
};
export const timesheetvalidator_section2 = (
  DATA = [],
  formType,
  isSubmitting = true,
  labels
) => {
  if (formType == 0) {
    if (DATA.work_service == "" && DATA.expenses == "") {
      return "The Form Is Empty";
    }
    if (isSubmitting) {
      if (DATA.work_service == "") {
        return "Please Enter Work Service Amount";
      }
      if (DATA.expenses == "") {
        return "Please Enter The Expenses";
      }
    }
  } else {
    if (isSubmitting) {
      for (let i = 0; i < 1; i++) {
        let count = 0;
        let key = 2;
        let clients = DATA["client"]
          ? DATA["client"].split(",")
          : ["", "", "", "", "", "", ""];
        let unit = DATA["day" + key + "_units"]
          ? DATA["day" + key + "_units"].split(",")
          : [];
        let rate = DATA["day" + key + "_unit_rate"]
          ? DATA["day" + key + "_unit_rate"].split(",")
          : [];
        let type = DATA["day" + key + "_unit_type"]
          ? DATA["day" + key + "_unit_type"].split(",")
          : [];
        let total_count = DATA["day" + key + "_total"]
          ? DATA["day" + key + "_total"].split(",")
          : [];
        let start_hours = DATA["day" + key + "_start_time_hours"]
          ? DATA["day" + key + "_start_time_hours"].split(",")
          : [];
        let start_mins = DATA["day" + key + "_start_time_mins"]
          ? DATA["day" + key + "_start_time_mins"].split(",")
          : [];
        let finish_hours = DATA["day" + key + "_finish_time_hours"]
          ? DATA["day" + key + "_finish_time_hours"].split(",")
          : [];
        let finish_mins = DATA["day" + key + "_finish_time_mins"]
          ? DATA["day" + key + "_finish_time_mins"].split(",")
          : [];
        let break_hours = DATA["day" + key + "_break_time_hours"]
          ? DATA["day" + key + "_break_time_hours"].split(",")
          : [];
        let break_mins = DATA["day" + key + "_break_time_mins"]
          ? DATA["day" + key + "_break_time_mins"].split(",")
          : [];
        if (!type.includes("Not Worked")) {
          if (clients[1] == "") {
            return labels[i] + "'s Client field is empty";
          }
        }
        if (unit.includes("") || unit.length == 0) {
          return "One of " + labels[i] + "'s form unit field is empty";
        }
        if (rate.includes("") || rate.length == 0) {
          return "One of " + labels[i] + "'s form rate field is empty";
        }
        if (type.includes("") || type.length == 0) {
          return "One of " + labels[i] + "'s form type field is empty";
        }
        for (let j = 0; j <= type.length; j++) {
          if (
            type[j] == "Day Rate" ||
            type[j] == "Standard Hours" ||
            type[j] == "Standard Rate"
          ) {
            if (!start_hours[j]) {
              return (
                "One of " + labels[i] + "'s form start hours field is empty"
              );
            }
            if (!start_mins[j]) {
              return (
                "One of " + labels[i] + "'s form start minutes field is empty"
              );
            }
            if (!finish_hours[j]) {
              return (
                "One of " + labels[i] + "'s form finish hours field is empty"
              );
            }
            if (!finish_mins[j]) {
              return (
                "One of " + labels[i] + "'s form finish mins field is empty"
              );
            }
            if (!break_hours[j]) {
              return (
                "One of " + labels[i] + "'s form break hours field is empty"
              );
            }
            if (!break_mins[j]) {
              return (
                "One of " + labels[i] + "'s form break mins field is empty"
              );
            }
          }
        }
      }
    }
  }
  return true;
};
export const timesheetvalidator_section3 = (
  DATA = [],
  formType,
  isSubmitting = true,
  labels
) => {
  if (formType == 0) {
    if (DATA.work_service == "" && DATA.expenses == "") {
      return "The Form Is Empty";
    }
    if (isSubmitting) {
      if (DATA.work_service == "") {
        return "Please Enter Work Service Amount";
      }
      if (DATA.expenses == "") {
        return "Please Enter The Expenses";
      }
    }
  } else {
    if (isSubmitting) {
      for (let i = 0; i < 1; i++) {
        let count = 0;
        let key = 3;
        let clients = DATA["client"]
          ? DATA["client"].split(",")
          : ["", "", "", "", "", "", ""];
        let unit = DATA["day" + key + "_units"]
          ? DATA["day" + key + "_units"].split(",")
          : [];
        let rate = DATA["day" + key + "_unit_rate"]
          ? DATA["day" + key + "_unit_rate"].split(",")
          : [];
        let type = DATA["day" + key + "_unit_type"]
          ? DATA["day" + key + "_unit_type"].split(",")
          : [];
        let total_count = DATA["day" + key + "_total"]
          ? DATA["day" + key + "_total"].split(",")
          : [];
        let start_hours = DATA["day" + key + "_start_time_hours"]
          ? DATA["day" + key + "_start_time_hours"].split(",")
          : [];
        let start_mins = DATA["day" + key + "_start_time_mins"]
          ? DATA["day" + key + "_start_time_mins"].split(",")
          : [];
        let finish_hours = DATA["day" + key + "_finish_time_hours"]
          ? DATA["day" + key + "_finish_time_hours"].split(",")
          : [];
        let finish_mins = DATA["day" + key + "_finish_time_mins"]
          ? DATA["day" + key + "_finish_time_mins"].split(",")
          : [];
        let break_hours = DATA["day" + key + "_break_time_hours"]
          ? DATA["day" + key + "_break_time_hours"].split(",")
          : [];
        let break_mins = DATA["day" + key + "_break_time_mins"]
          ? DATA["day" + key + "_break_time_mins"].split(",")
          : [];
        if (!type.includes("Not Worked")) {
          if (clients[2] == "") {
            return labels[i] + "'s Client field is empty";
          }
        }
        if (unit.includes("") || unit.length == 0) {
          return "One of " + labels[i] + "'s form unit field is empty";
        }
        if (rate.includes("") || rate.length == 0) {
          return "One of " + labels[i] + "'s form rate field is empty";
        }
        if (type.includes("") || type.length == 0) {
          return "One of " + labels[i] + "'s form type field is empty";
        }
        for (let j = 0; j <= type.length; j++) {
          if (
            type[j] == "Day Rate" ||
            type[j] == "Standard Hours" ||
            type[j] == "Standard Rate"
          ) {
            if (!start_hours[j]) {
              return (
                "One of " + labels[i] + "'s form start hours field is empty"
              );
            }
            if (!start_mins[j]) {
              return (
                "One of " + labels[i] + "'s form start minutes field is empty"
              );
            }
            if (!finish_hours[j]) {
              return (
                "One of " + labels[i] + "'s form finish hours field is empty"
              );
            }
            if (!finish_mins[j]) {
              return (
                "One of " + labels[i] + "'s form finish mins field is empty"
              );
            }
            if (!break_hours[j]) {
              return (
                "One of " + labels[i] + "'s form break hours field is empty"
              );
            }
            if (!break_mins[j]) {
              return (
                "One of " + labels[i] + "'s form break mins field is empty"
              );
            }
          }
        }
      }
    }
  }
  return true;
};
export const timesheetvalidator_section4 = (
  DATA = [],
  formType,
  isSubmitting = true,
  labels
) => {
  if (formType == 0) {
    if (DATA.work_service == "" && DATA.expenses == "") {
      return "The Form Is Empty";
    }
    if (isSubmitting) {
      if (DATA.work_service == "") {
        return "Please Enter Work Service Amount";
      }
      if (DATA.expenses == "") {
        return "Please Enter The Expenses";
      }
    }
  } else {
    if (isSubmitting) {
      for (let i = 0; i < 1; i++) {
        let count = 0;
        let key = 4;
        let clients = DATA["client"]
          ? DATA["client"].split(",")
          : ["", "", "", "", "", "", ""];
        let unit = DATA["day" + key + "_units"]
          ? DATA["day" + key + "_units"].split(",")
          : [];
        let rate = DATA["day" + key + "_unit_rate"]
          ? DATA["day" + key + "_unit_rate"].split(",")
          : [];
        let type = DATA["day" + key + "_unit_type"]
          ? DATA["day" + key + "_unit_type"].split(",")
          : [];
        let total_count = DATA["day" + key + "_total"]
          ? DATA["day" + key + "_total"].split(",")
          : [];
        let start_hours = DATA["day" + key + "_start_time_hours"]
          ? DATA["day" + key + "_start_time_hours"].split(",")
          : [];
        let start_mins = DATA["day" + key + "_start_time_mins"]
          ? DATA["day" + key + "_start_time_mins"].split(",")
          : [];
        let finish_hours = DATA["day" + key + "_finish_time_hours"]
          ? DATA["day" + key + "_finish_time_hours"].split(",")
          : [];
        let finish_mins = DATA["day" + key + "_finish_time_mins"]
          ? DATA["day" + key + "_finish_time_mins"].split(",")
          : [];
        let break_hours = DATA["day" + key + "_break_time_hours"]
          ? DATA["day" + key + "_break_time_hours"].split(",")
          : [];
        let break_mins = DATA["day" + key + "_break_time_mins"]
          ? DATA["day" + key + "_break_time_mins"].split(",")
          : [];
        if (!type.includes("Not Worked")) {
          if (clients[3] == "") {
            return labels[i] + "'s Client field is empty";
          }
        }
        if (unit.includes("") || unit.length == 0) {
          return "One of " + labels[i] + "'s form unit field is empty";
        }
        if (rate.includes("") || rate.length == 0) {
          return "One of " + labels[i] + "'s form rate field is empty";
        }
        if (type.includes("") || type.length == 0) {
          return "One of " + labels[i] + "'s form type field is empty";
        }
        for (let j = 0; j <= type.length; j++) {
          if (
            type[j] == "Day Rate" ||
            type[j] == "Standard Hours" ||
            type[j] == "Standard Rate"
          ) {
            if (!start_hours[j]) {
              return (
                "One of " + labels[i] + "'s form start hours field is empty"
              );
            }
            if (!start_mins[j]) {
              return (
                "One of " + labels[i] + "'s form start minutes field is empty"
              );
            }
            if (!finish_hours[j]) {
              return (
                "One of " + labels[i] + "'s form finish hours field is empty"
              );
            }
            if (!finish_mins[j]) {
              return (
                "One of " + labels[i] + "'s form finish mins field is empty"
              );
            }
            if (!break_hours[j]) {
              return (
                "One of " + labels[i] + "'s form break hours field is empty"
              );
            }
            if (!break_mins[j]) {
              return (
                "One of " + labels[i] + "'s form break mins field is empty"
              );
            }
          }
        }
      }
    }
  }
  return true;
};
export const timesheetvalidator_section5 = (
  DATA = [],
  formType,
  isSubmitting = true,
  labels
) => {
  if (formType == 0) {
    if (DATA.work_service == "" && DATA.expenses == "") {
      return "The Form Is Empty";
    }
    if (isSubmitting) {
      if (DATA.work_service == "") {
        return "Please Enter Work Service Amount";
      }
      if (DATA.expenses == "") {
        return "Please Enter The Expenses";
      }
    }
  } else {
    if (isSubmitting) {
      for (let i = 0; i < 1; i++) {
        let count = 0;
        let key = 5;
        let clients = DATA["client"]
          ? DATA["client"].split(",")
          : ["", "", "", "", "", "", ""];
        let unit = DATA["day" + key + "_units"]
          ? DATA["day" + key + "_units"].split(",")
          : [];
        let rate = DATA["day" + key + "_unit_rate"]
          ? DATA["day" + key + "_unit_rate"].split(",")
          : [];
        let type = DATA["day" + key + "_unit_type"]
          ? DATA["day" + key + "_unit_type"].split(",")
          : [];
        let total_count = DATA["day" + key + "_total"]
          ? DATA["day" + key + "_total"].split(",")
          : [];
        let start_hours = DATA["day" + key + "_start_time_hours"]
          ? DATA["day" + key + "_start_time_hours"].split(",")
          : [];
        let start_mins = DATA["day" + key + "_start_time_mins"]
          ? DATA["day" + key + "_start_time_mins"].split(",")
          : [];
        let finish_hours = DATA["day" + key + "_finish_time_hours"]
          ? DATA["day" + key + "_finish_time_hours"].split(",")
          : [];
        let finish_mins = DATA["day" + key + "_finish_time_mins"]
          ? DATA["day" + key + "_finish_time_mins"].split(",")
          : [];
        let break_hours = DATA["day" + key + "_break_time_hours"]
          ? DATA["day" + key + "_break_time_hours"].split(",")
          : [];
        let break_mins = DATA["day" + key + "_break_time_mins"]
          ? DATA["day" + key + "_break_time_mins"].split(",")
          : [];
        if (!type.includes("Not Worked")) {
          if (clients[4] == "") {
            return labels[i] + "'s Client field is empty";
          }
        }
        if (unit.includes("") || unit.length == 0) {
          return "One of " + labels[i] + "'s form unit field is empty";
        }
        if (rate.includes("") || rate.length == 0) {
          return "One of " + labels[i] + "'s form rate field is empty";
        }
        if (type.includes("") || type.length == 0) {
          return "One of " + labels[i] + "'s form type field is empty";
        }
        for (let j = 0; j <= type.length; j++) {
          if (
            type[j] == "Day Rate" ||
            type[j] == "Standard Hours" ||
            type[j] == "Standard Rate"
          ) {
            if (!start_hours[j]) {
              return (
                "One of " + labels[i] + "'s form start hours field is empty"
              );
            }
            if (!start_mins[j]) {
              return (
                "One of " + labels[i] + "'s form start minutes field is empty"
              );
            }
            if (!finish_hours[j]) {
              return (
                "One of " + labels[i] + "'s form finish hours field is empty"
              );
            }
            if (!finish_mins[j]) {
              return (
                "One of " + labels[i] + "'s form finish mins field is empty"
              );
            }
            if (!break_hours[j]) {
              return (
                "One of " + labels[i] + "'s form break hours field is empty"
              );
            }
            if (!break_mins[j]) {
              return (
                "One of " + labels[i] + "'s form break mins field is empty"
              );
            }
          }
        }
      }
    }
  }
  return true;
};
export const timesheetvalidator_section6 = (
  DATA = [],
  formType,
  isSubmitting = true,
  labels
) => {
  if (formType == 0) {
    if (DATA.work_service == "" && DATA.expenses == "") {
      return "The Form Is Empty";
    }
    if (isSubmitting) {
      if (DATA.work_service == "") {
        return "Please Enter Work Service Amount";
      }
      if (DATA.expenses == "") {
        return "Please Enter The Expenses";
      }
    }
  } else {
    if (isSubmitting) {
      for (let i = 0; i < 1; i++) {
        let count = 0;
        let key = 6;
        let clients = DATA["client"]
          ? DATA["client"].split(",")
          : ["", "", "", "", "", "", ""];
        let unit = DATA["day" + key + "_units"]
          ? DATA["day" + key + "_units"].split(",")
          : [];
        let rate = DATA["day" + key + "_unit_rate"]
          ? DATA["day" + key + "_unit_rate"].split(",")
          : [];
        let type = DATA["day" + key + "_unit_type"]
          ? DATA["day" + key + "_unit_type"].split(",")
          : [];
        let total_count = DATA["day" + key + "_total"]
          ? DATA["day" + key + "_total"].split(",")
          : [];
        let start_hours = DATA["day" + key + "_start_time_hours"]
          ? DATA["day" + key + "_start_time_hours"].split(",")
          : [];
        let start_mins = DATA["day" + key + "_start_time_mins"]
          ? DATA["day" + key + "_start_time_mins"].split(",")
          : [];
        let finish_hours = DATA["day" + key + "_finish_time_hours"]
          ? DATA["day" + key + "_finish_time_hours"].split(",")
          : [];
        let finish_mins = DATA["day" + key + "_finish_time_mins"]
          ? DATA["day" + key + "_finish_time_mins"].split(",")
          : [];
        let break_hours = DATA["day" + key + "_break_time_hours"]
          ? DATA["day" + key + "_break_time_hours"].split(",")
          : [];
        let break_mins = DATA["day" + key + "_break_time_mins"]
          ? DATA["day" + key + "_break_time_mins"].split(",")
          : [];
        if (!type.includes("Not Worked")) {
          if (clients[5] == "") {
            return labels[i] + "'s Client field is empty";
          }
        }
        if (unit.includes("") || unit.length == 0) {
          return "One of " + labels[i] + "'s form unit field is empty";
        }
        if (rate.includes("") || rate.length == 0) {
          return "One of " + labels[i] + "'s form rate field is empty";
        }
        if (type.includes("") || type.length == 0) {
          return "One of " + labels[i] + "'s form type field is empty";
        }
        for (let j = 0; j <= type.length; j++) {
          if (
            type[j] == "Day Rate" ||
            type[j] == "Standard Hours" ||
            type[j] == "Standard Rate"
          ) {
            if (!start_hours[j]) {
              return (
                "One of " + labels[i] + "'s form start hours field is empty"
              );
            }
            if (!start_mins[j]) {
              return (
                "One of " + labels[i] + "'s form start minutes field is empty"
              );
            }
            if (!finish_hours[j]) {
              return (
                "One of " + labels[i] + "'s form finish hours field is empty"
              );
            }
            if (!finish_mins[j]) {
              return (
                "One of " + labels[i] + "'s form finish mins field is empty"
              );
            }
            if (!break_hours[j]) {
              return (
                "One of " + labels[i] + "'s form break hours field is empty"
              );
            }
            if (!break_mins[j]) {
              return (
                "One of " + labels[i] + "'s form break mins field is empty"
              );
            }
          }
        }
      }
    }
  }
  return true;
};
export const timesheetvalidator_section7 = (
  DATA = [],
  formType,
  isSubmitting = true,
  labels
) => {
  if (formType == 0) {
    if (DATA.work_service == "" && DATA.expenses == "") {
      return "The Form Is Empty";
    }
    if (isSubmitting) {
      if (DATA.work_service == "") {
        return "Please Enter Work Service Amount";
      }
      if (DATA.expenses == "") {
        return "Please Enter The Expenses";
      }
    }
  } else {
    if (isSubmitting) {
      for (let i = 0; i < 1; i++) {
        let count = 0;
        let key = 7;
        let clients = DATA["client"]
          ? DATA["client"].split(",")
          : ["", "", "", "", "", "", ""];
        let unit = DATA["day" + key + "_units"]
          ? DATA["day" + key + "_units"].split(",")
          : [];
        let rate = DATA["day" + key + "_unit_rate"]
          ? DATA["day" + key + "_unit_rate"].split(",")
          : [];
        let type = DATA["day" + key + "_unit_type"]
          ? DATA["day" + key + "_unit_type"].split(",")
          : [];
        let total_count = DATA["day" + key + "_total"]
          ? DATA["day" + key + "_total"].split(",")
          : [];
        let start_hours = DATA["day" + key + "_start_time_hours"]
          ? DATA["day" + key + "_start_time_hours"].split(",")
          : [];
        let start_mins = DATA["day" + key + "_start_time_mins"]
          ? DATA["day" + key + "_start_time_mins"].split(",")
          : [];
        let finish_hours = DATA["day" + key + "_finish_time_hours"]
          ? DATA["day" + key + "_finish_time_hours"].split(",")
          : [];
        let finish_mins = DATA["day" + key + "_finish_time_mins"]
          ? DATA["day" + key + "_finish_time_mins"].split(",")
          : [];
        let break_hours = DATA["day" + key + "_break_time_hours"]
          ? DATA["day" + key + "_break_time_hours"].split(",")
          : [];
        let break_mins = DATA["day" + key + "_break_time_mins"]
          ? DATA["day" + key + "_break_time_mins"].split(",")
          : [];
        if (!type.includes("Not Worked")) {
          if (clients[6] == "") {
            return labels[i] + "'s Client field is empty";
          }
        }
        if (unit.includes("") || unit.length == 0) {
          return "One of " + labels[i] + "'s form unit field is empty";
        }
        if (rate.includes("") || rate.length == 0) {
          return "One of " + labels[i] + "'s form rate field is empty";
        }
        if (type.includes("") || type.length == 0) {
          return "One of " + labels[i] + "'s form type field is empty";
        }
        for (let j = 0; j <= type.length; j++) {
          if (
            type[j] == "Day Rate" ||
            type[j] == "Standard Hours" ||
            type[j] == "Standard Rate"
          ) {
            if (!start_hours[j]) {
              return (
                "One of " + labels[i] + "'s form start hours field is empty"
              );
            }
            if (!start_mins[j]) {
              return (
                "One of " + labels[i] + "'s form start minutes field is empty"
              );
            }
            if (!finish_hours[j]) {
              return (
                "One of " + labels[i] + "'s form finish hours field is empty"
              );
            }
            if (!finish_mins[j]) {
              return (
                "One of " + labels[i] + "'s form finish mins field is empty"
              );
            }
            if (!break_hours[j]) {
              return (
                "One of " + labels[i] + "'s form break hours field is empty"
              );
            }
            if (!break_mins[j]) {
              return (
                "One of " + labels[i] + "'s form break mins field is empty"
              );
            }
          }
        }
      }
    }
  }
  return true;
};

export const timesheetvalidator = (
  DATA = [],
  formType,
  isSubmitting = true,
  labels
) => {
  if (formType == 0) {
    if (DATA.work_service == "" && DATA.expenses == "") {
      return "The Form Is Empty";
    }
    if (isSubmitting) {
      if (DATA.work_service == "") {
        return "Please Enter Work Service Amount";
      }
      if (DATA.expenses == "") {
        return "Please Enter The Expenses";
      }
    }
  } else {
    if (isSubmitting) {
      for (let i = 0; i < 7; i++) {
        let count = 0;
        let key = i + 1;
        let clients = DATA["client"]
          ? DATA["client"].split(",")
          : ["", "", "", "", "", "", ""];
        let unit = DATA["day" + key + "_units"]
          ? DATA["day" + key + "_units"].split(",")
          : [];
        let rate = DATA["day" + key + "_unit_rate"]
          ? DATA["day" + key + "_unit_rate"].split(",")
          : [];
        let type = DATA["day" + key + "_unit_type"]
          ? DATA["day" + key + "_unit_type"].split(",")
          : [];
        let total_count = DATA["day" + key + "_total"]
          ? DATA["day" + key + "_total"].split(",")
          : [];
        let start_hours = DATA["day" + key + "_start_time_hours"]
          ? DATA["day" + key + "_start_time_hours"].split(",")
          : [];
        let start_mins = DATA["day" + key + "_start_time_mins"]
          ? DATA["day" + key + "_start_time_mins"].split(",")
          : [];
        let finish_hours = DATA["day" + key + "_finish_time_hours"]
          ? DATA["day" + key + "_finish_time_hours"].split(",")
          : [];
        let finish_mins = DATA["day" + key + "_finish_time_mins"]
          ? DATA["day" + key + "_finish_time_mins"].split(",")
          : [];
        let break_hours = DATA["day" + key + "_break_time_hours"]
          ? DATA["day" + key + "_break_time_hours"].split(",")
          : [];
        let break_mins = DATA["day" + key + "_break_time_mins"]
          ? DATA["day" + key + "_break_time_mins"].split(",")
          : [];
        if (!type.includes("Not Worked")) {
          if (clients[i] == "") {
            return labels[i] + "'s Client field is empty";
          }
        }
        if (unit.includes("") || unit.length == 0) {
          return "One of " + labels[i] + "'s form unit field is empty";
        }
        if (rate.includes("") || rate.length == 0) {
          return "One of " + labels[i] + "'s form rate field is empty";
        }
        if (type.includes("") || type.length == 0) {
          return "One of " + labels[i] + "'s form type field is empty";
        }
        for (let j = 0; j <= type.length; j++) {
          if (
            type[j] == "Day Rate" ||
            type[j] == "Standard Hours" ||
            type[j] == "Standard Rate"
          ) {
            if (!start_hours[j]) {
              return (
                "One of " + labels[i] + "'s form start hours field is empty"
              );
            }
            if (!start_mins[j]) {
              return (
                "One of " + labels[i] + "'s form start minutes field is empty"
              );
            }
            if (!finish_hours[j]) {
              return (
                "One of " + labels[i] + "'s form finish hours field is empty"
              );
            }
            if (!finish_mins[j]) {
              return (
                "One of " + labels[i] + "'s form finish mins field is empty"
              );
            }
            if (!break_hours[j]) {
              return (
                "One of " + labels[i] + "'s form break hours field is empty"
              );
            }
            if (!break_mins[j]) {
              return (
                "One of " + labels[i] + "'s form break mins field is empty"
              );
            }
          }
        }
      }
    }
  }
  return true;
};

// expense sheet validation
export const expenseSheetValidator_section1 = (data = new Object()) => {
  if (data.allowances) {
    const allowances = data.allowances.split(",");
    const allowance_units = data.allowances_units.split(",");
    for (let i = 0; i < allowances.length; i++) {
      // console.log(allowance_units[i]);
      if (allowance_units[i]) {
        if (allowance_units[i] == "") {
          return "Please add " + allowances[i] + " unit";
        }
      } else {
        return "Please add " + allowances[i] + " unit";
      }
    }
  }
  return true;
};
export const expenseSheetValidator_section3 = (data = new Object()) => {
  if (data.business_miles_units == "" || data.business_miles_units == null) {
    return "Please add Business Miles units";
  }
  return true;
};
export const expenseSheetValidator = (data = new Object()) => {
  if (data.allowances) {
    const allowances = data.allowances.split(",");
    const allowance_units = data.allowances_units.split(",");
    for (let i = 0; i < allowances.length; i++) {
      // console.log(allowance_units[i]);
      if (allowance_units[i]) {
        if (allowance_units[i] == "") {
          return (
            "Please add " +
            allowances[i] +
            " unit inside Monthly Expenses Section"
          );
        }
      } else {
        return (
          "Please add " +
          allowances[i] +
          " unit inside Monthly Expenses Section"
        );
      }
    }
  }
  if (data.business_miles_units == "" || data.business_miles_units == null) {
    return "Please add Business Miles units inside Travel Expense Section";
  }
  return true;
};

export const agencyJobValidator_section1 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    short_description: "Title",
    long_description: "Description",
    group_drivers: "'Select Driver To Assign'",
    contact_person: "Contact Person",
    phone_number: "Phone Number",
  };
  const sections = [
    "Title & Description",
    "Job Details",
    "Job Starting Detils",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "short_description" ||
      property == "long_description" ||
      property == "flag" ||
      property == "group_drivers" ||
      property == "drivers_count" ||
      property == "start" ||
      property == "start" ||
      property == "start1" ||
      property == "start_time" ||
      property == "start_date" ||
      property == "end" ||
      property == "end1" ||
      property == "contact_person" ||
      property == "phone_number" ||
      property == "hire_type" ||
      property == "driver_class" ||
      property == "hire_quantity" ||
      property == "hirer_rate"
    ) {
      let section = "";
      if (count < 5) {
        section = sections[0] + " Section";
      } else if (count < 11) {
        section = sections[1] + " Section";
      } else if (count < 16) {
        section = sections[2] + " Section";
      } else if (count < 20) {
        section = sections[3] + " Section";
      } else {
        section = sections[4] + " Section";
      }
      if (data[property] == "" && property !== "group_drivers") {
        // if (labels[property] == "Title") {
        //   alert(section);
        //   alert(count);
        //   alert(property);
        // }
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field");
      }
      if (
        property == "flag" &&
        data.flag == "1" &&
        Number(data["group_drivers"].split(",").length) !==
          Number(data["drivers_count"])
      ) {
        errors = {
          ...errors,
          [property]: "Number of drivers must be equal to the drivers selected",
        };
        warnings.push(
          "Number of drivers must be equal to the drivers selected"
        );
      }
      if (
        property == "short_description" &&
        data[property] &&
        data[property].length > 45
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 45 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 45 numbers"
        );
      }
      if (
        property == "long_description" &&
        data[property] &&
        data[property].length > 250
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 250 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 250 numbers"
        );
      }
      if (property == "phone_number" && isNaN(data[property])) {
        errors = {
          ...errors,
          [property]: labels[property] + " Must be a number",
        };
        warnings.push(labels[property] + " Must be a number");
      }
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};
export const agencyJobValidator_section2 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    flag: "Publish Flag",
    drivers_count: "Number Of Driver",
    hire_type: "Hire Type",
    driver_class: "Driver Class",
    hire_quantity: "Hire Quantity",
    hirer_rate: "Hire Rate",
  };
  const sections = [
    "Title & Description",
    "Job Details",
    "Job Starting Detils",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "short_description" ||
      property == "long_description" ||
      property == "flag" ||
      property == "group_drivers" ||
      property == "drivers_count" ||
      property == "start" ||
      property == "start" ||
      property == "start1" ||
      property == "start_time" ||
      property == "start_date" ||
      property == "end" ||
      property == "end1" ||
      property == "contact_person" ||
      property == "phone_number" ||
      property == "hire_type" ||
      property == "driver_class" ||
      property == "hire_quantity" ||
      property == "hirer_rate"
    ) {
      let section = "";
      if (count < 5) {
        section = sections[0] + " Section";
      } else if (count < 11) {
        section = sections[1] + " Section";
      } else if (count < 16) {
        section = sections[2] + " Section";
      } else if (count < 20) {
        section = sections[3] + " Section";
      } else {
        section = sections[4] + " Section";
      }
      if (
        data[property] == "" &&
        property !== "group_drivers" &&
        property !== "drivers_count"
      ) {
        // if (labels[property] == "Title") {
        //   alert(section);
        //   alert(count);
        //   alert(property);
        // }
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field");
      }
      if (
        property == "flag" &&
        data.flag == "1" &&
        Number(data["group_drivers"].split(",").length) !==
          Number(data["drivers_count"])
      ) {
        errors = {
          ...errors,
          [property]: "Number of drivers must be equal to the drivers selected",
        };
        warnings.push(
          "Number of drivers must be equal to the drivers selected"
        );
      }
      if (
        property == "short_description" &&
        data[property] &&
        data[property].length > 45
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 45 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 45 numbers"
        );
      }
      if (
        property == "long_description" &&
        data[property] &&
        data[property].length > 250
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 250 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 250 numbers"
        );
      }
      if (property == "phone_number" && isNaN(data[property])) {
        errors = {
          ...errors,
          [property]: labels[property] + " Must be a number",
        };
        warnings.push(labels[property] + " Must be a number");
      }
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};
export const agencyJobValidator_section3 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    start: "Starting Point (Post Code)",
    start1: "Starting Address Line 1",
    start3: "Starting Town/City",
    start_date: "Start Date",
    start_time: "Start Time",
  };
  const sections = [
    "Title & Description",
    "Job Details",
    "Job Starting Detils",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "short_description" ||
      property == "long_description" ||
      property == "flag" ||
      property == "group_drivers" ||
      property == "drivers_count" ||
      property == "start" ||
      property == "start" ||
      property == "start1" ||
      property == "start3" ||
      property == "start_time" ||
      property == "start_date" ||
      property == "end" ||
      property == "end1" ||
      property == "contact_person" ||
      property == "phone_number" ||
      property == "hire_type" ||
      property == "driver_class" ||
      property == "hire_quantity" ||
      property == "hirer_rate"
    ) {
      let section = "";
      if (count < 5) {
        section = sections[0] + " Section";
      } else if (count < 11) {
        section = sections[1] + " Section";
      } else if (count < 16) {
        section = sections[2] + " Section";
      } else if (count < 20) {
        section = sections[3] + " Section";
      } else {
        section = sections[4] + " Section";
      }
      if (data[property] == "" && property !== "group_drivers") {
        // if (labels[property] == "Title") {
        //   alert(section);
        //   alert(count);
        //   alert(property);
        // }
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field");
      }
      if (
        property == "flag" &&
        data.flag == "1" &&
        Number(data["group_drivers"].split(",").length) !==
          Number(data["drivers_count"])
      ) {
        errors = {
          ...errors,
          [property]: "Number of drivers must be equal to the drivers selected",
        };
        warnings.push(
          "Number of drivers must be equal to the drivers selected"
        );
      }
      if (
        property == "short_description" &&
        data[property] &&
        data[property].length > 45
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 45 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 45 numbers"
        );
      }
      if (
        property == "long_description" &&
        data[property] &&
        data[property].length > 250
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 250 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 250 numbers"
        );
      }
      if (property == "phone_number" && isNaN(data[property])) {
        errors = {
          ...errors,
          [property]: labels[property] + " Must be a number",
        };
        warnings.push(labels[property] + " Must be a number");
      }
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};
export const agencyJobValidator_section4 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    end: "Ending Point (Post Code)",
    end1: "Ending Address 1",
    end3: "Ending Town/City",
  };
  const sections = [
    "Title & Description",
    "Job Details",
    "Job Starting Detils",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "short_description" ||
      property == "long_description" ||
      property == "flag" ||
      property == "group_drivers" ||
      property == "drivers_count" ||
      property == "start" ||
      property == "start" ||
      property == "start1" ||
      property == "start_time" ||
      property == "start_date" ||
      property == "end" ||
      property == "end1" ||
      property == "contact_person" ||
      property == "phone_number" ||
      property == "hire_type" ||
      property == "driver_class" ||
      property == "hire_quantity" ||
      property == "hirer_rate"
    ) {
      let section = "";
      if (count < 5) {
        section = sections[0] + " Section";
      } else if (count < 11) {
        section = sections[1] + " Section";
      } else if (count < 16) {
        section = sections[2] + " Section";
      } else if (count < 20) {
        section = sections[3] + " Section";
      } else {
        section = sections[4] + " Section";
      }
      if (data[property] == "" && property !== "group_drivers") {
        // if (labels[property] == "Title") {
        //   alert(section);
        //   alert(count);
        //   alert(property);
        // }
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field");
      }
      if (
        property == "flag" &&
        data.flag == "1" &&
        Number(data["group_drivers"].split(",").length) !==
          Number(data["drivers_count"])
      ) {
        errors = {
          ...errors,
          [property]: "Number of drivers must be equal to the drivers selected",
        };
        warnings.push(
          "Number of drivers must be equal to the drivers selected"
        );
      }
      if (
        property == "short_description" &&
        data[property] &&
        data[property].length > 45
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 45 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 45 numbers"
        );
      }
      if (
        property == "long_description" &&
        data[property] &&
        data[property].length > 250
      ) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 250 numbers",
        };
        warnings.push(
          labels[property] + " may not contain more than 250 numbers"
        );
      }
      if (property == "phone_number" && isNaN(data[property])) {
        errors = {
          ...errors,
          [property]: labels[property] + " Must be a number",
        };
        warnings.push(labels[property] + " Must be a number");
      }
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};
export const agencyJobValidator = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    short_description: "Title",
    long_description: "Description",
    group_drivers: "'Select Driver To Assign'",
    contact_person: "Contact Person",
    phone_number: "Phone Number",
    flag: "Publish Flag",
    drivers_count: "Number Of Driver",
    hire_type: "Hire Type",
    driver_class: "Driver Class",
    hire_quantity: "Hire Quantity",
    hirer_rate: "Hire Rate",
    start: "Starting Point (Post Code)",
    start1: "Starting Address Line 1",
    start3: "Starting Town/City",
    start_date: "Start Date",
    start_time: "Start Time",
    end: "Ending Point (Post Code)",
    end1: "Ending Address 1",
    end3: "Ending Town/City",
  };
  const sections = [
    "Title & Description",
    "Job Details",
    "Job Starting Detils",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    let section = "";
    if (count < 5) {
      section = sections[0] + " Section";
    } else if (count < 11) {
      section = sections[1] + " Section";
    } else if (count < 16) {
      section = sections[2] + " Section";
    } else if (count < 20) {
      section = sections[3] + " Section";
    } else {
      section = sections[4] + " Section";
    }
    if (
      data[property] == "" &&
      property !== "group_drivers" &&
      property !== "drivers_count"
    ) {
      // if (labels[property] == "Title") {
      //   alert(section);
      //   alert(count);
      //   alert(property);
      // }
      errors = {
        ...errors,
        [property]: labels[property] + " is a required field",
      };
      warnings.push(labels[property] + " is a required field in " + section);
    }
    if (
      property == "flag" &&
      data.flag == "1" &&
      Number(data["group_drivers"].split(",").length) !==
        Number(data["drivers_count"])
    ) {
      errors = {
        ...errors,
        [property]: "Number of drivers must be equal to the drivers selected",
      };
      warnings.push(
        "Number of drivers must be equal to the drivers selected in " + section
      );
    }
    if (
      property == "short_description" &&
      data[property] &&
      data[property].length > 45
    ) {
      errors = {
        ...errors,
        [property]: labels[property] + " may not contain more than 45 numbers",
      };
      warnings.push(
        labels[property] + " may not contain more than 45 numbers in " + section
      );
    }
    if (
      property == "long_description" &&
      data[property] &&
      data[property].length > 250
    ) {
      errors = {
        ...errors,
        [property]: labels[property] + " may not contain more than 250 numbers",
      };
      warnings.push(
        labels[property] +
          " may not contain more than 250 numbers in " +
          section
      );
    }
    if (property == "phone_number" && isNaN(data[property])) {
      errors = {
        ...errors,
        [property]: labels[property] + " Must be a number",
      };
      warnings.push(labels[property] + " Must be a number in " + section);
    }
  }
  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const jobValidator_section1 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    contact_person: "Contact Person",
    phone_number: "Phone Number",
  };
  const sections = [
    "Job Hirer Details",
    "Job Details",
    "Job Starting Detils",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "start" ||
      property == "start1" ||
      property == "start_time" ||
      property == "start_date" ||
      property == "end" ||
      property == "end1" ||
      property == "contact_person" ||
      property == "phone_number" ||
      property == "hire_type" ||
      property == "driver_class" ||
      property == "hire_quantity" ||
      property == "hirer_rate" ||
      property == "short_description" ||
      property == "long_description"
    ) {
      let section = "";
      if (count < 3) {
        section = sections[0] + " Section";
      } else if (count < 9) {
        section = sections[1] + " Section";
      } else if (count < 14) {
        section = sections[2] + " Section";
      } else if (count < 18) {
        section = sections[3] + " Section";
      } else {
        section = sections[4] + " Section";
      }
      if (data[property] == "") {
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field");
      }
      if (property == "short_description" && data[property].length > 45) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 45 numbers",
        };
        warnings.push(
          labels[property] +
            " may not contain more than 45 numbers in " +
            section
        );
      }
      if (property == "long_description" && data[property].length > 250) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 250 numbers",
        };
        warnings.push(
          labels[property] +
            " may not contain more than 250 numbers in " +
            section
        );
      }
      if (property == "phone_number" && isNaN(data[property])) {
        errors = {
          ...errors,
          [property]: labels[property] + " Must be a number",
        };
        warnings.push(labels[property] + " Must be a number");
      }
    }
  }

  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const jobValidator_section2 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    flag: "Publish Flag",
    hire_type: "Hire Type",
    driver_class: "Driver Class",
    hire_quantity: "Hire Quantity",
    hirer_rate: "Hirer Rate",
  };
  const sections = [
    "Job Hirer Details",
    "Job Details",
    "Job Starting Detils",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    let section = "";
    if (count < 3) {
      section = sections[0] + " Section";
    } else if (count < 9) {
      section = sections[1] + " Section";
    } else if (count < 14) {
      section = sections[2] + " Section";
    } else if (count < 18) {
      section = sections[3] + " Section";
    } else {
      section = sections[4] + " Section";
    }
    if (data[property] == "" || data[property] == null) {
      errors = {
        ...errors,
        [property]: labels[property] + " is a required field",
      };
      warnings.push(labels[property] + " is a required field");
    }
    if (property == "short_description" && data[property].length > 45) {
      errors = {
        ...errors,
        [property]: labels[property] + " may not contain more than 45 numbers",
      };
      warnings.push(
        labels[property] + " may not contain more than 45 numbers in " + section
      );
    }
    if (property == "long_description" && data[property].length > 250) {
      errors = {
        ...errors,
        [property]: labels[property] + " may not contain more than 250 numbers",
      };
      warnings.push(
        labels[property] +
          " may not contain more than 250 numbers in " +
          section
      );
    }
    if (property == "phone_number" && isNaN(data[property])) {
      errors = {
        ...errors,
        [property]: labels[property] + " Must be a number",
      };
      warnings.push(labels[property] + " Must be a number in " + section);
    }
  }

  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const jobValidator_section3 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    start: "Starting Point (Post Code)",
    start1: "Starting Address Line 1",
    start3: "Starting Town / City",
    start_date: "Start Date",
    start_time: "Start Time",
  };
  const sections = [
    "Job Hirer Details",
    "Job Details",
    "Job Starting Detils",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    let section = "";
    if (count < 3) {
      section = sections[0] + " Section";
    } else if (count < 9) {
      section = sections[1] + " Section";
    } else if (count < 14) {
      section = sections[2] + " Section";
    } else if (count < 18) {
      section = sections[3] + " Section";
    } else {
      section = sections[4] + " Section";
    }
    if (data[property] == "") {
      errors = {
        ...errors,
        [property]: labels[property] + " is a required field",
      };
      warnings.push(labels[property] + " is a required field");
    }
    if (property == "short_description" && data[property].length > 45) {
      errors = {
        ...errors,
        [property]: labels[property] + " may not contain more than 45 numbers",
      };
      warnings.push(
        labels[property] + " may not contain more than 45 numbers in " + section
      );
    }
    if (property == "long_description" && data[property].length > 250) {
      errors = {
        ...errors,
        [property]: labels[property] + " may not contain more than 250 numbers",
      };
      warnings.push(
        labels[property] +
          " may not contain more than 250 numbers in " +
          section
      );
    }
    if (property == "phone_number" && isNaN(data[property])) {
      errors = {
        ...errors,
        [property]: labels[property] + " Must be a number",
      };
      warnings.push(labels[property] + " Must be a number in " + section);
    }
  }

  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const jobValidator_section4 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    end: "Ending Point (Post Code)",
    end1: "Ending Address 1",
    end3: "Ending Town / City",
  };
  const sections = [
    "Job Hirer Details",
    "Job Details",
    "Job Starting Detils",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    let section = "";
    if (count < 3) {
      section = sections[0] + " Section";
    } else if (count < 9) {
      section = sections[1] + " Section";
    } else if (count < 14) {
      section = sections[2] + " Section";
    } else if (count < 18) {
      section = sections[3] + " Section";
    } else {
      section = sections[4] + " Section";
    }
    if (data[property] == "") {
      errors = {
        ...errors,
        [property]: labels[property] + " is a required field",
      };
      warnings.push(labels[property] + " is a required field");
    }
    if (property == "short_description" && data[property].length > 45) {
      errors = {
        ...errors,
        [property]: labels[property] + " may not contain more than 45 numbers",
      };
      warnings.push(
        labels[property] + " may not contain more than 45 numbers in " + section
      );
    }
    if (property == "long_description" && data[property].length > 250) {
      errors = {
        ...errors,
        [property]: labels[property] + " may not contain more than 250 numbers",
      };
      warnings.push(
        labels[property] +
          " may not contain more than 250 numbers in " +
          section
      );
    }
    if (property == "phone_number" && isNaN(data[property])) {
      errors = {
        ...errors,
        [property]: labels[property] + " Must be a number",
      };
      warnings.push(labels[property] + " Must be a number in " + section);
    }
  }

  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const jobValidator_section5 = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    short_description: "Short Description",
    long_description: "Long Description",
  };
  const sections = [
    "Job Hirer Details",
    "Job Details",
    "Job Starting Detils",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    if (
      property == "start" ||
      property == "start1" ||
      property == "start_time" ||
      property == "start_date" ||
      property == "end" ||
      property == "end1" ||
      property == "contact_person" ||
      property == "phone_number" ||
      property == "hire_type" ||
      property == "driver_class" ||
      property == "hire_quantity" ||
      property == "hirer_rate" ||
      property == "short_description" ||
      property == "long_description"
    ) {
      let section = "";
      if (count < 3) {
        section = sections[0] + " Section";
      } else if (count < 9) {
        section = sections[1] + " Section";
      } else if (count < 14) {
        section = sections[2] + " Section";
      } else if (count < 18) {
        section = sections[3] + " Section";
      } else {
        section = sections[4] + " Section";
      }
      if (data[property] == "") {
        errors = {
          ...errors,
          [property]: labels[property] + " is a required field",
        };
        warnings.push(labels[property] + " is a required field");
      }
      if (property == "short_description" && data[property].length > 45) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 45 numbers",
        };
        warnings.push(
          labels[property] +
            " may not contain more than 45 numbers in " +
            section
        );
      }
      if (property == "long_description" && data[property].length > 250) {
        errors = {
          ...errors,
          [property]:
            labels[property] + " may not contain more than 250 numbers",
        };
        warnings.push(
          labels[property] +
            " may not contain more than 250 numbers in " +
            section
        );
      }
      if (property == "phone_number" && isNaN(data[property])) {
        errors = {
          ...errors,
          [property]: labels[property] + " Must be a number",
        };
        warnings.push(labels[property] + " Must be a number");
      }
    }
  }

  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export const jobValidator = (data = new Object()) => {
  const warnings = [];
  let errors = {};
  let count = 0;
  const labels = {
    contact_person: "Contact Person",
    phone_number: "Phone Number",
    flag: "Publish Flag",
    driver_class: "Driver Class",
    hire_type: "Hire Type",
    hire_quantity: "Hire Quantity",
    hirer_rate: "Hirer Rate",
    start: "Starting Point (Post Code)",
    start1: "Starting Address Line 1",
    start3: "Starting Town / City",
    start_date: "Start Date",
    start_time: "Start Time",
    end: "Ending Point (Post Code)",
    end1: "Ending Address 1",
    end3: "Ending Town / City",
    short_description: "Short Description",
    long_description: "Long Description",
  };
  const sections = [
    "Job Hirer Details",
    "Job Details",
    "Job Starting Details",
    "Job Ending Details",
    "Description & Other Details",
  ];
  for (const property in labels) {
    count++;
    let section = "";
    if (count < 3) {
      section = sections[0] + " Section";
    } else if (count < 9) {
      section = sections[1] + " Section";
    } else if (count < 14) {
      section = sections[2] + " Section";
    } else if (count < 16) {
      section = sections[3] + " Section";
    } else {
      section = sections[4] + " Section";
    }
    if (data[property] == "") {
      errors = {
        ...errors,
        [property]: labels[property] + " is a required field",
      };
      warnings.push(labels[property] + " is a required field in " + section);
    }
    if (property == "short_description" && data[property].length > 45) {
      errors = {
        ...errors,
        [property]: labels[property] + " may not contain more than 45 numbers",
      };
      warnings.push(
        labels[property] + " may not contain more than 45 numbers in" + section
      );
    }
    if (property == "long_description" && data[property].length > 250) {
      errors = {
        ...errors,
        [property]: labels[property] + " may not contain more than 250 numbers",
      };
      warnings.push(
        labels[property] +
          " may not contain more than 250 numbers in " +
          section
      );
    }
    if (property == "phone_number" && isNaN(data[property])) {
      errors = {
        ...errors,
        [property]: labels[property] + " Must be a number",
      };
      warnings.push(labels[property] + " Must be a number in " + section);
    }
  }

  if (warnings.length) {
    return { warnings: warnings, errors: errors };
  }
  return true;
};

export function IR35CategoryValidator(data = new Object()) {
  if (data.title == "") {
    return "Title field is required";
  }
  if (!isPureText(data.title)) {
    return "Title field must not contain special characters";
  }
  return true;
}

export function ir35ItemValidator(data = new Object()) {
  if (data.title == "") {
    return "Title field is required";
  }
  if (!isPureText(data.title)) {
    return "Title field must not contain special characters";
  }
  if (data.category_id == "") {
    return "Category field is required";
  }
  if (data.max_score == "" || Number(data.max_score) < 1) {
    return "Max score must be 1 or greater";
  }
  if (data.category_Item_id == "" && !data.is_max_default) {
    return "Max value must be set to default value if the category item is not selected";
  }
  return true;
}

export function allowanceValidator(data = new Object()) {
  if (data.name == "") {
    return "Name field is required";
  }
  if (!isPureText(data.name)) {
    return "Name field must not contain special characters";
  }
  if (data.rate == "") {
    return "Rate field is required";
  }
  if (!isPureText(data.rate)) {
    return "Rate field must not contain special characters";
  }
  return true;
}
