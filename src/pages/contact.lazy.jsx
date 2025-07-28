import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { postContact } from "../shared/api";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (formData) {
      return postContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message"),
      );
    },
  });

  return (
    <main className="min-h-screen bg-padre-background">
      {/* Hero Section */}
      <section className="bg-white border-b border-padre-border py-12 mb-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-pacifico text-4xl text-padre-primary mb-4">Contact Us</h1>
          <p className="text-lg text-padre-muted">We'd love to hear from you! Send us a message.</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto p-6">
        {mutation.isSuccess ? (
          <section className="bg-white rounded-lg shadow-sm border border-padre-border p-8 text-center" role="status" aria-live="polite">
            <h2 className="font-pacifico text-2xl text-padre-secondary mb-4">Message Sent!</h2>
            <p className="text-padre-muted">Thank you for contacting us. We'll get back to you soon.</p>
          </section>
        ) : (
          <section className="bg-white rounded-lg shadow-sm border border-padre-border p-8" aria-labelledby="contact-form-heading">
            <header className="text-center mb-8">
              <h2 id="contact-form-heading" className="font-pacifico text-2xl text-padre-primary mb-4">Send us a Message</h2>
              <div className="w-full h-px bg-padre-border"></div>
            </header>
            
            <form action={mutation.mutate} className="space-y-6" noValidate>
              <fieldset>
                <legend className="sr-only">Your contact information and message</legend>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-base font-medium text-padre-primary mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      placeholder="Enter your full name" 
                      required 
                      className="w-full p-3 border-2 border-padre-border rounded-lg focus:border-padre-secondary focus:outline-none transition-colors bg-white"
                      aria-describedby="name-help"
                    />
                    <div id="name-help" className="sr-only">Enter your full name</div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-base font-medium text-padre-primary mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      placeholder="your.email@example.com" 
                      required 
                      className="w-full p-3 border-2 border-padre-border rounded-lg focus:border-padre-secondary focus:outline-none transition-colors bg-white"
                      aria-describedby="email-help"
                    />
                    <div id="email-help" className="sr-only">Enter a valid email address for our response</div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-base font-medium text-padre-primary mb-2">Message</label>
                    <textarea 
                      id="message"
                      name="message" 
                      placeholder="How can we help you? Tell us about your question or feedback..." 
                      required 
                      rows={6}
                      className="w-full p-3 border-2 border-padre-border rounded-lg focus:border-padre-secondary focus:outline-none transition-colors bg-white resize-vertical min-h-48"
                      aria-describedby="message-help"
                    ></textarea>
                    <div id="message-help" className="sr-only">Tell us about your question or feedback</div>
                  </div>
                </div>
              </fieldset>
              
              <div className="text-center pt-4">
                <button 
                  type="submit" 
                  className="btn-secondary py-4 px-8 text-lg mx-auto disabled:bg-padre-muted disabled:cursor-not-allowed"
                  disabled={mutation.isPending}
                  aria-describedby="submit-help"
                >
                  {mutation.isPending ? 'Sending...' : 'Send Message'}
                </button>
                <div id="submit-help" className="sr-only">
                  Submit your message to Padre Gino's team
                </div>
              </div>
              
              {mutation.isError && (
                <div role="alert" className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
                  <p className="font-medium text-red-800">Error sending message</p>
                  <p className="text-red-700 text-sm">Failed to send message. Please try again.</p>
                </div>
              )}
            </form>
          </section>
        )}
      </div>
    </main>
  );
}
