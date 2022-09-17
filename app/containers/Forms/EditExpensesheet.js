import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { getCookie } from "dan-api/cookie";
import { URL, IMGURL } from "dan-api/url";
import {
  expenseSheetValidator,
  expenseSheetValidator_section1,
  expenseSheetValidator_section3,
} from "dan-api/validator";
import { ToastContainer, toast } from "react-toastify";
import Section1 from "./partials/expense/Section1";
import Section2 from "./partials/expense/Section2";
import Section3 from "./partials/expense/Section3";
import Section4 from "./partials/expense/Section4";
import Section5 from "./partials/expense/Section5";
import Section6 from "./partials/expense/Section6";
import Section7 from "./partials/expense/Section7";
import SideTabs from "./partials/expense/SideTabs";
import "react-toastify/dist/ReactToastify.css";
import "react-activity/dist/library.css";

const styles = () => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  field: {
    width: "100%",
    marginBottom: 20,
  },
  fieldBasic: {
    width: "100%",
    marginBottom: 20,
    marginTop: 10,
  },
  inlineWrap: {
    display: "flex",
    flexDirection: "row",
  },
  buttonInit: {
    margin: 20,
    textAlign: "center",
  },
  formControl: {
    margin: 20,
    minWidth: 120,
  },
});

function EditTimesheet(props) {
  const [activeSection, setActiveSection] = useState(1);
  const [stayHere, setStayHere] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState({
    id: "",
    driver_id: "",
    agency_id: "",
    month: "",
    allowances: "",
    allowances_prices: "",
    allowances_units: "",
    allowances_totals: "",
    other_travel_desc: "",
    other_travel_prices: "",
    other_travel_total: "",
    business_miles_units: "",
    business_miles_price: "",
    use_of_home_units: "",
    use_of_home_price: "",
    mortgage_units: "",
    mortgage_price: "",
    utilities_units: "",
    utilities_price: "",
    insurance_text: "",
    insurance_units: "",
    insurance_price: "",
    mortgage_text: "",
    miscellaneous_desc: "",
    miscellaneous_prices: "",
    miscellaneous_total: "",
    miscellaneous_text: "",
    accountancy_price: "",
    expenditure_units: "",
    expenditure_price: "",
    expenditure_text: "",
    total: "",
    status: "",
  });

  function loading(status) {
    setIsLoading(status);
  }

  const handleStayHere = (event) => {
    setStayHere(event.target.checked);
  };

  useEffect(() => {
    if (getCookie("id")) {
      getData(getCookie("editDataId"));
    } else {
      window.location.href = "/login";
    }
  }, []);

  function countTotals(values) {
    let total = 0;
    if (data.allowances_totals) {
      total += data.allowances_totals
        .split(",")
        .reduce((a, b) => Number(a) + Number(b));
    }
    if (data.business_miles_price) {
      total += Number(data.business_miles_price);
    }
    total += 26; // Home Office Allowance (£26) - Fixed
    if (data.other_travel_total) {
      total += Number(data.other_travel_total);
    }
    if (data.insurance_price) {
      total += Number(data.insurance_price);
    }
    if (data.miscellaneous_total) {
      total += Number(data.miscellaneous_total);
    }
    if (data.expenditure_price) {
      total += Number(data.expenditure_price);
    }
    setData({
      ...values,
      total: total.toFixed(2),
    });
  }

  const handleAllowance = (index, forms, value) => {
    forms[index]["unit"] = value;
    forms[index]["total"] =
      Number(forms[index]["unit"]) * Number(forms[index]["rate"]);

    let totals = [];
    let units = [];

    for (let i = 0; i < forms.length; i++) {
      units.push(forms[i]["unit"]);
      totals.push(forms[i]["total"]);
    }
    const values = {
      ...data,
      allowances_units: units.join(","),
      allowances_totals: totals.join(","),
    };
    countTotals(values);
  };

  const handleBusinessMiles = (event) => {
    let value = event.target.value;
    const values = {
      ...data,
      business_miles_units: value,
      business_miles_price: (0.45 * value).toFixed(2),
    };
    countTotals(values);
  };

  const handleOtherTravel = (
    pointer,
    index,
    forms,
    value,
    saveWithValues = true
  ) => {
    if (saveWithValues) {
      forms[index][pointer] = value;
    }

    let units = [];
    let types = [];

    let total = 0;
    for (let i = 0; i < forms.length; i++) {
      total += Number(forms[i]["unit"]);
      types.push(forms[i]["type"]);
      units.push(forms[i]["unit"]);
    }
    const values = {
      ...data,
      other_travel_desc: types.join(","),
      other_travel_prices: units.join(","),
      other_travel_total: String(total),
    };
    countTotals(values);
  };

  const handleInsurance = (
    pointer,
    index,
    forms,
    value,
    saveWithValues = true
  ) => {
    if (saveWithValues) {
      forms[index][pointer] = value;
    }

    let units = [];
    let types = [];

    let total = 0;
    for (let i = 0; i < forms.length; i++) {
      total += Number(forms[i]["unit"]);
      types.push(forms[i]["type"]);
      units.push(forms[i]["unit"]);
    }
    const values = {
      ...data,
      insurance_text: types.join(","),
      insurance_units: units.join(","),
      insurance_price: String(total),
    };
    countTotals(values);
  };

  const handleMiscellaneous = (
    pointer,
    index,
    forms,
    value,
    saveWithValues = true
  ) => {
    if (saveWithValues) {
      forms[index][pointer] = value;
    }

    let units = [];
    let types = [];

    let total = 0;
    for (let i = 0; i < forms.length; i++) {
      total += Number(forms[i]["unit"]);
      types.push(forms[i]["type"]);
      units.push(forms[i]["unit"]);
    }
    const values = {
      ...data,
      miscellaneous_desc: types.join(","),
      miscellaneous_prices: units.join(","),
      miscellaneous_total: String(total),
    };
    countTotals(values);
  };

  const handleCapital = (
    pointer,
    index,
    forms,
    value,
    saveWithValues = true
  ) => {
    if (saveWithValues) {
      forms[index][pointer] = value;
    }

    let units = [];
    let types = [];

    let total = 0;
    for (let i = 0; i < forms.length; i++) {
      total += Number(forms[i]["unit"]);
      types.push(forms[i]["type"]);
      units.push(forms[i]["unit"]);
    }
    const values = {
      ...data,
      expenditure_text: types.join(","),
      expenditure_units: units.join(","),
      expenditure_price: String(total),
    };
    countTotals(values);
  };

  // main methods
  function getData(id) {
    axios({
      method: "GET",
      url: URL + "WebExpenseID/" + id,
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          setData(res.data.expense);
        } else {
          toast.warn(res.data.message);
        }
        loading(false);
      })
      .catch((err) => {
        loading(false);
        toast.error("Something went wrong!");
      });
  }

  const submit = () => {
    const isValid = expenseSheetValidator(data);
    if (typeof isValid !== "boolean") {
      loading(false);
      return toast.warn(isValid);
    }
    axios({
      method: "POST",
      url: URL + "webUpdateExpenseSheet",
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: getCookie("token"),
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 100) {
          toast.warn(res.data.message);
        } else {
          if (!stayHere) {
            toast.info("Redirecting");
            setTimeout(() => {
              // window.location.href = "/app/monthly-expense-sheet";
              history.back();
            }, 1500);
          }
          toast.success(res.data.message);
        }
        loading(false);
      })
      .catch((e) => {
        loading(false);
        toast.error("Something Went Wrong!");
      });
  };

  const title = brand.name + " - Form";
  const description = brand.desc;
  const docSrc = "containers/Forms/demos/";
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>

      <PapperBlock
        title="Update Expense Sheet"
        icon="ion-ios-list-box-outline"
        desc="Fillout the required information below to update the Expense Sheet"
      >
        <div>
          <Grid
            container
            spacing={3}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={4} lg={4}>
              <SideTabs
                active={activeSection}
                handleClick={(value) => {
                  let isValid = true;
                  if (activeSection == 1) {
                    isValid = expenseSheetValidator_section1(data);
                  }
                  if (activeSection == 3) {
                    isValid = expenseSheetValidator_section3(data);
                  }
                  if (typeof isValid !== "boolean") {
                    return toast.warn(isValid);
                  }
                  setActiveSection(value);
                }}
                submit={() => {
                  loading(true);
                  submit();
                }}
                submitDisabled={isLoading}
                stayHere={stayHere}
                onStayHere={handleStayHere}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              {activeSection == 1 && (
                <Section1
                  {...data}
                  handleChange={handleAllowance}
                  next={() => {
                    let isValid = expenseSheetValidator_section1(data);
                    if (typeof isValid !== "boolean") {
                      return toast.warn(isValid);
                    }
                    setActiveSection(2);
                  }}
                />
              )}
              {activeSection == 2 && (
                <Section2
                  {...data}
                  previous={() => setActiveSection(1)}
                  next={() => setActiveSection(3)}
                />
              )}
              {activeSection == 3 && (
                <div>
                  <Section3 {...data} handleChange={handleBusinessMiles} />
                  <Section4
                    {...data}
                    handleChange={handleOtherTravel}
                    previous={() => setActiveSection(2)}
                    next={() => {
                      let isValid = expenseSheetValidator_section3(data);
                      if (typeof isValid !== "boolean") {
                        return toast.warn(isValid);
                      }
                      setActiveSection(4);
                    }}
                  />
                </div>
              )}
              {activeSection == 4 && (
                <div>
                  <Section5 {...data} handleChange={handleInsurance} />
                  <Section6 {...data} handleChange={handleMiscellaneous} />
                  <Section7
                    {...data}
                    handleChange={handleCapital}
                    previous={() => setActiveSection(3)}
                    submit={() => {
                      loading(true);
                      submit();
                    }}
                    submitDisabled={isLoading}
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      </PapperBlock>
      <ToastContainer />
    </div>
  );
}

export default withStyles(styles)(EditTimesheet);
