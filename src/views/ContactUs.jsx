//Contact Us page added
export default function ContactUs() {
    return (
      <section className="text-center mt-4">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Fill out the form below to get in touch.</p>
        <form className="mt-4 mx-auto" style={{ maxWidth: '400px' }}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Name" required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email" required />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              className="form-control"
              placeholder="Phone"
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
              required
            />
          </div>
          <div className="mb-3">
            <textarea className="form-control" rows="4" placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </section>
    );
  }
  