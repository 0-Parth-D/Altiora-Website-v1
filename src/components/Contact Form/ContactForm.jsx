import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "../../components/Button/Button";
import "./ContactForm.css";

export const ContactForm = () => {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null); // null = no submission yet
  const [showDialog, setShowDialog] = useState(false); // dialog visibility

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult("Sending...");
    setIsSuccess(null);

    const form = event.target;
    const formData = new FormData(form);
    formData.append("access_key", process.env.EMAIL_KEY);

    console.log("lol")
    console.log(process.env.EMAIL_KEY);
    console.log(import.meta.env.EMAIL_KEY);
    console.log(process.env.VITE_EMAIL_KEY);
    console.log(import.meta.env.VITE_EMAIL_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setResult("Form Submitted Successfully");
        form.reset();
        setMessage("");
      } else {
        setIsSuccess(false);
        setResult(data.message || "Submission failed.");
        console.error("Web3Forms error:", data);
      }

      setShowDialog(true); // show dialog on any response
    } catch (error) {
      console.error("Form error:", error);
      setIsSuccess(false);
      setResult("An error occurred. Please try again.");
      setShowDialog(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setIsSuccess(null);
    setResult("");
  };

  return (
    <form className="contact-form-body" onSubmit={onSubmit} method="POST">
      <TextField
        id="contact-name"
        name="name"
        label="Name"
        variant="outlined"
        fullWidth
        required
        color="none"
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "1rem",
            fontFamily: "Onest",
            fontWeight: 400,
          },
          "& .MuiInputLabel-root": {
            fontSize: "1rem",
            fontFamily: "Onest",
            fontWeight: 400,
          },
        }}
      />
      <TextField
        id="contact-email"
        name="email"
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        required
        color="none"
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "1rem",
            fontFamily: "Onest",
            fontWeight: 400,
          },
          "& .MuiInputLabel-root": {
            fontSize: "1rem",
            fontFamily: "Onest",
            fontWeight: 400,
          },
        }}
      />
      <TextField
        id="contact-phone"
        name="phone"
        label="Phone"
        variant="outlined"
        fullWidth
        color="none"
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "1rem",
            fontFamily: "Onest",
            fontWeight: 400,
          },
          "& .MuiInputLabel-root": {
            fontSize: "1rem",
            fontFamily: "Onest",
            fontWeight: 400,
          },
        }}
      />
      <TextField
        id="contact-message"
        name="message"
        label="Message"
        variant="outlined"
        fullWidth
        required
        multiline
        minRows={4}
        onChange={(e) => setMessage(e.target.value)}
        inputProps={{ maxLength: 1000 }}
        helperText={`${message.length}/1000`}
        color="none"
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "1rem",
            fontFamily: "Onest",
            fontWeight: 400,
          },
          "& .MuiInputLabel-root": {
            fontSize: "1rem",
            fontFamily: "Onest",
            fontWeight: 400,
          },
        }}
      />

      <Button
        type="submit"
        body={loading ? "Sending..." : "Send"}
        icon="send-plane"
        id="form-submit-btn"
        disabled={loading}
      />

      {/* Dialog */}
        <div className={`dialog-box-bg ${showDialog ? "open" : ""}`}>
          <div className="dialog-box-container">
            <div className="dialog-header text text-h-4 text-medium text-onest">
              {isSuccess
                ? "Your Message was Delivered!"
                : "Something Went Wrong"}
              <img
                src="/icons/close.svg"
                alt="Close"
                style={{ cursor: "pointer" }}
                onClick={handleCloseDialog}
              />
            </div>
            <div className="dialog-body">
              <img
                className="dialog-check"
                src={
                  isSuccess
                    ? "/icons/check.svg"
                    : "/icons/close.svg"
                }
                alt={isSuccess ? "Success" : "Error"}
              />
              <div className="dialog-title text text-h-6 text-medium text-onest">
                {isSuccess ? "We're Here to Help" : "Oops!"}
              </div>
              <div className="dialog-desc text text-body-1 text-light text-onest">
                {isSuccess ? (
                  <>
                    Thank you for reaching out. We strive to respond to all
                    inquiries as promptly as possible and appreciate your
                    patience in the meantime.
                  </>
                ) : (
                  <>
                    Something went wrong while submitting your message. Please
                    try again later or contact us directly.
                  </>
                )}
              </div>
            </div>
            <div className="dialog-footer">
              <Button
                body="Done"
                icon={isSuccess ? "check" : "close"}
                onClick={handleCloseDialog}
              />
            </div>
          </div>
        </div>
    </form>
  );
};
