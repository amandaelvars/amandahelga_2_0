import React from "react";

export default function Contact() {
  return (
    <main className="bg-neutral-950 text-gray-100">
      {/* spacer for sticky navbar */}
      <div className="h-14" />

      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-6 text-[#e5dbcb]">
          Contact Me
        </h1>
        <p className="mb-8 text-gray-300">
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
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full rounded-md bg-neutral-900 border border-neutral-700 p-3 text-gray-100 focus:ring-2 focus:ring-[#e5dbcb] focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-md bg-neutral-900 border border-neutral-700 p-3 text-gray-100 focus:ring-2 focus:ring-[#e5dbcb] focus:border-transparent"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full rounded-md bg-neutral-900 border border-neutral-700 p-3 text-gray-100 focus:ring-2 focus:ring-[#e5dbcb] focus:border-transparent"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#e5dbcb] text-neutral-950 px-6 py-3 rounded-md font-semibold hover:bg-[#d6cdb8] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
