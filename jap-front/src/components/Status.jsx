import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const useStyle = makeStyles(() => ({
  field: {
    width: "50%",
    marginLeft: "1rem",
    "& .MuiInputLabel-formControl": {
      right: "1rem",
      left: "unset",
      fontFamily: "Cairo !important",
    },
  },
  button: {
    fontSize: "1.2rem",
    fontFamily: "Cairo",
  },
  dialog: {
    width: "20rem",
    "& .right-col": {
      width: "40%",
    },
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Status = ({ check }) => {
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [data, setData] = useState({});

  const classes = useStyle();
  const handleClose = () => setOpen(false);
  const handleOpen = async () => {
    try {
      const result = await check(orderId);

      setOpen(true);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        classes={{
          paper: classes.dialog,
        }}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-slide-title">حالة الطلب</DialogTitle>
        <DialogContent>
          <Divider />
          <div className="confirmationDia">
            <div className="row">
              <div className="right-col">المستخدم</div>
              <div>{data.charge}</div>
            </div>
            <div className="row">
              <div className="right-col"> رقم البداية</div>
              <div>{data.start_count}</div>
            </div>
            <div className="row">
              <div className="right-col"> الحالة</div>
              <div>
                {data.status === "Completed"
                  ? "مكتمل"
                  : data.status === "In progress"
                  ? "جاري التنفيذ"
                  : data.status === "Partial"
                  ? "مكتمل جزئي"
                  : data.status === "Canceled"
                  ? "ملغي"
                  : "فشل"}
              </div>
            </div>
            <div className="row">
              <div className="right-col"> المتبقي</div>
              <div>{data.remains}</div>
            </div>
          </div>

          <Divider />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            تم
          </Button>
        </DialogActions>
      </Dialog>

      <form className="status">
        <TextField
          variant="filled"
          className={classes.field}
          value={orderId}
          label="رقم الطلب"
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Button
          variant="contained"
          type="button"
          color="primary"
          className={classes.button}
          onClick={handleOpen}
        >
          تتبع الطلب
        </Button>
      </form>
    </>
  );
};

export default Status;
