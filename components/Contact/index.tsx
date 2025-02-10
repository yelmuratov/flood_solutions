"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  phone: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSending, setIsSending] = useState<boolean>(false);

  // Regex patterns
  const regexPatterns = {
    name: /^[A-Za-z\s]{2,}$/, // Only letters & spaces, min 2 chars
    phone: /^\+?\d{8,}$/, // Optional + at the start, only numbers, min 8 digits
    message: /^.{5,}$/, // Min 5 characters
  };

  // Handle input change & validate in real-time
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateField(e.target.name as keyof FormData, e.target.value);
  };

  // Validate a single field
  const validateField = (name: keyof FormData, value: string) => {
    if (!regexPatterns[name].test(value)) {
      setErrors((prev) => ({ ...prev, [name]: `Noto'g'ri ${name} formati!` }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Validate all fields before submission
    const newErrors: Partial<FormData> = {};
    Object.keys(formData).forEach((key) => {
      if (!regexPatterns[key as keyof FormData].test(formData[key as keyof FormData])) {
        newErrors[key as keyof FormData] = `Noto'g'ri ${key} formati!`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSending(false);
      return;
    }

    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", phone: "", message: "" });
        setErrors({});
        alert("Xabar muvaffaqiyatli yuborildi!");
      } else {
        alert("Xabar yuborishda xatolik yuz berdi!");
      }
    } catch (error) {
      alert("Tarmoq xatosi. Iltimos, keyinroq urinib ko'ring.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <section id="support" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="./images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:w-3/5 lg:w-3/4 xl:p-15"
            >
              <h2 className="mb-15 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Xabar yuborish
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <div className="w-full lg:w-1/2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ismingiz"
                      required
                      className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>

                  <div className="w-full lg:w-1/2">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Telefon raqamingiz"
                      required
                      className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee"
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>
                </div>

                <div className="mb-11.5 flex">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Xabaringizni kiriting"
                    rows={4}
                    required
                    className="w-full border-b border-stroke bg-transparent focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee"
                  ></textarea>
                </div>
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

                <div className="flex flex-wrap gap-4 xl:justify-between">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark"
                  >
                    {isSending ? "Yuborilmoqda..." : "Yuborish"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
