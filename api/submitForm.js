// File: api/submitForm.js
export default async (req, res) => {
  const { name, email, phone, message } = req.body; // Retrieve form data

  // Prepare data for Web3Forms API
  const formData = new URLSearchParams();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('message', message);
  formData.append('access_key', process.env.EMAIL_KEY); // Use your Vercel Environment Variable

  try {
    // Make the request to Web3Forms API
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      // Send success response to the frontend
      res.status(200).json({ success: true, message: 'Form submitted successfully' });
    } else {
      // Send error response to the frontend
      res.status(400).json({ success: false, message: data.message || 'Submission failed' });
    }
  } catch (error) {
    // Handle any server-side errors
    res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
  }
};
