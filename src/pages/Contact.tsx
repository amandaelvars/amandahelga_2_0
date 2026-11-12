import React from "react";

export default function Contact() {
  return (
    <div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-6 text-accent">
          Contact Me
        </h1>
        <p className="mb-8 text-body">
          Have a question or want to work together? Fill out the form below and I’ll get back to you.
        </p>

        <form
          action="https://formspree.io/f/xblaavye" // 🔑 replace with your Formspree form ID
          method="POST"
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-ink-2 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full rounded-md bg-surface border border-line-strong p-3 text-ink focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-ink-2 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-md bg-surface border border-line-strong p-3 text-ink focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-ink-2 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full rounded-md bg-surface border border-line-strong p-3 text-ink focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-accent text-on-accent px-6 py-3 rounded-md font-semibold hover:bg-accent-hover transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
