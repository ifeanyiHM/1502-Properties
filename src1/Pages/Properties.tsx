import React, { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({
    transactionType: "",
    propertyType: "",
    location: "",
    budgetMin: "",
    budgetMax: "",
    bedrooms: "",
    preferences: "",
    additionalInfo: "",
    contactMethod: "",
    fullName: "",
    email: "",
    phone: "",
    clientType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(form);
  //   // You can add form validation or submit to an API here
  // };

  return (
    <div className="contact-container">
      <h2>Request a Property</h2>
      <p>
        Let us know your property requirements, and we will contact you with
        suitable options.
      </p>

      <form
        // onSubmit={handleSubmit}
        action="https://formspree.io/f/xanordow"
        method="POST"
        className="contact-form"
      >
        <h3>Property Requirements</h3>

        <label>Transaction Type</label>
        <select
          name="transactionType"
          value={form.transactionType}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
          <option value="Short Let">Short Let</option>
          <option value="Joint venture">Joint venture</option>
        </select>

        <label>Property Type</label>
        <select
          name="propertyType"
          value={form.propertyType}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Flat/Apartment">Flat/Apartment</option>
          <option value="House">House</option>
          <option value="Land">Land</option>
          <option value="Commercial Property">Commercial Property</option>
        </select>

        <label>Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Preferred areas or neighborhoods"
        />

        <div className="budget-group">
          <div>
            <label>Budget Min</label>
            <input
              name="budgetMin"
              type="number"
              value={form.budgetMin}
              onChange={handleChange}
              placeholder="Min"
            />
          </div>
          <div>
            <label>Budget Max</label>
            <input
              name="budgetMax"
              type="number"
              value={form.budgetMax}
              onChange={handleChange}
              placeholder="Max"
            />
          </div>
        </div>

        <label>Bedrooms</label>
        <select name="bedrooms" value={form.bedrooms} onChange={handleChange}>
          <option value="">Select</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>

        <label>Additional Preferences</label>
        <textarea
          name="preferences"
          value={form.preferences}
          onChange={handleChange}
          placeholder="e.g. furnished, serviced, amenities"
        />

        <label>Additional Information</label>
        <textarea
          name="additionalInfo"
          value={form.additionalInfo}
          onChange={handleChange}
        />

        <h3>Preferred Contact Method</h3>
        <select
          name="contactMethod"
          value={form.contactMethod}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Email">Email</option>
          <option value="Phone">Phone</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Either">Either</option>
        </select>

        <h3>Contact Information</h3>
        <label>Full Name</label>
        <input name="fullName" value={form.fullName} onChange={handleChange} />

        <label>Email Address</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        <label>Phone Number</label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
        />

        <label>I am a/an</label>
        <select
          name="clientType"
          value={form.clientType}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Client">Client</option>
          <option value="Agent">Agent</option>
        </select>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default ContactForm;
