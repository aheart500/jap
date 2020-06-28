import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Divider from "@material-ui/core/Divider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyle = makeStyles((theme) => ({
  formControl: {
    marginBottom: "1rem",
  },
  select: {
    backgroundColor: "#fff",
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  formControlLabel: {
    marginRight: "0",
    "& span": {
      fontFamily: "Cairo",
      fontSize: "1.2rem",
      color: "#fff",
    },
  },
  formControlLabel2: {
    marginRight: "0",
    "& span": {
      fontFamily: "Cairo",
    },
  },
  helperText: {
    fontSize: "0.9rem",
    fontFamily: "Cairo",
    textAlign: "right",
  },
  textField: {
    backgroundColor: "#fff",
    width: "60%",
    direction: "ltr",
    "& input": {
      textIndent: "10px",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    "& .MuiInputLabel-formControl": {
      left: "unset",
    },
  },
  submitButton: {
    width: "60%",
    fontSize: "1.2rem",
    fontFamily: "Cairo",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));
const NewOrder = ({ services, Add }) => {
  const classes = useStyle();
  const [data, setData] = useState({
    category: "",
    service: "",
    link: "",
    quantity: "",
    retail: false,
    runs: "",
    interval: "",
  });
  const [errors, setErrors] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const toggleConfirmation = () => {
    setConfirmed(false);
    setConfirmationOpen(!confirmationOpen);
  };
  const toggleResult = () => setResultOpen(!resultOpen);
  const [confirmed, setConfirmed] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [result, setResult] = useState({});
  const handleChange = (e) => {
    if (e.target.name === "category") {
      setData({
        ...data,
        service: "",
        [e.target.name]: e.target.value,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
    if (data.category === "") {
      newErrors.push("برجاء تحديد نوع الخدمة");
    }
    if (data.service === "") {
      newErrors.push("برجاء تحديد الخدمة");
    }
    if (data.link === "") {
      newErrors.push("برجاء إدخال الرابط");
    }
    if (data.quantity === "") {
      newErrors.push("برجاء تحديد الكمية");
    }
    if (newErrors.length > 0) {
      setErrors(newErrors);
      window.scrollTo(0, 0);
    } else {
      toggleConfirmation();
    }
  };

  const total = data.quantity * data.runs;
  let price = data.runs
    ? data.runs * data.service.rate * data.quantity
    : data.quantity * data.service.rate;
  price = price / 1000;
  if (data.service.type === "Custom Comments") price = price / 100;

  const categories = [...new Set(services.map((s) => s.category))];
  const proceedPayment = async () => {
    setResult({});
    try {
      const res = await Add(data);

      if (res.data.order) {
        setResult({ type: "success", order: res.data.order });
        setConfirmationOpen(false);
        setResultOpen(true);
        setData({
          category: "",
          service: "",
          link: "",
          quantity: "",
          retail: false,
          runs: "",
          interval: "",
        });
      } else {
        setResult({ type: "failure" });
        setConfirmationOpen(false);
        setResultOpen(true);
      }
    } catch (err) {
      setResult({ type: "failure" });
      setConfirmationOpen(false);
      setResultOpen(true);
      console.log(err);
    }
  };
  return (
    <>
      <Dialog
        open={confirmationOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={toggleConfirmation}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">تأكيد البيانات</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            برجاء التأكد من جميع البيانات قبل إكمال العملية حيث أن الموقع غير
            مسؤل عن أية أخطاء في البيانات
          </DialogContentText>
          <Divider />
          <div className="confirmationDia">
            <div className="row">
              <div className="right-col">رقم الخدمة</div>
              <div>{data.service.service}</div>
            </div>
            <div className="row">
              <div className="right-col"> اسم الخدمة</div>
              <div>{data.service.name}</div>
            </div>
            <div className="row">
              <div className="right-col"> الرابط</div>
              <div>{data.link}</div>
            </div>
            <div className="row">
              <div className="right-col"> الكمية</div>
              <div>{data.quantity}</div>
            </div>
            {data.runs > 0 && (
              <div className="row">
                <div className="right-col"> عدد المرات</div>
                <div>{data.runs}</div>
              </div>
            )}
            <div className="row">
              <div className="right-col"> السعر</div>
              <div>{`$${isNaN(price) ? "" : price.toString()}`}</div>
            </div>
            <Divider />
            <div className="row">
              <FormControlLabel
                className={classes.formControlLabel2}
                control={
                  <Checkbox
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    name="checkedA"
                    color="primary"
                  />
                }
                label="لقد قرأت البيانات جيداً وهي صحيحة"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={toggleConfirmation}
            variant="contained"
            color="secondary"
          >
            الغاء
          </Button>
          <Button
            onClick={proceedPayment}
            variant="contained"
            color="primary"
            disabled={!confirmed}
            className="payBtn"
          >
            إتمام الدقع
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={resultOpen}
        onClose={toggleResult}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {result.type === "success" ? "تمت العملية بنجاح" : "خطأ"}
        </DialogTitle>
        <DialogContent>
          {result.type === "success" ? (
            <Alert severity="success">{`تم إتمام العملية بنجاح. برجاء الإحنفاظ برقم الطلب لتتبع حالته لاحقاً "${result.order}"`}</Alert>
          ) : (
            <Alert severity="error">
              حدث خطأ أثناء القيام بالعملية برجاء المحاولة في وقت لاحق
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleResult} variant="contained" color="primary">
            تم
          </Button>
        </DialogActions>
      </Dialog>
      <form className="new-order" onSubmit={handleSubmit}>
        {errors.map((e, i) => (
          <Alert key={i} severity="error" style={{ marginBottom: "0.5rem" }}>
            {e}
          </Alert>
        ))}
        <FormControl className={classes.formControl}>
          <label htmlFor="category" id="category">
            نوع الخدمة
          </label>
          <Select
            value={data.category}
            onChange={handleChange}
            inputProps={{ name: "category" }}
            className={classes.select}
            labelId="category"
          >
            {categories.map((category, i) => {
              return (
                <MenuItem value={category} key={i}>
                  {category}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText className={classes.helperText}>
            اختر نوع الخدمة التي تريد شرائها
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <label htmlFor="service" id="service">
            الخدمة
          </label>
          <Select
            value={data.service}
            onChange={handleChange}
            inputProps={{ name: "service" }}
            className={classes.select}
            labelId="service"
            disabled={data.category === ""}
          >
            {services
              .filter((service) => service.category === data.category)
              .map((serv, i) => {
                return (
                  <MenuItem value={serv} key={i}>
                    {`${serv.service} ${serv.name}`}
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText className={classes.helperText}>
            اختر الخدمة التي تريد شرائها
          </FormHelperText>
        </FormControl>
        <div className="service-desc">
          <span>وصف الخدمة</span>
          <br />
          <p>
            ضحك ضحك ضحك ضحكضحك ضحكضحك ضحكضحك ضحكضحك
            <br />
            ضحكضحك ضحكضحك ضحكضحك ضحك
          </p>
        </div>
        <FormControl className={classes.formControl}>
          <label htmlFor="link">الرابط</label>
          <TextField
            className={classes.textField}
            id="link"
            inputProps={{
              name: "link",
            }}
            value={data.link}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <label htmlFor="quantity">الكمية</label>
          <TextField
            className={classes.textField}
            id="quantity"
            inputProps={{
              name: "quantity",
            }}
            type="number"
            value={data.quantity}
            onChange={handleChange}
          />
          {data.service && (
            <FormHelperText className={classes.helperText}>
              {`الحد الأدني: ${data.service.min} - الحد الأقصي: ${data.service.max}`}
            </FormHelperText>
          )}
        </FormControl>
        {data.service.type === "Default" && (
          <>
            <FormControl className={classes.formControl}>
              <FormControlLabel
                className={classes.formControlLabel}
                control={
                  <Checkbox
                    checked={data.retail}
                    onChange={() =>
                      setData({
                        ...data,
                        retail: !data.retail,
                        runs: "",
                        interval: "",
                      })
                    }
                    name="checkedB"
                    color="primary"
                  />
                }
                label="الشراء بالتقسيط"
              />
            </FormControl>
            {data.retail && data.service !== "" && (
              <>
                <FormControl className={classes.formControl}>
                  <label htmlFor="runs">عدد المرات</label>
                  <TextField
                    className={classes.textField}
                    id="runs"
                    inputProps={{
                      name: "runs",
                    }}
                    type="number"
                    value={data.runs}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <label htmlFor="interval">الفاصل الزمني (بالدقائق)</label>
                  <TextField
                    className={classes.textField}
                    id="interval"
                    inputProps={{
                      name: "interval",
                    }}
                    type="number"
                    value={data.interval}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <label htmlFor="total">الكمية الإجمالية</label>
                  <TextField
                    className={classes.textField}
                    id="total"
                    inputProps={{
                      name: "total",
                    }}
                    value={total.toString()}
                    disabled
                  />
                </FormControl>
              </>
            )}
          </>
        )}

        <FormControl className={classes.formControl}>
          <label htmlFor="price">السعر</label>
          <TextField
            className={classes.textField}
            id="price"
            inputProps={{
              name: "price",
            }}
            value={`$${isNaN(price) ? "" : price.toString()}`}
            disabled
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          تنفيذ
        </Button>
      </form>
    </>
  );
};

export default React.memo(NewOrder);
